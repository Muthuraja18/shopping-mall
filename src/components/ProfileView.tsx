import { 
  useEffect, 
  useState, 
  FormEvent 
} from "react";

import {
  Sparkles,
  Calendar,
  Clock,
  Award,
  Trash2,
  CheckCircle2,
  LogOut,
  User,
  Mail,
  Phone,
  Bell,
  Shield,
  KeyRound,
  ChevronRight,
} from "lucide-react";

import { motion } from "motion/react";

import { QRCodeSVG } from "qrcode.react";

import { supabase } from "../lib/supabase";


// ---------------- TABLES ----------------

const MEMBERS_TABLE = "members";
const BOOKINGS_TABLE = "bookings";
const POINTS_TABLE = "points_history";


// ---------------- TYPES ----------------

interface LuxeUser {

  id:string;

  user_id:string;

  email:string;

  name:string | null;

  phone:string | null;

  tier:string;

  points:number;

  card_id:string | null;

  member_since:string | null;

  expiry_date:string | null;

  valet_code:string | null;

  avatar_url:string | null;

}


interface Booking {

  id:string;

  type:string;

  storeName?:string;

  notes?:string;

  date:string;

  time:string;

  status:string;

}


interface PointHistory {

  id:string;

  points:number;

  reason:string;

  created_at:string;

}



// ---------------- PROPS ----------------

interface ProfileViewProps {

 onSignedOut?:()=>void;

 onEditProfile?:()=>void;

 onChangePassword?:()=>void;

 onNotificationSettings?:()=>void;

 onPrivacySettings?:()=>void;

}



// ---------------- COMPONENT ----------------


export default function ProfileView({

 onSignedOut,

 onEditProfile,

 onChangePassword,

 onNotificationSettings,

 onPrivacySettings,

}:ProfileViewProps){



const [loading,setLoading]=useState(true);

const [authUser,setAuthUser]=useState<any>(null);

const [member,setMember]=useState<LuxeUser|null>(null);


const [bookings,setBookings]=useState<Booking[]>([]);

const [pointsHistory,setPointsHistory]=useState<PointHistory[]>([]);



const [name,setName]=useState("");

const [phone,setPhone]=useState("");

const [saving,setSaving]=useState(false);

const [formError,setFormError]=useState("");



// ---------------- LOAD PROFILE ----------------


useEffect(()=>{

 loadProfile();

},[]);



async function loadProfile(){


setLoading(true);



const {

 data:userData

}=await supabase.auth.getUser();



const user=userData.user;


setAuthUser(user);



if(!user){

 setLoading(false);

 return;

}



// GET MEMBER


const {

 data:memberData,

 error

}=await supabase

.from(MEMBERS_TABLE)

.select("*")

.eq(
"user_id",
user.id
)

.maybeSingle();



if(error){

console.log(error.message);

}



setMember(memberData);



setName(
memberData?.name || ""
);


setPhone(
memberData?.phone || ""
);



// GET BOOKINGS


if(memberData){


const {

data:bookingData

}=await supabase

.from(BOOKINGS_TABLE)

.select("*")

.eq(
"member_id",
memberData.id
)

.order(
"date",
{
ascending:true
}
);


setBookings(
bookingData || []
);




// GET POINT HISTORY


const {

data:pointsData

}=await supabase

.from(POINTS_TABLE)

.select("*")

.eq(
"member_id",
memberData.id
)

.order(
"created_at",
{
ascending:false
}
);



setPointsHistory(
pointsData || []
);



}



setLoading(false);


}



// ---------------- CREATE PROFILE ----------------


async function handleCompleteProfile(
e:FormEvent
){


e.preventDefault();



if(!authUser)
return;



if(!name || !phone){

setFormError(
"Please fill all fields"
);

return;

}



setSaving(true);



const {

data,

error

}=await supabase

.from(MEMBERS_TABLE)

.insert({

user_id:authUser.id,

name,

email:authUser.email,

phone,

tier:"Signature",

points:0,

card_id:
`LX-${authUser.id
.slice(0,8)
.toUpperCase()}`,

valet_code:
Math.random()
.toString(36)
.slice(2,8)
.toUpperCase(),


member_since:
new Date()
.getFullYear()
.toString(),


expiry_date:
new Date(
Date.now()
+
365*24*60*60*1000
)
.toISOString()



})

.select()

.single();



setSaving(false);



if(error){

setFormError(
error.message
);

return;

}



setMember(data);



}




// ---------------- UPDATE PROFILE ----------------


async function updateProfile(){


if(!member)
return;



const {

error

}=await supabase

.from(MEMBERS_TABLE)

.update({

name,

phone

})

.eq(
"id",
member.id
);



if(!error){

loadProfile();

}



}




// ---------------- DELETE BOOKING ----------------


async function handleCancelBooking(
id:string
){


const {

error

}=await supabase

.from(BOOKINGS_TABLE)

.delete()

.eq(
"id",
id
);



if(error){

console.log(error.message);

return;

}



setBookings(prev=>
prev.filter(
item=>item.id!==id
)

);



}



// ---------------- SIGN OUT ----------------


async function handleSignOut(){


await supabase.auth.signOut();



setAuthUser(null);

setMember(null);

setBookings([]);



if(onSignedOut){

onSignedOut();

}

else{

window.location.reload();

}


}



// ---------------- PROFILE COMPLETION ----------------


const completion = member ?

[

member.name,

member.phone,

member.card_id,

member.valet_code

]

.filter(Boolean)

.length / 4 * 100

:0;



// ---------------- LOADING ----------------

if(loading){

return (

<div className="w-full flex flex-col items-center py-20">

<div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin"/>

<p className="text-xs text-neutral-400 mt-4 tracking-widest uppercase">
Loading Profile...
</p>

</div>

);

}



// ---------------- NOT LOGIN ----------------

if(!authUser){

return (

<div className="text-center py-20">

<p className="text-sm text-neutral-500">
Please login to view your profile.
</p>

</div>

);

}



// ---------------- COMPLETE PROFILE ----------------

if(!member){

return (

<div className="max-w-md mx-auto px-5 py-10">


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
rounded-[32px]
border
border-neutral-100
p-8
shadow-sm
"


>


<div className="text-center mb-8">


<div className="
w-12
h-12
bg-black
rounded-full
flex
items-center
justify-center
mx-auto
mb-4
">

<Sparkles className="text-amber-400 w-5 h-5"/>

</div>


<h1 className="
text-xl
font-semibold
">

Activate Membership

</h1>


<p className="
text-xs
text-neutral-500
mt-2
">

Complete your profile to create your Luxe Pass.

</p>


</div>



<form
onSubmit={handleCompleteProfile}
className="space-y-4"
>



<input

value={name}

onChange={
e=>setName(e.target.value)
}

placeholder="Full Name"

className="
w-full
bg-neutral-50
rounded-xl
px-4
py-3
text-sm
outline-none
"

/>



<input

value={authUser.email}

disabled

className="
w-full
bg-neutral-100
rounded-xl
px-4
py-3
text-sm
text-neutral-400
"

/>




<input

value={phone}

onChange={
e=>setPhone(e.target.value)
}

placeholder="Phone Number"

className="
w-full
bg-neutral-50
rounded-xl
px-4
py-3
text-sm
outline-none
"

/>



{
formError &&

<p className="
text-red-500
text-xs
text-center
">

{formError}

</p>

}




<button

disabled={saving}

className="
w-full
bg-black
text-white
py-4
rounded-xl
text-xs
uppercase
tracking-widest
"

>

{
saving
?
"Creating..."
:
"Create Luxe Pass"
}


</button>


</form>


</motion.div>


</div>


);

}




// ---------------- DASHBOARD ----------------


return (

<div className="
max-w-5xl
mx-auto
px-5
py-5
space-y-10
">


{/* MEMBER CARD */}


<motion.div


initial={{
opacity:0,
scale:.95
}}

animate={{
opacity:1,
scale:1
}}

whileHover={{
scale:1.02
}}


className="
relative
max-w-md
mx-auto
aspect-[1.6/1]
rounded-3xl
overflow-hidden
p-6
text-white
bg-gradient-to-br
from-neutral-900
via-stone-900
to-black
shadow-xl
"


>



<div className="
absolute
w-60
h-60
bg-neutral-700
rounded-full
blur-3xl
opacity-30
right-0
top-0
"/>



<div className="
flex
justify-between
items-start
relative
z-10
">


<div>

<p className="
text-[9px]
tracking-widest
text-neutral-400
">

VIP DIGITAL PASS

</p>


<h2 className="
text-xl
font-bold
tracking-widest
">

LUXE

</h2>


</div>




<div className="text-right">


<span className="
text-[10px]
border
border-amber-500/40
text-amber-400
px-3
py-1
rounded-full
">

{member.tier}

</span>


<p className="
text-[8px]
text-neutral-400
mt-2
font-mono
">

{member.card_id}

</p>


</div>


</div>





<div className="
flex
justify-between
items-center
relative
z-10
my-5
">



<div>


<p className="
text-[9px]
text-neutral-400
uppercase
">

Points Balance

</p>


<p className="
text-2xl
font-semibold
">

{member.points.toLocaleString()}

PTS

</p>


</div>





<div className="
bg-white
rounded-xl
p-2
">


<QRCodeSVG

value={
member.card_id || member.id
}

size={50}

/>


</div>


</div>






<div className="
flex
justify-between
relative
z-10
">


<div>

<p className="
text-[9px]
text-neutral-400
">

CARD HOLDER

</p>


<p className="
text-xs
uppercase
font-semibold
">

{member.name}

</p>


</div>



<div className="text-right">


<p className="
text-[9px]
text-neutral-400
">

VALID UNTIL

</p>


<p className="
text-xs
font-semibold
">

{
member.expiry_date
?
new Date(member.expiry_date)
.toLocaleDateString()
:
"N/A"
}


</p>


</div>



</div>


</motion.div>






{/* PROFILE COMPLETION */}


<div className="
bg-white
border
border-neutral-100
rounded-2xl
p-6
">


<div className="
flex
justify-between
mb-3
">


<h3 className="text-sm font-semibold">

Profile Completion

</h3>


<span className="text-xs">

{Math.round(completion)}%

</span>


</div>



<div className="
h-2
bg-neutral-100
rounded-full
overflow-hidden
">


<div

className="
h-full
bg-black
rounded-full
transition-all
"

style={{
width:`${completion}%`
}}

/>


</div>


</div>






{/* TIER PROGRESS */}


<div className="
bg-white
border
border-neutral-100
rounded-2xl
p-6
">


<div className="
flex
justify-between
mb-4
">


<h3 className="text-sm font-semibold">

Tier Progress

</h3>


<span className="
text-xs
text-amber-500
">

{
Math.round(
(member.points/10000)*100
)
}%

</span>


</div>



<div className="
h-2
bg-neutral-100
rounded-full
">


<div

className="
h-full
bg-black
rounded-full
"

style={{

width:
`${Math.min(
100,
member.points/100
)}%`

}}

/>


</div>


<div className="
flex
justify-between
text-[10px]
text-neutral-400
mt-3
">

<span>SIGNATURE</span>
<span>ELITE</span>
<span>PRESTIGE</span>
<span>INNER CIRCLE</span>


</div>


</div>






{/* BOOKINGS */}


<div>


<h2 className="
text-xs
tracking-widest
uppercase
text-neutral-400
mb-4
">

Active Reservations ({bookings.length})

</h2>




{

bookings.length===0

?

<div className="
bg-white
border
rounded-2xl
p-10
text-center
">

<p className="text-xs text-neutral-400">

No active reservations

</p>


</div>


:

<div className="space-y-4">


{

bookings.map((booking)=>(


<div

key={booking.id}

className="
bg-white
border
rounded-2xl
p-5
flex
justify-between
items-center
"


>


<div>


<h4 className="
text-sm
font-semibold
">

{
booking.storeName ||
"Luxe Terminal"
}

</h4>



<div className="
flex
gap-4
text-xs
text-neutral-500
mt-2
">


<span className="flex gap-1">

<Calendar size={14}/>

{booking.date}

</span>


<span className="flex gap-1">

<Clock size={14}/>

{booking.time}

</span>


</div>



</div>




<button

onClick={()=>handleCancelBooking(booking.id)}

className="
text-neutral-400
hover:text-red-500
"

>

<Trash2 size={18}/>

</button>



</div>


))


}


</div>


}



</div>

// ---------------- POINT HISTORY ----------------

<div className="
bg-white
border
border-neutral-100
rounded-2xl
p-6
">

<h3 className="
text-xs
uppercase
tracking-widest
text-neutral-400
mb-5
">

Points History

</h3>


{

pointsHistory.length === 0

?

<p className="
text-xs
text-neutral-400
">

No points activity yet.

</p>


:

<div className="space-y-4">


{

pointsHistory.map(item=>(


<div

key={item.id}

className="
flex
justify-between
items-center
border-b
pb-3
last:border-none
"


>


<div>


<p className="
text-sm
font-medium
">

{item.reason}

</p>


<p className="
text-[10px]
text-neutral-400
">

{
new Date(
item.created_at
)
.toLocaleDateString()
}

</p>


</div>



<span className="
text-green-600
text-sm
font-semibold
">

+
{item.points}

</span>


</div>


))


}


</div>


}


</div>







{/* ACCOUNT + SETTINGS */}


<div className="
grid
grid-cols-1
md:grid-cols-2
gap-8
">





{/* ACCOUNT DETAILS */}


<div className="
bg-white
border
border-neutral-100
rounded-2xl
p-6
space-y-5
">


<h3 className="
text-xs
uppercase
tracking-widest
text-neutral-400
">

Account Details

</h3>





<div className="
flex
items-center
gap-4
">


<div className="
w-14
h-14
rounded-full
bg-neutral-900
flex
items-center
justify-center
text-white
font-bold
">

{
member.name
?.charAt(0)
}

</div>



<div>


<p className="
text-sm
font-semibold
">

{member.name}

</p>


<p className="
text-xs
text-neutral-400
">

{member.email}

</p>


</div>


</div>





<div className="
space-y-4
">



<div className="
flex
gap-3
items-center
">

<div className="
w-8
h-8
bg-neutral-100
rounded-lg
flex
items-center
justify-center
">

<User size={15}/>

</div>


<div>

<p className="
text-[10px]
text-neutral-400
uppercase
">

Name

</p>


<p className="
text-sm
">

{member.name}

</p>


</div>


</div>







<div className="
flex
gap-3
items-center
">

<div className="
w-8
h-8
bg-neutral-100
rounded-lg
flex
items-center
justify-center
">

<Mail size={15}/>

</div>


<div>

<p className="
text-[10px]
text-neutral-400
uppercase
">

Email

</p>


<p className="
text-sm
truncate
">

{member.email}

</p>


</div>


</div>






<div className="
flex
gap-3
items-center
">


<div className="
w-8
h-8
bg-neutral-100
rounded-lg
flex
items-center
justify-center
">

<Phone size={15}/>

</div>


<div>


<p className="
text-[10px]
text-neutral-400
uppercase
">

Phone

</p>


<p className="
text-sm
">

{member.phone}

</p>


</div>


</div>


</div>





<button

onClick={updateProfile}

className="
w-full
bg-black
text-white
rounded-xl
py-3
text-xs
uppercase
tracking-widest
"

>

Save Changes

</button>


</div>










{/* SETTINGS */}


<div className="
bg-white
border
border-neutral-100
rounded-2xl
p-6
space-y-2
">


<h3 className="
text-xs
uppercase
tracking-widest
text-neutral-400
mb-4
">

Settings

</h3>




<button

onClick={onChangePassword}

className="
w-full
flex
items-center
gap-3
p-3
hover:bg-neutral-50
rounded-xl
"

>


<KeyRound size={18}/>


<span className="text-sm flex-1 text-left">

Change Password

</span>


<ChevronRight size={16}/>


</button>







<button

onClick={onNotificationSettings}

className="
w-full
flex
items-center
gap-3
p-3
hover:bg-neutral-50
rounded-xl
"

>


<Bell size={18}/>


<span className="text-sm flex-1 text-left">

Notifications

</span>


<ChevronRight size={16}/>


</button>







<button

onClick={onPrivacySettings}

className="
w-full
flex
items-center
gap-3
p-3
hover:bg-neutral-50
rounded-xl
"

>


<Shield size={18}/>


<span className="text-sm flex-1 text-left">

Privacy & Security

</span>


<ChevronRight size={16}/>


</button>







<button

onClick={handleSignOut}

className="
mt-5
w-full
flex
items-center
justify-center
gap-2
bg-neutral-100
py-3
rounded-xl
text-xs
uppercase
tracking-widest
"

>


<LogOut size={15}/>

Sign Out


</button>



</div>






</div>





</div>


);

}
