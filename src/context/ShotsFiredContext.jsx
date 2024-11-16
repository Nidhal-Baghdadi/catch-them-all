import React, { createContext, useContext, useState } from "react";

const ShotsFiredContext = createContext();

export function ShotsFiredProvider({ children }) {
  const [shotsFired, setShotsFired] = useState(false);

  return (
    <ShotsFiredContext.Provider value={{ shotsFired, setShotsFired }}>
      {children}
    </ShotsFiredContext.Provider>
  );
}

export function useShotsFired() {
  return useContext(ShotsFiredContext);
}
