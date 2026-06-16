import { StyleSheet, Text, View } from 'react-native';

import { OfflineBadge } from '@/components/OfflineBadge';
import { Button } from '@/components/Button';
import { colors, spacing, typography } from '@/constants/theme';
import { useAuthStore } from '@/stores/authStore';

export default function OrdersScreen() {
  const { driver, isOffline, logout } = useAuthStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hola, {driver?.fullName ?? 'repartidor'}</Text>
          <Text style={styles.subtitle}>Estos son tus pedidos asignados</Text>
        </View>
        {isOffline ? <OfflineBadge /> : null}
      </View>

      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No tenés pedidos asignados</Text>
        <Text style={styles.emptyText}>
          Cuando se te asignen pedidos desde el depósito, aparecerán acá.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button label="Cerrar sesión" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing['24'],
    paddingTop: spacing['64'],
    paddingBottom: spacing['24'],
  },
  header: {
    marginBottom: spacing['32'],
  },
  greeting: {
    color: colors.ink,
    fontFamily: typography.family.sans,
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    lineHeight: typography.sizes['2xl'] * typography.lineHeights.tight,
    marginBottom: spacing['8'],
  },
  subtitle: {
    color: colors.muted,
    fontFamily: typography.family.sans,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.regular,
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
    marginBottom: spacing['16'],
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    color: colors.ink,
    fontFamily: typography.family.sans,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    lineHeight: typography.sizes.lg * typography.lineHeights.normal,
    marginBottom: spacing['8'],
    textAlign: 'center',
  },
  emptyText: {
    color: colors.muted,
    fontFamily: typography.family.sans,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.regular,
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
    textAlign: 'center',
  },
  footer: {
    marginTop: spacing['24'],
  },
});
