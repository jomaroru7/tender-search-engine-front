import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const ApiDocsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">API Docs (local)</h1>
      <div style={{ background: "white", borderRadius: 8, padding: 8 }}>
        <SwaggerUI url="https://kmz9tbpei9.eu-west-3.awsapprunner.com/openapi.json" />
      </div>
    </div>
  );
};

export default ApiDocsPage;