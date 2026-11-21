"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Order = { order_reference:string; customer_name:string; email:string|null; phone:string; ticket_type:string; quantity:number; amount_kes:number; payment_status:string|null; payment_provider:string|null; mpesa_receipt_number:string|null; paypal_order_id:string|null; created_at:string|null; paid_at:string|null };
type Data = { summary:{totalOrders:number;paidOrders:number;pendingOrders:number;failedOrders:number;totalTicketsSold:number;revenueKes:number}; providers:{provider:string;paidOrders:number;revenueKes:number}[]; ticketSales:{ticketType:string;quantity:number;revenueKes:number}[]; orders:Order[] };
const kes = (value:number) => new Intl.NumberFormat("en-KE",{style:"currency",currency:"KES",maximumFractionDigits:0}).format(value);
export default function AdminDashboard() {
  const router=useRouter(); const [data,setData]=useState<Data|null>(null); const [error,setError]=useState(""); const [search,setSearch]=useState(""); const [status,setStatus]=useState("all"); const [loading,setLoading]=useState(true);
  async function load(){setLoading(true);setError("");try{const r=await fetch("/api/admin/orders",{cache:"no-store"});if(r.status===401){router.replace("/admin/login");return;}const d=await r.json();if(!r.ok)throw new Error(d.error||"Could not load orders.");setData(d);}catch(e){setError(e instanceof Error?e.message:"Could not load dashboard.");}finally{setLoading(false);}}
  useEffect(()=>{void load();},[]);
  async function logout(){await fetch("/api/admin/logout",{method:"POST"});router.replace("/admin/login");router.refresh();}
  const orders=useMemo(()=> (data?.orders||[]).filter(o=>(status==="all"||o.payment_status===status)&&[o.order_reference,o.customer_name,o.phone,o.email||"",o.mpesa_receipt_number||"",o.paypal_order_id||""].join(" ").toLowerCase().includes(search.toLowerCase())),[data,search,status]);
  const card=(label:string,value:string,detail:string)=><div style={{padding:20,border:"1px solid #29364a",borderRadius:15,background:"#111b2b"}}><p style={{margin:"0 0 8px",color:"#aab7ca",fontSize:13}}>{label}</p><strong style={{fontSize:26}}>{value}</strong><p style={{margin:"7px 0 0",color:"#8292a9",fontSize:12}}>{detail}</p></div>;
  return <main style={{minHeight:"100vh",background:"#080d16",color:"#f5f7fb",padding:"28px clamp(16px,4vw,52px)",fontFamily:"Manrope, sans-serif"}}>
    <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,flexWrap:"wrap",marginBottom:30}}><div><p style={{color:"#d7a84b",fontSize:12,fontWeight:800,letterSpacing:2}}>Dala Festival · Sales overview</p><h1 style={{fontSize:30,margin:"5px 0"}}>Ticket sales dashboard</h1><p style={{color:"#9baac0",margin:0}}>View-only dashboard · All-time totals · Latest 1,000 orders below</p></div><div style={{display:"flex",gap:10}}><button onClick={()=>void load()} style={btn}>Refresh</button><button onClick={()=>void logout()} style={btn}>Sign out</button></div></header>
    {error&&<p role="alert" style={{color:"#ff9d9d"}}>{error}</p>}{loading&&!data?<p>Loading ticket records…</p>:data&&<>
    <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:14,marginBottom:28}}>
      {card("Tickets sold",String(data.summary.totalTicketsSold),"All paid ticket quantities")}
      {card("Amount collected",kes(data.summary.revenueKes),"All verified paid orders")}
      {card("Paid orders",String(data.summary.paidOrders),"Automatically verified")}
      {card("Pending orders",String(data.summary.pendingOrders),"Awaiting provider response")}
      {card("Failed orders",String(data.summary.failedOrders),"Payment not completed")}
      {card("All orders",String(data.summary.totalOrders),"Entire order history")}
    </section>
    <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:14,marginBottom:28}}>
      {data.providers.map(p=><div key={p.provider} style={{padding:18,border:"1px solid #29364a",borderRadius:14,background:"#0e1725"}}><h2 style={{fontSize:15,marginTop:0}}>{p.provider}</h2><strong style={{fontSize:22}}>{kes(p.revenueKes)}</strong><p style={{color:"#9baac0",marginBottom:0}}>{p.paidOrders} confirmed orders</p></div>)}
    </section>
    <section style={{marginBottom:28}}><h2 style={{fontSize:20}}>Ticket sales by category</h2><div style={{overflowX:"auto",border:"1px solid #29364a",borderRadius:12}}><table style={table}><thead><tr><th>Category</th><th>Tickets sold</th><th>Confirmed revenue</th></tr></thead><tbody>{data.ticketSales.map(t=><tr key={t.ticketType}><td>{t.ticketType}</td><td>{t.quantity}</td><td>{kes(t.revenueKes)}</td></tr>)}</tbody></table></div></section>
    <section><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap",marginBottom:12}}><h2 style={{fontSize:20}}>Recent orders</h2><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, phone, reference…" style={{padding:11,borderRadius:8,border:"1px solid #35445b",background:"#111b2b",color:"#fff",minWidth:230}}/><select value={status} onChange={e=>setStatus(e.target.value)} style={{padding:11,borderRadius:8,background:"#111b2b",color:"#fff",border:"1px solid #35445b"}}><option value="all">All statuses</option><option value="paid">Paid</option><option value="pending">Pending</option><option value="failed">Failed</option></select></div>
    <div style={{overflowX:"auto",border:"1px solid #29364a",borderRadius:12}}><table style={table}><thead><tr><th>Order / Date</th><th>Customer</th><th>Contact</th><th>Ticket</th><th>Amount</th><th>Provider</th><th>Status</th><th>Receipt / PayPal ID</th></tr></thead><tbody>{orders.map(o=><tr key={o.order_reference}><td>{o.order_reference}<small style={{display:"block",color:"#8493a9"}}>{o.created_at?new Date(o.created_at).toLocaleString("en-KE"):"—"}</small></td><td>{o.customer_name}</td><td>{o.phone}<small style={{display:"block",color:"#8493a9"}}>{o.email||"—"}</small></td><td>{o.ticket_type} × {o.quantity}</td><td>{kes(Number(o.amount_kes))}</td><td>{o.payment_provider||"—"}</td><td><span style={{color:o.payment_status==="paid"?"#7be0aa":o.payment_status==="failed"?"#ff9d9d":"#f1ca79"}}>{o.payment_status||"unknown"}</span></td><td>{o.mpesa_receipt_number||o.paypal_order_id||"—"}</td></tr>)}</tbody></table>{orders.length===0&&<p style={{padding:20,color:"#9baac0"}}>No matching orders.</p>}</div>
    </section></>}
    <footer style={{marginTop:32,color:"#77869b",fontSize:12}}>View-only administrator dashboard. Payment results are verified automatically; this dashboard has no payment-approval controls. Handle customer information confidentially.</footer>
  </main>;
}
const btn={padding:"11px 16px",borderRadius:9,border:"1px solid #35445b",background:"#152236",color:"#f5f7fb",cursor:"pointer"};
const table={width:"100%",borderCollapse:"collapse" as const,minWidth:1000,textAlign:"left" as const};
