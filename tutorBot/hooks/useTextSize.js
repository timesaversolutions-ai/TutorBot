import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TEXT_SIZE_KEY = 'chatTextSize';

export const useTextSize = () => {
  const [textSize, setTextSize] = useState(16);

  useEffect(() => {
    const loadTextSize = async () => {
      try {
        const savedSize = await AsyncStorage.getItem(TEXT_SIZE_KEY);
        if (savedSize !== null) {
          setTextSize(Number(savedSize));
        }
      } catch (error) {
        console.error('Error loading text size:', error);
      }
    };
    loadTextSize();
  }, []);

  const updateTextSize = async (newSize) => {
    try {
      await AsyncStorage.setItem(TEXT_SIZE_KEY, String(newSize));
      setTextSize(newSize);
    } catch (error) {
      console.error('Error saving text size:', error);
    }
  };

  return { textSize, setTextSize: updateTextSize };
};