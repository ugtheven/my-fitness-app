import { Redirect, Slot } from 'expo-router';
import { YStack } from 'tamagui';
import { Navbar } from '@/components/Navbar';
import { useAuthContext } from '@/context/auth';

export default function AppLayout() {
  const { isLoading, isAuthenticated } = useAuthContext();

  if (isLoading) {
    return null;
  }
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <YStack flex={1}>
      <Slot />
      <Navbar />
    </YStack>
  );
}
