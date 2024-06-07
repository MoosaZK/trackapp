import React, { useState, useEffect } from 'react';
import { Button, Image, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useProfileContext } from '../context/profilecontext';

const Profile = ({ navigation }) => {
  const { profileData, updateProfileData } = useProfileContext();
  const [firstName, setFirstName] = useState(profileData?.firstName || '');
  const [lastName, setLastName] = useState(profileData?.lastName || '');

  useEffect(() => {
    setFirstName(profileData.firstName);
    setLastName(profileData.lastName);
  }, [profileData]);

  const saveProfile = () => {
    updateProfileData({ firstName, lastName });
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TakePicture');
        }}
        style={styles.pictureContainer}>
        {profileData.picture ? (
          <Image
            source={{ uri: 'data:image/png;base64,' + profileData.picture }}
            resizeMode="cover"  // Changed to cover for zoom-in effect
            style={styles.profilePicture}
          />
        ) : (
          <Text style={styles.noPictureText}>No profile picture, tap to add one.</Text>
        )}
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <Button title="Save" onPress={saveProfile} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pictureContainer: {
    padding: 16,
    alignSelf: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    height: 200,  // Increased size for bigger picture
    width: 200,
    borderRadius: 100,  // Ensuring it's still circular
    overflow: 'hidden',
  },
  noPictureText: {
    color: 'black',  // Black color for no picture text
    textAlign: 'center',
    marginTop: 80,
  },
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: 'black',  // Black color for label text
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 4,
    color: 'black',  // Black color for input text
  },
});

export default Profile;
