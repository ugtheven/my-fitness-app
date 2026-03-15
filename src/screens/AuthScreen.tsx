import { useMutation } from 'convex/react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { Text, YStack } from 'tamagui';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { TabSelector } from '@/components/TabSelector';
import { Textfield } from '@/components/Textfield';
import { Ionicons } from '@/lib/icons';
import { colors } from '@/lib/theme';
import { api } from '../../convex/_generated/api';

type Props = {
  onAuth: (token: string) => void;
};

export function AuthScreen({ onAuth }: Props) {
  const { t } = useTranslation('auth');
  const [mode, setMode] = useState('signIn');
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
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 32,
        gap: 16,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <YStack height="100%" items="flex-start" gap={16}>
        <YStack
          height={260}
          width="100%"
          items="center"
          justify="center"
          gap={16}
        >
          <Text fontSize={32} fontWeight="700" color={colors.text}>
            FitTracker
          </Text>
          <Text fontSize={20} fontWeight="400" color={colors.textMuted}>
            Your fitness journey starts here
          </Text>
        </YStack>
        <TabSelector
          options={[
            { value: 'signIn', label: t('button.signIn') },
            { value: 'signUp', label: t('button.signUp') },
          ]}
          value={mode}
          onChange={(val) => {
            setMode(val);
            setError('');
          }}
        />

        {mode === 'signIn' && (
          <>
            <Textfield
              startIcon={
                <Ionicons
                  name="mail-outline"
                  size={16}
                  color={colors.textMuted}
                />
              }
              label={t('input.email.label')}
              value={email}
              onChangeText={setEmail}
              placeholder={t('input.email.placeholder')}
            />
            <Textfield
              label={t('input.password.label')}
              startIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={16}
                  color={colors.textMuted}
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
            <Textfield
              label={t('input.name.label')}
              startIcon={
                <Ionicons
                  name="person-outline"
                  size={16}
                  color={colors.textMuted}
                />
              }
              value={name}
              onChangeText={setName}
              placeholder={t('input.name.placeholder')}
            />
            <Textfield
              label={t('input.email.label')}
              startIcon={
                <Ionicons
                  name="mail-outline"
                  size={16}
                  color={colors.textMuted}
                />
              }
              value={email}
              onChangeText={setEmail}
              placeholder={t('input.email.placeholder')}
            />
            <Textfield
              label={t('input.password.label')}
              startIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={16}
                  color={colors.textMuted}
                />
              }
              value={password}
              secureTextEntry
              onChangeText={setPassword}
              placeholder={t('input.password.placeholder')}
            />
            <Textfield
              label={t('input.confirmPassword.label')}
              startIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={16}
                  color={colors.textMuted}
                />
              }
              value={confirmPassword}
              secureTextEntry
              onChangeText={setConfirmPassword}
              placeholder={t('input.confirmPassword.placeholder')}
            />
          </>
        )}

        {error ? <Alert title={error} variant="error" /> : null}
        <YStack width="100%">
          <Button
            loading={loading}
            endIcon={
              <Ionicons
                name="arrow-forward-outline"
                size={16}
                color={colors.text}
              />
            }
            label={mode === 'signIn' ? t('button.signIn') : t('button.signUp')}
            onPress={handle}
          />
        </YStack>
      </YStack>
    </ScrollView>
  );
}
