"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Sign-in failed.");
      router.replace("/admin"); router.refresh();
    } catch (e) { setError(e instanceof Error ? e.message : "Sign-in failed."); }
    finally { setBusy(false); }
  }
  return <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:24,background:"#080d16",color:"#f7f8fb"}}>
    <form onSubmit={submit} style={{width:"100%",maxWidth:420,padding:32,border:"1px solid #273348",borderRadius:20,background:"#111a29",display:"grid",gap:16}}>
      <a href="/" style={{color:"#b8c5d9",textDecoration:"none"}}>← Dala Festival</a>
      <div><p style={{color:"#d7a84b",letterSpacing:2,fontSize:12,fontWeight:700}}>RESTRICTED AREA</p><h1 style={{fontSize:28,margin:"8px 0"}}>Administrator sign in</h1><p style={{color:"#aab7ca",margin:0}}>Access ticket sales and payment monitoring.</p></div>
      <label style={{display:"grid",gap:7}}>Email<input type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)} style={field}/></label>
      <label style={{display:"grid",gap:7}}>Password<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} style={field}/></label>
      {error && <p role="alert" style={{color:"#ff9d9d",margin:0}}>{error}</p>}
      <button disabled={busy} style={{padding:14,border:0,borderRadius:10,background:"#d7a84b",color:"#101722",fontWeight:800,cursor:"pointer"}}>{busy?"Signing in…":"Sign in securely"}</button>
      <small style={{color:"#8795aa"}}>Administrator access only. Sessions expire after 12 hours.</small>
    </form>
  </main>;
}
const field = {width:"100%",boxSizing:"border-box" as const,padding:13,borderRadius:9,border:"1px solid #3a4960",background:"#0b1320",color:"#fff",fontSize:16};
