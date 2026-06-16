import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/constants/theme';

export function OfflineBadge() {
  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <Text style={styles.text}>Modo offline · datos locales</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing['12'],
    paddingVertical: spacing['8'],
    borderRadius: radii.full,
    backgroundColor: colors.accentMuted,
  },
  dot: {
    width: spacing['8'],
    height: spacing['8'],
    borderRadius: radii.full,
    marginRight: spacing['8'],
    backgroundColor: colors.accent,
  },
  text: {
    color: colors.inkSecondary,
    fontFamily: typography.family.sans,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    lineHeight: typography.sizes.sm * typography.lineHeights.normal,
  },
});
