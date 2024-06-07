import { Image, StyleSheet, View } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../images/splashlogo.png')} style={styles.image}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d2752",
  },
  image:{
    width:200,
    height:200,
    resizeMode:'cover',
  }
});
