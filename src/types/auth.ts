export interface Driver {
  id: string;
  dni: string;
  fullName: string;
}

export interface AuthCredentials {
  dni: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  driver: Driver;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}
