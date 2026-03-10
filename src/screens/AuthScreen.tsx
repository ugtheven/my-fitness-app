import { useMutation } from "convex/react";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { api } from "../../convex/_generated/api";

type Props = {
  onAuth: (token: string) => void;
};

export function AuthScreen({ onAuth }: Props) {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = useMutation(api.mutations.auth.signUp);
  const signIn = useMutation(api.mutations.auth.signIn);

  const handle = useCallback(async () => {
    const normalizedEmail = email.trim();
    const normalizedFullName = fullName.trim();

    if (!normalizedEmail || !password) {
      setError("Merci de remplir email et mot de passe.");
      return;
    }

    if (mode === "signUp") {
      if (!normalizedFullName) {
        setError("Le nom complet est requis.");
        return;
      }
      if (!confirmPassword) {
        setError("Merci de confirmer le mot de passe.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }
    }

    setError("");
    setLoading(true);
    try {
      if (mode === "signIn") {
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
      setError(e.message ?? "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }, [confirmPassword, email, fullName, mode, onAuth, password, signIn, signUp]);

  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      <View className="w-full flex-row rounded-lg border border-neutral-800 p-1 mb-4">
        <TouchableOpacity
          className={`flex-1 rounded-md py-2.5 items-center ${mode === "signIn" ? "bg-white" : ""}`}
          onPress={() => {
            setMode("signIn");
            setError("");
          }}
        >
          <Text className={`${mode === "signIn" ? "text-black" : "text-white"} font-semibold`}>
            Connexion
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 rounded-md py-2.5 items-center ${mode === "signUp" ? "bg-white" : ""}`}
          onPress={() => {
            setMode("signUp");
            setError("");
          }}
        >
          <Text className={`${mode === "signUp" ? "text-black" : "text-white"} font-semibold`}>
            Inscription
          </Text>
        </TouchableOpacity>
      </View>

      {mode === "signUp" ? (
        <TextInput
          className="w-full border border-neutral-800 rounded-lg text-white px-4 py-3 mb-3 text-base"
          placeholder="Nom complet"
          placeholderTextColor="#555"
          value={fullName}
          onChangeText={setFullName}
        />
      ) : null}

      <TextInput
        className="w-full border border-neutral-800 rounded-lg text-white px-4 py-3 mb-3 text-base"
        placeholder="Email"
        placeholderTextColor="#555"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View className="w-full flex-row items-center border border-neutral-800 rounded-lg mb-3">
        <TextInput
          className="flex-1 text-white px-4 py-3 text-base"
          placeholder="Mot de passe"
          placeholderTextColor="#555"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          className="px-4 py-3"
          onPress={() => setShowPassword((prev) => !prev)}
        >
          <Text className="text-neutral-400 text-xs">
            {showPassword ? "Masquer" : "Afficher"}
          </Text>
        </TouchableOpacity>
      </View>

      {mode === "signUp" ? (
        <View className="w-full flex-row items-center border border-neutral-800 rounded-lg mb-3">
          <TextInput
            className="flex-1 text-white px-4 py-3 text-base"
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
            <Text className="text-neutral-400 text-xs">
              {showConfirmPassword ? "Masquer" : "Afficher"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {error ? (
        <Text className="text-red-500 text-sm mb-3 text-center">{error}</Text>
      ) : null}
      {loading ? (
        <ActivityIndicator color="#fff" className="mt-3" />
      ) : (
        <TouchableOpacity
          className="w-full bg-white rounded-lg py-3.5 items-center"
          onPress={handle}
        >
          <Text className="text-black font-semibold text-base">
            {mode === "signIn" ? "Se connecter" : "S'inscrire"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
