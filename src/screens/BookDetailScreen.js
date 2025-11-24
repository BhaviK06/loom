import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';
import * as Speech from 'expo-speech';

export default function BookDetailScreen({ route }) {
    const { book } = route.params;
    const { favorites, toggleFavorite } = useContext(FavoritesContext);
    const isFavorite = !!favorites.find((b) => b.id === book.id);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const handleSpeak = async () => {
        if (isSpeaking) {
            Speech.stop();
            setIsSpeaking(false);
        } else {
            if (!book.description || book.description.trim() === '') {
                Alert.alert('No Description', 'This book has no description to read.');
                return;
            }

            try {
                // Remove HTML tags from description
                const cleanDescription = book.description.replace(/<[^>]*>/g, '');

                setIsSpeaking(true);
                await Speech.speak(cleanDescription, {
                    language: 'en-US',
                    pitch: 1.0,
                    rate: 0.75,
                    onDone: () => setIsSpeaking(false),
                    onStopped: () => setIsSpeaking(false),
                    onError: () => {
                        setIsSpeaking(false);
                        Alert.alert('Error', 'Failed to start text-to-speech');
                    }
                });
            } catch (error) {
                console.error('TTS Error:', error);
                setIsSpeaking(false);
                Alert.alert('Error', 'Failed to start text-to-speech');
            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Book Cover */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: book.imageUrl }} style={styles.image} />
                </View>

                {/* Book Info */}
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>by {book.author}</Text>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.favoriteButton]}
                        onPress={() => toggleFavorite(book)}
                    >
                        <Text style={styles.actionIcon}>{isFavorite ? '💜' : '🤍'}</Text>
                        <Text style={styles.actionText}>
                            {isFavorite ? 'Remove' : 'Favorite'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.speakerButton]}
                        onPress={handleSpeak}
                    >
                        <Text style={styles.actionIcon}>{isSpeaking ? '⏸️' : '🔊'}</Text>
                        <Text style={[styles.actionText, { color: '#fff' }]}>
                            {isSpeaking ? 'Stop' : 'Listen'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Description */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>
                        {book.description
                            ? book.description.replace(/<[^>]*>/g, '')
                            : 'No description available.'}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3E8FF',
    },
    content: {
        padding: 16,
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    image: {
        width: 160,
        height: 240,
        borderRadius: 12,
        backgroundColor: '#E9D5FF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#7C3AED',
        textAlign: 'center',
        marginBottom: 8,
    },
    author: {
        fontSize: 16,
        color: '#9333EA',
        textAlign: 'center',
        marginBottom: 24,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 24,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 2,
    },
    favoriteButton: {
        backgroundColor: '#fff',
        borderColor: '#DDD6FE',
    },
    speakerButton: {
        backgroundColor: '#A855F7',
        borderColor: '#A855F7',
    },
    actionIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#7C3AED',
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        borderWidth: 2,
        borderColor: '#DDD6FE',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#7C3AED',
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 22,
    },
});