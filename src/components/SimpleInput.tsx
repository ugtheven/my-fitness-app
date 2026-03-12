import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

type SimpleInputProps = TextInputProps & {
  label?: string;
  error?: string;
  startIcon?: ReactNode;
};

export function SimpleInput({
  label,
  error,
  secureTextEntry,
  startIcon,
  ...props
}: SimpleInputProps) {
  const [hidden, setHidden] = useState(secureTextEntry ?? false);

  return (
    <View className="w-full gap-1">
      {label ? <Text className="mb-1 text-sm font-semibold text-text-muted">{label}</Text> : null}

      <View
        className={[
          'flex-row items-center rounded-xl border bg-background-paper px-4 py-3',
          error ? 'border-accent-danger' : 'border-neutral-800',
        ].join(' ')}
      >
        {startIcon ? <View className="mr-2">{startIcon}</View> : null}
        <TextInput
          className="4 flex-1 text-base text-text outline-none"
          placeholderTextColor="#6b6b6b"
          secureTextEntry={hidden}
          {...props}
        />
        {secureTextEntry ? (
          <TouchableOpacity onPress={() => setHidden((h) => !h)}>
            <Ionicons
              name={hidden ? 'eye-outline' : 'eye-off-outline'}
              size={16}
              className="text-text-muted"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? <Text className="mt-1 text-xs text-accent-danger">{error}</Text> : null}
    </View>
  );
}
