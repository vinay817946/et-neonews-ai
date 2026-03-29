
"use client";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./client";

export function subscribeToWatchlist(uid, callback) {
  const ref = collection(db, "users", uid, "watchlist");
  const q = query(ref, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((item) => ({ docId: item.id, ...item.data() })));
  });
}

export async function addToWatchlist(uid, story) {
  const ref = collection(db, "users", uid, "watchlist");
  const existing = await getDocs(query(ref, where("storyId", "==", story.id)));
  if (!existing.empty) return { ok: true, duplicate: true };
  await addDoc(ref, {
    storyId: story.id,
    name: story.title,
    summary: story.summary || "",
    type: story.category || "Story",
    status: "Tracking",
    tags: story.tags || [],
    sourceCount: story.sourceCount || 1,
    readTime: story.readTime || "5 min",
    createdAt: serverTimestamp(),
  });
  return { ok: true, duplicate: false };
}

export async function removeFromWatchlist(uid, docId) {
  await deleteDoc(doc(db, "users", uid, "watchlist", docId));
}
