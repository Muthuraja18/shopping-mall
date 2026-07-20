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

import PrivacyPolicy from "./components/Privacypolicy";
import TermsOfService from "./components/Termsofservice";
import ContactUs from "./components/Contactus";
import Sustainability from "./components/Sustainability";
import type { InfoPageType } from "./components/HomeView";

import ConciergeChat from "./components/ConciergeChat";
import type { Message, BookingType } from "./types";


export default function App() {


  const [page, setPage] = useState<
    "landing" | "login" | "register" | "forgot" | "reset" | "home" | "privacy" | "terms" | "contact" | "sustainability"
  >("landing");



  const [tab, setTab] = useState<
    "home" | "search" | "stores" | "profile"
  >("home");



  const [selectedCategory, setSelectedCategory] = useState<
    "Fashion" | "Tech" | "Dining" | "Beauty" | "All"
  >("All");


  const [returnTab, setReturnTab] = useState<"home" | "search" | "stores" | "profile">("home");


  function handleNavigateInfo(infoPage: InfoPageType) {
    setReturnTab(tab);
    setPage(infoPage);
  }

  function handleBackFromInfo() {
    setPage("home");
    setTab(returnTab);
  }


  // ---- AI Concierge chat state -------------------------------------------
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [conciergeMessages, setConciergeMessages] = useState<Message[]>([]);
  const [isConciergeLoading, setIsConciergeLoading] = useState(false);
  const [conciergeInitialPrompt, setConciergeInitialPrompt] = useState<string | undefined>(undefined);

  function handleOpenConcierge(initialPrompt?: string) {
    setIsConciergeOpen(true);
    setConciergeInitialPrompt(initialPrompt);

    if (conciergeMessages.length === 0) {
      setConciergeMessages([
        {
          id: "welcome",
          sender: "ai",
          text: "Welcome to LUXE Mall. I'm delighted to assist — ask me about boutiques, events, or reserve a private experience.",
          timestamp: Date.now(),
        },
      ]);
    }
  }

  function handleCloseConcierge() {
    setIsConciergeOpen(false);
    setConciergeInitialPrompt(undefined);
  }

  async function handleSendMessage(text: string) {
    const userMessage: Message = {
      id: `${Date.now()}-user`,
      sender: "user",
      text,
      timestamp: Date.now(),
    };

    const nextMessages = [...conciergeMessages, userMessage];
    setConciergeMessages(nextMessages);
    setIsConciergeLoading(true);

    // Convert chat display messages into the {role, parts} shape server.ts expects
    const history = nextMessages.map((m) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    try {
      const res = await fetch("/server.ts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        id: `${Date.now()}-ai`,
        sender: "ai",
        text: data.reply,
        suggestions: data.suggestions,
        bookingOffer: data.bookingOffer,
        timestamp: Date.now(),
      };

      setConciergeMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Concierge request failed:", err);
      setConciergeMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          sender: "ai",
          text: "My apologies, I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsConciergeLoading(false);
    }
  }

  async function handleBookExperience(type: BookingType, storeName?: string) {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      alert("Please sign in to reserve an experience.");
      setIsConciergeOpen(false);
      setPage("login");
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      store_name: storeName || null,
      type,
      date: new Date().toISOString().slice(0, 10),
      time: "TBD",
      status: "confirmed",
    });

    if (error) {
      console.error("Failed to create booking:", error.message);
      alert("Something went wrong securing your reservation. Please try again.");
      return;
    }

    setConciergeMessages((prev) => [

      ...prev,

      {

        id: `${Date.now()}-confirm`,
        sender: "ai",
        text: `Wonderful — your ${type.replace("_", " ")}${storeName ? ` at ${storeName}` : ""} has been reserved. You'll find it under your Profile.`,
        timestamp: Date.now(),

      },

    ]);
  }




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
        page === "privacy" && (

          <PrivacyPolicy onBack={handleBackFromInfo} />

        )
      }


      {
        page === "terms" && (

          <TermsOfService onBack={handleBackFromInfo} />

        )
      }


      {
        page === "contact" && (

          <ContactUs onBack={handleBackFromInfo} />

        )
      }


      {
        page === "sustainability" && (

          <Sustainability onBack={handleBackFromInfo} />

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

                  onOpenConcierge={() => handleOpenConcierge()}

                  isMember={false}

                  onSwitchTab={setTab}

                  onNavigateInfo={handleNavigateInfo}

                />

              )
            }






            {
              tab === "search" && (

                <SearchView

                  onSelectStore={(store)=>console.log(store)}

                  onOpenConcierge={(prompt) => handleOpenConcierge(prompt)}

                  selectedCategory={selectedCategory}

                  onSelectCategory={setSelectedCategory}

                />

              )
            }







            {
              tab === "stores" && (

                <StoresView

                  onSelectStore={(store)=>console.log(store)}

                  onBookAmenity={(store) => handleOpenConcierge(`Book an experience at ${store.name}`)}

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


            <ConciergeChat

              isOpen={isConciergeOpen}

              onClose={handleCloseConcierge}

              messages={conciergeMessages}

              onSendMessage={handleSendMessage}

              isLoading={isConciergeLoading}

              onBookExperience={handleBookExperience}

              initialPrompt={conciergeInitialPrompt}

            />


          </>

        )
      }



    </>

  );

}
