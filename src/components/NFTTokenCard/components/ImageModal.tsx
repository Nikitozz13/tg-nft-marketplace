import { FixedLayout, Placeholder } from "@telegram-apps/telegram-ui";

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
    <FixedLayout vertical='top' className='z-10'>
      <Placeholder onClick={onClose}>
        <img
          src={imageUrl}
          alt={alt}
          className="max-w-80 max-h-80 object-contain"
          onError={onError}
        />
      </Placeholder>
    </FixedLayout>
  );
};

export default ImageModal;
