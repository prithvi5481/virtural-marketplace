import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export default function BookingTimeline({
  status,
  createdAt,
  startTime,
  endTime,
}: {
  status: string;
  createdAt: Date;
  startTime: Date;
  endTime: Date;
}) {
  const getStatusVariant = () => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'completed': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="border rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium">Booking Timeline</h2>
        <Badge variant={getStatusVariant()}>
          {status}
        </Badge>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Created</span>
          <span>{format(new Date(createdAt), 'MMM d, yyyy h:mm a')}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Scheduled</span>
          <span>
            {format(new Date(startTime), 'MMM d, yyyy')} •{' '}
            {format(new Date(startTime), 'h:mm a')} -{' '}
            {format(new Date(endTime), 'h:mm a')}
          </span>
        </div>
      </div>
    </div>
  );
}