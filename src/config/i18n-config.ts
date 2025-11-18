import { I18n } from '@aws-amplify/core';

const authenticatorTranslations = {
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
    "Your code is on the way. To log in, enter the code we emailed to": "Tu código está en camino. Para iniciar sesión, introduce el código que te hemos enviado a",
    ". It may take a minute to arrive.": ". Puede tardar un minuto en llegar.",
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
};

export const configureI18n = () => {
  I18n.putVocabularies(authenticatorTranslations);
  I18n.setLanguage('es');
};