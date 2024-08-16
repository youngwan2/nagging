import { resolve } from 'node:path';
import {
  AuthTypes,
  Connector,
  IpAddressTypes,
} from '@google-cloud/cloud-sql-connector';
import { PrismaClient } from '@prisma/client';

// reference: https://github.com/GoogleCloudPlatform/cloud-sql-nodejs-connector/blob/0dfbb524d736ef5f28ab7c87fd7a95223a989cb6/examples/prisma/postgresql/connect.ts

export async function connect() {
  /** 프로덕션 */
  if (process.env.NODE_ENV === 'production') {
    const path = resolve(`.s.PGSQL.5432`); // postgres-required socket filename
    const connector = new Connector();
    await connector.startLocalProxy({
      instanceConnectionName: 'nagging:asia-northeast1:nagging-sql', // process.env.INSTANCE_CONNECTION_NAME || '', // DB 연결용 인스턴스 이름
      ipType: IpAddressTypes.PUBLIC, // 공개 IP 접근 명시
      authType: AuthTypes.IAM, // DB 인스턴스 접근 시 사용자 IAM 을 사용하여 접근토록 설정
      listenOptions: { path }, // postgres 소켓 경로 설정(포트 5432로 연결)
    });
    const hostPath = process.cwd();
    const datasourceUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@localhost/${process.env.DB_NAME}?host=${hostPath}`;

    console.log('log:', datasourceUrl);

    const prisma = new PrismaClient({ datasourceUrl });

    // 커텍터 연결이 완료된 후(인증이 완료 되었으므로) 연결을 종료합니다. 이후 부터는 prisma 클라이언트 사용 시 자동 온/오프 됩니다.
    return {
      prisma,
      async close() {
        await prisma.$disconnect();
        connector.close();
      },
    };

    /** 개발 */
  } else {
    const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
    const prisma = globalForPrisma.prisma || new PrismaClient();

    globalForPrisma.prisma = prisma;

    return {
      prisma,
      async close() {
        await prisma.$disconnect();
      },
    };
  }
}

/**
 *  개발 모드
 * // refernce: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections
// 메모리 누스 방지를 위한 전역변수 설정




/** 중요!) 프리즈마 클라이언트를 전역변수로 설정하는 이유
 *  변경된 파일의 핫 리로딩을 지원하여 다시 시작하지 않고도 애플리케이션의 변경 사항을 볼 수 있습니다. 
 * 그러나 프레임워크가 내보내기를 담당하는 모듈을 새로 고치면 개발 환경에서 원치 않는 PrismaClient  인스턴스가
 * 추가 발생 할 수 있습니다.
 */
