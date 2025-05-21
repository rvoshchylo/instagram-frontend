interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div className="bg-red-50 text-red-600 border border-red-200 rounded p-6 max-w-md w-full shadow-sm text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-3 h-8 w-8 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};
