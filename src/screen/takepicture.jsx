import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useProfileContext } from '../context/profilecontext';

const TakePicture = () => {
  const navigation = useNavigation();
  const { updateProfileData } = useProfileContext();
  const [profileImage, setProfileImage] = useState('');

  const takePicture = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      saveToPhotos: true, // Optional: Save the photo to the device's photo gallery
    };

    launchCamera(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', `ImagePicker Error: ${response.errorMessage}`);
      } else if (response.assets && response.assets.length > 0) {
        const photo = response.assets[0];
        if (photo.base64) {
          try {
            await AsyncStorage.setItem('userImage', photo.base64);
            updateProfileData({ picture: photo.base64 });
            setProfileImage(photo.base64);
            navigation.goBack();
          } catch (error) {
            console.error('Failed to save image to AsyncStorage:', error);
            Alert.alert('Error', 'Failed to save image.');
          }
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraPlaceholder}>
        <Image source={require('../images/add_a_photo_48dp.png')} style={{ height: 100, width: 100 }} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={{ fontSize: 14, color: 'black' }}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default TakePicture;
