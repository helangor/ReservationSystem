import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";

/*export const authThunkLogin = createAsyncThunk("auth/login", async () => {
  const response = await authService.login("user", "pass");
  return response.data;
});
*/
//async (username: string, password: string, thunkAPI) => {
//  const response = await authService.login(username, password);
