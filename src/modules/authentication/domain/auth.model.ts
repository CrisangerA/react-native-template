export interface UserEntity {
  email: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
}

export interface SignUpResponse {
  user: UserEntity;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: UserEntity;
}
