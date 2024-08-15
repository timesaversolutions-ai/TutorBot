import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    textAlign: 'center',
  },
  chatContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
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
});
