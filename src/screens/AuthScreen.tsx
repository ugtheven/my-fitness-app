import { useMutation } from 'convex/react';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { api } from '../../convex/_generated/api';

type Props = {
  onAuth: (token: string) => void;
};

export function AuthScreen({ onAuth }: Props) {
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = useMutation(api.mutations.auth.signUp);
  const signIn = useMutation(api.mutations.auth.signIn);

  const handle = useCallback(async () => {
    const normalizedEmail = email.trim();
    const normalizedFullName = fullName.trim();

    if (!normalizedEmail || !password) {
      setError('Merci de remplir email et mot de passe.');
      return;
    }

    if (mode === 'signUp') {
      if (!normalizedFullName) {
        setError('Le nom complet est requis.');
        return;
      }
      if (!confirmPassword) {
        setError('Merci de confirmer le mot de passe.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Les mots de passe ne correspondent pas.');
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
          fullName: normalizedFullName,
          email: normalizedEmail,
          password,
        });
        onAuth(token);
      }
    } catch (e: any) {
      setError(e.message ?? 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  }, [confirmPassword, email, fullName, mode, onAuth, password, signIn, signUp]);

  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      <View className="mb-4 w-full flex-row rounded-lg border border-neutral-800 p-1">
        <TouchableOpacity
          className={`flex-1 items-center rounded-md py-2.5 ${mode === 'signIn' ? 'bg-white' : ''}`}
          onPress={() => {
            setMode('signIn');
            setError('');
          }}
        >
          <Text className={`${mode === 'signIn' ? 'text-black' : 'text-white'} font-semibold`}>
            Connexion
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 items-center rounded-md py-2.5 ${mode === 'signUp' ? 'bg-white' : ''}`}
          onPress={() => {
            setMode('signUp');
            setError('');
          }}
        >
          <Text className={`${mode === 'signUp' ? 'text-black' : 'text-white'} font-semibold`}>
            Inscription
          </Text>
        </TouchableOpacity>
      </View>

      {mode === 'signUp' ? (
        <TextInput
          className="mb-3 w-full rounded-lg border border-neutral-800 px-4 py-3 text-base text-white"
          placeholder="Nom complet"
          placeholderTextColor="#555"
          value={fullName}
          onChangeText={setFullName}
        />
      ) : null}

      <TextInput
        className="mb-3 w-full rounded-lg border border-neutral-800 px-4 py-3 text-base text-white"
        placeholder="Email"
        placeholderTextColor="#555"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View className="mb-3 w-full flex-row items-center rounded-lg border border-neutral-800">
        <TextInput
          className="flex-1 px-4 py-3 text-base text-white"
          placeholder="Mot de passe"
          placeholderTextColor="#555"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity className="px-4 py-3" onPress={() => setShowPassword((prev) => !prev)}>
          <Text className="text-xs text-neutral-400">{showPassword ? 'Masquer' : 'Afficher'}</Text>
        </TouchableOpacity>
      </View>

      {mode === 'signUp' ? (
        <View className="mb-3 w-full flex-row items-center rounded-lg border border-neutral-800">
          <TextInput
            className="flex-1 px-4 py-3 text-base text-white"
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#555"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            className="px-4 py-3"
            onPress={() => setShowConfirmPassword((prev) => !prev)}
          >
            <Text className="text-xs text-neutral-400">
              {showConfirmPassword ? 'Masquer' : 'Afficher'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {error ? <Text className="mb-3 text-center text-sm text-red-500">{error}</Text> : null}
      {loading ? (
        <ActivityIndicator color="#fff" className="mt-3" />
      ) : (
        <TouchableOpacity
          className="w-full items-center rounded-lg bg-white py-3.5"
          onPress={handle}
        >
          <Text className="text-base font-semibold text-black">
            {mode === 'signIn' ? 'Se connecter' : "S'inscrire"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
