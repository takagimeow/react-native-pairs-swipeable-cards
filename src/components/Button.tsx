import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const Button = ({
  name,
  color = '#c4c4c4',
  onPress,
}: {
  name: 'reply' | 'heart' | 'handshake-o';
  color?: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <FontAwesome name={name} size={28} color={color} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    elevation: 5,
    borderRadius: 50,
    shadowColor: 'rgba(196, 196, 196, 0.25)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 2.5,
    shadowRadius: 7.4,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
