import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.forgotPass')}</PageTitle>
    </>
  );
};

export default ForgotPasswordPage;
