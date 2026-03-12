import '../global.css';

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/context/auth';

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error('EXPO_PUBLIC_CONVEX_URL is not set');
}
const convex = new ConvexReactClient(convexUrl);

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <AuthProvider>
        <StatusBar style="light" />
        <Slot />
      </AuthProvider>
    </ConvexProvider>
  );
}
