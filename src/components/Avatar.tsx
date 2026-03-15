import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { Text } from 'tamagui';

type AvatarProps = {
  name: string;
  onPress?: () => void;
};

export function Avatar({ name, onPress }: AvatarProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={['#4ade80', '#16a34a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text color="white" fontSize={24} fontWeight="700">
          {name.charAt(0).toUpperCase()}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
