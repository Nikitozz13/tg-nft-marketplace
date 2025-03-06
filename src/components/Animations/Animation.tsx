import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

type AnimationProps = {
  animationSrc: string;
  style?: React.CSSProperties;
  loop?: boolean;
}

const Animation: React.FC<AnimationProps> = ({ animationSrc, style, loop = true }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(animationSrc)
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, [])

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      style={{ width: 200, height: 200, ...style }}
    />
  )
}

export default Animation;
