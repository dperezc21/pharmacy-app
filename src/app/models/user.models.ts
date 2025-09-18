

export interface UserAuth {
  userName: string;
  password?: string;
}

export interface User extends UserAuth {
  id?: number;
  fullName: string;
  role: string;
  token: string;
}
