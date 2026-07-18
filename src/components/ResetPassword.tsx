import { useState } from "react";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "../lib/supabase";


interface Props {
  onSuccess: () => void;
}


export default function ResetPassword({onSuccess}: Props){

const [password,setPassword]=useState("");
const [confirm,setConfirm]=useState("");

const [show,setShow]=useState(false);
const [loading,setLoading]=useState(false);



async function handleUpdate(){

if(!password || !confirm){
alert("Fill all fields");
return;
}


if(password !== confirm){
alert("Passwords do not match");
return;
}


setLoading(true);


const {error}=await supabase.auth.updateUser({

password

});


setLoading(false);


if(error){

alert(error.message);
return;

}


alert("Password updated successfully");


onSuccess();


}





return (

<div className="
min-h-screen
bg-black
flex
items-center
justify-center
px-6
">


<motion.div

initial={{
opacity:0,
scale:.9
}}

animate={{
opacity:1,
scale:1
}}

className="
w-full
max-w-md
bg-white/5
border
border-white/10
backdrop-blur-xl
rounded-3xl
p-8
"

>


<h1 className="
text-3xl
font-bold
text-white
text-center
">

Create New Password

</h1>


<p className="
text-neutral-400
text-center
mt-3
">

Enter your new password

</p>



<div className="relative mt-8">

<Lock className="
absolute
left-4
top-4
text-neutral-500
"/>


<input

type={show ? "text":"password"}

placeholder="New Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="
w-full
bg-neutral-900
text-white
rounded-xl
py-4
pl-12
pr-12
outline-none
"

/>


<button

onClick={()=>setShow(!show)}

className="
absolute
right-4
top-4
text-neutral-500
"

>

{
show
?
<EyeOff/>
:
<Eye/>
}

</button>


</div>




<div className="relative mt-5">

<Lock className="
absolute
left-4
top-4
text-neutral-500
"/>


<input

type="password"

placeholder="Confirm Password"

value={confirm}

onChange={(e)=>setConfirm(e.target.value)}

className="
w-full
bg-neutral-900
text-white
rounded-xl
py-4
pl-12
outline-none
"

/>

</div>




<button

onClick={handleUpdate}

disabled={loading}

className="
mt-6
w-full
bg-white
text-black
rounded-xl
py-4
font-semibold
"

>

{
loading
?
"Updating..."
:
"Update Password"
}


</button>



</motion.div>


</div>

);

}