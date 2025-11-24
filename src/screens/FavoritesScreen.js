import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import BookCard from '../components/BookCard';
import { FavoritesContext } from '../context/FavoritesContext';

export default function FavoritesScreen({ navigation }) {
    const { favorites, toggleFavorite } = useContext(FavoritesContext);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Favorites</Text>
            </View>

            {favorites.length === 0 ? (
                <View style={styles.emptyState}>
                    <View style={styles.emptyIconContainer}>
                        <Text style={styles.emptyIcon}>💜</Text>
                    </View>
                    <Text style={styles.emptyText}>Add more books to build your collection</Text>
                </View>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <BookCard
                            title={item.title}
                            author={item.author}
                            imageUrl={item.imageUrl}
                            onPress={() =>
                                navigation.navigate('Search', {
                                    screen: 'BookDetail',
                                    params: { book: item },
                                })
                            }
                            isFavorite={true}
                            onToggleFavorite={() => toggleFavorite(item)}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3E8FF',
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#7C3AED',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    emptyIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E9D5FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emptyIcon: {
        fontSize: 40,
    },
    emptyText: {
        fontSize: 14,
        color: '#9333EA',
        textAlign: 'center',
    },
});