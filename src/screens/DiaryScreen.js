import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    Alert,
    ScrollView,
} from 'react-native';
import { DiaryContext } from '../context/DiaryContext';

export default function DiaryScreen() {
    const { entries, addEntry, deleteEntry } = useContext(DiaryContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [bookTitle, setBookTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState(0);
    const [thoughts, setThoughts] = useState('');

    const handleSubmit = () => {
        if (!bookTitle.trim() || !thoughts.trim()) {
            Alert.alert('Required Fields', 'Please enter both book title and thoughts');
            return;
        }

        addEntry({
            bookTitle: bookTitle.trim(),
            author: author.trim(),
            thoughts: thoughts.trim(),
            rating: rating
        });

        setModalVisible(false);
        setBookTitle('');
        setAuthor('');
        setRating(0);
        setThoughts('');
    };

    const renderStars = (count) => {
        return '⭐'.repeat(count);
    };

    const StarRating = ({ rating, onRatingChange }) => (
        <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => onRatingChange(star)}>
                    <Text style={styles.star}>{star <= rating ? '⭐' : '☆'}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderEntry = ({ item }) => (
        <View style={styles.entryCard}>
            <View style={styles.leftBorder} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.bookTitle}>{item.bookTitle}</Text>
                        <Text style={styles.author}>{item.author}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                'Delete Entry',
                                'Are you sure you want to delete this entry?',
                                [
                                    { text: 'Cancel', style: 'cancel' },
                                    { text: 'Delete', onPress: () => deleteEntry(item.id), style: 'destructive' }
                                ]
                            );
                        }}
                    >
                        <Text style={styles.deleteBtn}>🗑️</Text>
                    </TouchableOpacity>
                </View>

                {item.rating > 0 && (
                    <View style={styles.ratingRow}>
                        <Text style={styles.ratingLabel}>Rating: </Text>
                        <Text style={styles.stars}>{renderStars(item.rating)}</Text>
                        <Text style={styles.ratingText}>{item.rating}/5</Text>
                    </View>
                )}

                <Text style={styles.thoughts}>"{item.thoughts}"</Text>
                <Text style={styles.date}>
                    {new Date(item.timestamp).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Reading Diary</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.addButtonText}>+ Add Entry</Text>
                </TouchableOpacity>
            </View>

            {entries.length === 0 ? (
                <View style={styles.emptyState}>
                    <View style={styles.emptyIconContainer}>
                        <Text style={styles.emptyIcon}>📖</Text>
                    </View>
                    <Text style={styles.emptyText}>Keep documenting your reading journey...</Text>
                </View>
            ) : (
                <FlatList
                    data={entries}
                    renderItem={renderEntry}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                />
            )}

            {/* Add Entry Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <ScrollView>
                        <Text style={styles.modalTitle}>New Diary Entry</Text>

                        <Text style={styles.inputLabel}>Book Title *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter book title"
                            placeholderTextColor="#C4B5FD"
                            value={bookTitle}
                            onChangeText={setBookTitle}
                        />

                        <Text style={styles.inputLabel}>Author</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter author name"
                            placeholderTextColor="#C4B5FD"
                            value={author}
                            onChangeText={setAuthor}
                        />

                        <Text style={styles.inputLabel}>Rating</Text>
                        <StarRating rating={rating} onRatingChange={setRating} />

                        <Text style={styles.inputLabel}>Your Thoughts *</Text>
                        <TextInput
                            style={[styles.input, styles.thoughtsInput]}
                            placeholder="Share your thoughts about this book..."
                            placeholderTextColor="#C4B5FD"
                            value={thoughts}
                            onChangeText={setThoughts}
                            multiline
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.saveButtonText}>Save Entry</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3E8FF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#7C3AED',
    },
    addButton: {
        backgroundColor: '#A855F7',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    list: {
        padding: 16,
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
        fontStyle: 'italic',
    },
    entryCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#DDD6FE',
    },
    leftBorder: {
        width: 4,
        backgroundColor: '#A855F7',
    },
    cardContent: {
        flex: 1,
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#7C3AED',
        marginBottom: 4,
    },
    author: {
        fontSize: 14,
        color: '#9333EA',
    },
    deleteBtn: {
        fontSize: 20,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingLabel: {
        fontSize: 14,
        color: '#7C3AED',
        fontWeight: '500',
    },
    stars: {
        fontSize: 16,
    },
    ratingText: {
        fontSize: 14,
        color: '#9333EA',
        marginLeft: 4,
    },
    thoughts: {
        fontSize: 14,
        color: '#6B7280',
        fontStyle: 'italic',
        marginBottom: 8,
        lineHeight: 20,
    },
    date: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#F3E8FF',
        padding: 16,
        paddingTop: 50,
    },
    modalTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#7C3AED',
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#7C3AED',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#DDD6FE',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        color: '#7C3AED',
    },
    thoughtsInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    starContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    star: {
        fontSize: 32,
        marginRight: 8,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 6,
    },
    cancelButton: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#DDD6FE',
    },
    saveButton: {
        backgroundColor: '#A855F7',
    },
    cancelButtonText: {
        color: '#7C3AED',
        fontWeight: '600',
        fontSize: 16,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});