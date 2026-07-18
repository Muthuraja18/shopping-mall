import { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { supabase } from "../lib/supabase";

interface Props {
  onLogin: () => void;
}

export default function Register({ onLogin }: Props) {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [show,setShow]=useState(false);
  const [loading,setLoading]=useState(false);

  async function handleRegister(){

    if(!email || !password){
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    const {error}=await supabase.auth.signUp({

      email,

      password,

      options:{
        data:{
          full_name:name
        }
      }

    });

    setLoading(false);

    if(error){
      alert(error.message);
      return;
    }

    alert("Registration Successful");

    onLogin();

  }

  return(

<div className="min-h-screen bg-black flex items-center justify-center px-6">

<motion.div

initial={{opacity:0,scale:.9}}

animate={{opacity:1,scale:1}}

className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"

>

<h1 className="text-4xl font-bold text-center text-white">

Create Account

</h1>

<p className="text-center mt-3 text-neutral-400">

Join LUXE Membership

</p>

<div className="space-y-5 mt-8">

<div className="relative">

<User className="absolute left-4 top-4 text-neutral-500"/>

<input

className="w-full bg-neutral-900 rounded-xl py-4 pl-12"

placeholder="Full Name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>

</div>

<div className="relative">

<Mail className="absolute left-4 top-4 text-neutral-500"/>

<input

className="w-full bg-neutral-900 rounded-xl py-4 pl-12"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>

</div>

<div className="relative">

<Lock className="absolute left-4 top-4 text-neutral-500"/>

<input

type={show?"text":"password"}

className="w-full bg-neutral-900 rounded-xl py-4 pl-12 pr-12"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>

<button

onClick={()=>setShow(!show)}

className="absolute right-4 top-4 text-neutral-500"

>

{show?<EyeOff/>:<Eye/>}

</button>

</div>

<motion.button

whileHover={{scale:1.03}}

whileTap={{scale:.95}}

onClick={handleRegister}

disabled={loading}

className="w-full rounded-xl py-4 bg-white text-black font-semibold flex items-center justify-center gap-2"

>

{loading?"Creating...":"Create Account"}

<ArrowRight size={18}/>

</motion.button>

</div>

<p className="text-center text-neutral-400 mt-8">

Already have an account?

<button

onClick={onLogin}

className="ml-2 text-white font-semibold"

>

Login

</button>

</p>

</motion.div>

</div>

);

}