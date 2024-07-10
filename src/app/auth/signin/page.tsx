// interface Props { }
import { MdOutlineLock } from 'react-icons/md';
import { signIn } from '@src/auth';

export default function page() {
  return (
    <section className="left-0 top-0 right-0 bottom-0 bg-[#606060] fixed">
      <div className="bg-[#18181B] text-white flex flex-col max-w-[500px] h-[350px] w-full items-center justify-center left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] absolute p-5 rounded-md shadow-[0_0_3px_1px_#F4F4F5]">
        <MdOutlineLock className="text-[3rem]" />
        <h2 className="text-[1.8em] my-6 font-semibold">
          잔소리에 오신 것을 환영합니다.
        </h2>
        <p>
          잔소리는 애드센스 광고 수익의 달러를 한화로 변환하여 종합소득세 신고
          등의 시기에 맞춰 합산된 수익정보를 알림으로 전달 받을 수 있는
          서비스입니다. 개인화된 서비스 이용을 위해 로그인 해주세요.
        </p>
        <form
          className="w-full"
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/' });
          }}
        >
          <button className=" mt-5 w-full p-3 bg-gradient-to-r from-black to-gray rounded-md">
            로그인
          </button>
        </form>
      </div>
    </section>
  );
}
