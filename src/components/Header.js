import { Image, StyleSheet, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 120,
    backgroundColor: "#3C3C3B",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 90,
    width: 125,
  },
});

export default Header;
