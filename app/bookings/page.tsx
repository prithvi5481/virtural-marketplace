import { fetchUserBookings } from '@/lib/api/bookings';
import BookingCard from '@/components/booking/BookingCard';

export default async function BookingsPage() {
  const bookings = await fetchUserBookings();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">Your Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't made any bookings yet</p>
          <a 
            href="/spaces" 
            className="text-blue-600 hover:underline"
          >
            Browse available spaces
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} variant="user" />
          ))}
        </div>
      )}
    </div>
  );
}