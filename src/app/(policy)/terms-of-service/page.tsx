export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-[#252525] border border-[rgba(0,0,0,0.2)] dark:border-[rgba(255,255,255,0.15)] rounded-lg shadow-md transition-all">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">이용 약관</h1>
      <hr />

      <section className="my-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">제1조 (목적)</h2>
        <p className="text-gray-700 dark:text-gray-300">
          본 약관은 웹사이트 제공자가 제공하는 모든 서비스의 이용과 관련하여, 이용자와 제공자 간의 권리와 의무, 책임
          사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">제2조 (서비스의 제공 및 변경)</h2>
        <p className="text-gray-700 dark:text-gray-300">
          본 웹사이트는 다음과 같은 서비스를 제공합니다.
          <ul className="list-disc list-inside ml-4 mt-2 text-gray-700 dark:text-gray-300">
            <li>Google AdSense 연동 및 사용자 맞춤형 보고서 생성, 메일(알림) 서비스</li>
            <li>기타 웹사이트 제공자가 정하는 서비스</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">제3조 (회원의 의무)</h2>
        <p className="text-gray-700 dark:text-gray-300">
          회원은 서비스 이용과 관련하여 다음 행위를 하여서는 안 됩니다.
          <ul className="list-disc list-inside ml-4 mt-2 text-gray-700 dark:text-gray-300">
            <li>타인의 정보 도용</li>
            <li>서비스의 변경 및 불법적인 사용</li>
            <li>저작권을 포함한 제3자의 권리를 침해하는 행위</li>
          </ul>
        </p>
      </section>

      <div className="mt-8">
        <span className="text-gray-700 dark:text-gray-300">
          소셜 로그인 시 위 약관에 모두 동의한 것으로 간주합니다.
        </span>
      </div>
    </div>
  );
}
