import TruncatedText from "./TruncatedText";

type TextWithDefaultProps = {
  text: string;
  defaultText: string;
}

const TextWithDefault = ({ text, defaultText }: TextWithDefaultProps) => {
  return text
    ? <TruncatedText text={text} />
    : <span className="italic text-gray-500">{defaultText}</span>
}

export default TextWithDefault;
