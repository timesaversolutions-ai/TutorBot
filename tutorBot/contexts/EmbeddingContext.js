import React, { createContext, useContext, useState, useEffect } from 'react';
import { setupEmbeddingSystem } from '../utils/embeddingService';

const EmbeddingContext = createContext();

export const EmbeddingProvider = ({ children }) => {
  const [embeddedSections, setEmbeddedSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEmbeddings = async () => {
      try {
        setIsLoading(true);
        const sections = await setupEmbeddingSystem();
        setEmbeddedSections(sections);
      } catch (error) {
        console.error('Error loading embeddings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEmbeddings();
  }, []);

  const contextValue = {
    embeddedSections,
    isLoading,
  };

  return (
    <EmbeddingContext.Provider value={contextValue}>
      {children}
    </EmbeddingContext.Provider>
  );
};

export const useEmbedding = () => useContext(EmbeddingContext);
