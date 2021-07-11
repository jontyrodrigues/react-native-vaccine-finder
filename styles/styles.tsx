import { Dimensions, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor: "white",
    },
    item: {
      padding: 10,
      marginVertical: 0,
      marginHorizontal: 5,
      backgroundColor: 'white',
      borderBottomColor: "#a8a8a8",
      borderBottomWidth: 2,
      borderRadius: 2,
    },
    title: {
      fontSize: 20,
      color: "#002060",
    },
    vaccine: {
      fontSize: 16,
    },
    dropdown: {
      backgroundColor: 'gray',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      marginTop: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  picker: {
  minHeight : "5%",
  color: "black",
  },
  text: {
    fontSize: 17,
    color: "#002060",
    fontWeight: "900",
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 5,
    width: "97%",
    marginLeft: 3,
  },
  switchText: {
    fontSize: 16,
  },
  flexbox:{
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center",
  },
  dose:{
    fontSize: 15,
    fontWeight: "800",
    color : "black",
    borderRadius: 15,
  },
  input: {
    minHeight: "50%",
    borderWidth: 1,
    padding: 10,
    marginLeft: 5,
    width: "97%", 
    flex: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2,
  },
  });