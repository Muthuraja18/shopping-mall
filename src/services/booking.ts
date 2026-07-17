import {supabase} from "../lib/supabase";



export async function getBookings(){


const {
data:{
user
}

}=await supabase.auth.getUser();



if(!user)
return [];



const {data,error}=await supabase
.from("bookings")
.select("*")
.eq("user_id",user.id);



if(error)
throw error;


return data;


}





export async function createBooking(
store_name:string,
type:string,
date:string,
time:string,
notes:string
){


const {
data:{
user
}

}=await supabase.auth.getUser();



if(!user)
throw new Error("Not logged in");



const {data,error}=await supabase
.from("bookings")
.insert({

user_id:user.id,

store_name,

type,

booking_date:date,

booking_time:time,

status:"confirmed",

notes

});



if(error)
throw error;



return data;


}
