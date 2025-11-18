import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { Navigate } from "react-router-dom";

const ApiDocsPage = () => {
  // Solo accesible en desarrollo
  const isDevelopment = import.meta.env.MODE === 'development';

  if (!isDevelopment) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">API Docs (Development Only)</h1>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
        <p className="font-bold">⚠️ Modo Desarrollo</p>
        <p>Esta página solo está disponible en el entorno de desarrollo local.</p>
      </div>
      <div style={{ background: "white", borderRadius: 8, padding: 8 }}>
        <SwaggerUI url="https://kmz9tbpei9.eu-west-3.awsapprunner.com/openapi.json" />
      </div>
    </div>
  );
};

export default ApiDocsPage;