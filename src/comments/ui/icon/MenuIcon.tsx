'use client';
import { useMenuToggle } from '@src/store/menuStore';
import { IoMdMenu, IoMdClose } from 'react-icons/io';

export default function MenuIcon() {
  const isOpen = useMenuToggle((state) => state.isOpen);
  const setToggle = useMenuToggle((state) => state.setToggle);

  // MEMO: isOpen 상태가 Navigation 컴포넌트에서 사용됨
  function handleToggle() {
    setToggle(!isOpen);
  }

  return (
    <button
      onClick={handleToggle}
      className="flex justify-center items-center text-center  mr-[0.5rem] text-[1.5em]"
    >
      {!isOpen ? (
        <IoMdMenu title="메뉴 열기 버튼" className="dark:fill-white" />
      ) : (
        <IoMdClose title="메뉴 닫기 버튼" className="dark:fill-white" />
      )}
    </button>
  );
}
