import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import BookCard from '../components/BookCard';
import { FavoritesContext } from '../context/FavoritesContext';

export default function SearchScreen({ navigation, onLogout }) {
    const { favorites, toggleFavorite } = useContext(FavoritesContext);
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const recentSearches = ['Fantasy novels', 'Book club recommendations', 'Classic literature'];
    const trendingBooks = [
        { title: 'The Midnight Library', genre: 'Fiction' },
        { title: 'Atomic Habits', genre: 'Self-Help' },
        { title: 'Project Hail Mary', genre: 'Sci-Fi' },
    ];

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', onPress: onLogout, style: 'destructive' }
            ]
        );
    };

    const searchBooks = async (searchQuery) => {
        const q = (searchQuery || '').trim();
        if (!q) return;

        setHasSearched(true);
        setLoading(true);
        try {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=20`
            );
            const data = await response.json();
            const formattedBooks = data.items?.map((book) => ({
                id: book.id,
                title: book.volumeInfo.title,
                author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown',
                description: book.volumeInfo.description || '',
                imageUrl: book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/80x120',
            })) || [];
            setBooks(formattedBooks);
        } catch (error) {
            console.error('Error fetching books:', error);
            setBooks([]);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setHasSearched(false);
        setBooks([]);
        setQuery('');
    };

    const handleSearchSubmit = () => {
        setHasSearched(true);
        searchBooks(query);
    };

    if (!hasSearched) {
        return (
            <ScrollView style={styles.container}>
                {/* Header with logo and logout */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>

                    <View style={styles.logoContainer}>
                        <View style={styles.logoCircle}>
                            <Text style={styles.logoIcon}>📚</Text>
                        </View>
                        <View style={styles.logoBook}>
                            <Text style={styles.logoBookIcon}>📖</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>Loom</Text>
                    <Text style={styles.subtitle}>Discover your next great read</Text>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for books, authors, or genres"
                        placeholderTextColor="#C4B5FD"
                        value={query}
                        onChangeText={setQuery}
                        onSubmitEditing={handleSearchSubmit}
                        returnKeyType="search"
                    />
                </View>

                {/* Recent Searches */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.clockIcon}>🕐</Text>
                        <Text style={styles.sectionTitle}>Recent Searches</Text>
                    </View>
                    {recentSearches.map((search, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.recentItem}
                            onPress={() => {
                                setQuery(search);
                                searchBooks(search);
                            }}
                        >
                            <Text style={styles.recentText}>{search}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Trending Now */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.trendIcon}>📈</Text>
                        <Text style={styles.sectionTitle}>Trending Now</Text>
                    </View>
                    {trendingBooks.map((book, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.trendingItem}
                            onPress={() => {
                                setQuery(book.title);
                                searchBooks(book.title);
                            }}
                        >
                            <View style={styles.trendingIconContainer}>
                                <Text style={styles.trendingBookIcon}>📖</Text>
                            </View>
                            <View style={styles.trendingInfo}>
                                <Text style={styles.trendingTitle}>{book.title}</Text>
                                <Text style={styles.trendingGenre}>{book.genre}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        );
    }

    return (
        <View style={styles.container}>
            {/* Back button */}
            <View style={styles.searchHeader}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for books, authors, or genres"
                    placeholderTextColor="#C4B5FD"
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={handleSearchSubmit}
                    returnKeyType="search"
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#A855F7" style={{ marginTop: 24 }} />
            ) : books.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No results found</Text>
                </View>
            ) : (
                <FlatList
                    data={books}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const isFavorite = !!favorites.find((b) => b.id === item.id);
                        return (
                            <BookCard
                                title={item.title}
                                author={item.author}
                                imageUrl={item.imageUrl}
                                onPress={() => navigation.navigate('BookDetail', { book: item })}
                                isFavorite={isFavorite}
                                onToggleFavorite={() => toggleFavorite(item)}
                            />
                        );
                    }}
                    contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 16 }}
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
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 24,
        position: 'relative',
    },
    logoutButton: {
        position: 'absolute',
        top: 45,
        right: 16,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#DDD6FE',
    },
    logoutText: {
        color: '#7C3AED',
        fontWeight: '600',
        fontSize: 14,
    },
    logoContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    logoCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E9D5FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoIcon: {
        fontSize: 50,
    },
    logoBook: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#A855F7',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#F3E8FF',
    },
    logoBookIcon: {
        fontSize: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#7C3AED',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#9333EA',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: '#DDD6FE',
    },
    searchIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#7C3AED',
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: '#DDD6FE',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    clockIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    trendIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#7C3AED',
    },
    recentItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3E8FF',
    },
    recentText: {
        fontSize: 14,
        color: '#8B5CF6',
    },
    trendingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3E8FF',
    },
    trendingIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#A855F7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    trendingBookIcon: {
        fontSize: 20,
    },
    trendingInfo: {
        flex: 1,
    },
    trendingTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#7C3AED',
        marginBottom: 2,
    },
    trendingGenre: {
        fontSize: 12,
        color: '#A855F7',
    },
    searchHeader: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 0,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    backText: {
        fontSize: 16,
        color: '#8B5CF6',
        fontWeight: '500',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#9333EA',
    },
});
