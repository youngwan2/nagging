interface PropsType {
  text: string;
  value: string;
  defaultCheck?: boolean;
}

export default function SelectOption({ text, value, defaultCheck }: PropsType) {
  return (
    <option value={value} defaultChecked={defaultCheck}>
      {text}
    </option>
  );
}
