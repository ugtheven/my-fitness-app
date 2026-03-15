import type { ReactNode } from 'react';
import { useState } from 'react';
import { TextInput, type TextInputProps, TouchableOpacity } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';
import { Ionicons } from '@/lib/icons';
import { colors } from '@/lib/theme';

type TextfieldProps = TextInputProps & {
  label?: string;
  error?: string;
  startIcon?: ReactNode;
};

export function Textfield({
  label,
  error,
  secureTextEntry,
  startIcon,
  ...props
}: TextfieldProps) {
  const [hidden, setHidden] = useState(secureTextEntry ?? false);

  return (
    <YStack width="100%" gap={4}>
      {label ? (
        <Text fontSize={13} fontWeight="600" color={colors.textMuted} mb={2}>
          {label}
        </Text>
      ) : null}

      <XStack
        items="center"
        rounded={12}
        borderWidth={1}
        px={16}
        py={16}
        gap={8}
        style={{
          borderColor: error ? colors.accentDanger : colors.border,
          backgroundColor: colors.backgroundPaper,
        }}
      >
        {startIcon}
        <TextInput
          style={{ flex: 1, color: colors.text, fontSize: 16, padding: 0 }}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={hidden}
          {...props}
        />
        {secureTextEntry ? (
          <TouchableOpacity onPress={() => setHidden((h) => !h)}>
            <Ionicons
              name={hidden ? 'eye-outline' : 'eye-off-outline'}
              size={16}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        ) : null}
      </XStack>

      {error ? (
        <Text fontSize={12} color={colors.accentDanger} mt={2}>
          {error}
        </Text>
      ) : null}
    </YStack>
  );
}
