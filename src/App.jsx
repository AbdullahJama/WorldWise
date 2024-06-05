import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider, useCities } from "./contexts/CitiesContexts.jsx";

import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import "./index.css";
import Login from "./pages/Login.jsx";
import PageNav from "./Components/PageNav";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./Components/CityList.jsx";
import CountriesList from "./Components/CountriesList.jsx";
import City from "./Components/City.jsx";
import Form from "./Components/Form.jsx";

function App() {
  return (
    <div>
      <h1>Hello World this is me </h1>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"/Product"} element={<Product />}></Route>
            <Route path={"/Pricing"} element={<Pricing />}></Route>
            <Route index path={"/"} element={<Homepage />}></Route>
            <Route path={"/login"} element={<Login />}></Route>
            <Route path={"/App"} element={<AppLayout />}>
              <Route index element={<Navigate replace to="cities" />}></Route>
              <Route path={"cities"} element={<CityList />}></Route>
              <Route path={"cities/:id"} element={<City />}></Route>
              <Route path={"countries"} element={<CountriesList />}></Route>
              <Route path={"form"} element={<Form />}></Route>
            </Route>
            <Route path={"/*"} element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </div>
  );
}

export default App;

/* <div>
      <h1>WorldWise</h1>
    </div>*/
