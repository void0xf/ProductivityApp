import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="justify-center flex items-center h-screen flex-col gap-4 font-sans">
      <CircularProgress />
      <div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
