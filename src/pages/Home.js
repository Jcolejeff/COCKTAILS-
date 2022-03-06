import React from "react";
import ComicList from "../components/ComicList";
import SearchForm from "../components/SearchForm";
export default function Home() {
  return (
    <main>
      <SearchForm />
      <ComicList />
    </main>
  );
}
