import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContexts = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});

  //console.log(cities, "lets go city");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Error with Data Fetching ");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("Error with Data Fetching ");
    } finally {
      setIsLoading(false);
    }
  }

  async function CreateCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        header: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } catch {
      alert("Error with Data Fetching ");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContexts.Provider
      value={{ cities, isLoading, currentCity, getCity, CreateCity }}
    >
      {children}
    </CitiesContexts.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContexts);
  if (context === undefined)
    throw new Error(
      "This is used outside the citiesProvider, kindly rectify your error"
    );
  return context;
}

export { CitiesProvider, useCities };
