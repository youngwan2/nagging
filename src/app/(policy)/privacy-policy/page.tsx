export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-[#252525] border border-[rgba(0,0,0,0.2)] dark:border-[rgba(255,255,255,0.15)] rounded-lg shadow-md transition-all">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        개인정보 처리방침
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
          제1조 (개인정보 수집 항목)
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          본 웹사이트는 회원가입 및 서비스 이용을 위해 다음과 같은 개인정보를
          수집합니다.
          <ul className="list-disc list-inside ml-4 mt-2 text-gray-700 dark:text-gray-300">
            <li>필수 수집 정보: 이메일 주소 (Google 소셜 로그인 시)</li>
            <li>선택 수집 정보: 이름, 프로필 사진 (Google 소셜 로그인 시)</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
          제2조 (개인정보의 수집 및 이용 목적)
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          수집한 개인정보는 다음의 목적을 위해 활용됩니다:
          <ul className="list-disc list-inside ml-4 mt-2 text-gray-700 dark:text-gray-300">
            <li>회원 관리: 회원제 서비스 이용에 따른 본인 확인, 개인 식별</li>
            <li>
              서비스 제공 및 개선: 애드센스 데이터 연동 및 보고서 알림 서비스
              제공, 운영 품질 향상
            </li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
          제3조 (개인정보 보유 및 이용 기간)
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          개인정보는 수집 및 이용 목적이 달성된 후 해당 정보를 지체 없이
          파기합니다. 단, 법령에 의해 보관이 요구되는 경우 일정 기간 동안 보관할
          수 있습니다.
        </p>
      </section>
    </div>
  );
}
