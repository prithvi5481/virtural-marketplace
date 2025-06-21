import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCurrentUser } from '@/lib/api/users';

export default async function ProfileCard() {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <Avatar>
        <AvatarImage src={user.avatarUrl} />
        <AvatarFallback>
          {user.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-medium">{user.name}</h3>
        <p className="text-sm text-gray-600">{user.email}</p>
        <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
          {user.role}
        </span>
      </div>
    </div>
  );
}