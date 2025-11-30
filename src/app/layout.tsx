import type { ReactNode } from 'react';
import './globals.css';
import { Providers } from './providers';
import Script from 'next/script';

export const metadata = {
  title: 'Licico - Buscador de Licitaciones',
  description: 'Encuentra licitaciones adaptadas al perfil de tu empresa',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EMRNH3ZPGS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EMRNH3ZPGS');
          `}
        </Script>
      </head>
      <body className="bg-gray-50">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-WQ7QP285"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}