import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { UserDto } from "../../types/types";
import authService from "../../services/auth.service";

//TODO: Ei välttii tarvitse tälle reduxia

const user = { username: "test", token: "test" };

interface AuthState {
  isLoggedIn: boolean;
  user: UserDto | null;
}

export const authThunkLogin = createAsyncThunk(
  "auth/login",
  async (user: any) => {
    const response = await authService.login(user.username, user.password);
    return response;
  }
);

const initialState: AuthState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, action) => {
      console.log(" ACTION ", { action });

      console.log("REDUXI ", { state });
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authThunkLogin.pending, (state, action) => {
        console.log("pending ");
      })
      .addCase(authThunkLogin.fulfilled, (state, action) => {
        console.log(action.payload);
        //state.isLoggedIn = true;
      })
      .addCase(authThunkLogin.rejected, (state, action) => {
        console.log("rejected ");
      });
  },
});

export const { authLogin } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
