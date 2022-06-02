import React from "react";
import BranchScreen from "./screen/branch";
import HomeScreen from "./screen/home";
import LoginScreen from "./screen/login";

export default function App() {
  const path = window.location.pathname.split("/")[1];
  if (path === "login") return <LoginScreen />;
  if (path === "branches") return <BranchScreen />;
  if (path === "dashbord") return <HomeScreen />;
  return <Cal />;
}

// git add .
// git commit -m "cloner"
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
