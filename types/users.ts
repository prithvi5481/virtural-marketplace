import { Booking } from "./bookings";
import { Space } from "./spaces";

// types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'user' | 'host' | 'admin';
  stripeCustomerId?: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Only available when fetched with relations
  spaces?: Space[];
  bookings?: Booking[];
  hostingBookings?: Booking[]; // For hosts
}

export interface UserSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: User['role'];
    avatarUrl?: string;
  };
  expires: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface UserProfileUpdate {
  name?: string;
  avatar?: File;
}

// types/auth.ts
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'host';
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}