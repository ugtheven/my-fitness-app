import { Text, View } from 'react-native';
import { Button } from '@/components/Button';
import { useAuthContext } from '@/context/auth';

export function HomeScreen() {
  const { user, signOut } = useAuthContext();

  const now = new Date();

  return (
    <View className="flex-1 bg-background px-6 pt-16">
      <Text className="mb-1 text-lg text-text-muted font-bold">
        {now.toLocaleDateString('en-US', {
          weekday: 'short',
          day: 'numeric',
          month: 'long',
        })}
      </Text>
      <Text className="text-4xl font-bold text-text">Hey, {user?.name} 👋</Text>
      <View className="mt-auto pb-10">
        <Button variant="ghost" label="Sign out" onPress={signOut} />
      </View>
    </View>
  );
}
