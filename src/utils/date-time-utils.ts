export const millisecondsToSeconds = (milliseconds: number) =>
  Math.floor(milliseconds / 1000);

export const isEventLive = (startDate: string, endDate: string) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return start < end;
};
