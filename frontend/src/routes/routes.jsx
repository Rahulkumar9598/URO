import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Map from "../pages/Map";
import Home from "../pages/Home";
import BoysFashion from "../pages/BoysFashion";
import GirlFashion from "../pages/GirlFashion";
import { Cart } from "../pages/Cart";
import FootwearPage from "../pages/FootWear";
import Image from "../pages/Image";
import Redux from "../pages/Redux";
import Location from "../pages/Location"
import Login from "../pages/login";
import ProtectedRoutes from "../utils/ProtectedRoutes";

export const router = createBrowserRouter(
    [

        {
            path: "",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/login",
                    element: <Login />
                },

                {
                    element: <ProtectedRoutes />,
                    children: [

                        {
                            path: "/map",
                            element: <Map />
                        },
                        {
                            path: "/boy-fashion",
                            element: <BoysFashion />
                        },
                        {
                            path: "/girl-fashion",
                            element: <GirlFashion />
                        },
                        {
                            path: "/redux",
                            element: <Redux />
                        },
                        {
                            path: "/cart",
                            element: <Cart />
                        },
                        {
                            path: "/location",
                            element: <Location />
                        },
                        {
                            path: "/footWear",
                            element: <FootwearPage />
                        },
                        {
                            path: "/image",
                            element: <Image />
                        }


                    ]
                }


            ]

        },

    ]
)

