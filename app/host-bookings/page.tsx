import { fetchHostBookings } from '@/lib/api/bookings';
import BookingCard from '@/components/booking/BookingCard';

export default async function HostBookingsPage() {
  const bookings = await fetchHostBookings();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Space Bookings</h1>
        <div className="flex gap-4">
          <select className="border rounded px-3 py-1">
            <option>All Statuses</option>
            <option>Upcoming</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No bookings for your spaces yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} variant="host" />
          ))}
        </div>
      )}
    </div>
  );
}