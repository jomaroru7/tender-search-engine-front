import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Navigate } from 'react-router-dom';
import { configureI18n } from '../config/i18n-config';

function LoginPage() {
  configureI18n();

  const { user } = useAuthenticator((context) => [context.user]);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full p-8">
        <div className="text-center mb-8">
          <img
            src="/logo_licico_blanco.png"
            alt="Licico"
            className="mx-auto h-16 mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">
            Bienvenido a Licico
          </h1>
          <p className="text-gray-600 mt-2">
            Inicia sesión o crea una cuenta para continuar
          </p>
        </div>

        <Authenticator
          signUpAttributes={['email']}
          socialProviders={[]}
          loginMechanisms={['email']}
          formFields={{
            signUp: {
              email: {
                label: 'Correo electrónico',
                placeholder: 'Introduce tu correo',
                isRequired: true,
                autocomplete: 'email',
              },
              password: {
                label: 'Contraseña',
                placeholder: 'Introduce tu contraseña',
                isRequired: true,
                autocomplete: 'new-password',
              },
              confirm_password: {
                label: 'Confirmar contraseña',
                placeholder: 'Confirma tu contraseña',
                autocomplete: 'new-password',
              },
            },
            signIn: {
              username: {
                label: 'Correo electrónico',
                placeholder: 'Introduce tu correo',
                autocomplete: 'email',
              },
              password: {
                label: 'Contraseña',
                placeholder: 'Introduce tu contraseña',
                autocomplete: 'current-password',
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default LoginPage;