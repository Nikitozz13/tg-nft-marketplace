import React from "react";
import { Spinner } from "@telegram-apps/telegram-ui";

export const InfiniteLoader: React.FC = () => {
  return (
    <div className='flex justify-center p-2 pb-8'>
      <Spinner size='m' />
    </div>
  )
};
