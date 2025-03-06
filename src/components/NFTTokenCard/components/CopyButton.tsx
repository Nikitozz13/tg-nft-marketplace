import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import { shortenAddress } from '@/utils/text';

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

export default CopyButton;
