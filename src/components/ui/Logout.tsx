import { useLogout } from '../../api/instagram/useInstagramProfile';

export const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogout();

  return (
    <button
      onClick={() => logout()}
      disabled={isPending}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
        ${isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}
        text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
    >
      {isPending ? 'Logging out...' : 'Logout'}
    </button>
  );
};
