import React, { useState } from 'react';
import Image from 'next/image';
import { Card } from '@telegram-apps/telegram-ui';
import { NFTTokenInfo } from '@/app/api/tokens/types';
import TextWithDefault from './components/TextWithDefault';
import CopyButton from './components/CopyButton';

type NFTTokenCardProps = {
  nftTokenInfo: NFTTokenInfo;
}

const NFTTokenCard: React.FC<NFTTokenCardProps> = ({ nftTokenInfo }) => {
  const [imageError, setImageError] = useState<boolean>(false)
  const { image, friendlyAddress, rawAddress, ownerAddress, name, description } = nftTokenInfo;
  const imageToRender = image.medium || image.small || image.big;

  return (
    <Card className='flex p-4 m-2'>
      <Image
        src={imageError || !imageToRender ? 'images/image_placeholder.svg' : imageToRender}
        alt={name || friendlyAddress}
        width={80}
        height={80}
        className="w-20 h-20 min-w-20 object-contain object-top rounded-lg"
        onError={() => setImageError(true)}
        unoptimized
      />

      <div className="ml-4 flex flex-col justify-center text-white">
        <h2 className="text-lg font-semibold">
          <TextWithDefault text={name} defaultText="No name available yet" />
        </h2>
        <div className="text-gray-400">
          <TextWithDefault text={description} defaultText="Winter is coming... no description here." />
        </div>

        <div className="mt-2 space-y-1 text-sm text-gray-200">
          <div><span className="font-semibold">Friendly Address:</span> <CopyButton text={friendlyAddress} /></div>
          <div><span className="font-semibold">Raw Address:</span> <CopyButton text={rawAddress} /></div>
          <div><span className="font-semibold">Owner Address:</span> <CopyButton text={ownerAddress} /></div>
        </div>
      </div>
    </Card>
  );
};

export default NFTTokenCard;
