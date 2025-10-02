import { useEffect } from "react";

const cognitoUrl =
  "https://eu-west-3tfi6ftnzt.auth.eu-west-3.amazoncognito.com/login?client_id=6qmcc7fk4n5a354qpf6gk9cf0d&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fdevelop.ddr66khzzxhxt.amplifyapp.com";

const LoginPage = () => {
  useEffect(() => {
    window.location.href = cognitoUrl;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <h1 className="text-2xl font-bold mb-6 text-slate-700">
        Redirigiendo al login seguro...
      </h1>
    </div>
  );
};

export default LoginPage;