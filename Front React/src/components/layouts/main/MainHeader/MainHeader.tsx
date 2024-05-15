import { WithChildrenProps } from '@app/types/generalTypes';
import React from 'react';
import * as S from './MainHeader.styles';
import {useLogin} from "@app/hooks/useLogin";

interface MainHeaderProps extends WithChildrenProps {
  isTwoColumnsLayout: boolean;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ isTwoColumnsLayout, children }) => {
  const { token } = useLogin();

  if (!token) {
    return null
  }

  return <S.Header $isTwoColumnsLayoutHeader={isTwoColumnsLayout}>{children}</S.Header>;
};
