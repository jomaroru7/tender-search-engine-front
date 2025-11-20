// src/app/(protected)/api-docs/page.tsx
'use client';

import dynamic from 'next/dynamic';
import Layout from '@/layouts/Layout';
import 'swagger-ui-react/swagger-ui.css';

// Cargar SwaggerUI dinámicamente solo en el cliente para evitar SSR
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocsPage() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">API Docs</h1>
        <div style={{ background: 'white', borderRadius: 8, padding: 8 }}>
          <SwaggerUI url="https://kmz9tbpei9.eu-west-3.awsapprunner.com/openapi.json" />
        </div>
      </div>
    </Layout>
  );
}