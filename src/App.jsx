import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContexts.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import IsProtected from "./Components/isProtected.jsx";
import { Suspense, lazy } from "react";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

import "./index.css";
//import PageNav from "./Components/PageNav";
import CityList from "./Components/CityList.jsx";
import CountriesList from "./Components/CountriesList.jsx";
import City from "./Components/City.jsx";
import Form from "./Components/Form.jsx";
import SpinnerFullPage from "./Components/SpinnerFullPage.jsx";

function App() {
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route path={"/Product"} element={<Product />}></Route>
                <Route path={"/Pricing"} element={<Pricing />}></Route>
                <Route index path={"/"} element={<Homepage />}></Route>
                <Route path={"/login"} element={<Login />}></Route>
                <Route
                  path={"/App"}
                  element={
                    <IsProtected>
                      <AppLayout />
                    </IsProtected>
                  }
                >
                  <Route
                    index
                    element={<Navigate replace to="cities" />}
                  ></Route>
                  <Route path={"cities"} element={<CityList />}></Route>
                  <Route path={"cities/:id"} element={<City />}></Route>
                  <Route path={"countries"} element={<CountriesList />}></Route>
                  <Route path={"form"} element={<Form />}></Route>
                </Route>
                <Route path={"/*"} element={<PageNotFound />}></Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

/* <div>
      <h1>WorldWise</h1>
    </div>*/
