import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#EE4266',
  secondary: '#C1B2FF',
  accent: '#6F9CEB',
  background: '#FFFFFF',
  text: '#333333',
  light: '#F5F5F5',
  textLight: '#8A7F8D',
  error: '#D14C70',
};

export const FONTS = {
  regular: 'Lalezar_400Regular',
  bold: 'Lalezar_400Regular',
};

export const FONT_SIZES = {
  small: 14,
  medium: 18,
  large: 24,
  xlarge: 32,
  xxlarge: 42,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  text: {
    fontFamily: FONTS.regular,
    color: COLORS.text,
    fontSize: FONT_SIZES.medium,
  },
  title: {
    fontFamily: FONTS.regular,
    color: COLORS.secondary,
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: FONTS.regular,
    color: COLORS.text,
    fontSize: FONT_SIZES.large,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  buttonText: {
    fontFamily: FONTS.regular,
    color: COLORS.background,
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
  },
}); 