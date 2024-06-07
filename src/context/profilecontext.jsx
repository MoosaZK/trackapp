import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const ProfileContext = createContext(null);
const useProfileContext = () => useContext(ProfileContext);

const ProfileContextProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    picture: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await AsyncStorage.getItem('profile');
        if (data) {
          setProfileData(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error fetching profile data from AsyncStorage:', error);
      }
    };

    fetchProfileData();
  }, []);

  const updateProfileData = async (data) => {
    const updatedData = { ...profileData, ...data };
    setProfileData(updatedData);
    try {
      await AsyncStorage.setItem('profile', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error setting profile data to AsyncStorage:', error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContextProvider, useProfileContext };
