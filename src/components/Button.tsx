import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, FONT_SIZES } from '../styles/theme';

interface ButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  secondary?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  loading = false,
  disabled = false,
  secondary = false,
  style,
  textStyle
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        secondary ? styles.secondaryButton : null,
        disabled || loading ? styles.disabledButton : null,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={secondary ? COLORS.primary : COLORS.background} />
      ) : (
        <Text style={[
          styles.buttonText,
          secondary ? styles.secondaryButtonText : null,
          textStyle
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    padding: 18,
    alignItems: 'center',
    marginTop: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    fontFamily: FONTS.regular,
  },
  secondaryButtonText: {
    color: COLORS.primary,
  },
});

export default Button; 