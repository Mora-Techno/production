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
    background: '#F4FBF9',
    foreground: '#0F172A',

    card: {
      background: '#FFFFFF',
      foreground: '#0F172A',
    },
    popover: {
      background: '#FFFFFF',
      foreground: '#0F172A',
    },
    primary: {
      background: '#00AF91',
      foreground: '#FFFFFF',
    },

    secondary: {
      background: '#E6F7F3',
      foreground: '#007A66',
    },

    muted: {
      background: '#F1F5F9',
      foreground: 'rgba(15, 23, 42, 0.6)',
    },

    accent: {
      background: '#D1FAF3',
      foreground: '#007A66',
    },

    destructive: {
      background: '#DC2626',
      foreground: '#FFFFFF',
    },

    warning: {
      background: '#FACC15',
      foreground: '#854D0E',
    },
    success: {
      background: '#22C55E',
      foreground: '#14532D',
    },

    info: {
      background: '#0EA5E9',
      foreground: '#FFFFFF',
    },

    border: 'rgba(0, 175, 145, 0.25)',
    input: 'rgba(0, 175, 145, 0.25)',
    ring: 'rgba(0, 175, 145, 0.4)',
  },
  dark: {
    background: '#1A1A1A',
    foreground: '#F5F5F5',

    card: {
      background: '#242424',
      foreground: '#F5F5F5',
    },
    popover: {
      background: '#242424',
      foreground: '#F5F5F5',
    },

    primary: {
      background: '#E0FF63',
      foreground: '#1A1A1A',
    },

    secondary: {
      background: '#2A2A2A',
      foreground: '#E5E7EB',
    },

    muted: {
      background: '#2A2A2A',
      foreground: 'rgba(229, 231, 235, 0.6)',
    },

    accent: {
      background: '#313131',
      foreground: '#E0FF63',
    },

    destructive: {
      background: '#FF453A',
      foreground: '#FFFFFF',
    },

    warning: {
      background: '#FACC15',
      foreground: '#1A1A1A',
    },

    success: {
      background: '#22C55E',
      foreground: '#052E16',
    },

    info: {
      background: '#38BDF8',
      foreground: '#082F49',
    },

    border: 'rgba(224, 255, 99, 0.25)',
    input: 'rgba(224, 255, 99, 0.25)',
    ring: 'rgba(224, 255, 99, 0.45)',
  },
};
