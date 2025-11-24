import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const json = await AsyncStorage.getItem('@favorites');
                if (json) setFavorites(JSON.parse(json));
            } catch (e) {
                console.warn('Failed to load favorites', e);
            }
        })();
    }, []);

    const persist = async (list) => {
        try {
            await AsyncStorage.setItem('@favorites', JSON.stringify(list));
        } catch (e) {
            console.warn('Failed to save favorites', e);
        }
    };

    const addFavorite = (book) => {
        setFavorites((prev) => {
            if (prev.find((b) => b.id === book.id)) return prev;
            const next = [...prev, book];
            persist(next);
            return next;
        });
    };

    const removeFavorite = (id) => {
        setFavorites((prev) => {
            const next = prev.filter((b) => b.id !== id);
            persist(next);
            return next;
        });
    };

    const toggleFavorite = (book) => {
        if (!book || !book.id) return;
        const exists = favorites.find((b) => b.id === book.id);
        if (exists) removeFavorite(book.id);
        else addFavorite(book);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}