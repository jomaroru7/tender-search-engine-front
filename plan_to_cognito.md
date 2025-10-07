# Handle /login and /signup with AWS Cognito

AWS Cognito, you **don't need to involve your backend or create Lambda functions** for basic sign-up and sign-in. Cognito handles this directly from your frontend!

## Implementation Plan

Here's how to add authentication to your React app:

### 1. Install AWS Amplify

```bash
npm install aws-amplify @aws-amplify/ui-react
```

### 2. Set Up AWS Cognito User Pool

In AWS Console:

1. Go to **Amazon Cognito** → Create User Pool
2. Configure sign-in options (email or username)
3. Enable **self-registration** (allow users to sign up)
4. Configure password requirements
5. **Important**: For email verification, you can:
   - Use Cognito's email (free, limited to 50 emails/day)
   - Or configure SES for production
6. Create an **App Client** (no client secret needed for public apps)
7. Note down:
   - User Pool ID: eu-west-3_tFi6FTNzt
   - App Client ID: 6qmcc7fk4n5a354qpf6gk9cf0d
   - Region: eu-west-3

### 3. Configure Amplify in Your Project

Create a new config file:

```typescript
// src/config/aws-config.ts
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
      region: import.meta.env.VITE_COGNITO_REGION,
      loginWith: {
        email: true,
      }
    }
  }
});
```

Add to your `.env`:
```env
VITE_COGNITO_USER_POOL_ID=eu-west-1_xxxxxxxxx
VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_COGNITO_REGION=eu-west-1
```

### 4. Initialize Amplify in Your App

Update `src/main.tsx`:

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './config/aws-config'; // Add this line
import AppRouter from './router';

import { Provider } from 'react-redux';
import { store } from './store';
import { setCpvs } from './store/slices/cpvSlice';

import Papa from 'papaparse';
import listadoCpvRaw from './data/listado-cpv.csv?raw';

Papa.parse(listadoCpvRaw, {
  header: false,
  delimiter: ";",
  skipEmptyLines: true,
  complete: (results) => {
    const cpvObj = Object.fromEntries(results.data as [string, string][]);
    store.dispatch(setCpvs(cpvObj));
  }
});

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>
);
```

### 5. Create Login Page Component

```typescript
// src/views/LoginPage.tsx
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
            src="/icono_licico.png" 
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
          {({ signOut, user }) => {
            // Redirect to home after successful login
            useEffect(() => {
              if (user) {
                navigate('/');
              }
            }, [user, navigate]);

            return null;
          }}
        </Authenticator>
      </div>
    </div>
  );
}

export default LoginPage;
```

### 6. Protect Your Routes

Update your router to protect routes:

```typescript
// src/router.tsx (or wherever your router is)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import LoginPage from './views/LoginPage';
import IndexPage from './views/IndexPage';
// ... other imports

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthenticator((context) => [context.user]);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <IndexPage />
            </ProtectedRoute>
          }
        />
        {/* Other protected routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
```

### 7. Update API Calls to Include Auth Token

Update `src/services/tenders/tendersService.ts`:

```typescript
import { fetchAuthSession } from 'aws-amplify/auth';
import type { getTenderRequest, getTenderResponse, getTendersRequest, getTendersResponse } from "../../models/TendersApi";
import type { CardData, TenderDetailData } from "../../models/TendersFront";

const ENV = import.meta.env;

async function getAuthHeaders() {
    try {
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();
        
        return {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
        };
    } catch {
        return {
            "Content-Type": "application/json"
        };
    }
}

export const getTenders = async ({ invoicing, place, activity, page, page_size = 10, cpv_list }: getTendersRequest): Promise<getTendersResponse> => {
    const headers = await getAuthHeaders();
    
    return fetch(ENV.VITE_GET_TENDERS_URL + "/search", {
        method: "POST",
        headers,
        body: JSON.stringify({
            invoicing,
            place,
            activity,
            page,
            page_size,
            cpv_list,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const getTender = async ({ ID }: getTenderRequest): Promise<getTenderResponse> => {
    const headers = await getAuthHeaders();
    
    return fetch(ENV.VITE_GET_TENDERS_URL + "/get-tender", {
        method: "POST",
        headers,
        body: JSON.stringify({
            ID
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

// ... rest of your functions remain the same
```

### 8. Add Sign Out Button

You can add a sign-out button to your header/navbar:

```typescript
import { signOut } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';

function Header() {
  const { user } = useAuthenticator((context) => [context.user]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header>
      {/* Your header content */}
      {user && (
        <div>
          <span>Hola, {user.signInDetails?.loginId}</span>
          <button onClick={handleSignOut}>Cerrar sesión</button>
        </div>
      )}
    </header>
  );
}
```

## Key Points

✅ **No backend needed** for sign-up/sign-in - Cognito handles it directly  
✅ **No Lambda needed** for basic authentication  
✅ **Cognito provides**: User registration, login, password reset, email verification  
✅ **Your backend** will just validate the JWT token (as I showed in my previous response)
