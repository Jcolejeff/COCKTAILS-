import React, { useState, useContext, useEffect } from "react";

const url = "https://gateway.marvel.com/v1/public/comics?title=";
const others =
  "&limit=15&ts=987654321&apikey=16f5ce711c60cf13df8dc66c68c033e5&hash=668a57c5b77fd36a3b598d7efe175c8c";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("deadpool");
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}${others}`);
      const comics = await response.json();
      console.log(comics);
      const { data } = comics;
      if (data.results) {
        const newCocktails = data.results;
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDrinks();
    // eslint-disable-next-line
  }, [searchTerm]);
  return (
    <AppContext.Provider
      value={{ loading, cocktails, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
