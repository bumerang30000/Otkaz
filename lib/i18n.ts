export const translations = {
  en: {
    // Minimal seed – app falls back to key when missing
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    logout: 'Logout',

    calendar: 'Calendar',
    wallet: 'Wallet',
    why: 'Why',
    goals: 'Goals',
    comparison: 'Before/After',
    leaderboard: 'Leaderboard',
    achievements: 'Achievements',
    profile: 'Profile',
    dashboard: 'Dashboard',

    customEntry: '+ Custom Entry',
    addRefusal: 'Add Refusal',
    whatDidYouRefuse: 'What did you refuse?',
    price: 'Price',
    quantity: 'Qty',
    note: 'Note (optional)',

    coffee: 'Coffee',
    cigarettes: 'Cigarettes',
    soda: 'Soda',
    fastFood: 'Fast Food',

    tip: 'Tip',
    addTags: 'Add Tags',
    editTags: 'Edit Tags',
    done: 'Done',
    perWeek: 'per week',
    yourTopReasons: 'Your Top Reasons',
    topReasonsDescription: 'The main reasons why you refuse things:',
    resetToDefaults: 'Reset to Defaults',
    presetUpdated: 'Preset updated!',
    presetsReset: 'Presets reset!',
    confirmResetPresets: 'Reset all presets to defaults?',
    presetName: 'Preset name',
    pricePerUnit: 'Price per unit',
    quantityShort: 'Qty',
    custom: 'Custom',
    add: 'Add',
    close: 'Close',
    fillAllFields: 'Please fill all fields',
    priceMustBePositive: 'Price must be > 0',
    editPreset: 'Edit Preset',
    customizePresets: 'Customize Presets',
    customizePresetsDescription:
      'Personalize your quick-add buttons with your own categories, icons, and prices',

    referralLinkCopied: 'Referral link copied!',
  },
  ru: {
    // You can fill Russian translations later
  },
} as const;

export type Language = 'en' | 'ru';

export function useTranslation(lang: Language = 'en') {
  return {
    t: (key: string): string => {
      const anyTranslations = translations as any;
      const dict = (anyTranslations[lang] || {}) as Record<string, string>;
      const fallback = (anyTranslations.en || {}) as Record<string, string>;
      return dict[key] ?? fallback[key] ?? key;
    },
    lang,
  };
}

