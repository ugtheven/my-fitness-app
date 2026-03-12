import { useAuthContext } from '@/context/auth';
import { AuthScreen } from '@/screens/AuthScreen';

export default function Login() {
  const { saveToken } = useAuthContext();

  async function handleAuth(token: string) {
    await saveToken(token);
  }

  return <AuthScreen onAuth={handleAuth} />;
}
