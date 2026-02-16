import JailMonkey from 'jail-monkey';
import { View } from 'react-native';
import React, { PropsWithChildren } from 'react';
// Components
import { Text } from '@components/core';
// Styles
import { commonStyles } from '@theme/index';

export default function SecureProvider({ children }: PropsWithChildren) {
  if (JailMonkey.isJailBroken()) {
    return (
      <View style={commonStyles.center}>
        <Text>
          Devices is rooted. This application do not work on rooted devices.
        </Text>
      </View>
    );
  }

  return <>{children}</>;
}
