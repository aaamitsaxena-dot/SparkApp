import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { AchievementLevel } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentLevel(totalPoints: number, levels: AchievementLevel[]): AchievementLevel | null {
  if (!levels.length) return null
  const sorted = [...levels].sort((a, b) => b.min_points - a.min_points)
  return sorted.find(l => totalPoints >= l.min_points) ?? sorted[sorted.length - 1]
}

export function getNextLevel(totalPoints: number, levels: AchievementLevel[]): AchievementLevel | null {
  if (!levels.length) return null
  const sorted = [...levels].sort((a, b) => a.min_points - b.min_points)
  return sorted.find(l => l.min_points > totalPoints) ?? null
}

export function resourceTypeLabel(type: string): string {
  const map: Record<string, string> = {
    video: 'Video',
    article: 'Article',
    interactive: 'Interactive',
    pdf: 'PDF',
    website: 'Website',
  }
  return map[type] ?? type
}

export function resourceTypeColor(type: string): string {
  const map: Record<string, string> = {
    video: 'bg-red-100 text-red-700',
    article: 'bg-blue-100 text-blue-700',
    interactive: 'bg-purple-100 text-purple-700',
    pdf: 'bg-orange-100 text-orange-700',
    website: 'bg-green-100 text-green-700',
  }
  return map[type] ?? 'bg-gray-100 text-gray-700'
}
