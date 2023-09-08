import { useSelector } from "react-redux";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";

function App() {
  const authId = useSelector((state) => state.authId);

  return (
      <div>
         <Header />
         {authId === "" ?(
              <Auth />
         ):(
             <Dashboard />
         )}
      </div>
  );
}

export default App;
