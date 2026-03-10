import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";

const TOKEN_KEY = "session_token";

export function useAuth() {
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    AsyncStorage.getItem(TOKEN_KEY)
      .then((t) => setToken(t ?? null))
      .catch(() => setToken(null));
  }, []);

  const user = useQuery(
    api.queries.user.getCurrentUser,
    token ? { token } : "skip"
  );

  const saveToken = useCallback(async (newToken: string) => {
    await AsyncStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  const isLoading = token === undefined || (!!token && user === undefined);
  const isAuthenticated = !!token && !!user;

  return { user, isLoading, isAuthenticated, saveToken, signOut };
}
