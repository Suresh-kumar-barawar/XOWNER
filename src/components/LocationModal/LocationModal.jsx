import { useState, useEffect } from 'react';
import { FiMapPin, FiX, FiSearch, FiNavigation } from 'react-icons/fi';

const LocationModal = ({ isOpen, onClose, currentLocation, onLocationChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const searchCities = async (query) => {
    if (!query || query.length < 2) {
      setCities([]);
      return;
    }
    
    setLoading(true);
    try {
      // Use OpenStreetMap Nominatim API for Indian cities
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(query)}&limit=20&addressdetails=1`
      );
      
      if (response.ok) {
        const data = await response.json();
        const filteredCities = data
          .filter(item => item.address && (item.address.city || item.address.town || item.address.village))
          .map(item => ({
            name: item.address.city || item.address.town || item.address.village || item.display_name.split(',')[0],
            state: item.address.state || ''
          }))
          .filter(city => 
            city.name.toLowerCase().includes(query.toLowerCase()) ||
            city.state.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 20);
        setCities(filteredCities);
      } else {
        setCities([]);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchCities(searchTerm);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleLocationSelect = (city) => {
    onLocationChange({ city: city.name, state: city.state });
    onClose();
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            onLocationChange({
              city: data.city || data.locality || 'Unknown',
              state: data.principalSubdivision || ''
            });
            onClose();
          } catch (error) {
            console.error('Error fetching location:', error);
          }
        }
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative z-10">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Change Location</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
        </div>
        
        <div className="p-4">
          {/* Current Location */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FiMapPin className="text-blue-600" size={16} />
                <div>
                  <p className="text-sm font-medium text-gray-900">Current Location</p>
                  <p className="text-sm text-gray-600">
                    {currentLocation.city}{currentLocation.state ? `, ${currentLocation.state}` : ''}
                  </p>
                </div>
              </div>
              <button
                onClick={handleUseCurrentLocation}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
              >
                <FiNavigation size={14} />
                <span>Detect</span>
              </button>
            </div>
          </div>

          <div className="relative mb-4">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search for a city or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {loading && (
              <div className="text-center py-4 text-gray-500">Searching...</div>
            )}
            
            {!loading && cities.map((city, index) => (
              <button
                key={`${city.name}-${index}`}
                onClick={() => handleLocationSelect(city)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center space-x-2"
              >
                <FiMapPin className="text-blue-600" size={14} />
                <span className="text-gray-700">
                  <span className="font-medium">{city.name}</span>
                  {city.state && <span className="text-gray-500">, {city.state}</span>}
                </span>
              </button>
            ))}
            
            {!loading && cities.length === 0 && searchTerm && (
              <p className="text-gray-500 text-center py-4">No cities found</p>
            )}
            
            {!searchTerm && (
              <p className="text-gray-500 text-center py-4">Start typing to search cities</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;