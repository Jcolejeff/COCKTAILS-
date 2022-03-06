import React from "react";
import { Link } from "react-router-dom";
export default function Comic({ images, name, id, title }) {
  return (
    <article className="Comic">
      <Link to={`/Comic/${id}`}>
        <div className="img-container">
          <img
            src={`${images[0].path}/standard_xlarge.${images[0].extension}`}
            alt={name}
          />
        </div>
        <div className="Comic-footer">
          <h3>{title}</h3>
          <Link to={`/Comic/${id}`} className="btn btn-primary btn-details">
            details
          </Link>
        </div>
      </Link>
    </article>
  );
}
