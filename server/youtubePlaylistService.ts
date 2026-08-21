import fs from "node:fs";
import path from "node:path";
import { PlaylistVideoItem } from "../src/types/index.js";

// Cache in-memory for fast responses
const playlistCache = new Map<string, PlaylistVideoItem[]>();

// Load pre-cached authentic playlist data if available
let preCachedPlaylists: Record<string, PlaylistVideoItem[]> = {};
try {
  const dataPath = path.join(process.cwd(), "server", "data", "playlistData.json");
  if (fs.existsSync(dataPath)) {
    const raw = fs.readFileSync(dataPath, "utf-8");
    preCachedPlaylists = JSON.parse(raw);
    for (const [pid, items] of Object.entries(preCachedPlaylists)) {
      playlistCache.set(pid, items);
    }
  }
} catch (err) {
  console.warn("Failed to load initial playlistData.json cache:", err);
}

/**
 * Fetch all playlist items via YouTube Data API v3 with pagination
 */
async function fetchViaYouTubeDataAPI(playlistId: string, apiKey: string): Promise<PlaylistVideoItem[]> {
  const items: PlaylistVideoItem[] = [];
  let nextPageToken: string | null = null;
  let page = 0;

  do {
    page++;
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet,contentDetails");
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("playlistId", playlistId);
    url.searchParams.set("key", apiKey);
    if (nextPageToken) {
      url.searchParams.set("pageToken", nextPageToken);
    }

    const res = await fetch(url.toString());
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`YouTube Data API Error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const pageItems = data.items || [];

    for (let i = 0; i < pageItems.length; i++) {
      const item = pageItems[i];
      const videoId = item.snippet?.resourceId?.videoId || item.contentDetails?.videoId;
      const title = item.snippet?.title || "Video";

      // Ignore deleted or private videos
      if (!videoId || title === "Private video" || title === "Deleted video") {
        continue;
      }

      const thumbnails = item.snippet?.thumbnails;
      const thumbUrl = thumbnails?.high?.url || thumbnails?.medium?.url || thumbnails?.default?.url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      items.push({
        id: `${playlistId}_${items.length + 1}`,
        playlistId,
        videoId,
        title,
        thumbnail: thumbUrl,
        position: items.length + 1,
        publishedAt: item.snippet?.publishedAt,
        channelTitle: item.snippet?.videoOwnerChannelTitle || item.snippet?.channelTitle,
        type: "youtube_video"
      });
    }

    nextPageToken = data.nextPageToken || null;
  } while (nextPageToken && page < 20);

  return items;
}

/**
 * Dynamic parser using YouTube Innertube / browse API
 */
async function fetchViaYouTubeInnertube(playlistId: string): Promise<PlaylistVideoItem[]> {
  const allVideos: PlaylistVideoItem[] = [];
  let continuationToken: string | null = null;

  const initialRes = await fetch("https://www.youtube.com/youtubei/v1/browse?prettyPrint=false", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    },
    body: JSON.stringify({
      context: {
        client: {
          clientName: "WEB",
          clientVersion: "2.20240101.00.00",
          hl: "en",
          gl: "US"
        }
      },
      browseId: `VL${playlistId}`
    })
  });

  if (!initialRes.ok) {
    throw new Error(`Innertube browse failed with status ${initialRes.status}`);
  }

  const data = await initialRes.json();

  function parseData(obj: any) {
    if (!obj || typeof obj !== "object") return;
    if (obj.lockupViewModel) {
      const lm = obj.lockupViewModel;
      const title = lm.metadata?.lockupMetadataViewModel?.title?.content || "Video";
      let videoId = "";
      const raw = JSON.stringify(lm);
      const m1 = raw.match(/watchEndpoint":\s*{"videoId":"([a-zA-Z0-9_-]{11})"/);
      const m2 = raw.match(/addedVideoId":"([a-zA-Z0-9_-]{11})"/);
      const m3 = raw.match(/\/vi\/([a-zA-Z0-9_-]{11})\//);
      if (m1) videoId = m1[1];
      else if (m2) videoId = m2[1];
      else if (m3) videoId = m3[1];

      if (videoId && !allVideos.some(v => v.videoId === videoId)) {
        allVideos.push({
          id: `${playlistId}_${allVideos.length + 1}`,
          playlistId,
          videoId,
          title,
          thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          position: allVideos.length + 1,
          type: "youtube_video"
        });
      }
    }
    if (obj.playlistVideoRenderer) {
      const r = obj.playlistVideoRenderer;
      if (r.videoId && !allVideos.some(v => v.videoId === r.videoId)) {
        allVideos.push({
          id: `${playlistId}_${allVideos.length + 1}`,
          playlistId,
          videoId: r.videoId,
          title: r.title?.runs?.[0]?.text || r.title?.simpleText || "Video",
          thumbnail: `https://i.ytimg.com/vi/${r.videoId}/hqdefault.jpg`,
          position: allVideos.length + 1,
          type: "youtube_video"
        });
      }
    }
    if (obj.continuationCommand?.token) {
      continuationToken = obj.continuationCommand.token;
    }
    for (const k of Object.keys(obj)) {
      parseData(obj[k]);
    }
  }

  parseData(data);

  let pages = 0;
  while (continuationToken && pages < 15) {
    pages++;
    const token: string = continuationToken;
    continuationToken = null;
    const contRes = await fetch("https://www.youtube.com/youtubei/v1/browse?prettyPrint=false", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: "WEB",
            clientVersion: "2.20240101.00.00",
            hl: "en",
            gl: "US"
          }
        },
        continuation: token
      })
    });
    if (contRes.ok) {
      const contData = await contRes.json();
      parseData(contData);
    }
  }

  return allVideos;
}

/**
 * Get all playlist items for a playlist ID.
 * Priority:
 * 1. Memory Cache
 * 2. YouTube Data API v3 (if process.env.YOUTUBE_API_KEY is configured)
 * 3. YouTube Innertube parser
 * 4. Pre-cached authentic datasets
 */
export async function getPlaylistVideos(playlistId: string): Promise<PlaylistVideoItem[]> {
  // Clean playlist ID if full URL passed
  let cleanId = playlistId;
  if (playlistId.includes("list=")) {
    cleanId = playlistId.split("list=")[1]?.split("&")[0]?.split("?")[0] || playlistId;
  }

  // 1. Check in-memory cache
  if (playlistCache.has(cleanId) && (playlistCache.get(cleanId)?.length || 0) > 0) {
    return playlistCache.get(cleanId)!;
  }

  // 2. Try YouTube Data API v3 if API key is provided
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (apiKey && apiKey.trim() !== "") {
    try {
      const vids = await fetchViaYouTubeDataAPI(cleanId, apiKey.trim());
      if (vids.length > 0) {
        playlistCache.set(cleanId, vids);
        return vids;
      }
    } catch (apiErr) {
      console.warn(`YouTube Data API failed for playlist ${cleanId}:`, apiErr);
    }
  }

  // 3. Try YouTube Innertube dynamic fetch
  try {
    const vids = await fetchViaYouTubeInnertube(cleanId);
    if (vids.length > 0) {
      playlistCache.set(cleanId, vids);
      return vids;
    }
  } catch (tubeErr) {
    console.warn(`YouTube Innertube fetch failed for playlist ${cleanId}:`, tubeErr);
  }

  // 4. Fallback to pre-cached authentic data
  if (preCachedPlaylists[cleanId] && preCachedPlaylists[cleanId].length > 0) {
    playlistCache.set(cleanId, preCachedPlaylists[cleanId]);
    return preCachedPlaylists[cleanId];
  }

  return [];
}
