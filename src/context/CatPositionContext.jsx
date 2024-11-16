import React, { createContext, useContext, useState } from "react";

const CatPositionContext = createContext();

export function CatPositionProvider({ children }) {
  const [catPosition, setCatPosition] = useState([35, 35, 100]);

  return (
    <CatPositionContext.Provider value={{ catPosition, setCatPosition }}>
      {children}
    </CatPositionContext.Provider>
  );
}

export function useCatPosition() {
  return useContext(CatPositionContext);
}
