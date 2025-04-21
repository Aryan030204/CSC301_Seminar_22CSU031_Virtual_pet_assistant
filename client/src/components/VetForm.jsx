import { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import wall2 from "../assets/wall2.png";
import NearbyDocs from "./NearbyDocs";

const VetForm = () => {
  const [location, setLocation] = useState("");
  const [locationPermission, setLocationPermission] = useState(false);
  const [description, setDescription] = useState("");
  const [timePreference, setTimePreference] = useState("anytime");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showdocs, setShowDocs] = useState(false);

  useEffect(() => {
    if (locationPermission) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation(`${latitude}, ${longitude}`);
          },
          (error) => {
            console.error("Error getting location:", error);
            alert("Failed to get location.");
          }
        );
      }
    }
  }, [locationPermission]);

  const handleLocationSearch = (e) => {
    const query = e.target.value;
    setLocation(query);
    if (!query.trim()) return;

    setLoadingSuggestions(true);

    const allLocations = [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
    ];
    const suggestions = allLocations.filter((place) =>
      place.toLowerCase().includes(query.toLowerCase())
    );

    setLocationSuggestions(suggestions);
    setLoadingSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDocs(true);
    console.log({
      location,
      description,
      timePreference,
    });
  };

  return (
    <div className="flex w-full justify-evenly">
      <div className="flex w-full h-full absolute bottom-0 opacity-40">
        <img src={wall2} className="absolute z-0 w-full sm:h-[80rem]" />
      </div>
      <div className="flex flex-col items-center gap-[1rem] p-10 lg:flex-row">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 relative z-1 items-center p-6 bg-gray-200 rounded-lg shadow-2xl shadow-black"
        >
          <h2 className="text-xl font-bold mb-4">
            Find Nearby Doctors for Your Pet
          </h2>

          {/* Location */}
          <div className="flex items-center gap-4 mb-4">
            <input
              type="radio"
              id="detectLocation"
              name="locationOption"
              value="detectLocation"
              checked={locationPermission}
              onChange={() => setLocationPermission(!locationPermission)}
            />
            <label htmlFor="detectLocation">Detect My Location</label>
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              required
              value={location}
              onChange={handleLocationSearch}
              disabled={locationPermission}
              list="location-suggestions"
            />
            <datalist id="location-suggestions">
              {locationSuggestions.map((suggestion, index) => (
                <option key={index} value={suggestion}></option>
              ))}
            </datalist>
          </div>

          {/* Pet Condition */}
          <TextField
            label="Describe Your Pet's Condition"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4"
          />

          {/* Time Preference */}
          <FormControl fullWidth className="mb-4">
            <InputLabel>Preferred Time</InputLabel>
            <Select
              value={timePreference}
              onChange={(e) => setTimePreference(e.target.value)}
              label="Preferred Time"
            >
              <MenuItem value="morning">Morning</MenuItem>
              <MenuItem value="evening">Evening</MenuItem>
              <MenuItem value="anytime">Anytime</MenuItem>
            </Select>
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loadingSuggestions}
            className="mt-4"
          >
            {loadingSuggestions ? "Loading..." : "Track Nearby Doctors"}
          </Button>
        </form>
        {showdocs && <NearbyDocs />}
      </div>
    </div>
  );
};

export default VetForm;
