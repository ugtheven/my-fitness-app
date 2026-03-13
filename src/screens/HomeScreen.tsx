import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useAuthContext } from '@/context/auth';

export function HomeScreen() {
  const { t, i18n } = useTranslation('home');
  const { user } = useAuthContext();

  const now = new Date();

  return (
    <View className="flex-1 bg-background px-6 pt-16">
      <Text className="mb-1 font-bold text-lg text-text-muted">
        {now.toLocaleDateString(i18n.language, {
          weekday: 'short',
          day: 'numeric',
          month: 'long',
        })}
      </Text>
      <Text className="text-4xl font-bold text-text">
        {t('title.greeting', { name: user?.name })}
      </Text>
    </View>
  );
}
