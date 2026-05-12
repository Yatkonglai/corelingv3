const STORAGE_KEY = "coreling:favorites";

export interface FavoriteItem {
  schemeId: string;
  heading: string;
  timestamp: number;
}

export function getFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FavoriteItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isFavorite(schemeId: string): boolean {
  return getFavorites().some((f) => f.schemeId === schemeId);
}

export function toggleFavorite(schemeId: string, heading: string): boolean {
  const favorites = getFavorites();
  const exists = favorites.some((f) => f.schemeId === schemeId);
  let next: FavoriteItem[];
  if (exists) {
    next = favorites.filter((f) => f.schemeId !== schemeId);
  } else {
    next = [...favorites, { schemeId, heading, timestamp: Date.now() }];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return !exists;
}
