import { useState, useEffect } from "react";

import { supabase } from "./lib/supabase";

import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";

import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

import HomeView from "./components/HomeView";
import SearchView from "./components/SearchView";
import StoresView from "./components/StoresView";
import ProfileView from "./components/ProfileView";
import BottomNav from "./components/BottomNav";


export default function App() {


  const [page, setPage] = useState<
    "landing" | "login" | "register" | "forgot" | "reset" | "home"
  >("landing");



  const [tab, setTab] = useState<
    "home" | "search" | "stores" | "profile"
  >("home");



  const [selectedCategory, setSelectedCategory] = useState<
    "Fashion" | "Tech" | "Dining" | "Beauty" | "All"
  >("All");





  // Detect Supabase password recovery link

  useEffect(() => {


    const {
      data
    } = supabase.auth.onAuthStateChange(
      (event) => {


        if(event === "PASSWORD_RECOVERY"){

          setPage("reset");

        }


      }
    );


    return () => {

      data.subscription.unsubscribe();

    };


  }, []);






  return (

    <>


      {
        page === "landing" && (

          <LandingPage

            onLogin={() => setPage("login")}

            onRegister={() => setPage("register")}

          />

        )
      }






      {
        page === "login" && (

          <Login

            onSuccess={() => {

              setPage("home");

              setTab("home");

            }}


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

          <>


            {
              tab === "home" && (

                <HomeView

                  onSelectStore={(store)=>console.log(store)}

                  onSelectCategory={setSelectedCategory}

                  onJoinMembership={()=>{}}

                  onOpenConcierge={()=>{}}

                  isMember={false}

                  onSwitchTab={setTab}

                />

              )
            }






            {
              tab === "search" && (

                <SearchView

                  onSelectStore={(store)=>console.log(store)}

                  onOpenConcierge={()=>{}}

                  selectedCategory={selectedCategory}

                  onSelectCategory={setSelectedCategory}

                />

              )
            }







            {
              tab === "stores" && (

                <StoresView

                  onSelectStore={(store)=>console.log(store)}

                />

              )
            }







            {
              tab === "profile" && (

                <ProfileView />

              )
            }







            <BottomNav

              active={tab}

              onChange={setTab}

            />


          </>

        )
      }



    </>

  );

}
