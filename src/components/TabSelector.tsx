import { TouchableOpacity } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';
import { colors } from '@/lib/theme';

type Option = {
  value: string;
  label: string;
};

type TabSelectorProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export function TabSelector({ options, value, onChange }: TabSelectorProps) {
  return (
    <XStack
      width="100%"
      rounded={12}
      borderWidth={1}
      borderColor={colors.border}
      bg={colors.backgroundPaper}
      p={6}
      gap={4}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <TouchableOpacity
            key={option.value}
            style={{ flex: 1 }}
            onPress={() => onChange(option.value)}
          >
            <YStack
              flex={1}
              items="center"
              rounded={10}
              py={12}
              style={{
                backgroundColor: isActive
                  ? 'rgba(34,197,94,0.15)'
                  : 'transparent',
              }}
            >
              <Text
                fontSize={16}
                fontWeight="500"
                color={isActive ? colors.accent : colors.textMuted}
              >
                {option.label}
              </Text>
            </YStack>
          </TouchableOpacity>
        );
      })}
    </XStack>
  );
}
