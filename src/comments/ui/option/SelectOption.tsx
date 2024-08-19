interface PropsType {
  text: string;
  value: string;
}

export default function SelectOption({ text, value }: PropsType) {
  return <option value={value}>{text}</option>;
}
