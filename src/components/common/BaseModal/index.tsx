'use client';

import { memo, ReactNode } from 'react';
import { Modal, ModalContent, ModalProps } from '@heroui/react';

interface BaseModalProps extends ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  placement?:
    | 'center'
    | 'top-center'
    | 'bottom-center'
    | 'auto'
    | 'top'
    | 'bottom'
    | undefined;
}

const BaseModal = ({
  isOpen,
  children,
  onClose,
  placement = 'center',
  ...rest
}: BaseModalProps) => (
  <Modal
    hideCloseButton
    isOpen={isOpen}
    placement={placement}
    scrollBehavior="inside"
    classNames={{
      base: 'rounded-none bg-background max-w-[800px] !my-auto',
      closeButton: 'text-primary',
      header: 'bg-secondary font-cardo font-bold text-primary',
    }}
    onClose={onClose}
    {...rest}
  >
    <ModalContent>{children}</ModalContent>
  </Modal>
);

export default memo(BaseModal);
