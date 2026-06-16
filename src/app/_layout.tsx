import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AuthInitializer } from '@/components/AuthInitializer';

export default function RootLayout() {
  return (
    <AuthInitializer>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(auth)" />
      </Stack>
      <StatusBar style="auto" />
    </AuthInitializer>
  );
}
