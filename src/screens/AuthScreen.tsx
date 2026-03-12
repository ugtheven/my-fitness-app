import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation } from 'convex/react';
import { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { SimpleInput } from '@/components/SimpleInput';
import { api } from '../../convex/_generated/api';

type Props = {
  onAuth: (token: string) => void;
};

export function AuthScreen({ onAuth }: Props) {
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = useMutation(api.mutations.auth.signUp);
  const signIn = useMutation(api.mutations.auth.signIn);

  const handle = useCallback(async () => {
    const normalizedEmail = email.trim();
    const normalizedName = name.trim();

    if (!normalizedEmail || !password) {
      setError('Merci de remplir email et mot de passe.');
      return;
    }

    if (mode === 'signUp') {
      if (!normalizedName) {
        setError('Name is required.');
        return;
      }
      if (!confirmPassword) {
        setError('Please confirm the password.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setError('');
    setLoading(true);
    try {
      if (mode === 'signIn') {
        const { token } = await signIn({ email: normalizedEmail, password });
        onAuth(token);
      } else {
        const { token } = await signUp({
          name: normalizedName,
          email: normalizedEmail,
          password,
        });
        onAuth(token);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  }, [confirmPassword, email, name, mode, onAuth, password, signIn, signUp]);

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-black px-6">
      <View className="w-full flex-row rounded-xl border bg-background-paper p-1.5">
        <TouchableOpacity
          className={`flex-1 items-center rounded-xl py-3 ${mode === 'signIn' ? 'bg-accent/15' : ''}`}
          onPress={() => {
            setMode('signIn');
            setError('');
          }}
        >
          <Text
            className={`${mode === 'signIn' ? 'text-accent' : 'text-text-muted'} text-base font-medium`}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 items-center rounded-xl py-3 ${mode === 'signUp' ? 'bg-accent/15' : ''}`}
          onPress={() => {
            setMode('signUp');
            setError('');
          }}
        >
          <Text
            className={`${mode === 'signUp' ? 'text-accent' : 'text-text-muted'} text-base font-medium`}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>

      {mode === 'signIn' && (
        <>
          <SimpleInput
            startIcon={
              <Ionicons
                name="mail-outline"
                size={16}
                className="text-text-muted"
              />
            }
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
          />
          <SimpleInput
            label="Password"
            startIcon={
              <Ionicons
                name="lock-closed-outline"
                size={16}
                className="text-text-muted"
              />
            }
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            placeholder="Password"
          />
        </>
      )}

      {mode === 'signUp' && (
        <>
          <SimpleInput
            label="Name"
            startIcon={
              <Ionicons
                name="person-outline"
                size={16}
                className="text-text-muted"
              />
            }
            value={name}
            onChangeText={setName}
            placeholder="Your name"
          />
          <SimpleInput
            label="Email"
            startIcon={
              <Ionicons
                name="mail-outline"
                size={16}
                className="text-text-muted"
              />
            }
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
          />
          <SimpleInput
            label="Password"
            startIcon={
              <Ionicons
                name="lock-closed-outline"
                size={16}
                className="text-text-muted"
              />
            }
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            placeholder="Password"
          />
          <SimpleInput
            label="Confirm password"
            startIcon={
              <Ionicons
                name="lock-closed-outline"
                size={16}
                className="text-text-muted"
              />
            }
            value={confirmPassword}
            secureTextEntry
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
          />
        </>
      )}

      {error && <Alert title={error} color="error" />}
      <Button
        loading={loading}
        endIcon={
          <Ionicons
            name="arrow-forward-outline"
            size={16}
            className="text-text"
          />
        }
        label={mode === 'signIn' ? 'Sign in' : 'Sign up'}
        onPress={handle}
      />
    </View>
  );
}
