import { EventModal } from "./modals/EventModal";
import PlaceModal from "./modals/PlaceModal";
import ImportModal from "./modals/ImportModal";
import React, { useState } from "react";
import { emptyPlace } from "../helpers/api_schemas";
import { emptyEvent } from "../helpers/api_schemas";

const MenuButtons = (props) => {
  // TODO fix logic of opening modals, because here it is changed by state
  //  and in modal it is changed by visibility xd
  const [eventModal, setEventModal] = useState(props.eventModal);
  const [placeModal, setPlaceModal] = useState(false);
  const [importModal, setImportModal] = useState(false);
  const [activePlace, setActivePlace] = useState({ ...emptyPlace });

  const createEvent = (is_import = false) => {
    if (is_import) setImportModal(!importModal);
    else setEventModal(!eventModal);
  };

  const createPlace = () => {
    setActivePlace({ ...emptyPlace });
    setPlaceModal(!placeModal);
  };

  return (
    <div width="100%" className="menu-buttons">
      <div className={"menu-buttons flex"}>
        <button className={`btn modal`} onClick={() => createEvent(false)}>
          Add event
        </button>
        <button className={`btn modal`} onClick={() => createEvent(true)}>
          Import event
        </button>
        <button className={`btn modal`} onClick={createPlace}>
          Add place
        </button>
      </div>
      {eventModal ? (
        <EventModal
          activeEvent={emptyEvent}
          // toggle={() => setEventModal(false)}
          isOpen={eventModal}
        />
      ) : null}
      {importModal ? (
        <ImportModal
          activeEvent={emptyEvent}
          // toggle={() => setImportModal(false)}
          isOpen={importModal}
        />
      ) : null}
      {placeModal ? (
        <PlaceModal
          activePlace={activePlace}
          // toggle={() => setPlaceModal(false)}
          isOpen={placeModal}
        />
      ) : null}
    </div>
  );
};

export { MenuButtons };
