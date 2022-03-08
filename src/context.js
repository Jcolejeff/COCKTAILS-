import React, { useState, useContext, useEffect } from "react";

const url = "https://gateway.marvel.com/v1/public/comics?title=";
const others = `&limit=15&ts=987654321&apikey=16f5ce711c60cf13df8dc66c68c033e5&hash=668a57c5b77fd36a3b598d7efe175c8c`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("deadpool");
  const [Comics, setComics] = useState([]);

  const fetchComics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}${others}`);
      const comics = await response.json();
      console.log(comics);
      const { data } = comics;
      if (data.results) {
        const newComics = data.results;
        setComics(newComics);
      } else {
        setComics([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchComics();
    // eslint-disable-next-line
  }, [searchTerm]);
  return (
    <AppContext.Provider value={{ loading, Comics, searchTerm, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};
// hook that returns our store
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
