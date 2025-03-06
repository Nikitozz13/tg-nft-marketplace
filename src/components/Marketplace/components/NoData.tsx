import React from 'react'
import { Placeholder } from '@telegram-apps/telegram-ui'
import Animation from '@/components/Animations/Animation'

const NoData = () => {
  return (
    <Placeholder
      header="Oops, no data"
      description="Searching the galaxy for it..."
    >
      <Animation animationSrc='/animations/ufo.json' loop />
    </Placeholder>
  )
}

export default NoData