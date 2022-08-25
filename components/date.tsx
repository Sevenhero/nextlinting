import { parseISO, format } from 'date-fns';

export default function CDate({ dateString }: { dateString: string }) {
  const date = parseISO(dateString);

  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}
