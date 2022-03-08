import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";

export default function SingleComic() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [Comic, setComic] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    async function getComic() {
      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/comics/${id}${process.env.REACT_APP_COMICSS_API_KEY}`
        );

        const comic = await response.json();
        if (comic.data.results) {
          const newComic = comic.data.results;
          setComic(newComic);
          console.log(newComic);
        } else {
          setComic(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getComic();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (!Comic) {
    return <h2 className="section-title">no Comic to display</h2>;
  } else {
    const { title, images, dates, pageCount, prices, format, urls } = Comic[0];
    return (
      <section className="section Comic-section">
        <h2 className="section-title">{title}</h2>
        <div className="Comics">
          <img
            src={`${images[0].path}/standard_xlarge.${images[0].extension}`}
            alt="hello"
          ></img>
          <div className="Comics-info">
            <p>
              <span className="Comics-data">price:</span>${prices[0].price}
            </p>
            <p>
              <span className="Comics-data">on sale date:</span>
              {dates[1].date.slice(0, 10)}
            </p>
            <p>
              <span className="Comics-data">page count:</span>
              {pageCount}
            </p>
            <p>
              <span className="Comics-data">format:</span>
              {format}
            </p>
            <p>
              <span className="Comics-data">
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
