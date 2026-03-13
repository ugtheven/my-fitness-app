import { useTranslation } from 'react-i18next';
import { Switch, Text, View } from 'react-native';
import { Button } from '@/components/Button';
import { useAuthContext } from '@/context/auth';

export function ProfileScreen() {
  const { t, i18n } = useTranslation('profile');
  const { signOut } = useAuthContext();

  return (
    <View className="flex-1 bg-background px-6 pt-16">
      <Text className="mb-8 text-3xl font-bold text-text">
        {t('title.profile')}
      </Text>

      <View className="flex-row items-center justify-between">
        <Text className="text-base font-medium text-text">
          {t('label.language')}
        </Text>
        <View className="flex-row items-center gap-3">
          <Text className="text-sm text-text-muted">EN</Text>
          <Switch
            value={i18n.language === 'fr'}
            onValueChange={(val) => void i18n.changeLanguage(val ? 'fr' : 'en')}
            trackColor={{ false: '#3a3a3a', true: '#22c55e' }}
            thumbColor="#ffffff"
          />
          <Text className="text-sm text-text-muted">FR</Text>
        </View>
      </View>

      <View className="mt-auto pb-32">
        <Button variant="ghost" label={t('button.signOut')} onPress={signOut} />
      </View>
    </View>
  );
}
