import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../Hooks/useUrlPosition.jsx";
import { useGeolocation } from "../Hooks/useGeoLocation.jsx";
import styles from "./Form.module.css";
import Button from "./Button.jsx";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export const flagemojiToPNG = (flag) => {
  const countryFlag = flag.toLowerCase();

  return (
    <img src={`https://flagcdn.com/24x18/${countryFlag}.png`} alt="flag" />
  );
};

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoCodingError, setGeoCodingError] = useState();
  const [isLoadingGeoCoding, setisLoadingGeoCoding] = useState(false);
  const Navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const {
    getPosition,
    position: geoLocationPosition,
    isLoading: isLoadingPosition,
  } = useGeolocation();
  const BASE_URL = `https://us1.locationiq.com/v1/reverse`;
  const KEY = `pk.2bf696fa0a45178ca8c02d2f76d4e244`;

  useEffect(
    function () {
      async function fetchData() {
        try {
          if (!lat && !lng) return;
          setisLoadingGeoCoding(true);
          setGeoCodingError("");
          const res = await fetch(
            `${BASE_URL}?key=${KEY}&lat=${lat}&lon=${lng}&format=json`
          );
          const data = await res.json();
          console.log(data, "cityData");

          if (!data.address.country_code) throw new Error();

          setCityName(data.address.village || data.address.town);
          setCountry(data.address.country);
          setEmoji(flagemojiToPNG(data.address.country_code));
          console.log(emoji);
        } catch (error) {
          setGeoCodingError(
            "That doesn't seem to be a city click somewhere else"
          );
        } finally {
          setisLoadingGeoCoding(false);
        }
      }
      fetchData();
    },
    [lat, lng]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date || !position) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    console.log(newCity);
  }

  if (isLoadingGeoCoding) return <Spinner />;
  if (!lat && !lng)
    return <Message message="Start by Clicking Somewhere in the Map" />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd / MM / yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={(e) => {}}>
          Add
        </Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            Navigate(-1);
          }}
        >
          &larr; back
        </Button>
      </div>
    </form>
  );
}

export default Form;
