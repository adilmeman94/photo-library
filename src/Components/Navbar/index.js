import React, { useState, useEffect } from "react";
import "./styles.css";

const Navbar = (props) => {
  const [text, setText] = useState("");
  const [otherText, setOtherText] = useState("");
  const { navPage, setNavPage, setData, setLoader } = props;

  async function searchPhotos(e, value, navPage1) {
    if (e === null) {
    } else {
      e.preventDefault();
    }
    if (value !== otherText) {
      setData([]);
      setNavPage(1);
      window.scrollTo(0, 0);
    }
    setLoader(true);
    const response = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5127f7d8a85c7814a0527954d1b41397&text=${value}&per_page=20&page=${navPage1}&format=json&nojsoncallback=1`
    );
    const photoList = await response.json();
    const photos = photoList?.photos?.photo || [];
    setData((data) => [...data, ...photos]);
    setOtherText(value);
    setLoader(false);
  }

  useEffect(() => {
    if (navPage > 1) {
      searchPhotos(null, text, navPage);
    }
  }, [navPage]);

  return (
    <nav className="navbar sticky-top navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand light nav123">Search Photos</div>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="btn btn-success"
            type="submit"
            onClick={(e) => searchPhotos(e, text, navPage)}
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
