import { Text, YStack } from 'tamagui';
import { colors } from '@/lib/theme';

type AlertProps = {
  title: string;
  content?: string;
  variant: 'success' | 'warning' | 'error';
};

const variants = {
  success: {
    bg: `${colors.success}26`,
    text: colors.success,
    border: `${colors.success}4d`,
  },
  warning: {
    bg: `${colors.warning}26`,
    text: colors.warning,
    border: `${colors.warning}4d`,
  },
  error: {
    bg: `${colors.accentDanger}26`,
    text: colors.accentDanger,
    border: `${colors.accentDanger}4d`,
  },
};

export function Alert({ title, content, variant }: AlertProps) {
  const { bg, text, border } = variants[variant];

  return (
    <YStack
      width="100%"
      rounded={12}
      borderWidth={1}
      p={12}
      gap={4}
      style={{ borderColor: border, backgroundColor: bg }}
    >
      {title ? (
        <Text fontSize={14} fontWeight="600" color={text}>
          {title}
        </Text>
      ) : null}
      {content ? (
        <Text fontSize={14} color={text}>
          {content}
        </Text>
      ) : null}
    </YStack>
  );
}
