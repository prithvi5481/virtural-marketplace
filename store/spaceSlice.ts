import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@lib/api';

interface Space {
  id: string;
  title: string;
  description: string;
  price_per_hour: number;
  capacity: number;
  host_id: string;
  availability?: AvailabilitySlot[];
}

interface AvailabilitySlot {
  id: string;
  start_time: string;
  end_time: string;
}

interface SpaceState {
  spaces: Space[];
  currentSpace: Space | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SpaceState = {
  spaces: [],
  currentSpace: null,
  status: 'idle',
  error: null
};

// Async Thunks
export const fetchSpaces = createAsyncThunk(
  'spaces/fetchSpaces',
  async (filters: { minPrice?: number; maxPrice?: number } = {}, thunkAPI) => {
    try {
      const response = await api.get('/spaces', { params: filters });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error || 'Failed to fetch spaces');
    }
  }
);

export const fetchSpaceById = createAsyncThunk(
  'spaces/fetchSpaceById',
  async (spaceId: string, thunkAPI) => {
    try {
      const response = await api.get(`/spaces/${spaceId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error || 'Space not found');
    }
  }
);

export const createSpace = createAsyncThunk(
  'spaces/createSpace',
  async (spaceData: Omit<Space, 'id' | 'host_id'>, thunkAPI) => {
    try {
      const response = await api.post('/spaces', spaceData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error || 'Failed to create space');
    }
  }
);

export const updateAvailability = createAsyncThunk(
  'spaces/updateAvailability',
  async ({ spaceId, slots }: { spaceId: string; slots: AvailabilitySlot[] }, thunkAPI) => {
    try {
      const response = await api.post(`/spaces/${spaceId}/availability`, { slots });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error || 'Failed to update availability');
    }
  }
);

const spaceSlice = createSlice({
  name: 'spaces',
  initialState,
  reducers: {
    clearCurrentSpace(state) {
      state.currentSpace = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Spaces
      .addCase(fetchSpaces.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSpaces.fulfilled, (state, action: PayloadAction<Space[]>) => {
        state.status = 'succeeded';
        state.spaces = action.payload;
      })
      .addCase(fetchSpaces.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Fetch Space by ID
      .addCase(fetchSpaceById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSpaceById.fulfilled, (state, action: PayloadAction<Space>) => {
        state.status = 'succeeded';
        state.currentSpace = action.payload;
      })
      .addCase(fetchSpaceById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Create Space
      .addCase(createSpace.fulfilled, (state, action: PayloadAction<Space>) => {
        state.spaces.push(action.payload);
      })
      
      // Update Availability
      .addCase(updateAvailability.fulfilled, (state, action: PayloadAction<Space>) => {
        if (state.currentSpace && state.currentSpace.id === action.payload.id) {
          state.currentSpace.availability = action.payload.availability;
        }
      });
  }
});

export const { clearCurrentSpace } = spaceSlice.actions;
export default spaceSlice.reducer;

// Selectors
export const selectAllSpaces = (state: { spaces: SpaceState }) => state.spaces.spaces;
export const selectCurrentSpace = (state: { spaces: SpaceState }) => state.spaces.currentSpace;
export const selectSpacesStatus = (state: { spaces: SpaceState }) => state.spaces.status;
export const selectSpacesError = (state: { spaces: SpaceState }) => state.spaces.error;