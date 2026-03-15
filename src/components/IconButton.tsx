import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { YStack } from 'tamagui';
import { Ionicons } from '@/lib/icons';
import { colors } from '@/lib/theme';

type IconButtonProps = TouchableOpacityProps & {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  size?: number;
  color?: string;
  variant?: 'default' | 'ghost';
};

export function IconButton({
  icon,
  size = 22,
  color,
  variant = 'default',
  disabled,
  ...props
}: IconButtonProps) {
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      {...props}
    >
      <YStack
        items="center"
        justify="center"
        rounded={12}
        p={10}
        opacity={disabled ? 0.4 : 1}
        style={{
          backgroundColor: isGhost ? 'transparent' : colors.backgroundPaper,
        }}
      >
        <Ionicons
          name={icon}
          size={size}
          color={color ?? (isGhost ? `${colors.text}80` : colors.text)}
        />
      </YStack>
    </TouchableOpacity>
  );
}
