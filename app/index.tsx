import { Redirect } from 'expo-router';
import { useAuthContext } from '@/context/auth';

export default function Index() {
  const { isLoading, isAuthenticated } = useAuthContext();

  if (isLoading) {
    return null;
  }

  return <Redirect href={isAuthenticated ? '/(app)/' : '/(auth)/login'} />;
}
