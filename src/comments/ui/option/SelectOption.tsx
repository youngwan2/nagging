interface PropsType {
  text: string;
  value: string;
  selected?: boolean;
}

export default function SelectOption({ text, value, selected }: PropsType) {
  return (
    <option value={value} selected={selected}>
      {text}
    </option>
  );
}
