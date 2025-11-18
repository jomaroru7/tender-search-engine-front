'use client';

import { ReactNode, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from '@/store';
import { setCpvs } from '@/store/slices/cpvSlice';
import { Amplify } from 'aws-amplify';
import Papa from 'papaparse';
import listadoCpvRaw from '@/data/listado-cpv.csv';  // Sin ?raw
import { configureI18n } from '@/config/i18n-config';

// Configurar Amplify
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      loginWith: {
        email: true,
        oauth: {
          domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN!,
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: [process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!],
          redirectSignOut: [process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!],
          responseType: 'code'
        }
      }
    }
  }
});

// Configurar i18n para Authenticator
configureI18n();

interface CpvParseResult {
  data: [string, string][];
  errors: any[];
  meta: Papa.ParseMeta;
}

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Cargar CPVs
    Papa.parse<[string, string]>(listadoCpvRaw, {
      header: false,
      delimiter: ";",
      skipEmptyLines: true,
      complete: (results: CpvParseResult) => {
        const cpvObj: Record<string, string> = Object.fromEntries(results.data);
        store.dispatch(setCpvs(cpvObj));
      }
    });
  }, []);

  return (
    <Authenticator.Provider>
      <Provider store={store}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Provider>
    </Authenticator.Provider>
  );
}