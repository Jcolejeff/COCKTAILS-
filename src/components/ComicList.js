import React from "react";
import Comic from "./Comic";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

export default function ComicList() {
  const { Comics, loading } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  if (Comics.length < 1) {
    return (
      <h2 className="section-title">no comics matched your search criteria</h2>
    );
  }
  return (
    <section className="section">
      <h2 className="section-title">COMICS</h2>
      <div className="Comics-center">
        {Comics.map((item) => {
          return <Comic key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
}
