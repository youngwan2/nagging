import ChartInput from '../Input/ChartInput';
import InputContainer from './Container';
import Label from '../label/Label';
import Button from '../button/Button';
import Text from '../text/Text';
import Form from '../form/Form';

interface PropsType {
  onSearch: (form: FormData) => void;
}
export default function CalendarContainer({ onSearch }: PropsType) {
  return (
    <Form className="md:flex-row flex flex-col justify-center h-auto items-center" action={onSearch}>
      <InputContainer
        className={`md:flex-row flex flex-col items-center justify-center mt-5 transition-all duration-1000`}
        elName={'div'}
      >
        <Label className="text-gray-600 text-sm mb-4 md:mb-0 relative flex items-center justify-center ">
          <Text elementName={'span'} className="min-w-[30px]">
            최소 연도
          </Text>
          <ChartInput
            defaultValue="2024"
            placeholder="ex. 2023"
            className="m-2 p-1"
            type="number"
            key={'start'}
            maxLength={4}
            min={2010}
            name="startYear"
          />
        </Label>
        <Label className="text-gray-600 text-sm mb-4 md:mb-0 relative flex items-center justify-center">
          <Text elementName={'span'} className="min-w-[30px]">
            최대 연도
          </Text>
          <ChartInput
            defaultValue="2024"
            placeholder="ex.2024"
            className="m-2 p-1"
            type="number"
            key={'end'}
            maxLength={4}
            max={new Date().getFullYear()}
            name="endYear"
          />
        </Label>
        <Button
          className="hover:bg-gradient-to-br text-white bg-gradient-to-tl from-slate-500 to-slate-700 rounded-md p-[10px] min-w-[70px] w-[120px] mx-auto "
          type="submit"
        >
          조회
        </Button>
      </InputContainer>
    </Form>
  );
}
