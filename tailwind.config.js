/** @type {import('tailwindcss').Config} */
const tokens = require('./tokens.json');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: tokens.color.bg.base,
          elevated: tokens.color.bg.elevated,
          overlay: tokens.color.bg.overlay,
        },
        foreground: {
          DEFAULT: tokens.color.text.primary,
          secondary: tokens.color.text.secondary,
          disabled: tokens.color.text.disabled,
        },
        accent: {
          DEFAULT: tokens.color.accent,
          hover: tokens.color.accentHover,
        },
        'accent-alt': {
          DEFAULT: tokens.color.accentAlt,
          hover: tokens.color.accentAltHover,
        },
        danger: {
          DEFAULT: tokens.color.danger,
          muted: tokens.color.dangerMuted,
        },
        success: {
          DEFAULT: tokens.color.success,
          muted: tokens.color.successMuted,
        },
        warning: {
          DEFAULT: tokens.color.warning,
          muted: tokens.color.warningMuted,
        },
        border: {
          strong: tokens.color.border.strong,
          weak: tokens.color.border.weak,
        },
      },
      spacing: {
        micro: tokens.spacing.micro,
        sm: tokens.spacing.sm,
        md: tokens.spacing.md,
        lg: tokens.spacing.lg,
        xl: tokens.spacing.xl,
        '2xl': tokens.spacing['2xl'],
      },
      borderWidth: {
        thin: tokens.border.width.thin,
        thick: tokens.border.width.thick,
        heavy: tokens.border.width.heavy,
      },
      borderRadius: {
        sm: tokens.border.radius.sm,
        md: tokens.border.radius.md,
        lg: tokens.border.radius.lg,
      },
      fontFamily: {
        sans: tokens.typography.fontFamily.sans.split(','),
        mono: tokens.typography.fontFamily.mono.split(','),
        display: tokens.typography.fontFamily.display.split(','),
      },
      fontSize: {
        micro: tokens.typography.fontSize.micro,
        meta: tokens.typography.fontSize.meta,
        'body-sm': tokens.typography.fontSize.body,
        h3: tokens.typography.fontSize.h3,
        h2: tokens.typography.fontSize.h2,
        h1: tokens.typography.fontSize.h1,
        display: tokens.typography.fontSize.display,
      },
    },
  },
  plugins: [],
};