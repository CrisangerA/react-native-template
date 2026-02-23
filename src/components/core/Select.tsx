import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  ScrollView,
  ViewStyle,
} from 'react-native';
import { Text } from './Text';
import { Modal } from './Modal';
import { TextInput } from './TextInput';
import { useTheme } from '@theme/index';
import { spacing } from '@theme/spacing';
import { BorderRadiusToken } from '@theme/borders';
import {
  SelectSize,
  getSelectStyle,
  getSelectOptionStyle,
} from '@theme/components/Select.styles';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  label?: string;
  helperText?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: SelectOption | null;
  onChange?: (option: SelectOption | null) => void;
  size?: SelectSize;
  borderRadius?: BorderRadiusToken;
  fullWidth?: boolean;
  disabled?: boolean;
  modalTitle?: string;
  containerStyle?: ViewStyle;
}

export function Select(props: SelectProps) {
  const {
    label,
    helperText,
    error,
    placeholder = 'Seleccionar...',
    options,
    value,
    onChange,
    size = 'md',
    borderRadius,
    fullWidth = false,
    disabled = false,
    modalTitle,
    containerStyle,
  } = props;

  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const isDisabled = disabled;

  const styles = getSelectStyle({
    size,
    mode: theme.mode,
    borderRadius,
    isOpen,
    isDisabled,
  });

  const selectedLabel = useMemo(() => {
    return options.find(option => option.value === value?.value)?.label || '';
  }, [value, options]);

  const handlePress = () => {
    if (!isDisabled) {
      setIsOpen(true);
    }
  };

  const handleSelect = (option: SelectOption) => {
    onChange?.(option);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const rightIcon = <Text style={styles.icon}>▾</Text>;

  return (
    <View style={[fullWidth && baseStyles.fullWidth, containerStyle]}>
      <Pressable onPress={handlePress} disabled={isDisabled}>
        <TextInput
          label={label}
          helperText={helperText}
          error={error}
          value={selectedLabel}
          placeholder={placeholder}
          rightIcon={rightIcon}
          onPressIn={handlePress}
          pointerEvents="none"
        />
      </Pressable>
      <Modal
        visible={isOpen}
        onRequestClose={handleClose}
        title={modalTitle || label}
      >
        <ScrollView
          style={baseStyles.modalContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          {options.map((option, index) => (
            <Pressable
              key={`option-${index}`}
              onPress={() => handleSelect(option)}
              style={({ pressed }) => [
                baseStyles.option,
                getSelectOptionStyle(theme.mode, value?.value === option.value),
                pressed && baseStyles.optionPressed,
              ]}
            >
              <Text
                variant="body"
                color={value?.value === option.value ? 'primary' : 'text'}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </Modal>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  modalContent: {
    maxHeight: 300,
  },
  option: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: 4,
  },
  optionPressed: {
    opacity: 0.7,
  },
});
