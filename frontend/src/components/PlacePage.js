import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import config from "../config.json";
import { emptyPlace } from "../helpers/api_methods";

const PlacePage = (ś) => {
  const [place, setPlace] = useState({ ...emptyPlace });
  const [imgClip, setImgClip] = useState(true);
  const { placeId } = useParams();

  useEffect(() => {
    fetchPlace();
  }, []);

  const fetchPlace = async () => {
    axios
      .get(`${config.url}places/${placeId}/`)
      .then((res) => {
        setPlace(res.data);
      })
      .catch((err) => console.log(err));
  };

  const changeImgView = () => {
    setImgClip(!imgClip);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 pt-12 pb-24 mx-auto flex flex-col">
        <div className="lg:w-5/6 mx-auto">
          <div className="object-cover object-center absolute p-2 opacity-40 hover:opacity-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 bg-gray-200 rounded-full p-1 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => changeImgView()}
            >
              {imgClip ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 bg-gray-200 rounded-full p-1 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 11l7-7 7 7M5 19l7-7 7 7"
                  />
                </svg>
              )}
            </svg>
          </div>
          <div
            className={`rounded-lg overflow-hidden ${imgClip ? "h-64" : ""}`}
          >
            <img
              alt="content"
              className="object-cover object-center h-full w-full"
              src={place.picture}
            />
          </div>

          <div
            className="flex overflow-hidden"
            style={{
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            <div></div>
            <a href={`/places/${placeId}`}>
              <h1
                // style={{ fontSize: 50 }}
                className="text-4xl	underline decoration-wavy hover:decoration-indigo-500"
              >
                {place.name}
              </h1>
            </a>
          </div>
          {/* // TODO place events enpoint */}
        </div>
      </div>
    </section>
  );
};

export { PlacePage };
