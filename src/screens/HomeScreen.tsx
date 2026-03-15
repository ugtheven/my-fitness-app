import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text, XStack, YStack } from 'tamagui';
import { Avatar } from '@/components/Avatar';
import { useAuthContext } from '@/context/auth';
import { colors } from '@/lib/theme';

export function HomeScreen() {
  const { t, i18n } = useTranslation('home');
  const { user } = useAuthContext();
  const router = useRouter();

  const now = new Date();

  return (
    <YStack
      flex={1}
      style={{ backgroundColor: colors.background }}
      px={24}
      pt={64}
      gap={24}
    >
      <YStack gap={4}>
        <Text fontSize={18} fontWeight="700" color={colors.textMuted}>
          {now.toLocaleDateString(i18n.language, {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
          })}
        </Text>
        <XStack items="center" justify="space-between" gap={8}>
          <Text fontSize={36} fontWeight="700" color={colors.text} flex={1}>
            {t('title.greeting', { name: user?.name })}
          </Text>
          <Avatar
            name={user?.name ?? ''}
            onPress={() => router.push('/profile')}
          />
        </XStack>
      </YStack>
    </YStack>
  );
}
