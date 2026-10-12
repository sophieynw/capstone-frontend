// utils/helpers.ts
import type { Cleaning } from '@/types/entityTypes';

export function toTitleCase(value: string): string {
  return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

// Example output: Fri Jul 24 8:30 am
export function toFriendlyDate(
  value: Date | string | null | undefined,
): string {
  if (value == null) return 'Date unavailable';

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return 'Invalid date';

  return date
    .toLocaleString('en-CA', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .replaceAll(',', '');
}

// groups cleanings by date
export function groupCleaningsByDate(
  cleanings: Cleaning[] | null | undefined,
  now: Date = new Date(),
): {
  today: Cleaning[];
  upcoming: Cleaning[];
} {
  const today: Cleaning[] = [];
  const upcoming: Cleaning[] = [];

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const startOfTomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );

  for (const cleaning of cleanings ?? []) {
    if (!cleaning.dateTimeStart) continue;

    const cleaningDate = new Date(cleaning.dateTimeStart);

    // Ignore invalid dates
    if (Number.isNaN(cleaningDate.getTime())) continue;

    if (cleaningDate >= startOfToday && cleaningDate < startOfTomorrow) {
      today.push(cleaning);
    } else if (cleaningDate >= startOfTomorrow) {
      upcoming.push(cleaning);
    }
  }

  return { today, upcoming };
}

export function timeStringToDate(time: string): Date {
  const [h, m] = time.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

export function dateToTimeString(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function formatTime(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'P.M' : 'A.M';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
}