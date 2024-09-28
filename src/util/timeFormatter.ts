export const TimeFormatter = (timestamp: string): string => {
  const utcDate = new Date(timestamp);
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = utcDate.getTime() + istOffset;

  const istDate = new Date(istTime);

  const year = istDate.getUTCFullYear();
  const month = String(istDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(istDate.getUTCDate()).padStart(2, '0');
  const hours = String(istDate.getUTCHours()).padStart(2, '0');
  const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(istDate.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(istDate.getUTCMilliseconds()).padStart(3, '0');

  return `(${hours}:${minutes}) ${day}/${month}/${year}`;
}
