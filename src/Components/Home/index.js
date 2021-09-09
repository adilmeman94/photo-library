import React, { useEffect, useState } from "react";
import "./styles.css";
import Popup from "reactjs-popup";
import { Waypoint } from "react-waypoint";

const Home = (props) => {
  const [List, setList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [Link, setLink] = useState("");
  const [page, setPage] = useState(1);
  const { data, setNavPage, loader1, navPage } = props;

  const getUrl = (value) => {
    setLink(value);
  };

  async function getPhotos(pageN) {
    setLoader(true);
    const response = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=5127f7d8a85c7814a0527954d1b41397&per_page=20&page=${pageN}&format=json&nojsoncallback=1`
    );
    const photoList = await response.json();
    const photos = photoList?.photos?.photo || [];
    setList((List) => [...List, ...photos]);
    setLoader(false);
  }

  useEffect(() => {
    if (data.length === 0) {
      getPhotos(page);
    }
  }, [page]);

  useEffect(() => {
    if (data.length > 0) {
      setList(data);
    }
  }, [data]);

  const loadMoreData = () => {
    if (data.length === 0) {
      setPage(page + 1);
    } else {
      setNavPage(navPage + 1);
    }
  };

  return (
    <div className="d-flex flex-wrap conatiner1">
      {List
        ? List.map((item, url) => (
            <div key={item.id}>
              <div style={{ display: "none" }}>
                {
                  (url = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`)
                }
              </div>

              <div className="p-2 border" onClick={() => setOpen((o) => !o)}>
                <img
                  style={{ height: "250px", width: "300px" }}
                  src={url}
                  alt="img"
                  s
                  onClick={() => getUrl(url)}
                />
                {/* closeOnDocumentClick onClose={closeModal} */}
                <Popup open={open}>
                  <div className="popup" onClick={closeModal}>
                    x
                  </div>
                  <img
                    className="col-lg-8 md-10 sm-12"
                    style={{ height: "300px", width: "350px" }}
                    src={Link}
                    alt="img"
                  />
                </Popup>
              </div>
            </div>
          ))
        : ""}
      <Waypoint onEnter={loadMoreData}>
        {loader || loader1 ? (
          <div className="spinner">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          ""
        )}
      </Waypoint>
    </div>
  );
};

export default Home;
