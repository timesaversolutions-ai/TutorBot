import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eceff1",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  promptText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonContainer: {
    width: '45%', // Adjusted to fit two buttons in a row with spacing
    aspectRatio: 1, // Makes the button a square
    backgroundColor: '#f0f0f0', // Default background color (change as needed)
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5, // Space between buttons
    borderRadius: 10, // Optional: Rounded corners
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10, // Space between text and the placeholder for the icon
  },
  iconPlaceholder: {
    width: 40, // Placeholder width (adjust as needed)
    height: 40, // Placeholder height (adjust as needed)
    backgroundColor: '#ddd', // Placeholder color (can be changed)
    borderRadius: 15, // Optional: make it a circle
    marginTop: 5, // Space between text and icon
  },
  icon: {
    marginTop: 5, // Space between text and icon
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  chatContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
    width: '100%', // This makes the input full width of its container
  },
  userText: {
    alignSelf: "flex-end",
    backgroundColor: "#ddf",
    padding: 5,
    marginVertical: 2,
    borderRadius: 5,
  },
  botText: {
    alignSelf: "flex-start",
    backgroundColor: "#fdd",
    padding: 5,
    marginVertical: 2,
    borderRadius: 5,
  },
  responseText: {
    marginTop: 10,
    color: "blue",
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    padding: 10,
  },
  loginInput: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 5,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {
    marginTop: 5,
    backgroundColor: '#dedede',
    borderRadius: 40,
  },
  button: {
    width: '100%', // Make buttons full width
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5, // Add vertical spacing between buttons
  },
  loginButtonContainer: {
    width: '100%', // Ensure the button container is full width
    marginTop: 10, // Add some space above the buttons
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6347', // Tomato color, you can change this
    padding: 10,
    borderRadius: 5,
  },
  signOutText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  conversationItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  conversationItem: {
    flex: 1,
    padding: 10,
  },
  removeIcon: {
    padding: 5,
  },
});
