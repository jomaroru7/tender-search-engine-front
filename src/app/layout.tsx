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
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WQ7QP285');
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