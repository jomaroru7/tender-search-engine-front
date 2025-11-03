import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Navigate } from 'react-router-dom';
import { I18n } from '@aws-amplify/core';

function LoginPage() {
  I18n.putVocabularies({
    es: {
      "Sign In": "Iniciar sesión",
      "Sign in": "Iniciar sesión",
      "Sign Out": "Cerrar sesión",
      "Sign Up": "Crear cuenta",
      "Create Account": "Crear cuenta",
      "Confirm": "Confirmar",
      "Submit": "Enviar",
      "Send code": "Enviar código",
      "Resend Code": "Reenviar código",
      "Back to Sign In": "Volver a iniciar sesión",
      "Email": "Correo electrónico",
      "Password": "Contraseña",
      "Confirm Password": "Confirmar contraseña",
      "New password": "Nueva contraseña",
      "Enter your code": "Introduce tu código",
      "Enter your email": "Introduce tu correo",
      "Enter your password": "Introduce tu contraseña",
      "Enter your new password": "Introduce tu nueva contraseña",
      "Enter your confirmation code": "Introduce tu código de confirmación",
      "We Emailed You": "Te hemos enviado un correo",
      "Your code is on the way. To log in, enter the code we emailed to {username}. It may take a minute to arrive.":
        "Tu código está en camino. Para iniciar sesión, introduce el código que te hemos enviado a {username}. Puede tardar un minuto en llegar.",
      "Your code is on the way. To log in, enter the code we emailed to { username }. It may take a minute to arrive.":
        "Tu código está en camino. Para iniciar sesión, introduce el código que te hemos enviado a { username }. Puede tardar un minuto en llegar.",
      "Your code is on the way. To log in, enter the code we emailed to {{ username }}. It may take a minute to arrive.":
        "Tu código está en camino. Para iniciar sesión, introduce el código que te hemos enviado a {{ username }}. Puede tardar un minuto en llegar.",
      "Your code is on the way. To log in, enter the code we emailed to ": "Tu código está en camino. Para iniciar sesión, introduce el código que te hemos enviado a ",
      "It may take a minute to arrive.": "Puede tardar un minuto en llegar.",
      "We sent a code to": "Hemos enviado un código a",
      "Confirmation Code": "Código de confirmación",
      "User already exists": "El usuario ya existe",
      "Confirming": "Confirmando",
      "Forgot your password?": "¿Olvidaste tu contraseña?",
      "Reset your password": "Restablecer tu contraseña",
      "Change Password": "Cambiar contraseña",
      "Have an account? Sign In": "¿Ya tienes cuenta? Inicia sesión",
      "No account? Create account": "¿No tienes cuenta? Crea una cuenta",
      "Reset Password": "Restablecer contraseña",
      "Send code to": "Enviar código a",
      "Invalid password format": "Formato de contraseña inválido",
      "User does not exist": "El usuario no existe",
      "Username cannot be empty": "El usuario no puede estar vacío",
      "Code": "Código",
      "Code *": "Código *",
      "New Password": "Nueva contraseña",
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