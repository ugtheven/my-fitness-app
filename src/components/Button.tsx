import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';
import { Text, XStack } from 'tamagui';
import { colors } from '@/lib/theme';

type ButtonProps = TouchableOpacityProps & {
  label: string;
  loading?: boolean;
  variant?: 'primary' | 'ghost';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export function Button({
  label,
  loading,
  variant = 'primary',
  disabled,
  startIcon,
  endIcon,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const isGhost = variant === 'ghost';

  const content = loading ? (
    <ActivityIndicator color={isGhost ? colors.accent : colors.text} />
  ) : (
    <XStack items="center" gap={8}>
      {startIcon}
      <Text
        fontSize={16}
        fontWeight="600"
        color={isGhost ? colors.textMuted : colors.text}
      >
        {label}
      </Text>
      {endIcon}
    </XStack>
  );

  return (
    <TouchableOpacity disabled={isDisabled} activeOpacity={0.85} {...props}>
      <XStack
        width="100%"
        items="center"
        justify="center"
        py={16}
        rounded={12}
        opacity={isDisabled ? 0.5 : 1}
        style={
          isGhost
            ? { borderWidth: 1, borderColor: colors.border }
            : { backgroundColor: colors.accent }
        }
      >
        {content}
      </XStack>
    </TouchableOpacity>
  );
}
