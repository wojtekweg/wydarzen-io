import React, { useState } from "react";
import axios from "axios";

function CustomModal(props) {
  const [name, setName] = useState(props.activePlace.name);
  const [country, setCountry] = useState(props.activePlace.country);
  const [lat, setLat] = useState(props.activePlace.lat);
  const [long, setLong] = useState(props.activePlace.long);

  const postData = () => {
    const place = {
      ...props.activePlace,
      name: name,
      country: country,
      lat: lat,
      long: long,
    };

    // TODO is below logic is good? shouldnt there be another check?

    // TODO recheck if backend sends place id

    console.log(place);

    if (typeof place === "undefined" || typeof place.id === "undefined") {
      axios.post("http://localhost:8000/api/places/", place);
      return;
    }
    axios.put(`http://localhost:8000/api/palces/${place.id}/`, place);
  };

  return (
    <section className="modal-section">
      <div className="modal-container mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-full md:w-full rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            frameBorder="0"
            title="map"
            marginHeight="0"
            marginWidth="0"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=wmii+krakow&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
            onChange={(e) => setCountry(e.target.value)}
          ></iframe>
        </div>
        <div className="modal-header">
          <h1 className="modal-header-h1">Add place</h1>
          <p className="modal-label">
            Create new place in database - you have to enter it manually, but
            fetching data from maps API is on TODO list :)
          </p>
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
          <button className="modal-save my-6" onClick={postData}>
            Save
          </button>
        </div>
      </div>
    </section>
  );
}

export default CustomModal;
