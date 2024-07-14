// refernce: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections
// 메모리 누스 방지를 위한 전역변수 설정
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

/** 중요!) 프리즈마 클라이언트를 전역변수로 설정하는 이유
 *  변경된 파일의 핫 리로딩을 지원하여 다시 시작하지 않고도 애플리케이션의 변경 사항을 볼 수 있습니다.
 * 그러나 프레임워크가 내보내기를 담당하는 모듈을 새로 고치면 개발 환경에서 원치 않는 PrismaClient  인스턴스가
 * 추가 발생 할 수 있습니다.
 */
