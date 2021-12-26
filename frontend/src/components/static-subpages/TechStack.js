import axios from "axios";
import config from "../../config.json";
import React, { useEffect, useState } from "react";

function TechStackAbout() {
  const [lang, setLang] = useState("eng");
  const [designPatterns, setDesingPatterns] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const colors = ["#dc2626", "#d97706", "#059669", "#0891b2", "#0323a1"];
  const icons = {
    react: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Layer_2_1_"
        x="0px"
        y="0px"
        viewBox="0 0 841.9 595.3"
        enableBackground="new 0 0 841.9 595.3"
        // xml:space="preserve"
      >
        <g>
          <path
            fill="#61DAFB"
            d="M666.3,296.5c0-32.5-40.7-63.3-103.1-82.4c14.4-63.6,8-114.2-20.2-130.4c-6.5-3.8-14.1-5.6-22.4-5.6v22.3   c4.6,0,8.3,0.9,11.4,2.6c13.6,7.8,19.5,37.5,14.9,75.7c-1.1,9.4-2.9,19.3-5.1,29.4c-19.6-4.8-41-8.5-63.5-10.9   c-13.5-18.5-27.5-35.3-41.6-50c32.6-30.3,63.2-46.9,84-46.9l0-22.3c0,0,0,0,0,0c-27.5,0-63.5,19.6-99.9,53.6   c-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7,0,51.4,16.5,84,46.6c-14,14.7-28,31.4-41.3,49.9c-22.6,2.4-44,6.1-63.6,11   c-2.3-10-4-19.7-5.2-29c-4.7-38.2,1.1-67.9,14.6-75.8c3-1.8,6.9-2.6,11.5-2.6l0-22.3c0,0,0,0,0,0c-8.4,0-16,1.8-22.6,5.6   c-28.1,16.2-34.4,66.7-19.9,130.1c-62.2,19.2-102.7,49.9-102.7,82.3c0,32.5,40.7,63.3,103.1,82.4c-14.4,63.6-8,114.2,20.2,130.4   c6.5,3.8,14.1,5.6,22.5,5.6c27.5,0,63.5-19.6,99.9-53.6c36.4,33.8,72.4,53.2,99.9,53.2c8.4,0,16-1.8,22.6-5.6   c28.1-16.2,34.4-66.7,19.9-130.1C625.8,359.7,666.3,328.9,666.3,296.5z M536.1,229.8c-3.7,12.9-8.3,26.2-13.5,39.5   c-4.1-8-8.4-16-13.1-24c-4.6-8-9.5-15.8-14.4-23.4C509.3,224,523,226.6,536.1,229.8z M490.3,336.3c-7.8,13.5-15.8,26.3-24.1,38.2   c-14.9,1.3-30,2-45.2,2c-15.1,0-30.2-0.7-45-1.9c-8.3-11.9-16.4-24.6-24.2-38c-7.6-13.1-14.5-26.4-20.8-39.8   c6.2-13.4,13.2-26.8,20.7-39.9c7.8-13.5,15.8-26.3,24.1-38.2c14.9-1.3,30-2,45.2-2c15.1,0,30.2,0.7,45,1.9   c8.3,11.9,16.4,24.6,24.2,38c7.6,13.1,14.5,26.4,20.8,39.8C504.7,309.8,497.8,323.2,490.3,336.3z M522.6,323.3   c5.4,13.4,10,26.8,13.8,39.8c-13.1,3.2-26.9,5.9-41.2,8c4.9-7.7,9.8-15.6,14.4-23.7C514.2,339.4,518.5,331.3,522.6,323.3z    M421.2,430c-9.3-9.6-18.6-20.3-27.8-32c9,0.4,18.2,0.7,27.5,0.7c9.4,0,18.7-0.2,27.8-0.7C439.7,409.7,430.4,420.4,421.2,430z    M346.8,371.1c-14.2-2.1-27.9-4.7-41-7.9c3.7-12.9,8.3-26.2,13.5-39.5c4.1,8,8.4,16,13.1,24C337.1,355.7,341.9,363.5,346.8,371.1z    M420.7,163c9.3,9.6,18.6,20.3,27.8,32c-9-0.4-18.2-0.7-27.5-0.7c-9.4,0-18.7,0.2-27.8,0.7C402.2,183.3,411.5,172.6,420.7,163z    M346.7,221.9c-4.9,7.7-9.8,15.6-14.4,23.7c-4.6,8-8.9,16-13,24c-5.4-13.4-10-26.8-13.8-39.8C318.6,226.7,332.4,224,346.7,221.9z    M256.2,347.1c-35.4-15.1-58.3-34.9-58.3-50.6c0-15.7,22.9-35.6,58.3-50.6c8.6-3.7,18-7,27.7-10.1c5.7,19.6,13.2,40,22.5,60.9   c-9.2,20.8-16.6,41.1-22.2,60.6C274.3,354.2,264.9,350.8,256.2,347.1z M310,490c-13.6-7.8-19.5-37.5-14.9-75.7   c1.1-9.4,2.9-19.3,5.1-29.4c19.6,4.8,41,8.5,63.5,10.9c13.5,18.5,27.5,35.3,41.6,50c-32.6,30.3-63.2,46.9-84,46.9   C316.8,492.6,313,491.7,310,490z M547.2,413.8c4.7,38.2-1.1,67.9-14.6,75.8c-3,1.8-6.9,2.6-11.5,2.6c-20.7,0-51.4-16.5-84-46.6   c14-14.7,28-31.4,41.3-49.9c22.6-2.4,44-6.1,63.6-11C544.3,394.8,546.1,404.5,547.2,413.8z M585.7,347.1c-8.6,3.7-18,7-27.7,10.1   c-5.7-19.6-13.2-40-22.5-60.9c9.2-20.8,16.6-41.1,22.2-60.6c9.9,3.1,19.3,6.5,28.1,10.2c35.4,15.1,58.3,34.9,58.3,50.6   C644,312.2,621.1,332.1,585.7,347.1z"
          />
          <polygon fill="#61DAFB" points="320.8,78.4 320.8,78.4 320.8,78.4  " />
          <circle fill="#61DAFB" cx="420.9" cy="296.5" r="45.7" />
          <polygon fill="#61DAFB" points="520.5,78.1 520.5,78.1 520.5,78.1  " />
        </g>
      </svg>
    ),
    django: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M 11 3 L 11 8.1582031 C 10.653 8.0172031 9.9041562 8 9.5351562 8 C 6.7591563 8 4.1894531 9.306 4.1894531 13 C 4.1894531 17.42 7.67 18 10 18 C 10.92 18 13 17.909141 14 17.619141 L 14 3 L 11 3 z M 16 3 L 16 6 L 19 6 L 19 3 L 16 3 z M 16 8 L 16 16.701172 C 16 18.217172 15.078 19.795172 13 20.701172 L 15.859375 21.996094 C 18.765375 20.996094 19 17.701172 19 16.701172 L 19 8 L 16 8 z M 9.9707031 10.550781 C 10.290703 10.550781 10.65 10.609453 11 10.689453 L 11 15.392578 C 10.65 15.472578 10.290703 15.533203 9.9707031 15.533203 C 8.6607031 15.533203 7.390625 15.12 7.390625 13 C 7.390625 10.88 8.6607031 10.550781 9.9707031 10.550781 z"></path>
      </svg>
    ),
    cypress: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 87 70">
        <mask
          id="a"
          maskUnits="userSpaceOnUse"
          x="8"
          y="0"
          width="70"
          height="70"
        >
          <path
            d="M43.027 0C61.9098 0 77.19 15.6545 77.19 35S61.9098 70 43.027 70C24.1441 70 8.86395 54.3455 8.86395 35S24.1441 0 43.027 0z"
            fill="#fff"
          />
        </mask>
        <g mask="url(#a)">
          <path
            d="M60.1171 49.5112c-1.1706 3.7178-2.9265 6.4761-5.3848 8.5149-2.4582 2.0388-5.7359 3.1182-9.833 3.478l-.8195-5.5168c2.6924-.3598 4.6825-.9594 5.9701-1.9188.4683-.3598 1.4048-1.4392 1.4048-1.4392l-9.7161-31.901h8.0772l5.6189 23.8658 5.9701-23.8658h7.8431l-9.1308 28.7829zM31.9055 19.6489c1.873 0 3.6289.2399 5.0336.8395 1.5218.5997 2.9266 1.4392 4.3313 2.6385l-3.2777 4.5572c-.9365-.7195-1.873-1.1992-2.6924-1.559-.8194-.3598-1.873-.4797-2.8095-.4797-3.98 0-5.97 3.1181-5.97 9.4743 0 3.2381.4682 5.5168 1.5217 6.836 1.0536 1.4391 2.4583 2.0388 4.4483 2.0388.9365 0 1.873-.12 2.6924-.4798.8195-.3597 1.7559-.8395 2.9265-1.559l3.2777 4.7971c-2.6923 2.2787-5.7359 3.358-9.2477 3.358-2.8095 0-5.1507-.5996-7.2578-1.7989-1.99-1.1993-3.6289-2.9982-4.6824-5.2769-1.0536-2.2786-1.6389-4.917-1.6389-8.0352 0-2.9982.5853-5.7566 1.6389-8.0352 1.0535-2.3986 2.6924-4.1975 4.6824-5.5167 1.99-1.0794 4.3312-1.799 7.0236-1.799z"
            fill="#020D1C"
          />
        </g>
        <defs>
          <filter
            id="filter0_d"
            x="5.66397"
            y="-3.17969"
            width="74.7246"
            height="76.3594"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ),
    tailwind: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        id="footer-sample-full"
        width="100"
        // width="1.67em"
        // height="1em"
        // preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 256 154"
        className="iconify iconify--logos"
      >
        <defs>
          <linearGradient
            x1="-2.778%"
            y1="32%"
            x2="100%"
            y2="67.556%"
            id="footer-sample-full-0"
          >
            <stop stopColor="#2298BD" offset="0%"></stop>
            <stop stopColor="#0ED7B5" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path
          d="M128 0C93.867 0 72.533 17.067 64 51.2C76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2c-12.8 17.067-27.733 23.467-44.8 19.2c-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2c9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2c-12.8 17.067-27.733 23.467-44.8 19.2c-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z"
          fill="url(#footer-sample-full-0)"
        ></path>
      </svg>
    ),
  };

  useEffect(() => {
    getDesignPatterns(lang);
    getTechStack(lang);
  }, []);

  const getDesignPatterns = async (language) => {
    axios
      .get(config.url + language + "/design_pattern_info/")
      .then((res) => setDesingPatterns(res.data))
      .catch((err) => console.log(err));
  };

  const getTechStack = async (language) => {
    axios
      .get(config.url + language + "/tech_stack_info/")
      .then((res) => setTechStack(res.data))
      .catch((err) => console.log(err));
  };

  const changeLang = () => {
    const next_lang = lang === "eng" ? "pl" : "eng";
    setLang(next_lang);
    getTechStack(next_lang);
    getDesignPatterns(next_lang);
  };

  const renderTechStackInfo = () => {
    return techStack.map((el, index) => (
      <div key={el.title}>
        <div
          className={`flex items-center lg:w-3/5 mx-auto ${
            index === techStack.length - 1
              ? ""
              : "border-b pb-10 mb-10 border-gray-200 dark:border-gray-800"
          } sm:flex-row flex-col `}
        >
          {index % 2 === 0 ? (
            <div className="sm:w-22 sm:h-22 h-20 w-20 sm:mr-10 inline-flex items-center justify-center flex-shrink-0 hover:rotate-12">
              {icons[el.icon]}
            </div>
          ) : (
            ""
          )}
          <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-gray-900 dark:text-gray-100 text-lg title-font font-medium mb-2">
              {el.title}
            </h2>
            <p className="leading-relaxed text-base dark:text-gray-400">
              {el.description}
            </p>
          </div>

          {index % 2 === 0 ? (
            ""
          ) : (
            <div className="sm:w-22 sm:h-22 h-20 w-20 sm:mr-10 inline-flex items-center justify-center flex-shrink-0 hover:rotate-12">
              {icons[el.icon]}
            </div>
          )}
        </div>
      </div>
    ));
  };

  const renderDesignPatternsInfo = () => {
    return designPatterns.map((designPattern, index) => (
      <div
        key={designPattern.title}
        className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto dark:text-gray-400 "
      >
        <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
          <div className="h-full w-1 bg-gray-200 dark:bg-gray-800 pointer-events-none"></div>
        </div>
        <div
          style={{
            backgroundColor: colors[index % colors.length],
          }}
          className={`flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center  text-white dark:text-gray-400 relative z-10 title-font font-medium text-sm`}
        ></div>
        <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
          <div
            style={{
              backgroundColor: colors[index % colors.length] + "11",
            }}
            className="flex-shrink-0 w-24 h-24 rounded-full inline-flex items-center justify-center hover:rotate-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke={colors[index % colors.length]}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={designPattern.iconPath}
              />
              {designPattern.iconPath2 !== "" ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={designPattern.iconPath2}
                />
              ) : null}
            </svg>
          </div>
          <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
            <h2 className="font-medium title-font text-gray-900 dark:text-gray-100 mb-1 text-xl">
              {designPattern.title}
            </h2>
            <p className="leading-relaxed">{designPattern.description}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto flex flex-wrap justify-center">
        <button onClick={(e) => changeLang()} className="btn toggle ">
          {lang === "eng"
            ? "Zmień język na polski"
            : "Change language to English"}
        </button>
      </div>
      <h1>{lang === "eng" ? "Technologies" : "Technologie"}</h1>
      <div className="container px-5 py-5 mx-auto">{renderTechStackInfo()}</div>
      <h1>{lang === "eng" ? "Design patterns" : "Wzorce projektowe"}</h1>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto flex flex-wrap">
          {renderDesignPatternsInfo()}
        </div>
      </section>
    </section>
  );
}

export { TechStackAbout as TechStack };