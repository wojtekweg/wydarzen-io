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
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2  rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
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
        <div className="lg:w-1/3 md:w-1/2  flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 className=" text-lg mb-1 font-medium title-font">Add place</h2>
          <p className="leading-relaxed mb-5 ">
            Create new place in database - you have to enter it manually, but
            fetching data from maps API is on TODO list :)
          </p>
          <div className="relative mb-4">
            <label
              htmlFor="name"
              className="leading-7 text-sm dark:text-gray-200"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="input-map"
            />
          </div>

          <div className="relative mb-4">
            <label
              htmlFor="name"
              className="leading-7 text-sm text-gray-600 dark:text-gray-200"
            >
              Coordinates
            </label>
            <span>
              <input
                type="number"
                id="lat"
                name="lat"
                onChange={(e) => setLat(e.target.value)}
                className="input-map"
              />
              <input
                type="number"
                id="long"
                name="long"
                onChange={(e) => setLong(e.target.value)}
                className="input-map"
              />
            </span>
          </div>

          <div className="relative mb-4">
            <label
              htmlFor="name"
              className="leading-7 text-sm text-gray-600 dark:text-gray-200"
            >
              Country
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setCountry(e.target.value)}
              className="input-map"
            />
          </div>

          <button
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={postData}
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
}

export default CustomModal;
