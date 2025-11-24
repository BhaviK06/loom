import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DiaryContext = createContext();

export function DiaryProvider({ children }) {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = async () => {
        try {
            const stored = await AsyncStorage.getItem('@diary_entries');
            if (stored) setEntries(JSON.parse(stored));
        } catch (error) {
            console.error('Error loading diary entries:', error);
        }
    };

    const saveEntries = async (newEntries) => {
        try {
            await AsyncStorage.setItem('@diary_entries', JSON.stringify(newEntries));
            setEntries(newEntries);
        } catch (error) {
            console.error('Error saving diary entries:', error);
        }
    };

    const addEntry = (entry) => {
        const newEntries = [{
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...entry
        }, ...entries];
        saveEntries(newEntries);
    };

    const deleteEntry = (id) => {
        const newEntries = entries.filter(entry => entry.id !== id);
        saveEntries(newEntries);
    };

    return (
        <DiaryContext.Provider value={{ entries, addEntry, deleteEntry }}>
            {children}
        </DiaryContext.Provider>
    );
}