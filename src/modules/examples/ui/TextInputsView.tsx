import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Button, Text, TextInput } from '@components/core';
import { spacing } from '@theme/index';

interface TextInputsViewProps {
  onBack: () => void;
}

export default function TextInputsView({ onBack }: TextInputsViewProps) {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text4, setText4] = useState('');
  const [text5, setText5] = useState('Valor predefinido');
  const [errorText, setErrorText] = useState('');
  const [disabledText, setDisabledText] = useState('No editable');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Button variant="ghost" size="sm" onPress={onBack}>
          ← Volver
        </Button>
        <Text variant="h1">Componente TextInput</Text>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Tamaños (Size)
        </Text>
        <View style={styles.inputGroup}>
          <TextInput
            label="Medium (default)"
            placeholder="Placeholder medium"
            size="md"
            value={text1}
            onChangeText={setText1}
          />
          <TextInput
            label="Large"
            placeholder="Placeholder large"
            size="lg"
            value={text2}
            onChangeText={setText2}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Variantes
        </Text>
        <View style={styles.inputGroup}>
          <TextInput
            label="Default"
            placeholder="Variante default"
            variant="default"
            value={text4}
            onChangeText={setText4}
          />
          <TextInput
            label="Outlined"
            placeholder="Variante outlined"
            variant="outlined"
          />
          <TextInput
            label="Filled"
            placeholder="Variante filled"
            variant="filled"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Con Iconos
        </Text>
        <View style={styles.inputGroup}>
          <TextInput
            label="Icono izquierdo"
            placeholder="Buscar..."
            leftIcon={<Text>🔍</Text>}
          />
          <TextInput
            label="Icono derecho"
            placeholder="Verificado"
            rightIcon={<Text>✓</Text>}
          />
          <TextInput
            label="Ambos iconos"
            placeholder="Email"
            leftIcon={<Text>📧</Text>}
            rightIcon={<Text>✓</Text>}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Estados
        </Text>
        <View style={styles.inputGroup}>
          <TextInput
            label="Estado Focus"
            placeholder="Haz clic aquí"
            helperText="Este campo tiene el foco al interactuar"
          />
          <TextInput
            label="Con Error"
            placeholder="Campo con error"
            value={errorText}
            onChangeText={setErrorText}
            error={
              errorText.length < 5 && errorText.length > 0
                ? 'Mínimo 5 caracteres'
                : ''
            }
            helperText="Escribe menos de 5 caracteres para ver el error"
          />
          <TextInput
            label="Deshabilitado"
            placeholder="No editable"
            value={disabledText}
            onChangeText={setDisabledText}
            editable={false}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Full Width
        </Text>
        <View style={styles.inputGroup}>
          <TextInput
            label="Full Width"
            placeholder="Este input ocupa todo el ancho"
            fullWidth
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Texto de Ayuda
        </Text>
        <View style={styles.inputGroup}>
          <TextInput
            label="Con Helper Text"
            placeholder="Ingresa tu nombre"
            helperText="Este texto proporciona información adicional sobre el campo"
          />
          <TextInput
            label="Helper + Error"
            placeholder="Ingresa un valor"
            value={text5}
            onChangeText={setText5}
            error={text5.length < 3 ? 'Muy corto' : ''}
            helperText="El mensaje de error reemplaza al helper"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Combinaciones
        </Text>
        <View style={styles.inputGroup}>
          <TextInput
            label="Outlined Large con Icono"
            placeholder="Búsqueda avanzada"
            variant="outlined"
            size="lg"
            leftIcon={<Text>🔍</Text>}
            fullWidth
            helperText="Combinación de variantes"
          />
          <TextInput
            label="Filled Medium con Error"
            placeholder="Contraseña"
            variant="filled"
            size="md"
            rightIcon={
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Text>{showPassword ? '🔒' : '👁️'}</Text>
              </Pressable>
            }
            error="Contraseña muy débil"
          />
          <TextInput
            label="Default Medium Deshabilitado con Icono"
            placeholder="No se puede editar"
            size="md"
            leftIcon={<Text>🔒</Text>}
            editable={false}
            value="Valor bloqueado"
            helperText="Este campo está bloqueado"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Tipo de Teclado
        </Text>
        <View style={styles.inputGroup}>
          <TextInput
            label="Email"
            placeholder="correo@ejemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Text>📧</Text>}
          />
          <TextInput
            label="Teléfono"
            placeholder="+57 300 123 4567"
            keyboardType="phone-pad"
            leftIcon={<Text>📱</Text>}
          />
          <TextInput
            label="Contraseña"
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            leftIcon={<Text>🔑</Text>}
            rightIcon={
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Text>{showPassword ? '🔒' : '👁️'}</Text>
              </Pressable>
            }
          />
          <TextInput
            label="Número"
            placeholder="12345"
            keyboardType="numeric"
            leftIcon={<Text>🔢</Text>}
          />
          <TextInput
            label="Multilinea"
            placeholder="Escribe una descripción larga aquí..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  header: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  section: {
    gap: spacing.sm,
  },
  inputGroup: {
    gap: spacing.lg,
    padding: spacing.md,
  },
});
