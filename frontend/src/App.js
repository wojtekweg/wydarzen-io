import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { About } from "./components/static-subpages/About";
import { EventPage } from "./components/EventPage";
import PlacePage from "./components/PlacePage";
import Places from "./components/Places";
import { Page404 } from "./components/Page404";
import { Events } from "./components/Events";

export const UserContext = React.createContext(null);

function App() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  return (
    <UserContext.Provider
      value={{
        username: username,
        setUsername: setUsername,
        token: token,
        setToken: setToken,
      }}
    >
      <React.StrictMode>
        <main className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Events />} />
            <Route path="about" element={<About />} />
            <Route path="places" element={<Places />} />
            <Route path="events/:eventId" element={<EventPage />} />
            <Route path="places/:placeId" element={<PlacePage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </React.StrictMode>
    </UserContext.Provider>
  );
}

export default App;
