import { resolve } from 'node:path';
import { AuthTypes, Connector, IpAddressTypes } from '@google-cloud/cloud-sql-connector';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;
let connector: Connector | null = null;

export async function connect() {
  if (prisma) {
    // 이미 연결되어 있는 경우, 기존 클라이언트를 반환
    return { prisma, close };
  }

  /** 프로덕션 */
  if (process.env.NODE_ENV === 'production') {
    const path = resolve(`.s.PGSQL.5432`); // postgres-required socket filename
    connector = new Connector();
    await connector.startLocalProxy({
      instanceConnectionName: 'nagging:asia-northeast1:nagging-sql', // DB 연결용 인스턴스 이름
      ipType: IpAddressTypes.PUBLIC, // 공개 IP 접근 명시
      authType: AuthTypes.IAM, // DB 인스턴스 접근 시 사용자 IAM 을 사용하여 접근토록 설정
      listenOptions: { path }, // postgres 소켓 경로 설정(포트 5432로 연결)
    });

    const datasourceUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@localhost/${process.env.DB_NAME}?host=${process.env.INSTANCE_UNIX_SOCKET}`;

    console.log('log:', datasourceUrl);

    prisma = new PrismaClient({ datasourceUrl });

    // 개발 환경
  } else {
    const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
    prisma = globalForPrisma.prisma || new PrismaClient();

    globalForPrisma.prisma = prisma;
  }

  // 데이터베이스 닫기
  async function close() {
    if (prisma) {
      await prisma.$disconnect();
    }
    if (connector) {
      connector.close();
    }
  }

  return { prisma, close };
}
