import Link from 'next/link';
import { redirect } from 'next/navigation';

import Card from '@src/comments/ui/card/Card';
import CardBody from '@src/comments/ui/card/CardBody';
import CardFooter from '@src/comments/ui/card/CardFooter';
import CardHeader from '@src/comments/ui/card/CardHeader';
import Container from '@src/comments/ui/container/Container';
import LoginForm from '@src/comments/ui/form/LoginForm';

import { auth } from '../../lib/auth';

export default async function page() {
  const session = await auth();

  if (session) redirect('/dashboard');
  if (!session)
    return (
      <Container elName={'section'} className="max-w-[768px] min-w-[280px] w-full">
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
        <Card elementName={'div'} className="relative z-20 max-w-3xl bg-white rounded-lg shadow-lg p-8">
          <CardHeader>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              환영합니다! 애드센스 수익을 쉽게 관리하고 알림 받으세요
            </h1>
          </CardHeader>
          <CardBody>
            <p className="text-gray-700 mb-6">
              저희 플랫폼은 사용자가 자신의 수익을 효율적으로 확인하고, 맞춤형 보고서를 생성하여 원하는 시간대에 알림을
              받을 수 있도록 도와드립니다.
            </p>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">주요 기능:</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  <strong>실시간 수익 확인</strong>: 언제 어디서나 최신 수익 정보를 실시간으로 확인하세요.
                </li>
                <li>
                  <strong>맞춤형 보고서 생성</strong>: 다양한 필터와 옵션을 사용하여 나만의 보고서를 쉽게 생성할 수
                  있습니다.
                </li>
                <li>
                  <strong>편리한 알림 설정</strong>: 이메일을 통해 원하는 시간대에 자동으로 보고서를 받아보세요.
                </li>
              </ul>
            </div>
            <p className="text-gray-700 mb-6">지금 가입하고, 수익 관리의 새로운 차원을 경험해보세요!</p>
          </CardBody>

          <CardFooter className="flex justify-center">
            <LoginForm
              text="지금 시작하기"
              buttonClassName="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            />
            <Link
              href={'/dashboard'}
              className="bg-[#36353D] text-white font-bold py-2 px-4 rounded hover:bg-[#424146] transition duration-300"
            >
              둘러 보기
            </Link>
          </CardFooter>
        </Card>
      </Container>
    );
}
