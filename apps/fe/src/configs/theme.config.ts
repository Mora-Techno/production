interface ColorConfig {
  background: string;
  foreground: string;
}

interface ThemeConfig {
  light: {
    background: string;
    foreground: string;
    card: ColorConfig;
    popover: ColorConfig;
    primary: ColorConfig;
    secondary: ColorConfig;
    muted: ColorConfig;
    accent: ColorConfig;
    destructive: ColorConfig;
    warning: ColorConfig;
    success: ColorConfig;
    info: ColorConfig;
    border: string;
    input: string;
    ring: string;
  };
  dark: {
    background: string;
    foreground: string;
    card: ColorConfig;
    popover: ColorConfig;
    primary: ColorConfig;
    secondary: ColorConfig;
    muted: ColorConfig;
    accent: ColorConfig;
    destructive: ColorConfig;
    warning: ColorConfig;
    success: ColorConfig;
    info: ColorConfig;
    border: string;
    input: string;
    ring: string;
  };
}

export const themeConfig: ThemeConfig = {
  light: {
    background: '#FDFBF7',
    foreground: '#4A4238',
    card: { background: 'rgba(255,255,255,0.7)', foreground: '#4A4238' },
    popover: { background: '#FFFFFF', foreground: '#4A4238' },
    primary: { background: '#7DAF74', foreground: '#FDFBF7' },
    secondary: { background: '#AEC6CF', foreground: '#4A4238' },
    muted: { background: '#F3EFE8', foreground: 'rgba(74,66,56,0.65)' },
    accent: { background: '#E8F4E6', foreground: '#5E8B56' },
    destructive: { background: '#D97757', foreground: '#FFFFFF' },
    warning: { background: '#F2C94C', foreground: '#4A4238' },
    success: { background: '#7DAF74', foreground: '#FDFBF7' },
    info: { background: '#AEC6CF', foreground: '#4A4238' },
    border: 'rgba(94,139,86,0.2)',
    input: 'rgba(94,139,86,0.15)',
    ring: 'rgba(125,175,116,0.4)',
  },
  dark: {
    background: '#1A2530',
    foreground: '#E8E6E1',
    card: { background: 'rgba(0,0,0,0.4)', foreground: '#E8E6E1' },
    popover: { background: '#243040', foreground: '#E8E6E1' },
    primary: { background: '#F2C94C', foreground: '#1A2530' },
    secondary: { background: '#4A4E69', foreground: '#E8E6E1' },
    muted: { background: '#243040', foreground: 'rgba(232,230,225,0.6)' },
    accent: { background: '#2D3A4A', foreground: '#F2C94C' },
    destructive: { background: '#D97757', foreground: '#E8E6E1' },
    warning: { background: '#E5A93D', foreground: '#1A2530' },
    success: { background: '#7DAF74', foreground: '#1A2530' },
    info: { background: '#4A4E69', foreground: '#E8E6E1' },
    border: 'rgba(255,255,255,0.1)',
    input: 'rgba(255,255,255,0.12)',
    ring: 'rgba(242,201,76,0.35)',
  },
};
