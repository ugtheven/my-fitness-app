import { useMutation } from 'convex/react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { SimpleInput } from '@/components/SimpleInput';
import { Ionicons } from '@/lib/icons';
import { api } from '../../convex/_generated/api';

type Props = {
  onAuth: (token: string) => void;
};

export function AuthScreen({ onAuth }: Props) {
  const { t } = useTranslation('auth');
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
      setError(t('error.emailAndPassword'));
      return;
    }

    if (mode === 'signUp') {
      if (!normalizedName) {
        setError(t('error.nameRequired'));
        return;
      }
      if (!confirmPassword) {
        setError(t('error.confirmPasswordRequired'));
        return;
      }
      if (password !== confirmPassword) {
        setError(t('error.passwordMismatch'));
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
      setError(e instanceof Error ? e.message : t('error.generic'));
    } finally {
      setLoading(false);
    }
  }, [confirmPassword, email, name, mode, onAuth, password, signIn, signUp, t]);

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
            {t('button.signIn')}
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
            {t('button.signUp')}
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
            label={t('input.email.label')}
            value={email}
            onChangeText={setEmail}
            placeholder={t('input.email.placeholder')}
          />
          <SimpleInput
            label={t('input.password.label')}
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
            placeholder={t('input.password.placeholder')}
          />
        </>
      )}

      {mode === 'signUp' && (
        <>
          <SimpleInput
            label={t('input.name.label')}
            startIcon={
              <Ionicons
                name="person-outline"
                size={16}
                className="text-text-muted"
              />
            }
            value={name}
            onChangeText={setName}
            placeholder={t('input.name.placeholder')}
          />
          <SimpleInput
            label={t('input.email.label')}
            startIcon={
              <Ionicons
                name="mail-outline"
                size={16}
                className="text-text-muted"
              />
            }
            value={email}
            onChangeText={setEmail}
            placeholder={t('input.email.placeholder')}
          />
          <SimpleInput
            label={t('input.password.label')}
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
            placeholder={t('input.password.placeholder')}
          />
          <SimpleInput
            label={t('input.confirmPassword.label')}
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
            placeholder={t('input.confirmPassword.placeholder')}
          />
        </>
      )}

      {error ? <Alert title={error} color="error" /> : null}
      <Button
        loading={loading}
        endIcon={
          <Ionicons
            name="arrow-forward-outline"
            size={16}
            className="text-text"
          />
        }
        label={mode === 'signIn' ? t('button.signIn') : t('button.signUp')}
        onPress={handle}
      />
    </View>
  );
}
