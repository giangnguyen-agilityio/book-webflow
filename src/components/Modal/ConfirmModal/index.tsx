'use client';

import { memo } from 'react';
import {
  Divider,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

// Components
import { Button, Text, Heading, BaseModal } from '@/components';

// Icons
import { CloseIcon } from '@/icons';

interface ConfirmModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  title,
  description,
  isOpen,
  isLoading,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => (
  <BaseModal
    aria-label="Confirm Modal"
    data-testid="confirm-modal"
    isOpen={isOpen}
    onClose={onCancel}
  >
    <ModalHeader
      className="w-full flex justify-end"
      data-testid="confirm-modal-header"
    >
      <Button
        isIconOnly
        aria-label="Close"
        className="rounded-full"
        size="sm"
        variant="outline"
        onPress={onCancel}
      >
        <CloseIcon customClass="w-4 h-4" />
      </Button>
    </ModalHeader>

    <Divider />

    <ModalBody
      className="flex flex-col justify-center items-center"
      data-testid="confirm-modal-content"
    >
      <Heading as="h2" className="font-cardo font-bold text-xl">
        {title}
      </Heading>
      <Text className="font-inter" type="wrap">
        {description}
      </Text>
    </ModalBody>

    <ModalFooter
      className="flex justify-center sm:justify-end"
      data-testid="confirm-modal-footer"
    >
      <Button
        aria-label="Cancel Button"
        className="flex-1 max-w-40 border-1.5"
        data-testid="cancel-button"
        disabled={isLoading}
        radius="sm"
        variant="outline"
        onPress={onCancel}
      >
        Cancel
      </Button>
      <Button
        aria-label="Confirm Button"
        className="flex-1 max-w-40 border-1.5"
        color="default"
        data-testid="confirm-button"
        isLoading={isLoading}
        radius="sm"
        variant="solid"
        onPress={onConfirm}
      >
        Confirm
      </Button>
    </ModalFooter>
  </BaseModal>
);

export default memo(ConfirmModal);
