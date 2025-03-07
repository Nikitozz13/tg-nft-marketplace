import React from 'react';
import { Button, Placeholder } from '@telegram-apps/telegram-ui';
import Animation from '@/components/Animations/Animation';

type NoDataProps = {
  text?: string;
  description?: string;
  buttonText?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ErrorContent = ({
  text = "Oops, no data",
  description = "Searching the galaxy for it...",
  buttonText = "Search again!",
  onClick = () => {},
}: NoDataProps) => {
  return (
    <Placeholder
      header={text}
      description={description}
      action={<Button mode='bezeled' size="s" onClick={onClick}>{buttonText}</Button>}
    >
      <Animation animationSrc='/animations/ufo.json' loop />
    </Placeholder>
  )
}

export default ErrorContent;
