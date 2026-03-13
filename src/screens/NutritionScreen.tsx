import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

export function NutritionScreen() {
  const { t } = useTranslation('nutrition');

  return (
    <View className="flex-1 bg-background px-6 pt-16">
      <Text className="text-3xl font-bold text-text">
        {t('title.nutrition')}
      </Text>
    </View>
  );
}
