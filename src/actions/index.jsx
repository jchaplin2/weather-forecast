import axios from 'axios';

const WEATHER_API_KEY = 'ebdf7693b8212976a3017b9638488edc';
const LOCATION_API_KEY = 'AIzaSyBgH6ZLz9Pyrq2emfnGeFppvMWgL9KYuVM';


const DARK_SKY_PROXY = 'https://cors-anywhere.herokuapp.com/';
//work around for dak sky CORS issue with darksky.

const ROOT_WEATHER_URL = `https://api.darksky.net/forecast/${WEATHER_API_KEY}/`;
const ROOT_LOCATION_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${LOCATION_API_KEY}&components=`;

//local mock responses
// const ROOT_WEATHER_URL = 'http://localhost:4000/weather?q=';
// const ROOT_LOCATION_URL = 'http://localhost:4000/location?components=';

export const FETCH_WEATHER = 'FETCH_WEATHER';

export async function fetchWeatherData (location) {
    const {latitude, longitude} = await fetchLocationData(location);
    const url = DARK_SKY_PROXY + ROOT_WEATHER_URL + latitude + "," + longitude;
    const {data} = await axios.get(url);

    console.log(data);
	return {
		type: FETCH_WEATHER,
		payload: data
	};
};

async function fetchLocationData (location) {
    const locationArray = location.split(",");
    const [town, state] = locationArray;
    const url = ROOT_LOCATION_URL + "locality:"+town+"|administrative_area_level_1:"+state;
    const response = await axios.get(url);

    const{ lat, lng } = response.data.results[0].geometry.location;
    console.log(lat, lng);

	return {
        latitude : lat,
        longitude: lng
	};
};