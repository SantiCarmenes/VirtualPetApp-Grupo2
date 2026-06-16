import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { colors } from '@/constants/theme';
import { useAuthStore } from '@/stores/authStore';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const { hydrate, isHydrated } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!isHydrated) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
