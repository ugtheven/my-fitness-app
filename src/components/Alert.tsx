import { Text, View } from 'react-native';

type AlertProps = {
  title: string;
  content?: string;
  color: 'success' | 'warning' | 'error';
};

export function Alert({ title, content, color }: AlertProps) {
  const backgroundColor = {
    success: 'bg-success/15',
    warning: 'bg-warning/15',
    error: 'bg-accent-danger/15',
  };

  const textColor = {
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-accent-danger',
  };

  return (
    <View className={`w-full rounded-lg border p-3 ${backgroundColor[color]}`}>
      {title ? (
        <Text className={`text-sm font-semibold ${textColor[color]}`}>
          {title}
        </Text>
      ) : null}
      {content ? (
        <Text className={`text-sm ${textColor[color]}`}>{content}</Text>
      ) : null}
    </View>
  );
}
