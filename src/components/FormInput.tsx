import React from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardTypeOptions } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { COLORS, FONTS, FONT_SIZES } from '../styles/theme';

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  errorMessage?: string;
}

function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  errorMessage
}: FormInputProps<T>) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View style={[
            styles.inputWrapper,
            errorMessage ? styles.errorInput : null
          ]}>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              value={value}
              onChangeText={onChange}
            />
          </View>
        )}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    color: COLORS.text,
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.medium,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.textLight,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 60,
  },
  input: {
    flex: 1,
    height: 60,
    color: COLORS.text,
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.medium,
  },
  errorInput: {
    borderColor: COLORS.error,
    borderWidth: 2,
  },
  errorText: {
    color: COLORS.error,
    marginTop: 8,
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.small,
  },
});

export default FormInput; 