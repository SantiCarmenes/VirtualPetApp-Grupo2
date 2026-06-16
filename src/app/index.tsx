import { Redirect } from 'expo-router';

import { useAuthStore } from '@/stores/authStore';

export default function Index() {
  const { isAuthenticated, isHydrated } = useAuthStore();

  if (!isHydrated) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }

  return <Redirect href="/login" />;
}
