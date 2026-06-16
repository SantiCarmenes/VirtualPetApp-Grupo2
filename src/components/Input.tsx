import { useState } from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors, radii, spacing, touchTargets, typography } from '@/constants/theme';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  error?: string | null;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
  testID?: string;
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  autoCapitalize = 'none',
  editable = true,
  testID,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(!secureTextEntry);

  const showToggle = secureTextEntry;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.field,
          isFocused && styles.fieldFocused,
          error && styles.fieldError,
          !editable && styles.fieldDisabled,
        ]}
      >
        <TextInput
          accessibilityLabel={label}
          accessibilityHint={placeholder}
          autoCapitalize={autoCapitalize}
          editable={editable}
          keyboardType={keyboardType}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secureTextEntry && !isVisible}
          style={styles.input}
          value={value}
          testID={testID}
        />
        {showToggle && (
          <Pressable
            accessibilityLabel={isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            accessibilityRole="button"
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            onPress={() => setIsVisible((prev) => !prev)}
            style={styles.toggle}
          >
            <Text style={styles.toggleLabel}>{isVisible ? 'Ocultar' : 'Mostrar'}</Text>
          </Pressable>
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing['16'],
  },
  label: {
    marginBottom: spacing['8'],
    color: colors.ink,
    fontFamily: typography.family.sans,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    lineHeight: typography.sizes.sm * typography.lineHeights.normal,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: touchTargets.minHeight,
    paddingHorizontal: spacing['16'],
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii['12'],
    backgroundColor: colors.surface,
  },
  fieldFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  fieldError: {
    borderColor: colors.error,
    backgroundColor: colors.errorMuted,
  },
  fieldDisabled: {
    backgroundColor: colors.surfaceHighlight,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    color: colors.ink,
    fontFamily: typography.family.sans,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.regular,
    lineHeight: typography.sizes.base * typography.lineHeights.normal,
    paddingVertical: spacing['12'],
  },
  toggle: {
    marginLeft: spacing['12'],
    paddingVertical: spacing['4'],
  },
  toggleLabel: {
    color: colors.primary,
    fontFamily: typography.family.sans,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  error: {
    marginTop: spacing['8'],
    color: colors.error,
    fontFamily: typography.family.sans,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.regular,
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
  },
});
