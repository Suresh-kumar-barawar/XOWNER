import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState({ city: 'India', state: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          setLocation({
            city: data.city || data.locality || 'Unknown',
            state: data.principalSubdivision || ''
          });
        } catch (error) {
          console.error('Error fetching location:', error);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
      }
    );
  }, []);

  return { location, loading, setLocation };
};

export default useGeolocation;