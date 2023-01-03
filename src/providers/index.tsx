import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <CookiesProvider>
      <Router>{children}</Router>
    </CookiesProvider>
  );
};
