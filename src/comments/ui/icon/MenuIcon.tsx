'use client';
import useResize from '@src/hooks/useResize';
import getIcons from '@src/utils/icons';

export default function MenuIcon() {
  const { isMobile, isOpen, setToggle } = useResize();

  const { MenuIcon, MenuCloseIcon } = getIcons();

  // MEMO: isOpen 상태가 Navigation 컴포넌트에서 사용됨
  function handleToggle() {
    setToggle(!isOpen);
  }

  if (isMobile) return null;
  return (
    <button onClick={handleToggle} className="flex justify-center items-center text-center  mr-[0.5rem] text-[1.5em]">
      {!isOpen ? <MenuIcon className="dark:fill-white" /> : <MenuCloseIcon className="dark:fill-white" />}
    </button>
  );
}
