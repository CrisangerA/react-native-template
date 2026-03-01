import React from 'react';
import { StyleSheet, View } from 'react-native';
// Components
import { Button, Text, TextInput } from '@components/core';
// Theme
import { useTheme, spacing } from '@theme/index';

interface HeaderProps {
  title: string;
  onPress: () => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

export function Header(props: HeaderProps) {
  const { title, onPress, searchText, setSearchText } = props;
  const {
    colors: { surface, border },
  } = useTheme();

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: surface, borderBottomColor: border },
      ]}
    >
      <View style={styles.header}>
        <Text variant="h1">{title}</Text>
        <Button onPress={onPress}>Agregar</Button>
      </View>

      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Buscar usuarios..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: spacing.md,
    borderBottomWidth: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
