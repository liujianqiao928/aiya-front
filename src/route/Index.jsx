import React from "react";
import Login from "../pages/Login";
import Rigister from "../pages/Rigister";
import From from "../pages/From.jsx";
import Header from "../layout/Header";
import Home from "../pages/Home";
import Answer from "../pages/Answer";
import Chat from "../pages/Chat";
import Star from "../pages/Star";
import Question from "../pages/Question";
import NotFoundPage from "../pages/Notfound/Index.jsx";
import Forum from "../pages/Forum";
import Class from  "../pages/Class"
import {createBrowserRouter} from "react-router-dom";
 const Routers = [
     {
         path: "/",
         element: <Home />
     },
     {
         path: "/answer",
         element: <Answer />
     },
     {
         path: "/chat",
         element: <Chat />
     },
     {
         path: "/star",
         element: <Star />
     },
     {
         path: "/question",
         element: <Question />
     },
     {
         path: "/forum",
         element: <Forum />
     },
     {
         path: '/rigister',
         element: <Rigister />

     },
     {
         path: '/class',
         element: <Class />

     },
    {
        path: "/login",
        element: <Login />,
        children: [
            {
                path: "from",
                element: <From />,
            }

            ]

    },
    {
        path: "/head",
        element: <Header />
    },
     {
         path: "*",
         element: <NotFoundPage />
     }
]

export default Routers;