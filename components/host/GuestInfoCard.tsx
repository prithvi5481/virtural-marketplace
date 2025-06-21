import { User } from '@/types/users';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function GuestInfoCard({ user }: { user: User }) {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="font-medium mb-4">Guest Information</h2>
      
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback>
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-gray-600 text-sm">{user.email}</p>
          <button className="mt-2 text-sm text-blue-600 hover:underline">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}