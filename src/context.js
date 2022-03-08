import React, { useState, useContext, useEffect } from "react";

const url = "https://gateway.marvel.com/v1/public/comics?title=";
const others = `${process.env.REACT_APP_COMIC_API_KEY}`;
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
