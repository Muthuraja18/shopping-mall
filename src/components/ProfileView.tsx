import { useEffect, useState } from "react";
import { QrCode, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";


export default function ProfileView(){


const [member,setMember]=useState<any>(null);

const [bookings,setBookings]=useState<any[]>([]);



useEffect(()=>{

loadProfile();

},[]);



async function loadProfile(){

const {
data:{
user
}
}=await supabase.auth.getUser();


if(!user) return;



const {
data:profile
}=await supabase

.from("profiles")

.select("*")

.eq(
"id",
user.id
)

.single();



setMember(profile);



const {
data
}=await supabase

.from("bookings")

.select("*")

.eq(
"user_id",
user.id
);



setBookings(data || []);


}





async function cancelBooking(id:string){


await supabase

.from("bookings")

.delete()

.eq(
"id",
id
);



setBookings(
prev =>
prev.filter(
b=>b.id!==id
)
);


}




async function logout(){

await supabase.auth.signOut();

}





if(!member)

return <p>Loading...</p>;





return (

<div className="
max-w-md
mx-auto
p-5
space-y-6
">


{/* MEMBER CARD */}

<div className="
bg-black
text-white
rounded-3xl
p-6
space-y-5
">


<div className="
flex
justify-between
">

<div>

<p className="text-xs text-gray-400">
LUXE MEMBER
</p>

<h2 className="text-xl font-bold">
{member.name}
</h2>

</div>


<QrCode/>

</div>



<p>
Tier : {member.tier}
</p>


<p>
Points : {member.points} PTS
</p>


<p className="text-xs">
{member.email}
</p>


</div>





{/* BOOKINGS */}

<div>


<h2 className="
font-bold
mb-3
">

Bookings

</h2>



{
bookings.map(
booking=>(

<div
key={booking.id}
className="
border
rounded-xl
p-4
mb-3
flex
justify-between
"
>


<div>

<p>
{booking.store_name}
</p>

<p className="text-xs">
{booking.booking_date}
</p>


</div>



<button
onClick={()=>
cancelBooking(booking.id)
}
>

<Trash2
className="text-red-500"
/>


</button>



</div>

)

)

}



</div>





<button

onClick={logout}

className="
bg-black
text-white
rounded-xl
px-5
py-3
"

>

Logout

</button>



</div>

);


}
