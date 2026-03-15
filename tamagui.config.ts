import {
  animations,
  fonts,
  media,
  settings,
  shorthands,
  themes,
  tokens,
} from '@tamagui/config/v4';
// tokens re-exported as-is (v4 has no color tokens — colors live in themes)
import { createTamagui } from '@tamagui/core';

const darkTheme = {
  background: '#0d0d0d',
  backgroundHover: '#111111',
  backgroundPress: '#0a0a0a',
  backgroundFocus: '#1a1a1a',
  backgroundStrong: '#1a1a1a',
  backgroundTransparent: 'transparent',
  color: '#ffffff',
  colorHover: '#f5f5f5',
  colorPress: '#ebebeb',
  colorFocus: '#ffffff',
  colorTransparent: 'transparent',
  borderColor: '#2a2a2a',
  borderColorHover: '#3a3a3a',
  borderColorFocus: '#22c55e',
  borderColorPress: '#4a4a4a',
  placeholderColor: '#6b6b6b',
  outlineColor: 'rgba(34,197,94,0.5)',
  shadowColor: 'rgba(0,0,0,0.6)',
  shadowColorHover: 'rgba(0,0,0,0.8)',
  backgroundPaper: '#1a1a1a',
  textMuted: '#6b6b6b',
  accent: '#22c55e',
  accentDark: '#16a34a',
  accentLight: '#4ade80',
  accentDanger: '#eb4343',
} as const;

const appConfig = createTamagui({
  defaultFont: 'body',
  animations,
  fonts,
  media,
  settings,
  shorthands,
  tokens,
  themes: {
    ...themes,
    dark: darkTheme,
  },
});

export type AppConfig = typeof appConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
