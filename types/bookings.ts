import { Space } from './spaces';
import { User } from './users';

export interface Booking {
  id: string;
  spaceId: string;
  userId: string;
  hostId: string;
  startTime: Date;
  endTime: Date;
  status: 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  paymentIntentId: string;
  paymnentMethod: string;
  createdAt: Date;
  updatedAt: Date;
  space?: Space;         // Populated via relation
  user?: User;           // Populated via relation
}