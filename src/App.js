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
  if (path === "dashboard") return <HomeScreen setScreen={setScreen} />;
  window.history.replaceState("HOME", "HOME", "dashboard");
  setPath("/dashboard");
  return <StrictMode>Hallow, its 404</StrictMode>;
}

// 0.0.2
// git add .
// git commit -m "Hallow"
// git push origin jaseel
