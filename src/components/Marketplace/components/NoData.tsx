import React from 'react';
import { Button, Placeholder } from '@telegram-apps/telegram-ui';
import Animation from '@/components/Animations/Animation';

type NoDataProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const NoData = ({ onClick = () => {} }: NoDataProps) => {
  return (
    <Placeholder
      header="Oops, no data"
      description="Searching the galaxy for it..."
      action={<Button mode='bezeled' size="s" onClick={onClick}>Search again!</Button>}
    >
      <Animation animationSrc='/animations/ufo.json' loop />
    </Placeholder>
  )
}

export default NoData;
