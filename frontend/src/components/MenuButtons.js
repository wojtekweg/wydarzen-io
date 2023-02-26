import { EventModal } from "./modals/EventModal";
import PlaceModal from "./modals/PlaceModal";
import ImportModal from "./modals/ImportModal";
import React, { useState, useEffect } from "react";
import { emptyPlace } from "../helpers/api_schemas";
import { emptyEvent } from "../helpers/api_schemas";

const MenuButtons = (props) => {
  const [eventModal, setEventModal] = useState(props.eventModal);
  const [placeModal, setPlaceModal] = useState(false);
  const [importModal, setImportModal] = useState(false);
  const [activePlace, setActivePlace] = useState({ ...emptyPlace });

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        callbackModal("all");
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const createEvent = (is_import = false) => {
    if (is_import) setImportModal(!importModal);
    else setEventModal(true);
  };

  const createPlace = () => {
    setActivePlace({ ...emptyPlace });
    setPlaceModal(!placeModal);
  };

  const callbackModal = (what) => {
    if (what === "event") {
      setEventModal(false);
    }
    if (what === "place") {
      setPlaceModal(false);
    }
    if (what === "import") {
      setImportModal(false);
    }
    if (what === "all") {
      setEventModal(false);
      setPlaceModal(false);
      setImportModal(false);
    }
  };

  return (
    <div width="100%" className="menu-buttons">
      <div className={"menu-buttons flex"}>
        <button className={` modal`} onClick={() => createEvent(false)}>
          Add event
        </button>
        <button className={` modal`} onClick={() => createEvent(true)}>
          Import event
        </button>
        <button className={` modal`} onClick={createPlace}>
          Add place
        </button>
      </div>
      {eventModal ? (
        <EventModal activeEvent={emptyEvent} callbackModal={callbackModal} />
      ) : null}
      {importModal ? (
        <ImportModal activeEvent={emptyEvent} callbackModal={callbackModal} />
      ) : null}
      {placeModal ? (
        <PlaceModal activePlace={activePlace} callbackModal={callbackModal} />
      ) : null}
    </div>
  );
};

export { MenuButtons };
