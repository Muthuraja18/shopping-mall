import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Sparkles
} from "lucide-react";

import { supabase } from "../lib/supabase";


export default function RegisterForm(){


const [name,setName] = useState("");

const [email,setEmail] = useState("");

const [phone,setPhone] = useState("");

const [password,setPassword] = useState("");

const [error,setError] = useState("");

const [success,setSuccess] = useState("");

const [loading,setLoading] = useState(false);





async function handleRegister(
e:FormEvent
){

e.preventDefault();


setError("");

setSuccess("");



if(
!name ||
!email ||
!phone ||
!password
){

setError(
"Please fill all fields"
);

return;

}




try{


setLoading(true);




// CREATE AUTH USER

const {

data,

error:authError

}=await supabase.auth.signUp({

email,

password

});




if(authError){

setError(
authError.message
);

return;

}





if(data.user){



// CREATE PROFILE RECORD


const {

error:profileError

}=await supabase

.from("profiles")

.insert({

id:data.user.id,

name,

email,

phone,

tier:"Signature",

points:500,

card_id:
"LUXE-"+Date.now(),

valet_code:
"VIP-"+Math.floor(
1000 + Math.random()*9000
)


});





if(profileError){

setError(
profileError.message
);

return;

}





setSuccess(
"Account created successfully"
);


}



}
catch(err:any){


setError(
err.message
);


}
finally{


setLoading(false);


}



}








return (

<div
className="
min-h-screen
flex
items-center
justify-center
bg-neutral-50
px-5
py-10
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
w-full
max-w-md
bg-white
rounded-3xl
shadow-xl
border
border-neutral-200
p-8
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
mx-auto
w-14
h-14
rounded-2xl
bg-black
flex
items-center
justify-center
mb-4
"
>


<Sparkles

className="
w-7
h-7
text-amber-400
"

/>


</div>



<h1
className="
text-2xl
font-bold
tracking-widest
"
>

LUXE

</h1>



<p
className="
text-xs
uppercase
tracking-widest
text-neutral-400
mt-2
"
>

Create VIP Membership

</p>



</div>









<form

onSubmit={handleRegister}

className="
space-y-4
"

>





<div
className="
relative
"
>


<User
className="
absolute
left-4
top-3
w-5
h-5
text-neutral-400
"
/>


<input

value={name}

onChange={
(e)=>
setName(e.target.value)
}

placeholder="Full Name"

className="
w-full
rounded-xl
border
border-neutral-200
py-3
pl-12
text-sm
outline-none
focus:border-black
"

/>


</div>








<div
className="
relative
"
>


<Mail

className="
absolute
left-4
top-3
w-5
h-5
text-neutral-400
"

/>


<input

type="email"

value={email}

onChange={
(e)=>
setEmail(e.target.value)
}

placeholder="Email Address"

className="
w-full
rounded-xl
border
border-neutral-200
py-3
pl-12
text-sm
outline-none
focus:border-black
"

/>


</div>








<div
className="
relative
"
>


<Phone

className="
absolute
left-4
top-3
w-5
h-5
text-neutral-400
"

/>


<input

value={phone}

onChange={
(e)=>
setPhone(e.target.value)
}

placeholder="Phone Number"

className="
w-full
rounded-xl
border
border-neutral-200
py-3
pl-12
text-sm
outline-none
focus:border-black
"

/>


</div>









<div
className="
relative
"
>


<Lock

className="
absolute
left-4
top-3
w-5
h-5
text-neutral-400
"

/>



<input

type="password"

value={password}

onChange={
(e)=>
setPassword(e.target.value)
}

placeholder="Password"

className="
w-full
rounded-xl
border
border-neutral-200
py-3
pl-12
text-sm
outline-none
focus:border-black
"

/>


</div>








{
error &&

<div
className="
bg-red-50
text-red-500
rounded-xl
p-3
text-xs
"
>

{error}

</div>

}






{
success &&

<div
className="
bg-green-50
text-green-600
rounded-xl
p-3
text-xs
"
>

{success}

</div>

}







<button

disabled={loading}

className="
w-full
bg-black
text-white
rounded-xl
py-3
text-xs
uppercase
tracking-widest
hover:bg-neutral-800
transition
disabled:opacity-50
"

>


{
loading
?
"Creating Account..."
:
"Join Luxe"
}


</button>





</form>





</motion.div>


</div>

);


}
