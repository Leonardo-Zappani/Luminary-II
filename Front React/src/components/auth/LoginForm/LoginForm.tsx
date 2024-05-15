import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doLogin } from '@app/store/slices/authSlice';
import { ReactComponent as FacebookIcon } from '@app/assets/icons/facebook.svg';
import { ReactComponent as GoogleIcon } from '@app/assets/icons/google.svg';
import * as S from './LoginForm.styles';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import {useLogin} from "@app/hooks/useLogin";

interface LoginFormData {
  email: string;
  password: string;
}

export const initValues: LoginFormData = {
  email: 'hello@altence.com',
  password: 'some-test-pass',
};

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { authenticate} = useLogin()

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (values: LoginFormData) => {
    setLoading(true);
    authenticate(values.email, values.password)
  };

  return (
    <Auth.FormWrapper>
      <BaseForm layout="vertical" onFinish={handleSubmit} requiredMark="optional" initialValues={initValues}>
        <Auth.FormTitle>{t('common.login')}</Auth.FormTitle>
        <S.LoginDescription>Preencha suas informações abaixo para logar ;)</S.LoginDescription>
        <Auth.FormItem
          name="email"
          label={t('common.email')}
          rules={[
            { required: true, message: t('common.requiredField') },
            {
              type: 'email',
              message: t('common.notValidEmail'),
            },
          ]}
        >
          <Auth.FormInput placeholder="leo@gmail.com" />
        </Auth.FormItem>
        <Auth.FormItem
          label="password"
          name="password"
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInputPassword placeholder={t('common.password')} />
        </Auth.FormItem>
        <BaseForm.Item noStyle>
          <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
            {t('common.login')}
          </Auth.SubmitButton>
        </BaseForm.Item>
        <Auth.FooterWrapper>
          <Auth.Text>
            Não possui uma conta? Crie {' '}
            <Link to="/auth/sign-up">
              <Auth.LinkText>aqui</Auth.LinkText>
            </Link>
          </Auth.Text>
        </Auth.FooterWrapper>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
