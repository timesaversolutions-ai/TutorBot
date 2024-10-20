import React, { createContext, useContext, useState } from 'react';

const EmbeddingContext = createContext();

// Toggle this flag to enable/disable actual embedding API calls
const USE_ACTUAL_EMBEDDING = false;

// Mock embedded sections for when USE_ACTUAL_EMBEDDING is false
const MOCK_EMBEDDED_SECTIONS = [
  { text: "This is a mock embedded section 1", embedding: [0.1, 0.2, 0.3] },
  { text: "This is a mock embedded section 2", embedding: [0.4, 0.5, 0.6] },
  // Add more mock sections as needed
];

export const EmbeddingProvider = ({ children, value }) => {
  const [embeddedSections, setEmbeddedSections] = useState(
    USE_ACTUAL_EMBEDDING ? value : MOCK_EMBEDDED_SECTIONS
  );

  const contextValue = {
    embeddedSections,
    setEmbeddedSections,
    isUsingActualEmbedding: USE_ACTUAL_EMBEDDING
  };

  return (
    <EmbeddingContext.Provider value={contextValue}>
      {children}
    </EmbeddingContext.Provider>
  );
};

export const useEmbedding = () => useContext(EmbeddingContext);
