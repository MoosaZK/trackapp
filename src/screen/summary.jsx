import { SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export default function SummaryScreen({route}) {
  const {time, distance} = route.params;
  const navigation = useNavigation();
  const handleSubmit = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      <View style={{padding: 20}}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
            Run Summary
          </Text>
        </View>
        <Text style={styles.subheadingtext}>Time:</Text>
        <Text style={styles.text}>{time} sec</Text>
        <Text style={styles.subheadingtext}>Distance:</Text>
        <Text style={styles.text}>{distance} km</Text>
        <Text style={styles.subheadingtext}>Avg Speed:</Text>
        <Text style={styles.text}>
          {(distance / (time / 60)).toFixed(2)} km/min
        </Text>
      </View>
      <View style={styles.startButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.gobacktext}>Great Run</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  startButtonContainer: {
    marginTop: 100,
    marginHorizontal: 'auto',
    bottom: 50,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  subheadingtext: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 20,
  },
  gobacktext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    padding: 10,
  },
  timerContainer: {
    position: 'absolute',
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 10,
  },
  timerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
  },
  stopButtonContainer: {
    marginTop: 10,
  },
});
