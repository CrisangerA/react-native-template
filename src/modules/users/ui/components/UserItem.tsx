import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
// Components
import { Text, Card, Avatar, Badge } from '@components/core';
// Hooks
import { useFocusFadeIn } from '@theme/hooks';
// Types
import type { UserEntity } from '../../domain/user.model';
// Theme
import { ANIMATION_DURATION, spacing } from '@theme/index';
// Navigation
import { UsersRoutes } from '@navigation/routes';
import { useNavigationUsers } from '@navigation/hooks';
// Helpers
import { getRoleVariant } from '@modules/users/domain/user.utils';
import { formatJoinDate } from '@modules/core/domain/date.utils';

interface UserItemProps {
  user: UserEntity;
  index: number;
}

export const UserItem = React.memo(function UserItem({
  user,
  index,
}: UserItemProps) {
  const { navigate } = useNavigationUsers();
  const { animatedStyle } = useFocusFadeIn({
    delay: index * 100,
    duration: ANIMATION_DURATION.normal,
  });

  const handleCardPress = () => {
    navigate(UsersRoutes.UserDetail, { userId: user.id });
  };

  return (
    <Animated.View style={animatedStyle}>
      <Card style={styles.card} onPress={handleCardPress}>
        <View style={styles.row}>
        <View style={styles.header}>
          <Avatar name={user.name} userId={user.id} size="md" />
          <View>
            <Text variant="h3">{user.name}</Text>
            <Text variant="bodySmall" color="textSecondary">
              {user.email}
            </Text>
          </View>
        </View>
        <Badge label={user.role} variant={getRoleVariant(user.role)} />
      </View>
<View style={styles.infoRow}>
          <Text variant="caption">📞 {user.phone}</Text>
          <Text variant="caption">📅 {formatJoinDate(user.createdAt)}</Text>
        </View>
      </Card>
    </Animated.View>
  );
});
const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    flex: 1,
    gap: spacing.md,
  },
  infoRow: {
    gap: spacing.xs,
  },
});
