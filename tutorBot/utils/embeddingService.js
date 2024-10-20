import { OpenAI } from 'openai';
import { OPENAI_API_KEY } from '@env';
import instructorInnovators from '../assets/instructor_innovators.json';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Read and process the instructor_innovators.json file
function processTextFile() {
  try {
    const content = instructorInnovators.content;
    return [content]; // Return the entire content as a single section
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
}

// Generate embeddings for a given text
async function getEmbedding(text) {
  const response = await openai.embeddings.create({
    input: text,
    model: 'text-embedding-3-small'
  });
  return response.data[0].embedding;
}

// Generate embeddings for all sections
async function generateEmbeddings(sections) {
  const embeddedSections = [];
  for (const section of sections) {
    const chunks = splitTextIntoChunks(section);
    for (const chunk of chunks) {
      const embedding = await getEmbedding(chunk);
      embeddedSections.push({ text: chunk, embedding });
    }
  }
  return embeddedSections;
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

// Retrieve most relevant sections based on a query
async function retrieveRelevantSections(query, embeddedSections, topK = 3) {
  const queryEmbedding = await getEmbedding(query);
  const scoredSections = embeddedSections.map(section => ({
    ...section,
    score: cosineSimilarity(queryEmbedding, section.embedding)
  }));
  scoredSections.sort((a, b) => b.score - a.score);
  return scoredSections.slice(0, topK);
}

// Main function to set up the system
async function setupEmbeddingSystem() {
  console.log('Starting setupEmbeddingSystem');
  const sections = processTextFile();
  console.log(`Processed ${sections.length} sections from the file`);
  if (sections.length === 0) {
    console.error('No content loaded from file');
    return [];
  }
  console.log('Generating embeddings...');
  const embeddedSections = await generateEmbeddings(sections);
  console.log(`Generated embeddings: ${embeddedSections.length > 0 ? 'Yes' : 'No'}`);
  return embeddedSections;
}

// Split text into smaller chunks
function splitTextIntoChunks(text, maxTokens = 5000) {
  const words = text.split(' ');
  const chunks = [];
  let currentChunk = [];

  for (const word of words) {
    if (currentChunk.length + word.length + 1 > maxTokens) {
      chunks.push(currentChunk.join(' '));
      currentChunk = [];
    }
    currentChunk.push(word);
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(' '));
  }

  return chunks;
}

export { setupEmbeddingSystem, retrieveRelevantSections };
