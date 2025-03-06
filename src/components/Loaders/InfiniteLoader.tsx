import React from "react";
import { Placeholder, Spinner } from "@telegram-apps/telegram-ui";

export const InfiniteLoader: React.FC = () => {
  return (
    <Placeholder>
      <Spinner size='m' />
    </Placeholder>
  )
};
