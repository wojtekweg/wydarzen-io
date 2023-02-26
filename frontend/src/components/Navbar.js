import { useState, useEffect } from "react";
import { MenuButtons } from "./MenuButtons";
import LoginModal from "./modals/LoginModal";

const Navbar = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [collapseMenu, setCollapseMenu] = useState(false);
  const [currTheme, setCurrTheme] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    username: "",
    token: "",
    avatar: "",
  });

  const changeTheme = (initialSet = false) => {
    const html = document.querySelector("html");

    if (
      ((!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) ||
        localStorage.theme === "dark") &&
      initialSet
    ) {
      localStorage.theme = "dark";
      html.classList.add("dark");
      setCurrTheme("dark");
    } else if (currTheme === "light") {
      localStorage.theme = "dark";
      html.classList.add("dark");
      setCurrTheme("dark");
    } else {
      localStorage.theme = "light";
      html.classList.remove("dark");
      setCurrTheme("light");
    }
  };

  const changeLoginToken = (token) => {
    setCurrentUser({ ...currentUser, token: token, username: "Jakis" });
    localStorage.loginToken = currentUser;
  };

  const callbackModal = (what) => {
    if (what === "login") {
      setLoginModal(false);
    }
  };

  useEffect(() => {
    changeTheme(true);
    const close = (e) => {
      if (e.keyCode === 27) {
        callbackModal("login");
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div className="px-auto">
      <div width="100%" height="5%" id="logo">
        <h1 className="text-3xl font-bold underline">
          <a href="/">wydarzen.io</a>
        </h1>
      </div>
      <MenuButtons />
      <div>
        {collapseMenu ? (
          <div
            onClick={() => setCollapseMenu(!collapseMenu)}
            style={{
              position: "fixed",
              bottom: 10,
              left: 10,
            }}
            className="p-10 px-4 py-2 flex opacity-70 hover:opacity-100 backdrop-blur bg-indigo-500 text-indigo-50 rounded-full cursor-pointer my-4"
          >
            <p className="mr-2">Menu</p>
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
          <div className="navbar-menu">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-90 mx-5 h-5 w-5 bg-gray-400 dark:bg-indigo-700 rounded-full navbar-link"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => setCollapseMenu(!collapseMenu)}
              >
                <path
                  fillRule="evenodd"
                  d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div>
              <a className="navbar-link" href="/">
                Events
              </a>
            </div>
            <div>
              <a className="navbar-link" href="/places">
                Places
              </a>
            </div>
            <div>
              <a className="navbar-link" href="/about">
                About
              </a>
            </div>
            <div className="navbar-link" onClick={() => changeTheme()}>
              Change theme
            </div>
            <div
              onClick={() => setLoginModal(true)}
              className="modal login navbar-link flex flex-nowrap px-2 py-1 place-content-center"
            >
              {currentUser.token
                ? currentUser.avatar || (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 mr-2"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  )
                : ""}
              <p className="">{currentUser.username || "Login"}</p>
            </div>
          </div>
        )}
      </div>
      {loginModal ? (
        <LoginModal callbackModal={callbackModal} currentUser={currentUser} />
      ) : null}
    </div>
  );
};

export { Navbar };
