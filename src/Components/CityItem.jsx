import Styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContexts";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city, key }) {
  const { currentCity, DeleteCity } = useCities();

  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  const { cityName, emoji, date, id, position } = city;
  console.log(position, "position value in cityitem");
  console.log(city);

  function deleteHnadle(e) {
    e.preventDefault();
    DeleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${Styles.cityItem} ${
          id === currentCity.id ? Styles["cityItem--active"] : ""
        } `}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={Styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={Styles.name}>{cityName}</h3>
        <time className={Styles.date}>{formatDate(date)}</time>
        <button className={Styles.deleteBtn} onClick={deleteHnadle}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
