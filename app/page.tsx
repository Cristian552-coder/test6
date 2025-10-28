"use client";
import React, { useMemo, useState } from "react";

function classNames(...c){ return c.filter(Boolean).join(" "); }

function Badge({ children, intent = "default" }){
  const map = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
  };
  return <span className={"inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium "+map[intent]}>{children}</span>;
}

function Semaforo({ dias }){
  const color = dias > 7 ? "bg-green-500" : dias >= 3 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <span className={"h-2.5 w-2.5 rounded-full "+color} />
      <span className="text-xs text-slate-600">{dias} días</span>
    </div>
  );
}

// --- lead states helpers ---
const LEAD_STATES = ["Nuevo","Contactado","Reunión","Propuesta","Ganado","Perdido"];
const leadIntent = (estado) => estado === "Ganado" ? "success" : estado === "Perdido" ? "danger" : estado === "Propuesta" ? "warning" : "default";

const kpi = [
  { label: "Clientes activos", value: 18 },
  { label: "Leads activos", value: 42 },
  { label: "Entregas (7 días)", value: 6 },
  { label: "Reuniones (semana)", value: 9 },
];

// fake clients data
const seedClients = [
  { id: "C-001", nombre: "Grupo Andrés S.A.", responsable: "María González", estado: "Producción", fechaObjetivo: "2025-11-04", dias: 11, progreso: 62 },
  { id: "C-002", nombre: "TransMarín S.L.", responsable: "José López", estado: "Propuesta", fechaObjetivo: "2025-11-01", dias: 8, progreso: 35 },
  { id: "C-003", nombre: "EcoMarket", responsable: "Sara Ruiz", estado: "Entrega", fechaObjetivo: "2025-10-29", dias: 5, progreso: 88 },
];

// fake leads organized by columns
const seedLeads = {
  Nuevo: [ { id: "L-101", empresa: "Frutería Sol", valor: 3500 }, { id: "L-102", empresa: "Bebidas Norte", valor: 12000 } ],
  Contactado: [ { id: "L-103", empresa: "Quesera MX", valor: 5200 } ],
  Reunión: [ { id: "L-104", empresa: "PanEuropa", valor: 7800 } ],
  Propuesta: [ { id: "L-105", empresa: "Cárnicos 21", valor: 15000 } ],
  Ganado: [ ],
  Perdido: [ ]
};

function Card({ children, className="" }){
  return <div className={"bg-white rounded-2xl shadow-sm border border-slate-200 "+className}>{children}</div>;
}
function CardHeader({ children, className="" }){ return <div className={"p-4 pb-2 "+className}>{children}</div>; }
function CardTitle({ children, className="" }){ return <div className={"text-base font-semibold "+className}>{children}</div>; }
function CardContent({ children, className="" }){ return <div className={"p-4 pt-2 "+className}>{children}</div>; }

function Button({ children, onClick, variant="solid", size="md", className="" }){
  const v = variant==="solid"?"bg-slate-900 text-white hover:bg-slate-800":variant==="outline"?"border border-slate-300 hover:bg-slate-50":"bg-transparent hover:bg-slate-100";
  const s = size==="sm"?"px-2.5 py-1.5 text-sm":"px-3 py-2";
  return <button onClick={onClick} className={classNames("rounded-xl transition", v, s, className)}>{children}</button>;
}

function Dashboard(){
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpi.map((k,i)=> (
          <Card key={i}>
            <CardHeader className="pb-1"><CardTitle className="text-slate-500">{k.label}</CardTitle></CardHeader>
            <CardContent className="pt-0"><div className="text-3xl font-semibold">{k.value}</div></CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Leads por estado (últimos 90 días)</CardTitle></CardHeader>
          <CardContent>
            <div className="h-40 grid grid-cols-6 items-end gap-3">
              {[12,10,8,7,3,2].map((n,i)=>(
                <div key={i} className="bg-violet-200 rounded-md" style={{height: n*6}} />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Próximas reuniones</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[{t:"Reunión PanEuropa", f:"2025-10-28 10:30"},{t:"Demo LogiCorp", f:"2025-10-29 12:00"},{t:"Kick-off Acme", f:"2025-10-31 09:00"}].map((r,i)=>(
              <div key={i} className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <div className="font-medium">{r.t}</div>
                  <div className="text-xs text-slate-500">{r.f}</div>
                </div>
                <Badge>Calendario</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Próximas entregas</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2 pr-4">Cliente</th>
                  <th className="py-2 pr-4">Paso actual</th>
                  <th className="py-2 pr-4">Fecha objetivo</th>
                  <th className="py-2 pr-4">Días restantes</th>
                  <th className="py-2 pr-4">Responsable</th>
                </tr>
              </thead>
              <tbody>
                {seedClients.map(c=> (
                  <tr key={c.id} className="border-t">
                    <td className="py-2 pr-4">{c.nombre}</td>
                    <td className="py-2 pr-4">{c.estado}</td>
                    <td className="py-2 pr-4">{c.fechaObjetivo}</td>
                    <td className="py-2 pr-4"><Semaforo dias={c.dias}/></td>
                    <td className="py-2 pr-4">{c.responsable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Clientes(){
  const [filter, setFilter] = useState("");
  const [clients, setClients] = useState(seedClients);
  const filtered = useMemo(()=> clients.filter(c => c.nombre.toLowerCase().includes(filter.toLowerCase())),[filter, clients]);
  const [selectedId, setSelectedId] = useState(null);
  const selected = clients.find(c=> c.id===selectedId) || null;

  const defaultSteps = [
    { id: "s1", nombre: "Descubrimiento", done: true, notas: ["Brief validado"], documentos: [] },
    { id: "s2", nombre: "Propuesta", done: false, notas: [], documentos: [] },
    { id: "s3", nombre: "Producción", done: false, notas: [], documentos: [] },
    { id: "s4", nombre: "Entrega", done: false, notas: [], documentos: [] },
  ];
  const [processMap, setProcessMap] = useState({});
  const steps = selected ? (processMap[selected.id] || defaultSteps) : [];

  const [attachOpen, setAttachOpen] = useState(false);
  const [attachType, setAttachType] = useState("nota");
  const [attachStep, setAttachStep] = useState(null);
  const [textValue, setTextValue] = useState("");

  function persistSteps(clientId, upd){ setProcessMap(prev=> ({...prev, [clientId]: upd})); }
  function toggleStep(stepId){ if(!selected) return; persistSteps(selected.id, steps.map(s=> s.id===stepId? {...s, done:!s.done}:s)); }
  function openAttach(stepId, type){ setAttachOpen(true); setAttachType(type); setAttachStep(stepId); setTextValue(""); }
  function confirmAttach(){ if(!selected||!attachStep) return; const upd = steps.map(s=> s.id!==attachStep? s : (attachType==="nota"? {...s, notas:[...s.notas, textValue||"Nota"]}:{...s, documentos:[...s.documentos, textValue||"Documento"]})); persistSteps(selected.id, upd); setAttachOpen(false); }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input className="pl-3 pr-2 py-2 rounded-xl border w-full max-w-sm" placeholder="Buscar clientes..." value={filter} onChange={e=> setFilter(e.target.value)}/>
      </div>

      <Card>
        <CardHeader><CardTitle>Clientes</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Nombre</th>
                  <th className="py-2 pr-4">Responsable</th>
                  <th className="py-2 pr-4">Estado</th>
                  <th className="py-2 pr-4">Fecha objetivo</th>
                  <th className="py-2 pr-4">Restan</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c=> (
                  <tr key={c.id} className={classNames("border-t hover:bg-slate-50 cursor-pointer", selectedId===c.id && "bg-slate-50")} onClick={()=> setSelectedId(c.id)}>
                    <td className="py-2 pr-4">{c.id}</td>
                    <td className="py-2 pr-4 font-medium">{c.nombre}</td>
                    <td className="py-2 pr-4">{c.responsable}</td>
                    <td className="py-2 pr-4"><Badge intent={c.estado==="Entrega"?"success":c.estado==="Propuesta"?"warning":"default"}>{c.estado}</Badge></td>
                    <td className="py-2 pr-4">{c.fechaObjetivo}</td>
                    <td className="py-2 pr-4"><Semaforo dias={c.dias}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selected && (
        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-2xl bg-violet-100 flex items-center justify-center">📁</div>
              <div>
                <div className="text-2xl font-semibold">{selected.nombre}</div>
                <div className="text-slate-600 max-w-2xl text-sm">Implementación personalizada para optimizar procesos.</div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <Badge>En curso</Badge><Badge intent="danger">Prioridad: Alta</Badge><Badge>Fase: Implementación</Badge>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm text-slate-600 mb-2"><span>Progreso General</span><span>{selected.progreso}%</span></div>
              <div className="h-2 w-full rounded-full bg-slate-200"><div className="h-2 rounded-full bg-violet-500" style={{width:`${selected.progreso}%`}}/></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              {steps.map(step=> (
                <div key={step.id} className="rounded-2xl border p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{step.nombre}</div>
                    <input type="checkbox" checked={step.done} onChange={()=> toggleStep(step.id)} />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="h-8" onClick={()=> openAttach(step.id,'nota')}>+ Nota</Button>
                    <Button variant="outline" size="sm" className="h-8" onClick={()=> openAttach(step.id,'doc')}>+ Documento</Button>
                  </div>
                  <div className="mt-3 text-xs text-slate-500">Adjuntos:</div>
                  <ul className="mt-1 space-y-1 text-sm">
                    {step.notas.map((n,i)=>(<li key={"n"+i}>📝 {n}</li>))}
                    {step.documentos.map((d,i)=>(<li key={"d"+i}>📄 {d}</li>))}
                    {(step.notas.length===0 && step.documentos.length===0) && (<li className="text-xs text-slate-400">Sin adjuntos</li>)}
                  </ul>
                </div>
              ))}
            </div>

            {attachOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="w-full max-w-lg rounded-2xl bg-white p-4">
                  <div className="text-lg font-semibold mb-2">{attachType==="nota"?"Añadir nota":"Adjuntar documento (demo)"}</div>
                  <input className="w-full border rounded-xl px-3 py-2" placeholder={attachType==="nota"?"Texto de la nota":"Nombre del documento o enlace"} value={textValue} onChange={e=> setTextValue(e.target.value)} />
                  <div className="text-xs text-slate-500 mt-2">* Demo: los documentos se guardan como texto. Para producción, conecta un uploader (S3, servidor, etc.).</div>
                  <div className="mt-3 text-right">
                    <Button variant="outline" className="mr-2" onClick={()=> setAttachOpen(false)}>Cancelar</Button>
                    <Button onClick={confirmAttach}>Guardar</Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Leads(){
  const [leads, setLeads] = useState(seedLeads);
  const [filter, setFilter] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const statusOrder = LEAD_STATES;

  function toFlat(m){
    const out=[]; Object.keys(m).forEach(k=> m[k].forEach(l=> out.push({...l, estado:k}))); return out;
  }
  const flat = toFlat(leads);
  const filtered = flat.filter(l=> l.empresa.toLowerCase().includes(filter.toLowerCase()));
  const selected = flat.find(l=> l.id===selectedId) || null;

  const [editing, setEditing] = useState({ id:null, name:"" });
  const [editingPrice, setEditingPrice] = useState({ id:null, value:"" });
  const [leadNotes, setLeadNotes] = useState({});
  const [leadDocs, setLeadDocs] = useState({});

  function startEdit(l){ setEditing({ id:l.id, name:l.empresa }); }
  function commitEdit(){ if(!editing.id) return; setLeads(prev=>{ const n={...prev}; Object.keys(n).forEach(k=>{ n[k]=n[k].map(c=> c.id===editing.id? {...c, empresa: editing.name||c.empresa}:c); }); return n;}); setEditing({id:null, name:""}); }

  function startEditPrice(l){ setEditingPrice({ id:l.id, value:String(l.valor) }); }
  function commitEditPrice(){ if(!editingPrice.id) return; const num=parseFloat(editingPrice.value.replace(/,/g,'.')); if(isNaN(num)){ setEditingPrice({id:null,value:""}); return;} setLeads(prev=>{ const n={...prev}; Object.keys(n).forEach(k=>{ n[k]=n[k].map(c=> c.id===editingPrice.id? {...c, valor: Math.max(0, Math.round(num))}:c); }); return n;}); setEditingPrice({id:null,value:""}); }

  // set lead state to a concrete one (moves between columns)
  function setLeadState(id, next){
    if(!LEAD_STATES.includes(next)) return;
    setLeads(prev=>{
      let from = null;
      Object.keys(prev).forEach(k=>{ if(prev[k].some(l=> l.id===id)) from=k; });
      if(!from || from===next) return prev;
      const lead = prev[from].find(l=> l.id===id);
      return {...prev, [from]: prev[from].filter(l=> l.id!==id), [next]: [...prev[next], lead]};
    });
  }

  function changeStatus(id){ // legacy cyclic change
    setLeads(prev=>{ let from=null; Object.keys(prev).forEach(k=>{ if(prev[k].some(l=> l.id===id)) from=k; }); if(!from) return prev; const idx = statusOrder.indexOf(from); const next = statusOrder[(idx+1)%statusOrder.length]; const lead = prev[from].find(l=> l.id===id); return {...prev, [from]: prev[from].filter(l=> l.id!==id), [next]: [...prev[next], lead]}; });
  }

  function addLead(){ const id=`L-${Math.floor(Math.random()*900+100)}`; setLeads(prev=> ({...prev, Nuevo:[...prev.Nuevo,{ id, empresa:"Nuevo Lead", valor:1000 }]})); setSelectedId(id); }

  const notesOf = id => leadNotes[id]||[];
  const docsOf = id => leadDocs[id]||[];
  const [attachOpen, setAttachOpen] = useState(false);
  const [attachType, setAttachType] = useState('nota');
  const [attachId, setAttachId] = useState(null);
  const [textValue, setTextValue] = useState("");
  function openAttach(id, type){ setAttachOpen(true); setAttachType(type); setAttachId(id); setTextValue(""); }
  function confirmAttach(){ if(!attachId) return; if(attachType==='nota'){ setLeadNotes(p=> ({...p, [attachId]:[...(p[attachId]||[]), textValue||'Nota']})); } else { setLeadDocs(p=> ({...p, [attachId]:[...(p[attachId]||[]), textValue||'Documento']})); } setAttachOpen(false); }
  function removeNote(id, idx){ setLeadNotes(p=> ({...p, [id]: notesOf(id).filter((_,i)=> i!==idx)})); }
  function removeDoc(id, idx){ setLeadDocs(p=> ({...p, [id]: docsOf(id).filter((_,i)=> i!==idx)})); }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input className="pl-3 pr-2 py-2 rounded-xl border w-full max-w-sm" placeholder="Buscar leads..." value={filter} onChange={e=> setFilter(e.target.value)} />
        <Button onClick={addLead}>+ Nuevo lead</Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Leads</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Empresa</th>
                  <th className="py-2 pr-4">Estado</th>
                  <th className="py-2 pr-4">Valor</th>
                  <th className="py-2 pr-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(l=> (
                  <tr key={l.id} className={classNames("border-t hover:bg-slate-50 cursor-pointer", selectedId===l.id && "bg-slate-50")} onClick={()=> setSelectedId(l.id)}>
                    <td className="py-2 pr-4">{l.id}</td>
                    <td className="py-2 pr-4" onClick={e=> e.stopPropagation()}>
                      {editing.id===l.id? (
                        <input className="h-8 border rounded-xl px-2" value={editing.name} onChange={e=> setEditing(s=> ({...s,name:e.target.value}))} onBlur={commitEdit} onKeyDown={e=>{ if(e.key==='Enter') commitEdit(); if(e.key==='Escape') setEditing({id:null,name:""}); }} />
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{l.empresa}</span>
                          <Button variant="outline" size="sm" className="h-8" onClick={()=> startEdit(l)}>✎</Button>
                        </div>
                      )}
                    </td>
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2" onClick={e=> e.stopPropagation()}>
                        <Badge intent={leadIntent(l.estado)}>{l.estado}</Badge>
                        <select className="h-8 border rounded-xl px-2 text-sm bg-white" value={l.estado} onChange={e=> setLeadState(l.id, e.target.value)}>
                          {LEAD_STATES.map(s=> <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </td>
                    <td className="py-2 pr-4" onClick={e=> e.stopPropagation()}>
                      {editingPrice.id===l.id? (
                        <div className="flex items-center gap-2">
                          <input type="number" className="h-8 w-28 border rounded-xl px-2" value={editingPrice.value} onChange={e=> setEditingPrice(p=> ({...p, value:e.target.value}))} onBlur={commitEditPrice} onKeyDown={e=>{ if(e.key==='Enter') commitEditPrice(); if(e.key==='Escape') setEditingPrice({id:null,value:""}); }} />
                          <span className="text-xs text-slate-500">EUR</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>€{l.valor.toLocaleString()}</span>
                          <Button variant="outline" size="sm" className="h-8" onClick={()=> startEditPrice(l)}>✎</Button>
                        </div>
                      )}
                    </td>
                    <td className="py-2 pr-4"><div className="flex items-center gap-2" onClick={e=> e.stopPropagation()}><Button variant="outline" size="sm" onClick={()=> openAttach(l.id,'nota')}>Nota</Button><Button variant="outline" size="sm" onClick={()=> openAttach(l.id,'doc')}>Docs</Button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selected && (
        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-2xl bg-cyan-100 flex items-center justify-center">💼</div>
              <div>
                <div className="text-2xl font-semibold">{selected.empresa}</div>
                <div className="text-slate-600 text-sm">Oportunidad en evaluación</div>
                <div className="mt-2 flex gap-2 flex-wrap"><Badge intent={leadIntent(selected.estado)}>{selected.estado}</Badge></div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border p-4">
                <div className="flex items-center justify-between mb-2"><div className="font-medium">Notas</div><Button variant="outline" size="sm" onClick={()=> openAttach(selected.id,'nota')}>Añadir nota</Button></div>
                <ul className="space-y-2 text-sm">
                  {notesOf(selected.id).map((n,i)=> (<li key={i} className="flex items-center justify-between rounded-lg border p-2">📝 {n}<Button variant="solid" size="sm" className="bg-red-600 hover:bg-red-700" onClick={()=> removeNote(selected.id,i)}>Eliminar</Button></li>))}
                  {notesOf(selected.id).length===0 && (<li className="text-xs text-slate-400">Sin notas</li>)}
                </ul>
              </div>
              <div className="rounded-2xl border p-4">
                <div className="flex items-center justify-between mb-2"><div className="font-medium">Documentos</div><Button variant="outline" size="sm" onClick={()=> openAttach(selected.id,'doc')}>Subir documento</Button></div>
                <ul className="space-y-2 text-sm">
                  {docsOf(selected.id).map((d,i)=> (<li key={i} className="flex items-center justify-between rounded-lg border p-2">📄 {d}<Button variant="solid" size="sm" className="bg-red-600 hover:bg-red-700" onClick={()=> removeDoc(selected.id,i)}>Eliminar</Button></li>))}
                  {docsOf(selected.id).length===0 && (<li className="text-xs text-slate-400">Sin documentos</li>)}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {attachOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-2xl bg-white p-4">
            <div className="text-lg font-semibold mb-2">Añadir {attachType==='nota'?'nota':'documento'}</div>
            <input className="w-full border rounded-xl px-3 py-2" placeholder={attachType==='nota'?"Texto de la nota":"Nombre del documento o enlace"} value={textValue} onChange={e=> setTextValue(e.target.value)} />
            <div className="text-xs text-slate-500 mt-2">* Demo: se guarda como texto.</div>
            <div className="mt-3 text-right"><Button variant="outline" className="mr-2" onClick={()=> setAttachOpen(false)}>Cancelar</Button><Button onClick={confirmAttach}>Guardar</Button></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PreviewApp(){
  const [active, setActive] = useState("dashboard");
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-20 flex items-center gap-3 border-b bg-white/80 backdrop-blur px-4 py-2">
        <div className="flex items-center gap-2"><div className="rounded-xl bg-slate-900 text-white px-2.5 py-1 text-xs font-semibold">APP</div><div className="text-sm font-medium text-slate-700">Demo</div></div>
        <div className="ml-auto flex items-center gap-2 w-full max-w-sm"><input className="pl-3 pr-2 py-2 rounded-xl border w-full" placeholder="Buscar..."/><Button>+ Nueva ficha</Button></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <aside className="lg:sticky lg:top-[60px] h-max">
          <div className="rounded-2xl border bg-white p-3">
            <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">Menú</div>
            <div className="flex flex-col gap-2">
              <Button variant={active==='dashboard'? 'solid':'ghost'} onClick={()=> setActive('dashboard')}>Dashboard</Button>
              <Button variant={active==='clientes'? 'solid':'ghost'} onClick={()=> setActive('clientes')}>Clientes</Button>
              <Button variant={active==='leads'? 'solid':'ghost'} onClick={()=> setActive('leads')}>Leads</Button>
            </div>
          </div>
        </aside>
        <main>{active==='dashboard' && <Dashboard/>}{active==='clientes' && <Clientes/>}{active==='leads' && <Leads/>}</main>
      </div>

      <footer className="py-6 text-center text-xs text-slate-500">Vista previa — Dashboard · Clientes · Leads</footer>
    </div>
  );
}
