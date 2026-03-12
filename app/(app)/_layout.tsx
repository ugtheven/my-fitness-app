import { Redirect, Slot } from 'expo-router';
import { useAuthContext } from '@/context/auth';

export default function AppLayout() {
  const { isLoading, isAuthenticated } = useAuthContext();

  if (isLoading) {
    return null;
  }
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Slot />;
}
