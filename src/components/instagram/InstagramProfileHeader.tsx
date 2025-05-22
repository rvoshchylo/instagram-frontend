import { LogoutButton } from '../ui/Logout';

interface Props {
  username: string;
  profilePictureUrl: string;
  pageName: string;
}

export const InstagramProfileHeader = ({ username, profilePictureUrl, pageName }: Props) => (
  <div className="flex items-center space-x-4 justify-between">
    <div className="flex items-center space-x-4">
      <img src={profilePictureUrl} alt={username} className="w-14 h-14 rounded-full border" />
      <div>
        <h1 className="text-xl font-semibold">@{username}</h1>
        <p className="text-sm text-gray-500">{pageName}</p>
      </div>
    </div>
    <LogoutButton />
  </div>
);
