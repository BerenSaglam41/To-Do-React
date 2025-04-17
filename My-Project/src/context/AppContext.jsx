import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  // State'leri burada tanımlayabilirsin
    const navigate = useNavigate()

  // navigate ve fonksiyonlar burada olabilir

  const value = {
    navigate,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
