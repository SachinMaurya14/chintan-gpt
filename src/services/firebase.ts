import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  Auth
} from "firebase/auth";
import {
  initializeFirestore,
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  Firestore
} from "firebase/firestore";
import localConfig from "../../firebase-applet-config.json";
import { UserProfile } from "../types/index.js";

// Read from runtime/build environment variables if present, otherwise fallback to local/user config
const metaEnv = typeof import.meta !== "undefined" ? (import.meta as any).env : undefined;

export const firebaseConfig = {
  apiKey:
    metaEnv?.VITE_FIREBASE_API_KEY ||
    localConfig?.apiKey ||
    "AIzaSyDygxBID0i02SMFVY5zg_AK6XRWi_S2GZc",
  authDomain:
    metaEnv?.VITE_FIREBASE_AUTH_DOMAIN ||
    localConfig?.authDomain ||
    "chintan-gpt-36e90.firebaseapp.com",
  projectId:
    metaEnv?.VITE_FIREBASE_PROJECT_ID ||
    localConfig?.projectId ||
    "chintan-gpt-36e90",
  storageBucket:
    metaEnv?.VITE_FIREBASE_STORAGE_BUCKET ||
    localConfig?.storageBucket ||
    "chintan-gpt-36e90.firebasestorage.app",
  messagingSenderId:
    metaEnv?.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    localConfig?.messagingSenderId ||
    "691202754082",
  appId:
    metaEnv?.VITE_FIREBASE_APP_ID ||
    localConfig?.appId ||
    "1:691202754082:web:fc76b13207fbb931832c7b",
  measurementId:
    metaEnv?.VITE_FIREBASE_MEASUREMENT_ID ||
    localConfig?.measurementId ||
    "G-HCPF59DZSL",
  firestoreDatabaseId:
    metaEnv?.VITE_FIREBASE_FIRESTORE_DATABASE_ID ||
    (localConfig as any)?.firestoreDatabaseId ||
    undefined
};

// Initialize Firebase App safely without crashing
let app: FirebaseApp | null = null;
try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
} catch (err) {
  console.warn("[Firebase] App initialization warning:", err);
}

export const auth: Auth = app ? getAuth(app) : ({} as Auth);
export const googleProvider = new GoogleAuthProvider();
try {
  googleProvider.setCustomParameters({ prompt: "select_account" });
} catch {}

// Initialize Firestore safely
let firestoreInstance: Firestore;
try {
  if (app) {
    firestoreInstance = firebaseConfig.firestoreDatabaseId
      ? initializeFirestore(app, {}, firebaseConfig.firestoreDatabaseId)
      : getFirestore(app);
  } else {
    firestoreInstance = {} as Firestore;
  }
} catch {
  firestoreInstance = app ? getFirestore(app) : ({} as Firestore);
}

export const firestore: Firestore = firestoreInstance;

/**
 * Sync user profile to Firestore
 */
export async function syncUserProfileToFirestore(profile: UserProfile): Promise<void> {
  if (!profile || !profile.id || !firestore || typeof firestore.type !== "string") return;
  try {
    const userRef = doc(firestore, "users", profile.id);
    await setDoc(
      userRef,
      {
        ...profile,
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );
  } catch (err) {
    console.warn("[Firebase] Could not sync user profile to Firestore:", err);
  }
}

/**
 * Fetch user profile from Firestore
 */
export async function getUserProfileFromFirestore(userId: string): Promise<UserProfile | null> {
  if (!userId || !firestore || typeof firestore.type !== "string") return null;
  try {
    const userRef = doc(firestore, "users", userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (err) {
    console.warn("[Firebase] Could not fetch user profile from Firestore:", err);
  }
  return null;
}

/**
 * Save user progress update to Firestore
 */
export async function updateUserFirestoreData(
  userId: string,
  data: Partial<UserProfile>
): Promise<void> {
  if (!userId || !firestore || typeof firestore.type !== "string") return;
  try {
    const userRef = doc(firestore, "users", userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn("[Firebase] Could not update Firestore user document:", err);
  }
}

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  onSnapshot
};
export type { FirebaseUser };
