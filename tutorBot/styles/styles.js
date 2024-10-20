import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

// New color palette
const colors = {
  primary: '#028f12',        // Main green color
  primaryLight: '#4caf50',   // Lighter green for highlights
  primaryDark: '#1b5e20',    // Darker green for contrast
  secondary: '#005700',      // Amber for accents and calls-to-action
  background: '#F2F2F7',     // Light grey-tinted background
  surface: '#ffffff',        // White for cards and elevated surfaces
  text: '#212121',           // Dark grey for primary text
  textLight: '#757575',      // Medium grey for secondary text
  border: '#bdbdbd',         // Light grey for borders
  error: '#d32f2f',          // Red for error states
  tabIconActive: '#2E8B57',   // Same as your primary color for consistency
  tabIconInactive: '#FFB6C1', // A muted blue-grey color for inactive icons
};

export const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
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
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.border,
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
    backgroundColor: colors.textLight,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
  settingsContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  settingsSection: {
    marginBottom: 20,
    backgroundColor: colors.surface,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingsButtonText: {
    marginLeft: 15,
    fontSize: 16,
    color: colors.text,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: colors.surface,
  },
  signOutButtonText: {
    marginLeft: 15,
    fontSize: 16,
    color: colors.error,
    fontWeight: 'bold',
  },

  // ConversationListScreen styles
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    marginVertical: 20,
  },
  conversationList: {
    paddingHorizontal: 15,
  },
  conversationItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  conversationItem: {
    flex: 1,
    padding: 15,
  },
  conversationItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversationItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  conversationItemDate: {
    fontSize: 14,
    color: colors.textLight,
  },
  removeIcon: {
    padding: 15,
  },
  loadingText: {
    fontSize: 18,
    color: colors.textLight,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    textAlign: 'center',
  },
  noConversationsText: {
    fontSize: 18,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 20,
  },
  messageCount: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 10,
  },
  markdownContainer: {
    flex: 1,
  },
  markdownText: {
    color: colors.text,
    fontSize: 16,
  },
  markdownCode: {
    fontFamily: 'monospace',
    backgroundColor: colors.border,
    padding: 5,
    borderRadius: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.text,
  },
});

export { colors };
