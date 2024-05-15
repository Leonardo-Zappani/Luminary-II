import React from 'react';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './ProfileDropdown.styles';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseAvatar } from '@app/components/common/BaseAvatar/BaseAvatar';
import {useLogin} from "@app/hooks/useLogin";

export const ProfileDropdown: React.FC = () => {
  const { isTablet } = useResponsive();
  const { token , user, setUser, setToken} = useLogin();


  return user ? (
    <BasePopover content={<ProfileOverlay />} trigger="click">
      <S.ProfileDropdownHeader as={BaseRow} gutter={[10, 10]} align="middle">
        <BaseCol>
          <BaseAvatar src={user.profileImage} alt="User" shape="circle" size={40} />
        </BaseCol>
        {isTablet && (
          <BaseCol>
            <span>{`${user.userName}`}</span>
          </BaseCol>
        )}
      </S.ProfileDropdownHeader>
    </BasePopover>
  ) : null;
};
