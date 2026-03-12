import './global.css';

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from './src/hooks/useAuth';
import { AuthScreen } from './src/screens/AuthScreen';

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
if (!convexUrl) throw new Error('EXPO_PUBLIC_CONVEX_URL is not set');
const convex = new ConvexReactClient(convexUrl);

function Root() {
  const { isLoading, isAuthenticated, saveToken, signOut } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <AuthScreen onAuth={saveToken} />;
  }

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-2xl font-bold text-white">fitness-app</Text>
      <TouchableOpacity
        className="mt-8 rounded-lg border border-neutral-700 px-6 py-2.5"
        onPress={signOut}
      >
        <Text className="text-sm text-neutral-500">Se déconnecter</Text>
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
