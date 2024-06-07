import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import _ from 'lodash';
import Geolocation from '@react-native-community/geolocation';
import haversine from 'haversine';
import { MapViewComponent } from '../component/mapViewComponent';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Home({ navigation }) {
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [timer, setTimer] = useState(0);
  const [distance, setDistance] = useState(0);
  const [previousLocation, setPreviousLocation] = useState(null);
  const [pathCoordinates, setPathCoordinates] = useState([]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message:
                'This app needs access to your location to track your runs.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        // console.log('Current position:', position);
        setCurrentLocation({ latitude, longitude });
        setPreviousLocation({ latitude, longitude });
      },
      error => console.log('Error getting current position:', error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 500);

      const watchID = Geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          // console.log('New position:', position);
          const newLocation = { latitude, longitude };

          if (previousLocation) {
            const dist = haversine(previousLocation, newLocation, {
              unit: 'meter',
            });
            setDistance(prevDistance => prevDistance + dist);
          }

          setPreviousLocation(newLocation);
          setCurrentLocation(newLocation);
          setPathCoordinates(prevPath => [...prevPath, newLocation]);
        },
        error => console.log('Error watching position:', error),
        { enableHighAccuracy: true, distanceFilter: 1 },
      );

      return () => {
        Geolocation.clearWatch(watchID);
        clearInterval(interval);
      };
    } else if (!isTracking && timer !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isTracking, timer, previousLocation]);

  const handleStart = () => {
    try {
      setIsTracking(true);
      setDistance(0); // Reset distance when starting a new run
      setTimer(0); // Reset timer when starting a new run
      setPathCoordinates([]); // Reset path coordinates when starting a new run
    } catch (error) {
      console.error("Error starting tracking:", error);
    }
  };

  const handleStop = () => {
    try {
      setIsTracking(false);
      navigation.navigate('summary', {
        time : timer,
        distance: (distance / 1000).toFixed(2),
      });
    } catch (error) {
      console.error("Error stopping tracking:", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapViewComponent
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: currentLocation ? currentLocation.latitude : 37.78825,
          longitude: currentLocation ? currentLocation.longitude : -122.4324,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        showsMyLocationButton={true}
        showsUserLocation={true}
        pathCoordinates={pathCoordinates}
      >
        {pathCoordinates.length > 0 && (
          <Polyline
            coordinates={pathCoordinates}
            strokeColor="#000"
            strokeWidth={6}
          />
        )}
      </MapViewComponent>
      {!isTracking && (
        <View style={styles.startButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.text}>Start</Text>
          </TouchableOpacity>
        </View>
      )}
      {isTracking && (
        <View style={styles.timerContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={styles.timerText}>Time: {timer}s</Text>
            <Text style={styles.timerText}>
              Dis: {(distance / 1000).toFixed(2)} km
            </Text>
          </View>
          <View style={styles.stopButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleStop}>
              <Text style={styles.text}>Stop</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
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
    position: 'absolute',
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
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
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
    color: "gray",
  },
  stopButtonContainer: {
    marginTop: 10,
  },
});
