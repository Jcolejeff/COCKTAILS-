import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";

export default function SingleCocktail() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/comics/${id}?ts=9876543210&apikey=16f5ce711c60cf13df8dc66c68c033e5&hash=594299813a04d5c4df98979f511c5d1f`
        );
        const comic = await response.json();
        if (comic.data.results) {
          const newCocktail = comic.data.results;
          setCocktail(newCocktail);
          console.log(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCocktail();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  } else {
    const { title, images, dates, pageCount, prices, format, urls } =
      cocktail[0];
    return (
      <section className="section cocktail-section">
        <h2 className="section-title">{title}</h2>
        <div className="drink">
          <img
            src={`${images[0].path}/standard_xlarge.${images[0].extension}`}
            alt="hello"
          ></img>
          <div className="drink-info">
            <p>
              <span className="drink-data">price:</span>${prices[0].price}
            </p>
            <p>
              <span className="drink-data">on sale date:</span>
              {dates[1].date.slice(0, 10)}
            </p>
            <p>
              <span className="drink-data">page count:</span>
              {pageCount}
            </p>
            <p>
              <span className="drink-data">format:</span>
              {format}
            </p>
            <p>
              <span className="drink-data">
                <a href={urls[0].url} target="_blank">
                  More details!!
                </a>
              </span>
            </p>
          </div>
        </div>
        <Link to="/" className="btn btn-primary">
          back home
        </Link>
      </section>
    );
  }
}
