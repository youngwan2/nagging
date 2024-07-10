'use client';
import { CiBellOn } from 'react-icons/ci';

// import { CiBellOff } from "react-icons/ci";

export default function Notification() {
  function handleClick() {
    console.log('Alert Toggled');
  }

  return (
    <div className="flex items-center dark:text-white text-[1.3em] mr-3">
      <button onClick={handleClick}>
        <CiBellOn />
      </button>
    </div>
  );
}
