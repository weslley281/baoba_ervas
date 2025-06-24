import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { categories } from '../../utils/categories';
import { Button } from '../../components/Button';
import { Feather } from '@expo/vector-icons';

interface Category {
  key: string;
  name: string;
  icon: string;
}
interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  setSearchText: any;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  setSearchText,
  closeSelectCategory,
}: Props) {
  function handleCategorySelect(category: Category) {
    closeSelectCategory();
    setCategory(category);
    setSearchText('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categoria</Text>
      </View>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.category,
              category.key === item.key && styles.activeCategory,
            ]}
            onPress={() => handleCategorySelect(item)}
          >
            <Feather size={24} style={styles.icon} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  activeCategory: {
    backgroundColor: '#e6e6e6',
  },
  icon: {
    marginRight: 16,
  },
  name: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#eee',
  },
});
