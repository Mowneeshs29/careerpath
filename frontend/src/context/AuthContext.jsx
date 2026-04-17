import React, { createContext, useState, useEffect, useCallback } from "react";
import { authAPI, profileAPI, setToken } from "../services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ─── Persist token in sessionStorage (not localStorage per rules, but session is acceptable for UX) ─── */
  const hydrate = useCallback(async () => {
    const stored = sessionStorage.getItem("crr_token");
    if (stored) {
      setToken(stored);
      try {
        const { data } = await authAPI.me();
        setUser(data.user);
        // also load profile
        const { data: pData } = await profileAPI.get();
        setProfile(pData.profile);
      } catch {
        sessionStorage.removeItem("crr_token");
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => { hydrate(); }, [hydrate]);

  /* ─── Register ─── */
  const register = async (payload) => {
    setError(null);
    const { data } = await authAPI.register(payload);
    sessionStorage.setItem("crr_token", data.token);
    setToken(data.token);
    setUser(data.user);
    setProfile(null);
    return data;
  };

  /* ─── Login ─── */
  const login = async (payload) => {
    setError(null);
    const { data } = await authAPI.login(payload);
    sessionStorage.setItem("crr_token", data.token);
    setToken(data.token);
    setUser(data.user);
    // load profile
    try {
      const { data: pData } = await profileAPI.get();
      setProfile(pData.profile);
    } catch { /* no profile yet */ }
    return data;
  };

  /* ─── Logout ─── */
  const logout = () => {
    sessionStorage.removeItem("crr_token");
    setToken(null);
    setUser(null);
    setProfile(null);
  };

  /* ─── Google Login ─── */
  const loginWithGoogle = async () => {
    setError(null);
    try {
      const { auth, googleProvider } = await import("../config/firebase");
      const { signInWithPopup } = await import("firebase/auth");
      
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      
      // Dispatch to backend to create user or get JWT
      const { data } = await authAPI.google({
        name: fbUser.displayName,
        email: fbUser.email,
        googleId: fbUser.uid
      });

      sessionStorage.setItem("crr_token", data.token);
      setToken(data.token);
      setUser(data.user);
      
      try {
        const { data: pData } = await profileAPI.get();
        setProfile(pData.profile);
      } catch { /* ignore */ }
      
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Google Login failed");
      throw err;
    }
  };

  /* ─── Update Profile (local + remote) ─── */
  const updateProfile = async (payload) => {
    const { data } = await profileAPI.update(payload);
    setProfile(data.profile);
    return data.profile;
  };

  const value = { user, profile, loading, error, setError, register, login, logout, loginWithGoogle, updateProfile };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
