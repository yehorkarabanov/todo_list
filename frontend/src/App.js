import logo from './logo.svg';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {NotFound} from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home/>} />
      <Route path={"/not-found"} element={<NotFound />}/>
      <Route path={"*"} element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
