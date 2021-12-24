import React, { useState } from "react";
import axios from "axios";
import config from "../../config.json";

function CustomModal(props) {
  const [name, setName] = useState(props.activePlace.name);
  const [country, setCountry] = useState(props.activePlace.country);
  const [lat, setLat] = useState(props.activePlace.lat);
  const [long, setLong] = useState(props.activePlace.long);
  const [toggle, setToggle] = useState(props.isOpen);

  const postData = (props) => {
    const place = {
      ...props.activePlace,
      name: name,
      country: country,
      lat: lat,
      long: long,
    };

    if (typeof place === "undefined" || typeof place.id === "undefined") {
      axios.post(config.url + "places/", place);
      return;
    }
    axios.put(`${config.url}palces/${place.id}/`, place);
    setToggle(false);
  };

  return (
    <section
      className={`modal-section ${toggle ? "" : "invisible"}`}
      id="popup-modal"
    >
      <div className="modal-container">
        <div className="modal-header">
          <h1 className="modal-header-h1">Add place</h1>
          <p className="modal-label">
            Create new place in database - you have to enter it manually, but
            fetching data from maps API is on TODO list :)
          </p>
        </div>

        <div className="modal-full-row">
          <div className="modal-label-input">
            <label htmlFor="name" className="modal-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="modal-input"
            />
          </div>
          <div className="modal-label-input">
            <label htmlFor="name" className="modal-label">
              Country
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setCountry(e.target.value)}
              className="modal-input"
            />
          </div>
        </div>

        <div className="modal-full-row ">
          <div className="modal-label-input">
            <label htmlFor="name" className="modal-label">
              Map
            </label>
            <iframe
              className="modal-input h-800%" // absolute inset-0"
              frameBorder="0"
              title="map"
              scrolling="no"
              src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=wmii+krakow&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
              onChange={(e) => setCountry(e.target.value)}
            ></iframe>
          </div>
        </div>

        <div className="modal-full-row">
          <div className="modal-label-input">
            <label htmlFor="name" className="modal-label">
              Coordinates
            </label>
            <input
              type="number"
              id="lat"
              name="lat"
              placeholder="Lat"
              onChange={(e) => setLat(e.target.value)}
              className="modal-input"
            />
            <input
              type="number"
              id="long"
              name="long"
              placeholder="Long"
              onChange={(e) => setLong(e.target.value)}
              className="modal-input my-2"
            />
          </div>
        </div>
        <div className="modal-full-row my-6">
          <button className="modal-cancel" onClick={(e) => setToggle(false)}>
            Cancel
          </button>
          <button className="modal-save" onClick={postData}>
            Save
          </button>
        </div>
      </div>
    </section>
  );
}

export default CustomModal;
