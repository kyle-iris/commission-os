import { useState } from "react";
import Login from "./Login.jsx";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const REPS = [
  { id:"rep-1", name:"Marisol Vega", initials:"MV", color:"#0ea5e9", title:"Senior AE" },
  { id:"rep-2", name:"Derek Chu",    initials:"DC", color:"#a78bfa", title:"Account Executive" },
  { id:"rep-3", name:"Priya Nair",   initials:"PN", color:"#f472b6", title:"Account Executive" },
];

const PLAN_TYPES = [
  { key:"BASE_ENTRY",    label:"Entry Product",   color:"#a78bfa" },
  { key:"BASE_PREMIUM",  label:"Premium Product", color:"#f472b6" },
  { key:"PROJECT",       label:"Project",         color:"#fb923c" },
  { key:"MRR_EVERGREEN", label:"Evergreen MRR",   color:"#10b981" },
  { key:"MRR_ONE_TIME",  label:"One-Time MRR",    color:"#0ea5e9" },
  { key:"CHARGEBACK",    label:"Chargeback",      color:"#ef4444" },
];

const GLOBAL_PLAN = {
  BASE_ENTRY:    { rate:0.08, basis:"Gross Margin"  },
  BASE_PREMIUM:  { rate:0.10, basis:"Gross Margin"  },
  PROJECT:       { rate:0.10, basis:"Gross Profit"  },
  MRR_EVERGREEN: { rate:0.15, basis:"Monthly GP"    },
  MRR_ONE_TIME:  { rate:0.30, basis:"MRC"           },
  EXPANSION:     { rate:0.15, basis:"Delta MRR"     },
};

const INIT_REP_PLANS = {
  "rep-1":{ BASE_ENTRY:{rate:0.10,basis:"Gross Margin"},BASE_PREMIUM:{rate:0.12,basis:"Gross Margin"},PROJECT:{rate:0.10,basis:"Gross Profit"},MRR_EVERGREEN:{rate:0.20,basis:"Monthly GP"},MRR_ONE_TIME:{rate:0.30,basis:"MRC"},EXPANSION:{rate:0.15,basis:"Delta MRR"} },
  "rep-2":{ BASE_ENTRY:{rate:0.08,basis:"Gross Margin"},BASE_PREMIUM:{rate:0.10,basis:"Gross Margin"},PROJECT:{rate:0.10,basis:"Gross Profit"},MRR_EVERGREEN:{rate:0.15,basis:"Monthly GP"},MRR_ONE_TIME:{rate:0.30,basis:"MRC"},EXPANSION:{rate:0.18,basis:"Delta MRR"} },
  "rep-3":{ BASE_ENTRY:{rate:0.08,basis:"Gross Margin"},BASE_PREMIUM:{rate:0.10,basis:"Gross Margin"},PROJECT:{rate:0.12,basis:"Gross Profit"},MRR_EVERGREEN:{rate:0.15,basis:"Monthly GP"},MRR_ONE_TIME:{rate:0.30,basis:"MRC"},EXPANSION:{rate:0.15,basis:"Delta MRR"} },
};

const LINES = [
  { id:"L01",rep:"rep-1",period:"2025-03",basis:2100, rate:0.20,amount:420.00, source:"MRR_EVERGREEN",status:"payable",account:"Nexus Solutions"   },
  { id:"L02",rep:"rep-1",period:"2025-02",basis:2100, rate:0.20,amount:420.00, source:"MRR_EVERGREEN",status:"paid",   account:"Nexus Solutions"   },
  { id:"L03",rep:"rep-1",period:"2025-01",basis:2100, rate:0.20,amount:420.00, source:"MRR_EVERGREEN",status:"paid",   account:"Nexus Solutions"   },
  { id:"L04",rep:"rep-1",period:"2025-01",basis:32000,rate:0.10,amount:3200.00,source:"PROJECT",      status:"paid",   account:"Orion Logistics"   },
  { id:"L05",rep:"rep-1",period:"2025-03",basis:7500, rate:0.10,amount:750.00, source:"BASE_ENTRY",   status:"pending",account:"Clearview Tech"    },
  { id:"L06",rep:"rep-1",period:"2025-03",basis:32000,rate:0.10,amount:-1600.00,source:"CHARGEBACK",  status:"pending",account:"Orion Logistics"   },
  { id:"L07",rep:"rep-2",period:"2025-02",basis:18500,rate:0.10,amount:1850.00,source:"BASE_PREMIUM", status:"paid",   account:"Blue Ridge Tech"   },
  { id:"L08",rep:"rep-2",period:"2025-02",basis:9250, rate:0.10,amount:-925.00,source:"CHARGEBACK",   status:"pending",account:"Blue Ridge Tech"   },
  { id:"L09",rep:"rep-2",period:"2025-03",basis:9200, rate:0.08,amount:736.00, source:"BASE_ENTRY",   status:"payable",account:"Vantage Systems"   },
  { id:"L10",rep:"rep-3",period:"2025-01",basis:2600, rate:0.30,amount:780.00, source:"MRR_ONE_TIME", status:"paid",   account:"Sunbell Media"     },
  { id:"L11",rep:"rep-3",period:"2025-03",basis:14500,rate:0.12,amount:1740.00,source:"PROJECT",      status:"payable",account:"Kestrel Analytics" },
  { id:"L12",rep:"rep-3",period:"2025-02",basis:4200, rate:0.10,amount:420.00, source:"PROJECT",      status:"paid",   account:"Summit Brands"     },
];

const INIT_OVERRIDES = [
  { id:"OV1",rep:"rep-1",account:"Nexus Solutions",   type:"MRR_EVERGREEN",rate:0.20,basis:"Monthly GP",  reason:"Q1 deal incentive",    effective:"2025-01-01",expires:"2025-12-31",locked:false },
  { id:"OV2",rep:"rep-2",account:"Blue Ridge Tech",   type:"BASE_PREMIUM", rate:0.14,basis:"Gross Margin",reason:"New logo bonus",       effective:"2025-02-01",expires:"2025-06-30",locked:false },
  { id:"OV3",rep:"rep-3",account:"Kestrel Analytics", type:"PROJECT",      rate:0.12,basis:"Gross Profit",reason:"Strategic account",    effective:"2025-03-01",expires:null,         locked:true  },
];

const INIT_PAYROLLS = [
  { id:"GPR-001",period:"2025-01",check:"2025-02-05",status:"processed",reps:3,total:4295.00 },
  { id:"GPR-002",period:"2025-02",check:"2025-03-05",status:"processed",reps:3,total:1660.00 },
  { id:"GPR-003",period:"2025-03",check:"2025-04-04",status:"pending",  reps:3,total:2501.00 },
];

const QBO_LOG = [
  { id:"E1",qbo:"PAY-4821",account:"Nexus Solutions",  amount:2100, date:"Mar 1",  status:"ingested",lines:1 },
  { id:"E2",qbo:"PAY-4856",account:"Vantage Systems",  amount:9200, date:"Mar 3",  status:"ingested",lines:1 },
  { id:"E3",qbo:"PAY-4901",account:"Kestrel Analytics",amount:14500,date:"Mar 7",  status:"ingested",lines:1 },
  { id:"E4",qbo:"PAY-4933",account:"Blue Ridge Tech",  amount:4625, date:"Mar 10", status:"no_contract",lines:0 },
  { id:"E5",qbo:"PAY-4977",account:"Clearview Tech",   amount:7500, date:"Mar 14", status:"ingested",lines:1 },
];

const INIT_USERS = [
  { id:"U1",name:"Alex Rivera", email:"admin@co.com",  role:"admin",rep:null,   active:true },
  { id:"U2",name:"Marisol Vega",email:"marisol@co.com",role:"rep",  rep:"rep-1",active:true },
  { id:"U3",name:"Derek Chu",   email:"derek@co.com",  role:"rep",  rep:"rep-2",active:true },
  { id:"U4",name:"Priya Nair",  email:"priya@co.com",  role:"rep",  rep:"rep-3",active:true },
  { id:"U5",name:"Jordan Lee",  email:"jordan@co.com", role:"rep",  rep:null,   active:false},
];

const INIT_OPPORTUNITIES = [
  { id:"OPP-001",ghlId:"ghl_abc123",contact:"Acme Corporation",repName:"Marisol Vega",rep:"rep-1",value:25000,stage:"Won",pipelineId:"pipe_1",stageId:"stage_won",closedDate:"2025-03-15",commissionType:"BASE_PREMIUM",status:"synced",imported:false },
  { id:"OPP-002",ghlId:"ghl_def456",contact:"TechStart Inc",repName:"Derek Chu",rep:"rep-2",value:18000,stage:"Proposal Sent",pipelineId:"pipe_1",stageId:"stage_prop",closedDate:null,commissionType:"PROJECT",status:"pending",imported:false },
  { id:"OPP-003",ghlId:"ghl_ghi789",contact:"Global Systems",repName:"Priya Nair",rep:"rep-3",value:32000,stage:"Won",pipelineId:"pipe_1",stageId:"stage_won",closedDate:"2025-03-17",commissionType:"MRR_EVERGREEN",status:"synced",imported:false },
  { id:"OPP-004",ghlId:"ghl_jkl012",contact:"Innovation Labs",repName:"Marisol Vega",rep:"rep-1",value:15000,stage:"Negotiation",pipelineId:"pipe_1",stageId:"stage_neg",closedDate:null,commissionType:"BASE_ENTRY",status:"pending",imported:false },
  { id:"OPP-005",ghlId:"ghl_mno345",contact:"Enterprise Corp",repName:"Derek Chu",rep:"rep-2",value:45000,stage:"Won",pipelineId:"pipe_1",stageId:"stage_won",closedDate:"2025-03-10",commissionType:"PROJECT",status:"synced",imported:true },
  { id:"OPP-006",ghlId:"ghl_pqr678",contact:"StartupXYZ",repName:"Priya Nair",rep:"rep-3",value:8500,stage:"Qualified",pipelineId:"pipe_1",stageId:"stage_qual",closedDate:null,commissionType:"BASE_ENTRY",status:"pending",imported:false },
];

const INIT_INTEGRATIONS = {
  qbo: {
    enabled: false,
    // OAuth 2.0 Configuration
    clientId: "",
    clientSecret: "",
    realmId: "",
    accessToken: "",
    refreshToken: "",
    tokenExpiry: null,
    // Company Info
    companyName: "",
    environment: "sandbox", // sandbox or production
    // Webhook Configuration
    webhookUrl: "",
    webhookVerifierToken: "",
    // Sync Settings
    autoSync: true,
    syncFrequency: "hourly", // hourly, daily, manual
    syncInvoices: true,
    syncPayments: true,
    syncCustomers: true,
    lastSync: null,
    // API Endpoints
    apiBaseUrl: "https://sandbox-quickbooks.api.intuit.com",
    authBaseUrl: "https://appcenter.intuit.com/connect/oauth2"
  },
  gusto: {
    enabled: false,
    // OAuth 2.0 Configuration
    clientId: "",
    clientSecret: "",
    accessToken: "",
    refreshToken: "",
    tokenExpiry: null,
    // Company Info
    companyId: "",
    companyUuid: "",
    companyName: "",
    // Payroll Settings
    autoPayroll: false,
    payrollDay: 5, // Day of month
    payrollSchedule: "monthly", // weekly, bi-weekly, semi-monthly, monthly
    // Sync Settings
    syncEmployees: true,
    lastSync: null,
    // API Configuration
    apiBaseUrl: "https://api.gusto.com/v1",
    environment: "production" // demo or production
  },
  gohighlevel: {
    enabled: false,
    // API Configuration (GoHighLevel uses API Key, not OAuth)
    apiKey: "",
    locationId: "",
    // Company/Agency Info
    agencyName: "",
    locationName: "",
    // Sync Settings
    autoSync: true,
    syncFrequency: "hourly", // real-time, hourly, daily, manual
    syncOpportunities: true,
    syncContacts: true,
    // Pipeline Configuration
    pipelineId: "",
    pipelineName: "",
    winStageId: "", // Stage ID that counts as "won"
    // Field Mapping
    repFieldId: "", // Custom field ID for sales rep
    commissionTypeFieldId: "", // Custom field for commission type
    commissionAmountFieldId: "", // Custom field for commission amount
    // Filters
    dateRangeFilter: "closed_date", // closed_date or created_date
    minOpportunityValue: 0,
    lastSync: null,
    // API Configuration
    apiBaseUrl: "https://services.leadconnectorhq.com",
    webhookUrl: "",
    webhookSecret: ""
  }
};

// ─── UTILS ────────────────────────────────────────────────────────────────────
const $  = n => { const s=Math.abs(n).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}); return n<0?`-$${s}`:`$${s}`; };
const _p = r => `${(r*100).toFixed(1)}%`;

const STATUS = {
  paid:        { label:"Paid",        c:"#10b981", bg:"rgba(16,185,129,0.12)" },
  payable:     { label:"Payable",     c:"#f59e0b", bg:"rgba(245,158,11,0.12)" },
  pending:     { label:"Pending",     c:"#94a3b8", bg:"rgba(148,163,184,0.1)" },
  processed:   { label:"Processed",  c:"#10b981", bg:"rgba(16,185,129,0.12)" },
  ingested:    { label:"Ingested",    c:"#10b981", bg:"rgba(16,185,129,0.12)" },
  no_contract: { label:"No Contract",c:"#f59e0b", bg:"rgba(245,158,11,0.12)" },
  active:      { label:"Active",      c:"#10b981", bg:"rgba(16,185,129,0.12)" },
  inactive:    { label:"Inactive",    c:"#64748b", bg:"rgba(100,116,139,0.1)" },
  received:    { label:"Received",    c:"#10b981", bg:"rgba(16,185,129,0.12)" },
};

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const BG    = "#060b14";
const BG2   = "#0c1522";
const BG3   = "rgba(255,255,255,0.04)";
const BORD  = "rgba(255,255,255,0.07)";
const BORD2 = "rgba(255,255,255,0.04)";
const T1    = "#f1f5f9";
const T2    = "#64748b";
const T3    = "#2d3f52";
const MONO  = "'DM Mono',monospace";
const SANS  = "'DM Sans',sans-serif";

// ─── ATOMS ────────────────────────────────────────────────────────────────────
const Pill = ({s}) => {
  const m = STATUS[s] || {label:s,c:"#94a3b8",bg:"rgba(148,163,184,0.1)"};
  return <span style={{fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:20,letterSpacing:"0.06em",textTransform:"uppercase",color:m.c,background:m.bg,whiteSpace:"nowrap"}}>{m.label}</span>;
};

const TypeChip = ({src}) => {
  const t = PLAN_TYPES.find(x=>x.key===src)||{label:src,color:"#94a3b8"};
  return <span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:10,letterSpacing:"0.04em",textTransform:"uppercase",color:t.color,background:`${t.color}14`,whiteSpace:"nowrap"}}>{t.label}</span>;
};

const Tag = ({children,c="#64748b"}) =>
  <span style={{fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:6,letterSpacing:"0.06em",textTransform:"uppercase",color:c,background:`${c}14`,border:`1px solid ${c}22`}}>{children}</span>;

const Btn = ({children,color="#0ea5e9",onClick,sm,ghost,load}) =>
  <button onClick={onClick} disabled={!!load} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:5,fontSize:sm?10:11,fontWeight:700,padding:sm?"3px 10px":"6px 14px",borderRadius:sm?6:8,border:`1px solid ${color}33`,background:ghost?"transparent":`${color}16`,color,cursor:"pointer",opacity:load?0.55:1,letterSpacing:"0.01em",whiteSpace:"nowrap"}}>
    {load ? <span style={{display:"inline-block",width:10,height:10,border:`2px solid ${color}44`,borderTop:`2px solid ${color}`,borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/> : null}
    {load?"Running…":children}
  </button>;

const Card = ({children,s={}}) =>
  <div style={{background:BG3,border:`1px solid ${BORD}`,borderRadius:14,overflow:"hidden",...s}}>{children}</div>;

const CH = ({title,sub,accent="#0ea5e9",right}) =>
  <div style={{padding:"13px 18px",borderBottom:`1px solid ${BORD2}`,background:"rgba(255,255,255,0.02)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
    <div style={{display:"flex",alignItems:"center",gap:9}}>
      <div style={{width:3,height:15,borderRadius:2,background:accent,flexShrink:0}}/>
      <div><div style={{fontSize:13,fontWeight:600,color:T1}}>{title}</div>{sub&&<div style={{fontSize:10,color:T2,marginTop:1}}>{sub}</div>}</div>
    </div>
    {right&&<div style={{flexShrink:0}}>{right}</div>}
  </div>;

const SC = ({label,val,accent,sub,neg}) =>
  <div style={{background:BG3,border:`1px solid ${BORD}`,borderRadius:12,padding:"14px 16px",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:accent}}/>
    <div style={{fontSize:9,fontWeight:700,color:T3,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>{label}</div>
    <div style={{fontSize:22,fontWeight:700,color:neg?"#ef4444":T1,fontFamily:MONO,letterSpacing:"-0.02em"}}>{val}</div>
    {sub&&<div style={{fontSize:10,color:T2,marginTop:3}}>{sub}</div>}
  </div>;

const Tabs = ({tabs,active,set}) =>
  <div style={{display:"flex",gap:2,background:"rgba(255,255,255,0.03)",borderRadius:10,padding:3,width:"fit-content"}}>
    {tabs.map(t=><button key={t.id} onClick={()=>set(t.id)} style={{padding:"5px 14px",borderRadius:7,border:"none",cursor:"pointer",fontSize:11,fontWeight:600,background:active===t.id?"rgba(255,255,255,0.1)":"transparent",color:active===t.id?T1:T2,transition:"all 0.15s"}}>{t.label}</button>)}
  </div>;

const TH = ({cols,tmpl}) =>
  <div style={{display:"grid",gridTemplateColumns:tmpl,gap:10,padding:"8px 18px",background:"rgba(255,255,255,0.02)",borderBottom:`1px solid ${BORD2}`}}>
    {cols.map(c=><span key={c} style={{fontSize:9,fontWeight:700,color:T3,letterSpacing:"0.08em",textTransform:"uppercase"}}>{c}</span>)}
  </div>;

const TR = ({children,tmpl,last}) =>
  <div style={{display:"grid",gridTemplateColumns:tmpl,gap:10,padding:"11px 18px",alignItems:"center",borderBottom:last?"none":`1px solid ${BORD2}`,transition:"background 0.1s"}}
    onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.02)"}
    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
    {children}
  </div>;

// Slide-out drawer
const Drawer = ({open,onClose,title,sub,children}) => <>
  {open&&<div onClick={onClose} style={{position:"fixed",inset:0,zIndex:40,background:"rgba(0,0,0,0.65)",backdropFilter:"blur(4px)"}}/>}
  <div style={{position:"fixed",top:0,right:0,bottom:0,zIndex:50,width:440,background:BG2,borderLeft:`1px solid ${BORD}`,transform:open?"translateX(0)":"translateX(100%)",transition:"transform 0.24s cubic-bezier(0.4,0,0.2,1)",display:"flex",flexDirection:"column"}}>
    <div style={{padding:"18px 22px",borderBottom:`1px solid ${BORD}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexShrink:0}}>
      <div><div style={{fontSize:14,fontWeight:700,color:T1}}>{title}</div>{sub&&<div style={{fontSize:11,color:T2,marginTop:2}}>{sub}</div>}</div>
      <button onClick={onClose} style={{width:28,height:28,borderRadius:7,background:BG3,border:`1px solid ${BORD}`,color:T2,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>×</button>
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"18px 22px"}}>{children}</div>
  </div>
</>;

const FL = ({children}) => <div style={{fontSize:9,fontWeight:700,color:T2,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:5}}>{children}</div>;
const FI = ({val,onChange,type="text",ph,step,min,max}) =>
  <input value={val} onChange={onChange} type={type} placeholder={ph} step={step} min={min} max={max}
    style={{width:"100%",boxSizing:"border-box",background:"rgba(255,255,255,0.05)",border:`1px solid ${BORD}`,borderRadius:7,padding:"7px 10px",color:T1,fontSize:11,fontFamily:MONO,outline:"none"}}/>;
const FSel = ({val,onChange,opts}) =>
  <select value={val} onChange={onChange} style={{width:"100%",background:BG,border:`1px solid ${BORD}`,borderRadius:7,padding:"7px 10px",color:T1,fontSize:11,outline:"none",boxSizing:"border-box"}}>
    {opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
  </select>;

// ═══════════════════════════════════════════════════════════════════════════════
// DEMO SWITCHER
// ═══════════════════════════════════════════════════════════════════════════════
function DemoSwitcher({view,set}) {
  const opts = [
    {id:"admin",  emoji:"🛡", label:"Admin",   sub:"Full access",color:"#f472b6"},
    {id:"rep-1",  emoji:"👤", label:"Marisol", sub:"Rep view",  color:"#0ea5e9"},
    {id:"rep-2",  emoji:"👤", label:"Derek",   sub:"Rep view",  color:"#a78bfa"},
    {id:"rep-3",  emoji:"👤", label:"Priya",   sub:"Rep view",  color:"#f472b6"},
  ];
  return (
    <div style={{background:"#070f1a",borderBottom:`1px solid ${BORD}`,padding:"0 24px",display:"flex",alignItems:"center",gap:4,height:42,flexShrink:0}}>
      <div style={{fontSize:9,fontWeight:700,color:T3,letterSpacing:"0.14em",textTransform:"uppercase",marginRight:10,flexShrink:0}}>Demo mode</div>
      {opts.map(o=>{
        const active=view===o.id;
        return (
          <button key={o.id} onClick={()=>set(o.id)} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:16,border:`1.5px solid ${active?o.color:BORD}`,background:active?`${o.color}14`:"transparent",cursor:"pointer",transition:"all 0.15s"}}>
            <span style={{fontSize:12}}>{o.emoji}</span>
            <div style={{textAlign:"left"}}>
              <div style={{fontSize:10,fontWeight:700,color:active?o.color:T2,lineHeight:1}}>{o.label}</div>
              <div style={{fontSize:8,color:T3,lineHeight:1,marginTop:1}}>{o.sub}</div>
            </div>
            {active&&<div style={{width:4,height:4,borderRadius:"50%",background:o.color,flexShrink:0,marginLeft:2}}/>}
          </button>
        );
      })}
    </div>
  );
}

// ─── App Header ───────────────────────────────────────────────────────────────
function Header({view, user, onLogout}) {
  const isAdmin=view==="admin";
  const rep=REPS.find(r=>r.id===view);
  const ac=isAdmin?"#f472b6":rep?.color||"#0ea5e9";
  return (
    <header style={{height:52,padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${BORD}`,background:"rgba(6,11,20,0.96)",backdropFilter:"blur(20px)",flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:28,height:28,borderRadius:7,background:"linear-gradient(135deg,#0ea5e9,#10b981)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <span style={{fontSize:13,fontWeight:700,color:T1,letterSpacing:"-0.01em"}}>CommissionOS</span>
        {isAdmin&&(
          <div style={{display:"flex",gap:6,marginLeft:6}}>
            {["📊 QBO","💼 Gusto","🎯 GHL"].map(l=>(
              <div key={l} style={{fontSize:9,color:"#10b981",padding:"2px 7px",background:"rgba(16,185,129,0.08)",border:"1px solid rgba(16,185,129,0.18)",borderRadius:10,display:"flex",alignItems:"center",gap:3}}>{l}<span style={{fontSize:7,opacity:0.7}}>✓</span></div>
            ))}
          </div>
        )}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{display:"flex",alignItems:"center",gap:7,padding:"4px 11px 4px 7px",background:`${ac}0e`,border:`1px solid ${ac}22`,borderRadius:18}}>
          <div style={{width:24,height:24,borderRadius:"50%",background:`${ac}22`,border:`1.5px solid ${ac}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:isAdmin?12:10,fontWeight:700,color:ac}}>
            {isAdmin?"🛡":rep?.initials}
          </div>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:ac,lineHeight:1}}>{user?.name || (isAdmin?"Alex Rivera":rep?.name)}</div>
            <div style={{fontSize:8,color:ac,opacity:0.5,textTransform:"uppercase",letterSpacing:"0.1em",lineHeight:1,marginTop:1}}>
              {user?.isGuest ? "Guest" : (isAdmin?"Admin":"Rep")}
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          style={{
            padding:"6px 12px",
            borderRadius:8,
            border:`1px solid ${BORD}`,
            background:BG3,
            color:T2,
            fontSize:10,
            fontWeight:600,
            cursor:"pointer",
            display:"flex",
            alignItems:"center",
            gap:4
          }}
        >
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN
// ═══════════════════════════════════════════════════════════════════════════════
function AdminDash() {
  const [tab,setTab]            = useState("overview");
  const [repPlans,setRepPlans]  = useState(INIT_REP_PLANS);
  const [globalPlan,setGlobalPlan] = useState(GLOBAL_PLAN);
  const [integrations,setIntegrations] = useState(INIT_INTEGRATIONS);
  const [overrides,setOverrides]= useState(INIT_OVERRIDES);
  const [payrolls,setPayrolls]  = useState(INIT_PAYROLLS);
  const [users,setUsers]        = useState(INIT_USERS);
  const [opportunities,setOpportunities] = useState(INIT_OPPORTUNITIES);
  const [selRep,setSelRep]      = useState("rep-1");
  const [period,setPeriod]      = useState("2025-03");
  const [filtRep,setFiltRep]    = useState("all");
  const [syncing,setSyncing]    = useState(null);
  const [toast,setToast]        = useState(null);
  const [planDrawer,setPlanDrawer]=useState(null);
  const [globalDrawer,setGlobalDrawer]=useState(false);
  const [ovOpen,setOvOpen]      = useState(false);
  const [editOv,setEditOv]      = useState(null);
  const [configOpen,setConfigOpen] = useState(null); // 'qbo' or 'gusto'
  const [importOpen,setImportOpen] = useState(false);
  const [salesData,setSalesData] = useState([]);
  const [calculatedLines,setCalculatedLines] = useState(LINES);

  const showToast=(msg,c="#10b981")=>{setToast({msg,c});setTimeout(()=>setToast(null),2400);};
  const run=async(k,msg)=>{setSyncing(k);await new Promise(r=>setTimeout(r,1000));setSyncing(null);showToast(msg);};

  // Calculate commission for a sale
  const calculateCommission = (sale) => {
    const rep = REPS.find(r => r.name === sale.repName || r.id === sale.repId);
    if (!rep) return null;

    // Get the rate - check override first, then rep plan, then global
    const override = overrides.find(o => 
      o.rep === rep.id && 
      o.account === sale.account && 
      o.type === sale.commissionType &&
      (!o.expires || new Date(o.expires) >= new Date())
    );

    let rate, basis;
    if (override) {
      rate = override.rate;
      basis = override.basis;
    } else if (repPlans[rep.id]?.[sale.commissionType]) {
      rate = repPlans[rep.id][sale.commissionType].rate;
      basis = repPlans[rep.id][sale.commissionType].basis;
    } else {
      rate = globalPlan[sale.commissionType]?.rate || 0;
      basis = globalPlan[sale.commissionType]?.basis || "Revenue";
    }

    const amount = sale.commissionableAmount * rate;

    return {
      id: `L${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      rep: rep.id,
      period: sale.period,
      basis: sale.commissionableAmount,
      rate: rate,
      amount: amount,
      source: sale.commissionType,
      status: "pending",
      account: sale.account,
      saleDate: sale.saleDate,
      invoiceId: sale.invoiceId
    };
  };

  // Process imported sales
  const processSalesImport = (sales) => {
    const newLines = sales
      .map(sale => calculateCommission(sale))
      .filter(line => line !== null);
    
    setCalculatedLines(prev => [...prev, ...newLines]);
    showToast(`${newLines.length} commission lines calculated`);
  };

  const allG=calculatedLines.filter(l=>l.source!=="CHARGEBACK").reduce((s,l)=>s+l.amount,0);
  const allCB=calculatedLines.filter(l=>l.source==="CHARGEBACK").reduce((s,l)=>s+l.amount,0);
  const allPay=calculatedLines.filter(l=>l.status==="payable").reduce((s,l)=>s+l.amount,0);
  const repLines=calculatedLines.filter(l=>l.rep===selRep&&l.period===period);

  const ATABS=[{id:"overview",label:"Overview"},{id:"commissions",label:"Commissions"},{id:"plans",label:"Plans"},{id:"opportunities",label:"Opportunities"},{id:"payroll",label:"Payroll"},{id:"users",label:"Users"},{id:"integrations",label:"Integrations"},{id:"settings",label:"Settings"}];

  // Override form component
  const OvForm = () => {
    const blank={id:null,rep:"rep-1",account:"",type:"BASE_ENTRY",rate:0.10,basis:"Gross Margin",reason:"",effective:"",expires:"",locked:false};
    const [f,setF]=useState(editOv||blank);
    const u=(k,v)=>setF(p=>({...p,[k]:v}));
    const gl=globalPlan[f.type]?.rate||0.10;
    const lift=gl>0?((f.rate-gl)/gl*100).toFixed(0):0;
    return (
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><FL>Rep</FL><FSel val={f.rep} onChange={e=>u("rep",e.target.value)} opts={REPS.map(r=>({v:r.id,l:r.name}))}/></div>
          <div><FL>Commission Type</FL><FSel val={f.type} onChange={e=>u("type",e.target.value)} opts={[{key:"BASE_ENTRY",label:"Entry Product"},{key:"BASE_PREMIUM",label:"Premium"},{key:"PROJECT",label:"Project"},{key:"MRR_EVERGREEN",label:"Evergreen MRR"},{key:"MRR_ONE_TIME",label:"One-Time MRR"},{key:"EXPANSION",label:"Expansion"}].map(t=>({v:t.key,l:t.label}))}/></div>
        </div>
        <div><FL>Account Name</FL><FI val={f.account} onChange={e=>u("account",e.target.value)} ph="e.g. Nexus Solutions"/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><FL>Override Rate (%)</FL><FI val={(f.rate*100).toFixed(1)} type="number" step="0.1" min="0" max="100" onChange={e=>u("rate",parseFloat(e.target.value||0)/100)}/></div>
          <div><FL>Basis</FL><FSel val={f.basis} onChange={e=>u("basis",e.target.value)} opts={["Gross Margin","Gross Profit","Monthly GP","MRC","Delta MRR"].map(v=>({v,l:v}))}/></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><FL>Effective Date</FL><FI val={f.effective} type="date" onChange={e=>u("effective",e.target.value)}/></div>
          <div><FL>Expiry (optional)</FL><FI val={f.expires||""} type="date" onChange={e=>u("expires",e.target.value||null)}/></div>
        </div>
        <div><FL>Reason / Notes</FL><textarea value={f.reason} onChange={e=>u("reason",e.target.value)} rows={2} placeholder="e.g. Strategic deal incentive, approved by VP Sales" style={{width:"100%",boxSizing:"border-box",background:"rgba(255,255,255,0.05)",border:`1px solid ${BORD}`,borderRadius:7,padding:"7px 10px",color:T1,fontSize:11,outline:"none",resize:"none",fontFamily:SANS}}/></div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",background:"rgba(239,68,68,0.05)",border:"1px solid rgba(239,68,68,0.15)",borderRadius:9}}>
          <div><div style={{fontSize:11,fontWeight:600,color:"#f87171"}}>Lock Rate</div><div style={{fontSize:10,color:T2}}>Prevents edits without admin unlock</div></div>
          <div onClick={()=>u("locked",!f.locked)} style={{width:38,height:20,borderRadius:10,cursor:"pointer",background:f.locked?"#ef4444":"rgba(255,255,255,0.1)",position:"relative",transition:"background 0.2s",flexShrink:0}}>
            <div style={{position:"absolute",top:2,left:f.locked?18:2,width:16,height:16,borderRadius:"50%",background:"white",transition:"left 0.2s"}}/>
          </div>
        </div>
        {/* Preview */}
        <div style={{background:"rgba(14,165,233,0.06)",border:"1px solid rgba(14,165,233,0.15)",borderRadius:9,padding:"10px 12px",fontSize:11,color:T2,lineHeight:1.7}}>
          <span style={{color:T1,fontWeight:600}}>{REPS.find(r=>r.id===f.rep)?.name}</span> earns{" "}
          <span style={{color:"#f59e0b",fontWeight:700,fontFamily:MONO}}>{(f.rate*100).toFixed(1)}%</span>{" "}
          on <span style={{color:T1}}>{f.account||"[account]"}</span>
          {parseFloat(lift)>0&&<span style={{color:"#10b981"}}> (+{lift}% above global)</span>}
          {f.expires?` · expires ${f.expires}`:" · no expiry"}.
        </div>
        <button onClick={()=>{
          if(f.id){setOverrides(p=>p.map(o=>o.id===f.id?f:o));}
          else{setOverrides(p=>[...p,{...f,id:`OV${Date.now()}`}]);}
          setOvOpen(false);setEditOv(null);showToast("Override saved");
        }} style={{padding:"10px",borderRadius:10,border:"none",cursor:"pointer",background:"linear-gradient(135deg,#0ea5e9,#10b981)",color:"#022c22",fontSize:12,fontWeight:700}}>
          {editOv?"Update Override":"Create Override"}
        </button>
      </div>
    );
  };

  return (
    <div style={{flex:1,overflowY:"auto"}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      {toast&&<div style={{position:"fixed",bottom:18,right:18,zIndex:9999,background:"#0c1825",border:`1px solid ${toast.c}33`,borderLeft:`3px solid ${toast.c}`,borderRadius:9,padding:"9px 14px",fontSize:12,color:T1,fontWeight:500,boxShadow:"0 8px 32px rgba(0,0,0,0.6)"}}>{toast.msg}</div>}

      {/* Plan Drawer */}
      <Drawer open={!!planDrawer} onClose={()=>setPlanDrawer(null)} title={planDrawer?`${planDrawer.name}'s Plan`:""} sub="Edit rates per commission type · Changes apply to new lines only">
        {planDrawer&&[{key:"BASE_ENTRY",label:"Entry Product",color:"#a78bfa"},{key:"BASE_PREMIUM",label:"Premium Product",color:"#f472b6"},{key:"PROJECT",label:"Project",color:"#fb923c"},{key:"MRR_EVERGREEN",label:"Evergreen MRR",color:"#10b981"},{key:"MRR_ONE_TIME",label:"One-Time MRR",color:"#0ea5e9"},{key:"EXPANSION",label:"Expansion",color:"#818cf8"}].map(t=>{
          const cur=repPlans[planDrawer.id]?.[t.key];const gl=globalPlan[t.key];
          const isOv=cur?.rate!==gl?.rate;
          const [dv,setDv]=useState((cur?.rate*100).toFixed(1));
          return(
            <div key={t.key} style={{marginBottom:10,padding:"12px 14px",background:BG3,border:`1px solid ${isOv?"rgba(245,158,11,0.2)":BORD}`,borderRadius:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
                <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:7,height:7,borderRadius:"50%",background:t.color}}/><span style={{fontSize:12,fontWeight:600,color:T1}}>{t.label}</span></div>
                <div style={{display:"flex",gap:5}}>
                  {isOv?<Tag c="#f59e0b">Custom · global: {_p(gl.rate)}</Tag>:<Tag>Global default</Tag>}
                  {isOv&&<Btn sm color="#ef4444" onClick={()=>{setRepPlans(p=>({...p,[planDrawer.id]:{...p[planDrawer.id],[t.key]:{...gl}}}));setDv((gl.rate*100).toFixed(1));showToast("Reset","#94a3b8");}}>Reset</Btn>}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 64px",gap:8,alignItems:"end"}}>
                <FI val={dv} type="number" step="0.1" min="0" max="100" onChange={e=>setDv(e.target.value)}/>
                <Btn onClick={()=>{const v=parseFloat(dv)/100;setRepPlans(p=>({...p,[planDrawer.id]:{...p[planDrawer.id],[t.key]:{...p[planDrawer.id][t.key],rate:v}}}));showToast(`${t.label} updated`);}}>Apply</Btn>
              </div>
            </div>
          );
        })}
      </Drawer>

      {/* Override Drawer */}
      <Drawer open={ovOpen} onClose={()=>{setOvOpen(false);setEditOv(null);}} title={editOv?"Edit Override":"New Opportunity Override"} sub="Per-account rate exception for a specific rep">
        <OvForm/>
      </Drawer>

      {/* Global Plan Edit Drawer */}
      <Drawer open={globalDrawer} onClose={()=>setGlobalDrawer(false)} title="Edit Global Default Rates" sub="Changes will affect all reps unless they have custom rates">
        {[{key:"BASE_ENTRY",label:"Entry Product",color:"#a78bfa"},{key:"BASE_PREMIUM",label:"Premium Product",color:"#f472b6"},{key:"PROJECT",label:"Project",color:"#fb923c"},{key:"MRR_EVERGREEN",label:"Evergreen MRR",color:"#10b981"},{key:"MRR_ONE_TIME",label:"One-Time MRR",color:"#0ea5e9"},{key:"EXPANSION",label:"Expansion",color:"#818cf8"}].map(t=>{
          const cur=globalPlan[t.key];
          const [dv,setDv]=useState((cur?.rate*100).toFixed(1));
          const [basis,setBasis]=useState(cur?.basis||"Gross Margin");
          return(
            <div key={t.key} style={{marginBottom:10,padding:"12px 14px",background:BG3,border:`1px solid ${BORD}`,borderRadius:10}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:9}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:t.color}}/>
                <span style={{fontSize:12,fontWeight:600,color:T1}}>{t.label}</span>
              </div>
              <div style={{marginBottom:8}}>
                <FL>Rate (%)</FL>
                <div style={{display:"grid",gridTemplateColumns:"1fr 64px",gap:8,alignItems:"end"}}>
                  <FI val={dv} type="number" step="0.1" min="0" max="100" onChange={e=>setDv(e.target.value)}/>
                  <Btn onClick={()=>{const v=parseFloat(dv)/100;setGlobalPlan(p=>({...p,[t.key]:{...p[t.key],rate:v}}));showToast(`${t.label} global rate updated`);}}>Apply</Btn>
                </div>
              </div>
              <div>
                <FL>Basis</FL>
                <FSel val={basis} onChange={e=>{setBasis(e.target.value);setGlobalPlan(p=>({...p,[t.key]:{...p[t.key],basis:e.target.value}}));showToast(`${t.label} basis updated`);}} opts={["Gross Margin","Gross Profit","Monthly GP","MRC","Delta MRR","Revenue"].map(v=>({v,l:v}))}/>
              </div>
            </div>
          );
        })}
      </Drawer>

      {/* QBO Config Drawer */}
      <Drawer open={configOpen==="qbo"} onClose={()=>setConfigOpen(null)} title="QuickBooks Online Configuration" sub="OAuth 2.0 connection settings">
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {integrations.qbo.enabled?
            <div style={{padding:"10px 12px",background:"rgba(16,185,129,0.08)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:9}}>
              <div style={{fontSize:11,fontWeight:600,color:"#10b981",marginBottom:4}}>✓ Connected</div>
              <div style={{fontSize:10,color:T2}}>Last sync: {integrations.qbo.lastSync||"Never"}</div>
            </div>
          :
            <div style={{padding:"10px 12px",background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:9}}>
              <div style={{fontSize:11,fontWeight:600,color:"#f59e0b",marginBottom:4}}>⚠ Not Connected</div>
              <div style={{fontSize:10,color:T2}}>Complete OAuth flow to connect</div>
            </div>
          }

          <div style={{padding:"10px 12px",background:"rgba(14,165,233,0.06)",border:"1px solid rgba(14,165,233,0.15)",borderRadius:9}}>
            <div style={{fontSize:10,fontWeight:600,color:"#0ea5e9",marginBottom:4}}>📖 Setup Instructions</div>
            <div style={{fontSize:9,color:T2,lineHeight:1.5}}>
              1. Go to developer.intuit.com<br/>
              2. Create an app<br/>
              3. Copy Client ID and Secret<br/>
              4. Add redirect URI: <span style={{fontFamily:MONO,color:T1}}>https://your-domain.com/auth/qbo/callback</span>
            </div>
          </div>

          <div><FL>Environment</FL>
            <FSel val={integrations.qbo.environment} onChange={e=>setIntegrations(p=>({...p,qbo:{...p.qbo,environment:e.target.value}}))} opts={[{v:"sandbox",l:"Sandbox (Testing)"},{v:"production",l:"Production"}]}/>
          </div>

          <div><FL>Client ID</FL>
            <FI val={integrations.qbo.clientId} onChange={e=>setIntegrations(p=>({...p,qbo:{...p.qbo,clientId:e.target.value}}))} ph="ABxxxxxxxxxxxxxxxxxxxxxxxxxxxx"/>
          </div>

          <div><FL>Client Secret</FL>
            <FI val={integrations.qbo.clientSecret} type="password" onChange={e=>setIntegrations(p=>({...p,qbo:{...p.qbo,clientSecret:e.target.value}}))} ph="••••••••••••••••••••"/>
          </div>

          <div><FL>Realm ID (Company ID)</FL>
            <FI val={integrations.qbo.realmId} onChange={e=>setIntegrations(p=>({...p,qbo:{...p.qbo,realmId:e.target.value}}))} ph="123456789012345"/>
          </div>

          <div><FL>Company Name</FL>
            <FI val={integrations.qbo.companyName} onChange={e=>setIntegrations(p=>({...p,qbo:{...p.qbo,companyName:e.target.value}}))} ph="Your Company Inc"/>
          </div>

          <div><FL>Webhook URL (Optional)</FL>
            <FI val={integrations.qbo.webhookUrl} onChange={e=>setIntegrations(p=>({...p,qbo:{...p.qbo,webhookUrl:e.target.value}}))} ph="https://your-domain.com/webhooks/qbo"/>
          </div>

          <div><FL>Webhook Verifier Token (Optional)</FL>
            <FI val={integrations.qbo.webhookVerifierToken} onChange={e=>setIntegrations(p=>({...p,qbo:{...p.qbo,webhookVerifierToken:e.target.value}}))} ph="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"/>
          </div>

          <div><FL>Sync Frequency</FL>
            <FSel val={integrations.qbo.syncFrequency} onChange={e=>setIntegrations(p=>({...p,qbo:{...p.qbo,syncFrequency:e.target.value}}))} opts={[{v:"manual",l:"Manual Only"},{v:"hourly",l:"Every Hour"},{v:"daily",l:"Daily"}]}/>
          </div>

          <div style={{padding:"10px 12px",background:BG3,border:`1px solid ${BORD}`,borderRadius:9}}>
            <div style={{fontSize:11,fontWeight:600,color:T1,marginBottom:8}}>Sync Options</div>
            {[
              {key:"syncInvoices",label:"Sync Invoices",desc:"Import invoice data"},
              {key:"syncPayments",label:"Sync Payments",desc:"Import payment data for commission calculation"},
              {key:"syncCustomers",label:"Sync Customers",desc:"Import customer/account data"}
            ].map(opt=>
              <div key={opt.key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${BORD2}`}}>
                <div><div style={{fontSize:11,color:T1}}>{opt.label}</div><div style={{fontSize:9,color:T2}}>{opt.desc}</div></div>
                <div onClick={()=>setIntegrations(p=>({...p,qbo:{...p.qbo,[opt.key]:!p.qbo[opt.key]}}))} style={{width:38,height:20,borderRadius:10,cursor:"pointer",background:integrations.qbo[opt.key]?"#10b981":"rgba(255,255,255,0.1)",position:"relative",transition:"background 0.2s"}}>
                  <div style={{position:"absolute",top:2,left:integrations.qbo[opt.key]?18:2,width:16,height:16,borderRadius:"50%",background:"white",transition:"left 0.2s"}}/>
                </div>
              </div>
            )}
          </div>

          <div style={{display:"flex",gap:8}}>
            {!integrations.qbo.enabled?
              <Btn color="#10b981" onClick={()=>{
                if(!integrations.qbo.clientId || !integrations.qbo.clientSecret){
                  showToast("Client ID and Secret required","#ef4444");
                  return;
                }
                setIntegrations(p=>({...p,qbo:{...p.qbo,enabled:true,lastSync:new Date().toLocaleString()}}));
                showToast("QBO connected! Run sync to import data.");
                setConfigOpen(null);
              }}>🔗 Connect to QuickBooks</Btn>
            :
              <Btn color="#0ea5e9" onClick={()=>{showToast("QBO settings saved");setConfigOpen(null);}}>Save Settings</Btn>
            }
            {integrations.qbo.enabled&&
              <Btn color="#ef4444" ghost onClick={()=>{
                if(confirm("Disconnect QuickBooks Online? This will stop automatic syncing.")){
                  setIntegrations(p=>({...p,qbo:{...p.qbo,enabled:false,accessToken:"",refreshToken:""}}));
                  showToast("QBO disconnected","#ef4444");
                  setConfigOpen(null);
                }
              }}>Disconnect</Btn>
            }
          </div>
        </div>
      </Drawer>

      {/* Gusto Config Drawer */}
      <Drawer open={configOpen==="gusto"} onClose={()=>setConfigOpen(null)} title="Gusto Payroll Configuration" sub="OAuth 2.0 connection settings">
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {integrations.gusto.enabled?
            <div style={{padding:"10px 12px",background:"rgba(16,185,129,0.08)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:9}}>
              <div style={{fontSize:11,fontWeight:600,color:"#10b981",marginBottom:4}}>✓ Connected</div>
              <div style={{fontSize:10,color:T2}}>Last sync: {integrations.gusto.lastSync||"Never"}</div>
            </div>
          :
            <div style={{padding:"10px 12px",background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:9}}>
              <div style={{fontSize:11,fontWeight:600,color:"#f59e0b",marginBottom:4}}>⚠ Not Connected</div>
              <div style={{fontSize:10,color:T2}}>Complete OAuth flow to connect</div>
            </div>
          }

          <div style={{padding:"10px 12px",background:"rgba(167,139,250,0.06)",border:"1px solid rgba(167,139,250,0.15)",borderRadius:9}}>
            <div style={{fontSize:10,fontWeight:600,color:"#a78bfa",marginBottom:4}}>📖 Setup Instructions</div>
            <div style={{fontSize:9,color:T2,lineHeight:1.5}}>
              1. Go to dev.gusto.com<br/>
              2. Create an application<br/>
              3. Copy Client ID and Secret<br/>
              4. Add redirect URI: <span style={{fontFamily:MONO,color:T1}}>https://your-domain.com/auth/gusto/callback</span>
            </div>
          </div>

          <div><FL>Environment</FL>
            <FSel val={integrations.gusto.environment} onChange={e=>setIntegrations(p=>({...p,gusto:{...p.gusto,environment:e.target.value}}))} opts={[{v:"demo",l:"Demo (Testing)"},{v:"production",l:"Production"}]}/>
          </div>

          <div><FL>Client ID</FL>
            <FI val={integrations.gusto.clientId} onChange={e=>setIntegrations(p=>({...p,gusto:{...p.gusto,clientId:e.target.value}}))} ph="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"/>
          </div>

          <div><FL>Client Secret</FL>
            <FI val={integrations.gusto.clientSecret} type="password" onChange={e=>setIntegrations(p=>({...p,gusto:{...p.gusto,clientSecret:e.target.value}}))} ph="••••••••••••••••••••"/>
          </div>

          <div><FL>Company UUID</FL>
            <FI val={integrations.gusto.companyUuid} onChange={e=>setIntegrations(p=>({...p,gusto:{...p.gusto,companyUuid:e.target.value}}))} ph="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"/>
          </div>

          <div><FL>Company Name</FL>
            <FI val={integrations.gusto.companyName} onChange={e=>setIntegrations(p=>({...p,gusto:{...p.gusto,companyName:e.target.value}}))} ph="Your Company Inc"/>
          </div>

          <div><FL>Payroll Schedule</FL>
            <FSel val={integrations.gusto.payrollSchedule} onChange={e=>setIntegrations(p=>({...p,gusto:{...p.gusto,payrollSchedule:e.target.value}}))} opts={[{v:"weekly",l:"Weekly"},{v:"bi-weekly",l:"Bi-Weekly"},{v:"semi-monthly",l:"Semi-Monthly"},{v:"monthly",l:"Monthly"}]}/>
          </div>

          <div><FL>Payroll Day (of month for monthly schedule)</FL>
            <FI val={integrations.gusto.payrollDay} type="number" min="1" max="31" onChange={e=>setIntegrations(p=>({...p,gusto:{...p.gusto,payrollDay:parseInt(e.target.value)||5}}))} ph="5"/>
          </div>

          <div style={{padding:"10px 12px",background:BG3,border:`1px solid ${BORD}`,borderRadius:9}}>
            <div style={{fontSize:11,fontWeight:600,color:T1,marginBottom:8}}>Automation Settings</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${BORD2}`}}>
              <div><div style={{fontSize:11,color:T1}}>Auto Payroll</div><div style={{fontSize:9,color:T2}}>Automatically create off-cycle payroll runs for commissions</div></div>
              <div onClick={()=>setIntegrations(p=>({...p,gusto:{...p.gusto,autoPayroll:!p.gusto.autoPayroll}}))} style={{width:38,height:20,borderRadius:10,cursor:"pointer",background:integrations.gusto.autoPayroll?"#10b981":"rgba(255,255,255,0.1)",position:"relative",transition:"background 0.2s"}}>
                <div style={{position:"absolute",top:2,left:integrations.gusto.autoPayroll?18:2,width:16,height:16,borderRadius:"50%",background:"white",transition:"left 0.2s"}}/>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0"}}>
              <div><div style={{fontSize:11,color:T1}}>Sync Employees</div><div style={{fontSize:9,color:T2}}>Automatically sync employee roster to match sales reps</div></div>
              <div onClick={()=>setIntegrations(p=>({...p,gusto:{...p.gusto,syncEmployees:!p.gusto.syncEmployees}}))} style={{width:38,height:20,borderRadius:10,cursor:"pointer",background:integrations.gusto.syncEmployees?"#10b981":"rgba(255,255,255,0.1)",position:"relative",transition:"background 0.2s"}}>
                <div style={{position:"absolute",top:2,left:integrations.gusto.syncEmployees?18:2,width:16,height:16,borderRadius:"50%",background:"white",transition:"left 0.2s"}}/>
              </div>
            </div>
          </div>

          <div style={{display:"flex",gap:8}}>
            {!integrations.gusto.enabled?
              <Btn color="#10b981" onClick={()=>{
                if(!integrations.gusto.clientId || !integrations.gusto.clientSecret){
                  showToast("Client ID and Secret required","#ef4444");
                  return;
                }
                setIntegrations(p=>({...p,gusto:{...p.gusto,enabled:true,lastSync:new Date().toLocaleString()}}));
                showToast("Gusto connected! Run sync to import employees.");
                setConfigOpen(null);
              }}>🔗 Connect to Gusto</Btn>
            :
              <Btn color="#a78bfa" onClick={()=>{showToast("Gusto settings saved");setConfigOpen(null);}}>Save Settings</Btn>
            }
            {integrations.gusto.enabled&&
              <Btn color="#ef4444" ghost onClick={()=>{
                if(confirm("Disconnect Gusto? This will stop automatic payroll creation.")){
                  setIntegrations(p=>({...p,gusto:{...p.gusto,enabled:false,accessToken:"",refreshToken:""}}));
                  showToast("Gusto disconnected","#ef4444");
                  setConfigOpen(null);
                }
              }}>Disconnect</Btn>
            }
          </div>
        </div>
      </Drawer>

      {/* GoHighLevel Config Drawer */}
      <Drawer open={configOpen==="gohighlevel"} onClose={()=>setConfigOpen(null)} title="GoHighLevel CRM Configuration" sub="API key authentication for opportunity sync">
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {integrations.gohighlevel.enabled?
            <div style={{padding:"10px 12px",background:"rgba(16,185,129,0.08)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:9}}>
              <div style={{fontSize:11,fontWeight:600,color:"#10b981",marginBottom:4}}>✓ Connected</div>
              <div style={{fontSize:10,color:T2}}>Last sync: {integrations.gohighlevel.lastSync||"Never"}</div>
            </div>
          :
            <div style={{padding:"10px 12px",background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:9}}>
              <div style={{fontSize:11,fontWeight:600,color:"#f59e0b",marginBottom:4}}>⚠ Not Connected</div>
              <div style={{fontSize:10,color:T2}}>Enter API key to connect</div>
            </div>
          }

          <div style={{padding:"10px 12px",background:"rgba(251,146,60,0.06)",border:"1px solid rgba(251,146,60,0.15)",borderRadius:9}}>
            <div style={{fontSize:10,fontWeight:600,color:"#fb923c",marginBottom:4}}>📖 Setup Instructions</div>
            <div style={{fontSize:9,color:T2,lineHeight:1.5}}>
              1. Log in to GoHighLevel<br/>
              2. Go to Settings → Integrations → API Key<br/>
              3. Create or copy your API Key<br/>
              4. Find your Location ID in Settings<br/>
              5. Configure pipeline and custom field mappings below
            </div>
          </div>

          <div><FL>API Key</FL>
            <FI val={integrations.gohighlevel.apiKey} type="password" onChange={e=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,apiKey:e.target.value}}))} ph="••••••••••••••••••••••••••••••••"/>
          </div>

          <div><FL>Location ID</FL>
            <FI val={integrations.gohighlevel.locationId} onChange={e=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,locationId:e.target.value}}))} ph="xxxxxxxxxxxxxxxxxxxxxxxx"/>
          </div>

          <div><FL>Agency Name</FL>
            <FI val={integrations.gohighlevel.agencyName} onChange={e=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,agencyName:e.target.value}}))} ph="Your Agency Inc"/>
          </div>

          <div><FL>Location Name</FL>
            <FI val={integrations.gohighlevel.locationName} onChange={e=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,locationName:e.target.value}}))} ph="Main Office"/>
          </div>

          <div style={{padding:"10px 12px",background:"rgba(14,165,233,0.06)",border:"1px solid rgba(14,165,233,0.15)",borderRadius:9}}>
            <div style={{fontSize:11,fontWeight:600,color:"#0ea5e9",marginBottom:8}}>Pipeline Configuration</div>
            <div style={{fontSize:9,color:T2,marginBottom:8}}>Configure which pipeline and stage trigger commission calculations</div>
          </div>

          <div><FL>Pipeline ID</FL>
            <FI val={integrations.gohighlevel.pipelineId} onChange={e=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,pipelineId:e.target.value}}))} ph="xxxxxxxxxxxxxxxxxxxxxxxx"/>
          </div>

          <div><FL>Pipeline Name</FL>
            <FI val={integrations.gohighlevel.pipelineName} onChange={e=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,pipelineName:e.target.value}}))} ph="Sales Pipeline"/>
          </div>

          <div><FL>Win Stage ID (Triggers Commission)</FL>
            <FI val={integrations.gohighlevel.winStageId} onChange={e=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,winStageId:e.target.value}}))} ph="xxxxxxxxxxxxxxxxxxxxxxxx"/>
          </div>

          <div style={{padding:"10px 12px",background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.15)",borderRadius:9}}>
            <div style={{fontSize:11,fontWeight:600,color:"#f59e0b",marginBottom:8}}>Custom Field Mapping</div>
            <div style={{fontSize:9,color:T2,marginBottom:8}}>Map GHL custom fields to commission data. Get field IDs from GHL Settings → Custom Fields</div>
          </div>

          <div><FL>Sales Rep Field ID</FL>
            <FI val={integrations.gohighlevel.repFieldId} onChange={e=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,repFieldId:e.target.value}}))} ph="e.g. contact.assigned_user or custom field ID"/>
          </div>

          <div><FL>Commission Type Field ID</FL>
            <FI val={integrations.gohighlevel.commissionTypeFieldId} onChange={e=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,commissionTypeFieldId:e.target.value}}))} ph="e.g. opportunity.custom_field_xxxxxx"/>
          </div>

          <div><FL>Commission Amount Field ID</FL>
            <FI val={integrations.gohighlevel.commissionAmountFieldId} onChange={e=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,commissionAmountFieldId:e.target.value}}))} ph="e.g. opportunity.monetary_value"/>
          </div>

          <div><FL>Date Range Filter</FL>
            <FSel val={integrations.gohighlevel.dateRangeFilter} onChange={e=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,dateRangeFilter:e.target.value}}))} opts={[{v:"closed_date",l:"Closed Date (When Won)"},{v:"created_date",l:"Created Date"}]}/>
          </div>

          <div><FL>Min Opportunity Value ($)</FL>
            <FI val={integrations.gohighlevel.minOpportunityValue} type="number" min="0" step="100" onChange={e=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,minOpportunityValue:parseFloat(e.target.value)||0}}))} ph="0"/>
          </div>

          <div><FL>Sync Frequency</FL>
            <FSel val={integrations.gohighlevel.syncFrequency} onChange={e=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,syncFrequency:e.target.value}}))} opts={[{v:"manual",l:"Manual Only"},{v:"hourly",l:"Every Hour"},{v:"daily",l:"Daily"},{v:"real-time",l:"Real-time (Webhook)"}]}/>
          </div>

          {integrations.gohighlevel.syncFrequency==="real-time"&&<>
            <div><FL>Webhook URL (Your Endpoint)</FL>
              <FI val={integrations.gohighlevel.webhookUrl} onChange={e=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,webhookUrl:e.target.value}}))} ph="https://your-domain.com/webhooks/ghl"/>
            </div>
            <div><FL>Webhook Secret (Optional)</FL>
              <FI val={integrations.gohighlevel.webhookSecret} type="password" onChange={e=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,webhookSecret:e.target.value}}))} ph="••••••••••••••••••••"/>
            </div>
          </>}

          <div style={{padding:"10px 12px",background:BG3,border:`1px solid ${BORD}`,borderRadius:9}}>
            <div style={{fontSize:11,fontWeight:600,color:T1,marginBottom:8}}>Sync Options</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${BORD2}`}}>
              <div><div style={{fontSize:11,color:T1}}>Sync Opportunities</div><div style={{fontSize:9,color:T2}}>Import won opportunities as commission lines</div></div>
              <div onClick={()=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,syncOpportunities:!p.gohighlevel.syncOpportunities}}))} style={{width:38,height:20,borderRadius:10,cursor:"pointer",background:integrations.gohighlevel.syncOpportunities?"#10b981":"rgba(255,255,255,0.1)",position:"relative",transition:"background 0.2s"}}>
                <div style={{position:"absolute",top:2,left:integrations.gohighlevel.syncOpportunities?18:2,width:16,height:16,borderRadius:"50%",background:"white",transition:"left 0.2s"}}/>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0"}}>
              <div><div style={{fontSize:11,color:T1}}>Sync Contacts</div><div style={{fontSize:9,color:T2}}>Import contact/account names</div></div>
              <div onClick={()=>setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,syncContacts:!p.gohighlevel.syncContacts}}))} style={{width:38,height:20,borderRadius:10,cursor:"pointer",background:integrations.gohighlevel.syncContacts?"#10b981":"rgba(255,255,255,0.1)",position:"relative",transition:"background 0.2s"}}>
                <div style={{position:"absolute",top:2,left:integrations.gohighlevel.syncContacts?18:2,width:16,height:16,borderRadius:"50%",background:"white",transition:"left 0.2s"}}/>
              </div>
            </div>
          </div>

          <div style={{display:"flex",gap:8}}>
            {!integrations.gohighlevel.enabled?
              <Btn color="#10b981" onClick={()=>{
                if(!integrations.gohighlevel.apiKey || !integrations.gohighlevel.locationId){
                  showToast("API Key and Location ID required","#ef4444");
                  return;
                }
                setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,enabled:true,lastSync:new Date().toLocaleString()}}));
                showToast("GoHighLevel connected! Run sync to import opportunities.");
                setConfigOpen(null);
              }}>🔗 Connect to GoHighLevel</Btn>
            :
              <Btn color="#fb923c" onClick={()=>{showToast("GoHighLevel settings saved");setConfigOpen(null);}}>Save Settings</Btn>
            }
            {integrations.gohighlevel.enabled&&
              <Btn color="#ef4444" ghost onClick={()=>{
                if(confirm("Disconnect GoHighLevel? This will stop opportunity syncing.")){
                  setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,enabled:false,apiKey:""}}));
                  showToast("GoHighLevel disconnected","#ef4444");
                  setConfigOpen(null);
                }
              }}>Disconnect</Btn>
            }
          </div>

          <div style={{padding:"10px 12px",background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.15)",borderRadius:9}}>
            <div style={{fontSize:10,fontWeight:600,color:"#10b981",marginBottom:4}}>💡 Pro Tip</div>
            <div style={{fontSize:9,color:T2,lineHeight:1.5}}>
              Test your connection by clicking "Test Sync" in the Integrations tab. This will fetch recent opportunities to verify your configuration is correct.
            </div>
          </div>
        </div>
      </Drawer>

      {/* Sales Import Drawer */}
      <Drawer open={importOpen} onClose={()=>setImportOpen(false)} title="Import Sales Data" sub="Upload CSV or paste data to calculate commissions">
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{padding:"10px 12px",background:"rgba(14,165,233,0.08)",border:"1px solid rgba(14,165,233,0.2)",borderRadius:9}}>
            <div style={{fontSize:11,fontWeight:600,color:"#0ea5e9",marginBottom:6}}>📋 CSV Format Required</div>
            <div style={{fontSize:10,color:T2,lineHeight:1.5}}>
              Columns: <span style={{fontFamily:MONO,color:T1}}>repName, account, saleDate, invoiceId, commissionType, commissionableAmount, period</span>
            </div>
          </div>
          
          <div>
            <FL>Paste CSV Data</FL>
            <textarea 
              placeholder={"repName,account,saleDate,invoiceId,commissionType,commissionableAmount,period\nMarisol Vega,Acme Corp,2025-03-15,INV-001,BASE_PREMIUM,15000,2025-03"}
              rows={8}
              style={{width:"100%",boxSizing:"border-box",background:"rgba(255,255,255,0.05)",border:`1px solid ${BORD}`,borderRadius:7,padding:"7px 10px",color:T1,fontSize:10,fontFamily:MONO,outline:"none",resize:"vertical"}}
              onChange={(e) => setSalesData(e.target.value)}
            />
          </div>

          <div style={{padding:"10px 12px",background:BG3,border:`1px solid ${BORD}`,borderRadius:9}}>
            <div style={{fontSize:11,fontWeight:600,color:T1,marginBottom:6}}>Commission Types Available:</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {["BASE_ENTRY","BASE_PREMIUM","PROJECT","MRR_EVERGREEN","MRR_ONE_TIME","EXPANSION"].map(t=><span key={t} style={{fontSize:9,padding:"2px 6px",borderRadius:6,background:"rgba(14,165,233,0.1)",color:"#0ea5e9",fontFamily:MONO}}>{t}</span>)}
            </div>
          </div>

          <div style={{padding:"10px 12px",background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:9}}>
            <div style={{fontSize:10,color:T2,lineHeight:1.5}}>
              <strong style={{color:"#f59e0b"}}>How it works:</strong> Each sale row will be matched to the rep's commission plan. If an override exists for that account+type, it's used. Otherwise, the rep's custom rate is used. If no custom rate, global defaults apply.
            </div>
          </div>

          <button 
            onClick={() => {
              if (!salesData.trim()) {
                showToast("Please paste CSV data","#ef4444");
                return;
              }
              try {
                const lines = salesData.trim().split('\n');
                const headers = lines[0].split(',').map(h => h.trim());
                const sales = lines.slice(1).map(line => {
                  const values = line.split(',').map(v => v.trim());
                  const sale = {};
                  headers.forEach((h, i) => {
                    if (h === 'commissionableAmount') {
                      sale[h] = parseFloat(values[i]);
                    } else {
                      sale[h] = values[i];
                    }
                  });
                  return sale;
                });
                processSalesImport(sales);
                setImportOpen(false);
                setSalesData('');
              } catch (err) {
                showToast("Invalid CSV format","#ef4444");
              }
            }}
            style={{padding:"10px",borderRadius:10,border:"none",cursor:"pointer",background:"linear-gradient(135deg,#0ea5e9,#10b981)",color:"#022c22",fontSize:12,fontWeight:700}}
          >
            Calculate & Import Commissions
          </button>

          <div style={{display:"flex",gap:8}}>
            <button 
              onClick={() => {
                const sample = `repName,account,saleDate,invoiceId,commissionType,commissionableAmount,period
Marisol Vega,Acme Corporation,2025-03-15,INV-1001,BASE_PREMIUM,15000,2025-03
Derek Chu,TechStart Inc,2025-03-16,INV-1002,PROJECT,25000,2025-03
Priya Nair,Global Systems,2025-03-17,INV-1003,MRR_EVERGREEN,3500,2025-03`;
                setSalesData(sample);
                showToast("Sample data loaded");
              }}
              style={{flex:1,padding:"8px",borderRadius:8,border:`1px solid ${BORD}`,background:BG3,color:T1,fontSize:11,fontWeight:600,cursor:"pointer"}}
            >
              📝 Load Sample Data
            </button>
            <button 
              onClick={() => setSalesData('')}
              style={{padding:"8px 12px",borderRadius:8,border:`1px solid ${BORD}`,background:BG3,color:T2,fontSize:11,fontWeight:600,cursor:"pointer"}}
            >
              Clear
            </button>
          </div>
        </div>
      </Drawer>

      <div style={{padding:"22px 24px 60px"}}>
        <div style={{marginBottom:18}}><Tabs tabs={ATABS} active={tab} set={setTab}/></div>

        {/* ═ OVERVIEW ═ */}
        {tab==="overview"&&<>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:11,marginBottom:16}}>
            <SC label="All-Time Net"     val={$(allG+allCB)}  accent="#0ea5e9" sub="After chargebacks"/>
            <SC label="Total Gross"      val={$(allG)}         accent="#10b981"/>
            <SC label="Chargebacks"      val={$(allCB)}        accent="#ef4444" neg/>
            <SC label="Awaiting Payroll" val={$(allPay)}       accent="#f59e0b"/>
            <SC label="Active Users"     val={users.filter(u=>u.active).length} accent="#a78bfa" sub="1 admin · 3 reps"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {/* Rep earnings */}
            <Card>
              <CH title="Rep Earnings" sub="All periods" accent="#0ea5e9"/>
              <div style={{padding:"10px 14px",display:"flex",flexDirection:"column",gap:8}}>
                {REPS.map(rep=>{
                  const ls=calculatedLines.filter(l=>l.rep===rep.id);
                  const g=ls.filter(l=>l.source!=="CHARGEBACK").reduce((s,l)=>s+l.amount,0);
                  const cb=ls.filter(l=>l.source==="CHARGEBACK").reduce((s,l)=>s+l.amount,0);
                  return(
                    <div key={rep.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:BG3,borderRadius:10,border:`1px solid ${BORD2}`}}>
                      <div style={{width:32,height:32,borderRadius:"50%",background:`${rep.color}18`,border:`1.5px solid ${rep.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:rep.color,flexShrink:0}}>{rep.initials}</div>
                      <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:T1}}>{rep.name}</div><div style={{fontSize:10,color:T2}}>{rep.title}</div></div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:14,fontWeight:700,color:T1,fontFamily:MONO}}>{$(g+cb)}</div>
                        <div style={{fontSize:9,color:T2}}>Gross {$(g)}{cb<0&&<span style={{color:"#f87171"}}> · CB {$(cb)}</span>}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
            {/* Payrolls */}
            <Card>
              <CH title="Gusto Payrolls" accent="#a78bfa" right={<Btn color="#a78bfa" load={syncing==="push"} onClick={()=>run("push","Payroll submitted to Gusto")}>Push 2025-03</Btn>}/>
              {payrolls.map((pr,i)=>(
                <div key={pr.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:i<payrolls.length-1?`1px solid ${BORD2}`:"none"}}>
                  <div><div style={{fontSize:12,fontWeight:500,color:T1}}>Period {pr.period}</div><div style={{fontSize:10,color:T2}}>Check {pr.check} · {pr.reps} reps</div></div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:13,fontWeight:700,color:T1,fontFamily:MONO}}>{$(pr.total)}</span>
                    <Pill s={pr.status}/>
                    {pr.status==="pending"&&<Btn sm color="#a78bfa" onClick={()=>{setPayrolls(p=>p.map(r=>r.id===pr.id?{...r,status:"processed"}:r));showToast("Confirmed");}}>Confirm</Btn>}
                  </div>
                </div>
              ))}
            </Card>
            {/* QBO */}
            <Card>
              <CH title="QBO Payment Log" accent="#0ea5e9" right={<Btn color="#0ea5e9" load={syncing==="poll"} onClick={()=>run("poll","Polled 5 payments — 4 ingested")}>Poll now</Btn>}/>
              {QBO_LOG.slice(0,4).map((e,i)=>(
                <div key={e.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:i<3?`1px solid ${BORD2}`:"none"}}>
                  <div><div style={{fontSize:12,fontWeight:500,color:T1}}>{e.account}</div><div style={{fontSize:10,color:T2}}>{e.date} · <span style={{color:"#0ea5e9",fontFamily:MONO}}>{e.qbo}</span></div></div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:13,fontWeight:700,color:T1,fontFamily:MONO}}>{$(e.amount)}</span><Pill s={e.status}/></div>
                </div>
              ))}
            </Card>
            {/* Type breakdown */}
            <Card>
              <CH title="Commission by Type" accent="#fb923c" sub="Gross only"/>
              <div style={{padding:"12px 18px",display:"flex",flexDirection:"column",gap:8}}>
                {Object.entries(calculatedLines.filter(l=>l.source!=="CHARGEBACK").reduce((a,l)=>{a[l.source]=(a[l.source]||0)+l.amount;return a;},{})).sort((a,b)=>b[1]-a[1]).map(([src,tot])=>{
                  const t=PLAN_TYPES.find(x=>x.key===src)||{color:"#94a3b8",label:src};
                  return(
                    <div key={src}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:10,fontWeight:600,color:t.color}}>{t.label}</span><span style={{fontSize:11,fontWeight:700,color:T1,fontFamily:MONO}}>{$(tot)}</span></div>
                      <div style={{height:3,background:"rgba(255,255,255,0.05)",borderRadius:2}}><div style={{height:"100%",width:`${Math.max(4,(tot/allG)*100)}%`,background:t.color,borderRadius:2}}/></div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </>}

        {/* ═ COMMISSIONS ═ */}
        {tab==="commissions"&&<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{display:"flex",gap:6}}>
              {REPS.map(r=>(
                <button key={r.id} onClick={()=>setSelRep(r.id)} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:16,border:`1.5px solid ${selRep===r.id?r.color:BORD}`,background:selRep===r.id?`${r.color}12`:"transparent",color:selRep===r.id?r.color:T2,fontSize:11,fontWeight:600,cursor:"pointer"}}>
                  <div style={{width:16,height:16,borderRadius:"50%",background:`${r.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:r.color}}>{r.initials}</div>
                  {r.name}
                </button>
              ))}
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <Btn color="#10b981" onClick={()=>setImportOpen(true)}>📊 Import Sales</Btn>
              <div style={{display:"flex",gap:3,background:BG3,borderRadius:9,padding:2}}>
                {["2025-01","2025-02","2025-03"].map(p=><button key={p} onClick={()=>setPeriod(p)} style={{padding:"4px 12px",borderRadius:7,border:"none",cursor:"pointer",fontSize:10,fontWeight:600,fontFamily:MONO,background:period===p?"rgba(255,255,255,0.1)":"transparent",color:period===p?T1:T2}}>{p}</button>)}
              </div>
            </div>
          </div>
          <Card>
            <CH accent={REPS.find(r=>r.id===selRep)?.color} title={`${REPS.find(r=>r.id===selRep)?.name} — ${period}`} sub={`${repLines.length} lines · Net: ${$(repLines.reduce((s,l)=>s+l.amount,0))}`} right={<Btn color="#ef4444" sm onClick={()=>showToast("Chargeback modal","#ef4444")}>+ Chargeback</Btn>}/>
            <TH cols={["Account","Type","Basis","Rate","Commission","Status"]} tmpl="1fr 130px 90px 60px 100px 80px"/>
            {repLines.length?repLines.map((l,i)=>(
              <TR key={l.id} tmpl="1fr 130px 90px 60px 100px 80px" last={i===repLines.length-1}>
                <div><div style={{fontSize:12,fontWeight:500,color:T1}}>{l.account}</div></div>
                <TypeChip src={l.source}/>
                <span style={{fontSize:11,color:T2,fontFamily:MONO}}>{$(l.basis)}</span>
                <span style={{fontSize:12,fontWeight:700,fontFamily:MONO,color:T2}}>{_p(l.rate)}</span>
                <span style={{fontSize:13,fontWeight:700,fontFamily:MONO,color:l.amount<0?"#ef4444":T1}}>{$(l.amount)}</span>
                <Pill s={l.status}/>
              </TR>
            )):<div style={{padding:32,textAlign:"center",color:T3,fontSize:12}}>No lines for {period}.</div>}
          </Card>
        </>}

        {/* ═ PLANS ═ */}
        {tab==="plans"&&<>
          {/* Global */}
          <Card s={{marginBottom:12}}>
            <CH title="Global Default Rates" sub="Baseline for all reps unless overridden" accent={T2} right={<Btn sm color="#0ea5e9" onClick={()=>setGlobalDrawer(true)}>Edit Global →</Btn>}/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)"}}>
              {[{key:"BASE_ENTRY",label:"Entry",color:"#a78bfa"},{key:"BASE_PREMIUM",label:"Premium",color:"#f472b6"},{key:"PROJECT",label:"Project",color:"#fb923c"},{key:"MRR_EVERGREEN",label:"Evg MRR",color:"#10b981"},{key:"MRR_ONE_TIME",label:"OT MRR",color:"#0ea5e9"},{key:"EXPANSION",label:"Expansion",color:"#818cf8"}].map((t,i)=>(
                <div key={t.key} style={{padding:"13px 14px",borderRight:i<5?`1px solid ${BORD2}`:"none"}}>
                  <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}><div style={{width:6,height:6,borderRadius:"50%",background:t.color}}/><span style={{fontSize:9,fontWeight:700,color:T2}}>{t.label}</span></div>
                  <div style={{fontSize:18,fontWeight:700,color:T2,fontFamily:MONO}}>{_p(globalPlan[t.key].rate)}</div>
                  <div style={{fontSize:9,color:T3,marginTop:2}}>{globalPlan[t.key].basis}</div>
                </div>
              ))}
            </div>
          </Card>
          {/* Per-rep */}
          {REPS.map(rep=>{
            const plan=repPlans[rep.id]||{};
            const cc=[{key:"BASE_ENTRY"},{key:"BASE_PREMIUM"},{key:"PROJECT"},{key:"MRR_EVERGREEN"},{key:"MRR_ONE_TIME"},{key:"EXPANSION"}].filter(t=>plan[t.key]?.rate!==globalPlan[t.key]?.rate).length;
            return(
              <Card key={rep.id} s={{marginBottom:10}}>
                <CH accent={rep.color} title={rep.name} sub={cc>0?`${cc} custom rate${cc>1?"s":""}`:"All global defaults"}
                  right={<div style={{display:"flex",gap:6}}>
                    {cc>0&&<Btn sm color="#ef4444" onClick={()=>{const gl=globalPlan;setRepPlans(p=>({...p,[rep.id]:{BASE_ENTRY:{...gl.BASE_ENTRY},BASE_PREMIUM:{...gl.BASE_PREMIUM},PROJECT:{...gl.PROJECT},MRR_EVERGREEN:{...gl.MRR_EVERGREEN},MRR_ONE_TIME:{...gl.MRR_ONE_TIME},EXPANSION:{...gl.EXPANSION}}}));showToast("Reset to global","#94a3b8");}}>Reset all</Btn>}
                    <Btn sm color={rep.color} onClick={()=>setPlanDrawer(rep)}>Edit plan →</Btn>
                  </div>}/>
                <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)"}}>
                  {[{key:"BASE_ENTRY",label:"Entry",color:"#a78bfa"},{key:"BASE_PREMIUM",label:"Premium",color:"#f472b6"},{key:"PROJECT",label:"Project",color:"#fb923c"},{key:"MRR_EVERGREEN",label:"Evg MRR",color:"#10b981"},{key:"MRR_ONE_TIME",label:"OT MRR",color:"#0ea5e9"},{key:"EXPANSION",label:"Expansion",color:"#818cf8"}].map((t,i)=>{
                    const cur=plan[t.key]||globalPlan[t.key];
                    const isOv=cur?.rate!==globalPlan[t.key]?.rate;
                    return(
                      <div key={t.key} style={{padding:"13px 14px",background:isOv?"rgba(245,158,11,0.04)":"transparent",borderRight:i<5?`1px solid ${BORD2}`:"none",borderTop:isOv?"1px solid rgba(245,158,11,0.1)":"1px solid transparent"}}>
                        <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}><div style={{width:6,height:6,borderRadius:"50%",background:t.color}}/><span style={{fontSize:9,fontWeight:700,color:T2}}>{t.label}</span></div>
                        <div style={{fontSize:17,fontWeight:700,fontFamily:MONO,color:isOv?"#f59e0b":T1}}>{_p(cur.rate)}</div>
                        {isOv&&<div style={{fontSize:8,color:T2,marginTop:1}}>↑ from {_p(globalPlan[t.key].rate)}</div>}
                        {isOv&&<button onClick={()=>{setRepPlans(p=>({...p,[rep.id]:{...p[rep.id],[t.key]:{...globalPlan[t.key]}}}));showToast("Reset","#94a3b8");}} style={{marginTop:5,fontSize:8,padding:"1px 5px",borderRadius:5,background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.15)",color:"#f87171",cursor:"pointer"}}>Reset</button>}
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
          {/* Overrides */}
          <div style={{marginTop:6}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{display:"flex",gap:5,alignItems:"center"}}>
                <span style={{fontSize:13,fontWeight:600,color:T1,marginRight:6}}>Opportunity Overrides</span>
                {[{id:"all",label:"All"},...REPS.map(r=>({id:r.id,label:r.name.split(" ")[0]}))].map(r=>(
                  <button key={r.id} onClick={()=>setFiltRep(r.id)} style={{padding:"2px 9px",borderRadius:10,border:"1px solid",fontSize:10,fontWeight:600,borderColor:filtRep===r.id?"rgba(14,165,233,0.5)":BORD,background:filtRep===r.id?"rgba(14,165,233,0.1)":"transparent",color:filtRep===r.id?"#0ea5e9":T2,cursor:"pointer"}}>{r.label}</button>
                ))}
              </div>
              <Btn color="#0ea5e9" onClick={()=>{setEditOv(null);setOvOpen(true);}}>+ New Override</Btn>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {overrides.filter(o=>filtRep==="all"||o.rep===filtRep).map(ov=>{
                const rep=REPS.find(r=>r.id===ov.rep);
                const ti=PLAN_TYPES.find(t=>t.key===ov.type);
                const gl=globalPlan[ov.type]?.rate||0.1;
                const lift=((ov.rate-gl)/gl*100).toFixed(0);
                return(
                  <div key={ov.id} style={{background:BG3,border:`1px solid ${ov.locked?"rgba(239,68,68,0.2)":BORD}`,borderRadius:11,padding:"12px 16px",display:"grid",gridTemplateColumns:"32px 1fr 90px 110px 1fr 90px",gap:10,alignItems:"center"}}>
                    <div style={{width:30,height:30,borderRadius:"50%",background:`${rep?.color}18`,border:`1.5px solid ${rep?.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:rep?.color}}>{rep?.initials}</div>
                    <div><div style={{fontSize:12,fontWeight:600,color:T1}}>{ov.account}</div><div style={{display:"flex",gap:5,alignItems:"center",marginTop:2}}><span style={{fontSize:9,color:T2}}>{rep?.name}</span><TypeChip src={ov.type}/>{ov.locked&&<Tag c="#f87171">🔒 Locked</Tag>}</div></div>
                    <div><div style={{fontSize:18,fontWeight:700,color:"#f59e0b",fontFamily:MONO}}>{_p(ov.rate)}</div><div style={{fontSize:9,color:T2}}>+{lift}% global</div></div>
                    <div style={{fontSize:10,color:T2}}>{ov.effective}<br/>{ov.expires?`→ ${ov.expires}`:"No expiry"}</div>
                    <div style={{fontSize:10,color:T2,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{ov.reason}</div>
                    <div style={{display:"flex",flexDirection:"column",gap:4}}>
                      {!ov.locked&&<Btn sm color="#0ea5e9" onClick={()=>{setEditOv(ov);setOvOpen(true);}}>Edit</Btn>}
                      <Btn sm color="#ef4444" ghost onClick={()=>{setOverrides(p=>p.filter(o=>o.id!==ov.id));showToast("Removed","#ef4444");}}>Remove</Btn>
                    </div>
                  </div>
                );
              })}
              {overrides.filter(o=>filtRep==="all"||o.rep===filtRep).length===0&&(
                <div style={{padding:28,textAlign:"center",color:T3,fontSize:12,background:BG3,borderRadius:10,border:`1px dashed ${BORD}`}}>No overrides. Click "+ New Override" to add one.</div>
              )}
            </div>
          </div>
        </>}

        {/* ═ OPPORTUNITIES ═ */}
        {tab==="opportunities"&&<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>setSelRep("all")} style={{padding:"5px 14px",borderRadius:16,border:`1.5px solid ${selRep==="all"?"#fb923c":BORD}`,background:selRep==="all"?"rgba(251,146,60,0.12)":"transparent",color:selRep==="all"?"#fb923c":T2,fontSize:11,fontWeight:600,cursor:"pointer"}}>All Reps</button>
              {REPS.map(r=>(
                <button key={r.id} onClick={()=>setSelRep(r.id)} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:16,border:`1.5px solid ${selRep===r.id?r.color:BORD}`,background:selRep===r.id?`${r.color}12`:"transparent",color:selRep===r.id?r.color:T2,fontSize:11,fontWeight:600,cursor:"pointer"}}>
                  <div style={{width:16,height:16,borderRadius:"50%",background:`${r.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:r.color}}>{r.initials}</div>
                  {r.name}
                </button>
              ))}
            </div>
            <Btn color="#10b981" load={syncing==="ghls"} onClick={()=>{run("ghls","Synced 12 opportunities from GoHighLevel");const now=new Date().toLocaleString();setIntegrations(p=>({...p,gohighlevel:{...p.gohighlevel,lastSync:now}}));}}>🔄 Sync from GHL</Btn>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:11,marginBottom:16}}>
            <SC label="Total Open" val={opportunities.filter(o=>o.stage!=="Won").length} accent="#fb923c" sub={`${opportunities.filter(o=>o.stage==="Won").length} won`}/>
            <SC label="Total Value" val={$(opportunities.reduce((s,o)=>s+o.value,0))} accent="#10b981" sub="All opportunities"/>
            <SC label="Won (Pending Import)" val={opportunities.filter(o=>o.status==="synced"&&!o.imported).length} accent="#f59e0b" sub={`Ready to import`}/>
          </div>

          <Card>
            <CH title="GoHighLevel Opportunities" accent="#fb923c" sub={`${(selRep==="all"?opportunities:opportunities.filter(o=>o.rep===selRep)).length} opportunities`} 
              right={
                <div style={{display:"flex",gap:6}}>
                  <Btn sm color="#10b981" onClick={()=>{
                    const wonOpps=opportunities.filter(o=>o.status==="synced"&&!o.imported&&(selRep==="all"||o.rep===selRep));
                    if(wonOpps.length===0){showToast("No won opportunities to import","#f59e0b");return;}
                    const sales=wonOpps.map(opp=>({
                      repName:opp.repName,
                      account:opp.contact,
                      saleDate:opp.closedDate,
                      invoiceId:opp.ghlId,
                      commissionType:opp.commissionType,
                      commissionableAmount:opp.value,
                      period:opp.closedDate?opp.closedDate.substring(0,7):"2025-03"
                    }));
                    processSalesImport(sales);
                    setOpportunities(p=>p.map(o=>wonOpps.find(w=>w.id===o.id)?{...o,imported:true}:o));
                    showToast(`${wonOpps.length} won opportunities imported as commission lines`);
                  }}>Import Won Opps</Btn>
                  <Btn sm ghost color="#0ea5e9" onClick={()=>showToast("Filter modal","#0ea5e9")}>Filter</Btn>
                </div>
              }
            />
            <TH cols={["Contact","Rep","Stage","Value","Commission Type","Closed Date","Status","Action"]} tmpl="1fr 130px 120px 90px 110px 100px 90px 90px"/>
            {(selRep==="all"?opportunities:opportunities.filter(o=>o.rep===selRep)).map((opp,i,arr)=>{
              const rep=REPS.find(r=>r.id===opp.rep);
              const isWon=opp.stage==="Won";
              return(
                <TR key={opp.id} tmpl="1fr 130px 120px 90px 110px 100px 90px 90px" last={i===arr.length-1}>
                  <div><div style={{fontSize:12,fontWeight:500,color:T1}}>{opp.contact}</div><div style={{fontSize:10,color:T2,fontFamily:MONO}}>{opp.ghlId}</div></div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <div style={{width:20,height:20,borderRadius:"50%",background:`${rep?.color}18`,border:`1px solid ${rep?.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:rep?.color}}>{rep?.initials}</div>
                    <span style={{fontSize:11,color:T2}}>{rep?.name}</span>
                  </div>
                  <span style={{fontSize:11,fontWeight:500,color:isWon?"#10b981":T2}}>{opp.stage}</span>
                  <span style={{fontSize:12,fontWeight:700,color:T1,fontFamily:MONO}}>{$(opp.value)}</span>
                  <TypeChip src={opp.commissionType}/>
                  <span style={{fontSize:10,color:T2}}>{opp.closedDate||"—"}</span>
                  <Pill s={opp.imported?"paid":opp.status}/>
                  {isWon&&!opp.imported?
                    <Btn sm color="#10b981" onClick={()=>{
                      const sale={repName:opp.repName,account:opp.contact,saleDate:opp.closedDate,invoiceId:opp.ghlId,commissionType:opp.commissionType,commissionableAmount:opp.value,period:opp.closedDate?opp.closedDate.substring(0,7):"2025-03"};
                      processSalesImport([sale]);
                      setOpportunities(p=>p.map(o=>o.id===opp.id?{...o,imported:true}:o));
                      showToast("Imported as commission line");
                    }}>Import</Btn>
                  :isWon&&opp.imported?
                    <span style={{fontSize:10,color:"#10b981"}}>✓ Done</span>
                  :
                    <span style={{fontSize:10,color:T3}}>—</span>
                  }
                </TR>
              );
            })}
          </Card>
        </>}

        {/* ═ PAYROLL ═ */}
        {tab==="payroll"&&<>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
            {[{k:"sync",label:"Sync Employees → Reps",icon:"👥",c:"#a78bfa",msg:"Matched 3 employees → Reps"},{k:"push",label:"Push Commission Payroll",icon:"🚀",c:"#10b981",msg:"Payroll submitted to Gusto"},{k:"confirm",label:"Confirm Pay Stubs",icon:"✅",c:"#f59e0b",msg:"2 payrolls confirmed"}].map(a=>(
              <div key={a.k} style={{background:BG3,border:`1px solid ${a.c}18`,borderRadius:12,padding:"16px 18px",display:"flex",flexDirection:"column",gap:10}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:38,height:38,borderRadius:9,background:`${a.c}14`,border:`1px solid ${a.c}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{a.icon}</div><span style={{fontSize:12,fontWeight:600,color:T1}}>{a.label}</span></div>
                <Btn color={a.c} load={syncing===a.k} onClick={()=>run(a.k,a.msg)}>Run</Btn>
              </div>
            ))}
          </div>
          <Card s={{marginBottom:12}}>
            <CH title="Payroll History" accent="#a78bfa"/>
            <TH cols={["ID","Period","Check Date","Reps","Total","Status","Action"]} tmpl="100px 80px 100px 50px 100px 90px 80px"/>
            {payrolls.map((pr,i)=>(
              <TR key={pr.id} tmpl="100px 80px 100px 50px 100px 90px 80px" last={i===payrolls.length-1}>
                <span style={{fontSize:10,color:"#a78bfa",fontFamily:MONO}}>{pr.id}</span>
                <span style={{fontSize:11,color:T1,fontFamily:MONO}}>{pr.period}</span>
                <span style={{fontSize:10,color:T2}}>{pr.check}</span>
                <span style={{fontSize:11,color:T2}}>{pr.reps}</span>
                <span style={{fontSize:12,fontWeight:700,color:T1,fontFamily:MONO}}>{$(pr.total)}</span>
                <Pill s={pr.status}/>
                {pr.status==="pending"?<Btn sm color="#a78bfa" onClick={()=>{setPayrolls(p=>p.map(r=>r.id===pr.id?{...r,status:"processed"}:r));showToast("Confirmed");}}>Confirm</Btn>:<span style={{fontSize:10,color:"#10b981"}}>✓ Done</span>}
              </TR>
            ))}
          </Card>
          <Card>
            <CH title="2025-03 Payable Breakdown" accent="#f59e0b"/>
            <TH cols={["Rep","Lines","Gross","Chargebacks","Net Payable"]} tmpl="1fr 70px 110px 110px 120px"/>
            {REPS.map((rep,i)=>{
              const ls=LINES.filter(l=>l.rep===rep.id&&l.period==="2025-03");
              const g=ls.filter(l=>l.source!=="CHARGEBACK").reduce((s,l)=>s+l.amount,0);
              const cb=ls.filter(l=>l.source==="CHARGEBACK").reduce((s,l)=>s+l.amount,0);
              return(
                <TR key={rep.id} tmpl="1fr 70px 110px 110px 120px" last={i===REPS.length-1}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:26,height:26,borderRadius:"50%",background:`${rep.color}18`,border:`1.5px solid ${rep.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:rep.color}}>{rep.initials}</div><span style={{fontSize:12,fontWeight:500,color:T1}}>{rep.name}</span></div>
                  <span style={{fontSize:11,color:T2}}>{ls.length}</span>
                  <span style={{fontSize:12,fontWeight:700,color:T1,fontFamily:MONO}}>{$(g)}</span>
                  <span style={{fontSize:12,fontWeight:700,color:cb<0?"#ef4444":T2,fontFamily:MONO}}>{cb<0?$(cb):"—"}</span>
                  <span style={{fontSize:13,fontWeight:700,color:g+cb>0?"#f59e0b":"#ef4444",fontFamily:MONO}}>{$(g+cb)}</span>
                </TR>
              );
            })}
          </Card>
        </>}

        {/* ═ USERS ═ */}
        {tab==="users"&&(
          <Card>
            <CH title="User Management" accent="#f472b6" sub={`${users.length} accounts · ${users.filter(u=>u.active).length} active`} right={<Btn color="#f472b6" onClick={()=>showToast("User creation form","#f472b6")}>+ New User</Btn>}/>
            <TH cols={["Name · Email","Role","Scoped To","Status","Action"]} tmpl="1fr 90px 140px 80px 90px"/>
            {users.map((u,i)=>{
              const rc=u.role==="admin"?"#f472b6":"#0ea5e9";
              const rn=u.rep?REPS.find(r=>r.id===u.rep)?.name:null;
              return(
                <TR key={u.id} tmpl="1fr 90px 140px 80px 90px" last={i===users.length-1}>
                  <div style={{opacity:u.active?1:0.45}}><div style={{fontSize:12,fontWeight:500,color:T1}}>{u.name}</div><div style={{fontSize:10,color:T2}}>{u.email}</div></div>
                  <span style={{fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:16,color:rc,background:`${rc}14`,textTransform:"uppercase",letterSpacing:"0.05em",opacity:u.active?1:0.45}}>{u.role}</span>
                  <span style={{fontSize:10,color:rn?T2:T3,opacity:u.active?1:0.45}}>{rn||"All reps"}</span>
                  <Pill s={u.active?"active":"inactive"}/>
                  <button onClick={()=>{setUsers(p=>p.map(x=>x.id===u.id?{...x,active:!x.active}:x));showToast("User updated");}} style={{fontSize:10,fontWeight:600,padding:"3px 9px",borderRadius:6,background:u.active?"rgba(239,68,68,0.1)":"rgba(16,185,129,0.1)",border:`1px solid ${u.active?"rgba(239,68,68,0.25)":"rgba(16,185,129,0.25)"}`,color:u.active?"#f87171":"#10b981",cursor:"pointer"}}>{u.active?"Deactivate":"Activate"}</button>
                </TR>
              );
            })}
          </Card>
        )}

        {/* ═ INTEGRATIONS ═ */}
        {tab==="integrations"&&<>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:12}}>
            {[
              {key:"qbo",name:"QuickBooks Online",icon:"📊",color:"#0ea5e9",data:integrations.qbo,feats:["Invoice payments → commission trigger","Customer sync → Accounts","Real-time HMAC webhook","Manual poll backfill"]},
              {key:"gusto",name:"Gusto Payroll",icon:"💼",color:"#a78bfa",data:integrations.gusto,feats:["Employee sync → Reps","Off-cycle bonus pay runs","Pay stub confirmation","Auto token refresh"]},
              {key:"gohighlevel",name:"GoHighLevel CRM",icon:"🎯",color:"#fb923c",data:integrations.gohighlevel,feats:["Won opportunities → commissions","Pipeline stage triggers","Custom field mapping","Real-time webhooks"]}
            ].map(x=>(
              <div key={x.name} style={{background:BG3,border:`1px solid ${x.color}1a`,borderRadius:12,padding:"18px 20px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:40,height:40,borderRadius:10,background:`${x.color}14`,border:`1px solid ${x.color}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{x.icon}</div>
                    <div><div style={{fontSize:13,fontWeight:600,color:T1}}>{x.name}</div><div style={{fontSize:10,color:T2,fontFamily:MONO,marginTop:1}}>{x.key==="qbo"?x.data.realmId||"Not configured":x.key==="gusto"?x.data.companyUuid||"Not configured":x.data.locationId||"Not configured"}</div></div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:5,padding:"3px 9px",background:x.data.enabled?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${x.data.enabled?"rgba(16,185,129,0.2)":"rgba(239,68,68,0.2)"}`,borderRadius:12}}>
                    <div style={{width:5,height:5,borderRadius:"50%",background:x.data.enabled?"#10b981":"#ef4444",boxShadow:`0 0 5px ${x.data.enabled?"#10b981":"#ef4444"}`}}/>
                    <span style={{fontSize:10,fontWeight:600,color:x.data.enabled?"#10b981":"#ef4444"}}>{x.data.enabled?"Connected":"Disconnected"}</span>
                  </div>
                </div>
                {x.feats.map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}><span style={{fontSize:9,color:x.color}}>✓</span><span style={{fontSize:11,color:T2}}>{f}</span></div>)}
                <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${BORD2}`,display:"flex",gap:6}}>
                  <Btn sm color={x.color} onClick={()=>setConfigOpen(x.key)}>⚙️ Settings</Btn>
                  {x.data.enabled&&x.key==="gohighlevel"&&<Btn sm color="#10b981" load={syncing==="ghls"} onClick={()=>run("ghls","Synced 12 opportunities from GHL")}>Test Sync</Btn>}
                </div>
              </div>
            ))}
          </div>
          <Card>
            <CH title="QBO Ingestion Log" accent="#0ea5e9" right={<div style={{display:"flex",gap:6}}><Btn sm color="#0ea5e9" load={syncing==="sc"} onClick={()=>run("sc","Synced 24 customers")}>Sync customers</Btn><Btn sm color="#10b981" load={syncing==="pp"} onClick={()=>run("pp","Polled 5 payments")}>Poll payments</Btn></div>}/>
            <TH cols={["QBO ID","Account","Date","Amount","Lines","Status"]} tmpl="100px 1fr 80px 100px 50px 100px"/>
            {QBO_LOG.map((e,i)=>(
              <TR key={e.id} tmpl="100px 1fr 80px 100px 50px 100px" last={i===QBO_LOG.length-1}>
                <span style={{fontSize:10,color:"#0ea5e9",fontFamily:MONO}}>{e.qbo}</span>
                <span style={{fontSize:12,fontWeight:500,color:T1}}>{e.account}</span>
                <span style={{fontSize:10,color:T2}}>{e.date}</span>
                <span style={{fontSize:12,fontWeight:700,color:T1,fontFamily:MONO}}>{$(e.amount)}</span>
                <span style={{fontSize:11,color:e.lines>0?"#10b981":T2,fontWeight:700}}>{e.lines>0?`+${e.lines}`:"—"}</span>
                <Pill s={e.status}/>
              </TR>
            ))}
          </Card>
        </>}

        {/* ═ SETTINGS ═ */}
        {tab==="settings"&&<>
          <div style={{maxWidth:800}}>
            <h2 style={{fontSize:18,fontWeight:700,color:T1,marginBottom:16}}>System Configuration</h2>
            
            {/* Global Settings */}
            <Card s={{marginBottom:16}}>
              <CH title="Global Defaults" accent="#0ea5e9" sub="Commission plan defaults applied to all new reps"/>
              <div style={{padding:"16px 18px"}}>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:11,fontWeight:600,color:T1,marginBottom:6}}>Default Commission Plan</div>
                  <div style={{fontSize:10,color:T2}}>These rates are automatically assigned to new sales reps. You can customize individual rep rates in the Plans tab.</div>
                </div>
                <Btn color="#0ea5e9" onClick={()=>setGlobalDrawer(true)}>Edit Global Plan</Btn>
              </div>
            </Card>

            {/* Integration Cards */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:16}}>
              <Card>
                <CH title="QuickBooks Online" accent="#0ea5e9"/>
                <div style={{padding:"16px 18px"}}>
                  <div style={{marginBottom:12}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:integrations.qbo.enabled?"#10b981":"#ef4444"}}/>
                      <span style={{fontSize:11,fontWeight:600,color:T1}}>{integrations.qbo.enabled?"Connected":"Disconnected"}</span>
                    </div>
                    <div style={{fontSize:10,color:T2}}>Company: {integrations.qbo.companyName||"Not configured"}</div>
                    <div style={{fontSize:10,color:T2,fontFamily:MONO}}>ID: {integrations.qbo.realmId||"—"}</div>
                    {integrations.qbo.enabled&&<div style={{fontSize:10,color:T2}}>Last sync: {integrations.qbo.lastSync||"Never"}</div>}
                  </div>
                  <Btn sm color="#0ea5e9" onClick={()=>setConfigOpen("qbo")}>Configure QBO</Btn>
                </div>
              </Card>

              <Card>
                <CH title="Gusto Payroll" accent="#a78bfa"/>
                <div style={{padding:"16px 18px"}}>
                  <div style={{marginBottom:12}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:integrations.gusto.enabled?"#10b981":"#ef4444"}}/>
                      <span style={{fontSize:11,fontWeight:600,color:T1}}>{integrations.gusto.enabled?"Connected":"Disconnected"}</span>
                    </div>
                    <div style={{fontSize:10,color:T2}}>Company: {integrations.gusto.companyName||"Not configured"}</div>
                    <div style={{fontSize:10,color:T2,fontFamily:MONO}}>UUID: {integrations.gusto.companyUuid||"—"}</div>
                    {integrations.gusto.enabled&&<div style={{fontSize:10,color:T2}}>Last sync: {integrations.gusto.lastSync||"Never"}</div>}
                  </div>
                  <Btn sm color="#a78bfa" onClick={()=>setConfigOpen("gusto")}>Configure Gusto</Btn>
                </div>
              </Card>

              <Card>
                <CH title="GoHighLevel CRM" accent="#fb923c"/>
                <div style={{padding:"16px 18px"}}>
                  <div style={{marginBottom:12}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:integrations.gohighlevel.enabled?"#10b981":"#ef4444"}}/>
                      <span style={{fontSize:11,fontWeight:600,color:T1}}>{integrations.gohighlevel.enabled?"Connected":"Disconnected"}</span>
                    </div>
                    <div style={{fontSize:10,color:T2}}>Agency: {integrations.gohighlevel.agencyName||"Not configured"}</div>
                    <div style={{fontSize:10,color:T2,fontFamily:MONO}}>Location: {integrations.gohighlevel.locationId||"—"}</div>
                    {integrations.gohighlevel.enabled&&<div style={{fontSize:10,color:T2}}>Last sync: {integrations.gohighlevel.lastSync||"Never"}</div>}
                  </div>
                  <Btn sm color="#fb923c" onClick={()=>setConfigOpen("gohighlevel")}>Configure GHL</Btn>
                </div>
              </Card>
            </div>

            {/* System Info */}
            <Card>
              <CH title="System Information" accent="#64748b"/>
              <div style={{padding:"16px 18px"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  <div>
                    <div style={{fontSize:9,fontWeight:700,color:T3,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>Version</div>
                    <div style={{fontSize:12,color:T1,fontFamily:MONO}}>v1.0.0-demo</div>
                  </div>
                  <div>
                    <div style={{fontSize:9,fontWeight:700,color:T3,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>Environment</div>
                    <div style={{fontSize:12,color:T1}}>Demo Mode</div>
                  </div>
                  <div>
                    <div style={{fontSize:9,fontWeight:700,color:T3,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>Data Storage</div>
                    <div style={{fontSize:12,color:T1}}>Local (In-Memory)</div>
                  </div>
                  <div>
                    <div style={{fontSize:9,fontWeight:700,color:T3,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>Database</div>
                    <div style={{fontSize:12,color:T1}}>Not Connected</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// REP DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
function RepDash({repId}) {
  const [tab,setTab]       = useState("commissions");
  const [period,setPeriod] = useState("2025-03");
  const rep     = REPS.find(r=>r.id===repId);
  const my      = LINES.filter(l=>l.rep===repId);
  const pLines  = my.filter(l=>l.period===period);
  const gross   = my.filter(l=>l.source!=="CHARGEBACK").reduce((s,l)=>s+l.amount,0);
  const cb      = my.filter(l=>l.source==="CHARGEBACK").reduce((s,l)=>s+l.amount,0);
  const paid    = my.filter(l=>l.status==="paid").reduce((s,l)=>s+l.amount,0);
  const pend    = my.filter(l=>l.status==="payable"||l.status==="pending").reduce((s,l)=>s+l.amount,0);
  const monthly = ["2025-01","2025-02","2025-03"].map(p=>Math.max(0,my.filter(l=>l.period===p).reduce((s,l)=>s+l.amount,0)));
  const maxM    = Math.max(...monthly,1);
  const accounts= [...new Set(my.map(l=>l.account))];
  const TABS    = [{id:"commissions",label:"Commissions"},{id:"accounts",label:"Accounts"},{id:"payments",label:"Payments"}];

  return (
    <div style={{flex:1,overflowY:"auto",padding:"22px 24px 60px",maxWidth:960,margin:"0 auto",width:"100%",boxSizing:"border-box"}}>
      <div style={{marginBottom:20}}>
        <h1 style={{fontSize:22,fontWeight:700,color:T1,margin:"0 0 4px",letterSpacing:"-0.02em"}}>
          Good morning, {rep?.name.split(" ")[0]} 👋
        </h1>
        <p style={{margin:0,fontSize:12,color:T2}}>Your personal commission summary — scoped to your accounts only.</p>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11,marginBottom:16}}>
        <SC label="All-Time Net"     val={$(gross+cb)} accent={rep?.color} sub="After chargebacks"/>
        <SC label="Total Paid Out"   val={$(paid)}     accent="#0ea5e9"/>
        <SC label="Awaiting Payment" val={$(pend)}     accent="#f59e0b"/>
        <SC label="Active Accounts"  val={accounts.length} accent="#a78bfa" sub="Earning commissions"/>
      </div>

      {/* Trend + by type */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        <Card><div style={{padding:"14px 16px"}}>
          <div style={{fontSize:9,fontWeight:700,color:T2,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>Monthly Trend</div>
          <div style={{fontSize:20,fontWeight:700,color:T1,fontFamily:MONO,marginBottom:14}}>{$(monthly[2])} <span style={{fontSize:11,fontWeight:400,color:T2,fontFamily:SANS}}>in Mar</span></div>
          <div style={{display:"flex",alignItems:"flex-end",gap:6,height:34,marginBottom:6}}>
            {monthly.map((v,i)=><div key={i} style={{flex:1,borderRadius:"2px 2px 0 0",background:i===2?rep?.color:`${rep?.color}44`,height:`${(v/maxM)*100}%`,minHeight:3}}/>)}
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>{["Jan","Feb","Mar"].map(m=><span key={m} style={{fontSize:9,color:T3}}>{m}</span>)}</div>
        </div></Card>
        <Card><div style={{padding:"14px 16px"}}>
          <div style={{fontSize:9,fontWeight:700,color:T2,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:11}}>By Type</div>
          {Object.entries(my.filter(l=>l.source!=="CHARGEBACK").reduce((a,l)=>{a[l.source]=(a[l.source]||0)+l.amount;return a;},{})).sort((a,b)=>b[1]-a[1]).map(([src,tot])=>{
            const t=PLAN_TYPES.find(x=>x.key===src)||{color:"#94a3b8",label:src};
            return(
              <div key={src} style={{marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:10,fontWeight:600,color:t.color}}>{t.label}</span><span style={{fontSize:11,fontWeight:700,color:T1,fontFamily:MONO}}>{$(tot)}</span></div>
                <div style={{height:3,background:"rgba(255,255,255,0.05)",borderRadius:2}}><div style={{height:"100%",width:`${Math.max(4,(tot/Math.max(gross,1))*100)}%`,background:t.color,borderRadius:2}}/></div>
              </div>
            );
          })}
        </div></Card>
      </div>

      {/* Tabs + period */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <Tabs tabs={TABS} active={tab} set={setTab}/>
        <div style={{display:"flex",gap:3,background:BG3,borderRadius:9,padding:2}}>
          {["2025-01","2025-02","2025-03"].map(p=><button key={p} onClick={()=>setPeriod(p)} style={{padding:"4px 12px",borderRadius:7,border:"none",cursor:"pointer",fontSize:10,fontWeight:600,fontFamily:MONO,background:period===p?"rgba(255,255,255,0.1)":"transparent",color:period===p?T1:T2}}>{p}</button>)}
        </div>
      </div>

      {tab==="commissions"&&(
        <Card>
          <CH accent={rep?.color} title={`Commission Lines — ${period}`} sub={`${pLines.length} lines · Net: ${$(pLines.reduce((s,l)=>s+l.amount,0))}`}/>
          <TH cols={["Account","Type","Basis","Rate","Commission","Status"]} tmpl="1fr 130px 90px 60px 100px 80px"/>
          {pLines.length?pLines.map((l,i)=>(
            <TR key={l.id} tmpl="1fr 130px 90px 60px 100px 80px" last={i===pLines.length-1}>
              <div><div style={{fontSize:12,fontWeight:500,color:T1}}>{l.account}</div></div>
              <TypeChip src={l.source}/>
              <span style={{fontSize:11,color:T2,fontFamily:MONO}}>{$(l.basis)}</span>
              <span style={{fontSize:12,fontWeight:700,fontFamily:MONO,color:T2}}>{_p(l.rate)}</span>
              <span style={{fontSize:13,fontWeight:700,fontFamily:MONO,color:l.amount<0?"#ef4444":T1}}>{$(l.amount)}</span>
              <Pill s={l.status}/>
            </TR>
          )):<div style={{padding:32,textAlign:"center",color:T3,fontSize:12}}>No lines for {period}.</div>}
        </Card>
      )}

      {tab==="accounts"&&(
        <Card>
          <CH accent="#0ea5e9" title="Your Accounts"/>
          <TH cols={["Account","Total Lines","Total Earned","Avg Rate","Status"]} tmpl="1fr 90px 120px 90px 80px"/>
          {accounts.map((name,i)=>{
            const ls=my.filter(l=>l.account===name);
            const earn=ls.reduce((s,l)=>s+l.amount,0);
            const avgR=ls.reduce((s,l)=>s+l.rate,0)/ls.length;
            return(
              <TR key={name} tmpl="1fr 90px 120px 90px 80px" last={i===accounts.length-1}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:28,height:28,borderRadius:7,background:"rgba(14,165,233,0.1)",border:"1px solid rgba(14,165,233,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#0ea5e9"}}>{name.slice(0,2)}</div>
                  <span style={{fontSize:12,fontWeight:500,color:T1}}>{name}</span>
                </div>
                <span style={{fontSize:11,color:T2}}>{ls.length}</span>
                <span style={{fontSize:12,fontWeight:700,fontFamily:MONO,color:earn<0?"#ef4444":T1}}>{$(earn)}</span>
                <span style={{fontSize:12,fontWeight:600,fontFamily:MONO,color:T2}}>{_p(avgR)}</span>
                <Pill s="active"/>
              </TR>
            );
          })}
        </Card>
      )}

      {tab==="payments"&&(
        <Card>
          <CH accent="#a78bfa" title="Payment History" sub="Invoice payments from your accounts"/>
          <TH cols={["Account","Period","Invoice Amt","Commission","Status"]} tmpl="1fr 100px 120px 120px 80px"/>
          {my.filter(l=>l.source!=="CHARGEBACK").map((l,i,arr)=>(
            <TR key={l.id} tmpl="1fr 100px 120px 120px 80px" last={i===arr.length-1}>
              <span style={{fontSize:12,fontWeight:500,color:T1}}>{l.account}</span>
              <span style={{fontSize:10,color:T2,fontFamily:MONO}}>{l.period}</span>
              <span style={{fontSize:12,fontWeight:600,fontFamily:MONO,color:T1}}>{$(l.basis)}</span>
              <span style={{fontSize:12,fontWeight:700,fontFamily:MONO,color:"#10b981"}}>{$(l.amount)}</span>
              <Pill s="received"/>
            </TR>
          ))}
        </Card>
      )}

      <div style={{marginTop:12,background:"rgba(14,165,233,0.05)",border:"1px solid rgba(14,165,233,0.12)",borderRadius:10,padding:"9px 13px",display:"flex",alignItems:"center",gap:9}}>
        <span style={{fontSize:13}}>🔒</span>
        <p style={{margin:0,fontSize:11,color:"rgba(14,165,233,0.7)",lineHeight:1.5}}>You're viewing your own data only. To dispute a commission line, contact your manager within 30 days.</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [user, setUser] = useState(null); // null = not logged in
  const [view, setView] = useState("admin");

  // Handle login
  const handleLogin = (userData) => {
    setUser(userData);
    // Set initial view based on role
    if (userData.role === "admin") {
      setView("admin");
    } else if (userData.rep) {
      setView(userData.rep);
    } else {
      // Default to first rep for demo
      setView("rep-1");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setView("admin");
  };

  // Show login if not authenticated
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const isAdmin = view === "admin";

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:BG,fontFamily:SANS,overflow:"hidden"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500;700&display=swap" rel="stylesheet"/>
      <style>{`*{box-sizing:border-box}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:3px}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <DemoSwitcher view={view} set={setView}/>
      <Header view={view} user={user} onLogout={handleLogout}/>
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column"}}>
        {isAdmin ? <AdminDash/> : <RepDash repId={view}/>}
      </div>
    </div>
  );
}
