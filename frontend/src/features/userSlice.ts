import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../models/userModel";

interface initialUserState {
  logInUser: UserModel | null;
}

const initialState: initialUserState = {
  logInUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action: PayloadAction<UserModel | null>) => {
      state.logInUser = action.payload;
    },
  },
});

export const { setAuthenticatedUser } = userSlice.actions;
export default userSlice.reducer;
export type UserSlice = ReturnType<typeof userSlice.reducer>;
