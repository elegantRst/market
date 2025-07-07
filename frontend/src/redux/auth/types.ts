import { ReviewInProfileType } from "redux/getReview/types";

export type User = {
  user: any;
  id: number;
  firstName: string;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  feedback: [ReviewInProfileType];
  token?: string;
};

export interface AuthSliceState {
  user: User;
  isLogged: boolean;
  registerModalStatus: boolean;
  loginModalStatus: boolean;
  requestError: string;
  isLoading: boolean;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  firstName: string;
  userName: string;
  email: string;
  password: string;
}
