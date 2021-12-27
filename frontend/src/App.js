import React from "react";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { TechStack } from "./components/static-subpages/TechStack";
import { About } from "./components/static-subpages/About";
import { EventPage } from "./components/EventPage";
import { PlacePage } from "./components/PlacePage";
import { Places } from "./components/Places";
import { Events } from "./components/Events";

function App() {
  return (
    <main className="context">
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="about" element={<About />} />
        <Route path="places" element={<Places />} />
        <Route path="about/tech-stack" element={<TechStack />} />
        <Route path="events/:eventId" element={<EventPage />} />
        <Route path="places/:placeId" element={<PlacePage />} />
      </Routes>
    </main>
  );
}

export default App;
