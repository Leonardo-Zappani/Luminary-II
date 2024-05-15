import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '@app/components/auth/LoginForm/LoginForm';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center', marginTop: 220 }}>
        <PageTitle>{t('common.login')}</PageTitle>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
