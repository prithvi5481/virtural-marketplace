// types/space.ts
export interface Space {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  pricePerHour: number;
  capacity: number;
  hostId: string;
  amenities: string[];
  thumbnailUrl?: string;
  images?: string[];
  availability?: AvailabilitySlot[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AvailabilitySlot {
  id: string;
  startTime: Date;
  endTime: Date;
  status: 'available' | 'booked';
}