// utils/helpers.ts

export function toTitleCase(value: string): string {
  return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

// Example output: Friday Jul 24 8:30 am
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
