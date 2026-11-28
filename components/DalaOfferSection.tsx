"use client";
import { useEffect, useState } from "react";
const endsAt = new Date("2026-12-05T03:25:00+03:00").getTime();
const offers = [
 { name:"Regular", main:5000, offer:3750, slug:"regular", note:"General admission" },
 { name:"VIP", main:10000, offer:7500, slug:"vip", note:"Premium festival access" },
 { name:"VVIP", main:25000, offer:18750, slug:"vvip", note:"Elevated festival experience" }
];
const money=(v:number)=>new Intl.NumberFormat("en-KE",{style:"currency",currency:"KES",maximumFractionDigits:0}).format(v);
export default function DalaOfferSection(){
 const [remaining,setRemaining]=useState(endsAt-Date.now());
 useEffect(()=>{const update=()=>setRemaining(Math.max(0,endsAt-Date.now()));update();const timer=window.setInterval(update,1000);return()=>window.clearInterval(timer);},[]);
 if(remaining<=0)return null;
 const days=Math.floor(remaining/86400000),hours=Math.floor(remaining%86400000/3600000),minutes=Math.floor(remaining%3600000/60000),seconds=Math.floor(remaining%60000/1000);
 return <section id="independent-offer" aria-label="Independent Dala Festival ticket offer" style={{background:"linear-gradient(135deg,#17130d,#242018)",borderTop:"1px solid #6b542f",borderBottom:"1px solid #6b542f",padding:"clamp(38px,6vw,72px) 24px"}}>
  <div style={{maxWidth:1180,margin:"0 auto"}}>
   <div style={{textAlign:"center",maxWidth:760,margin:"0 auto 30px"}}>
    <p style={{color:"#e7b85c",fontSize:12,fontWeight:900,letterSpacing:3}}>A SEPARATE, LIMITED-TIME TICKET OFFER</p>
    <h2 style={{color:"#fff8e9",fontSize:"clamp(30px,5vw,48px)",lineHeight:1.08,margin:"12px 0"}}>Your Dala experience. <em style={{color:"#e7b85c"}}>A special way in.</em></h2>
    <p style={{color:"#c8c0b2",lineHeight:1.7,margin:"0 auto"}}>Three ticket categories, offered separately from the main ticket prices for a limited time.</p>
   </div>
   <div style={{display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap",marginBottom:28}}>
    <span style={{color:"#e7b85c",fontSize:11,letterSpacing:2,fontWeight:900,alignSelf:"center"}}>OFFER ENDS IN</span>
    {[["DAYS",days],["HRS",hours],["MIN",minutes],["SEC",seconds]].map(([label,value])=><div key={label} style={{minWidth:66,background:"#090a0d",border:"1px solid #5b4b2f",borderRadius:10,padding:"10px 12px",textAlign:"center"}}><strong style={{color:"#fff",fontSize:25,display:"block",fontVariantNumeric:"tabular-nums"}}>{String(value).padStart(2,"0")}</strong><small style={{color:"#b9ad98",fontSize:9,letterSpacing:1}}>{label}</small></div>)}
   </div>
   <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
    {offers.map(offer=><article key={offer.name} style={{background:"#0d0e12",border:"1px solid #5b4b2f",borderRadius:16,padding:22,textAlign:"center"}}>
     <p style={{color:"#b9ad98",fontSize:11,fontWeight:800,letterSpacing:2}}>{offer.name.toUpperCase()}</p>
     <p style={{color:"#8f887c",textDecoration:"line-through",margin:"12px 0 4px",fontSize:14}}>Main price {money(offer.main)}</p>
     <strong style={{color:"#e7b85c",fontSize:30}}>{money(offer.offer)}</strong>
     <p style={{color:"#b9ad98",fontSize:12}}>{offer.note}</p>
     <a href={`/?ticket=${offer.slug}&offer=DALA75#tickets`} style={{display:"inline-flex",marginTop:12,borderRadius:999,padding:"12px 20px",background:"#e7b85c",color:"#17130d",textDecoration:"none",fontWeight:900,fontSize:13}}>Choose {offer.name}</a>
    </article>)}
   </div>
  </div>
 </section>;
}
