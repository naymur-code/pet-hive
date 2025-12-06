import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../root/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../pages/Error";
import MyOrders from "../pages/MyOrders";
import PrivateRoute from "./PrivateRoute";
import AddListing from "../pages/AddListing";
import PetSupplies from "../pages/PetsSupplies";
import PetsSuppliesDetails from "../pages/PetsSuppliesDetails";
import FilteredProduct from "../pages/FilteredProduct";

export const Routes = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error />,
    children: [
      { index: true, Component: Home },
      { path: "/home", element: <Home /> },
      {
        path: "/addListing",
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
      },
      { path: "/petssupplies", element: <PetSupplies /> },
      { path: "/petssupplies/:id", element: <PetsSuppliesDetails /> },
      {
        path: "category-filtered/:pets",
        element: <FilteredProduct />,
      },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/myorders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
