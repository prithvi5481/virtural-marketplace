import { User, UserProfileUpdate, RegisterCredentials, LoginCredentials, AuthResponse } from '@/types/users';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await fetch('/api/users/me');
  return response.json();
};

export const updateUserProfile = async (data: UserProfileUpdate): Promise<User> => {
  const formData = new FormData();
  
  if (data.name) formData.append('name', data.name);
  if (data.avatar) formData.append('avatar', data.avatar);

  const response = await fetch('/api/users/me', {
    method: 'PATCH',
    body: formData,
  });
  return response.json();
};