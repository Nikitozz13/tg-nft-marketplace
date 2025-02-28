import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';

export const InfiniteLoaderEnd: React.FC = () => {
  return (
    <div className='flex items-center justify-center p-2 pb-8'>
      <div className='flex flex-col items-center justify-center'>
        <p>There&apos;s nothing to see here... yet!</p>
        <FontAwesomeIcon
          icon={faMugHot}
          size='2xl'
          className="fa-bounce icon-custom-animation text-green-500 mt-2"
        />
      </div>
    </div>
  )
};
