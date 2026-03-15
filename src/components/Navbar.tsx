import { usePathname, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, XStack, YStack } from 'tamagui';
import { Ionicons } from '@/lib/icons';
import { colors } from '@/lib/theme';

type NavItemConfig = {
  path: string;
  labelKey: 'home' | 'programs' | 'nutrition' | 'activities' | 'profile';
  icon: React.ComponentProps<typeof Ionicons>['name'];
  activeIcon: React.ComponentProps<typeof Ionicons>['name'];
};

const NavItems: NavItemConfig[] = [
  { path: '/', labelKey: 'home', icon: 'home-outline', activeIcon: 'home' },
  {
    path: '/activities',
    labelKey: 'activities',
    icon: 'calendar-outline',
    activeIcon: 'calendar',
  },
  {
    path: '/programs',
    labelKey: 'programs',
    icon: 'barbell-outline',
    activeIcon: 'barbell',
  },
  {
    path: '/nutrition',
    labelKey: 'nutrition',
    icon: 'nutrition-outline',
    activeIcon: 'nutrition',
  },
  {
    path: '/profile',
    labelKey: 'profile',
    icon: 'person-outline',
    activeIcon: 'person',
  },
];

export function Navbar() {
  const { t } = useTranslation('nav');
  const pathname = usePathname();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const activeIndex = useMemo(
    () => NavItems.findIndex((item) => item.path === pathname),
    [pathname],
  );

  return (
    <YStack
      position="absolute"
      l={20}
      r={20}
      b={Math.max(insets.bottom, 8) + 12}
      pointerEvents="box-none"
    >
      <YStack
        overflow="hidden"
        rounded={40}
        style={{ backgroundColor: colors.backgroundPaper }}
      >
        <XStack px={8} py={8}>
          {NavItems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <TouchableOpacity
                key={item.path}
                onPress={() => router.replace(item.path as never)}
                activeOpacity={0.75}
                hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
                style={{ flex: 1 }}
              >
                <YStack items="center" justify="center" gap={3}>
                  <Ionicons
                    name={isActive ? item.activeIcon : item.icon}
                    size={22}
                    color={isActive ? colors.accent : `${colors.text}61`}
                  />
                  <Text
                    fontSize={10}
                    letterSpacing={0.2}
                    fontWeight={isActive ? '700' : '500'}
                    color={isActive ? colors.accent : colors.textMuted}
                  >
                    {t(item.labelKey)}
                  </Text>
                </YStack>
              </TouchableOpacity>
            );
          })}
        </XStack>
      </YStack>
    </YStack>
  );
}
