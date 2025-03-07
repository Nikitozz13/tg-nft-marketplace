import { FixedLayout } from "@telegram-apps/telegram-ui";

type ImageModalProps = {
  imageUrl: string;
  alt: string;
  isOpen: boolean;
  onClose: React.MouseEventHandler;
  onError?: React.ReactEventHandler;
}

const ImageModal = ({
  imageUrl,
  isOpen,
  alt,
  onClose,
  onError = () => {},
}: ImageModalProps) => {
  if (!isOpen) return null;

  return (
    <FixedLayout
      vertical='top'
      className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
      onClick={onClose}
    >
      <img
        src={imageUrl}
        alt={alt}
        className="w-80 h-80 max-w-80 max-h-80 object-contain"
        onError={onError}
      />
    </FixedLayout>
  );
};

export default ImageModal;
