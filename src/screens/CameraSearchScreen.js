import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ScrollView,
    Image,
    TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function CameraSearchScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [imageUri, setImageUri] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const requestPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Camera permission is required to take photos.');
            return false;
        }
        return true;
    };

    const clearImage = () => {
        setImageUri(null);
        setResults([]);
        setSearchQuery('');
    };

    const takePhoto = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 0.8,
            });

            if (result.canceled) return;

            const asset = result.assets[0];
            setImageUri(asset.uri);
            setResults([]);
            setSearchQuery('');
        } catch (error) {
            console.error('Camera error:', error);
            Alert.alert('Error', 'Failed to take photo');
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 0.8,
            });

            if (result.canceled) return;

            const asset = result.assets[0];
            setImageUri(asset.uri);
            setResults([]);
            setSearchQuery('');
        } catch (error) {
            console.error('Image picker error:', error);
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    const searchBooks = async () => {
        if (!searchQuery.trim()) {
            Alert.alert('Enter Search', 'Please enter a book title or author');
            return;
        }

        setLoading(true);
        try {
            const booksResponse = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery.trim())}&maxResults=10`
            );

            const books = booksResponse.data.items?.map((book) => ({
                id: book.id,
                title: book.volumeInfo.title,
                author: book.volumeInfo.authors?.[0] || 'Unknown',
                description: book.volumeInfo.description || '',
                imageUrl: book.volumeInfo.imageLinks?.thumbnail,
            })) || [];

            if (books.length === 0) {
                Alert.alert('No Results', `No books found for "${searchQuery}"`);
            }

            setResults(books);
        } catch (error) {
            console.error('Search error:', error);
            Alert.alert('Error', 'Failed to search books');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Camera Search</Text>
                <Text style={styles.subtitle}>Take a photo and search for books</Text>
            </View>

            {/* Camera Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
                    <Text style={styles.buttonIcon}>📷</Text>
                    <Text style={styles.cameraButtonText}>Take Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
                    <Text style={styles.buttonIcon}>🖼️</Text>
                    <Text style={styles.galleryButtonText}>Choose Gallery</Text>
                </TouchableOpacity>
            </View>

            {/* Preview Image with Clear/Change options */}
            {imageUri && (
                <View style={styles.previewContainer}>
                    <Image source={{ uri: imageUri }} style={styles.previewImage} />
                    <View style={styles.imageActions}>
                        <TouchableOpacity style={styles.clearButton} onPress={clearImage}>
                            <Text style={styles.clearButtonText}>🗑️ Clear</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.changeButton} onPress={takePhoto}>
                            <Text style={styles.changeButtonText}>📷 Retake</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.changeButton} onPress={pickImage}>
                            <Text style={styles.changeButtonText}>🖼️ Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Search Section */}
            {imageUri && (
                <View style={styles.searchSection}>
                    <Text style={styles.searchLabel}>What book did you capture?</Text>
                    <View style={styles.searchInputContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Enter book title or author"
                            placeholderTextColor="#C4B5FD"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={searchBooks}
                            returnKeyType="search"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={searchBooks}
                        disabled={loading}
                    >
                        <Text style={styles.searchButtonText}>
                            {loading ? 'Searching...' : '🔍 Search Books'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Loading */}
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#A855F7" />
                    <Text style={styles.loadingText}>Searching...</Text>
                </View>
            )}

            {/* Results */}
            {results.length > 0 && (
                <View style={styles.resultsContainer}>
                    <Text style={styles.resultsTitle}>Found {results.length} books:</Text>
                    {results.map((book) => (
                        <TouchableOpacity
                            key={book.id}
                            style={styles.bookCard}
                            onPress={() => navigation.navigate('Search', { screen: 'BookDetail', params: { book } })}
                        >
                            {book.imageUrl && (
                                <Image source={{ uri: book.imageUrl }} style={styles.bookImage} />
                            )}
                            <View style={styles.bookInfo}>
                                <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
                                <Text style={styles.bookAuthor}>{book.author}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3E8FF',
    },
    header: {
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 24,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#7C3AED',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#9333EA',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 12,
        marginBottom: 24,
    },
    cameraButton: {
        flex: 1,
        backgroundColor: '#A855F7',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    galleryButton: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#DDD6FE',
    },
    buttonIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    cameraButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    galleryButtonText: {
        color: '#7C3AED',
        fontSize: 14,
        fontWeight: '600',
    },
    previewContainer: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    previewImage: {
        width: '100%',
        height: 250,
        borderRadius: 12,
        backgroundColor: '#E9D5FF',
    },
    imageActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        gap: 8,
    },
    clearButton: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#EF4444',
    },
    clearButtonText: {
        color: '#EF4444',
        fontSize: 14,
        fontWeight: '600',
    },
    changeButton: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#DDD6FE',
    },
    changeButtonText: {
        color: '#7C3AED',
        fontSize: 14,
        fontWeight: '600',
    },
    searchSection: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    searchLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#7C3AED',
        marginBottom: 12,
        textAlign: 'center',
    },
    searchInputContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#DDD6FE',
        marginBottom: 12,
    },
    searchInput: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#7C3AED',
    },
    searchButton: {
        backgroundColor: '#A855F7',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    loadingContainer: {
        alignItems: 'center',
        padding: 32,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#9333EA',
    },
    resultsContainer: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    resultsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#7C3AED',
        marginBottom: 16,
    },
    bookCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#DDD6FE',
    },
    bookImage: {
        width: 60,
        height: 90,
        borderRadius: 8,
        backgroundColor: '#E9D5FF',
    },
    bookInfo: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#7C3AED',
        marginBottom: 4,
    },
    bookAuthor: {
        fontSize: 14,
        color: '#9333EA',
    },
});