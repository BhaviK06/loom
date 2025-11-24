import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function BookCard({ title, author, imageUrl, onPress, isFavorite, onToggleFavorite }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>
                <Text style={styles.author} numberOfLines={1}>{author}</Text>
            </View>
            <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteButton}>
                <Text style={styles.heart}>{isFavorite ? '💜' : '🤍'}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#DDD6FE',
    },
    image: {
        width: 60,
        height: 90,
        borderRadius: 8,
        backgroundColor: '#E9D5FF',
    },
    info: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#7C3AED',
        marginBottom: 4,
    },
    author: {
        fontSize: 14,
        color: '#9333EA',
    },
    favoriteButton: {
        padding: 8,
    },
    heart: {
        fontSize: 24,
    },
});