import { supabase } from "../lib/supabase";


// Register

export async function registerUser(
name:string,
email:string,
password:string,
phone:string
){

const {data,error}=await supabase.auth.signUp({

email,
password

});


if(error)
throw error;


if(data.user){

await supabase
.from("profiles")
.insert({

id:data.user.id,
name,
email,
phone

});

}


return data;

}




// Login

export async function loginUser(
email:string,
password:string
){

const {data,error}=await supabase.auth.signInWithPassword({

email,
password

});


if(error)
throw error;


return data;

}




// Logout

export async function logoutUser(){

await supabase.auth.signOut();

}
