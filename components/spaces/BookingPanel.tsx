'use client';

import { useState } from 'react';
import { createBooking } from '@/lib/api/bookings';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { AvailabilitySlot, Space } from '@/types/spaces';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function BookingPanel({ space }: { space: Space }) {
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleBooking = async () => {
    if (!selectedSlot) return;
    
    const response = await fetch('/api/bookings/create-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        spaceId: space.id,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        amount: calculateTotal(selectedSlot),
      }),
    });
    
    const { clientSecret } = await response.json();
    setClientSecret(clientSecret);
  };

  const calculateTotal = (slot: AvailabilitySlot) => {
    const hours = (new Date(slot.endTime).getTime() - new Date(slot.startTime).getTime()) / (1000 * 60 * 60);
    return hours * space.pricePerHour;
  };

  return (
    <div className="border rounded-lg p-6 shadow-sm sticky top-4">
      {!clientSecret ? (
        <>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-2xl font-bold">${space.pricePerHour}</span>
              <span className="text-gray-500"> / hour</span>
            </div>
            <div className="text-sm text-gray-500">
              {space.capacity} {space.capacity === 1 ? 'seat' : 'seats'}
            </div>
          </div>

          {/* Slot selection UI */}
          {selectedSlot && (
            <div className="mb-6">
              <p className="font-medium mb-2">Selected Time</p>
              <div className="bg-gray-50 p-3 rounded">
                {format(new Date(selectedSlot.startTime), 'PPP')} •{' '}
                {format(new Date(selectedSlot.startTime), 'h:mm a')} -{' '}
                {format(new Date(selectedSlot.endTime), 'h:mm a')}
              </div>
              <p className="text-right mt-2 font-medium">
                Total: ${calculateTotal(selectedSlot).toFixed(2)}
              </p>
            </div>
          )}

          <Button 
            className="w-full" 
            disabled={!selectedSlot}
            onClick={handleBooking}
          >
            Book Now
          </Button>
        </>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm 
            onSuccess={() => {
              setClientSecret(null);
              setSelectedSlot(null);
            }}
          />
        </Elements>
      )}
    </div>
  );
}

function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/bookings/success`,
      },
    });

    if (error) {
      console.error(error);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button type="submit" className="w-full">
        Confirm Payment
      </Button>
    </form>
  );
}