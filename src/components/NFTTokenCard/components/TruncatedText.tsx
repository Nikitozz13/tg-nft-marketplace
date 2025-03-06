import { useState } from 'react';

type TruncatedTextProps = {
  text: string;
}

const TruncatedText = ({ text }: TruncatedTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded((prev) => !prev);
  };

  const truncatedClassName = isExpanded ? 'line-clamp-none' : `line-clamp-3`;

  return (
    <p
      onClick={toggleText}
      className={truncatedClassName}
    >
      {text}
    </p>
  );
};

export default TruncatedText;
