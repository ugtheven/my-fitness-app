import { useTranslation } from 'react-i18next';
import { Switch, Text, View } from 'react-native';
import { Button } from '@/components/Button';
import { useAuthContext } from '@/context/auth';

export function HomeScreen() {
  const { t, i18n } = useTranslation('home');
  const { user, signOut } = useAuthContext();

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
      <View className="flex-row items-center justify-between">
        <Text className="text-base text-text-muted">EN</Text>
        <Switch
          value={i18n.language === 'fr'}
          onValueChange={(val) => void i18n.changeLanguage(val ? 'fr' : 'en')}
          trackColor={{ false: '#3a3a3a', true: '#22c55e' }}
          thumbColor="#ffffff"
        />
        <Text className="text-base text-text-muted">FR</Text>
      </View>
      <View className="mt-auto pb-10">
        <Button variant="ghost" label={t('button.signOut')} onPress={signOut} />
      </View>
    </View>
  );
}
