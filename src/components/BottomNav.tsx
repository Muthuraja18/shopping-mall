import {
  Home,
  Search,
  Store,
  User
} from "lucide-react";


interface Props {
 active:string;
 onChange:(tab:any)=>void;
}


export default function BottomNav({
 active,
 onChange
}:Props){

const items=[
 {
  id:"home",
  label:"Home",
  icon:Home
 },
 {
  id:"search",
  label:"Search",
  icon:Search
 },
 {
  id:"stores",
  label:"Stores",
  icon:Store
 },
 {
  id:"profile",
  label:"Profile",
  icon:User
 }
];


return (

<div className="
fixed
bottom-0
left-0
right-0
h-20
bg-white/90
backdrop-blur-xl
border-t
flex
justify-around
items-center
z-50
">


{
items.map(item=>{

const Icon=item.icon;


return (

<button
key={item.id}
onClick={()=>onChange(item.id)}
className={`
flex flex-col
items-center
gap-1
text-xs
transition
${active===item.id
?"text-black"
:"text-gray-400"}
`}
>


<Icon size={22}/>

<span>
{item.label}
</span>


</button>

)

})
}


</div>

)

}