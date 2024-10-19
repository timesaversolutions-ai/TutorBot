import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

// New color palette
const colors = {
  primary: '#028f12',
  primaryLight: '#04bf18',
  primaryDark: '#016b0d',
  background: '#f0fff1',
  text: '#333333',
  textLight: '#666666',
  border: '#c8e6c9',
};

export const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },

  // Message styles
  messageRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  botMessageRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: width * 0.7,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  userMessageBubble: {
    backgroundColor: colors.primary,
  },
  botMessageBubble: {
    backgroundColor: colors.border,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  botMessageText: {
    color: colors.text,
  },
  systemMessageText: {
    textAlign: 'center',
    color: '#8E8E93',
    fontSize: 14,
    marginVertical: 10,
  },

  // Input styles
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Navigation button styles
  navButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  navButtonText: {
    color: colors.primary,
    fontSize: 16,
  },

  // HomeScreen styles
  homeContainer: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    padding: 20,
    justifyContent: 'center',
  },
  homeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 10,
    textAlign: 'center',
    paddingTop: 20,
  },
  homeSubtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.textLight,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonGridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 500, // Adjust this value based on your preference
  },
  buttonContainer: {
    width: width * 0.4,
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonIcon: {
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    textAlign: 'center',
  },

  // LoginScreen styles
  loginInput: {
    borderColor: colors.border,
  },
  buttonOutline: {
    borderColor: colors.primary,
  },
  buttonOutlineText: {
    color: colors.primary,
  },

  // SettingsScreen styles
  signOutButton: {
    backgroundColor: colors.primaryDark,
  },
});

export { colors };
