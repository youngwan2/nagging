import { PiProhibit, PiUserCircle } from 'react-icons/pi';
import { IoMdMenu, IoMdClose } from 'react-icons/io';

export default function getIcons() {
  // SVG 아이콘
  function SvgIcon({ d }: { d: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={d} />
      </svg>
    );
  }

  // 아이콘
  const AlertCircleIcon = () => (
    <SvgIcon d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-14v4m0 4h.01" />
  );
  const ClockIcon = () => (
    <SvgIcon d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-11v4l3 3" />
  );
  const CalendarIcon = () => (
    <SvgIcon d="M8 2v4m8-4v4M3 10h18M3 6a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" />
  );
  const XCircleIcon = () => (
    <SvgIcon d="M15 9l-6 6m0-6l6 6m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  );

  const ProhibitIcon = ({ className }: { className: string }) => (
    <PiProhibit color="#D13642" className={className} />
  );

  const LoginIcon = ({ className }: { className: string }) => (
    <PiUserCircle className={className} />
  );

  const MenuIcon = ({ className }: { className: string }) => (
    <IoMdMenu className={className} title="메뉴 열기" aria-label="메뉴 열기" />
  );

  const MenuCloseIcon = ({ className }: { className: string }) => (
    <IoMdClose className={className} title="메뉴 닫기" aria-label="메뉴 닫기" />
  );

  return {
    AlertCircleIcon,
    ClockIcon,
    CalendarIcon,
    XCircleIcon,
    ProhibitIcon,
    LoginIcon,
    MenuIcon,
    MenuCloseIcon,
    MenuCloseIcon,
  };
}
