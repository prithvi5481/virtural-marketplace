import { Space, AvailabilitySlot } from '@/types/spaces';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchSpaces = async (filters = {}): Promise<Space[]> => {
  const stringifiedFilters: Record<string, string> = {};
  Object?.entries(filters).forEach(([key, value]) => {
    if (typeof value !== 'undefined' && typeof value !== 'symbol') {
      stringifiedFilters[key] = String(value);
    }
  });
  const params = new URLSearchParams(stringifiedFilters);
  const response = await fetch(`${API_URL}/spaces?${params}`);
  return response.json();
};

export const fetchSpaceById = async (id: string): Promise<any> => {
  const response = await fetch(`${API_URL}/spaces/${id}`);
  return response.json();
};

export const createSpace = async (data: Omit<Space, 'id' | 'hostId'>): Promise<Space> => {
  const response = await fetch(`${API_URL}/spaces`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateSpaceAvailability = async (
  spaceId: string,
  slots: AvailabilitySlot[]
): Promise<Space> => {
  const response = await fetch(`${API_URL}/spaces/${spaceId}/availability`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slots }),
  });
  return response.json();
};