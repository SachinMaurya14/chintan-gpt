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
import firebaseConfig from "../../firebase-applet-config.json";
import { UserProfile } from "../types/index.js";

// Initialize Firebase App
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Initialize Firestore with specific database ID if configured
export const firestore: Firestore = firebaseConfig.firestoreDatabaseId
  ? initializeFirestore(app, {}, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

/**
 * Sync user profile to Firestore
 */
export async function syncUserProfileToFirestore(profile: UserProfile): Promise<void> {
  if (!profile || !profile.id) return;
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
  if (!userId) return null;
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
  if (!userId) return;
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
  setDoc,
  getDoc
};
export type { FirebaseUser };
