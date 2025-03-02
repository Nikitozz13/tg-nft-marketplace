import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import { shortenAddress } from '@/utils/text';
import { Card } from '@telegram-apps/telegram-ui';

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button onClick={copyToClipboard} className="flex items-center gap-1 text-blue-500 hover:text-blue-700">
      <span>{shortenAddress(text)}</span>
      {copied
        ? <FontAwesomeIcon icon={faClipboardCheck} className="text-green-500" />
        : <FontAwesomeIcon icon={faClipboard} />
      }
    </button>
  );
};

const NFTTokenCard = ({ image, friendlyAddress, rawAddress, ownerAddress, name, description }: any) => {
  return (
    <Card className='flex p-4 m-2'>
      <img src={image} alt={name} className="w-20 h-20 object-cover rounded-lg" />

      <div className="ml-4 flex flex-col justify-center text-white">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-400">{description}</p>

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
