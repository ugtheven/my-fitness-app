import '@/i18n';

import { TamaguiProvider } from '@tamagui/core';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/context/auth';
import config from '../tamagui.config';

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error('EXPO_PUBLIC_CONVEX_URL is not set');
}
const convex = new ConvexReactClient(convexUrl);

export default function RootLayout() {
  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <ConvexProvider client={convex}>
        <AuthProvider>
          <StatusBar style="light" />
          <Slot />
        </AuthProvider>
      </ConvexProvider>
    </TamaguiProvider>
  );
}
