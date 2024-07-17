import { IoCalendarClear } from 'react-icons/io5';

interface PropsType {
  className: string;
}
export default function CalendarIcon({ className }: PropsType) {
  return <IoCalendarClear className={className} />;
}
