import { useCallback } from 'react';
import { collection, addDoc, getDoc, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useConversation = () => {
  const saveConversation = useCallback(async (userId, chatHistory) => {
    try {
      const docRef = await addDoc(collection(db, 'conversations'), {
        userId,
        chatHistory: JSON.stringify(chatHistory),
        timestamp: new Date(),
      });
      console.log('Conversation saved with ID:', docRef.id);
      return { id: docRef.id };
    } catch (error) {
      console.error('Error saving conversation:', error);
      return null;
    }
  }, []);

  const loadConversation = useCallback(async (conversationId) => {
    try {
      const docRef = doc(db, 'conversations', conversationId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return JSON.parse(data.chatHistory);
      }
      return null;
    } catch (error) {
      console.error('Error loading conversation:', error);
      return null;
    }
  }, []);

  const getUserConversations = useCallback(async (userId) => {
    try {
      console.log('Fetching conversations for user:', userId);
      const conversationsRef = collection(db, 'conversations');
      const q = query(
        conversationsRef,
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
  }, []);

  const updateConversationHistory = useCallback(async (conversationId, chatHistory) => {
    try {
      const conversationRef = doc(db, 'conversations', conversationId);
      await updateDoc(conversationRef, { 
        chatHistory: JSON.stringify(chatHistory),
        timestamp: new Date()
      });
      console.log('Conversation updated:', conversationId);
      return true;
    } catch (error) {
      console.error('Error updating conversation:', error);
      return false;
    }
  }, []);

  const removeConversation = useCallback(async (conversationId) => {
    try {
      const conversationRef = doc(db, 'conversations', conversationId);
      await deleteDoc(conversationRef);
      console.log('Conversation deleted:', conversationId);
      return true;
    } catch (error) {
      console.error('Error deleting conversation:', error);
      return false;
    }
  }, []);

  return { 
    saveConversation, 
    loadConversation, 
    getUserConversations, 
    updateConversationHistory, 
    removeConversation 
  };
};