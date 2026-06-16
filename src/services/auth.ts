import { AuthCredentials, AuthResponse, AuthError } from '@/types/auth';

const MOCK_DRIVER = {
  id: 'drv-001',
  dni: '12345678',
  fullName: 'Carlos Mendez',
};

const MOCK_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkcnYtMDAxIiwiZG5pIjoiMTIzNDU2NzgiLCJuYW1lIjoiQ2FybG9zIE1lbmRleiJ9.mock-signature';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function login(credentials: AuthCredentials): Promise<AuthResponse> {
  // Simulate network latency for a realistic feedback window.
  await delay(800);

  // TODO: Replace with real HTTP call to backend once API contracts are defined.
  // For now, a deterministic mock allows the UI flow to be tested end-to-end.
  if (!credentials.dni || !credentials.password) {
    throw new AuthError('Ingresá tu DNI y contraseña');
  }

  if (credentials.dni !== MOCK_DRIVER.dni || credentials.password !== 'password') {
    throw new AuthError('DNI o contraseña incorrectos');
  }

  return { token: MOCK_TOKEN, driver: MOCK_DRIVER };
}
