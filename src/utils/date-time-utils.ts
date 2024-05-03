import { format, formatDistance } from 'date-fns';

export const millisecondsToSeconds = (milliseconds: number) =>
  Math.floor(milliseconds / 1000);

export const isEventLive = (startDate: string, endDate: string) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return start < end;
};

export const formatNormalDate = (date: string) =>
  format(new Date(date), 'd MMM yyyy');

export const formatDateLong = () =>
  format(new Date(), 'iii MMM dd, yyyy HH:mm');

export const formatDateDistance = (fromDate: string) =>
  formatDistance(new Date(fromDate), new Date(), { addSuffix: true });
