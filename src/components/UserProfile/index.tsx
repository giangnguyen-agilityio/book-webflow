'use client';

import { memo } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';

// Icons
import { LogOutIcon } from '@/icons';

// Types
import { UserSession } from '@/types';

// APIs
import { handleSignOut } from '@/apis';

// Components
import { Button, ImageFallback } from '@/components';

interface UserProfileProps {
  userInfo?: UserSession;
}

const UserProfile = ({ userInfo }: UserProfileProps) => {
  return (
    <Dropdown
      placement="bottom-end"
      classNames={{
        content: 'min-w-32',
      }}
    >
      <DropdownTrigger>
        <Button isIconOnly className="p-0" radius="full" variant="light">
          <ImageFallback
            alt="User avatar"
            className="aspect-square rounded-full object-cover"
            height={40}
            src={userInfo?.image || ''}
            width={40}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="User menu actions">
        <DropdownItem
          key="logout"
          className="text-foreground-100"
          startContent={<LogOutIcon customClass="w-4 h-4" />}
          onClick={handleSignOut}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default memo(UserProfile);
