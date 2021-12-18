import React, { useState } from "react";
import axios from "axios";
import Map from "./Map";

function CustomModal(props) {
  const [name, setName] = useState(props.activePlace.name);
  const [country, setCountry] = useState(props.activePlace.country);

  const postData = () => {
    const place = {
      ...props.activePlace,
      name: name,
      country: country,
    };

    // TODO is below logic is good? shouldnt there be another check?

    // TODO recheck if backend sends place id

    if (typeof place === "undefined" || typeof place.id === "undefined") {
      axios.post("http://localhost:8000/api/places/", place);
      return;
    }
    axios.put(`http://localhost:8000/api/palces/${place.id}/`, place);
  };

  return (
    <div isOpen={true} toggle={props.toggle}>
      <div toggle={props.toggle}>Place</div>
      <div>
        <div>
          <div>
            <p for="name">Name</p>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter place name"
            />
          </div>

          <div>
            {/* TODO fix to pick a location */}
            <label>Insert a Geo Location</label>
            <div height="32px" width="10px">
              <Map />
            </div>
          </div>

          <div>
            <p for="country">Country</p>
            <input
              type="text"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter place country"
            />
          </div>
        </div>
      </div>
      <div>
        {/* TODO saving is not closing the modal */}
        <button color="success" onClick={postData}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CustomModal;
