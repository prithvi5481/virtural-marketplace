import { fetchHostBookingById } from '@/lib/api/bookings';
import { notFound } from 'next/navigation';
import BookingDetailHeader from '@/components/host/BookingDetailHeader';
import BookingTimeline from '@/components/host/BookingTimeline';
import GuestInfoCard from '@/components/host/GuestInfoCard';
import SpaceInfoCard from '@/components/host/SpaceInfoCard';
import PaymentDetailsCard from '@/components/host/PaymentDetailsCard';
import BookingActions from '@/components/host/BookingActions';

export default async function HostBookingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const booking = await fetchHostBookingById(params.id);
  
  if (!booking) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <BookingDetailHeader 
          booking={booking} 
          backLink="/host/bookings" 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <BookingTimeline 
              status={booking.status} 
              createdAt={booking.createdAt}
              startTime={booking.startTime}
              endTime={booking.endTime}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {booking.user && <GuestInfoCard user={booking.user} />}
              {booking.space && <SpaceInfoCard space={booking.space} />}
            </div>
          </div>
          
          <div className="space-y-6">
            <PaymentDetailsCard 
              total={booking.totalPrice}
              hostEarnings={booking.totalPrice * 0.8} // 80% after 20% platform fee
              paymentMethod={booking.paymnentMethod}
              paymentIntentId={booking.paymentIntentId}
            />           
            <BookingActions 
              bookingId={booking.id} 
              currentStatus={booking.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
}