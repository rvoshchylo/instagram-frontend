export default function LoginPage() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/instagram';
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full text-center space-y-4">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p className="text-gray-600">Login with your Facebook account to continue</p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full"
        >
          Continue with Facebook
        </button>
      </div>
    </div>
  );
}
