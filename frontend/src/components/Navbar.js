import { useState } from "react/cjs/react.development";
import { MenuButtons } from "./MenuButtons";

const Navbar = (props) => {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="px-auto">
      <div width="100%" height="5%">
        <h1 className="text-3xl font-bold underline">
          <a href="/">wydarzen.io</a>
        </h1>
      </div>
      <MenuButtons />
      <div>
        {collapse ? (
          <div
            onClick={() => setCollapse(!collapse)}
            style={{
              position: "fixed",
              bottom: 10,
              left: 10,
            }}
            className="p-10 px-4 py-2 flex bg-gray-400 dark:bg-indigo-700 rounded-full opacity-50 hover:opacity-100 cursor-pointer"
          >
            <p className="mr-2">Show menu</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 rotate-90"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              width: "100%",
            }}
            className="bg-gray-200 dark:bg-indigo-900 px-4 py-2 grid gap-4 grid-rows-1 grid-cols-5 opacity-40 hover:opacity-80"
          >
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-90 h-5 w-5 bg-gray-400 dark:bg-indigo-700 rounded-full navbar-link"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => setCollapse(!collapse)}
              >
                <path
                  fillRule="evenodd"
                  d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="navbar-link">
              <a className="navbar-link" href="/">
                Events
              </a>
            </div>
            <div className="navbar-link">
              <a className="navbar-link" href="/places">
                Places
              </a>
            </div>
            <div className="navbar-link">
              <a className="navbar-link" href="/about">
                About
              </a>
            </div>
            <div className="navbar-link">
              <a className="navbar-link" href="/about/tech-stack">
                Tech stack
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Navbar };
