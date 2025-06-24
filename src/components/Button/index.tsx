import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Props extends TouchableOpacityProps {
  title: string;
  color?: string;
  onPress: () => void;
  light?: 'true' | 'false';
  icon?: keyof typeof Feather.glyphMap;
}

export function Button({ title, color = '#145291', light = 'false', icon, onPress, ...rest }: Props) {
  const isLight = light === 'true';

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      activeOpacity={0.8}
      onPress={onPress}
      {...rest}
    >
      <View style={styles.content}>
        {icon && (
          <Feather name={icon} size={20} color={isLight ? '#000' : '#fff'} style={styles.icon} />
        )}
        <Text style={[styles.title, { color: isLight ? '#000' : '#fff' }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    padding: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
