import { useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import HomeView from "./components/HomeView";


export default function App() {


  const [page, setPage] = useState<
    "login" | "register" | "forgot" | "reset" | "home"
  >("login");



  return (

    <>


      {
        page === "login" && (

          <Login

            onSuccess={() => setPage("home")}

            onRegister={() => setPage("register")}

            onForgotPassword={() => setPage("forgot")}

          />

        )
      }





      {
        page === "register" && (

          <Register

            onLogin={() => setPage("login")}

          />

        )
      }






      {
        page === "forgot" && (

          <ForgotPassword

            onBack={() => setPage("login")}

          />

        )
      }







      {
        page === "reset" && (

          <ResetPassword

            onSuccess={() => setPage("login")}

          />

        )
      }







      {
        page === "home" && (

          <HomeView />

        )
      }



    </>

  );

}
