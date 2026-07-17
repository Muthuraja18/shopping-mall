
import React, { useState, FormEvent } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { supabase } from "../lib/supabase";


interface LoginFormProps {
  onSwitchRegister?: () => void;
}


export default function LoginForm({
  onSwitchRegister
}: LoginFormProps) {


  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [error,setError] = useState("");

  const [loading,setLoading] = useState(false);



  async function handleLogin(
    e:FormEvent
  ){

    e.preventDefault();


    if(!email || !password){

      setError(
        "Email and password are required"
      );

      return;

    }



    setLoading(true);

    setError("");



    const {
      error
    } = await supabase.auth.signInWithPassword({

      email,

      password

    });



    if(error){

      setError(
        error.message
      );

    }



    setLoading(false);

  }





  return (

    <div
    className="
    w-full
    max-w-lg
    mx-auto
    px-5
    py-6
    "
    >



      <motion.div

      initial={{
        opacity:0,
        y:20
      }}

      animate={{
        opacity:1,
        y:0
      }}

      className="
      bg-white
      border
      border-neutral-100
      rounded-[32px]
      p-8
      shadow-sm
      "

      >



        <div
        className="
        text-center
        mb-8
        "
        >



          <div

          className="
          w-12
          h-12
          bg-neutral-950
          rounded-full
          flex
          items-center
          justify-center
          mx-auto
          mb-4
          "

          >

            <Sparkles
            className="
            w-5
            h-5
            text-amber-400
            "
            />

          </div>




          <h1
          className="
          text-xl
          font-semibold
          tracking-tight
          "
          >

            WELCOME BACK

          </h1>



          <p
          className="
          text-xs
          text-neutral-500
          mt-2
          "
          >

            Login to access your Luxe membership

          </p>


        </div>





        <form
        onSubmit={handleLogin}
        className="
        space-y-4
        "
        >



          <div>


            <label
            className="
            block
            text-[10px]
            uppercase
            tracking-widest
            text-neutral-400
            mb-1
            "
            >

              Email Address

            </label>



            <input

            type="email"

            value={email}

            onChange={
              e=>setEmail(e.target.value)
            }

            placeholder="name@example.com"

            className="
            w-full
            px-4
            py-3
            bg-neutral-50
            rounded-xl
            text-sm
            outline-none
            focus:bg-white
            focus:ring-1
            focus:ring-black
            "

            />

          </div>





          <div>


            <label
            className="
            block
            text-[10px]
            uppercase
            tracking-widest
            text-neutral-400
            mb-1
            "
            >

              Password

            </label>




            <input

            type="password"

            value={password}

            onChange={
              e=>setPassword(e.target.value)
            }


            placeholder="Enter password"


            className="
            w-full
            px-4
            py-3
            bg-neutral-50
            rounded-xl
            text-sm
            outline-none
            focus:bg-white
            focus:ring-1
            focus:ring-black
            "

            />


          </div>






          {
          error &&

          <p
          className="
          text-red-600
          text-xs
          text-center
          "
          >

            {error}

          </p>

          }





          <button

          disabled={loading}

          type="submit"

          className="
          w-full
          py-4
          bg-black
          hover:bg-neutral-900
          text-white
          rounded-xl
          text-xs
          font-semibold
          tracking-wider
          uppercase
          transition-all
          disabled:opacity-50
          "

          >

            {
            loading
            ?
            "Signing in..."
            :
            "Login to Luxe"
            }


          </button>





        </form>






        {
        onSwitchRegister &&

        <button

        onClick={onSwitchRegister}

        className="
        w-full
        mt-5
        text-xs
        text-neutral-500
        hover:text-black
        "

        >

          Don't have an account?
          <span
          className="
          ml-1
          font-semibold
          text-black
          "
          >
            Register
          </span>


        </button>

        }





      </motion.div>



    </div>

  );

}
