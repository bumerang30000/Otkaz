// User customizable presets for quick entry buttons

export type PresetCategory = 'habits' | 'food' | 'drinks' | 'entertainment' | 'shopping' | 'other';

export interface UserPreset {
  id: string;
  icon: string;
  name: string;
  price: number;
  category: PresetCategory;
  tags?: string[]; // Why tags: harmful, expensive, useless, etc.
}

const DEFAULT_PRESETS: UserPreset[] = [
  { id: '1', icon: '☕', name: 'Coffee', price: 5, category: 'drinks' },
  { id: '2', icon: '🚬', name: 'Cigarettes', price: 10, category: 'habits' },
  { id: '3', icon: '🍔', name: 'Fast Food', price: 15, category: 'food' },
  { id: '4', icon: '🍺', name: 'Alcohol', price: 20, category: 'drinks' },
  { id: '5', icon: '🍿', name: 'Snacks', price: 8, category: 'food' },
  { id: '6', icon: '🚕', name: 'Taxi/Uber', price: 25, category: 'other' },
  { id: '7', icon: '🛍️', name: 'Shopping', price: 50, category: 'shopping' },
  { id: '8', icon: '📺', name: 'Streaming', price: 15, category: 'entertainment' },
];

export function getUserPresets(userId: string): UserPreset[] {
  if (typeof window === 'undefined') return DEFAULT_PRESETS;
  
  try {
    const saved = localStorage.getItem(`userPresets_${userId}`);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load user presets:', error);
  }
  
  return DEFAULT_PRESETS;
}

export function saveUserPresets(userId: string, presets: UserPreset[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(`userPresets_${userId}`, JSON.stringify(presets));
  } catch (error) {
    console.error('Failed to save user presets:', error);
  }
}

export function updateUserPreset(
  userId: string,
  presetId: string,
  updates: Partial<UserPreset>
): UserPreset[] {
  const presets = getUserPresets(userId);
  const updatedPresets = presets.map(preset =>
    preset.id === presetId ? { ...preset, ...updates } : preset
  );
  saveUserPresets(userId, updatedPresets);
  return updatedPresets;
}

export function resetUserPresets(userId: string): UserPreset[] {
  saveUserPresets(userId, DEFAULT_PRESETS);
  return DEFAULT_PRESETS;
}

// Common emoji options for presets
export const PRESET_EMOJI_OPTIONS = [
  '☕', '🚬', '🍔', '🍺', '🍿', '🚕', '🛍️', '📺',
  '🥤', '🍕', '🍩', '🍰', '🍦', '🌭', '🥓', '🥪',
  '🎮', '🎬', '🎵', '📱', '💻', '⚽', '🏋️', '🚗',
  '✈️', '🏠', '💊', '💇', '🎓', '📚', '🎨', '🎸',
];

// Available tags for why you refuse something
export interface WhyTag {
  id: string;
  nameEn: string;
  nameRu: string;
  color: string;
  icon: string;
}

export const WHY_TAGS: WhyTag[] = [
  { 
    id: 'harmful', 
    nameEn: 'HARMFUL', 
    nameRu: 'ВРЕДНО', 
    color: 'bg-gradient-to-br from-red-400 via-red-500 to-red-600 text-white border-black', 
    icon: '☠️' 
  },
  { 
    id: 'expensive', 
    nameEn: 'EXPENSIVE', 
    nameRu: 'ДОРОГО', 
    color: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white border-black', 
    icon: '💸' 
  },
  { 
    id: 'useless', 
    nameEn: 'USELESS', 
    nameRu: 'БЕСПОЛЕЗНО', 
    color: 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 text-white border-black', 
    icon: '🗑️' 
  },
  { 
    id: 'unhealthy', 
    nameEn: 'UNHEALTHY', 
    nameRu: 'НЕЗДОРОВО', 
    color: 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 text-white border-black', 
    icon: '⚠️' 
  },
  { 
    id: 'addictive', 
    nameEn: 'ADDICTIVE', 
    nameRu: 'ЗАВИСИМОСТЬ', 
    color: 'bg-gradient-to-br from-purple-500 via-purple-600 to-fuchsia-600 text-white border-black', 
    icon: '🔗' 
  },
  { 
    id: 'wasteful', 
    nameEn: 'WASTEFUL', 
    nameRu: 'РАСТОЧИТЕЛЬНО', 
    color: 'bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600 text-white border-black', 
    icon: '💰' 
  },
  { 
    id: 'badHabit', 
    nameEn: 'BAD HABIT', 
    nameRu: 'ПЛОХАЯ ПРИВЫЧКА', 
    color: 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 text-white border-black', 
    icon: '🚫' 
  },
  { 
    id: 'timeWasting', 
    nameEn: 'TIME WASTER', 
    nameRu: 'ТРАТА ВРЕМЕНИ', 
    color: 'bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 text-white border-black', 
    icon: '⏰' 
  },
  { 
    id: 'unnecessary', 
    nameEn: 'UNNECESSARY', 
    nameRu: 'НЕ НУЖНО', 
    color: 'bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 text-white border-black', 
    icon: '🚮' 
  },
  { 
    id: 'impulsive', 
    nameEn: 'IMPULSIVE', 
    nameRu: 'ИМПУЛЬСИВНО', 
    color: 'bg-gradient-to-br from-rose-500 via-pink-600 to-fuchsia-600 text-white border-black', 
    icon: '⚡' 
  },
];

export function getWhyTagById(id: string): WhyTag | undefined {
  return WHY_TAGS.find(tag => tag.id === id);
}

export function getWhyTagName(id: string, language: 'en' | 'ru'): string {
  const tag = getWhyTagById(id);
  if (!tag) return id;
  return language === 'ru' ? tag.nameRu : tag.nameEn;
}
