import { Booking } from '@/types/bookings';

export const createBooking = async (data: {
  spaceId: string;
  startTime: string;
  endTime: string;
  paymentMethodId: string;
}): Promise<Booking> => {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const fetchUserBookings = async (): Promise<Booking[]> => {
  const response = await fetch('/api/bookings');
  return response.json();
};

export const fetchBookingById = async (id: string): Promise<Booking | null> => {
  const response = await fetch(`/api/bookings/${id}`);
  if (!response.ok) return null;
  return response.json();
};

export const fetchHostBookings = async (): Promise<Booking[]> => {
  const response = await fetch('/api/host/bookings');
  return response.json();
};

export const cancelBooking = async (bookingId: string): Promise<Booking> => {
  const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
    method: 'PATCH',
  });
  return response.json();
};

export const fetchHostBookingById = async (id: string): Promise<Booking | null> => {
  const response = await fetch(`/api/host/bookings/${id}`);
  if (!response.ok) return null;
  return response.json();
};

export const cancelHostBooking = async (bookingId: string): Promise<Booking> => {
  const response = await fetch(`/api/host/bookings/${bookingId}/cancel`, {
    method: 'PATCH',
  });
  return response.json();
};