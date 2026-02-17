/**
 * @format
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from '../src/components/core/Text';

// Mock the useTheme hook
jest.mock('@theme/index', () => ({
  useTheme: () => ({
    mode: 'light',
    colors: {
      text: '#0F172A',
      textSecondary: '#64748B',
      primary: '#3B82F6',
      error: '#EF4444',
      success: '#10B981',
      warning: '#F59E0B',
    },
  }),
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 24,
    xl: 32,
  },
}));

describe('Text Component', () => {
  it('renders correctly with default props', () => {
    render(<Text>Hello World</Text>);

    expect(screen.getByText('Hello World')).toBeOnTheScreen();
  });

  it('renders with different variants', () => {
    const variants = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'body',
      'bodySmall',
      'caption',
      'button',
      'overline',
    ] as const;

    variants.forEach(variant => {
      render(<Text variant={variant}>{variant}</Text>);
      expect(screen.getByText(variant)).toBeOnTheScreen();
    });
  });

  it('renders with different colors', () => {
    const colors = [
      'text',
      'textSecondary',
      'primary',
      'error',
      'success',
      'warning',
    ] as const;

    colors.forEach(color => {
      render(<Text color={color}>{color}</Text>);
      expect(screen.getByText(color)).toBeOnTheScreen();
    });
  });

  it('renders with different text alignments', () => {
    const alignments = ['left', 'center', 'right'] as const;

    alignments.forEach(align => {
      render(<Text align={align}>{align}</Text>);
      expect(screen.getByText(align)).toBeOnTheScreen();
    });
  });

  it('renders with different text transforms', () => {
    const transforms = ['uppercase', 'lowercase', 'capitalize'] as const;

    transforms.forEach(transform => {
      render(<Text transform={transform}>{transform}</Text>);
      expect(screen.getByText(transform)).toBeOnTheScreen();
    });
  });

  it('renders with different text decorations', () => {
    const decorations = ['underline', 'line-through'] as const;

    decorations.forEach(decoration => {
      render(<Text decoration={decoration}>{decoration}</Text>);
      expect(screen.getByText(decoration)).toBeOnTheScreen();
    });
  });

  it('renders with custom style', () => {
    const customStyle = { fontSize: 20, color: 'red' };
    render(<Text style={customStyle}>Custom Style</Text>);

    expect(screen.getByText('Custom Style')).toBeOnTheScreen();
  });

  it('renders with multiple props combined', () => {
    render(
      <Text
        variant="h1"
        color="primary"
        align="center"
        transform="uppercase"
        decoration="underline"
      >
        Combined
      </Text>,
    );

    expect(screen.getByText('Combined')).toBeOnTheScreen();
  });

  it('renders with React nodes as children', () => {
    render(
      <Text>
        <Text>Nested</Text>
      </Text>,
    );

    expect(screen.getByText('Nested')).toBeOnTheScreen();
  });
});
