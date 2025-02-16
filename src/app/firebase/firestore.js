// src/app/firebase/firestore.js
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { app } from './firebase'; // Import the Firebase app instance

// Initialize Firestore
const db = getFirestore(app);

// Save a conversation to Firestore
export const saveConversationToFirestore = async (conversation) => {
  try {
    await addDoc(collection(db, 'conversations'), {
      ...conversation,
      timestamp: new Date(),
    });
    console.log('Conversation saved to Firestore');
  } catch (error) {
    console.error('Error saving conversation:', error);
  }
};

// Load conversations from Firestore
export const loadConversationsFromFirestore = async () => {
  try {
    const q = query(collection(db, 'conversations'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const conversations = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return conversations;
  } catch (error) {
    console.error('Error loading conversations:', error);
    return [];
  }
};

export { db, collection, addDoc, getDocs };