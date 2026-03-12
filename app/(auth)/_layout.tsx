import { Redirect, Slot } from 'expo-router';
import { useAuthContext } from '@/context/auth';

export default function AuthLayout() {
  const { isLoading, isAuthenticated } = useAuthContext();

  if (isLoading) {
    return null;
  }
  if (isAuthenticated) {
    return <Redirect href="/(app)/" />;
  }

  return <Slot />;
}
