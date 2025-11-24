import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';

export default function AuthScreen({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username.trim() && password.trim()) onLogin();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoCircle}>
                            <Text style={styles.logoIcon}>📚</Text>
                        </View>
                    </View>

                    <Text style={styles.title}>Loom</Text>
                    <Text style={styles.subtitle}>Weave your story, one page at a time</Text>

                    <View style={styles.form}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your username"
                            placeholderTextColor="#9CA3AF"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor="#9CA3AF"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            onSubmitEditing={handleLogin}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Enter</Text>
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>By entering you agree to our </Text>
                            <TouchableOpacity>
                                <Text style={styles.link}>terms</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.links}>
                           
                        </View>
                    </View>
                </View>

                <View style={styles.quote}>
                    <Text style={styles.quoteText}>"Books are a uniquely portable magic"</Text>
                    <Text style={styles.quoteAuthor}>— Stephen King</Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3E8FF',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 32,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#C084FC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoIcon: {
        fontSize: 40,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#D946EF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#6B7280',
        marginBottom: 32,
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#111827',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    button: {
        backgroundColor: '#A855F7',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    footerText: {
        fontSize: 12,
        color: '#6B7280',
    },
    link: {
        fontSize: 12,
        color: '#8B5CF6',
        fontWeight: '500',
    },
    links: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    quote: {
        marginTop: 32,
        alignItems: 'center',
    },
    quoteText: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 4,
    },
    quoteAuthor: {
        fontSize: 12,
        color: '#9CA3AF',
    },
});
