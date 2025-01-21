'use client';

import { ChangeEvent, useRef, useState, useTransition } from 'react';
import Image from 'next/image';

// Utils
import { cn } from '@/utils';

// Context
import { useToast, ToastType } from '@/context';

// Constants
import {
  ACCEPTED_IMAGE_TYPES,
  BOOK_MESSAGES,
  MAX_FILE_SIZE,
} from '@/constants';

// Icons
import { TrashIcon } from '@/icons';

// Components
import { Button, Text, LoadingIndicator } from '@/components';

interface ImageUploadProps {
  value?: string;
  isDisabled?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}

const ImageUpload = ({
  value,
  isDisabled,
  error,
  onChange,
}: ImageUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(value || '');
  const [isPending, startTransition] = useTransition();
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isProcessing = isLoading || isPending;

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      addToast(BOOK_MESSAGES.IMAGE_SIZE_TOO_LARGE, ToastType.ERROR);
      return false;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      addToast(BOOK_MESSAGES.ONLY_IMAGE_FILES_ALLOWED, ToastType.ERROR);
      return false;
    }

    return true;
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.onerror = () => {
        reject(addToast(BOOK_MESSAGES.READ_FILE_FAILED, ToastType.ERROR));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file || !validateFile(file)) return;

      setIsLoading(true);

      startTransition(async () => {
        try {
          const base64String = await convertFileToBase64(file);
          setPreviewUrl(base64String);
          onChange?.(base64String);
        } catch (_error) {
          addToast(BOOK_MESSAGES.UPLOAD_IMAGE_ERROR, ToastType.ERROR);
        } finally {
          setIsLoading(false);
        }
      });
    } catch (_error) {
      setIsLoading(false);
      addToast(BOOK_MESSAGES.UPLOAD_IMAGE_ERROR, ToastType.ERROR);
    }
  };

  const handleRemoveImage = () => {
    startTransition(() => {
      setPreviewUrl('');
      onChange?.('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    });
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full space-y-4">
      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-4 min-h-[200px]',
          'flex flex-col items-center justify-center gap-4',
          'transition-colors duration-200',
          isProcessing && 'opacity-50 cursor-wait',
          isDisabled && 'opacity-50 cursor-not-allowed',
          error && 'border-danger',
          !previewUrl && 'border-gray-300',
        )}
      >
        <input
          ref={fileInputRef}
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
          aria-label="Upload image"
          className="hidden"
          data-testid="image-upload-input"
          disabled={isDisabled || isProcessing}
          type="file"
          onChange={handleFileChange}
        />

        {isProcessing ? (
          <LoadingIndicator
            containerClassName="h-full"
            fullScreen={false}
            size="sm"
            classNames={{
              circle1: 'border-b-primary',
              circle2: 'border-b-primary',
            }}
          />
        ) : previewUrl ? (
          <div className="relative w-full h-[200px]">
            <Image
              fill
              priority
              alt="Preview"
              className="object-contain rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={previewUrl}
            />
          </div>
        ) : (
          <div className="text-center">
            <Button
              className="mt-2"
              disabled={isDisabled || isProcessing}
              radius="sm"
              size="sm"
              variant="outline"
              onPress={handleUploadButtonClick}
            >
              Select Image
            </Button>
          </div>
        )}
      </div>

      {error && <Text className="text-danger text-sm">{error}</Text>}

      {previewUrl && (
        <Button
          className="px-2"
          color="danger"
          disabled={isDisabled || isProcessing}
          radius="sm"
          startContent={<TrashIcon customClass="w-4 h-4" />}
          variant="bordered"
          onPress={handleRemoveImage}
        >
          Remove Image
        </Button>
      )}

      <div className="flex flex-col gap-2">
        <Text className="text-xs" textColor="text-gray-500" type="wrap">
          Accepted formats: JPEG, PNG, WebP
        </Text>
        <Text className="text-xs" textColor="text-gray-500" type="wrap">
          Maximum file size: 5MB
        </Text>
      </div>
    </div>
  );
};

export default ImageUpload;
