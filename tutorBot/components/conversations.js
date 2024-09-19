import { db } from '../firebase'; // Firebase Firestore setup
import { collection, addDoc, getDoc, getDocs, query, where, orderBy, doc } from 'firebase/firestore';

// Create a new conversation
export const addConversation = async (userId, chatHistory) => {
  try {
    const docRef = await addDoc(collection(db, 'conversations'), {
      userId,
      chatHistory: JSON.stringify(chatHistory),
      timestamp: new Date(),
    });
    return { id: docRef.id };
  } catch (error) {
    console.error('Error adding conversation:', error);
    return null;
  }
};

// Get conversations for a user
export const getUserConversations = async (userId) => {
  try {
    const q = query(
      collection(db, 'conversations'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const conversations = [];
    querySnapshot.forEach((doc) => {
      conversations.push({ id: doc.id, ...doc.data() });
    });
    return conversations;
  } catch (error) {
    console.error('Error fetching user conversations:', error);
    return [];
  }
};

// Get a single conversation
export const getConversation = async (conversationId) => {
  try {
    const docRef = doc(db, 'conversations', conversationId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return { id: docSnap.id, ...data, chatHistory: JSON.parse(data.chatHistory) };
    } else {
      console.log('No such conversation!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return null;
  }
};

// Update a conversation
export const updateConversation = async (conversationId, chatHistory) => {
  try {
    const conversationRef = doc(db, 'conversations', conversationId);
    await updateDoc(conversationRef, { 
      chatHistory: JSON.stringify(chatHistory),
      timestamp: new Date() // Update timestamp to reflect the latest change
    });
    return true;
  } catch (error) {
    console.error('Error updating conversation:', error);
    return false;
  }
};

// Delete a conversation
export const deleteConversation = async (conversationId) => {
  try {
    const conversationRef = doc(db, 'conversations', conversationId);
    await deleteDoc(conversationRef);
    return true;
  } catch (error) {
    console.error('Error deleting conversation:', error);
    return false;
  }
};