import { Redirect } from 'expo-router';

export default function Index() {
  // TODO: Verificar estado de autenticación y redirigir a login o al flujo autenticado
  return <Redirect href="/login" />;
}
