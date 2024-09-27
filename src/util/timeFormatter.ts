export const TimeFormatter = (timestamp: string): string => {
  // Convert the timestamp into a JavaScript Date object
  const date = new Date(timestamp);

  // Calculate the Indian Standard Time (IST) offset from UTC
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30 hours
  const istTime = new Date(date.getTime() + istOffset);

  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    year: '2-digit',
    hour12: false, // use 24-hour format
    timeZone: 'Asia/Kolkata', // Ensure IST timezone is used
  };

  // Format the date using toLocaleString in IST
  const formattedDate = istTime.toLocaleString('en-IN', options);

  // Split the formatted date into parts
  const [datePart, timePart] = formattedDate.split(', ');

  // Rearranging to MM:HH DD:MM:YY format
  const [day, month, year] = datePart.split('/');
  const [hour, minute] = timePart.split(':');

  return `${month}:${hour} ${day}/${month}/${year}`;
};
