export const workHours = Array.from({ length: 11 }, (_, i) => {
  const hour = 8 + i;
  return `${hour}:00 ${hour >= 12 ? "PM" : "AM"}`;
});
