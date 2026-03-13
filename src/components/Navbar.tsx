import { usePathname, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@/lib/icons';

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

  const activeIndex = useMemo(() => {
    return NavItems.findIndex((item) => item.path === pathname);
  }, [pathname]);

  return (
    <View
      className="absolute left-5 right-5"
      style={{ bottom: Math.max(insets.bottom, 8) + 12 }}
      pointerEvents="box-none"
    >
      <View className="overflow-hidden rounded-[40px] bg-background-paper">
        <View className="flex-row px-2 py-2.5">
          {NavItems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <TouchableOpacity
                key={item.path}
                className="flex-1 items-center justify-center gap-1 py-1"
                onPress={() => router.replace(item.path as never)}
                activeOpacity={0.75}
                hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
              >
                <Ionicons
                  name={isActive ? item.activeIcon : item.icon}
                  size={22}
                  className={`${isActive ? 'text-accent' : 'text-text-muted'}`}
                />
                <Text
                  className={`text-[10px] tracking-[0.2px] font-medium ${isActive ? 'text-accent' : 'text-text-muted'}`}
                >
                  {t(item.labelKey)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
