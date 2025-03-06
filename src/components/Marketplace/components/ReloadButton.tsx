import React, { MouseEventHandler } from 'react'
import { Button, FixedLayout, Placeholder } from '@telegram-apps/telegram-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'

type ReloadButtonProps = {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ReloadButton: React.FC<ReloadButtonProps> = ({ text, onClick }) => {
  return (
    <FixedLayout>
      <Placeholder>
        <Button
          before={<FontAwesomeIcon icon={faRotate} />}
          mode='filled'
          size='s'
          onClick={onClick}
        >
          {text}
        </Button>
      </Placeholder>
    </FixedLayout>
  )
}

export default ReloadButton