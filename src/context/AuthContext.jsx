
"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase/client";

const AuthContext = createContext(null);

async function syncUserProfile(user, extra = {}) {
  if (!user) return;
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || extra.displayName || "",
    photoURL: user.photoURL || "",
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
    ...extra,
  }, { merge: true });
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);
      setInitializing(false);
      if (currentUser) {
        try { await syncUserProfile(currentUser); } catch {}
      }
    });
    return () => unsub();
  }, []);

  const value = useMemo(() => ({
    user,
    initializing,
    isAuthenticated: Boolean(user),
    async login(email, password) {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      await syncUserProfile(credential.user);
      return credential.user;
    },
    async signup({ name, email, password }) {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(credential.user, { displayName: name });
      await syncUserProfile(credential.user, { displayName: name });
      return credential.user;
    },
    async loginWithGoogle() {
      const credential = await signInWithPopup(auth, googleProvider);
      await syncUserProfile(credential.user);
      return credential.user;
    },
    async logout() { await signOut(auth); },
  }), [user, initializing]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
