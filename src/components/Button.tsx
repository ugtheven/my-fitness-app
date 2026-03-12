import { LinearGradient } from 'expo-linear-gradient';
import { type ReactNode, useMemo } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from 'react-native';

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

  const content = useMemo(() => {
    if (loading) {
      return <ActivityIndicator color={isGhost ? '#22c55e' : '#0d0d0d'} />;
    }
    return (
      <>
        {startIcon ? <View className="mr-2">{startIcon}</View> : null}
        <Text
          className={`text-base font-semibold ${isGhost ? 'text-text-muted' : 'text-text'}`}
        >
          {label}
        </Text>
        {endIcon ? <View className="ml-2">{endIcon}</View> : null}
      </>
    );
  }, [loading, isGhost, startIcon, endIcon, label]);

  if (isGhost) {
    return (
      <TouchableOpacity
        disabled={isDisabled}
        className={`w-full flex-row items-center justify-center rounded-xl border border-dashed border-background-paper py-4 text-text-muted ${isDisabled ? 'opacity-50' : ''}`}
        {...props}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={0.85}
      className={`w-full overflow-hidden rounded-xl ${isDisabled ? 'opacity-50' : ''}`}
      {...props}
    >
      <LinearGradient
        colors={['#22c55e', '#16a34a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="w-full flex-row items-center justify-center py-4"
      >
        {content}
      </LinearGradient>
    </TouchableOpacity>
  );
}
