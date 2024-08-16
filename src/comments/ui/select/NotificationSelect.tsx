import SelectOption from '../option/SelectOption';
import Select from './Select';

interface PropsType {
  options: any[];
  name: string;
  className?: string;
  condition?: string | number;
}
export default function NotificationSelect({
  options,
  name,
  className,
  condition,
}: PropsType) {
  return (
    <Select
      className={`${className} p-2 rounded-md`}
      name={name}
      defaultValue={condition ? condition : undefined}
    >
      {options.map((option) => {
        return (
          <SelectOption
            text={option.toString()}
            value={option.toString()}
            key={option}
          />
        );
      })}
    </Select>
  );
}
