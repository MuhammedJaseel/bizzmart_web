import React, { StrictMode, useState } from "react";
import BranchScreen from "./screen/branch";
import HomeScreen from "./screen/home";
import LoginScreen from "./screen/login";

export default function App() {
  const [path, setPath] = useState(
    window.location.pathname.split("?")[0].split("/")[1]
  );
  const setScreen = (v) => {
    setPath(v.split("?")[0].split("/")[1]);
    window.history.replaceState("HOME", "HOME", v);
  };
  if (path === "login") return <LoginScreen setScreen={setScreen} />;
  if (path === "branches") return <BranchScreen setScreen={setScreen} />;
  if (path === "dashboard") return  <HomeScreen setScreen={setScreen} />;
  if (path === "cal") return <Cal />;
  window.history.replaceState("HOME", "HOME", "dashboard");
  setPath("/dashboard");
  return <StrictMode>Hallow, its 404</StrictMode>;
}

// git add .
// git commit -m "Ui finel tuchup started"
// git push origin main

function Cal() {
  return (
    <>
      <form
        style={{ padding: 30 }}
        onSubmit={(e) => {
          const value = (e.target.kk.value / 32).toFixed(2);
          navigator.clipboard.writeText(value + "vw");
        }}
      >
        <input autoFocus id="kk" placeholder="px to wh" />
      </form>
      <form
        style={{ padding: 30 }}
        onSubmit={(e) => {
          const value = (e.target.kk.value * 1.33).toFixed(2);
          navigator.clipboard.writeText(value + "");
        }}
      >
        <input id="kk" placeholder="wh to wh" />
      </form>
    </>
  );
}
