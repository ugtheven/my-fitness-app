import { useTranslation } from 'react-i18next';
import { Switch } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';
import { Button } from '@/components/Button';
import { useAuthContext } from '@/context/auth';
import { colors } from '@/lib/theme';

export function ProfileScreen() {
  const { t, i18n } = useTranslation('profile');
  const { signOut } = useAuthContext();

  return (
    <YStack
      flex={1}
      style={{ backgroundColor: colors.background }}
      px={24}
      pt={64}
      gap={24}
    >
      <Text fontSize={30} fontWeight="700" color={colors.text}>
        {t('title.profile')}
      </Text>

      <XStack items="center" justify="space-between">
        <Text fontSize={16} fontWeight="500" color={colors.text}>
          {t('label.language')}
        </Text>
        <XStack items="center" gap={12}>
          <Text fontSize={14} color={colors.textMuted}>
            EN
          </Text>
          <Switch
            value={i18n.language === 'fr'}
            onValueChange={(val) => void i18n.changeLanguage(val ? 'fr' : 'en')}
            trackColor={{ false: '#3a3a3a', true: colors.accent }}
            thumbColor={colors.text}
          />
          <Text fontSize={14} color={colors.textMuted}>
            FR
          </Text>
        </XStack>
      </XStack>

      <YStack flex={1} justify="flex-end" pb={128}>
        <Button variant="ghost" label={t('button.signOut')} onPress={signOut} />
      </YStack>
    </YStack>
  );
}
