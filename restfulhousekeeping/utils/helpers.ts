// utils/helpers.ts
import type { Cleaning } from '@/types/entityTypes';

export function toTitleCase(value: string): string {
  return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

// Example output: Fri Jul 24 8:30 am
export function toFriendlyDate(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Invalid date';
  }

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
