import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8">
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
              },
              password: {
                label: 'Contraseña',
                placeholder: 'Introduce tu contraseña',
                isRequired: true,
              },
              confirm_password: {
                label: 'Confirmar contraseña',
                placeholder: 'Confirma tu contraseña',
              },
            },
            signIn: {
              username: {
                label: 'Correo electrónico',
                placeholder: 'Introduce tu correo',
              },
              password: {
                label: 'Contraseña',
                placeholder: 'Introduce tu contraseña',
              },
            },
          }}
        >
          {({ user }) => {
            useEffect(() => {
              if (user) {
                navigate('/');
              }
            }, [user]);

            return null;
          }}
        </Authenticator>
      </div>
    </div>
  );
}

export default LoginPage;