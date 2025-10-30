import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Navigate } from 'react-router-dom';
import { I18n } from '@aws-amplify/core';

function LoginPage() {
  I18n.putVocabularies({
    es: {
      'Sign In': 'Iniciar sesión',
      'Sign in': 'Iniciar sesión',
      'Sign Up': 'Crear cuenta',
      'Sign up': 'Crear cuenta',
      'Create Account': 'Crear cuenta',
      'Forgot your password?': '¿Olvidaste tu contraseña?',
      'Reset your password': 'Restablecer tu contraseña',
      'Send code': 'Enviar código',
      'Back to Sign In': 'Volver a iniciar sesión',
      'Confirm': 'Confirmar',
      'Confirmation Code': 'Código de confirmación',
      'New password': 'Nueva contraseña',
      'Confirm Password': 'Confirmar contraseña',
      'Password': 'Contraseña',
      'Email': 'Correo electrónico',
      'Resend Code': 'Reenviar código',
      'Submit': 'Enviar',
      'Change Password': 'Cambiar contraseña',
      'Sign Out': 'Cerrar sesión',
      'Have an account? Sign In': '¿Ya tienes cuenta? Inicia sesión',
      'No account? Create account': '¿No tienes cuenta? Crea una cuenta',
      'Reset Password': 'Restablecer contraseña',
      'Enter your email': 'Introduce tu correo electrónico',
      'Enter your password': 'Introduce tu contraseña',
      'Enter your new password': 'Introduce tu nueva contraseña',
      'Enter your confirmation code': 'Introduce tu código de confirmación',
    }
  });
  I18n.setLanguage('es');

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