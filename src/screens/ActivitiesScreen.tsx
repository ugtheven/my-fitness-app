import { useTranslation } from 'react-i18next';
import { Text, YStack } from 'tamagui';
import { colors } from '@/lib/theme';

export function ActivitiesScreen() {
  const { t } = useTranslation('activities');

  return (
    <YStack
      flex={1}
      style={{ backgroundColor: colors.background }}
      px={24}
      pt={64}
      gap={24}
    >
      <Text fontSize={30} fontWeight="700" color={colors.text}>
        {t('title.activities')}
      </Text>
    </YStack>
  );
}
