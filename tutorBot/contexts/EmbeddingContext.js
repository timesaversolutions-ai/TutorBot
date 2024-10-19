import React, { createContext, useContext } from 'react';

const EmbeddingContext = createContext();

export const EmbeddingProvider = ({ children, value }) => {
  return (
    <EmbeddingContext.Provider value={value}>
      {children}
    </EmbeddingContext.Provider>
  );
};

export const useEmbedding = () => useContext(EmbeddingContext);
