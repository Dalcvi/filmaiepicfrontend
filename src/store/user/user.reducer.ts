import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { User } from '../../services/user-services';

// Define a type for the slice state
interface UserState {
  user: User | null;
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      console.log('OKAY WE CHANGING');
      state.user = { ...state, ...action.payload };
    },
    logoutUser: state => {
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
