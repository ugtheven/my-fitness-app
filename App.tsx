import "./global.css";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthScreen } from "./src/screens/AuthScreen";
import { useAuth } from "./src/hooks/useAuth";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

function Root() {
  const { isLoading, isAuthenticated, saveToken, signOut } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <AuthScreen onAuth={saveToken} />;
  }

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white text-2xl font-bold">fitness-app</Text>
      <TouchableOpacity
        className="mt-8 border border-neutral-700 rounded-lg px-6 py-2.5"
        onPress={signOut}
      >
        <Text className="text-neutral-500 text-sm">Se déconnecter</Text>
      </TouchableOpacity>
      <StatusBar style="light" />
    </View>
  );
}

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <Root />
    </ConvexProvider>
  );
}
