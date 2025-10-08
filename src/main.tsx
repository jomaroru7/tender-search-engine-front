import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './config/aws-config';
import AppRouter from './router';
import { Authenticator } from '@aws-amplify/ui-react';

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
    <Authenticator.Provider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </Authenticator.Provider>
  </StrictMode>
);
