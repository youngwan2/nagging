## 📓 프로젝트 명
- **nagging (잔소리)**: 
잔소리 작명 이유는  수익 통계 알림을 자동화하는 것이라 돈소리가 나는 것 같다는 생각 + 매번 정해진 일정 마다 같은 동작을 반복하는 것이 꼭 잔소리를 듣는 것 같다는 중의적 의미을 담아 잔소리(Nagging)라 이름 지었습니다. 

## 👁‍🗨 프로젝트 개요
- 애드센스 광고수익 추적 및 관리를 간편하게 하기 위한 일/월/년 단위 자동 합산과 사용자 맞춤형 보고서 메일링(알림) 서비스 입니다.

## 🎫 프로젝트 목적과 방향성
- **(목적)** 기존 애드센스 보고서처리는 사용자가 직접 애드센스 페이지에 방문하여 수동으로 처리해야 했습니다. 해당 프로젝트는 이러한 불편함을 개선하는 것이 목적이며, 애드센스 수익 계산 처리 및 보고서 알림 자동화를 통해 사용자는 기존의 애드센스 보고서의 복잡함을 단순화하여 편의성과 접근성을 높이는 것을 목표로 합니다.
- **(방향성)** 현재는 애드센스 보고서 등록을 통한 관리 편의성을 높이는 것에 초점을 두는 만큼 현재는 모든 옵션을 제공하고 있지 않으나, 조금씩 기능이 안정화되면 추가해 나갈 예정입니다.

## 📅 개발 기간/유지보수
- **개발기간**: 2024.07.09 ~ 2024.08.05
- **유지보수**: -
- **히스토리**: [작업 이슈 히스토리](https://github.com/youngwan2/nagging/issues/2)
## 🔥 배포
- 준비중

## 🛠️ 트러블 슈팅
- 준비중

## 🧰 프레임워크 / 라이브러리 / 그 외 도구

| 사용 스텍 | 선택 이유 |
| :-------: | :-------- |
|  준비중   | 준비중    |

## ⚙ 주요 기능
### 보고서 기능(알림 설정)
- 사용자가 애드센스 수익 통계를 위한 보고서 옵션을  선택하고, 원하는 시간대에 맞춰 CSV 형식의 보고서를 받을 수 있습니다. 이 기능은 사용자가 맞춤형 데이터를 얻을 수 있도록 도와주는데 목적이 있습니다.
#### 기능 설명
- **보고서 옵션 선택**: 사용자는 제공되는 여러 보고서 옵션 중에서 원하는 항목을 선택할 수 있습니다. 옵션은 [예: 날짜 범위, 데이터 범위, 화폐 단위 등]을 포함합니다.
- **알림 등록 및 CSV 파일 전송**: 설정된 날짜와 보고서 형식에 맞춰 사용자가 주/월/년 단위로 알림을 등록하면, 해당 일정에 맞춰 CSV 보고서가 자동으로 생성되어 로그인한 구글의 이메일 주소 전송됩니다.
- **보고서 및 알림 관리**:
   - 사용자는 하나의 페이지에서 보고서 추가 및 목록 관리, 알림 등록, 알림 삭제 등의 처리가 가능합니다. 등록된 알림의 경우에는 다음과 다다음 알림 일정을 확인할 수 있으므로, 사용자는 자신이 요청한 보고서가 언제 받아볼 수 있는지 실시간으로 확인할 수 있습니다.
#### 사용 방법
- **보고서 옵션 선택**:
   - 웹 애플리케이션 또는 API를 통해 제공되는 옵션 목록에서 원하는 보고서 옵션을 선택합니다.
   - 예를 들어, '날짜 범위'를 설정하고, 필요한 데이터 필터를 적용합니다.
- **보고서 전송 시간**:
   - 보고서가 전송될 시간을 선택합니다. 현재는 주/월/년 단위로 알림 설정이 가능합니다.
- **보고서 즉시 요청**:
   - '즉시 받기' 버튼을 클릭하면 설정한 옵션에 따른 맞춤형 보고서가 사용자의 계정 이메일로 전송됩니다.


## 🤔 트러블 슈팅
- 준비중

## 🗂️ 프로젝트 구조
- 준비중
