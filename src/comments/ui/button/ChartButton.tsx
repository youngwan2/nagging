import ButtonContainer from '../container/Container';
import Button from './Button';

interface PropsType {
  timeFrame: string;
  onSetTimeFrame: (timeFrame: string) => void;
}

export default function ChartButton({ onSetTimeFrame, timeFrame }: PropsType) {
  function handleClick(timeFrame: string) {
    onSetTimeFrame(timeFrame);
  }

  return (
    <ButtonContainer className="m-4 flex justify-center" elName={'div'}>
      <Button
        title="달 기준으로 예상 수익을 조회합니다."
        className={`px-4 py-2 mr-2 rounded ${timeFrame === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => handleClick('month')}
      >
        Monthly
      </Button>
      <Button
        title="년 기준으로 예상 수익을 조회합니다."
        className={`px-4 py-2 rounded ${timeFrame === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => handleClick('year')}
      >
        Yearly
      </Button>
    </ButtonContainer>
  );
}
