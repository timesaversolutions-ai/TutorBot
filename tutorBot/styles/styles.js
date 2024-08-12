import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
  promptText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    padding: 10,
  },
});
