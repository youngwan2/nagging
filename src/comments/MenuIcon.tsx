'use client';
import { useMenuToggle } from '@src/store/menuStore';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
// interface Props { }

export default function MenuIcon() {
  const isOpen = useMenuToggle((state) => state.isOpen);
  const setToggle = useMenuToggle((state) => state.setToggle);

  function handleToggle() {
    setToggle(!isOpen);
  }

  return (
    <button onClick={handleToggle} className="mr-[0.5rem] text-[1.3em]">
      {!isOpen ? (
        <IoMdMenu title="메뉴 열기 버튼" className="dark:fill-white" />
      ) : (
        <IoMdClose title="메뉴 닫기 버튼" className="dark:fill-white" />
      )}
    </button>
  );
}
