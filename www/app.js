"use strict";

/* ============================================================
   STUDY BEREA · app.js
   ============================================================ */

const Cap = (window.Capacitor && window.Capacitor.Plugins) ? window.Capacitor.Plugins : {};
const isNative = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());

const IC = {
  home:'<path d="M3 10.2 12 3l9 7.2V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  book:'<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>',
  compass:'<circle cx="12" cy="12" r="9.2"/><path d="m15.6 8.4-2 5.2-5.2 2 2-5.2z"/>',
  layers:'<path d="m12 2.6 9 4.8-9 4.8-9-4.8z"/><path d="m3 12.4 9 4.8 9-4.8"/><path d="m3 17 9 4.8L21 17"/>',
  grid:'<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
  search:'<circle cx="11" cy="11" r="7.2"/><path d="m20.5 20.5-4.2-4.2"/>',
  note:'<path d="M14 3H6.5A2.5 2.5 0 0 0 4 5.5v13A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V9z"/><path d="M14 3v6h6"/>',
  bookmark:'<path d="M6.5 3h11a1 1 0 0 1 1 1v17l-6.5-4.2L5.5 21V4a1 1 0 0 1 1-1z"/>',
  star:'<path d="m12 2.8 2.9 5.9 6.5.95-4.7 4.6 1.1 6.5-5.8-3.05L6.2 20.8l1.1-6.5-4.7-4.6 6.5-.95z"/>',
  highlight:'<path d="M9.5 14.5 4 20l1.5 1.5L11 16"/><path d="M13 3.5 20.5 11 12 19.5 4.5 12z"/>',
  inbox:'<path d="M21 12h-6l-2 3h-2l-2-3H3"/><path d="M5.5 5h13l2.5 7v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6z"/>',
  link:'<path d="M10.5 13.5a4 4 0 0 0 5.7 0l3-3a4 4 0 1 0-5.7-5.7l-1.4 1.4"/><path d="M13.5 10.5a4 4 0 0 0-5.7 0l-3 3a4 4 0 1 0 5.7 5.7l1.4-1.4"/>',
  copy:'<rect x="8.5" y="8.5" width="12" height="12" rx="2.4"/><path d="M15.5 5.5v-1A1.5 1.5 0 0 0 14 3H5.5A1.5 1.5 0 0 0 4 4.5V14a1.5 1.5 0 0 0 1.5 1.5h1"/>',
  share:'<circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="m8.4 10.8 7.2-4.2M8.4 13.2l7.2 4.2"/>',
  trash:'<path d="M3.5 6.5h17"/><path d="M8.5 6.5V4.8A1.3 1.3 0 0 1 9.8 3.5h4.4a1.3 1.3 0 0 1 1.3 1.3v1.7"/><path d="M18.5 6.5 17.7 20a1.5 1.5 0 0 1-1.5 1.4H7.8A1.5 1.5 0 0 1 6.3 20L5.5 6.5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  back:'<path d="M15 19 8 12l7-7"/>',
  fwd:'<path d="m9 5 7 7-7 7"/>',
  chev:'<path d="m9 6 6 6-6 6"/>',
  close:'<path d="M18 6 6 18M6 6l12 12"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  sun:'<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"/>',
  moon:'<path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8z"/>',
  type:'<path d="M4 6.5V5h16v1.5M12 5v14M9 19h6"/>',
  download:'<path d="M12 3v12"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M4 20h16"/>',
  upload:'<path d="M12 15V3"/><path d="m7.5 7.5 4.5-4.5 4.5 4.5"/><path d="M4 20h16"/>',
  folder:'<path d="M3.5 7.5A2 2 0 0 1 5.5 5.5h3.7l2 2.4h7.3a2 2 0 0 1 2 2v8.6a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/>',
  book2:'<path d="M12 6.5C10.5 5 8.5 4.3 6 4.3c-1 0-1.8.1-2.5.3v14c.7-.2 1.5-.3 2.5-.3 2.5 0 4.5.7 6 2.2 1.5-1.5 3.5-2.2 6-2.2 1 0 1.8.1 2.5.3v-14c-.7-.2-1.5-.3-2.5-.3-2.5 0-4.5.7-6 2.2z"/><path d="M12 6.5v14"/>',
  shield:'<path d="M12 3 5 6v5.4c0 4.3 2.9 8.3 7 9.6 4.1-1.3 7-5.3 7-9.6V6z"/>',
  user:'<circle cx="12" cy="8" r="3.6"/><path d="M5 20.5a7 7 0 0 1 14 0"/>',
  clock:'<circle cx="12" cy="12" r="8.8"/><path d="M12 7v5.3l3.4 2"/>',
  sparkle:'<path d="M12 3.2 13.9 9l5.8 1.9-5.8 1.9L12 18.6l-1.9-5.8L4.3 11 10.1 9z"/>',
  refresh:'<path d="M20.5 12a8.5 8.5 0 1 1-2.5-6"/><path d="M20.5 4v5h-5"/>',
  more:'<circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/>',
  image:'<rect x="3.5" y="4.5" width="17" height="15" rx="2.4"/><circle cx="8.8" cy="9.8" r="1.7"/><path d="m4.5 17 4.6-4.6a1.6 1.6 0 0 1 2.3 0L16 17"/><path d="m14 14.4 1.8-1.8a1.6 1.6 0 0 1 2.3 0l1.9 1.9"/>',
  list:'<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.6" cy="6" r="1.2"/><circle cx="4.6" cy="12" r="1.2"/><circle cx="4.6" cy="18" r="1.2"/>',
  quote:'<path d="M9.5 6.5C6.9 7.6 5.5 9.9 5.5 13v4.5h5V12H8c0-2 .6-3.3 2.2-4zM19 6.5c-2.6 1.1-4 3.4-4 6.5v4.5h5V12h-2.5c0-2 .6-3.3 2.2-4z"/>',
  bold:'<path d="M7 4.5h6.2a4 4 0 0 1 0 8H7z"/><path d="M7 12.5h7a4.2 4.2 0 0 1 0 8.5H7z"/>',
  italic:'<path d="M15.5 4.5h-6M14.5 19.5h-6M14 4.5 10 19.5"/>',
  underline:'<path d="M7 4v7a5 5 0 0 0 10 0V4"/><path d="M5.5 20.5h13"/>',
  h2:'<path d="M4 6v12M12 6v12M4 12h8"/><path d="M16.5 18v-7l-2 1.4"/><path d="M20 13.5a2.5 2.5 0 1 1-3 2.5"/>',
  h3:'<path d="M4 6v12M12 6v12M4 12h8"/><path d="M16.5 11.5a2 2 0 1 1 2.5 2 2 2 0 1 1-2.5 2.4"/>',
  ol:'<path d="M10 6h10M10 12h10M10 18h10"/><path d="M4 4.8 5.5 4v4"/><path d="M3.6 11.4a1.4 1.4 0 1 1 2 1.3l-2 1.7h2.3"/>',
  ul:'<path d="M10 6h10M10 12h10M10 18h10"/><circle cx="4.6" cy="6" r="1.3"/><circle cx="4.6" cy="12" r="1.3"/><circle cx="4.6" cy="18" r="1.3"/>',
  hr:'<path d="M3 12h18"/><path d="M6 6h12M6 18h12" opacity=".35"/>',
  bookPlus:'<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v15H6.5A2.5 2.5 0 0 0 4 19.5z"/><path d="M16 6.5v5M13.5 9h5"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.8v.2"/>',
  wifiOff:'<path d="M2 2l20 20"/><path d="M8.5 15.5a5 5 0 0 1 7 0"/><path d="M5 12a10 10 0 0 1 3-2"/><path d="M16.5 10.2A10 10 0 0 1 19 12"/><path d="M2.5 8.5a15 15 0 0 1 5-2.8"/><path d="M13.5 5.6a15 15 0 0 1 8 2.9"/><circle cx="12" cy="19" r="1"/>',
  cloud:'<path d="M6.5 18.5A4 4 0 0 1 6 10.6 6 6 0 0 1 17.5 9.5a3.9 3.9 0 0 1-.5 9z"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6h.09A1.65 1.65 0 0 0 10.6 3.09V3a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 16.11 4.6h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 20.4 9v.09a1.65 1.65 0 0 0 1.51 1.51H22a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  play:'<path d="M6 4.5 19 12 6 19.5z"/>',
  bell:'<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
  columns:'<rect x="3" y="4" width="8" height="16" rx="2"/><rect x="13" y="4" width="8" height="16" rx="2"/>',
  expand:'<path d="M4 9V4h5M20 15v5h-5M15 4h5v5M9 20H4v-5"/>',
  shrink:'<path d="M9 4v5H4M15 20v-5h5M20 9h-5V4M4 15h5v5"/>'
};
function ic(name, cls){
  return '<svg class="'+(cls||'')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round">'+(IC[name]||'')+'</svg>';
}

const $ = (s,r)=>(r||document).querySelector(s);
const $$ = (s,r)=>Array.from((r||document).querySelectorAll(s));
function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,8); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function stripTags(html){ const d=document.createElement('div'); d.innerHTML=html||''; return (d.textContent||'').replace(/\s+/g,' ').trim(); }
function norm(s){ return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9ñ\s]/g,' ').replace(/\s+/g,' ').trim(); }
function lev(a,b,max){
  if(Math.abs(a.length-b.length)>(max||2)) return 99;
  const m=a.length,n=b.length; if(!m) return n; if(!n) return m;
  let prev=new Array(n+1); for(let j=0;j<=n;j++) prev[j]=j;
  for(let i=1;i<=m;i++){
    const cur=[i]; let best=i;
    for(let j=1;j<=n;j++){
      const cost=a[i-1]===b[j-1]?0:1;
      cur[j]=Math.min(prev[j]+1,cur[j-1]+1,prev[j-1]+cost);
      if(cur[j]<best) best=cur[j];
    }
    if(best>(max||2)) return 99;
    prev=cur;
  }
  return prev[n];
}
function fuzzyMatch(hay,needle){
  const h=norm(hay),n=norm(needle); if(!n) return false;
  if(h.includes(n)) return true;
  const hw=h.split(' '),nw=n.split(' ');
  return nw.every(tok=>hw.some(w=>w.startsWith(tok)||lev(w,tok,1)<=1));
}
function highlight(text,q){
  if(!q) return esc(text);
  const nq=norm(q); if(!nq) return esc(text);
  const tokens=nq.split(' ').filter(t=>t.length>1);
  if(!tokens.length) return esc(text);
  let out=esc(text);
  tokens.forEach(t=>{
    const re=new RegExp('('+t.split('').map(c=>c.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('[\\u0300-\\u036f]?')+')','gi');
    out=out.replace(re,'<mark>$1</mark>');
  });
  return out;
}
function fmtDate(ts){
  const d=new Date(ts),now=new Date(),diff=(now-d)/1000;
  if(diff<60) return 'ahora';
  if(diff<3600) return 'hace '+Math.floor(diff/60)+' min';
  if(diff<86400) return 'hace '+Math.floor(diff/3600)+' h';
  if(diff<604800) return 'hace '+Math.floor(diff/86400)+' d';
  return d.toLocaleDateString('es',{day:'numeric',month:'short',year:d.getFullYear()!==now.getFullYear()?'numeric':undefined});
}
function fmtFull(ts){ return new Date(ts).toLocaleString('es',{day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'}); }
function todayKey(){ const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function dateKey(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function debounce(fn,ms){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; }

async function copyText(t){
  try{ if(navigator.clipboard && window.isSecureContext){ await navigator.clipboard.writeText(t); return; } }catch(e){}
  const ta=document.createElement('textarea'); ta.value=t; ta.style.position='fixed'; ta.style.opacity='0';
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); }catch(e){}
  ta.remove();
}
async function download(name, content, mime){
  if(isNative && Cap.Filesystem){
    try{
      const b64 = btoa(unescape(encodeURIComponent(typeof content==='string'?content:'')));
      await Cap.Filesystem.writeFile({ path:name, data:b64, directory:'DOCUMENTS', recursive:true });
      toast('Guardado en Documentos','download');
      return;
    }catch(e){}
  }
  const blob=content instanceof Blob?content:new Blob([content],{type:mime||'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download=name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),4000);
}
async function downloadBlob(name, blob){
  if(isNative && Cap.Filesystem){
    try{
      const b64 = await new Promise((res,rej)=>{
        const r = new FileReader();
        r.onload = ()=> res(r.result.split(',')[1]);
        r.onerror = rej;
        r.readAsDataURL(blob);
      });
      await Cap.Filesystem.writeFile({ path:name, data:b64, directory:'DOCUMENTS', recursive:true });
      toast('Guardado en Documentos','download');
      return;
    }catch(e){ console.warn(e); }
  }
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download=name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),4000);
}
async function haptic(style){
  if(isNative && Cap.Haptics){
    try{
      const map={light:'Light',medium:'Medium',heavy:'Heavy',success:'Medium',error:'Heavy'};
      await Cap.Haptics.impact({style: map[style]||'Light'});
      return;
    }catch(e){}
  }
  try{ if(navigator.vibrate){ const p={light:[8],medium:[18],heavy:[30],success:[10,40,20],error:[30,50,30]}; navigator.vibrate(p[style]||p.light); } }catch(e){}
}
function flashSave(){
  const el=$('#saveDot'); if(!el) return;
  el.classList.remove('on'); void el.offsetWidth; el.classList.add('on');
}

/* ============================================================
   PDF GENERATOR
   ============================================================ */
const PDFGen = (function(){
  function escapePDF(s){
    return String(s||'').replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)').replace(/[\r\n]+/g,' ');
  }
  function wrapText(text, maxChars){
    const words = String(text||'').split(/\s+/);
    const lines = [];
    let cur = '';
    for(const w of words){
      const next = cur ? cur+' '+w : w;
      if(next.length > maxChars){
        if(cur) lines.push(cur);
        cur = w;
      } else {
        cur = next;
      }
    }
    if(cur) lines.push(cur);
    return lines.length ? lines : [''];
  }
  function build(blocks, meta){
    const pageW = 595, pageH = 842;
    const margin = 56;
    const maxChars = 82;
    const fontPlain = 'F1', fontBold = 'F2';
    const pages = [[]];
    let y = pageH - margin;
    let pageIdx = 0;
    function newPage(){ pages.push([]); pageIdx++; y = pageH - margin; }
    function ensure(h){ if(y - h < margin) newPage(); }
    function addLine(text, font, size, color){
      ensure(size + 4);
      pages[pageIdx].push({ text, x: margin, y: y, font: font || fontPlain, size: size || 11, color: color || [0.05,0.08,0.15] });
      y -= size + 4;
    }
    addLine(meta.title || 'Documento', fontBold, 22, [0.05,0.08,0.15]);
    y -= 6;
    addLine('Exportado desde Study Berea · ' + new Date().toLocaleString('es'), fontPlain, 9, [0.55,0.58,0.65]);
    y -= 20;
    for(const b of blocks){
      if(b.type === 'h1'){
        y -= 8; addLine(b.text, fontBold, 17, [0.05,0.08,0.15]); y -= 4;
      } else if(b.type === 'h2'){
        y -= 6; addLine(b.text, fontBold, 14, [0.05,0.08,0.15]); y -= 4;
      } else if(b.type === 'h3'){
        addLine(b.text, fontBold, 12, [0.1,0.15,0.25]);
      } else if(b.type === 'quote'){
        const lines = wrapText(b.text, maxChars - 6);
        lines.forEach(l=>{ addLine(l, fontPlain, 11, [0.3,0.34,0.42]); });
        y -= 6;
      } else if(b.type === 'verse'){
        const ref = b.ref || '';
        if(ref) addLine(ref.toUpperCase(), fontBold, 9, [0.11,0.31,0.85]);
        const lines = wrapText(b.text, maxChars);
        lines.forEach(l=>{ addLine(l, fontPlain, 11, [0.2,0.24,0.32]); });
        y -= 6;
      } else {
        const lines = wrapText(b.text, maxChars);
        lines.forEach(l=>{ addLine(l, fontPlain, 11.5, [0.1,0.13,0.2]); });
        y -= 6;
      }
    }
    const objects = [];
    function obj(content){ objects.push(content); return objects.length; }
    const fontRegular = obj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
    const fontBoldObj = obj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
    const contentObjs = [];
    for(let i=0;i<pages.length;i++){
      const items = pages[i];
      let stream = '';
      for(const it of items){
        stream += 'BT\n';
        stream += '/Fs1 '+it.size.toFixed(1)+' Tf\n';
        const [r,g,bl] = it.color || [0,0,0];
        stream += r.toFixed(3)+' '+g.toFixed(3)+' '+bl.toFixed(3)+' rg\n';
        stream += it.x.toFixed(2)+' '+(it.y - it.size).toFixed(2)+' Td\n';
        stream += '('+escapePDF(it.text)+') Tj\n';
        stream += 'ET\n';
      }
      const contentId = obj('<< /Length '+stream.length+' >>\nstream\n'+stream+'\nendstream');
      contentObjs.push(contentId);
    }
    const pagesId = objects.length + pages.length + 1;
    const pageRefs = [];
    for(let i=0;i<pages.length;i++){
      const id = obj('<< /Type /Page /Parent '+pagesId+' 0 R /MediaBox [0 0 '+pageW+' '+pageH+'] /Contents '+contentObjs[i]+' 0 R /Resources << /Font << /Fs1 '+fontRegular+' 0 R /Fs2 '+fontBoldObj+' 0 R >> >> >>');
      pageRefs.push(id);
    }
    const pagesObjId = obj('<< /Type /Pages /Count '+pages.length+' /Kids ['+pageRefs.map(id=>id+' 0 R').join(' ')+'] >>');
    const catalogId = obj('<< /Type /Catalog /Pages '+pagesObjId+' 0 R >>');
    let pdf = '%PDF-1.4\n';
    const offsets = [0];
    for(let i=0;i<objects.length;i++){
      offsets.push(pdf.length);
      pdf += (i+1)+' 0 obj\n'+objects[i]+'\nendobj\n';
    }
    const xrefStart = pdf.length;
    pdf += 'xref\n0 '+(objects.length+1)+'\n';
    pdf += '0000000000 65535 f \n';
    for(let i=1;i<objects.length+1;i++){
      pdf += String(offsets[i]).padStart(10,'0')+' 00000 n \n';
    }
    pdf += 'trailer\n<< /Size '+(objects.length+1)+' /Root '+catalogId+' 0 R >>\n';
    pdf += 'startxref\n'+xrefStart+'\n%%EOF';
    return pdf;
  }
  return { build };
})();

function htmlToBlocks(html){
  const d = document.createElement('div');
  d.innerHTML = html || '';
  const blocks = [];
  const walk = (node)=>{
    const kids = Array.from(node.childNodes);
    for(const n of kids){
      if(n.nodeType === 3){
        const t = n.textContent.trim();
        if(t) blocks.push({type:'p', text:t});
        continue;
      }
      if(n.nodeType !== 1) continue;
      const tag = n.tagName.toLowerCase();
      if(tag === 'h1' || tag === 'h2' || tag === 'h3'){
        const t = n.textContent.trim();
        if(t) blocks.push({type: tag, text: t});
      } else if(tag === 'blockquote'){
        const t = n.textContent.trim();
        if(t) blocks.push({type:'quote', text: t});
      } else if(tag === 'hr'){
        blocks.push({type:'p', text: '────────'});
      } else if(tag === 'img'){
        blocks.push({type:'p', text: '[Imagen]'});
      } else if(tag === 'audio'){
        blocks.push({type:'p', text: '[Audio]'});
      } else if(n.classList && n.classList.contains('verse-embed')){
        const ref = n.querySelector('.ve-ref');
        const txt = n.textContent.replace(ref ? ref.textContent : '', '').trim();
        blocks.push({type:'verse', text: txt, ref: ref ? ref.textContent : ''});
      } else if(tag === 'ul' || tag === 'ol'){
        const items = n.querySelectorAll(':scope > li');
        items.forEach((li, i)=>{
          const prefix = tag === 'ol' ? (i+1)+'. ' : '• ';
          blocks.push({type:'p', text: prefix + li.textContent.trim()});
        });
      } else if(tag === 'p' || tag === 'div'){
        const t = n.textContent.trim();
        if(t) blocks.push({type:'p', text: t});
      } else {
        walk(n);
      }
    }
  };
  walk(d);
  return blocks;
}

async function exportPDF(title, html){
  try{
    const blocks = htmlToBlocks(html);
    const pdfStr = PDFGen.build(blocks, { title });
    const blob = new Blob([pdfStr], { type: 'application/pdf' });
    const safe = (title||'documento').replace(/[^\w\sáéíóúñ-]/gi,'').slice(0,60) || 'documento';
    if(isNative && Cap.Filesystem && Cap.Share){
      try{
        const b64 = await new Promise((res,rej)=>{
          const r = new FileReader();
          r.onload = ()=> res(r.result.split(',')[1]);
          r.onerror = rej;
          r.readAsDataURL(blob);
        });
        const w = await Cap.Filesystem.writeFile({
          path: safe + '.pdf',
          data: b64,
          directory: 'DOCUMENTS',
          recursive: true
        });
        const ask = await confirmDialog('PDF listo', 'Guardado en Documentos. ¿Quieres compartirlo?', 'Compartir');
        if(ask){
          await Cap.Share.share({ title: safe, url: w.uri, dialogTitle: 'Compartir PDF' });
        } else {
          toast('Guardado en Documentos','check');
        }
        return;
      }catch(e){ console.warn('PDF native', e); }
    }
    await downloadBlob(safe + '.pdf', blob);
  }catch(e){
    console.error('PDF export', e);
    toast('No se pudo generar el PDF','info');
  }
}

/* ============================================================
   ALMACENAMIENTO
   ============================================================ */
const NS='berea.v1.';
const NativeStore = {
  async get(k){
    if(isNative && Cap.Preferences){
      try{
        const {value} = await Cap.Preferences.get({key: NS+k});
        if(value!==null && value!==undefined) return JSON.parse(value);
      }catch(e){}
    }
    try{ const v=localStorage.getItem(NS+k); return v!==null?JSON.parse(v):undefined; }catch(e){ return undefined; }
  },
  async set(k,v){
    if(isNative && Cap.Preferences){
      try{ await Cap.Preferences.set({key: NS+k, value: JSON.stringify(v)}); }catch(e){}
    }
    try{ localStorage.setItem(NS+k, JSON.stringify(v)); }catch(e){}
  },
  async del(k){
    if(isNative && Cap.Preferences){ try{ await Cap.Preferences.remove({key: NS+k}); }catch(e){} }
    try{ localStorage.removeItem(NS+k); }catch(e){}
  }
};

const S = {
  settings:null, notes:[], studies:[], highlights:[], bookmarks:[], favorites:[],
  inbox:[], relations:[], folders:[], words:null, doctrines:null, explore:null,
  vod:null, bible:null, history:[], versions:null, savedSearches:[],
  stats:{ openedAt:Date.now(), days:[] }
};

const DEFAULT_SETTINGS = {
  theme:'auto', readSize:19, readLh:1.78, readFont:'serif',
  versionId:'rv1909',
  lastRead:{ book:'jhn', chapter:3, verse:16 },
  name:'', installedAt: Date.now(),
  autoNight:false, autoNightStart:20, autoNightEnd:7,
  dailyNotif:false, dailyNotifHour:8, dailyNotifMinute:0,
  autoEmbedRefs:true
};

function save(key){ NativeStore.set(key, S[key]); }

/* ============================================================
   DATOS BÍBLICOS
   ============================================================ */
const BOOKS = [
  ['gen','Génesis','Gn','AT',50],['exo','Éxodo','Éx','AT',40],['lev','Levítico','Lv','AT',27],
  ['num','Números','Nm','AT',36],['deu','Deuteronomio','Dt','AT',34],['jos','Josué','Jos','AT',24],
  ['jdg','Jueces','Jue','AT',21],['rut','Rut','Rt','AT',4],['1sa','1 Samuel','1S','AT',31],
  ['2sa','2 Samuel','2S','AT',24],['1ki','1 Reyes','1R','AT',22],['2ki','2 Reyes','2R','AT',25],
  ['1ch','1 Crónicas','1Cr','AT',29],['2ch','2 Crónicas','2Cr','AT',36],['ezr','Esdras','Esd','AT',10],
  ['neh','Nehemías','Neh','AT',13],['est','Ester','Est','AT',10],['job','Job','Job','AT',42],
  ['psa','Salmos','Sal','AT',150],['pro','Proverbios','Pr','AT',31],['ecc','Eclesiastés','Ec','AT',12],
  ['sng','Cantares','Cnt','AT',8],['isa','Isaías','Is','AT',66],['jer','Jeremías','Jer','AT',52],
  ['lam','Lamentaciones','Lm','AT',5],['ezk','Ezequiel','Ez','AT',48],['dan','Daniel','Dn','AT',12],
  ['hos','Oseas','Os','AT',14],['jol','Joel','Jl','AT',3],['amo','Amós','Am','AT',9],
  ['oba','Obadías','Abd','AT',1],['jon','Jonás','Jon','AT',4],['mic','Miqueas','Mi','AT',7],
  ['nam','Nahúm','Nah','AT',3],['hab','Habacuc','Hab','AT',3],['zep','Sofonías','Sof','AT',3],
  ['hag','Hageo','Hag','AT',2],['zec','Zacarías','Zac','AT',14],['mal','Malaquías','Mal','AT',4],
  ['mat','Mateo','Mt','NT',28],['mrk','Marcos','Mr','NT',16],['luk','Lucas','Lc','NT',24],
  ['jhn','Juan','Jn','NT',21],['act','Hechos','Hch','NT',28],['rom','Romanos','Ro','NT',16],
  ['1co','1 Corintios','1Co','NT',16],['2co','2 Corintios','2Co','NT',13],['gal','Gálatas','Gá','NT',6],
  ['eph','Efesios','Ef','NT',6],['php','Filipenses','Fil','NT',4],['col','Colosenses','Col','NT',4],
  ['1th','1 Tesalonicenses','1Ts','NT',5],['2th','2 Tesalonicenses','2Ts','NT',3],
  ['1ti','1 Timoteo','1Ti','NT',6],['2ti','2 Timoteo','2Ti','NT',4],['tit','Tito','Tit','NT',3],
  ['phm','Filemón','Flm','NT',1],['heb','Hebreos','He','NT',13],['jas','Santiago','Stg','NT',5],
  ['1pe','1 Pedro','1P','NT',5],['2pe','2 Pedro','2P','NT',3],['1jn','1 Juan','1Jn','NT',5],
  ['2jn','2 Juan','2Jn','NT',1],['3jn','3 Juan','3Jn','NT',1],['jud','Judas','Jud','NT',1],
  ['rev','Apocalipsis','Ap','NT',22]
].map(([id,name,abbr,test,chapters])=>({id,name,abbr,test,chapters}));
const BOOK_MAP = Object.fromEntries(BOOKS.map(b=>[b.id,b]));
function bookById(id){ return BOOK_MAP[id]; }
function bookByName(q){
  const n=norm(q);
  return BOOKS.find(b=>norm(b.name)===n||norm(b.abbr)===n)
      || BOOKS.find(b=>norm(b.name).startsWith(n)&&n.length>=3)
      || BOOKS.find(b=>fuzzyMatch(b.name,q));
}

const PD_TEXT = {
  gen:{1:["En el principio creó Dios los cielos y la tierra.","Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas.","Y dijo Dios: Sea la luz; y fue la luz.","Y vio Dios que la luz era buena; y separó Dios la luz de las tinieblas.","Y llamó Dios a la luz Día, y a las tinieblas llamó Noche. Y fue la tarde y la mañana un día.","Y dijo Dios: Haya expansión en medio de las aguas, y separe las aguas de las aguas.","E hizo Dios la expansión, y apartó las aguas que estaban debajo de la expansión, de las aguas que estaban sobre la expansión. Y fue así.","Y llamó Dios a la expansión Cielos. Y fue la tarde y la mañana el día segundo.","Dijo también Dios: Júntense las aguas que están debajo de los cielos en un lugar, y descúbrase lo seco. Y fue así.","Y llamó Dios a lo seco Tierra, y a la reunión de las aguas llamó Mares. Y vio Dios que era bueno.","Después dijo Dios: Produzca la tierra hierba verde, hierba que dé semilla; árbol de fruto que dé fruto según su género, que su semilla esté en él, sobre la tierra. Y fue así.","Produjo, pues, la tierra hierba verde, hierba que da semilla según su naturaleza, y árbol que da fruto, cuya semilla está en él, según su género. Y vio Dios que era bueno.","Y fue la tarde y la mañana el día tercero.","Dijo luego Dios: Haya lumbreras en la expansión de los cielos para separar el día de la noche; y sirvan de señales para las estaciones, para días y años,","y sean por lumbreras en la expansión de los cielos para alumbrar sobre la tierra. Y fue así.","E hizo Dios las dos grandes lumbreras; la lumbrera mayor para que señorease en el día, y la lumbrera menor para que señorease en la noche; hizo también las estrellas.","Y las puso Dios en la expansión de los cielos para alumbrar sobre la tierra,","y para señorear en el día y en la noche, y para separar la luz de las tinieblas. Y vio Dios que era bueno.","Y fue la tarde y la mañana el día cuarto.","Dijo Dios: Produzcan las aguas seres vivientes, y aves que vuelen sobre la tierra, en la abierta expansión de los cielos.","Y creó Dios los grandes monstruos marinos, y todo ser viviente que se mueve, que las aguas produjeron según su género, y toda ave alada según su especie. Y vio Dios que era bueno.","Y Dios los bendijo, diciendo: Fructificad y multiplicaos, y llenad las aguas en los mares, y multiplíquense las aves en la tierra.","Y fue la tarde y la mañana el día quinto.","Luego dijo Dios: Produzca la tierra seres vivientes según su género, bestias y serpientes y animales de la tierra según su especie. Y fue así.","E hizo Dios animales de la tierra según su género, y ganado según su género, y todo animal que se arrastra sobre la tierra según su especie. Y vio Dios que era bueno.","Entonces dijo Dios: Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza; y señoree en los peces del mar, en las aves de los cielos, en las bestias, en toda la tierra, y en todo animal que se arrastra sobre la tierra.","Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó.","Y los bendijo Dios, y les dijo: Fructificad y multiplicaos; llenad la tierra, y sojuzgadla, y señoread en los peces del mar, en las aves de los cielos, y en todas las bestias que se mueven sobre la tierra.","Y dijo Dios: He aquí que os he dado toda planta que da semilla, que está sobre toda la tierra, y todo árbol en que hay fruto y que da semilla; os serán para comer.","Y a toda bestia de la tierra, y a todas las aves de los cielos, y a todo lo que se arrastra sobre la tierra, en que hay vida, toda planta verde les será para comer. Y fue así.","Y vio Dios todo lo que había hecho, y he aquí que era bueno en gran manera. Y fue la tarde y la mañana el día sexto."]},
  psa:{
    1:["Bienaventurado el varón que no anduvo en consejo de malos, ni estuvo en camino de pecadores, ni en silla de escarnecedores se ha sentado;","sino que en la ley de Jehová está su delicia, y en su ley medita de día y de noche.","Será como árbol plantado junto a corrientes de aguas, que da su fruto en su tiempo, y su hoja no cae; y todo lo que hace, prosperará.","No así los malos, que son como el tamo que arrebata el viento.","Por tanto, no se levantarán los malos en el juicio, ni los pecadores en la congregación de los justos.","Porque Jehová conoce el camino de los justos; mas la senda de los malos perecerá."],
    23:["Jehová es mi pastor; nada me faltará.","En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará.","Confortará mi alma; me guiará por sendas de justicia por amor de su nombre.","Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo; tu vara y tu cayado me infundirán aliento.","Aderezarás mesa delante de mí, en presencia de mis angustiadores; ungiste mi cabeza con aceite; mi copa está rebosando.","Ciertamente el bien y la misericordia me seguirán todos los días de mi vida, y en la casa de Jehová moraré por largos días."],
    91:["El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.","Diré yo a Jehová: Esperanza mía, y castillo mío; mi Dios, en quien confiaré.","Él te librará del lazo del cazador, de la peste destructora.","Con sus plumas te cubrirá, y debajo de sus alas estarás seguro; escudo y adarga es su verdad.","No temerás el terror nocturno, ni saeta que vuele de día,","ni pestilencia que ande en oscuridad, ni mortandad que en medio del día destruya.","Caerán a tu lado mil, y diez mil a tu diestra; mas a ti no llegará.","Ciertamente con tus ojos mirarás y verás la recompensa de los impíos.","Porque has puesto a Jehová, que es mi esperanza, al Altísimo por tu habitación,","no te sobrevendrá mal, ni plaga tocará tu morada.","Pues a sus ángeles mandará acerca de ti, que te guarden en todos tus caminos.","En las manos te llevarán, para que tu pie no tropiece en piedra.","Sobre el león y el áspid pisarás; hollarás al cachorro del león y al dragón.","Por cuanto en mí ha puesto su amor, yo también lo libraré; le pondré en alto, por cuanto ha conocido mi nombre.","Me invocará, y yo le responderé; con él estaré yo en la angustia; lo libraré y le glorificaré.","Lo saciaré de larga vida, y le mostraré mi salvación."],
    121:["Alzaré mis ojos a los montes; ¿de dónde vendrá mi socorro?","Mi socorro viene de Jehová, que hizo los cielos y la tierra.","No dará tu pie al resbaladero, ni se dormirá el que te guarda.","He aquí, no se dormirá ni dormitará el que guarda a Israel.","Jehová es tu guardador; Jehová es tu sombra a tu mano derecha.","El sol no te fatigará de día, ni la luna de noche.","Jehová te guardará de todo mal; guardará tu alma.","Jehová guardará tu salida y tu entrada desde ahora y para siempre."]
  },
  mat:{5:["Viendo la multitud, subió al monte; y sentándose, vinieron a él sus discípulos.","Y abriendo su boca les enseñaba, diciendo:","Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos.","Bienaventurados los que lloran, porque ellos recibirán consolación.","Bienaventurados los mansos, porque ellos recibirán la tierra por heredad.","Bienaventurados los que tienen hambre y sed de justicia, porque ellos serán saciados.","Bienaventurados los misericordiosos, porque ellos alcanzarán misericordia.","Bienaventurados los de limpio corazón, porque ellos verán a Dios.","Bienaventurados los pacificadores, porque ellos serán llamados hijos de Dios.","Bienaventurados los que padecen persecución por causa de la justicia, porque de ellos es el reino de los cielos.","Bienaventurados sois cuando por mi causa os vituperen y os persigan, y digan toda clase de mal contra vosotros, mintiendo.","Gozaos y alegraos, porque vuestro galardón es grande en los cielos; porque así persiguieron a los profetas que fueron antes de vosotros.","Vosotros sois la sal de la tierra; pero si la sal se desvaneciere, ¿con qué será salada? No sirve más para nada, sino para ser echada fuera y hollada por los hombres.","Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder.","Ni se enciende una luz y se pone debajo de un almud, sino sobre el candelero, y alumbra a todos los que están en casa.","Así alumbre vuestra luz delante de los hombres, para que vean vuestras buenas obras, y glorifiquen a vuestro Padre que está en los cielos."]},
  jhn:{
    1:["En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.","Este era en el principio con Dios.","Todas las cosas por él fueron hechas, y sin él nada de lo que ha sido hecho, fue hecho.","En él estaba la vida, y la vida era la luz de los hombres.","La luz en las tinieblas resplandece, y las tinieblas no prevalecieron contra ella.","Hubo un hombre enviado de Dios, el cual se llamaba Juan.","Este vino por testimonio, para que diese testimonio de la luz, a fin de que todos creyesen por él.","No era él la luz, sino para que diese testimonio de la luz.","Aquella luz verdadera, que alumbra a todo hombre, venía a este mundo.","En el mundo estaba, y el mundo por él fue hecho; pero el mundo no le conoció.","A lo suyo vino, y los suyos no le recibieron.","Mas a todos los que le recibieron, a los que creen en su nombre, les dio potestad de ser hechos hijos de Dios;","los cuales no son engendrados de sangre, ni de voluntad de carne, ni de voluntad de varón, sino de Dios.","Y aquel Verbo fue hecho carne, y habitó entre nosotros (y vimos su gloria, gloria como del unigénito del Padre), lleno de gracia y de verdad.","Juan dio testimonio de él, y clamó diciendo: Este es de quien yo decía: El que viene después de mí, es antes de mí; porque era primero que yo.","Porque de su plenitud tomamos todos, y gracia sobre gracia.","Pues la ley por medio de Moisés fue dada, pero la gracia y la verdad vinieron por medio de Jesucristo.","A Dios nadie le vio jamás; el unigénito Hijo, que está en el seno del Padre, él le ha dado a conocer."],
    3:["Había un hombre de los fariseos que se llamaba Nicodemo, un principal entre los judíos.","Este vino a Jesús de noche, y le dijo: Rabí, sabemos que has venido de Dios como maestro; porque nadie puede hacer estas señales que tú haces, si no está Dios con él.","Respondió Jesús y le dijo: De cierto, de cierto te digo, que el que no naciere de nuevo, no puede ver el reino de Dios.","Nicodemo le dijo: ¿Cómo puede un hombre nacer siendo viejo? ¿Puede acaso entrar por segunda vez en el vientre de su madre, y nacer?","Respondió Jesús: De cierto, de cierto te digo, que el que no naciere de agua y del Espíritu, no puede entrar en el reino de Dios.","Lo que es nacido de la carne, carne es; y lo que es nacido del Espíritu, espíritu es.","No te maravilles de que te dije: Os es necesario nacer de nuevo.","El viento sopla de donde quiere, y oyes su sonido; mas ni sabes de dónde viene, ni a dónde va; así es todo aquel que es nacido del Espíritu.","Respondió Nicodemo y le dijo: ¿Cómo puede hacerse esto?","Respondió Jesús y le dijo: ¿Eres tú maestro de Israel, y no sabes esto?","De cierto, de cierto te digo, que lo que sabemos hablamos, y lo que hemos visto, testificamos; y no recibís nuestro testimonio.","Si os he dicho cosas terrenales, y no creéis, ¿cómo creeréis si os dijere las celestiales?","Nadie subió al cielo, sino el que descendió del cielo; el Hijo del Hombre, que está en el cielo.","Y como Moisés levantó la serpiente en el desierto, así es necesario que el Hijo del Hombre sea levantado,","para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.","Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.","Porque no envió Dios a su Hijo al mundo para condenar al mundo, sino para que el mundo sea salvo por él.","El que en él cree, no es condenado; pero el que no cree, ya ha sido condenado, porque no ha creído en el nombre del unigénito Hijo de Dios.","Y esta es la condenación: que la luz vino al mundo, y los hombres amaron más las tinieblas que la luz, porque sus obras eran malas.","Porque todo aquel que hace lo malo, aborrece la luz y no viene a la luz, para que sus obras no sean reprendidas.","Mas el que practica la verdad viene a la luz, para que sea manifiesto que sus obras son hechas en Dios."]
  },
  rom:{
    6:["¿Qué, pues, diremos? ¿Perseveraremos en el pecado para que la gracia abunde?","En ninguna manera. Porque los que hemos muerto al pecado, ¿cómo viviremos aún en él?","¿O no sabéis que todos los que hemos sido bautizados en Cristo Jesús, hemos sido bautizados en su muerte?","Porque somos sepultados juntamente con él para muerte por el bautismo, a fin de que como Cristo resucitó de los muertos por la gloria del Padre, así también nosotros andemos en vida nueva.","Porque si fuimos plantados juntamente con él en la semejanza de su muerte, así también lo seremos en la de su resurrección;","sabiendo esto, que nuestro viejo hombre fue crucificado juntamente con él, para que el cuerpo del pecado sea destruido, a fin de que no sirvamos más al pecado.","Porque el que ha muerto, ha sido justificado del pecado.","Y si morimos con Cristo, creemos que también viviremos con él;","sabiendo que Cristo, habiendo resucitado de los muertos, ya no muere; la muerte no se enseñorea más de él.","Porque en cuanto murió, al pecado murió una vez por todas; mas en cuanto vive, para Dios vive.","Así también vosotros consideraos muertos al pecado, pero vivos para Dios en Cristo Jesús, Señor nuestro.","No reine, pues, el pecado en vuestro cuerpo mortal, de modo que lo obedezcáis en sus concupiscencias;","ni tampoco presentéis vuestros miembros al pecado como instrumentos de iniquidad, sino presentaos vosotros mismos a Dios como vivos de entre los muertos, y vuestros miembros a Dios como instrumentos de justicia.","Porque el pecado no se enseñoreará de vosotros; pues no estáis bajo la ley, sino bajo la gracia.","¿Qué, pues? ¿Pecaremos, porque no estamos bajo la ley, sino bajo la gracia? En ninguna manera.","¿No sabéis que si os sometéis a alguien como esclavos para obedecerle, sois esclavos de aquel a quien obedecéis, sea del pecado para muerte, o sea de la obediencia para justicia?","Pero gracias a Dios, que aunque erais esclavos del pecado, habéis obedecido de corazón a aquella forma de doctrina a la cual fuisteis entregados;","y libertados del pecado, vinisteis a ser siervos de la justicia.","Hablo como humano, por vuestra humana debilidad; que así como para iniquidad presentasteis vuestros miembros para servir a la inmundicia y a la iniquidad, así ahora para santificación presentad vuestros miembros para servir a la justicia.","Porque cuando erais esclavos del pecado, erais libres acerca de la justicia.","¿Pero qué fruto teníais de aquellas cosas de las cuales ahora os avergonzáis? Porque el fin de ellas es muerte.","Mas ahora que habéis sido libertados del pecado y hechos siervos de Dios, tenéis por vuestro fruto la santificación, y como fin, la vida eterna.","Porque la paga del pecado es muerte, mas la dádiva de Dios es vida eterna en Cristo Jesús Señor nuestro."],
    8:["Ahora, pues, ninguna condenación hay para los que están en Cristo Jesús, los que no andan conforme a la carne, sino conforme al Espíritu.","Porque la ley del Espíritu de vida en Cristo Jesús me ha librado de la ley del pecado y de la muerte.","Porque lo que era imposible para la ley, por cuanto era débil por la carne, Dios, enviando a su Hijo en semejanza de carne de pecado y a causa del pecado, condenó al pecado en la carne;","para que la justicia de la ley se cumpliese en nosotros, que no andamos conforme a la carne, sino conforme al Espíritu.","Porque los que son de la carne piensan en las cosas de la carne; pero los que son del Espíritu, en las cosas del Espíritu.","Porque el ocuparse de la carne es muerte, pero el ocuparse del Espíritu es vida y paz.","Por cuanto los designios de la carne son enemistad contra Dios; porque no se sujetan a la ley de Dios, ni tampoco pueden;","y los que viven según la carne no pueden agradar a Dios.","Mas vosotros no vivís según la carne, sino según el Espíritu, si es que el Espíritu de Dios mora en vosotros. Y si alguno no tiene el Espíritu de Cristo, no es de él.","Pero si Cristo está en vosotros, el cuerpo en verdad está muerto a causa del pecado, mas el espíritu vive a causa de la justicia.","Y si el Espíritu de aquel que levantó de los muertos a Jesús mora en vosotros, el que levantó de los muertos a Cristo Jesús vivificará también vuestros cuerpos mortales por su Espíritu que mora en vosotros."]
  },
  '1co':{13:["Si yo hablase lenguas humanas y angélicas, y no tengo amor, vengo a ser como metal que resuena, o címbalo que retiñe.","Y si tuviese profecía, y entendiese todos los misterios y toda ciencia, y si tuviese toda la fe, de tal manera que trasladase los montes, y no tengo amor, nada soy.","Y si repartiese todos mis bienes para dar de comer a los pobres, y si entregase mi cuerpo para ser quemado, y no tengo amor, de nada me sirve.","El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece;","no hace nada indebido, no busca lo suyo, no se irrita, no guarda rencor;","no se goza de la injusticia, mas se goza de la verdad.","Todo lo sufre, todo lo cree, todo lo espera, todo lo soporta.","El amor nunca deja de ser; pero las profecías se acabarán, y cesarán las lenguas, y la ciencia acabará.","Porque en parte conocemos, y en parte profetizamos;","mas cuando venga lo perfecto, entonces lo que es en parte se acabará.","Cuando yo era niño, hablaba como niño, pensaba como niño, juzgaba como niño; mas cuando ya fui hombre, dejé lo que era de niño.","Ahora vemos por espejo, oscuramente; mas entonces veremos cara a cara. Ahora conozco en parte; pero entonces conoceré como fui conocido.","Y ahora permanecen la fe, la esperanza y el amor, estos tres; pero el mayor de ellos es el amor."]},
  php:{4:["Regocijaos en el Señor siempre. Otra vez digo: ¡Regocijaos!","Vuestra gentileza sea conocida de todos los hombres. El Señor está cerca.","Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias.","Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.","Por lo demás, hermanos, todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro, todo lo amable, todo lo que es de buen nombre; si hay virtud alguna, si algo digno de alabanza, en esto pensad.","Lo que aprendisteis y recibisteis y oísteis y visteis en mí, esto haced; y el Dios de paz estará con vosotros.","En gran manera me gocé en el Señor de que ya al fin habéis revivido vuestro cuidado de mí; de lo cual también estabais solícitos, pero os faltaba la oportunidad.","No lo digo porque tenga escasez, pues he aprendido a contentarme, cualquiera que sea mi situación.","Sé vivir humildemente, y sé tener abundancia; en todo y por todo estoy enseñado, así para estar saciado como para tener hambre, así para tener abundancia como para padecer necesidad.","Todo lo puedo en Cristo que me fortalece."]}
};

const BUNDLED_VERSIONS=[
  {id:'rvr1960',name:'Reina Valera 1960',abbr:'RVR1960',lang:'es',license:'Incluida en la app',source:'Incluida'},
  {id:'ntv',name:'Nueva Traducción Viviente',abbr:'NTV',lang:'es',license:'Incluida en la app',source:'Incluida'},
  {id:'tla',name:'Traducción en Lenguaje Actual',abbr:'TLA',lang:'es',license:'Incluida en la app',source:'Incluida'}
];
const _bundledPending={};
const _bundledFailed={};
function isBundled(id){ return BUNDLED_VERSIONS.some(v=>v.id===id); }
function bundledData(id){ return (window.BereaBible && window.BereaBible[id]) || null; }
function loadBundled(id){
  const d=bundledData(id);
  if(d) return Promise.resolve(d);
  if(_bundledFailed[id]) return Promise.resolve(null);
  if(_bundledPending[id]) return _bundledPending[id];
  _bundledPending[id]=new Promise(resolve=>{
    const s=document.createElement('script');
    s.src='data/'+id+'.js';
    s.onload=()=>{ delete _bundledPending[id]; if(!bundledData(id)) _bundledFailed[id]=true; resolve(bundledData(id)); };
    s.onerror=()=>{ delete _bundledPending[id]; _bundledFailed[id]=true; resolve(null); };
    document.head.appendChild(s);
  });
  return _bundledPending[id];
}
function versionLabel(id){ const v=(S.versions||[]).find(x=>x.id===id); return v?v.name:(id||''); }
let _loadOvN=0;
function showLoadOverlay(msg){
  _loadOvN++;
  let ov=document.getElementById('loadOv');
  if(!ov){ ov=document.createElement('div'); ov.id='loadOv'; ov.className='load-ov'; document.body.appendChild(ov); }
  ov.innerHTML='<div class="img-gen-spin"></div><p class="tiny" style="margin:0">'+esc(msg||'Preparando…')+'</p>';
  ov.classList.add('on');
}
function hideLoadOverlay(){
  _loadOvN=Math.max(0,_loadOvN-1);
  const ov=document.getElementById('loadOv');
  if(ov && !_loadOvN) ov.classList.remove('on');
}
function ensureVersions(ids,msg){
  const need=(ids||[]).filter(id=>isBundled(id)&&!bundledData(id)&&!_bundledFailed[id]);
  if(!need.length) return Promise.resolve(false);
  showLoadOverlay(msg||('Preparando '+versionLabel(need[0])+'…'));
  return Promise.all(need.map(loadBundled)).then(()=>{ hideLoadOverlay(); return true; },()=>{ hideLoadOverlay(); return true; });
}
function activeVersion(){
  const V = S.versions || [];
  return V.find(v=>v.id===S.settings.versionId) || V[0];
}
function getChapter(versionId, bookId, chapter){
  if(S.bible && S.bible[versionId] && S.bible[versionId][bookId] && S.bible[versionId][bookId][chapter]) return S.bible[versionId][bookId][chapter];
  const bd=bundledData(versionId);
  if(bd && bd[bookId] && bd[bookId][chapter]) return bd[bookId][chapter];
  if(versionId==='rv1909' && PD_TEXT[bookId] && PD_TEXT[bookId][chapter]) return PD_TEXT[bookId][chapter];
  return null;
}
function verseText(bookId, chapter, verse){
  const arr = getChapter(S.settings.versionId, bookId, chapter);
  if(!arr) return '';
  let n=0;
  for(const it of arr){
    if(it && typeof it==='object' && it.h) continue;
    n++;
    if(n===verse) return it;
  }
  return '';
}
function refLabel(bookId, chapter, verse){
  const b = bookById(bookId);
  return b ? b.name+' '+chapter+(verse?':'+verse:'') : '';
}
function refShort(bookId, chapter, verse){
  const b = bookById(bookId);
  return b ? b.abbr+' '+chapter+(verse?':'+verse:'') : '';
}

/* ============================================================
   SEEDS
   ============================================================ */
function seedWords(){
  return [
    {id:'w-gracia',term:'Gracia',strong:'Járis · Janán',origin:'Griego χάρις (járis), hebreo חֵן (janán).',meaning:'Favor inmerecido que Dios concede libremente. No es una recompensa por mérito, sino un don que procede del carácter bondadoso de Dios.',context:'En el Antiguo Testamento designa el favor que alguien halla ante los ojos de otro. En el Nuevo Testamento pasa a describir el corazón del evangelio.',synonyms:'Favor, misericordia, bondad, don.',refs:[['jhn',1,16],['jhn',1,17],['rom',6,14],['rom',6,23]],createdAt:Date.now()},
    {id:'w-fe',term:'Fe',strong:'Pístis · Emuná',origin:'Griego πίστις (pístis); hebreo אֱמוּנָה (emuná), de la raíz אמן: firmeza, estabilidad.',meaning:'Confianza firme y sostenida. En hebreo la raíz evoca fidelidad y solidez; en griego, convicción que se apoya en otro.',context:'No es un sentimiento optimista ni una fuerza interior, sino el apoyo de la persona en la fidelidad de Dios.',synonyms:'Confianza, fidelidad, certeza, seguridad.',refs:[['rom',6,8],['php',4,13]],createdAt:Date.now()},
    {id:'w-santidad',term:'Santidad',strong:'Jagiasmós · Qódesh',origin:'Griego ἁγιασμός (jagiasmós); hebreo קֹדֶשׁ (qódesh): separación, apartamiento.',meaning:'Estado de lo que ha sido apartado para Dios. Incluye tanto una posición como un proceso.',context:'Romanos 6 usa el lenguaje de esclavitud para describir el cambio de dueño.',synonyms:'Consagración, apartamiento, pureza.',refs:[['rom',6,19],['rom',6,22],['1co',13,13]],createdAt:Date.now()},
    {id:'w-bautismo',term:'Bautismo',strong:'Báptisma',origin:'Griego βάπτισμα (báptisma), de βαπτίζω: sumergir, hundir.',meaning:'Inmersión. En el Nuevo Testamento designa la identificación del creyente con la muerte, sepultura y resurrección de Cristo.',context:'Romanos 6 presenta el bautismo como participación real en la muerte de Cristo.',synonyms:'Inmersión, identificación con Cristo.',refs:[['rom',6,3],['rom',6,4]],createdAt:Date.now()},
    {id:'w-pecado',term:'Pecado',strong:'Hamartía',origin:'Griego ἁμαρτία (hamartía): errar el blanco, fallar el objetivo.',meaning:'Toda desviación de la voluntad de Dios, en acto, palabra o disposición interior.',context:'Romanos 6 trata el pecado como un poder que esclaviza, no sólo como actos aislados.',synonyms:'Transgresión, iniquidad, desobediencia.',refs:[['rom',6,2],['rom',6,11],['rom',6,23]],createdAt:Date.now()},
    {id:'w-amor',term:'Amor',strong:'Agápe · Jésed',origin:'Griego ἀγάπη (agápe); hebreo חֶסֶד (jésed): lealtad amorosa dentro de una relación de pacto.',meaning:'Entrega decidida orientada al bien del otro, con independencia de su mérito.',context:'1 Corintios 13 define el amor por lo que hace y por lo que no hace.',synonyms:'Caridad, benevolencia, misericordia.',refs:[['1co',13,4],['1co',13,13],['jhn',3,16]],createdAt:Date.now()},
    {id:'w-esperanza',term:'Esperanza',strong:'Elpís · Tiqwá',origin:'Griego ἐλπίς (elpís); hebreo תִּקְוָה (tiqwá), de una raíz que significa «cuerda tensa».',meaning:'Expectativa firme, sostenida por la fidelidad de Dios.',context:'No es optimismo sobre las circunstancias, sino certeza sobre la promesa.',synonyms:'Expectativa, confianza, certeza futura.',refs:[['1co',13,13]],createdAt:Date.now()},
    {id:'w-paz',term:'Paz',strong:'Eiréne · Shalom',origin:'Griego εἰρήνη (eiréne); hebreo שָׁלוֹם (shalom): integridad, plenitud, rectitud de las relaciones.',meaning:'No sólo ausencia de conflicto, sino estado de integridad y de relaciones restauradas.',context:'Filipenses 4 la presenta como un don que guarda el corazón cuando la oración sustituye la ansiedad.',synonyms:'Integridad, reposo, reconciliación.',refs:[['php',4,6],['php',4,7]],createdAt:Date.now()}
  ];
}
function seedDoctrines(){
  return [
    {id:'d-bautismo',title:'El bautismo en agua',summary:'Identificación del creyente con la muerte, sepultura y resurrección de Jesucristo.',official:'',officialSource:'',refs:[['rom',6,3],['rom',6,4]],createdAt:Date.now()},
    {id:'d-santidad',title:'La santidad',summary:'Apartamiento para Dios y transformación progresiva del creyente.',official:'',officialSource:'',refs:[['rom',6,19],['rom',6,22]],createdAt:Date.now()},
    {id:'d-salvacion',title:'La salvación por gracia',summary:'El don de Dios recibido por fe, no por obras.',official:'',officialSource:'',refs:[['rom',6,23],['jhn',3,16]],createdAt:Date.now()},
    {id:'d-espiritu',title:'El Espíritu Santo',summary:'La persona del Espíritu que mora en el creyente, vivifica y da testimonio.',official:'',officialSource:'',refs:[['rom',8,9],['rom',8,11],['jhn',3,5]],createdAt:Date.now()}
  ];
}
function seedExplore(){
  return [
    {id:'e-nicodemo',type:'Personaje',title:'Nicodemo',body:'Fariseo y principal entre los judíos. Acude a Jesús de noche y recibe la enseñanza sobre el nuevo nacimiento. La escena da lugar a Juan 3:16.',refs:[['jhn',3,1],['jhn',3,2],['jhn',3,16]],createdAt:Date.now()},
    {id:'e-pablo',type:'Personaje',title:'Pablo (Saulo de Tarso)',body:'Escribió Romanos, 1 y 2 Corintios, Gálatas, Efesios, Filipenses, Colosenses, 1 y 2 Tesalonicenses, 1 y 2 Timoteo, Tito y Filemón.',refs:[['rom',6,1],['rom',8,1]],createdAt:Date.now()},
    {id:'e-romanos',type:'Libro',title:'Romanos',body:'Carta de Pablo a la iglesia de Roma. Expone de forma sistemática el pecado, la justificación por fe, la santificación y la vida en el Espíritu.',refs:[['rom',6,1],['rom',6,23],['rom',8,1]],createdAt:Date.now()},
    {id:'e-nuevo-nacimiento',type:'Tema',title:'El nuevo nacimiento',body:'Expresión de Jesús a Nicodemo en Juan 3. Indica un origen nuevo, no una mejora de lo anterior.',refs:[['jhn',3,3],['jhn',3,5],['jhn',3,8]],createdAt:Date.now()},
    {id:'e-muerte-al-pecado',type:'Tema',title:'Morir al pecado',body:'Lenguaje paulino de Romanos 6. El creyente es considerado muerto respecto al pecado y vivo respecto a Dios.',refs:[['rom',6,2],['rom',6,11]],createdAt:Date.now()},
    {id:'e-vida-nueva',type:'Tema',title:'Vida nueva',body:'Resultado de la resurrección de Cristo aplicada al creyente. Romanos 6:4 la presenta como el propósito del bautismo.',refs:[['rom',6,4]],createdAt:Date.now()},
    {id:'e-bienaventuranzas',type:'Tema',title:'Las bienaventuranzas',body:'Apertura del Sermón del Monte (Mateo 5). Describen el carácter del reino, no requisitos de entrada.',refs:[['mat',5,3],['mat',5,4],['mat',5,5]],createdAt:Date.now()},
    {id:'e-efeso',type:'Lugar',title:'Éfeso',body:'Ciudad de Asia Menor, destino de la carta a los Efesios y lugar de una parte importante del ministerio de Pablo.',refs:[],createdAt:Date.now()}
  ];
}
function seedVod(){
  const base = [
    ['jhn',3,16,'El amor de Dios no se mide por lo que sentimos, sino por lo que entregó.'],
    ['rom',6,23,'El contraste es deliberado: una paga y un don.'],
    ['psa',23,1,'La frase no dice que nada faltará sin más, sino que nada faltará porque Jehová es pastor.'],
    ['php',4,6,'El antídoto contra la ansiedad que propone Pablo no es la calma, sino la oración con acción de gracias.'],
    ['mat',5,13,'La sal no se define por lo que es en sí, sino por lo que hace en contacto con lo demás.'],
    ['1co',13,4,'Pablo define el amor con verbos, no con adjetivos.'],
    ['rom',8,1,'Antes de cualquier exhortación, Pablo afirma una declaración: ninguna condenación.'],
    ['psa',1,2,'La bienaventuranza no recae sobre quien lee, sino sobre quien medita.'],
    ['jhn',3,8,'Jesús compara el obrar del Espíritu con el viento: real, perceptible, pero no controlable.'],
    ['rom',6,4,'El bautismo no es un rito de limpieza, sino una imagen de sepultura y resurrección.'],
    ['psa',121,1,'El salmista levanta los ojos a los montes y se corrige a sí mismo.'],
    ['mat',5,14,'La luz no se enciende para el propio cuarto.'],
    ['gen',1,27,'El texto repite tres veces la palabra imagen.'],
    ['php',4,7,'La paz de Dios guarda el corazón cuando la oración ha puesto fuera lo que lo oprimía.'],
    ['rom',6,11,'El versículo no dice «siéntanse muertos», sino «consideraos».'],
    ['1co',13,13,'Fe, esperanza y amor permanecen.'],
    ['psa',23,4,'El valle no se evita, se atraviesa.'],
    ['jhn',1,14,'El Verbo fue hecho carne y habitó entre nosotros.'],
    ['psa',91,1,'No dice que el que habita al abrigo del Altísimo no verá peligro, sino que morará bajo la sombra.'],
    ['mat',5,3,'El reino no comienza con los fuertes, sino con los que reconocen su necesidad.'],
    ['rom',8,11,'El mismo Espíritu que levantó a Jesús mora en el creyente.'],
    ['psa',1,3,'El árbol plantado junto a corrientes de aguas no produce fruto por esfuerzo, sino por ubicación.'],
    ['php',4,13,'Pablo escribe esto después de decir que aprendió a contentarse en toda situación.'],
    ['rom',6,14,'No estáis bajo la ley, sino bajo la gracia.'],
    ['jhn',1,1,'Juan abre su evangelio con las mismas palabras que Génesis.'],
    ['1co',13,7,'Cuatro verbos absolutos: todo lo sufre, todo lo cree, todo lo espera, todo lo soporta.'],
    ['psa',121,7,'Dos veces aparece el verbo guardar.'],
    ['mat',5,8,'Los de limpio corazón verán a Dios.'],
    ['gen',1,3,'Dios habla y la luz aparece.'],
    ['rom',6,22,'El fruto aparece al final.']
  ];
  return base.map(([b,c,v,r],i)=>({id:'vod-'+i,book:b,chapter:c,verse:v,reflection:r,author:'Editorial',createdAt:Date.now()}));
}

/* ============================================================
   DATA OPERATIONS
   ============================================================ */
const Data = {
  pushHistory(book, chapter, verse){
    S.history = S.history.filter(h=>!(h.book===book&&h.chapter===chapter));
    S.history.unshift({book,chapter,verse:verse||null,at:Date.now()});
    S.history = S.history.slice(0,60);
    S.settings.lastRead = {book,chapter,verse:verse||S.settings.lastRead.verse};
    save('settings'); save('history');
    const k=todayKey();
    if(!S.stats.days.includes(k)){ S.stats.days.push(k); S.stats.days=S.stats.days.slice(-60); save('stats'); }
  },
  streakDays(){
    const days=new Set(S.stats.days||[]); let n=0; const d=new Date();
    while(true){
      const k=dateKey(d);
      if(days.has(k)){ n++; d.setDate(d.getDate()-1); } else break;
    }
    return n;
  },
  highlightOf(b,c,v){ return S.highlights.find(h=>h.book===b&&h.chapter===c&&h.verse===v); },
  toggleHighlight(b,c,v,color){
    const ex=S.highlights.find(h=>h.book===b&&h.chapter===c&&h.verse===v);
    if(ex && (!color || ex.color===color)){ S.highlights=S.highlights.filter(h=>h!==ex); save('highlights'); return null; }
    if(ex){ ex.color=color; ex.updatedAt=Date.now(); }
    else S.highlights.push({id:uid(),book:b,chapter:c,verse:v,color:color||'1',createdAt:Date.now(),updatedAt:Date.now()});
    save('highlights'); return true;
  },
  isFavorite(type,ref){ return S.favorites.some(f=>f.type===type&&f.ref===ref); },
  toggleFavorite(type,ref,label){
    const i=S.favorites.findIndex(f=>f.type===type&&f.ref===ref);
    if(i>=0){ S.favorites.splice(i,1); save('favorites'); return false; }
    S.favorites.unshift({id:uid(),type,ref,label:label||ref,createdAt:Date.now()});
    save('favorites'); return true;
  },
  isBookmark(ref){ return S.bookmarks.some(b=>b.ref===ref); },
  toggleBookmark(ref,label,extra){
    const i=S.bookmarks.findIndex(b=>b.ref===ref);
    if(i>=0){ S.bookmarks.splice(i,1); save('bookmarks'); return false; }
    S.bookmarks.unshift({id:uid(),ref,label:label||ref,...(extra||{}),createdAt:Date.now()});
    save('bookmarks'); return true;
  },
  addInbox(item){ S.inbox.unshift({id:uid(),done:false,createdAt:Date.now(),...item}); save('inbox'); },
  removeInbox(id){ S.inbox=S.inbox.filter(i=>i.id!==id); save('inbox'); },
  createNote(data){
    const n={id:uid(),title:'',content:'',tags:[],folderId:null,status:'',favorite:false,deletedAt:null,refs:[],links:[],createdAt:Date.now(),updatedAt:Date.now(),...(data||{})};
    S.notes.unshift(n); save('notes'); return n;
  },
  getNote(id){ return S.notes.find(n=>n.id===id); },
  trashNote(id){ const n=S.notes.find(x=>x.id===id); if(n){ n.deletedAt=Date.now(); save('notes'); } },
  restoreNote(id){ const n=S.notes.find(x=>x.id===id); if(n){ n.deletedAt=null; save('notes'); } },
  createStudy(data){
    const s={id:uid(),title:'',blocks:[],tags:[],folderId:null,status:'',favorite:false,deletedAt:null,refs:[],createdAt:Date.now(),updatedAt:Date.now(),...(data||{})};
    S.studies.unshift(s); save('studies'); return s;
  },
  getStudy(id){ return S.studies.find(s=>s.id===id); },
  trashStudy(id){ const s=S.studies.find(x=>x.id===id); if(s){ s.deletedAt=Date.now(); save('studies'); } },
  restoreStudy(id){ const s=S.studies.find(x=>x.id===id); if(s){ s.deletedAt=null; save('studies'); } },
  relate(a,b,label){
    const key=[a.type,a.id,b.type,b.id].join('|');
    const keyR=[b.type,b.id,a.type,a.id].join('|');
    if(S.relations.some(r=>r.key===key||r.key===keyR)) return null;
    const rel={id:uid(),key,a,b,label:label||'',createdAt:Date.now()};
    S.relations.push(rel); save('relations'); return rel;
  },
  relationsOf(type,id){
    return S.relations.filter(r=>(r.a.type===type&&r.a.id===id)||(r.b.type===type&&r.b.id===id))
      .map(r=>(r.a.type===type&&r.a.id===id)?r.b:r.a);
  },
  createFolder(name){ const f={id:uid(),name,createdAt:Date.now()}; S.folders.push(f); save('folders'); return f; },
  deleteFolder(id){
    S.folders=S.folders.filter(f=>f.id!==id);
    S.notes.forEach(n=>{ if(n.folderId===id) n.folderId=null; });
    S.studies.forEach(s=>{ if(s.folderId===id) s.folderId=null; });
    save('folders'); save('notes'); save('studies');
  },
  vodForDate(key){
    if(!S.vod.length) return null;
    let hash=0; for(let i=0;i<key.length;i++) hash=(hash*31+key.charCodeAt(i))>>>0;
    return S.vod[hash%S.vod.length];
  }
};

/* ============================================================
   UI BASE
   ============================================================ */
function toast(msg, icon){
  const el=document.createElement('div');
  el.className='toast';
  el.innerHTML=(icon?ic(icon):'')+'<span>'+esc(msg)+'</span>';
  $('#toasts').appendChild(el);
  setTimeout(()=>{
    el.style.transition='opacity .3s, transform .3s';
    el.style.opacity='0'; el.style.transform='translateY(10px)';
    setTimeout(()=>el.remove(),320);
  },2100);
}

const Layers = {
  openSheet(build){
    const sh=$('#sheet'),sc=$('#scrim');
    $('#sheetHead').innerHTML='';
    $('#sheetBody').innerHTML='';
    build($('#sheetHead'),$('#sheetBody'));
    sh.classList.add('on'); sc.classList.add('on');
    haptic('light');
  },
  closeSheet(){
    $('#sheet').classList.remove('on');
    if(!$('#panel').classList.contains('on')) $('#scrim').classList.remove('on');
  },
  closeAll(){ Layers.closeSheet(); $('#panel').classList.remove('on'); $('#scrim').classList.remove('on'); }
};
$('#scrim').addEventListener('click',()=>Layers.closeAll());

function askText({title,label,value,placeholder,multiline,confirmText}){
  return new Promise(resolve=>{
    Layers.openSheet((head,body)=>{
      head.innerHTML='<div class="h2" style="flex:1">'+esc(title)+'</div><button class="icon-btn" data-cancel>'+ic('close')+'</button>';
      body.innerHTML=
        (label?'<div class="field"><label>'+esc(label)+'</label>':'<div class="field">')+
        (multiline?'<textarea class="textarea" id="askInput" placeholder="'+esc(placeholder||'')+'">'+esc(value||'')+'</textarea>':'<input class="input" id="askInput" value="'+esc(value||'')+'" placeholder="'+esc(placeholder||'')+'">')+
        '</div><button class="btn btn-primary btn-block" id="askOk">'+esc(confirmText||'Guardar')+'</button>';
      const input=$('#askInput',body);
      setTimeout(()=>{ input.focus(); if(!multiline) input.select(); },120);
      const done=v=>{ Layers.closeSheet(); resolve(v); };
      $('#askOk',body).onclick=()=>done(input.value.trim());
      head.querySelector('[data-cancel]').onclick=()=>done(null);
      input.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!multiline){ e.preventDefault(); done(input.value.trim()); } });
    });
  });
}

async function confirmDialog(title, message, confirmText){
  if(isNative && Cap.Dialog){
    try{
      const {value} = await Cap.Dialog.confirm({ title, message, okButtonTitle: confirmText||'Confirmar', cancelButtonTitle:'Cancelar' });
      return value;
    }catch(e){}
  }
  return new Promise(resolve=>{
    Layers.openSheet((head,body)=>{
      head.innerHTML='<div class="h2" style="flex:1">'+esc(title)+'</div>';
      body.innerHTML='<p class="sub" style="margin-bottom:20px">'+esc(message)+'</p>'+
        '<div style="display:flex;gap:10px"><button class="btn btn-block" id="cNo">Cancelar</button>'+
        '<button class="btn btn-primary btn-block" id="cYes">'+esc(confirmText||'Confirmar')+'</button></div>';
      const done=v=>{ Layers.closeSheet(); resolve(v); };
      $('#cNo',body).onclick=()=>done(false);
      $('#cYes',body).onclick=()=>done(true);
    });
  });
}

/* ============================================================
   NAV
   ============================================================ */
const NAV_MAIN=[
  {href:'#/',label:'Inicio',icon:'home'},
  {href:'#/biblia',label:'Biblia',icon:'book'},
  {href:'#/explorar',label:'Explorar',icon:'compass'},
  {href:'#/estudios',label:'Mis estudios',icon:'layers'},
  {href:'#/mas',label:'Más',icon:'grid'}
];
const NAV_SIDE=[
  {href:'#/',label:'Inicio',icon:'home'},
  {href:'#/biblia',label:'Biblia',icon:'book'},
  {href:'#/explorar',label:'Explorar',icon:'compass'},
  {href:'#/doctrina',label:'Doctrina',icon:'shield'},
  {href:'#/estudios',label:'Mis estudios',icon:'layers'},
  {href:'#/notas',label:'Notas',icon:'note'},
  {href:'#/inbox',label:'Para estudiar',icon:'inbox'},
  {href:'#/favoritos',label:'Favoritos',icon:'star'},
  {href:'#/buscar',label:'Buscar',icon:'search'},
  {href:'#/panel',label:'Panel',icon:'settings'}
];

function currentRoute(){
  let h=location.hash.replace(/^#/,'')||'/';
  h=h.split('?')[0];
  return h.split('/').filter(Boolean);
}
function go(hash){ location.hash=hash; }
function isActive(href){
  const cur=(location.hash||'#/').split('?')[0];
  if(href==='#/') return cur==='#/'||cur==='';
  return cur.startsWith(href);
}
function renderNav(){
  $('#sideNav').innerHTML=NAV_SIDE.map(n=>
    '<button class="nav-item '+(isActive(n.href)?'active':'')+'" data-go="'+n.href+'">'+
    ic(n.icon)+'<span>'+n.label+'</span>'+
    (n.href==='#/inbox'&&S.inbox.filter(i=>!i.done).length?'<span class="nav-badge">'+S.inbox.filter(i=>!i.done).length+'</span>':'')+
    '</button>').join('');
  document.querySelectorAll('[data-go]').forEach(el=>{
    if(el.__bound) return; el.__bound=true;
    el.addEventListener('click',()=>{ haptic('light'); go(el.dataset.go); });
  });
}
function mountBottomNav(){
  if($('#bottomnav')) return;
  const el=document.createElement('nav');
  el.className='bottomnav'; el.id='bottomnav';
  el.innerHTML=NAV_MAIN.map(n=>'<button class="bn-item" data-go="'+n.href+'">'+ic(n.icon)+'<span>'+n.label+'</span></button>').join('');
  document.body.appendChild(el);
  el.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>{ haptic('light'); go(b.dataset.go); }));
}
function syncBottomNav(){
  const nav=$('#bottomnav'); if(!nav) return;
  nav.querySelectorAll('.bn-item').forEach(b=>b.classList.toggle('active',isActive(b.dataset.go)));
}
function mountFab(){
  if($('#fab')) return;
  const el=document.createElement('button');
  el.className='fab'; el.id='fab'; el.title='Captura rápida';
  el.innerHTML=ic('plus');
  el.onclick=()=>{ haptic('medium'); openQuickCapture(); };
  document.body.appendChild(el);
}
function openQuickCapture(){
  Layers.openSheet((h,b)=>{
    h.innerHTML='<div class="h2" style="flex:1">Captura rápida</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    b.innerHTML=
      '<div class="field"><textarea class="qc-input" id="qci" rows="3" placeholder="Una idea, una referencia (Juan 3:16), una palabra…"></textarea></div>'+
      '<button class="btn btn-primary btn-block" style="margin-bottom:14px" id="qcok">'+ic('inbox')+' Guardar en «Para estudiar después»</button>'+
      '<p class="qc-hint">Escribe una referencia como <code>Romanos 6:4</code> y se guardará como versículo.</p>';
    const inp=$('#qci',b);
    setTimeout(()=>inp.focus(),120);
    h.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    const commit=()=>{
      const v=inp.value.trim(); if(!v) return;
      const parsed=parseRef(v);
      if(parsed && parsed.verse){
        Data.addInbox({kind:'verse',title:refLabel(parsed.book,parsed.chapter,parsed.verse),subtitle:'Referencia',book:parsed.book,chapter:parsed.chapter,verse:parsed.verse,text:verseText(parsed.book,parsed.chapter,parsed.verse)});
      } else if(parsed){
        Data.addInbox({kind:'verse',title:refLabel(parsed.book,parsed.chapter),subtitle:'Capítulo',book:parsed.book,chapter:parsed.chapter});
      } else {
        Data.addInbox({kind:'note',title:v,subtitle:'Idea rápida'});
      }
      haptic('success'); Layers.closeSheet(); toast('Guardado','inbox'); flashSave(); renderNav();
    };
    $('#qcok',b).onclick=commit;
    inp.addEventListener('keydown',e=>{ if(e.key==='Enter'&&(e.metaKey||e.ctrlKey)){ e.preventDefault(); commit(); } });
  });
}

let _zenActive = false;
function toggleZen(on){
  _zenActive = !!on;
  document.body.classList.toggle('zen', _zenActive);
  haptic('medium');
}
$('#zenExit').onclick = ()=> toggleZen(false);

function openImageMenu(img){
  const menu = $('#imgMenu');
  const rect = img.getBoundingClientRect();
  const cls = img.classList.contains('size-s') ? 's' : img.classList.contains('size-m') ? 'm' : img.classList.contains('size-l') ? 'l' : 'full';
  menu.innerHTML =
    '<button data-sz="s" class="'+(cls==='s'?'on':'')+'">Pequeña</button>'+
    '<button data-sz="m" class="'+(cls==='m'?'on':'')+'">Mediana</button>'+
    '<button data-sz="l" class="'+(cls==='l'?'on':'')+'">Grande</button>'+
    '<button data-sz="full" class="'+(cls==='full'?'on':'')+'">Completa</button>'+
    '<button data-del="1" style="color:var(--danger)">Borrar</button>';
  menu.style.left = Math.max(12, Math.min(window.innerWidth - 260, rect.left)) + 'px';
  menu.style.top = Math.min(window.innerHeight - 80, rect.bottom + 6) + 'px';
  menu.classList.add('on');
  menu.querySelectorAll('[data-sz]').forEach(btn=>{
    btn.onclick = ()=>{
      img.classList.remove('size-s','size-m','size-l');
      const sz = btn.dataset.sz;
      if(sz !== 'full') img.classList.add('size-'+sz);
      menu.classList.remove('on');
      const ed = img.closest('[contenteditable]');
      if(ed) ed.dispatchEvent(new Event('input',{bubbles:true}));
      haptic('light');
    };
  });
  menu.querySelector('[data-del]').onclick = ()=>{
    const ed = img.closest('[contenteditable]');
    img.remove();
    menu.classList.remove('on');
    if(ed) ed.dispatchEvent(new Event('input',{bubbles:true}));
    haptic('medium');
  };
}
document.addEventListener('click', e=>{
  const img = e.target.closest('.editor img');
  if(img){ e.preventDefault(); openImageMenu(img); return; }
  if(!e.target.closest('#imgMenu')) $('#imgMenu').classList.remove('on');
});

/* ============================================================
   NOTIFICACIONES
   ============================================================ */
const Notif = {
  plugin(){ return isNative && Cap.LocalNotifications ? Cap.LocalNotifications : null; },
  async ensurePermission(){
    const p = Notif.plugin();
    if(!p) return false;
    try{
      let {display} = await p.checkPermissions();
      if(display !== 'granted'){
        const req = await p.requestPermissions();
        display = req.display;
      }
      return display === 'granted';
    }catch(e){ console.warn('Notif perm', e); return false; }
  },
  async cancelAll(){
    const p = Notif.plugin();
    if(!p) return;
    try{
      const pend = await p.getPending();
      if(pend && pend.notifications && pend.notifications.length){
        await p.cancel({ notifications: pend.notifications.map(n=>({id:n.id})) });
      }
    }catch(e){}
  },
  async schedule30(){
    const p = Notif.plugin();
    if(!p) return;
    if(!S.settings.dailyNotif) return;
    const ok = await Notif.ensurePermission();
    if(!ok) return;
    await Notif.cancelAll();

    const notifications = [];
    const now = new Date();
    const hour = S.settings.dailyNotifHour;
    const minute = S.settings.dailyNotifMinute;

    for(let i=0;i<30;i++){
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      d.setHours(hour, minute, 0, 0);
      if(d <= now) continue;
      const key = dateKey(d);
      const vod = Data.vodForDate(key);
      if(!vod) continue;
      const ref = refLabel(vod.book, vod.chapter, vod.verse);
      const body = (verseText(vod.book, vod.chapter, vod.verse)||'').slice(0,180);
      notifications.push({
        id: 100 + i,
        title: 'Versículo del día · ' + ref,
        body: body || vod.reflection || 'Toca para leerlo',
        schedule: { at: d, allowWhileIdle: true },
        smallIcon: 'ic_stat_icon',
        sound: null,
        autoCancel: true,
        extra: { book: vod.book, chapter: vod.chapter, verse: vod.verse, date: key }
      });
    }
    if(!notifications.length) return;
    try{
      await p.schedule({ notifications });
    }catch(e){ console.warn('Schedule notif', e); }
  }
};

async function toggleDailyNotif(on){
  if(on){
    const ok = await Notif.ensurePermission();
    if(!ok){
      toast('Necesitas permitir notificaciones','bell');
      return false;
    }
  }
  S.settings.dailyNotif = !!on;
  save('settings');
  if(on) await Notif.schedule30();
  else await Notif.cancelAll();
  return true;
}

/* ============================================================
   VIEWS
   ============================================================ */
const View = {};

function setTopbar({back,title,actions,progress}){
  $('#topbar').innerHTML=
    (back?'<button class="icon-btn" id="tbBack">'+ic('back')+'</button>':'')+
    '<div class="topbar-title">'+(title||'')+'</div>'+
    '<div class="save-dot" id="saveDot"></div>'+
    (progress?progressRing(progress):'')+
    (actions||[]).map((a,i)=>'<button class="icon-btn" data-act="'+i+'" title="'+esc(a.title||'')+'">'+ic(a.icon)+'</button>').join('');
  if(back) $('#tbBack').onclick=()=>{ haptic('light'); history.length>1?history.back():go('#/'); };
  (actions||[]).forEach((a,i)=>{
    const el=$('#topbar').querySelector('[data-act="'+i+'"]');
    if(el) el.onclick=()=>{ haptic('light'); a.onClick(); };
  });
}
function progressRing(pct){
  const r=9,c=2*Math.PI*r,off=c*(1-Math.max(0,Math.min(1,pct)));
  return '<svg class="progress-ring" viewBox="0 0 24 24"><circle class="bg" cx="12" cy="12" r="'+r+'"></circle>'+
    '<circle class="fg" cx="12" cy="12" r="'+r+'" stroke-dasharray="'+c.toFixed(2)+'" stroke-dashoffset="'+off.toFixed(2)+'"></circle></svg>';
}

let _lastDepth=0;
function render(){
  const r=currentRoute();
  const seg0=r[0]||'';
  const view=$('#view');
  const depth=r.length;
  view.classList.remove('forward','back');
  if(depth>_lastDepth) view.classList.add('forward');
  else if(depth<_lastDepth) view.classList.add('back');
  _lastDepth=depth;
  window.scrollTo(0,0);
  $('#scroll').scrollTop=0;
  if(_zenActive && seg0 !== 'leer') toggleZen(false);

  const map={
    '':View.home,'biblia':View.bible,'explorar':View.explore,'doctrina':View.doctrine,
    'estudios':View.studies,'notas':View.notes,'inbox':View.inbox,'favoritos':View.favorites,
    'buscar':View.search,'panel':View.admin,'ajustes':View.settings,'mas':View.more,
    'leer':View.read,'estudio':View.study,'nota':View.note,'palabra':View.word,
    'entrada':View.exploreEntry,'compartido':View.shared,'comparar':View.compare
  };

  if(seg0==='doctrina' && r.length>1) View.doctrineEntry(view,r);
  else if(seg0==='admin' && r.length>1){
    if(r[1]==='versiones') View.adminVersions(view,r);
    else View.adminList(view,r);
  } else {
    const fn=map[seg0];
    if(fn) fn(view,r);
    else view.innerHTML='<div class="page"><div class="empty">'+ic('info')+'<p>Página no encontrada</p><small>Ruta: <code>'+esc(location.hash||'#/')+'</code></small></div></div>';
  }
  renderNav();
  syncBottomNav();
}

View.home=function(el){
  setTopbar({
    title:'',
    actions:[
      {icon:(document.documentElement.dataset.theme==='dark')?'sun':'moon',title:'Tema',onClick:toggleTheme},
      {icon:'search',title:'Buscar',onClick:()=>go('#/buscar')}
    ]
  });
  const lr=S.settings.lastRead;
  const vod=Data.vodForDate(todayKey());
  const lastStudy=S.studies.filter(s=>!s.deletedAt).sort((a,b)=>b.updatedAt-a.updatedAt)[0];
  const lastNote=S.notes.filter(n=>!n.deletedAt).sort((a,b)=>b.updatedAt-a.updatedAt)[0];
  const pending=S.inbox.filter(i=>!i.done);
  const streak=Data.streakDays();
  const greeting=(()=>{
    const h=new Date().getHours();
    if(h<6) return 'Buenas noches';
    if(h<13) return 'Buenos días';
    if(h<20) return 'Buenas tardes';
    return 'Buenas noches';
  })();
  const heroTxt=(verseText(lr.book,lr.chapter,lr.verse)||'').slice(0,120);

  el.innerHTML=
  '<div class="page">'+
    '<div style="padding:22px 0 6px;display:flex;align-items:flex-end;justify-content:space-between;gap:12px">'+
      '<div><div class="tiny" style="font-weight:650;letter-spacing:.05em;text-transform:uppercase">'+esc(greeting)+(S.settings.name?', '+esc(S.settings.name):'')+'</div>'+
      '<h1 class="h1" style="margin-top:6px">Tu biblioteca bíblica</h1></div>'+
      (streak>1?'<div class="chip" title="Días consecutivos">'+ic('sparkle')+' '+streak+' días</div>':'')+
    '</div>'+
    '<button class="hero" data-open-read style="margin-top:14px;width:100%;text-align:left;border:0;cursor:pointer">'+
      '<div class="hero-lbl">Continuar leyendo</div>'+
      '<div class="hero-ref">'+esc(refLabel(lr.book,lr.chapter,lr.verse))+'</div>'+
      (heroTxt?'<div class="hero-txt">'+esc(heroTxt)+'…</div>':'')+
      '<div class="hero-btn" style="pointer-events:none">'+ic('play')+' Abrir</div>'+
    '</button>'+
    (vod?'<div class="section-head"><div class="h2">Versículo del día</div><span class="tiny">'+esc(new Date().toLocaleDateString('es',{day:'numeric',month:'long'}))+'</span></div>'+
      '<div class="vod-card">'+
        '<div class="vod-ref">'+esc(refLabel(vod.book,vod.chapter,vod.verse))+'</div>'+
        '<p class="vod-text">'+esc(verseText(vod.book,vod.chapter,vod.verse)||'—')+'</p>'+
        (vod.reflection?'<p class="vod-refl">'+esc(vod.reflection)+'</p>':'')+
        '<div class="vod-actions">'+
          '<button class="btn btn-sm" data-vod-read>'+ic('book')+' Leer capítulo</button>'+
          '<button class="btn btn-sm" data-vod-save>'+ic('bookmark')+' Guardar</button>'+
          '<button class="btn btn-sm" data-vod-image>'+ic('image')+' Imagen</button>'+
          '<button class="btn btn-sm" data-vod-reflect>'+ic('note')+' Mi reflexión</button>'+
        '</div>'+
      '</div>':'')+
    (pending.length?'<div class="section-head"><div class="h2">Para estudiar después</div><button class="link-btn" data-go="#/inbox">Ver todo ('+pending.length+')</button></div>'+
      '<div class="card" style="padding:6px">'+pending.slice(0,3).map(it=>
        '<div class="row" data-inbox-go="'+it.id+'"><div class="row-ic">'+ic(it.kind==='word'?'type':it.kind==='verse'?'book':'note')+'</div>'+
        '<div class="row-main"><div class="row-t">'+esc(it.title||it.text||'Elemento')+'</div>'+
        '<div class="row-s">'+esc(it.subtitle||fmtDate(it.createdAt))+'</div></div></div>'
      ).join('')+'</div>':'')+
    ((lastStudy||lastNote)?'<div class="section-head"><div class="h2">Reciente</div></div><div class="list">'+
      (lastStudy?'<button class="row" data-open-study="'+lastStudy.id+'"><div class="row-ic">'+ic('layers')+'</div>'+
        '<div class="row-main"><div class="row-t">'+esc(lastStudy.title||'Estudio sin título')+'</div>'+
        '<div class="row-s">Estudio · '+fmtDate(lastStudy.updatedAt)+'</div></div>'+ic('chev','row-x')+'</button>':'')+
      (lastNote?'<button class="row" data-open-note="'+lastNote.id+'"><div class="row-ic">'+ic('note')+'</div>'+
        '<div class="row-main"><div class="row-t">'+esc(lastNote.title||stripTags(lastNote.content).slice(0,60)||'Nota sin título')+'</div>'+
        '<div class="row-s">Nota · '+fmtDate(lastNote.updatedAt)+'</div></div>'+ic('chev','row-x')+'</button>':'')+
      '</div>':'')+
    '<div class="section-head"><div class="h2">Tu biblioteca</div></div>'+
    '<div class="stat-grid">'+
      '<div class="stat"><div class="stat-n">'+S.highlights.length+'</div><div class="stat-l">Resaltados</div></div>'+
      '<div class="stat"><div class="stat-n">'+S.notes.filter(n=>!n.deletedAt).length+'</div><div class="stat-l">Notas</div></div>'+
      '<div class="stat"><div class="stat-n">'+S.studies.filter(s=>!s.deletedAt).length+'</div><div class="stat-l">Estudios</div></div>'+
      '<div class="stat"><div class="stat-n">'+S.history.length+'</div><div class="stat-l">Lecturas</div></div>'+
    '</div>'+
    '<div class="section-head"><div class="h2">Atajos</div></div>'+
    '<div class="list">'+
      '<button class="row" data-go="#/buscar"><div class="row-ic">'+ic('search')+'</div><div class="row-main"><div class="row-t">Buscar en todo</div><div class="row-s">Biblia, palabras, doctrinas, notas, estudios</div></div>'+ic('chev','row-x')+'</button>'+
      '<button class="row" data-go="#/explorar"><div class="row-ic">'+ic('compass')+'</div><div class="row-main"><div class="row-t">Explorar</div><div class="row-s">Palabras, personajes, lugares, temas</div></div>'+ic('chev','row-x')+'</button>'+
      '<button class="row" data-go="#/doctrina"><div class="row-ic">'+ic('shield')+'</div><div class="row-main"><div class="row-t">Doctrina</div><div class="row-s">Contenido oficial y estudios personales</div></div>'+ic('chev','row-x')+'</button>'+
      '<button class="row" data-go="#/favoritos"><div class="row-ic">'+ic('star')+'</div><div class="row-main"><div class="row-t">Favoritos y marcadores</div><div class="row-s">'+S.favorites.length+' favoritos · '+S.bookmarks.length+' marcadores</div></div>'+ic('chev','row-x')+'</button>'+
    '</div><div style="height:20px"></div>'+
  '</div>';

  const o=$('[data-open-read]',el);
  if(o) o.onclick=()=>{ haptic('medium'); go('#/leer/'+lr.book+'/'+lr.chapter); };
  el.querySelectorAll('[data-open-study]').forEach(b=>b.onclick=()=>go('#/estudio/'+b.dataset.openStudy));
  el.querySelectorAll('[data-open-note]').forEach(b=>b.onclick=()=>go('#/nota/'+b.dataset.openNote));
  el.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
  el.querySelectorAll('[data-inbox-go]').forEach(b=>b.onclick=()=>go('#/inbox'));

  if(vod){
    const rd=$('[data-vod-read]',el); if(rd) rd.onclick=()=>go('#/leer/'+vod.book+'/'+vod.chapter);
    const sv=$('[data-vod-save]',el);
    if(sv) sv.onclick=()=>{
      Data.addInbox({kind:'verse',title:refLabel(vod.book,vod.chapter,vod.verse),subtitle:'Versículo del día · '+todayKey(),book:vod.book,chapter:vod.chapter,verse:vod.verse,text:verseText(vod.book,vod.chapter,vod.verse)});
      haptic('success'); flashSave(); toast('Guardado','inbox'); renderNav();
    };
    const im=$('[data-vod-image]',el);
    if(im) im.onclick=()=> openVerseImage(vod.book, vod.chapter, vod.verse);
    const rf=$('[data-vod-reflect]',el);
    if(rf) rf.onclick=async()=>{
      const t=await askText({title:'Mi reflexión',label:refLabel(vod.book,vod.chapter,vod.verse),placeholder:'Escribe tu reflexión…',multiline:true,confirmText:'Guardar nota'});
      if(t){
        const n=Data.createNote({title:'Reflexión · '+refLabel(vod.book,vod.chapter,vod.verse),content:'<p>'+esc(t).replace(/\n/g,'</p><p>')+'</p>',refs:[{book:vod.book,chapter:vod.chapter,verse:vod.verse}]});
        haptic('success'); toast('Nota creada','note'); go('#/nota/'+n.id);
      }
    };
  }
};

function toggleTheme(){
  const cur=document.documentElement.dataset.theme;
  const next=cur==='dark'?'light':'dark';
  haptic('light'); applyTheme(next); S.settings.theme=next; save('settings'); render();
}
function applyTheme(t){
  let mode=t;
  if(t==='auto'){
    if(S.settings.autoNight){
      const h=new Date().getHours();
      const start=S.settings.autoNightStart, end=S.settings.autoNightEnd;
      const isNight = start>end ? (h>=start || h<end) : (h>=start && h<end);
      mode = isNight ? 'dark' : 'light';
    } else {
      mode=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
    }
  }
  document.documentElement.dataset.theme=mode;
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta) meta.setAttribute('content',mode==='dark'?'#0a0e15':'#1d4ed8');
  if(isNative && Cap.StatusBar){
    try{
      Cap.StatusBar.setStyle({style: mode==='dark'?'DARK':'LIGHT'});
      Cap.StatusBar.setBackgroundColor({color: mode==='dark'?'#0a0e15':'#f4f6f9'});
    }catch(e){}
  }
}
setInterval(()=>{ if(S.settings && S.settings.theme==='auto' && S.settings.autoNight) applyTheme('auto'); }, 60*1000);

View.bible=function(el){
  setTopbar({title:'Biblia',actions:[
    {icon:'search',title:'Buscar',onClick:()=>go('#/buscar')},
    {icon:'type',title:'Lectura',onClick:openReadingSettings}
  ]});
  const lr=S.settings.lastRead, ver=activeVersion();
  el.innerHTML='<div class="page">'+
    '<div style="padding:22px 0 4px"><h1 class="h1">Biblia</h1><p class="sub">'+esc(ver.name)+' · '+esc(ver.license)+'</p></div>'+
    '<button class="hero" data-continue style="margin-top:14px;width:100%;text-align:left;border:0;cursor:pointer">'+
      '<div class="hero-lbl">Continuar</div><div class="hero-ref">'+esc(refLabel(lr.book,lr.chapter,lr.verse))+'</div>'+
      '<div class="hero-btn" style="pointer-events:none">'+ic('play')+' Abrir</div></button>'+
    '<div class="section-head"><div class="h2">Ir a un pasaje</div></div>'+
    '<div class="searchbar" style="margin-bottom:14px">'+ic('search')+'<input id="refInput" placeholder="Juan 3:16, Ro 6, Sal 23…" autocomplete="off" spellcheck="false"></div>'+
    '<div class="section-head"><div class="h2">Antiguo Testamento</div></div>'+
    '<div class="card" style="padding:5px">'+BOOKS.filter(b=>b.test==='AT').map(bookRow).join('')+'</div>'+
    '<div class="section-head"><div class="h2">Nuevo Testamento</div></div>'+
    '<div class="card" style="padding:5px">'+BOOKS.filter(b=>b.test==='NT').map(bookRow).join('')+'</div>'+
    '<div style="height:20px"></div></div>';
  function bookRow(b){
    const available=!!getChapter(S.settings.versionId,b.id,1);
    return '<button class="book-item" data-book="'+b.id+'"><span style="flex:1">'+esc(b.name)+'</span>'+
      '<span class="tiny mono">'+b.chapters+'</span>'+(available?'<span class="tag" style="font-size:10px">texto</span>':'')+'</button>';
  }
  $('[data-continue]',el).onclick=()=>{ haptic('medium'); go('#/leer/'+lr.book+'/'+lr.chapter); };
  el.querySelectorAll('[data-book]').forEach(b=>b.onclick=()=>openChapterPicker(b.dataset.book));
  const ri=$('#refInput',el);
  ri.addEventListener('keydown',e=>{
    if(e.key!=='Enter') return;
    const parsed=parseRef(ri.value);
    if(parsed){ haptic('success'); go('#/leer/'+parsed.book+'/'+parsed.chapter+(parsed.verse?'/'+parsed.verse:'')); }
    else toast('No se reconoce la referencia','info');
  });
};

function parseRef(q){
  if(!q) return null;
  const s=q.trim();
  const m=s.match(/^(.+?)\s+(\d+)(?:\s*[:.\s]\s*(\d+))?$/);
  if(!m){ const b=bookByName(s); return b?{book:b.id,chapter:1}:null; }
  const b=bookByName(m[1]); if(!b) return null;
  const ch=Math.min(Math.max(1,parseInt(m[2],10)),b.chapters);
  return {book:b.id,chapter:ch,verse:m[3]?parseInt(m[3],10):null};
}

function openChapterPicker(bookId){
  const b=bookById(bookId);
  Layers.openSheet((head,body)=>{
    head.innerHTML='<div style="flex:1"><div class="h2">'+esc(b.name)+'</div><div class="tiny">'+b.chapters+' capítulos</div></div>'+
      '<button class="icon-btn" data-close>'+ic('close')+'</button>';
    body.innerHTML='<div class="chap-grid">'+Array.from({length:b.chapters},(_,i)=>{
      const n=i+1; const ok=!!getChapter(S.settings.versionId,bookId,n);
      return '<button class="chap-cell '+(ok?'':'na')+'" data-ch="'+n+'">'+n+'</button>';
    }).join('')+'</div>';
    head.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    body.querySelectorAll('[data-ch]').forEach(c=>c.onclick=()=>{ haptic('light'); Layers.closeSheet(); go('#/leer/'+bookId+'/'+c.dataset.ch); });
  });
}

View.read=function(el,route){
  const bookId=route[1], chapter=parseInt(route[2],10);
  const b=bookById(bookId);
  if(!b||!chapter){ el.innerHTML='<div class="page"><div class="empty">'+ic('info')+'<p>Pasaje no válido</p></div></div>'; return; }
  const ver=activeVersion();
  const text=getChapter(ver.id,bookId,chapter);

  const chapterWithText = (dir)=>{
    const bb = bookById(bookId);
    let n2 = chapter + dir;
    while(n2 >= 1 && n2 <= bb.chapters && !getChapter(S.settings.versionId, bookId, n2)) n2 += dir;
    return (n2 >= 1 && n2 <= bb.chapters) ? n2 : null;
  };

  setTopbar({
    title:refLabel(bookId,chapter),back:true,progress:0,
    actions:[
      _zenActive
        ? {icon:'shrink',title:'Salir modo lectura',onClick:()=>toggleZen(false)}
        : {icon:'expand',title:'Modo lectura',onClick:()=>{ toggleZen(true); toast('Modo lectura activado','book'); }},
      {icon:'columns',title:'Comparar versiones',onClick:()=>go('#/comparar/'+bookId+'/'+chapter)},
      {icon:'list',title:'Capítulos',onClick:()=>openChapterPicker(bookId)},
      {icon:'type',title:'Tipografía',onClick:openReadingSettings},
      {icon:'more',title:'Versiones',onClick:openVersionPicker}
    ]
  });

  if(!text){
    const pendingText = isBundled(ver.id) && !bundledData(ver.id) && !_bundledFailed[ver.id];
    const info = pendingText
      ? '<div class="empty" style="padding:40px 0"><div class="img-gen-spin"></div><p>Preparando '+esc(ver.name)+'…</p><small>El texto se carga mientras ves la app.</small></div>'
      : '<div class="empty" style="padding:40px 0">'+ic('wifiOff')+'<p>Sin texto para este capítulo</p><small>La versión <b>'+esc(ver.name)+'</b> sólo incluye la muestra de dominio público.</small></div>';
    el.innerHTML='<div class="reader"><div class="chapter-head"><div class="chapter-book">'+esc(b.name)+'</div><h1 class="chapter-title">Capítulo '+chapter+'</h1></div>'+
      info+
      '<div class="read-actions">'+
      (chapter>1?'<button class="btn" data-prev>'+ic('back')+' '+(chapter-1)+'</button>':'')+
      (chapter<b.chapters?'<button class="btn" data-next>'+(chapter+1)+' '+ic('fwd')+'</button>':'')+
      '</div></div>';
    const p=$('[data-prev]',el); if(p) p.onclick=()=>{ const n2=chapterWithText(-1); if(n2) go('#/leer/'+bookId+'/'+n2); };
    const n=$('[data-next]',el); if(n) n.onclick=()=>{ const n2=chapterWithText(1); if(n2) go('#/leer/'+bookId+'/'+n2); };
    if(pendingText) loadBundled(ver.id).then(()=>{ const r=currentRoute(); if(r[0]==='leer') render(); });
    return;
  }

  const notesByVerse={};
  S.notes.filter(n=>!n.deletedAt).forEach(n=>{ (n.refs||[]).forEach(r=>{ if(r.book===bookId&&r.chapter===chapter&&r.verse) notesByVerse[r.verse]=n.id; }); });
  const marksByVerse={};
  S.bookmarks.forEach(bm=>{ const m=(bm.ref||'').match(/^(\w+)\.(\d+)\.(\d+)$/); if(m&&m[1]===bookId&&+m[2]===chapter) marksByVerse[+m[3]]=true; });

  el.innerHTML='<div class="reader">'+
    '<div class="chapter-head"><div class="chapter-book">'+esc(b.name)+'</div><h1 class="chapter-title">Capítulo '+chapter+'</h1>'+
    '<div class="chapter-meta"><span class="ver-pill">'+esc(ver.abbr)+'</span><span class="ver-pill">'+text.filter(v=>typeof v==='string').length+' versículos'+(ver.sample?' · muestra':'')+'</span></div></div>'+
    '<div class="verses" id="verses">'+(()=>{let vn=0;return text.map(t=>{
      if(t && typeof t==='object' && t.h){ return '<div class="verse-heading">'+esc(t.h)+'</div>'; }
      vn++; const cvn=vn; const hl=Data.highlightOf(bookId,chapter,cvn);
      const hasNote=notesByVerse[cvn]; const hasMark=marksByVerse[cvn];
      return '<p data-v="'+cvn+'" class="'+(hl?'hl-'+hl.color:'')+'" id="v'+cvn+'">'+
        '<span class="vnum">'+cvn+'</span>'+verseToSpans(t)+
        (hasNote?'<span class="verse-note-dot"></span>':'')+
        (hasMark?'<span class="verse-mark">'+ic('bookmark')+'</span>':'')+'</p>';
    }).join('');})()+'</div>'+
    '<div class="read-actions">'+
      (chapter>1?'<button class="btn" data-prev>'+ic('back')+' Cap. '+(chapter-1)+'</button>':'')+
      (chapter<b.chapters?'<button class="btn btn-primary" data-next>Cap. '+(chapter+1)+' '+ic('fwd')+'</button>':'')+
    '</div>'+
    '<div class="divider"></div>'+
    '<div class="section-head" style="margin-top:0"><div class="h2">En este capítulo</div></div>'+
    '<div class="related-row" id="chapterRelated"></div>'+
    '<div class="section-head"><div class="h2">Relacionado</div></div>'+
    '<div id="relBlock"></div><div style="height:24px"></div></div>';

  Data.pushHistory(bookId,chapter,S.settings.lastRead.verse);
  const p=$('[data-prev]',el); if(p) p.onclick=()=>{ const n2=chapterWithText(-1); if(n2) go('#/leer/'+bookId+'/'+n2); else toast('No hay capítulos anteriores con texto','info'); };
  const n=$('[data-next]',el); if(n) n.onclick=()=>{ const n2=chapterWithText(1); if(n2) go('#/leer/'+bookId+'/'+n2); else toast('No hay más capítulos con texto','info'); };

  el.querySelectorAll('#verses p').forEach(pp=>{
    let pressTimer=null, didLong=false, tapTimer=null, tapCount=0;
    const clear=()=>{ if(pressTimer){ clearTimeout(pressTimer); pressTimer=null; } };
    pp.addEventListener('pointerdown',e=>{
      didLong=false;
      const target=e.target.closest('.w');
      if(!target) return;
      pressTimer=setTimeout(()=>{
        didLong=true; haptic('medium');
        const word=target.textContent.replace(/[.,;:¡!¿?"'()«»]/g,'').trim();
        if(word&&word.length>1){
          target.classList.add('pressing');
          setTimeout(()=>target.classList.remove('pressing'),400);
          openWordOrCreate(word);
        }
        pressTimer=null;
      },480);
    });
    const up=()=>clear();
    pp.addEventListener('pointerup',up);
    pp.addEventListener('pointercancel',up);
    pp.addEventListener('pointerleave',up);
    pp.addEventListener('click',e=>{
      if(didLong){ didLong=false; return; }
      const v=parseInt(pp.dataset.v,10);
      tapCount++;
      if(tapCount===1){
        tapTimer = setTimeout(()=>{
          tapCount = 0;
          haptic('light');
          openVerseSheet(bookId,chapter,v);
        }, 260);
      } else if(tapCount===2){
        clearTimeout(tapTimer); tapCount=0;
        haptic('medium');
        const cur = Data.highlightOf(bookId,chapter,v);
        const colors = ['1','2','3','4','5'];
        let next = '1';
        if(cur){
          const idx = colors.indexOf(cur.color);
          if(idx >= 0 && idx < colors.length-1) next = colors[idx+1];
          else next = null;
        }
        Data.toggleHighlight(bookId,chapter,v,next);
        flashSave();
        const pEl = $('#v'+v);
        if(pEl){
          pEl.className = '';
          const hl2 = Data.highlightOf(bookId,chapter,v);
          if(hl2) pEl.classList.add('hl-'+hl2.color);
          pEl.classList.add('pulse');
          setTimeout(()=>pEl.classList.remove('pulse'),1000);
        }
        toast(next ? 'Resaltado' : 'Resaltado quitado', 'highlight');
      }
    });
  });

  const scroller=$('#scroll');
  const verseEls=Array.from(el.querySelectorAll('#verses p'));
  const onScroll=()=>{
    const max=Math.max(1,scroller.scrollHeight-scroller.clientHeight);
    const pct=scroller.scrollTop/max;
    const ring=document.querySelector('.progress-ring .fg');
    if(ring){ const r=9,c=2*Math.PI*r; ring.setAttribute('stroke-dashoffset',(c*(1-pct)).toFixed(2)); }
    const mid=scroller.scrollTop+scroller.clientHeight*0.35;
    let cur=null;
    for(const v of verseEls){ if(v.offsetTop<=mid) cur=v; else break; }
    if(cur && !cur.classList.contains('current')){
      verseEls.forEach(x=>x.classList.remove('current'));
      cur.classList.add('current');
    }
  };
  scroller.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  const targetV=route[3]?parseInt(route[3],10):(S.settings.lastRead.book===bookId&&S.settings.lastRead.chapter===chapter?S.settings.lastRead.verse:null);
  if(targetV){
    setTimeout(()=>{
      const t=$('#v'+targetV,el);
      if(t){ scroller.scrollTo({top:t.offsetTop-80,behavior:'smooth'}); t.classList.add('pulse'); setTimeout(()=>t.classList.remove('pulse'),1200); }
    },240);
  }
  renderChapterRelated(bookId,chapter);
  renderRelations(bookId,chapter);
};

function verseToSpans(text){
  return esc(text).split(/(\s+)/).map(tok=>{
    if(/^\s+$/.test(tok)) return tok;
    return '<span class="w">'+tok+'</span>';
  }).join('');
}

function renderChapterRelated(bookId,chapter){
  const host=$('#chapterRelated'); if(!host) return;
  const items=[];
  const hl=S.highlights.filter(h=>h.book===bookId&&h.chapter===chapter).length;
  if(hl) items.push({icon:'highlight',text:hl+' resaltado'+(hl>1?'s':''),act:()=>{}});
  const nt=S.notes.filter(n=>!n.deletedAt&&(n.refs||[]).some(r=>r.book===bookId&&r.chapter===chapter)).length;
  if(nt) items.push({icon:'note',text:nt+' nota'+(nt>1?'s':''),act:()=>go('#/notas')});
  items.push({icon:'columns',text:'Comparar',act:()=>go('#/comparar/'+bookId+'/'+chapter)});
  items.push({icon:'inbox',text:'Para estudiar',act:()=>go('#/inbox')});
  host.innerHTML=items.map((it,i)=>'<button class="rel-chip" data-i="'+i+'">'+ic(it.icon)+esc(it.text)+'</button>').join('');
  host.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>items[parseInt(b.dataset.i,10)].act());
}
function renderRelations(bookId,chapter){
  const host=$('#relBlock'); if(!host) return;
  const ref=bookId+'.'+chapter;
  const rels=Data.relationsOf('chapter',ref);
  const words=S.words.filter(w=>(w.refs||[]).some(r=>r[0]===bookId&&r[1]===chapter)).slice(0,6);
  const docs=S.doctrines.filter(d=>(d.refs||[]).some(r=>r[0]===bookId&&r[1]===chapter)).slice(0,6);
  if(!rels.length&&!words.length&&!docs.length){
    host.innerHTML='<p class="tiny">Aún no hay conexiones con este capítulo.</p>';
    return;
  }
  host.innerHTML='<div class="related-row">'+
    docs.map(d=>'<button class="rel-chip" data-doc="'+d.id+'">'+ic('shield')+esc(d.title)+'</button>').join('')+
    words.map(w=>'<button class="rel-chip" data-word="'+w.id+'">'+ic('type')+esc(w.term)+'</button>').join('')+
    rels.map(r=>'<button class="rel-chip" data-rel="'+r.type+':'+r.id+'">'+ic('link')+esc(r.label||r.id)+'</button>').join('')+
    '</div>';
  host.querySelectorAll('[data-doc]').forEach(b=>b.onclick=()=>go('#/doctrina/'+b.dataset.doc));
  host.querySelectorAll('[data-word]').forEach(b=>b.onclick=()=>go('#/palabra/'+b.dataset.word));
  host.querySelectorAll('[data-rel]').forEach(b=>b.onclick=()=>{
    const parts=b.dataset.rel.split(':');
    openEntity(parts[0],parts[1]);
  });
}

/* Swipe global solo en lector */
(function(){
  let sx=null, sy=null, st=0, tracking=false;
  document.addEventListener('touchstart', e=>{
    const seg = currentRoute()[0]||'';
    if(seg !== 'leer'){ tracking=false; return; }
    if(e.touches.length !== 1){ tracking=false; return; }
    const t = e.target;
    if(t.closest('button, .editor-toolbar, .chip-row, .related-row, .searchbar, input, textarea, [contenteditable="true"], .sheet, .sec-panel, .bottomnav, .topbar, .img-menu')){ tracking=false; return; }
    tracking = true;
    sx = e.touches[0].clientX; sy = e.touches[0].clientY; st = Date.now();
  }, {passive:true});
  document.addEventListener('touchend', e=>{
    if(!tracking || sx===null) { tracking=false; sx=null; return; }
    const t = e.changedTouches[0];
    const dx = t.clientX - sx, dy = t.clientY - sy, dt = Date.now() - st;
    sx=null; tracking=false;
    if(dt > 700) return;
    if(Math.abs(dx) < 80) return;
    if(Math.abs(dy) > Math.abs(dx)*0.7) return;
    const r = currentRoute();
    const bookId = r[1];
    const chapter = parseInt(r[2],10);
    const bb = bookById(bookId);
    if(!bb || !chapter) return;
    const find = dir => {
      let n2 = chapter + dir;
      while(n2 >= 1 && n2 <= bb.chapters && !getChapter(S.settings.versionId, bookId, n2)) n2 += dir;
      return (n2 >= 1 && n2 <= bb.chapters) ? n2 : null;
    };
    haptic('light');
    if(dx < 0){ const n2 = find(1); if(n2) go('#/leer/'+bookId+'/'+n2); else toast('No hay más capítulos con texto','info'); }
    else { const n2 = find(-1); if(n2) go('#/leer/'+bookId+'/'+n2); else toast('No hay capítulos anteriores con texto','info'); }
  }, {passive:true});
})();

/* Edge swipe back */
(function(){
  let sx=null, sy=null, st=0, tracking=false;
  document.addEventListener('touchstart', e=>{
    if(e.touches.length !== 1) return;
    const x = e.touches[0].clientX;
    if(x > 24){ tracking=false; return; }
    const seg = currentRoute()[0]||'';
    if(seg === 'leer'){ tracking=false; return; }
    if($('#sheet').classList.contains('on') || $('#panel').classList.contains('on')){ tracking=false; return; }
    const t = e.target;
    if(t.closest('.editor-toolbar, .chip-row, .related-row, input, textarea, [contenteditable="true"]')){ tracking=false; return; }
    tracking = true;
    sx = x; sy = e.touches[0].clientY; st = Date.now();
  }, {passive:true});
  document.addEventListener('touchend', e=>{
    if(!tracking || sx===null){ tracking=false; sx=null; return; }
    const t = e.changedTouches[0];
    const dx = t.clientX - sx, dy = t.clientY - sy, dt = Date.now() - st;
    sx=null; tracking=false;
    if(dt > 700) return;
    if(dx < 90) return;
    if(Math.abs(dy) > Math.abs(dx)*0.6) return;
    haptic('light');
    if(location.hash && location.hash !== '#/' && location.hash !== ''){ history.back(); }
  }, {passive:true});
})();

async function openVerseImage(bookId, chapter, verse){
  const txt = verseText(bookId, chapter, verse);
  const ref = refLabel(bookId, chapter, verse);
  if(!txt){ toast('Sin texto para este versículo','info'); return; }

  let body = null;
  Layers.openSheet((h,b)=>{
    h.innerHTML = '<div class="h2" style="flex:1">Versículo como imagen</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    h.querySelector('[data-close]').onclick = ()=> Layers.closeSheet();
    b.innerHTML = '<div class="img-gen"><div class="img-gen-spin"></div><p class="tiny" style="margin:0">Generando imagen…</p></div>';
    body = b;
  });
  await new Promise(r=>requestAnimationFrame(()=>setTimeout(r,80)));
  const alive = ()=> !!body && $('#sheet').classList.contains('on');
  if(!alive()) return;

  let blob = null, dataUrl = '';
  try{
    const W = 1080, H = 1350;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const ctx = c.getContext('2d');

    const grad = ctx.createLinearGradient(0,0,W,H);
    grad.addColorStop(0,'#1d4ed8');
    grad.addColorStop(0.5,'#4a3ad6');
    grad.addColorStop(1,'#6a3df0');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);

    const radial = ctx.createRadialGradient(W*0.85, H*0.15, 50, W*0.85, H*0.15, 500);
    radial.addColorStop(0,'rgba(255,255,255,0.22)');
    radial.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0,0,W,H);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(ref.toUpperCase(), W/2, 130);

    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W/2-80, 200);
    ctx.lineTo(W/2+80, 200);
    ctx.stroke();

    ctx.font = '600 54px Georgia, serif';
    const maxW = W - 200;
    const words = txt.split(' ');
    const lines = [];
    let curLine = '';
    for(const w of words){
      const test = curLine ? curLine+' '+w : w;
      if(ctx.measureText(test).width > maxW){
        lines.push(curLine);
        curLine = w;
      } else curLine = test;
    }
    if(curLine) lines.push(curLine);
    const totalH = lines.length * 82;
    let y = H/2 - totalH/2 + 60;
    for(const l of lines){
      ctx.fillText(l, W/2, y);
      y += 82;
    }

    ctx.font = '500 26px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.fillText('STUDY BEREA', W/2, H - 90);
    ctx.font = '400 22px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.fillText(activeVersion().name, W/2, H - 55);

    blob = await new Promise(res => c.toBlob(b => res(b), 'image/png'));
    dataUrl = c.toDataURL('image/png');
  }catch(e){
    console.warn('Verse image', e);
    if(alive()) Layers.closeSheet();
    toast('No se pudo generar la imagen','info');
    return;
  }
  if(!alive()) return;

  body.innerHTML =
    '<img class="vi-preview" src="'+dataUrl+'" alt="versículo">'+
    '<div class="vi-actions">'+
      '<button class="btn" id="vi-save">'+ic('download')+' Guardar</button>'+
      '<button class="btn btn-primary" id="vi-share">'+ic('share')+' Compartir</button>'+
    '</div>'+
    '<p class="tiny" style="margin-top:14px;line-height:1.6">Ideal para WhatsApp, Instagram, o como fondo de pantalla.</p>';

  $('#vi-save',body).onclick = async ()=>{
    await downloadBlob('versiculo-' + bookId + '-' + chapter + '-' + verse + '.png', blob);
    Layers.closeSheet();
  };
  $('#vi-share',body).onclick = async ()=>{
    if(isNative && Cap.Filesystem && Cap.Share){
      try{
        const b64 = dataUrl.split(',')[1];
        const w = await Cap.Filesystem.writeFile({
          path: 'versiculo-' + bookId + '-' + chapter + '-' + verse + '.png',
          data: b64,
          directory: 'CACHE'
        });
        await Cap.Share.share({ title: ref, text: txt+' — '+ref, url: w.uri, dialogTitle: 'Compartir versículo' });
        Layers.closeSheet();
        return;
      }catch(e){ console.warn(e); }
    }
    if(navigator.share && navigator.canShare){
      try{
        const file = new File([blob], 'versiculo.png', { type: 'image/png' });
        if(navigator.canShare({ files:[file] })){
          await navigator.share({ files:[file], title: ref, text: txt+' — '+ref });
          Layers.closeSheet();
          return;
        }
      }catch(e){}
    }
    await downloadBlob('versiculo-' + bookId + '-' + chapter + '-' + verse + '.png', blob);
    Layers.closeSheet();
  };
}

function compareIds(ids, savedA, savedB){
  const a = ids.indexOf(savedA)>=0 ? savedA : ids[0];
  let b = ids.indexOf(savedB)>=0 ? savedB : ids[1];
  if(!b || b===a) b = ids.find(x=>x!==a) || a;
  return [a,b];
}
function compareSwap(col,idA,idB,pickId){
  if(col==='A') return [pickId, idB===pickId?idA:idB];
  return [idA===pickId?idB:idA, pickId];
}
View.compare = function(el, route){
  const bookId = route[1];
  const chapter = parseInt(route[2],10);
  const b = bookById(bookId);
  if(!b || !chapter){ el.innerHTML='<div class="page"><div class="empty">'+ic('info')+'<p>Pasaje no válido</p></div></div>'; return; }
  setTopbar({ title:'Comparar · '+refLabel(bookId,chapter), back:true, actions:[] });

  const vs = (S.versions||[]).filter(v => !!getChapter(v.id, bookId, chapter) || isBundled(v.id));
  if(vs.length < 2){
    el.innerHTML = '<div class="page">'+
      '<div class="empty">'+ic('columns')+'<p>Se necesitan al menos 2 versiones con texto</p>'+
      '<small>Importa o añade otra versión que contenga este capítulo para comparar.</small></div>'+
      '<div style="text-align:center;margin-top:18px"><button class="btn btn-primary" id="gotoVer">Gestionar versiones</button></div>'+
      '</div>';
    const gv = $('#gotoVer', el);
    if(gv) gv.onclick = ()=> go('#/admin/versiones');
    return;
  }
  const ids = vs.map(v=>v.id);
  const sel = compareIds(ids, S.settings.compareA, S.settings.compareB);
  let idA = sel[0], idB = sel[1];
  ensureVersions([idA,idB],'Preparando comparación…').then(loaded=>{ if(loaded) render(); });
  const vA = vs.find(v=>v.id===idA), vB = vs.find(v=>v.id===idB);
  const pick = (col,id)=>{
    const r = compareSwap(col,idA,idB,id);
    idA = r[0]; idB = r[1];
    S.settings.compareA = idA; S.settings.compareB = idB;
    save('settings'); haptic('light');
    ensureVersions([id]).then(()=>render());
    render();
  };
  const openPicker = col=>{
    const cur = col==='A' ? vA : vB;
    Layers.openSheet((head,body)=>{
      head.innerHTML='<div class="h2" style="flex:1">Elegir versión</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
      body.innerHTML='<div class="list">'+vs.map(v=>
        '<button class="row" data-v="'+v.id+'"><div class="row-ic">'+ic('book')+'</div>'+
        '<div class="row-main"><div class="row-t">'+esc(v.name)+'</div>'+
        '<div class="row-s">'+esc(v.abbr)+'</div></div>'+
        (v.id===cur.id?ic('check','row-x'):'')+'</button>').join('')+'</div>';
      head.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
      body.querySelectorAll('[data-v]').forEach(n=>n.onclick=()=>{ Layers.closeSheet(); pick(col,n.dataset.v); });
    });
  };
  function prep(arr){const o=[];let n=0;for(const it of arr){if(it&&typeof it==='object'&&it.h){o.push({h:it.h});}else{n++;o.push({v:n,t:it});}}return o;}
  const tA = prep(getChapter(vA.id, bookId, chapter) || []);
  const tB = prep(getChapter(vB.id, bookId, chapter) || []);
  const maxV = Math.max(tA.length, tB.length);

  el.innerHTML = '<div class="page">'+
    '<div style="padding:18px 0 6px"><div class="tiny" style="font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)">Comparar</div>'+
    '<h1 class="h1" style="margin-top:6px">'+esc(b.name)+' '+chapter+'</h1></div>'+
    '<div class="compare-grid">'+
      '<div class="compare-col"><div class="ver" data-col="A">'+esc(vA.abbr)+ic('chev')+'</div><div class="txt" id="colA"></div></div>'+
      '<div class="compare-col"><div class="ver" data-col="B">'+esc(vB.abbr)+ic('chev')+'</div><div class="txt" id="colB"></div></div>'+
    '</div><div style="height:24px"></div></div>';

  $$('.ver[data-col]', el).forEach(hd=>hd.onclick=()=>openPicker(hd.dataset.col));
  const colA = $('#colA', el), colB = $('#colB', el);
  for(let i=0;i<maxV;i++){
    const a=tA[i], b=tB[i];
    if(a){ if(a.h) colA.innerHTML += '<div class="verse-heading">'+esc(a.h)+'</div>';
           else   colA.innerHTML += '<p style="margin:0 0 .6em"><sup style="font-family:var(--font-ui);font-size:.62em;font-weight:750;color:var(--text-3);margin-right:.35em">'+a.v+'</sup>'+esc(a.t)+'</p>'; }
    if(b){ if(b.h) colB.innerHTML += '<div class="verse-heading">'+esc(b.h)+'</div>';
           else   colB.innerHTML += '<p style="margin:0 0 .6em"><sup style="font-family:var(--font-ui);font-size:.62em;font-weight:750;color:var(--text-3);margin-right:.35em">'+b.v+'</sup>'+esc(b.t)+'</p>'; }
  }
};

function openVerseSheet(bookId,chapter,verse){
  const txt=verseText(bookId,chapter,verse);
  const ref=refLabel(bookId,chapter,verse);
  const hl=Data.highlightOf(bookId,chapter,verse);
  const isFav=Data.isFavorite('verse',bookId+'.'+chapter+'.'+verse);
  const isBm=Data.isBookmark(bookId+'.'+chapter+'.'+verse);

  Layers.openSheet((head,body)=>{
    head.innerHTML='<div style="flex:1"><div class="sheet-ref">'+esc(ref)+'</div></div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    body.innerHTML='<div class="sheet-quote">'+esc(txt)+'</div>'+
      '<div class="act-grid" style="margin-bottom:16px">'+
        '<button class="act" data-a="note">'+ic('note')+'Nota</button>'+
        '<button class="act" data-a="study">'+ic('layers')+'Estudio</button>'+
        '<button class="act" data-a="inbox">'+ic('inbox')+'Después</button>'+
        '<button class="act" data-a="word">'+ic('type')+'Palabra</button>'+
        '<button class="act" data-a="image">'+ic('image')+'Imagen</button>'+
        '<button class="act" data-a="link">'+ic('link')+'Relacionar</button>'+
        '<button class="act '+(isFav?'on':'')+'" data-a="fav">'+ic('star')+'Favorito</button>'+
        '<button class="act '+(isBm?'on':'')+'" data-a="bm">'+ic('bookmark')+'Marcador</button>'+
        '<button class="act" data-a="copy">'+ic('copy')+'Copiar</button>'+
        '<button class="act" data-a="share">'+ic('share')+'Compartir</button>'+
      '</div>'+
      '<div class="tiny" style="font-weight:700;letter-spacing:.07em;text-transform:uppercase;margin-bottom:10px">Resaltar</div>'+
      '<div class="color-row" style="margin-bottom:20px">'+
        ['1','2','3','4','5'].map(c=>'<button class="color-dot '+(hl&&hl.color===c?'on':'')+'" data-color="'+c+'" style="background:'+colorCss(c)+'"></button>').join('')+
        (hl?'<button class="btn btn-sm btn-danger" data-clear-hl style="margin-left:auto">'+ic('trash')+' Quitar</button>':'')+
      '</div>'+
      '<div class="tiny" style="font-weight:700;letter-spacing:.07em;text-transform:uppercase;margin-bottom:10px">Leer en</div>'+
      '<div class="chip-row">'+(S.versions||[]).map(v=>'<button class="chip chip-tap '+(v.id===S.settings.versionId?'active':'')+'" data-ver="'+v.id+'">'+esc(v.abbr)+'</button>').join('')+'</div>'+
      '<div style="margin-top:14px"><button class="btn btn-block" data-a="compare">'+ic('columns')+' Comparar versiones</button></div>';

    head.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    body.querySelectorAll('[data-color]').forEach(b=>b.onclick=()=>{
      Data.toggleHighlight(bookId,chapter,verse,b.dataset.color);
      haptic('medium'); Layers.closeSheet(); flashSave(); toast('Resaltado aplicado','highlight'); render();
      setTimeout(()=>{ const v=$('#v'+verse); if(v){ v.classList.add('pulse'); setTimeout(()=>v.classList.remove('pulse'),1000); } },60);
    });
    const ch=body.querySelector('[data-clear-hl]');
    if(ch) ch.onclick=()=>{ Data.toggleHighlight(bookId,chapter,verse,null); haptic('light'); Layers.closeSheet(); flashSave(); toast('Resaltado eliminado','trash'); render(); };
    body.querySelectorAll('[data-ver]').forEach(b=>b.onclick=()=>{
      S.settings.versionId=b.dataset.ver; save('settings'); haptic('light'); Layers.closeSheet(); toast('Versión: '+activeVersion().abbr,'refresh');
      ensureVersions([b.dataset.ver]).then(()=>render());
    });
    body.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{ handleVerseAction(b.dataset.a,bookId,chapter,verse,txt,ref); });
  });
}
function colorCss(c){ return {'1':'#ffd43b','2':'#69db7c','3':'#74c0fc','4':'#ff9ec4','5':'#b197fc'}[c]||'#ffd43b'; }

async function handleVerseAction(action,bookId,chapter,verse,txt,ref){
  const vref=bookId+'.'+chapter+'.'+verse;
  switch(action){
    case 'note':{
      Layers.closeSheet();
      const n=Data.createNote({title:'',content:'<blockquote>'+esc(txt)+'</blockquote><p></p>',refs:[{book:bookId,chapter,verse}]});
      haptic('success'); go('#/nota/'+n.id); toast('Nota creada','note');
      break;
    }
    case 'study':{
      Layers.closeSheet();
      const list=S.studies.filter(s=>!s.deletedAt);
      Layers.openSheet((h,b)=>{
        h.innerHTML='<div class="h2" style="flex:1">Insertar en estudio</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
        b.innerHTML='<button class="btn btn-primary btn-block" style="margin-bottom:14px" data-new>'+ic('plus')+' Nuevo estudio</button>'+
          (list.length?'<div class="list">'+list.map(s=>'<button class="row" data-s="'+s.id+'"><div class="row-ic">'+ic('layers')+'</div>'+
            '<div class="row-main"><div class="row-t">'+esc(s.title||'Estudio sin título')+'</div><div class="row-s">'+fmtDate(s.updatedAt)+'</div></div></button>').join('')+'</div>':'<p class="tiny">Todavía no tienes estudios.</p>');
        h.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
        b.querySelector('[data-new]').onclick=async()=>{
          const t=await askText({title:'Nuevo estudio',label:'Título',placeholder:'Ej. La muerte al pecado'});
          if(!t) return;
          const s=Data.createStudy({title:t,blocks:[verseBlock(bookId,chapter,verse,txt)]});
          haptic('success'); Layers.closeSheet(); go('#/estudio/'+s.id); toast('Estudio creado','layers');
        };
        b.querySelectorAll('[data-s]').forEach(el=>el.onclick=()=>{
          const s=Data.getStudy(el.dataset.s);
          s.blocks=s.blocks||[];
          s.blocks.push(verseBlock(bookId,chapter,verse,txt));
          s.updatedAt=Date.now(); save('studies');
          haptic('success'); Layers.closeSheet(); toast('Versículo insertado','check');
        });
      });
      break;
    }
    case 'inbox':{
      Data.addInbox({kind:'verse',title:ref,subtitle:'Versículo guardado',book:bookId,chapter,verse,text:txt});
      haptic('success'); Layers.closeSheet(); flashSave(); toast('Guardado','inbox'); renderNav();
      break;
    }
    case 'word':{ Layers.closeSheet(); setTimeout(()=>openWordStudyFromVerse(bookId,chapter,verse,txt),120); break; }
    case 'image':{ Layers.closeSheet(); setTimeout(()=>openVerseImage(bookId,chapter,verse),120); break; }
    case 'link':{ Layers.closeSheet(); setTimeout(()=>openRelateDialog('verse',vref,ref),120); break; }
    case 'compare':{ Layers.closeSheet(); go('#/comparar/'+bookId+'/'+chapter); break; }
    case 'fav':{
      const on=Data.toggleFavorite('verse',vref,ref);
      haptic(on?'success':'light'); toast(on?'Añadido a favoritos':'Quitado','star'); Layers.closeSheet(); flashSave(); render();
      break;
    }
    case 'bm':{
      const on=Data.toggleBookmark(vref,ref,{book:bookId,chapter,verse});
      haptic(on?'success':'light'); toast(on?'Marcador guardado':'Marcador eliminado','bookmark'); Layers.closeSheet(); flashSave(); render();
      break;
    }
    case 'copy':{ await copyText('"'+txt+'" — '+ref); haptic('success'); toast('Copiado','copy'); Layers.closeSheet(); break; }
    case 'share':{
      const payload='"'+txt+'"\n— '+ref;
      if(isNative && Cap.Share){
        try{ await Cap.Share.share({title:ref,text:payload,dialogTitle:'Compartir versículo'}); haptic('success'); }
        catch(e){}
      } else if(navigator.share){
        try{ await navigator.share({title:ref,text:payload}); haptic('success'); }catch(e){}
      } else { await copyText(payload); haptic('success'); toast('Copiado','share'); }
      Layers.closeSheet();
      break;
    }
  }
}
function verseBlock(bookId,chapter,verse,txt){
  return {type:'verse',book:bookId,chapter,verse,html:'<span class="ve-ref">'+esc(refLabel(bookId,chapter,verse))+'</span>'+esc(txt)};
}

async function openWordStudyFromVerse(bookId,chapter,verse,txt){
  const words=txt.replace(/[.,;:¡!¿?"'()«»]/g,'').split(/\s+/).filter(w=>w.length>2);
  const sel=await pickFromList('Estudiar palabra','Selecciona una palabra del versículo',words,txt);
  if(!sel) return;
  openWordOrCreate(sel.trim());
}
function pickFromList(title,sub,items,context){
  return new Promise(resolve=>{
    Layers.openSheet((h,b)=>{
      h.innerHTML='<div style="flex:1"><div class="h2">'+esc(title)+'</div><div class="tiny">'+esc(sub)+'</div></div><button class="icon-btn" data-close>'+ic('close')+'</button>';
      b.innerHTML=(context?'<div class="sheet-quote">'+esc(context)+'</div>':'')+
        '<div class="field"><label>O escribe una expresión</label><input class="input" id="wq" placeholder="Ej. vino nuevo, gracia…"></div>'+
        '<button class="btn btn-primary btn-block" id="wok" style="margin-bottom:18px">Estudiar</button>'+
        '<div class="chip-row" style="flex-wrap:wrap;overflow:visible">'+items.map(w=>'<button class="chip chip-tap" data-w="'+esc(w)+'">'+esc(w)+'</button>').join('')+'</div>';
      const done=v=>{ Layers.closeSheet(); resolve(v); };
      h.querySelector('[data-close]').onclick=()=>done(null);
      b.querySelector('#wok').onclick=()=>done(b.querySelector('#wq').value.trim()||null);
      b.querySelectorAll('[data-w]').forEach(el=>el.onclick=()=>done(el.dataset.w));
      b.querySelector('#wq').addEventListener('keydown',e=>{ if(e.key==='Enter') done(e.target.value.trim()||null); });
    });
  });
}
function openWordOrCreate(term){
  const found=S.words.find(w=>norm(w.term)===norm(term))||S.words.find(w=>fuzzyMatch(w.term,term));
  if(found){ go('#/palabra/'+found.id); return; }
  Layers.openSheet((h,b)=>{
    h.innerHTML='<div class="h2" style="flex:1">Palabra no registrada</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    b.innerHTML='<div class="sheet-quote">«'+esc(term)+'» todavía no está en tu léxico.</div>'+
      '<button class="btn btn-primary btn-block" style="margin-bottom:10px" id="mk">'+ic('plus')+' Crear ficha de «'+esc(term)+'»</button>'+
      '<button class="btn btn-block" id="cc">'+ic('search')+' Ver en la concordancia</button>';
    h.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    b.querySelector('#mk').onclick=()=>{
      const w={id:uid(),term,strong:'',origin:'',meaning:'',context:'',synonyms:'',refs:[],createdAt:Date.now()};
      S.words.push(w); save('words'); haptic('success'); Layers.closeSheet(); go('#/palabra/'+w.id); toast('Ficha creada','check');
    };
    b.querySelector('#cc').onclick=()=>{ Layers.closeSheet(); go('#/buscar?q='+encodeURIComponent(term)+'&tab=biblia'); };
  });
}

function openReadingSettings(){
  Layers.openSheet((h,b)=>{
    h.innerHTML='<div class="h2" style="flex:1">Lectura</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    const s=S.settings;
    b.innerHTML='<div class="field"><label>Tamaño — '+s.readSize+'px</label><input type="range" min="15" max="28" step="1" value="'+s.readSize+'" id="sz" style="width:100%"></div>'+
      '<div class="field"><label>Interlineado — '+s.readLh+'</label><input type="range" min="1.4" max="2.2" step="0.02" value="'+s.readLh+'" id="lh" style="width:100%"></div>'+
      '<div class="field"><label>Tipografía</label><div class="chip-row">'+
        '<button class="chip chip-tap '+(s.readFont==='serif'?'active':'')+'" data-font="serif">Serif</button>'+
        '<button class="chip chip-tap '+(s.readFont==='sans'?'active':'')+'" data-font="sans">Sans</button>'+
      '</div></div>'+
      '<div class="divider"></div>'+
      '<div class="switch"><div><div class="switch-txt">Modo nocturno automático</div><div class="switch-sub">Cambia a oscuro según la hora</div></div>'+
      '<div class="tgl '+(s.autoNight?'on':'')+'" id="anTgl"></div></div>'+
      '<div id="anRange" style="display:'+(s.autoNight?'block':'none')+'">'+
        '<div class="field" style="margin-top:12px"><label>Desde las '+s.autoNightStart+':00</label><input type="range" min="0" max="23" value="'+s.autoNightStart+'" id="anS" style="width:100%"></div>'+
        '<div class="field"><label>Hasta las '+s.autoNightEnd+':00</label><input type="range" min="0" max="23" value="'+s.autoNightEnd+'" id="anE" style="width:100%"></div>'+
      '</div>'+
      '<div class="divider"></div><div class="card" style="box-shadow:none"><div class="verse-embed" id="preview" style="margin:0">'+
      '<span class="ve-ref">Juan 3:16</span>Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito…</div></div>';
    h.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    const apply=()=>{
      document.documentElement.style.setProperty('--read-size',S.settings.readSize+'px');
      document.documentElement.style.setProperty('--read-lh',S.settings.readLh);
      const v=$('#preview',b);
      if(v){ v.style.fontSize=S.settings.readSize+'px'; v.style.lineHeight=S.settings.readLh;
        v.style.fontFamily=S.settings.readFont==='sans'?'var(--font-ui)':'var(--font-read)'; }
    };
    b.querySelector('#sz').oninput=e=>{ S.settings.readSize=+e.target.value; e.target.previousElementSibling.textContent='Tamaño — '+e.target.value+'px'; apply(); };
    b.querySelector('#lh').oninput=e=>{ S.settings.readLh=+e.target.value; e.target.previousElementSibling.textContent='Interlineado — '+e.target.value; apply(); };
    b.querySelectorAll('[data-font]').forEach(el=>el.onclick=()=>{
      S.settings.readFont=el.dataset.font; save('settings');
      b.querySelectorAll('[data-font]').forEach(x=>x.classList.toggle('active',x===el)); apply();
    });
    b.querySelector('#anTgl').onclick=()=>{
      S.settings.autoNight=!S.settings.autoNight;
      b.querySelector('#anTgl').classList.toggle('on', S.settings.autoNight);
      b.querySelector('#anRange').style.display = S.settings.autoNight?'block':'none';
      save('settings'); applyTheme(S.settings.theme);
    };
    const anS = b.querySelector('#anS'), anE = b.querySelector('#anE');
    if(anS) anS.oninput = e=>{ S.settings.autoNightStart=+e.target.value; e.target.previousElementSibling.textContent='Desde las '+e.target.value+':00'; save('settings'); applyTheme(S.settings.theme); };
    if(anE) anE.oninput = e=>{ S.settings.autoNightEnd=+e.target.value; e.target.previousElementSibling.textContent='Hasta las '+e.target.value+':00'; save('settings'); applyTheme(S.settings.theme); };
    apply();
    b.addEventListener('input',debounce(()=>{ save('settings'); flashSave(); },500));
  });
}

function openVersionPicker(){
  Layers.openSheet((h,b)=>{
    h.innerHTML='<div class="h2" style="flex:1">Versiones bíblicas</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    b.innerHTML='<div class="list" style="margin-bottom:18px">'+(S.versions||[]).map(v=>
      '<button class="ver-item '+(v.id===S.settings.versionId?'on':'')+'" data-v="'+v.id+'">'+
      '<div class="row-ic">'+ic('book')+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(v.name)+'</div>'+
      '<div class="row-s">'+esc(v.license)+' · '+esc(v.lang)+(v.sample?' · muestra':'')+'</div></div></button>').join('')+'</div>'+
      '<div class="card" style="box-shadow:none;background:var(--bg-sunken)"><div class="tiny" style="line-height:1.7">'+
      'Cada traducción conserva su licencia. Study Berea no incluye texto con derechos de autor.</div></div>';
    h.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    b.querySelectorAll('[data-v]').forEach(el=>el.onclick=()=>{
      S.settings.versionId=el.dataset.v; save('settings'); haptic('light'); Layers.closeSheet(); toast('Versión: '+activeVersion().abbr,'refresh');
      ensureVersions([el.dataset.v]).then(()=>render());
    });
  });
}

View.explore=function(el){
  setTopbar({title:'Explorar',actions:[{icon:'search',title:'Buscar',onClick:()=>go('#/buscar')}]});
  const params=new URLSearchParams((location.hash.split('?')[1]||''));
  const q=params.get('q')||'';
  const words=S.words.filter(w=>!q||fuzzyMatch(w.term+' '+w.meaning,q));
  const items=S.explore.filter(x=>!q||fuzzyMatch(x.title+' '+x.body,q));
  el.innerHTML='<div class="page">'+
    '<div style="padding:22px 0 4px"><h1 class="h1">Explorar</h1><p class="sub">Una enciclopedia breve y curada.</p></div>'+
    '<div class="searchbar" style="margin-top:16px">'+ic('search')+'<input id="exq" placeholder="Buscar…" value="'+esc(q)+'"></div>'+
    '<div class="section-head"><div class="h2">Palabras bíblicas</div><span class="tiny">'+words.length+'</span></div>'+
    '<div class="list">'+(words.length?words.map(w=>'<button class="row" data-word="'+w.id+'"><div class="row-ic">'+ic('type')+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(w.term)+'</div><div class="row-s">'+esc(w.strong||w.meaning.slice(0,64))+'</div></div>'+
      ic('chev','row-x')+'</button>').join(''):'<p class="tiny" style="padding:8px 14px">Sin resultados.</p>')+'</div>'+
    '<div class="section-head"><div class="h2">Conceptos y entradas</div><span class="tiny">'+items.length+'</span></div>'+
    '<div class="list">'+(items.length?items.map(x=>'<button class="row" data-exp="'+x.id+'"><div class="row-ic">'+ic(x.type==='Personaje'?'user':x.type==='Lugar'?'compass':x.type==='Libro'?'book':'sparkle')+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(x.title)+'</div><div class="row-s">'+esc(x.type)+' · '+esc(x.body.slice(0,54))+'…</div></div>'+
      ic('chev','row-x')+'</button>').join(''):'<p class="tiny" style="padding:8px 14px">Sin resultados.</p>')+'</div>'+
    '<div style="height:20px"></div></div>';
  const qi=$('#exq',el);
  qi.addEventListener('input',debounce(()=>{
    const v=qi.value;
    location.replace('#/explorar'+(v?'?q='+encodeURIComponent(v):''));
    render();
    setTimeout(()=>{ const n=$('#exq'); if(n){ n.focus(); n.setSelectionRange(v.length,v.length); } },10);
  },280));
  el.querySelectorAll('[data-word]').forEach(b=>b.onclick=()=>go('#/palabra/'+b.dataset.word));
  el.querySelectorAll('[data-exp]').forEach(b=>b.onclick=()=>go('#/entrada/'+b.dataset.exp));
};

View.word=function(el,route){
  const w=S.words.find(x=>x.id===route[1]);
  if(!w){ el.innerHTML='<div class="page"><div class="empty">'+ic('info')+'<p>Palabra no encontrada</p></div></div>'; return; }
  setTopbar({title:w.term,back:true,actions:[
    {icon:'star',title:'Favorito',onClick:()=>{ const on=Data.toggleFavorite('word',w.id,w.term); haptic(on?'success':'light'); toast(on?'Añadido a favoritos':'Quitado','star'); }},
    {icon:'link',title:'Relacionar',onClick:()=>openRelateDialog('word',w.id,w.term)},
    {icon:'more',title:'Editar',onClick:()=>openWordEditor(w)}
  ]});
  const relations=Data.relationsOf('word',w.id);
  el.innerHTML='<div class="page">'+
    '<div style="padding:20px 0 6px"><div class="tiny" style="font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)">Palabra</div>'+
    '<h1 class="h1" style="margin-top:6px">'+esc(w.term)+'</h1>'+(w.strong?'<p class="sub mono">'+esc(w.strong)+'</p>':'')+'</div>'+
    (w.meaning?'<div class="card" style="margin-top:16px"><div class="h3" style="margin-bottom:8px">Significado</div><p class="sub" style="line-height:1.7;color:var(--text)">'+esc(w.meaning)+'</p></div>':'')+
    (w.origin?'<div class="section-head"><div class="h2">Origen</div></div><p class="sub" style="line-height:1.72;color:var(--text)">'+esc(w.origin)+'</p>':'')+
    (w.context?'<div class="section-head"><div class="h2">Contexto</div></div><p class="sub" style="line-height:1.72;color:var(--text)">'+esc(w.context)+'</p>':'')+
    (w.synonyms?'<div class="section-head"><div class="h2">Sinónimos</div></div><p class="sub" style="color:var(--text)">'+esc(w.synonyms)+'</p>':'')+
    ((w.refs||[]).length?'<div class="section-head"><div class="h2">Usos bíblicos</div></div><div class="list">'+w.refs.map(r=>
      '<button class="row" data-ref="'+r[0]+'/'+r[1]+'/'+(r[2]||'')+'"><div class="row-ic">'+ic('book')+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(refLabel(r[0],r[1],r[2]))+'</div>'+
      '<div class="row-s" style="white-space:normal">'+esc(verseText(r[0],r[1],r[2])||'—')+'</div></div></button>').join('')+'</div>':'')+
    '<div class="section-head"><div class="h2">Relacionado</div><button class="link-btn" data-add-rel>'+ic('plus')+' Conectar</button></div><div id="relBox"></div>'+
    '<div style="height:24px"></div></div>';
  el.querySelectorAll('[data-ref]').forEach(b=>b.onclick=()=>{
    const p=b.dataset.ref.split('/');
    go('#/leer/'+p[0]+'/'+p[1]+(p[2]?'/'+p[2]:''));
  });
  el.querySelector('[data-add-rel]').onclick=()=>openRelateDialog('word',w.id,w.term);
  const box=$('#relBox',el);
  box.innerHTML=relations.length?'<div class="related-row">'+relations.map(r=>
    '<button class="rel-chip" data-r="'+r.type+':'+r.id+'">'+ic('link')+esc(r.label||r.id)+'</button>').join('')+'</div>':'<p class="tiny">Sin conexiones todavía.</p>';
  box.querySelectorAll('[data-r]').forEach(b=>{
    const p=b.dataset.r.split(':');
    b.onclick=()=>openEntity(p[0],p[1]);
  });
};

function openWordEditor(w){
  Layers.openSheet((h,b)=>{
    h.innerHTML='<div class="h2" style="flex:1">Editar ficha</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    b.innerHTML='<div class="field"><label>Término</label><input class="input" id="f-term" value="'+esc(w.term)+'"></div>'+
      '<div class="field"><label>Transliteración</label><input class="input" id="f-strong" value="'+esc(w.strong||'')+'"></div>'+
      '<div class="field"><label>Origen</label><input class="input" id="f-origin" value="'+esc(w.origin||'')+'"></div>'+
      '<div class="field"><label>Significado</label><textarea class="textarea" id="f-meaning">'+esc(w.meaning||'')+'</textarea></div>'+
      '<div class="field"><label>Contexto</label><textarea class="textarea" id="f-context">'+esc(w.context||'')+'</textarea></div>'+
      '<div class="field"><label>Sinónimos</label><input class="input" id="f-syn" value="'+esc(w.synonyms||'')+'"></div>'+
      '<div class="field"><label>Referencias (jhn 3:16)</label><textarea class="textarea" id="f-refs">'+(w.refs||[]).map(r=>r[0]+' '+r[1]+(r[2]?':'+r[2]:'')).join('\n')+'</textarea></div>'+
      '<div style="display:flex;gap:10px"><button class="btn btn-block" data-close2>Cancelar</button><button class="btn btn-primary btn-block" id="save">Guardar</button></div>';
    h.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    b.querySelector('[data-close2]').onclick=()=>Layers.closeSheet();
    b.querySelector('#save').onclick=()=>{
      w.term=b.querySelector('#f-term').value.trim()||w.term;
      w.strong=b.querySelector('#f-strong').value.trim();
      w.origin=b.querySelector('#f-origin').value.trim();
      w.meaning=b.querySelector('#f-meaning').value.trim();
      w.context=b.querySelector('#f-context').value.trim();
      w.synonyms=b.querySelector('#f-syn').value.trim();
      w.refs=b.querySelector('#f-refs').value.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{
        const m=l.match(/^(\S+)\s+(\d+)(?::(\d+))?$/); if(!m) return null;
        const bk=bookByName(m[1]);
        return bk?[bk.id,parseInt(m[2],10),m[3]?parseInt(m[3],10):null]:null;
      }).filter(Boolean);
      save('words'); haptic('success'); Layers.closeSheet(); flashSave(); render(); toast('Ficha actualizada','check');
    };
  });
}

View.exploreEntry=function(el,route){
  const x=S.explore.find(e=>e.id===route[1]);
  if(!x){ el.innerHTML='<div class="page"><div class="empty">'+ic('info')+'<p>Entrada no encontrada</p></div></div>'; return; }
  setTopbar({title:x.title,back:true,actions:[
    {icon:'star',title:'Favorito',onClick:()=>{ const on=Data.toggleFavorite('explore',x.id,x.title); haptic(on?'success':'light'); toast(on?'Añadido':'Quitado','star'); }},
    {icon:'link',title:'Relacionar',onClick:()=>openRelateDialog('explore',x.id,x.title)}
  ]});
  el.innerHTML='<div class="page">'+
    '<div style="padding:20px 0 6px"><div class="tiny" style="font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)">'+esc(x.type)+'</div>'+
    '<h1 class="h1" style="margin-top:6px">'+esc(x.title)+'</h1></div>'+
    '<p style="line-height:1.75;font-size:15.5px;margin-top:14px">'+esc(x.body)+'</p>'+
    ((x.refs||[]).length?'<div class="section-head"><div class="h2">Pasajes</div></div><div class="list">'+x.refs.map(r=>
      '<button class="row" data-ref="'+r[0]+'/'+r[1]+'/'+(r[2]||'')+'"><div class="row-ic">'+ic('book')+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(refLabel(r[0],r[1],r[2]))+'</div>'+
      '<div class="row-s" style="white-space:normal">'+esc(verseText(r[0],r[1],r[2])||'—')+'</div></div></button>').join('')+'</div>':'')+
    '<div style="height:24px"></div></div>';
  el.querySelectorAll('[data-ref]').forEach(b=>b.onclick=()=>{
    const p=b.dataset.ref.split('/');
    go('#/leer/'+p[0]+'/'+p[1]+(p[2]?'/'+p[2]:''));
  });
};

View.doctrine=function(el){
  setTopbar({title:'Doctrina',actions:[
    {icon:'plus',title:'Nueva',onClick:async()=>{
      const t=await askText({title:'Nueva entrada',label:'Título'});
      if(!t) return;
      const d={id:uid(),title:t,summary:'',official:'',officialSource:'',refs:[],createdAt:Date.now()};
      S.doctrines.push(d); save('doctrines'); go('#/doctrina/'+d.id);
    }}
  ]});
  el.innerHTML='<div class="page">'+
    '<div style="padding:22px 0 4px"><h1 class="h1">Doctrina</h1><p class="sub">Contenido oficial y estudios personales, claramente separados.</p></div>'+
    '<div class="card" style="margin-top:16px;background:var(--bg-sunken);box-shadow:none"><div class="tiny" style="line-height:1.7">'+
    'El bloque <b>Oficial</b> sólo contiene lo que tú introduzcas desde una fuente verificada.</div></div>'+
    '<div class="section-head"><div class="h2">Entradas</div><span class="tiny">'+S.doctrines.length+'</span></div>'+
    '<div class="list">'+S.doctrines.map(d=>{
      const mine=S.studies.filter(s=>!s.deletedAt&&(s.links||[]).some(l=>l.type==='doctrine'&&l.id===d.id)).length;
      return '<button class="row" data-d="'+d.id+'"><div class="row-ic">'+ic('shield')+'</div>'+
        '<div class="row-main"><div class="row-t">'+esc(d.title)+'</div>'+
        '<div class="row-s">'+(d.official?'Con contenido oficial':'Sin contenido oficial')+(mine?' · '+mine+' estudio'+(mine>1?'s':'')+' tuyo'+(mine>1?'s':''):'')+'</div></div>'+
        ic('chev','row-x')+'</button>';
    }).join('')+'</div><div style="height:20px"></div></div>';
  el.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>go('#/doctrina/'+b.dataset.d));
};

View.doctrineEntry=function(el,route){
  const d=S.doctrines.find(x=>x.id===route[1]);
  if(!d){ el.innerHTML='<div class="page"><div class="empty">'+ic('info')+'<p>No encontrada</p></div></div>'; return; }
  const myStudies=S.studies.filter(s=>!s.deletedAt&&(s.links||[]).some(l=>l.type==='doctrine'&&l.id===d.id));
  const rels=Data.relationsOf('doctrine',d.id);
  setTopbar({title:d.title,back:true,actions:[
    {icon:'plus',title:'Nuevo estudio',onClick:()=>{
      const s=Data.createStudy({title:'Estudio: '+d.title,links:[{type:'doctrine',id:d.id,label:d.title}]});
      go('#/estudio/'+s.id);
    }},
    {icon:'more',title:'Editar',onClick:()=>openDoctrineEditor(d)}
  ]});
  el.innerHTML='<div class="page">'+
    '<div style="padding:20px 0 6px"><div class="tiny" style="font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)">Doctrina</div>'+
    '<h1 class="h1" style="margin-top:6px">'+esc(d.title)+'</h1>'+(d.summary?'<p class="sub" style="margin-top:8px">'+esc(d.summary)+'</p>':'')+'</div>'+
    '<div class="section-head"><div class="h2">Contenido oficial</div></div>'+
    (d.official?'<div class="card"><p style="line-height:1.75;margin:0;font-size:15px">'+esc(d.official).replace(/\n/g,'<br>')+'</p>'+
      (d.officialSource?'<div class="tiny" style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border-soft)">Fuente: '+esc(d.officialSource)+'</div>':'')+'</div>'
      :'<div class="card" style="background:var(--bg-sunken);box-shadow:none;border-style:dashed"><p class="tiny" style="margin:0">Sin contenido oficial registrado.</p></div>')+
    ((d.refs||[]).length?'<div class="section-head"><div class="h2">Pasajes</div></div><div class="list">'+d.refs.map(r=>
      '<button class="row" data-ref="'+r[0]+'/'+r[1]+'/'+(r[2]||'')+'"><div class="row-ic">'+ic('book')+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(refLabel(r[0],r[1],r[2]))+'</div>'+
      '<div class="row-s" style="white-space:normal">'+esc(verseText(r[0],r[1],r[2])||'—')+'</div></div></button>').join('')+'</div>':'')+
    '<div class="section-head"><div class="h2">Mi estudio sobre esta doctrina</div><button class="link-btn" data-new>'+ic('plus')+' Nuevo</button></div>'+
    (myStudies.length?'<div class="list">'+myStudies.map(s=>'<button class="row" data-s="'+s.id+'"><div class="row-ic">'+ic('layers')+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(s.title)+'</div><div class="row-s">'+fmtDate(s.updatedAt)+'</div></div></button>').join('')+'</div>'
      :'<p class="tiny">Todavía no has vinculado estudios a esta doctrina.</p>')+
    '<div class="section-head"><div class="h2">Relacionado</div><button class="link-btn" data-rel>'+ic('plus')+' Conectar</button></div>'+
    '<div id="relBox"></div><div style="height:24px"></div></div>';
  el.querySelectorAll('[data-ref]').forEach(b=>b.onclick=()=>{
    const p=b.dataset.ref.split('/');
    go('#/leer/'+p[0]+'/'+p[1]+(p[2]?'/'+p[2]:''));
  });
  el.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>go('#/estudio/'+b.dataset.s));
  el.querySelector('[data-new]').onclick=()=>{
    const s=Data.createStudy({title:'Estudio: '+d.title,links:[{type:'doctrine',id:d.id,label:d.title}]});
    go('#/estudio/'+s.id);
  };
  el.querySelector('[data-rel]').onclick=()=>openRelateDialog('doctrine',d.id,d.title);
  const box=$('#relBox',el);
  box.innerHTML=rels.length?'<div class="related-row">'+rels.map(r=>
    '<button class="rel-chip" data-r="'+r.type+':'+r.id+'">'+ic('link')+esc(r.label||r.id)+'</button>').join('')+'</div>':'<p class="tiny">Sin conexiones todavía.</p>';
  box.querySelectorAll('[data-r]').forEach(b=>{
    const p=b.dataset.r.split(':');
    b.onclick=()=>openEntity(p[0],p[1]);
  });
};

function openDoctrineEditor(d){
  Layers.openSheet((h,b)=>{
    h.innerHTML='<div class="h2" style="flex:1">Editar</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    b.innerHTML='<div class="field"><label>Título</label><input class="input" id="d-t" value="'+esc(d.title)+'"></div>'+
      '<div class="field"><label>Resumen</label><input class="input" id="d-s" value="'+esc(d.summary||'')+'"></div>'+
      '<div class="field"><label>Contenido oficial</label><textarea class="textarea" id="d-o" style="min-height:150px">'+esc(d.official||'')+'</textarea></div>'+
      '<div class="field"><label>Fuente</label><input class="input" id="d-f" value="'+esc(d.officialSource||'')+'"></div>'+
      '<div class="field"><label>Pasajes (jhn 3:16)</label><textarea class="textarea" id="d-r">'+(d.refs||[]).map(r=>r[0]+' '+r[1]+(r[2]?':'+r[2]:'')).join('\n')+'</textarea></div>'+
      '<div style="display:flex;gap:10px"><button class="btn btn-block" data-close2>Cancelar</button><button class="btn btn-primary btn-block" id="save">Guardar</button></div>';
    h.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    b.querySelector('[data-close2]').onclick=()=>Layers.closeSheet();
    b.querySelector('#save').onclick=()=>{
      d.title=b.querySelector('#d-t').value.trim()||d.title;
      d.summary=b.querySelector('#d-s').value.trim();
      d.official=b.querySelector('#d-o').value.trim();
      d.officialSource=b.querySelector('#d-f').value.trim();
      d.refs=b.querySelector('#d-r').value.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{
        const m=l.match(/^(\S+)\s+(\d+)(?::(\d+))?$/); if(!m) return null;
        const bk=bookByName(m[1]);
        return bk?[bk.id,parseInt(m[2],10),m[3]?parseInt(m[3],10):null]:null;
      }).filter(Boolean);
      save('doctrines'); haptic('success'); Layers.closeSheet(); flashSave(); render(); toast('Guardado','check');
    };
  });
}

View.studies=function(el){
  setTopbar({title:'Mis estudios',actions:[
    {icon:'folder',title:'Carpetas',onClick:openFolderManager},
    {icon:'plus',title:'Nuevo',onClick:async()=>{
      const t=await askText({title:'Nuevo estudio',label:'Título',placeholder:'Ej. La muerte al pecado'});
      if(!t) return;
      const s=Data.createStudy({title:t}); go('#/estudio/'+s.id);
    }}
  ]});
  let list=S.studies.filter(s=>!s.deletedAt);
  const status=View._studyFilter||'';
  if(status) list=list.filter(s=>s.status===status);
  list.sort((a,b)=>b.updatedAt-a.updatedAt);
  const trash=S.studies.filter(s=>s.deletedAt);

  el.innerHTML='<div class="page">'+
    '<div style="padding:22px 0 4px"><h1 class="h1">Mis estudios</h1><p class="sub">Tu conocimiento personal.</p></div>'+
    '<div class="chip-row" style="margin-top:16px">'+['','En progreso','Terminado','Para revisar'].map(s=>
      '<button class="chip chip-tap '+(status===s?'active':'')+'" data-f="'+esc(s)+'">'+esc(s||'Todos')+'</button>').join('')+'</div>'+
    (list.length?'<div class="list" style="margin-top:14px">'+list.map(s=>
      '<button class="row" data-s="'+s.id+'"><div class="row-ic">'+ic('layers')+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(s.title||'Estudio sin título')+'</div>'+
      '<div class="row-s">'+fmtDate(s.updatedAt)+(s.status?' · '+esc(s.status):'')+'</div></div>'+
      (s.favorite?'<span style="color:var(--accent)">'+ic('star')+'</span>':'')+ic('chev','row-x')+'</button>').join('')+'</div>'
      :'<div class="empty">'+ic('layers')+'<p>Todavía no tienes estudios</p><small>Crea uno y empieza a insertar versículos, notas e imágenes.</small>'+
       '<div style="margin-top:20px"><button class="btn btn-primary" data-new>'+ic('plus')+' Crear el primero</button></div></div>')+
    (trash.length?'<div class="section-head"><div class="h2">Papelera</div><span class="tiny">'+trash.length+'</span></div>'+
      '<div class="list">'+trash.map(s=>'<button class="row" data-trash="'+s.id+'"><div class="row-ic" style="background:var(--bg-sunken);color:var(--text-3)">'+ic('trash')+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(s.title||'Sin título')+'</div><div class="row-s">Eliminado '+fmtDate(s.deletedAt)+'</div></div></button>').join('')+'</div>':'')+
    '<div style="height:20px"></div></div>';
  el.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{ haptic('light'); View._studyFilter=b.dataset.f; render(); });
  el.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>go('#/estudio/'+b.dataset.s));
  el.querySelectorAll('[data-trash]').forEach(b=>b.onclick=async()=>{
    const s=Data.getStudy(b.dataset.trash);
    const r=await confirmDialog('Recuperar', 'Volverá a tu lista.','Recuperar');
    if(r){ Data.restoreStudy(s.id); haptic('success'); render(); toast('Estudio recuperado','check'); }
  });
  const nb=el.querySelector('[data-new]');
  if(nb) nb.onclick=async()=>{
    const t=await askText({title:'Nuevo estudio',label:'Título'});
    if(!t) return;
    const s=Data.createStudy({title:t}); go('#/estudio/'+s.id);
  };
};

function openFolderManager(){
  Layers.openSheet((h,b)=>{
    const renderList=()=>{
      b.innerHTML='<div class="field"><label>Nueva carpeta</label><div style="display:flex;gap:8px">'+
        '<input class="input" id="fn" placeholder="Nombre"><button class="btn btn-primary" id="fadd">Añadir</button></div></div>'+
        '<div class="list">'+(S.folders.length?S.folders.map(f=>'<div class="row"><div class="row-ic">'+ic('folder')+'</div>'+
        '<div class="row-main"><div class="row-t">'+esc(f.name)+'</div><div class="row-s">'+
        (S.notes.filter(n=>n.folderId===f.id).length+S.studies.filter(s=>s.folderId===f.id).length)+' elementos</div></div>'+
        '<button class="icon-btn btn-danger" data-del="'+f.id+'">'+ic('trash')+'</button></div>').join(''):'<p class="tiny" style="padding:8px">Sin carpetas.</p>')+'</div>';
      b.querySelector('#fadd').onclick=()=>{
        const v=b.querySelector('#fn').value.trim(); if(!v) return;
        Data.createFolder(v); haptic('success'); renderList(); toast('Carpeta creada','folder');
      };
      b.querySelectorAll('[data-del]').forEach(x=>x.onclick=async()=>{
        const ok=await confirmDialog('Eliminar carpeta','Los elementos no se borran.','Eliminar');
        if(ok){ Data.deleteFolder(x.dataset.del); renderList(); }
      });
    };
    h.innerHTML='<div class="h2" style="flex:1">Carpetas</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    h.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    renderList();
  });
}

View.study=function(el,route){
  const s=Data.getStudy(route[1]);
  if(!s){ el.innerHTML='<div class="page"><div class="empty">'+ic('info')+'<p>Estudio no encontrado</p></div></div>'; return; }
  const auto=debounce(()=>{
    const ed=$('#sBody');
    if(ed){
      s.blocks=[{type:'html',html:ed.innerHTML}]; s.updatedAt=Date.now(); save('studies'); flashSave();
      const ind=$('#autosave'); if(ind){ ind.classList.remove('saving'); ind.classList.add('saved'); }
    }
  },800);
  setTopbar({
    back:true,title:'',
    actions:[
      {icon:'star',title:'Favorito',onClick:()=>{ s.favorite=!s.favorite; save('studies'); haptic(s.favorite?'success':'light'); render(); toast(s.favorite?'Favorito':'Quitado','star'); }},
      {icon:'download',title:'PDF',onClick:()=>exportPDF(s.title||'Estudio', blocksToHtml(s.blocks||[]))},
      {icon:'share',title:'Compartir',onClick:()=>openShareStudy(s)},
      {icon:'more',title:'Opciones',onClick:()=>openStudyOptions(s)}
    ]
  });
  const links=s.links||[];
  const rels=Data.relationsOf('study',s.id);
  el.innerHTML='<div class="page">'+
    '<div class="editor-toolbar">'+
      '<button class="tb" data-cmd="formatBlock" data-val="h2">'+ic('h2')+'</button>'+
      '<button class="tb" data-cmd="formatBlock" data-val="h3">'+ic('h3')+'</button>'+
      '<button class="tb" data-cmd="bold">'+ic('bold')+'</button>'+
      '<button class="tb" data-cmd="italic">'+ic('italic')+'</button>'+
      '<button class="tb" data-cmd="underline">'+ic('underline')+'</button>'+
      '<div class="tb-sep"></div>'+
      '<button class="tb" data-cmd="insertUnorderedList">'+ic('ul')+'</button>'+
      '<button class="tb" data-cmd="insertOrderedList">'+ic('ol')+'</button>'+
      '<button class="tb" data-cmd="formatBlock" data-val="blockquote">'+ic('quote')+'</button>'+
      '<div class="tb-sep"></div>'+
      '<button class="tb" data-ins="verse">'+ic('bookPlus')+'</button>'+
      '<button class="tb" data-ins="image">'+ic('image')+'</button>'+
      '<button class="tb" data-ins="audio">'+ic('mic')+'</button>'+
      '<button class="tb" data-ins="number">'+ic('ol')+'</button>'+
      '<button class="tb" data-ins="link">'+ic('link')+'</button>'+
      '<button class="tb" data-ins="hr">'+ic('hr')+'</button>'+
    '</div>'+
    '<input id="sTitle" class="h1" style="border:0;background:none;padding:0;outline:none;width:100%;margin-bottom:8px" placeholder="Título del estudio" value="'+esc(s.title)+'">'+
    '<div class="chip-row" style="margin-bottom:16px">'+
      '<button class="chip chip-tap" data-status>'+(s.status?esc(s.status):'+ Estado')+'</button>'+
      '<button class="chip chip-tap" data-tags>'+((s.tags||[]).length?s.tags.map(t=>'#'+esc(t)).join(' '):'+ Etiquetas')+'</button>'+
      '<button class="chip chip-tap" data-link-el>'+ic('link')+' '+(links.length?links.length+' vínculo'+(links.length>1?'s':''):'Vincular')+'</button>'+
    '</div>'+
    '<div class="editor" id="sBody" contenteditable="true" data-ph="Escribe libremente. Inserta versículos, imágenes, audio y citas.">'+
      (s.blocks&&s.blocks.length?blocksToHtml(s.blocks):'')+'</div>'+
    '<div class="autosave" id="autosave"><span class="dot"></span><span>Cambios guardados automáticamente</span></div>'+
    '<div class="divider"></div>'+
    '<div class="tiny" style="display:flex;gap:16px;flex-wrap:wrap"><span>Creado '+fmtFull(s.createdAt)+'</span><span>Modificado '+fmtDate(s.updatedAt)+'</span></div>'+
    ((rels.length||links.length)?'<div class="section-head"><div class="h2">Conexiones</div></div><div class="related-row">'+
      links.map(l=>'<button class="rel-chip" data-r="'+l.type+':'+l.id+'">'+ic(l.type==='doctrine'?'shield':l.type==='word'?'type':'link')+esc(l.label||l.id)+'</button>').join('')+
      rels.map(r=>'<button class="rel-chip" data-r="'+r.type+':'+r.id+'">'+ic('link')+esc(r.label||r.id)+'</button>').join('')+'</div>':'')+
    '<div style="height:24px"></div></div>';
  const body=$('#sBody',el);
  const title=$('#sTitle',el);
  const ind=$('#autosave',el);
  title.addEventListener('input',()=>{
    s.title=title.value; s.updatedAt=Date.now(); ind.classList.add('saving');
    debounce(()=>{ save('studies'); flashSave(); ind.classList.remove('saving'); ind.classList.add('saved'); },600)();
  });
  body.addEventListener('input',()=>{ ind.classList.add('saving'); ind.classList.remove('saved'); auto(); });
  body.addEventListener('keydown',e=>{
    if(e.key!==' ' && e.key!=='Enter') return;
    if(e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
    if(tryAutoEmbed(body)){ e.preventDefault(); haptic('light'); auto(); }
  });
  body.addEventListener('blur',()=>{
    s.blocks=[{type:'html',html:body.innerHTML}]; s.updatedAt=Date.now(); save('studies'); flashSave();
    ind.classList.remove('saving'); ind.classList.add('saved');
  });
  el.querySelectorAll('[data-cmd]').forEach(b=>b.onmousedown=e=>{
    e.preventDefault(); haptic('light');
    document.execCommand(b.dataset.cmd,false,b.dataset.val||null); body.focus(); auto();
  });
  el.querySelectorAll('[data-ins]').forEach(b=>b.onmousedown=async e=>{
    e.preventDefault(); body.focus();
    const kind=b.dataset.ins;
    if(kind==='hr'){ document.execCommand('insertHTML',false,'<hr>'); auto(); return; }
    if(kind==='link'){
      const url=await askText({title:'Enlace',label:'URL',placeholder:'https://…'});
      if(url){ document.execCommand('createLink',false,url); auto(); }
      return;
    }
    if(kind==='number'){
      document.execCommand('insertOrderedList', false, null);
      auto();
      return;
    }
    if(kind==='image'){
      const inp=document.createElement('input'); inp.type='file'; inp.accept='image/*';
      inp.onchange=()=>{
        const f=inp.files[0]; if(!f) return;
        const r=new FileReader();
        r.onload=()=>{
          document.execCommand('insertHTML',false,'<img src="'+r.result+'" alt="">');
          haptic('success'); auto(); toast('Imagen insertada','image');
        };
        r.readAsDataURL(f);
      };
      inp.click(); return;
    }
    if(kind==='audio'){
      const inp=document.createElement('input'); inp.type='file'; inp.accept='audio/*';
      inp.onchange=()=>{
        const f=inp.files[0]; if(!f) return;
        if(f.size > 5*1024*1024){ toast('Audio máximo 5 MB','info'); return; }
        const r=new FileReader();
        r.onload=()=>{
          document.execCommand('insertHTML',false,'<audio controls src="'+r.result+'"></audio>');
          haptic('success'); auto(); toast('Audio insertado','check');
        };
        r.readAsDataURL(f);
      };
      inp.click(); return;
    }
    if(kind==='verse'){
      const ref=await askText({title:'Insertar versículo',label:'Referencia',placeholder:'Romanos 6:3-5'});
      if(!ref) return;
      const html=buildVerseEmbed(ref);
      if(!html){ toast('No se encontró el pasaje','info'); return; }
      document.execCommand('insertHTML',false,html); haptic('success'); auto();
    }
  });
  title.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); body.focus(); } });
  el.querySelector('[data-status]').onclick=()=>pickStatus(s);
  el.querySelector('[data-tags]').onclick=async()=>{
    const t=await askText({title:'Etiquetas',label:'Separadas por comas',value:(s.tags||[]).join(', ')});
    if(t!==null){ s.tags=t.split(',').map(x=>x.trim()).filter(Boolean); save('studies'); render(); }
  };
  el.querySelector('[data-link-el]').onclick=()=>openLinkDialog(s);
  el.querySelectorAll('[data-r]').forEach(b=>{
    const p=b.dataset.r.split(':');
    b.onclick=()=>openEntity(p[0],p[1]);
  });
};

function blocksToHtml(blocks){
  return blocks.map(b=>b.type==='html'?b.html:b.type==='verse'?'<div class="verse-embed">'+b.html+'</div>':'').join('');
}
function autoRefCand(text){
  if(!text || !/\d$/.test(text)) return null;
  const spans=[]; let end=text.length;
  for(let k=0;k<3;k++){
    const s=text.slice(0,end).replace(/\s+$/,'');
    if(!s) break;
    const sp=s.lastIndexOf(' ');
    spans.push({start:sp<0?0:sp+1,end:s.length});
    if(sp<0) break;
    end=sp;
  }
  if(spans.length<2) return null;
  const tail=spans[0].end;
  for(let k=1;k<=spans.length;k++){
    const w=spans[k-1];
    const cand=text.slice(w.start,tail);
    if(!/ \d+(?::\d+(?:[-–]\d+)?)?$/.test(cand)) continue;
    const m=cand.match(/^(.*\S)\s+(\d+(?::\d+(?:[-–]\d+)?)?)$/);
    if(!m) continue;
    if(!autoBook(m[1])) continue;
    return { text:cand, start:w.start, book:m[1] };
  }
  return null;
}
function autoBook(name){
  const n=norm(name);
  if(!n || n.length<2) return null;
  const b=bookByName(name);
  if(!b) return null;
  if(norm(b.name)===n || norm(b.abbr)===n) return b;
  if(n.length>=3 && norm(b.name).startsWith(n)) return b;
  return null;
}
function rangeInBlock(block,start,end){
  const w=document.createTreeWalker(block,NodeFilter.SHOW_TEXT);
  let pos=0,sN=null,sO=0,eN=null,eO=0,n;
  while((n=w.nextNode())){
    const L=n.nodeValue.length;
    if(sN===null && pos+L>start){ sN=n; sO=start-pos; }
    if(pos+L>=end){ eN=n; eO=end-pos; break; }
    pos+=L;
  }
  if(!sN || !eN) return null;
  const r=document.createRange();
  r.setStart(sN,sO); r.setEnd(eN,eO);
  return r;
}
function tryAutoEmbed(body){
  if(!S.settings.autoEmbedRefs) return false;
  const sel=window.getSelection();
  if(!sel || sel.rangeCount!==1 || !sel.isCollapsed) return false;
  const cr=sel.getRangeAt(0);
  if(cr.startContainer.nodeType!==3) return false;
  const parent=cr.startContainer.parentNode;
  if(!parent || parent.nodeType!==1 || !body.contains(parent)) return false;
  if(parent.closest('.verse-embed,blockquote,a,code,pre,samp')) return false;
  const block=parent.closest('p,div,li,h1,h2,h3,h4,blockquote');
  if(!block || block===body || !body.contains(block)) return false;
  const fam=String(window.getComputedStyle(block).fontFamily||'').toLowerCase();
  if(fam.indexOf('mono')>=0) return false;
  let text='';
  try{
    const pre=document.createRange();
    pre.selectNodeContents(block);
    pre.setEnd(cr.startContainer,cr.startOffset);
    text=pre.toString().replace(/\s+$/,'');
  }catch(e){ return false; }
  const cand=autoRefCand(text);
  if(!cand) return false;
  const html=buildVerseEmbed(cand.text);
  if(!html) return false;
  const rng=rangeInBlock(block,cand.start,cand.start+cand.text.length);
  if(!rng) return false;
  sel.removeAllRanges(); sel.addRange(rng);
  if(!document.execCommand('insertHTML',false,html+'<div><br></div>')){
    sel.removeAllRanges(); sel.addRange(cr);
    return false;
  }
  return true;
}
function buildVerseEmbed(refStr){
  const m=refStr.trim().match(/^(.+?)\s+(\d+)(?::(\d+)(?:[-–](\d+))?)?$/);
  if(!m) return null;
  const b=bookByName(m[1]); if(!b) return null;
  const ch=parseInt(m[2],10);
  const v1=m[3]?parseInt(m[3],10):null;
  const v2=m[4]?parseInt(m[4],10):v1;
  const raw=getChapter(S.settings.versionId,b.id,ch);
  if(!raw) return null;
  const arr=raw.filter(t=>typeof t==='string');
  if(v1){
    const parts=[];
    for(let v=v1;v<=(v2||v1);v++){
      if(arr[v-1]) parts.push('<sup style="font-family:var(--font-ui);font-size:.62em;font-weight:750;color:var(--text-3);margin-right:.35em">'+v+'</sup>'+esc(arr[v-1]));
    }
    if(!parts.length) return null;
    return '<div class="verse-embed"><span class="ve-ref">'+esc(refLabel(b.id,ch,v1))+(v2&&v2!==v1?'–'+v2:'')+' · '+esc(activeVersion().abbr)+'</span>'+parts.join(' ')+'</div>';
  }
  return '<div class="verse-embed"><span class="ve-ref">'+esc(refLabel(b.id,ch))+' · '+esc(activeVersion().abbr)+'</span>'+
    arr.map((t,i)=>'<sup style="font-family:var(--font-ui);font-size:.62em;font-weight:750;color:var(--text-3);margin-right:.35em">'+(i+1)+'</sup>'+esc(t)).join(' ')+'</div>';
}

function pickStatus(s){
  const opts=['','En progreso','Terminado','Para revisar'];
  Layers.openSheet((h,b)=>{
    h.innerHTML='<div class="h2" style="flex:1">Estado</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    b.innerHTML='<div class="list">'+opts.map(o=>'<button class="row" data-o="'+esc(o)+'"><div class="row-ic">'+ic(o===s.status?'check':'chev')+'</div>'+
      '<div class="row-main"><div class="row-t">'+(o||'Sin estado')+'</div></div></button>').join('')+'</div>';
    h.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    b.querySelectorAll('[data-o]').forEach(el=>el.onclick=()=>{
      s.status=el.dataset.o; save('studies'); haptic('light'); Layers.closeSheet(); render();
    });
  });
}
function openLinkDialog(s){
  Layers.openSheet((h,b)=>{
    h.innerHTML='<div class="h2" style="flex:1">Vincular</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    b.innerHTML='<div class="field"><label>Buscar</label><input class="input" id="lq" placeholder="Doctrina, palabra, entrada…"></div><div id="lres"></div>';
    h.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    const res=b.querySelector('#lres');
    const paint=q=>{
      const items=[];
      S.doctrines.filter(d=>!q||fuzzyMatch(d.title,q)).forEach(d=>items.push({type:'doctrine',id:d.id,label:d.title,ic:'shield'}));
      S.words.filter(w=>!q||fuzzyMatch(w.term,q)).forEach(w=>items.push({type:'word',id:w.id,label:w.term,ic:'type'}));
      S.explore.filter(x=>!q||fuzzyMatch(x.title,q)).forEach(x=>items.push({type:'explore',id:x.id,label:x.title,ic:'compass'}));
      res.innerHTML='<div class="list" style="max-height:44vh;overflow-y:auto">'+(items.slice(0,40).map(it=>
        '<button class="row" data-l="'+it.type+':'+it.id+'"><div class="row-ic">'+ic(it.ic)+'</div>'+
        '<div class="row-main"><div class="row-t">'+esc(it.label)+'</div><div class="row-s">'+it.type+'</div></div></button>').join('')||'<p class="tiny">Sin coincidencias.</p>')+'</div>';
      res.querySelectorAll('[data-l]').forEach(el=>el.onclick=()=>{
        const p=el.dataset.l.split(':');
        const label=el.querySelector('.row-t').textContent;
        s.links=s.links||[];
        if(!s.links.some(l=>l.type===p[0]&&l.id===p[1])) s.links.push({type:p[0],id:p[1],label});
        save('studies'); haptic('success'); Layers.closeSheet(); render(); toast('Vinculado','link');
      });
    };
    paint('');
    b.querySelector('#lq').addEventListener('input',e=>paint(e.target.value.trim()));
  });
}
function openStudyOptions(s){
  Layers.openSheet((h,b)=>{
    h.innerHTML='<div class="h2" style="flex:1">Opciones</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    b.innerHTML='<div class="list">'+
      '<button class="row" data-o="pdf"><div class="row-ic">'+ic('download')+'</div><div class="row-main"><div class="row-t">Exportar PDF</div><div class="row-s">Guardado en Documentos</div></div></button>'+
      '<button class="row" data-o="share"><div class="row-ic">'+ic('share')+'</div><div class="row-main"><div class="row-t">Compartir</div><div class="row-s">Enlace de solo lectura</div></div></button>'+
      '<button class="row" data-o="relate"><div class="row-ic">'+ic('link')+'</div><div class="row-main"><div class="row-t">Relacionar</div></div></button>'+
      '<button class="row" data-o="trash"><div class="row-ic" style="background:color-mix(in srgb,var(--danger) 12%,transparent);color:var(--danger)">'+ic('trash')+'</div>'+
      '<div class="row-main"><div class="row-t" style="color:var(--danger)">Mover a papelera</div></div></button></div>';
    h.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    b.querySelectorAll('[data-o]').forEach(el=>el.onclick=async()=>{
      const o=el.dataset.o; Layers.closeSheet();
      if(o==='pdf') exportPDF(s.title||'Estudio', blocksToHtml(s.blocks||[]));
      if(o==='share') openShareStudy(s);
      if(o==='relate') openRelateDialog('study',s.id,s.title);
      if(o==='trash'){
        const ok=await confirmDialog('Mover a papelera','Podrá recuperarse.','Mover');
        if(ok){ Data.trashStudy(s.id); haptic('light'); go('#/estudios'); toast('En papelera','trash'); }
      }
    });
  });
}

View.notes=function(el){
  setTopbar({title:'Notas',actions:[
    {icon:'plus',title:'Nueva nota',onClick:()=>{ const n=Data.createNote({content:''}); go('#/nota/'+n.id); }}
  ]});
  let list=S.notes.filter(n=>!n.deletedAt).sort((a,b)=>b.updatedAt-a.updatedAt);
  const trash=S.notes.filter(n=>n.deletedAt);
  el.innerHTML='<div class="page">'+
    '<div style="padding:22px 0 4px"><h1 class="h1">Notas</h1><p class="sub">Apuntes sueltos, reflexiones y material en bruto.</p></div>'+
    (list.length?'<div class="list" style="margin-top:16px">'+list.map(n=>
      '<button class="row" data-n="'+n.id+'"><div class="row-ic">'+ic('note')+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(n.title||stripTags(n.content).slice(0,70)||'Nota sin título')+'</div>'+
      '<div class="row-s">'+fmtDate(n.updatedAt)+(n.refs&&n.refs.length?' · '+n.refs.map(r=>refShort(r.book,r.chapter,r.verse)).join(', '):'')+'</div></div>'+
      (n.favorite?'<span style="color:var(--accent)">'+ic('star')+'</span>':'')+ic('chev','row-x')+'</button>').join('')+'</div>'
      :'<div class="empty">'+ic('note')+'<p>Sin notas todavía</p><small>Crea una nota desde aquí o desde cualquier versículo.</small></div>')+
    (trash.length?'<div class="section-head"><div class="h2">Papelera</div><span class="tiny">'+trash.length+'</span></div>'+
      '<div class="list">'+trash.map(n=>'<button class="row" data-trash="'+n.id+'"><div class="row-ic" style="background:var(--bg-sunken);color:var(--text-3)">'+ic('trash')+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(n.title||stripTags(n.content).slice(0,50)||'Sin título')+'</div>'+
      '<div class="row-s">Eliminada '+fmtDate(n.deletedAt)+'</div></div></button>').join('')+'</div>':'')+
    '<div style="height:20px"></div></div>';
  el.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>go('#/nota/'+b.dataset.n));
  el.querySelectorAll('[data-trash]').forEach(b=>b.onclick=async()=>{
    const n=Data.getNote(b.dataset.trash);
    const r=await confirmDialog('Recuperar nota','Volverá a tu lista.','Recuperar');
    if(r){ Data.restoreNote(n.id); haptic('success'); render(); toast('Nota recuperada','check'); }
  });
};

View.note=function(el,route){
  const n=Data.getNote(route[1]);
  if(!n){ el.innerHTML='<div class="page"><div class="empty">'+ic('info')+'<p>Nota no encontrada</p></div></div>'; return; }
  setTopbar({back:true,title:'',actions:[
    {icon:'star',title:'Favorito',onClick:()=>{ n.favorite=!n.favorite; save('notes'); haptic(n.favorite?'success':'light'); render(); toast(n.favorite?'Favorito':'Quitado','star'); }},
    {icon:'download',title:'PDF',onClick:()=>exportPDF(n.title||'Nota', n.content||'')},
    {icon:'more',title:'Opciones',onClick:()=>openNoteOptions(n)}
  ]});
  const rels=Data.relationsOf('note',n.id);
  el.innerHTML='<div class="page">'+
    '<div class="editor-toolbar">'+
      '<button class="tb" data-cmd="formatBlock" data-val="h2">'+ic('h2')+'</button>'+
      '<button class="tb" data-cmd="formatBlock" data-val="h3">'+ic('h3')+'</button>'+
      '<button class="tb" data-cmd="bold">'+ic('bold')+'</button>'+
      '<button class="tb" data-cmd="italic">'+ic('italic')+'</button>'+
      '<button class="tb" data-cmd="underline">'+ic('underline')+'</button>'+
      '<div class="tb-sep"></div>'+
      '<button class="tb" data-cmd="insertUnorderedList">'+ic('ul')+'</button>'+
      '<button class="tb" data-cmd="insertOrderedList">'+ic('ol')+'</button>'+
      '<button class="tb" data-cmd="formatBlock" data-val="blockquote">'+ic('quote')+'</button>'+
      '<div class="tb-sep"></div>'+
      '<button class="tb" data-ins="verse">'+ic('bookPlus')+'</button>'+
      '<button class="tb" data-ins="image">'+ic('image')+'</button>'+
      '<button class="tb" data-ins="audio">'+ic('mic')+'</button>'+
      '<button class="tb" data-ins="number">'+ic('ol')+'</button>'+
      '<button class="tb" data-ins="link">'+ic('link')+'</button>'+
      '<button class="tb" data-ins="hr">'+ic('hr')+'</button>'+
    '</div>'+
    '<input id="nTitle" class="h1" style="border:0;background:none;padding:0;outline:none;width:100%;margin-bottom:6px" placeholder="Título" value="'+esc(n.title)+'">'+
    '<div class="tiny" style="margin-bottom:16px">'+((n.refs||[]).length?n.refs.map(r=>'<button class="chip chip-tap" data-ref="'+r.book+'/'+r.chapter+'/'+(r.verse||'')+'" style="margin-right:6px">'+esc(refLabel(r.book,r.chapter,r.verse))+'</button>').join(''):'')+'</div>'+
    '<div class="editor" id="nBody" contenteditable="true" data-ph="Escribe…">'+(n.content||'')+'</div>'+
    '<div class="autosave" id="autosave"><span class="dot"></span><span>Guardado automáticamente</span></div>'+
    '<div class="divider"></div>'+
    '<div class="tiny" style="display:flex;gap:16px;flex-wrap:wrap"><span>Creada '+fmtFull(n.createdAt)+'</span><span>Modificada '+fmtDate(n.updatedAt)+'</span></div>'+
    '<div class="section-head"><div class="h2">Conexiones</div><button class="link-btn" data-rel>'+ic('plus')+' Conectar</button></div>'+
    '<div id="relBox"></div><div style="height:24px"></div></div>';
  const body=$('#nBody',el);
  const title=$('#nTitle',el);
  const ind=$('#autosave',el);
  const persist=debounce(()=>{ n.content=body.innerHTML; n.updatedAt=Date.now(); save('notes'); flashSave(); ind.classList.remove('saving'); ind.classList.add('saved'); },700);
  title.addEventListener('input',()=>{
    n.title=title.value; n.updatedAt=Date.now(); ind.classList.add('saving');
    debounce(()=>{ save('notes'); flashSave(); ind.classList.remove('saving'); ind.classList.add('saved'); },500)();
  });
  body.addEventListener('input',()=>{ ind.classList.add('saving'); ind.classList.remove('saved'); persist(); });
  body.addEventListener('keydown',e=>{
    if(e.key!==' ' && e.key!=='Enter') return;
    if(e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
    if(tryAutoEmbed(body)){ e.preventDefault(); haptic('light'); persist(); }
  });
  body.addEventListener('blur',()=>{ n.content=body.innerHTML; n.updatedAt=Date.now(); save('notes'); flashSave(); ind.classList.remove('saving'); ind.classList.add('saved'); });
  el.querySelectorAll('[data-cmd]').forEach(b=>b.onmousedown=e=>{
    e.preventDefault(); haptic('light');
    document.execCommand(b.dataset.cmd,false,b.dataset.val||null); body.focus(); persist();
  });
  el.querySelectorAll('[data-ins]').forEach(b=>b.onmousedown=async e=>{
    e.preventDefault(); body.focus();
    const k=b.dataset.ins;
    if(k==='hr'){ document.execCommand('insertHTML',false,'<hr>'); persist(); return; }
    if(k==='number'){ document.execCommand('insertOrderedList', false, null); persist(); return; }
    if(k==='link'){
      const url=await askText({title:'Enlace',label:'URL'});
      if(url){ document.execCommand('createLink',false,url); persist(); } return;
    }
    if(k==='image'){
      const inp=document.createElement('input'); inp.type='file'; inp.accept='image/*';
      inp.onchange=()=>{
        const f=inp.files[0]; if(!f) return;
        const r=new FileReader();
        r.onload=()=>{ document.execCommand('insertHTML',false,'<img src="'+r.result+'" alt="">'); haptic('success'); persist(); };
        r.readAsDataURL(f);
      };
      inp.click(); return;
    }
    if(k==='audio'){
      const inp=document.createElement('input'); inp.type='file'; inp.accept='audio/*';
      inp.onchange=()=>{
        const f=inp.files[0]; if(!f) return;
        if(f.size > 5*1024*1024){ toast('Audio máximo 5 MB','info'); return; }
        const r=new FileReader();
        r.onload=()=>{ document.execCommand('insertHTML',false,'<audio controls src="'+r.result+'"></audio>'); haptic('success'); persist(); toast('Audio insertado','check'); };
        r.readAsDataURL(f);
      };
      inp.click(); return;
    }
    if(k==='verse'){
      const ref=await askText({title:'Insertar versículo',label:'Referencia',placeholder:'Romanos 6:3-5'});
      if(!ref) return;
      const html=buildVerseEmbed(ref);
      if(!html){ toast('No se encontró el pasaje','info'); return; }
      document.execCommand('insertHTML',false,html);
      const m=ref.match(/^(.+?)\s+(\d+)(?::(\d+))?/);
      if(m){
        const bk=bookByName(m[1]);
        if(bk){
          n.refs=n.refs||[];
          if(!n.refs.some(r=>r.book===bk.id&&r.chapter===+m[2])) n.refs.push({book:bk.id,chapter:+m[2],verse:m[3]?+m[3]:null});
          save('notes');
        }
      }
      haptic('success'); persist();
    }
  });
  el.querySelectorAll('[data-ref]').forEach(b=>b.onclick=()=>{
    const p=b.dataset.ref.split('/');
    go('#/leer/'+p[0]+'/'+p[1]+(p[2]?'/'+p[2]:''));
  });
  el.querySelector('[data-rel]').onclick=()=>openRelateDialog('note',n.id,n.title||'Nota');
  const box=$('#relBox',el);
  box.innerHTML=rels.length?'<div class="related-row">'+rels.map(r=>
    '<button class="rel-chip" data-r="'+r.type+':'+r.id+'">'+ic('link')+esc(r.label||r.id)+'</button>').join('')+'</div>':'<p class="tiny">Sin conexiones todavía.</p>';
  box.querySelectorAll('[data-r]').forEach(b=>{
    const p=b.dataset.r.split(':');
    b.onclick=()=>openEntity(p[0],p[1]);
  });
};

function openNoteOptions(n){
  Layers.openSheet((h,b)=>{
    h.innerHTML='<div class="h2" style="flex:1">Opciones</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    b.innerHTML='<div class="list">'+
      '<button class="row" data-o="pdf"><div class="row-ic">'+ic('download')+'</div><div class="row-main"><div class="row-t">Exportar PDF</div><div class="row-s">Guardado en Documentos</div></div></button>'+
      '<button class="row" data-o="study"><div class="row-ic">'+ic('layers')+'</div><div class="row-main"><div class="row-t">Convertir en estudio</div></div></button>'+
      '<button class="row" data-o="trash"><div class="row-ic" style="background:color-mix(in srgb,var(--danger) 12%,transparent);color:var(--danger)">'+ic('trash')+'</div>'+
      '<div class="row-main"><div class="row-t" style="color:var(--danger)">Mover a papelera</div></div></button></div>';
    h.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    b.querySelectorAll('[data-o]').forEach(el=>el.onclick=async()=>{
      const o=el.dataset.o; Layers.closeSheet();
      if(o==='pdf') exportPDF(n.title||'Nota', n.content||'');
      if(o==='study'){
        const s=Data.createStudy({title:n.title||stripTags(n.content).slice(0,40),blocks:[{type:'html',html:n.content}]});
        haptic('success'); toast('Estudio creado','layers'); go('#/estudio/'+s.id);
      }
      if(o==='trash'){
        const ok=await confirmDialog('Mover a papelera','Podrás recuperarla después.','Mover');
        if(ok){ Data.trashNote(n.id); go('#/notas'); toast('En papelera','trash'); }
      }
    });
  });
}

View.inbox=function(el){
  setTopbar({title:'Para estudiar después',actions:[]});
  const pend=S.inbox.filter(i=>!i.done);
  const done=S.inbox.filter(i=>i.done);
  el.innerHTML='<div class="page">'+
    '<div style="padding:22px 0 4px"><h1 class="h1">Para estudiar después</h1><p class="sub">Tu bandeja de entrada.</p></div>'+
    '<div class="searchbar" style="margin-top:16px">'+ic('plus')+'<input id="quick" placeholder="Añadir rápido… (una idea, una referencia)"></div>'+
    (pend.length?'<div class="list" style="margin-top:16px">'+pend.map(it=>
      '<div class="row" data-i="'+it.id+'"><div class="row-ic">'+ic(it.kind==='word'?'type':it.kind==='verse'?'book':'note')+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(it.title||it.text||'Elemento')+'</div>'+
      '<div class="row-s">'+esc(it.subtitle||'')+' · '+fmtDate(it.createdAt)+'</div></div>'+
      '<button class="icon-btn" data-done="'+it.id+'">'+ic('check')+'</button>'+
      '<button class="icon-btn" data-del="'+it.id+'">'+ic('trash')+'</button></div>').join('')+'</div>'
      :'<div class="empty">'+ic('inbox')+'<p>Bandeja vacía</p><small>Guarda versículos, palabras o ideas desde cualquier parte de la app.</small></div>')+
    (done.length?'<div class="section-head"><div class="h2">Procesado</div><span class="tiny">'+done.length+'</span></div>'+
      '<div class="list">'+done.map(it=>'<div class="row" style="opacity:.6"><div class="row-ic" style="background:var(--bg-sunken);color:var(--text-3)">'+ic('check')+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(it.title||it.text||'')+'</div><div class="row-s">'+fmtDate(it.createdAt)+'</div></div>'+
      '<button class="icon-btn" data-del="'+it.id+'">'+ic('trash')+'</button></div>').join('')+'</div>':'')+
    '<div style="height:20px"></div></div>';
  const qi=$('#quick',el);
  qi.addEventListener('keydown',e=>{
    if(e.key!=='Enter') return;
    const v=qi.value.trim(); if(!v) return;
    const parsed=parseRef(v);
    if(parsed){
      Data.addInbox({kind:'verse',title:refLabel(parsed.book,parsed.chapter,parsed.verse),subtitle:'Referencia',book:parsed.book,chapter:parsed.chapter,verse:parsed.verse,text:parsed.verse?verseText(parsed.book,parsed.chapter,parsed.verse):''});
    } else {
      Data.addInbox({kind:'note',title:v,subtitle:'Idea rápida'});
    }
    qi.value=''; haptic('success'); flashSave(); renderNav(); render(); toast('Guardado','check');
  });
  el.querySelectorAll('[data-done]').forEach(b=>b.onclick=()=>{
    const it=S.inbox.find(x=>x.id===b.dataset.done); it.done=true; save('inbox'); haptic('light'); renderNav(); render();
  });
  el.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{ Data.removeInbox(b.dataset.del); haptic('light'); renderNav(); render(); });
  el.querySelectorAll('[data-i]').forEach(r=>r.onclick=e=>{
    if(e.target.closest('button')) return;
    const it=S.inbox.find(x=>x.id===r.dataset.i);
    if(it.book){ go('#/leer/'+it.book+'/'+it.chapter+(it.verse?'/'+it.verse:'')); }
    else openInboxItem(it);
  });
};
function openInboxItem(it){
  Layers.openSheet((h,b)=>{
    h.innerHTML='<div class="h2" style="flex:1">'+esc(it.title||'Elemento')+'</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    b.innerHTML=(it.text?'<div class="sheet-quote">'+esc(it.text)+'</div>':'')+
      '<p class="sub" style="margin-bottom:18px">'+esc(it.subtitle||'')+'</p>'+
      '<button class="btn btn-primary btn-block" style="margin-bottom:8px" data-a="note">'+ic('note')+' Convertir en nota</button>'+
      '<button class="btn btn-block" data-a="study">'+ic('layers')+' Añadir a un estudio</button>';
    h.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    b.querySelector('[data-a="note"]').onclick=()=>{
      Data.createNote({title:it.title||'',content:it.text?'<blockquote>'+esc(it.text)+'</blockquote><p></p>':'',refs:it.book?[{book:it.book,chapter:it.chapter,verse:it.verse}]:[]});
      Data.removeInbox(it.id); haptic('success'); Layers.closeSheet(); renderNav(); render(); toast('Nota creada','note');
    };
    b.querySelector('[data-a="study"]').onclick=()=>{
      const list=S.studies.filter(s=>!s.deletedAt);
      if(!list.length){ toast('Crea primero un estudio','info'); return; }
      b.innerHTML='<div class="list">'+list.map(s=>'<button class="row" data-s="'+s.id+'"><div class="row-ic">'+ic('layers')+'</div>'+
        '<div class="row-main"><div class="row-t">'+esc(s.title||'Sin título')+'</div></div></button>').join('')+'</div>';
      b.querySelectorAll('[data-s]').forEach(x=>x.onclick=()=>{
        const s=Data.getStudy(x.dataset.s);
        s.blocks=s.blocks||[];
        s.blocks.push({type:'html',html:it.text?'<div class="verse-embed">'+esc(it.text)+'</div>':'<p>'+esc(it.title)+'</p>'});
        s.updatedAt=Date.now(); save('studies');
        Data.removeInbox(it.id); haptic('success'); Layers.closeSheet(); renderNav(); render(); toast('Añadido al estudio','check');
      });
    };
  });
}

View.favorites=function(el){
  setTopbar({title:'Favoritos',actions:[]});
  const tab=View._favTab||'favoritos';
  el.innerHTML='<div class="page">'+
    '<div style="padding:22px 0 4px"><h1 class="h1">Favoritos</h1><p class="sub">Lo que has marcado como importante.</p></div>'+
    '<div class="chip-row" style="margin-top:16px">'+
      '<button class="chip chip-tap '+(tab==='favoritos'?'active':'')+'" data-tab="favoritos">Favoritos ('+S.favorites.length+')</button>'+
      '<button class="chip chip-tap '+(tab==='marcadores'?'active':'')+'" data-tab="marcadores">Marcadores ('+S.bookmarks.length+')</button>'+
    '</div><div style="margin-top:14px" id="favBody"></div><div style="height:20px"></div></div>';
  const body=$('#favBody',el);
  const items=tab==='favoritos'?S.favorites:S.bookmarks;
  if(!items.length){
    body.innerHTML='<div class="empty">'+ic('star')+'<p>Nada por aquí</p><small>Marca versículos, notas o estudios con la estrella.</small></div>';
  } else {
    body.innerHTML='<div class="list">'+items.map(f=>{
      const icon=f.type==='verse'?'book':f.type==='note'?'note':f.type==='study'?'layers':f.type==='word'?'type':'compass';
      return '<div class="row" data-f="'+f.id+'"><div class="row-ic">'+ic(icon)+'</div>'+
        '<div class="row-main"><div class="row-t">'+esc(f.label||f.ref)+'</div>'+
        '<div class="row-s">'+esc(f.type)+' · '+fmtDate(f.createdAt)+'</div></div>'+
        '<button class="icon-btn" data-rm="'+f.id+'">'+ic('close')+'</button></div>';
    }).join('')+'</div>';
  }
  el.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{ haptic('light'); View._favTab=b.dataset.tab; render(); });
  body.querySelectorAll('[data-f]').forEach(r=>r.onclick=e=>{
    if(e.target.closest('button')) return;
    const f=items.find(x=>x.id===r.dataset.f);
    if(f.type==='verse'){
      const p=f.ref.split('.');
      go('#/leer/'+p[0]+'/'+p[1]+(p[2]?'/'+p[2]:''));
    } else openEntity(f.type,f.ref);
  });
  body.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{
    const f=items.find(x=>x.id===b.dataset.rm);
    if(tab==='favoritos') Data.toggleFavorite(f.type,f.ref,f.label);
    else Data.toggleBookmark(f.ref,f.label);
    haptic('light'); render();
  });
};

const SEARCH_TABS=[['todo','Todo'],['biblia','Biblia'],['palabras','Palabras'],['doctrinas','Doctrinas'],['notas','Mis notas'],['estudios','Mis estudios'],['explorar','Explorar']];
function searchTabLabel(tab){ const f=SEARCH_TABS.find(a=>a[0]===tab); return f?f[1]:'Todo'; }
function savedSearchKey(q,tab){ return norm(q)+'|'+String(tab||'todo').toLowerCase().trim(); }
function savedSearchUpsert(list,item){
  const out=(list||[]).slice();
  const key=savedSearchKey(item.q,item.tab);
  let hit=-1;
  for(let i=0;i<out.length;i++){ if(savedSearchKey(out[i].q,out[i].tab)===key){ hit=i; break; } }
  const rec={ id:hit>=0?out[hit].id:(item.id||uid()), q:item.q, tab:item.tab||'todo',
              label:item.label||item.q, createdAt:item.createdAt||Date.now() };
  if(hit>=0) out[hit]=rec; else out.push(rec);
  return out.sort((a,b)=>b.createdAt-a.createdAt).slice(0,30);
}
function savedSearchRemove(list,id){ return (list||[]).filter(s=>s.id!==id); }
function savedSearchUrl(item){ return '#/buscar?q='+encodeURIComponent(item.q)+(((item.tab||'todo')!=='todo')?'&tab='+item.tab:''); }
function savedSearchRun(item){ location.replace(savedSearchUrl(item)); }
function savedSearchRow(it){
  return '<div class="row" data-run="'+it.id+'"><div class="row-ic">'+ic('bookmark')+'</div>'+
    '<div class="row-main"><div class="row-t">'+esc(it.label||it.q)+'</div>'+
    '<div class="row-s">'+esc(it.q)+' · '+esc(searchTabLabel(it.tab))+'</div></div>'+
    '<button class="icon-btn" data-menu="'+it.id+'" title="Más opciones">'+ic('more')+'</button></div>';
}
function savedSearchRows(items){ return items.map(savedSearchRow).join(''); }
function bindSavedSearches(root){
  root.querySelectorAll('[data-menu]').forEach(bn=>bn.onclick=e=>{
    e.stopPropagation();
    const it=(S.savedSearches||[]).find(x=>x.id===bn.dataset.menu);
    if(it) openSavedMenu(it);
  });
  root.querySelectorAll('[data-run]').forEach(rn=>rn.onclick=()=>{
    const it=(S.savedSearches||[]).find(x=>x.id===rn.dataset.run);
    if(it){ haptic('light'); Layers.closeSheet(); savedSearchRun(it); }
  });
}
function openSavedMenu(it){
  Layers.openSheet((head,body)=>{
    head.innerHTML='<div class="h2" style="flex:1">'+esc(it.label||it.q)+'</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    body.innerHTML='<div class="list">'+
      '<button class="row" data-rename><div class="row-ic">'+ic('type')+'</div>'+
      '<div class="row-main"><div class="row-t">Renombrar</div><div class="row-s">Cambiar la etiqueta</div></div>'+ic('chev','row-x')+'</button>'+
      '<button class="row" data-del><div class="row-ic">'+ic('trash')+'</div>'+
      '<div class="row-main"><div class="row-t">Eliminar</div><div class="row-s">Quitar de guardadas</div></div>'+ic('chev','row-x')+'</button>'+
      '</div>';
    head.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    body.querySelector('[data-rename]').onclick=async()=>{
      const v=await askText({title:'Renombrar búsqueda',label:'Etiqueta',value:it.label||it.q,confirmText:'Guardar'});
      if(v===null) return;
      const idx=(S.savedSearches||[]).findIndex(x=>x.id===it.id);
      if(idx>=0){ S.savedSearches[idx].label=v||it.q; save('savedSearches'); }
      haptic('success'); toast('Etiqueta actualizada','check'); render();
    };
    body.querySelector('[data-del]').onclick=async()=>{
      const ok=await confirmDialog('Eliminar búsqueda','Se quitará "'+(it.label||it.q)+'" de tus búsquedas guardadas.','Eliminar');
      Layers.closeSheet();
      if(!ok) return;
      S.savedSearches=savedSearchRemove(S.savedSearches,it.id);
      save('savedSearches'); haptic('light'); toast('Búsqueda eliminada','trash'); render();
    };
  });
}
function openAllSaved(){
  Layers.openSheet((head,body)=>{
    head.innerHTML='<div class="h2" style="flex:1">Búsquedas guardadas</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    body.innerHTML='<div class="list">'+savedSearchRows(S.savedSearches||[])+'</div>';
    head.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    bindSavedSearches(body);
  });
}
async function saveCurrentSearch(q,tab){
  const v=await askText({title:'Guardar búsqueda',label:'Etiqueta',value:q,confirmText:'Guardar'});
  if(v===null) return;
  S.savedSearches=savedSearchUpsert(S.savedSearches,{id:uid(),q,tab,label:v||q,createdAt:Date.now()});
  save('savedSearches'); haptic('success'); toast('Búsqueda guardada','bookmark');
}
View.search=function(el){
  const params=new URLSearchParams((location.hash.split('?')[1]||''));
  const q=params.get('q')||'';
  const tab=params.get('tab')||'todo';
  setTopbar({title:'Buscar',actions:q?[{icon:'bookmark',title:'Guardar búsqueda',onClick:()=>saveCurrentSearch(q,tab)}]:[]});
  el.innerHTML='<div class="page">'+
    '<div class="searchbar" style="margin-top:16px">'+ic('search')+
      '<input id="gq" placeholder="Buscar en toda tu biblioteca…" value="'+esc(q)+'" autocomplete="off">'+
      (q?'<button class="icon-btn" id="gclear" style="width:26px;height:26px">'+ic('close')+'</button>':'')+
    '</div>'+
    (q?'<div class="chip-row" style="margin-top:14px">'+
      SEARCH_TABS.map(a=>'<button class="chip chip-tap '+(tab===a[0]?'active':'')+'" data-tab="'+a[0]+'">'+a[1]+'</button>').join('')+'</div>':'')+
    '<div id="gres" style="margin-top:18px"></div><div style="height:20px"></div></div>';
  const qi=$('#gq',el);
  qi.focus();
  qi.addEventListener('input',debounce(()=>{
    const v=qi.value;
    location.replace('#/buscar?q='+encodeURIComponent(v)+(tab!=='todo'?'&tab='+tab:''));
    render();
    setTimeout(()=>{ const n=$('#gq'); if(n){ n.focus(); n.setSelectionRange(v.length,v.length); } },5);
  },280));
  const gc=$('#gclear',el);
  if(gc) gc.onclick=()=>{ location.replace('#/buscar'); render(); };
  el.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{
    location.replace('#/buscar?q='+encodeURIComponent(q)+'&tab='+b.dataset.tab); render();
  });
  const res=$('#gres',el);
  if(!q){
    const saved=S.savedSearches||[];
    res.innerHTML=(saved.length?
      '<div class="section-head" style="margin-top:0"><div class="h2">Búsquedas guardadas</div></div>'+
      '<div class="list">'+savedSearchRows(saved)+'</div>':'')+
      '<div class="section-head"'+(saved.length?'':' style="margin-top:0"')+'><div class="h2">Búsquedas sugeridas</div></div>'+
      '<div class="chip-row" style="flex-wrap:wrap;overflow:visible">'+['gracia','fe','bautismo','santidad','Espíritu Santo','amor','paz','pecado'].map(t=>
      '<button class="chip chip-tap" data-sq="'+esc(t)+'">'+esc(t)+'</button>').join('')+'</div>'+
      '<p class="tiny" style="margin-top:22px;line-height:1.7">La búsqueda ignora mayúsculas, tildes y pequeñas diferencias de escritura.</p>';
    bindSavedSearches(res);
    res.querySelectorAll('[data-sq]').forEach(b=>b.onclick=()=>{ location.replace('#/buscar?q='+encodeURIComponent(b.dataset.sq)); render(); });
    return;
  }
  const out=[];
  if(tab==='todo'||tab==='biblia'){
    const hits=searchBible(q,tab==='todo'?14:80);
    if(hits.length) out.push({title:'Biblia',count:hits.length,items:hits.map(h=>({
      icon:'book',title:refLabel(h.book,h.chapter,h.verse),sub:h.text,go:()=>go('#/leer/'+h.book+'/'+h.chapter+'/'+h.verse)
    }))});
  }
  if(tab==='todo'||tab==='palabras'){
    const hits=S.words.filter(w=>fuzzyMatch(w.term+' '+(w.meaning||'')+' '+(w.context||''),q));
    if(hits.length) out.push({title:'Palabras',count:hits.length,items:hits.map(w=>({
      icon:'type',title:w.term,sub:(w.meaning||'').slice(0,80),go:()=>go('#/palabra/'+w.id)
    }))});
  }
  if(tab==='todo'||tab==='doctrinas'){
    const hits=S.doctrines.filter(d=>fuzzyMatch(d.title+' '+(d.summary||'')+' '+(d.official||''),q));
    if(hits.length) out.push({title:'Doctrinas',count:hits.length,items:hits.map(d=>({
      icon:'shield',title:d.title,sub:d.summary||'',go:()=>go('#/doctrina/'+d.id)
    }))});
  }
  if(tab==='todo'||tab==='notas'){
    const hits=S.notes.filter(n=>!n.deletedAt&&(fuzzyMatch(n.title||'',q)||fuzzyMatch(stripTags(n.content),q)));
    if(hits.length) out.push({title:'Mis notas',count:hits.length,items:hits.map(n=>({
      icon:'note',title:n.title||stripTags(n.content).slice(0,50)||'Nota',sub:snippet(stripTags(n.content),q),go:()=>go('#/nota/'+n.id)
    }))});
  }
  if(tab==='todo'||tab==='estudios'){
    const hits=S.studies.filter(s=>!s.deletedAt&&(fuzzyMatch(s.title||'',q)||fuzzyMatch(stripTags(blocksToHtml(s.blocks||[])),q)));
    if(hits.length) out.push({title:'Mis estudios',count:hits.length,items:hits.map(s=>({
      icon:'layers',title:s.title||'Sin título',sub:snippet(stripTags(blocksToHtml(s.blocks||[])),q),go:()=>go('#/estudio/'+s.id)
    }))});
  }
  if(tab==='todo'||tab==='explorar'){
    const hits=S.explore.filter(x=>fuzzyMatch(x.title+' '+x.body,q));
    if(hits.length) out.push({title:'Explorar',count:hits.length,items:hits.map(x=>({
      icon:'compass',title:x.title,sub:x.type+' · '+x.body.slice(0,70),go:()=>go('#/entrada/'+x.id)
    }))});
  }
  if(!out.length){
    res.innerHTML='<div class="empty">'+ic('search')+'<p>Sin resultados para «'+esc(q)+'»</p></div>';
    return;
  }
  res.innerHTML=out.map((g,gi)=>'<div class="section-head" style="margin-top:'+(gi===0?0:24)+'px">'+
    '<div class="h2">'+esc(g.title)+'</div><span class="tiny">'+g.count+'</span></div>'+
    '<div class="list">'+g.items.slice(0,tab==='todo'?8:60).map((it,i)=>
      '<button class="row" data-g="'+gi+':'+i+'"><div class="row-ic">'+ic(it.icon)+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(it.title)+'</div>'+
      '<div class="row-s" style="white-space:normal">'+highlight(it.sub||'',q)+'</div></div></button>').join('')+'</div>').join('');
  res.querySelectorAll('[data-g]').forEach(b=>{
    const p=b.dataset.g.split(':').map(Number);
    const g=out[p[0]];
    if(g) b.onclick=g.items[p[1]].go;
  });
};
function snippet(text,q){
  if(!text) return '';
  const nq=norm(q);
  const idx=norm(text).indexOf(nq);
  if(idx<0) return text.slice(0,110)+(text.length>110?'…':'');
  const start=Math.max(0,idx-45);
  return (start>0?'…':'')+text.slice(start,start+130)+(start+130<text.length?'…':'');
}
function searchBible(q,limit){
  const out=[]; const nq=norm(q);
  if(!nq) return out;
  const sources=[];
  if(S.settings.versionId==='rv1909'){
    Object.keys(PD_TEXT).forEach(bk=>{ Object.keys(PD_TEXT[bk]).forEach(ch=>sources.push([bk,+ch,PD_TEXT[bk][ch]])); });
  }
  if(S.bible){
    const vid=S.settings.versionId;
    if(S.bible[vid]){
      Object.keys(S.bible[vid]).forEach(bk=>{
        Object.keys(S.bible[vid][bk]).forEach(ch=>{
          if(sources.some(s=>s[0]===bk&&s[1]===+ch)) return;
          sources.push([bk,+ch,S.bible[vid][bk][ch]]);
        });
      });
    }
  }
  const bd=bundledData(S.settings.versionId);
  if(bd){
    Object.keys(bd).forEach(bk=>{
      Object.keys(bd[bk]).forEach(ch=>{
        if(sources.some(s=>s[0]===bk&&s[1]===+ch)) return;
        sources.push([bk,+ch,bd[bk][ch]]);
      });
    });
  }
  for(const [bk,ch,arr] of sources){
    let vn=0;
    for(const it of arr){
      if(it && typeof it==='object' && it.h) continue;
      vn++;
      const t=it||'';
      if(norm(t).includes(nq)||fuzzyMatch(t,q)){
        out.push({book:bk,chapter:ch,verse:vn,text:t});
        if(out.length>=limit) return out;
      }
    }
  }
  return out;
}

function notifTimeLabel(){
  return 'Aviso diario · '+String(S.settings.dailyNotifHour).padStart(2,'0')+':'+String(S.settings.dailyNotifMinute).padStart(2,'0');
}
function openNotifTimePicker(onSaved){
  let hh=S.settings.dailyNotifHour, mm=S.settings.dailyNotifMinute;
  Layers.openSheet((head,body)=>{
    head.innerHTML='<div class="h2" style="flex:1">Hora del aviso</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    body.innerHTML=
      '<div class="tiny" style="font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--text-3);margin-bottom:8px">Hora</div>'+
      '<div class="time-grid">'+Array.from({length:24},(_,i)=>'<button class="chap-cell" data-h="'+i+'">'+String(i).padStart(2,'0')+'</button>').join('')+'</div>'+
      '<div class="tiny" style="font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--text-3);margin:18px 0 8px">Minutos</div>'+
      '<div class="time-grid mins">'+Array.from({length:12},(_,i)=>i*5).map(v=>'<button class="chap-cell" data-m="'+v+'">'+String(v).padStart(2,'0')+'</button>').join('')+'</div>'+
      '<div style="display:flex;gap:10px;margin-top:22px"><button class="btn btn-block" id="tCancel">Cancelar</button>'+
      '<button class="btn btn-primary btn-block" id="tOk">Guardar</button></div>';
    const paint=()=>{
      body.querySelectorAll('[data-h]').forEach(c=>c.classList.toggle('on',+c.dataset.h===hh));
      body.querySelectorAll('[data-m]').forEach(c=>c.classList.toggle('on',+c.dataset.m===mm));
    };
    paint();
    body.querySelectorAll('[data-h]').forEach(c=>c.onclick=()=>{ hh=+c.dataset.h; paint(); haptic('light'); });
    body.querySelectorAll('[data-m]').forEach(c=>c.onclick=()=>{ mm=+c.dataset.m; paint(); haptic('light'); });
    head.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    body.querySelector('#tCancel').onclick=()=>{ haptic('light'); Layers.closeSheet(); };
    body.querySelector('#tOk').onclick=()=>{
      S.settings.dailyNotifHour=hh; S.settings.dailyNotifMinute=mm;
      save('settings'); Notif.schedule30(); haptic('success');
      toast('Aviso diario a las '+String(hh).padStart(2,'0')+':'+String(mm).padStart(2,'0'),'bell');
      Layers.closeSheet();
      if(onSaved) onSaved();
    };
  });
}
View.admin=function(el){
  setTopbar({title:'Panel',actions:[]});
  el.innerHTML='<div class="page-wide">'+
    '<div style="padding:22px 0 4px"><h1 class="h1">Panel</h1><p class="sub">Administra el contenido de tu biblioteca.</p></div>'+
    '<div class="section-head"><div class="h2">Contenido</div></div>'+
    '<div class="stat-grid">'+
      [['Palabras',S.words.length,'#/admin/palabras','type'],['Doctrinas',S.doctrines.length,'#/admin/doctrinas','shield'],
       ['Explorar',S.explore.length,'#/admin/explorar','compass'],['Versículo del día',S.vod.length,'#/admin/vod','sparkle'],
       ['Versiones',(S.versions||[]).length,'#/admin/versiones','book']].map(a=>
      '<button class="stat" data-go="'+a[2]+'" style="cursor:pointer;text-align:left">'+
      '<div style="color:var(--accent);margin-bottom:10px">'+ic(a[3])+'</div>'+
      '<div class="stat-n">'+a[1]+'</div><div class="stat-l">'+a[0]+'</div></button>').join('')+
    '</div>'+
    '<div class="section-head"><div class="h2">Notificaciones</div></div>'+
    '<div class="card">'+
      '<div class="switch"><div><div class="switch-txt">Versículo del día</div><div class="switch-sub">A la hora que elijas</div></div>'+
      '<div class="tgl '+(S.settings.dailyNotif?'on':'')+'" id="pNotifTgl"></div></div>'+
      '<div id="pNotifRange" style="display:'+(S.settings.dailyNotif?'block':'none')+'">'+
        '<button class="btn btn-block" id="pNotifTime" style="margin-top:14px">'+ic('clock')+' '+notifTimeLabel()+'</button>'+
        '<p class="tiny" style="line-height:1.6;margin-top:8px">Se programan las próximas 30 notificaciones y se renuevan cada vez que abres la app.</p>'+
      '</div>'+
    '</div>'+
    '<div class="section-head"><div class="h2">Datos</div></div>'+
    '<div class="list"><button class="row" data-go="#/ajustes"><div class="row-ic">'+ic('upload')+'</div>'+
      '<div class="row-main"><div class="row-t">Importar / exportar</div><div class="row-s">Copia completa y biblioteca bíblica</div></div>'+ic('chev','row-x')+'</button></div>'+
    '<div style="height:20px"></div></div>';
  el.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));

  const pT=$('#pNotifTime',el);
  if(pT) pT.onclick=()=>openNotifTimePicker(()=>render());
  const pTgl=$('#pNotifTgl',el);
  if(pTgl) pTgl.onclick=async()=>{
    const ok=await toggleDailyNotif(!S.settings.dailyNotif);
    if(!ok) return;
    haptic('light');
    pTgl.classList.toggle('on',S.settings.dailyNotif);
    const rg=$('#pNotifRange',el);
    if(rg) rg.style.display=S.settings.dailyNotif?'block':'none';
    toast(S.settings.dailyNotif?'Notificación diaria activada a las '+String(S.settings.dailyNotifHour).padStart(2,'0')+':'+String(S.settings.dailyNotifMinute).padStart(2,'0'):'Notificación desactivada','bell');
  };
};

View.adminList=function(el,route){
  const kind=route[1];
  const cfg={
    palabras:{title:'Palabras',arr:S.words,fields:['term','strong','meaning','context','synonyms'],labels:['Término','Transliteración','Significado','Contexto','Sinónimos'],route:'#/palabra/'},
    doctrinas:{title:'Doctrinas',arr:S.doctrines,fields:['title','summary','official','officialSource'],labels:['Título','Resumen','Contenido oficial','Fuente'],route:'#/doctrina/'},
    explorar:{title:'Explorar',arr:S.explore,fields:['title','type','body'],labels:['Título','Tipo','Cuerpo'],route:'#/entrada/'},
    vod:{title:'Versículo del día',arr:S.vod,fields:['book','chapter','verse','reflection'],labels:['Libro (id)','Capítulo','Versículo','Reflexión'],route:null}
  }[kind];
  if(!cfg){ el.innerHTML='<div class="page"><div class="empty">'+ic('info')+'<p>Sección no válida</p></div></div>'; return; }
  setTopbar({title:cfg.title,back:true,actions:[
    {icon:'plus',title:'Añadir',onClick:()=>openAdminEditor(kind,null,cfg)}
  ]});
  el.innerHTML='<div class="page">'+
    '<div style="padding:18px 0 4px"><h1 class="h1">'+esc(cfg.title)+'</h1><p class="sub">'+cfg.arr.length+' entradas.</p></div>'+
    '<div class="searchbar" style="margin-top:14px">'+ic('search')+'<input id="aq" placeholder="Filtrar…"></div>'+
    '<div class="list" style="margin-top:14px" id="alist"></div><div style="height:20px"></div></div>';
  const list=$('#alist',el);
  const paint=q=>{
    const items=cfg.arr.filter(o=>!q||fuzzyMatch(JSON.stringify(o),q));
    list.innerHTML=items.length?items.map(o=>
      '<div class="row" data-id="'+o.id+'"><div class="row-ic">'+ic('note')+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(o.term||o.title||(o.book?refLabel(o.book,o.chapter,o.verse):'Entrada'))+'</div>'+
      '<div class="row-s">'+esc((o.meaning||o.summary||o.body||o.reflection||'').slice(0,70))+'</div></div>'+
      '<button class="icon-btn" data-ed="'+o.id+'">'+ic('note')+'</button>'+
      '<button class="icon-btn" data-rm="'+o.id+'">'+ic('trash')+'</button></div>').join(''):'<p class="tiny" style="padding:8px">Sin entradas.</p>';
    list.querySelectorAll('[data-ed]').forEach(b=>b.onclick=e=>{
      e.stopPropagation(); openAdminEditor(kind,cfg.arr.find(x=>x.id===b.dataset.ed),cfg);
    });
    list.querySelectorAll('[data-rm]').forEach(b=>b.onclick=async e=>{
      e.stopPropagation();
      const ok=await confirmDialog('Eliminar','Esta acción no se puede deshacer.','Eliminar');
      if(ok){
        const i=cfg.arr.findIndex(x=>x.id===b.dataset.rm);
        if(i>=0) cfg.arr.splice(i,1);
        save(kind); paint($('#aq',el).value.trim()); toast('Eliminado','trash');
      }
    });
    list.querySelectorAll('[data-id]').forEach(r=>r.onclick=()=>{
      if(cfg.route) go(cfg.route+r.dataset.id);
      else openAdminEditor(kind,cfg.arr.find(x=>x.id===r.dataset.id),cfg);
    });
  };
  paint('');
  $('#aq',el).addEventListener('input',e=>paint(e.target.value.trim()));
};

function openAdminEditor(kind,obj,cfg){
  const isNew=!obj;
  const draft=obj?JSON.parse(JSON.stringify(obj)):{id:uid(),createdAt:Date.now()};
  Layers.openSheet((h,b)=>{
    h.innerHTML='<div class="h2" style="flex:1">'+(isNew?'Nueva entrada':'Editar')+'</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    b.innerHTML=cfg.fields.map((f,i)=>'<div class="field"><label>'+esc(cfg.labels[i])+'</label>'+
      (['meaning','context','official','body','reflection'].includes(f)
        ?'<textarea class="textarea" data-f="'+f+'" '+(f==='official'?'style="min-height:140px"':'')+'>'+esc(draft[f]||'')+'</textarea>'
        :'<input class="input" data-f="'+f+'" value="'+esc(draft[f]||'')+'">')+'</div>').join('')+
      '<div class="field"><label>Referencias (jhn 3:16)</label><textarea class="textarea" data-refs>'+(draft.refs||[]).map(r=>r[0]+' '+r[1]+(r[2]?':'+r[2]:'')).join('\n')+'</textarea></div>'+
      '<div style="display:flex;gap:10px"><button class="btn btn-block" data-close2>Cancelar</button><button class="btn btn-primary btn-block" id="save">Guardar</button></div>';
    h.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    b.querySelector('[data-close2]').onclick=()=>Layers.closeSheet();
    b.querySelector('#save').onclick=()=>{
      b.querySelectorAll('[data-f]').forEach(inp=>{ draft[inp.dataset.f]=inp.value; });
      const rt=b.querySelector('[data-refs]').value;
      draft.refs=rt.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{
        const m=l.match(/^(\S+)\s+(\d+)(?::(\d+))?$/); if(!m) return null;
        const bk=bookByName(m[1]);
        return bk?[bk.id,parseInt(m[2],10),m[3]?parseInt(m[3],10):null]:null;
      }).filter(Boolean);
      if(kind==='vod'){
        const b2=bookByName(draft.book);
        draft.book=b2?b2.id:draft.book;
        draft.chapter=parseInt(draft.chapter,10)||1;
        draft.verse=parseInt(draft.verse,10)||1;
      }
      if(isNew) cfg.arr.push(draft);
      else { const i=cfg.arr.findIndex(x=>x.id===draft.id); cfg.arr[i]=draft; }
      save(kind); haptic('success'); Layers.closeSheet(); flashSave(); render(); toast('Guardado','check');
    };
  });
}

View.adminVersions=function(el){
  setTopbar({title:'Versiones',back:true,actions:[]});
  el.innerHTML='<div class="page">'+
    '<div style="padding:18px 0 4px"><h1 class="h1">Versiones bíblicas</h1><p class="sub">Cada versión es una fuente independiente con su propia licencia.</p></div>'+
    '<div class="list" style="margin-top:16px">'+(S.versions||[]).map(v=>
      '<div class="row"><div class="row-ic">'+ic('book')+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(v.name)+(v.sample?' <span class="tag tag-mut" style="margin-left:6px">muestra</span>':'')+'</div>'+
      '<div class="row-s">'+esc(v.abbr)+' · '+esc(v.license)+' · '+esc(v.lang)+'</div></div>'+
      ((S.versions.length>1)?'<button class="icon-btn" data-rm="'+v.id+'" title="Quitar de la lista">'+ic('trash')+'</button>':'')+
      '</div>').join('')+'</div>'+
    '<div class="card" style="margin-top:24px;background:var(--bg-sunken);box-shadow:none">'+
      '<div class="h3" style="margin-bottom:10px">Textos incluidos</div>'+
      '<p class="tiny" style="line-height:1.75;margin:0">Las versiones con licencia <b>Incluida en la app</b> ya vienen dentro de Study Berea: se cargan solas al elegirlas y funcionan sin conexión.</p>'+
    '</div><div style="height:20px"></div></div>';
  el.querySelectorAll('[data-rm]').forEach(b=>b.onclick=async()=>{
    const ok=await confirmDialog('Eliminar versión','Se eliminará de tu lista. El texto importado se conserva.','Eliminar');
    if(ok){
      S.versions=S.versions.filter(v=>v.id!==b.dataset.rm); save('versions');
      if(S.settings.versionId===b.dataset.rm){ S.settings.versionId=S.versions[0].id; save('settings'); }
      haptic('light'); render();
    }
  });
};

View.settings=function(el){
  setTopbar({title:'Ajustes',back:true,actions:[]});
  const st=S.settings;
  let bytes=0;
  try{ bytes=Store_keys_bytes(); }catch(e){}
  const streak=Data.streakDays();
  el.innerHTML='<div class="page">'+
    '<div style="padding:18px 0 4px"><h1 class="h1">Ajustes</h1></div>'+
    '<div class="section-head" style="margin-top:20px"><div class="h2">Apariencia</div></div>'+
    '<div class="card"><div class="switch"><div><div class="switch-txt">Tema</div><div class="switch-sub">Claro, oscuro o sistema</div></div></div>'+
      '<div class="chip-row" style="margin-top:10px">'+[['light','Claro'],['dark','Oscuro'],['auto','Sistema']].map(a=>
        '<button class="chip chip-tap '+(st.theme===a[0]?'active':'')+'" data-theme="'+a[0]+'">'+a[1]+'</button>').join('')+'</div>'+
      '<div class="divider"></div><button class="btn btn-block" id="openRead">'+ic('type')+' Ajustes de lectura</button></div>'+
    '<div class="section-head"><div class="h2">Editor</div></div>'+
    '<div class="card"><div class="switch"><div><div class="switch-txt">Auto-insertar referencias</div>'+
      '<div class="switch-sub">Al escribir “Ro 6:4 ” se convierte en bloque</div></div>'+
      '<div class="tgl '+(st.autoEmbedRefs?'on':'')+'" id="autoEmbTgl"></div></div></div>'+
    '<div class="section-head"><div class="h2">Notificaciones</div></div>'+
    '<div class="card">'+
      '<div class="switch"><div><div class="switch-txt">Versículo del día</div><div class="switch-sub">Una notificación diaria con el versículo</div></div>'+
      '<div class="tgl '+(st.dailyNotif?'on':'')+'" id="notifTgl"></div></div>'+
      '<div id="notifRange" style="display:'+(st.dailyNotif?'block':'none')+'">'+
        '<button class="btn btn-block" id="notifTime" style="margin-top:14px">'+ic('clock')+' '+notifTimeLabel()+'</button>'+
        '<p class="tiny" style="line-height:1.6;margin-top:8px">Se programan las próximas 30 notificaciones. Se renovarán cada vez que abras la app.</p>'+
      '</div>'+
      '<button class="btn btn-block" id="notifTest" style="margin-top:12px">'+ic('bell')+' Enviar notificación de prueba</button>'+
    '</div>'+
    '<div class="section-head"><div class="h2">Identidad</div></div>'+
    '<div class="card"><div class="field" style="margin-bottom:0"><label>Tu nombre (opcional)</label>'+
      '<input class="input" id="nameInp" value="'+esc(st.name||'')+'" placeholder="Cómo quieres que te salude"></div></div>'+
    '<div class="section-head"><div class="h2">Tu ritmo</div></div>'+
    '<div class="card"><div style="display:flex;align-items:center;gap:14px">'+
      '<div class="row-ic" style="width:44px;height:44px;flex:0 0 44px">'+ic('sparkle')+'</div>'+
      '<div class="row-main"><div class="row-t" style="font-size:16px">'+streak+' '+(streak===1?'día':'días')+' seguidos</div>'+
      '<div class="row-s">Días con lectura registrada</div></div></div></div>'+
    '<div class="section-head"><div class="h2">Biblioteca bíblica</div></div>'+
    '<div class="list"><button class="row" data-go="#/admin/versiones"><div class="row-ic">'+ic('book')+'</div>'+
      '<div class="row-main"><div class="row-t">Versiones</div>'+
      '<div class="row-s">'+(S.versions||[]).length+' versión'+((S.versions||[]).length>1?'es':'')+' · '+activeVersion().name+'</div></div>'+ic('chev','row-x')+'</button></div>'+
    '<div class="section-head"><div class="h2">Datos</div></div>'+
    '<div class="card"><div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">'+
      '<div class="row-ic" style="background:'+(navigator.onLine?'color-mix(in srgb,var(--ok) 14%,transparent)':'var(--bg-sunken)')+';color:'+(navigator.onLine?'var(--ok)':'var(--text-3)')+'">'+ic(navigator.onLine?'cloud':'wifiOff')+'</div>'+
      '<div class="row-main"><div class="row-t">'+(navigator.onLine?'Con conexión':'Sin conexión')+'</div>'+
      '<div class="row-s">La app funciona completamente offline</div></div></div>'+
      '<div class="tiny" style="line-height:1.75;color:var(--text-2);margin-bottom:14px">Tus datos viven en este dispositivo. Exporta una copia y vuelve a importarla en otro.</div>'+
      '<div style="display:flex;gap:10px"><button class="btn btn-block" id="expAll">'+ic('download')+' Exportar</button>'+
      '<button class="btn btn-block" id="impAll">'+ic('upload')+' Importar</button></div></div>'+
    '<div class="section-head"><div class="h2">Almacenamiento</div></div>'+
    '<div class="card"><div class="stat-grid" style="grid-template-columns:repeat(2,1fr)">'+
      '<div class="stat" style="border:0;padding:0"><div class="stat-n">'+(bytes/1024).toFixed(1)+'<span style="font-size:14px"> KB</span></div><div class="stat-l">Datos locales</div></div>'+
      '<div class="stat" style="border:0;padding:0"><div class="stat-n">'+(S.notes.length+S.studies.length+S.highlights.length+S.favorites.length)+'</div><div class="stat-l">Elementos</div></div></div>'+
      '<div class="divider"></div><button class="btn btn-block btn-danger" id="wipe">'+ic('trash')+' Borrar todos mis datos</button></div>'+
    '<div class="section-head"><div class="h2">Acerca de</div></div>'+
    '<div class="card"><p class="tiny" style="line-height:1.75;margin:0;color:var(--text-2)">'+
      '<b style="color:var(--text)">Study Berea</b> · Biblioteca bíblica personal.<br>Offline-first. Sin IA generativa. Sin contenido doctrinal inventado.<br>'+
      'El texto bíblico incluido es de dominio público (Reina-Valera 1909).</p></div>'+
    '<div style="height:28px"></div></div>';

  function Store_keys_bytes(){
    let total=0;
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k && k.indexOf('berea.v1.')===0) total += (localStorage.getItem(k)||'').length;
    }
    return total;
  }

  el.querySelectorAll('[data-theme]').forEach(b=>b.onclick=()=>{
    S.settings.theme=b.dataset.theme; save('settings'); applyTheme(b.dataset.theme); haptic('light'); render();
  });
  $('#openRead',el).onclick=openReadingSettings;
  el.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
  const ni=$('#nameInp',el);
  ni.addEventListener('input',debounce(()=>{ S.settings.name=ni.value.trim(); save('settings'); flashSave(); },500));

  const nTgl = $('#notifTgl', el);
  const nRange = $('#notifRange', el);
  nTgl.onclick = async ()=>{
    const on = !S.settings.dailyNotif;
    const ok = await toggleDailyNotif(on);
    if(!ok) return;
    nTgl.classList.toggle('on', S.settings.dailyNotif);
    nRange.style.display = S.settings.dailyNotif ? 'block' : 'none';
    toast(S.settings.dailyNotif ? 'Notificación diaria activada' : 'Notificación desactivada','bell');
  };
  const nTime = $('#notifTime', el);
  if(nTime) nTime.onclick = ()=>openNotifTimePicker(()=>render());
  const nTest = $('#notifTest', el);
  if(nTest) nTest.onclick = async ()=>{
    const p = Notif.plugin();
    if(!p){ toast('Notificaciones solo en la app instalada','info'); return; }
    const ok = await Notif.ensurePermission();
    if(!ok){ toast('Permiso de notificaciones denegado','bell'); return; }
    try{
      const in5 = new Date(Date.now() + 5000);
      await p.schedule({ notifications:[{
        id: 999,
        title: 'Study Berea',
        body: 'Esta es una notificación de prueba',
        schedule: { at: in5 },
        smallIcon: 'ic_stat_icon'
      }]});
      toast('Notificación enviada en 5 s','bell');
    }catch(e){ console.warn(e); toast('No se pudo enviar','info'); }
  };

  const aeTgl = $('#autoEmbTgl', el);
  if(aeTgl) aeTgl.onclick = ()=>{
    S.settings.autoEmbedRefs = !S.settings.autoEmbedRefs;
    save('settings');
    aeTgl.classList.toggle('on', S.settings.autoEmbedRefs);
    haptic('light');
    toast(S.settings.autoEmbedRefs ? 'Referencias automáticas activadas' : 'Referencias automáticas desactivadas','bookPlus');
  };

  $('#expAll',el).onclick=()=>{
    const payload={
      _app:'berea',_version:1,exportedAt:new Date().toISOString(),
      settings:S.settings,notes:S.notes,studies:S.studies,highlights:S.highlights,
      bookmarks:S.bookmarks,favorites:S.favorites,inbox:S.inbox,relations:S.relations,
      folders:S.folders,words:S.words,doctrines:S.doctrines,explore:S.explore,
      vod:S.vod,history:S.history,versions:S.versions,stats:S.stats,savedSearches:S.savedSearches
    };
    download('berea-'+todayKey()+'.json',JSON.stringify(payload,null,2),'application/json');
    haptic('success'); toast('Copia exportada','download');
  };
  $('#impAll',el).onclick=()=>{
    const inp=document.createElement('input'); inp.type='file'; inp.accept='.json';
    inp.onchange=()=>{
      const f=inp.files[0]; if(!f) return;
      const r=new FileReader();
      r.onload=async()=>{
        try{
          const d=JSON.parse(r.result);
          if(d._app!=='berea'){ toast('Archivo no reconocido','info'); return; }
          const ok=await confirmDialog('Importar copia','Se combinarán los datos del archivo con los actuales.','Importar');
          if(!ok) return;
          const merge=key=>{
            const cur=S[key]||[]; const inc=d[key]||[];
            const ids=new Set(cur.map(x=>x.id));
            inc.forEach(x=>{ if(!ids.has(x.id)) cur.push(x); });
            S[key]=cur; save(key);
          };
          ['notes','studies','highlights','bookmarks','favorites','inbox','relations','folders','words','doctrines','explore','vod','history','savedSearches'].forEach(merge);
          if(d.settings){ S.settings={...S.settings,...d.settings}; save('settings'); }
          if(d.versions){ S.versions=d.versions; save('versions'); }
          applyTheme(S.settings.theme); haptic('success'); render(); toast('Copia importada','check');
        }catch(e){ toast('Archivo no válido','info'); }
      };
      r.readAsText(f);
    };
    inp.click();
  };
  $('#wipe',el).onclick=async()=>{
    const ok=await confirmDialog('Borrar todos los datos','Se eliminarán notas, estudios, resaltados, favoritos y ajustes. Esta acción no se puede deshacer.','Borrar todo');
    if(!ok) return;
    for(const k of ['settings','notes','studies','highlights','bookmarks','favorites','inbox','relations','folders','words','doctrines','explore','vod','bible','history','versions','stats','savedSearches']){
      await NativeStore.del(k);
    }
    location.reload();
  };
};

View.more=function(el){
  setTopbar({title:'Más',actions:[]});
  const pend=S.inbox.filter(i=>!i.done).length;
  const saved=S.savedSearches||[];
  el.innerHTML='<div class="page">'+
    '<div style="padding:22px 0 4px"><h1 class="h1">Más</h1></div>'+
    '<div class="section-head" style="margin-top:20px"><div class="h2">Tu biblioteca</div></div>'+
    '<div class="list">'+
      [['#/notas','Notas','note',S.notes.filter(n=>!n.deletedAt).length+' notas'],
       ['#/estudios','Mis estudios','layers',S.studies.filter(s=>!s.deletedAt).length+' estudios'],
       ['#/inbox','Para estudiar después','inbox',pend+' pendientes'],
       ['#/favoritos','Favoritos y marcadores','star',S.favorites.length+' · '+S.bookmarks.length],
       ['#/doctrina','Doctrina','shield',S.doctrines.length+' entradas'],
       ['#/buscar','Buscar','search','En toda la biblioteca']].map(a=>
      '<button class="row" data-go="'+a[0]+'"><div class="row-ic">'+ic(a[2])+'</div>'+
      '<div class="row-main"><div class="row-t">'+a[1]+'</div><div class="row-s">'+a[3]+'</div></div>'+ic('chev','row-x')+'</button>').join('')+
    '</div>'+
    '<div class="section-head"><div class="h2">Historial de lectura</div><button class="link-btn" id="clearHist">Limpiar</button></div>'+
    '<div class="list">'+(S.history.length?S.history.slice(0,12).map(h=>
      '<button class="row" data-h="'+h.book+'/'+h.chapter+'"><div class="row-ic">'+ic('clock')+'</div>'+
      '<div class="row-main"><div class="row-t">'+esc(refLabel(h.book,h.chapter,h.verse))+'</div>'+
      '<div class="row-s">'+fmtDate(h.at)+'</div></div></button>').join(''):'<p class="tiny" style="padding:8px 14px">Sin historial todavía.</p>')+'</div>'+
    (saved.length?
      '<div class="section-head"><div class="h2">Búsquedas guardadas</div><button class="link-btn" id="allSaved">Ver todas</button></div>'+
      '<div class="list">'+savedSearchRows(saved.slice(0,6))+'</div>':'')+
    '<div class="section-head"><div class="h2">Sistema</div></div>'+
    '<div class="list">'+
      '<button class="row" data-go="#/panel"><div class="row-ic">'+ic('settings')+'</div><div class="row-main"><div class="row-t">Panel</div><div class="row-s">Administrar contenido</div></div>'+ic('chev','row-x')+'</button>'+
      '<button class="row" data-go="#/ajustes"><div class="row-ic">'+ic('settings')+'</div><div class="row-main"><div class="row-t">Ajustes</div><div class="row-s">Tema, lectura, datos</div></div>'+ic('chev','row-x')+'</button>'+
    '</div>'+
    '<div style="height:28px"></div></div>';
  el.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
  el.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{
    const p=b.dataset.h.split('/'); go('#/leer/'+p[0]+'/'+p[1]);
  });
  $('#clearHist',el).onclick=()=>{ S.history=[]; save('history'); haptic('light'); render(); toast('Historial limpiado','trash'); };
  if(saved.length){ bindSavedSearches(el); $('#allSaved',el).onclick=openAllSaved; }
};

function openShareStudy(s){
  const payload={t:s.title,c:s.blocks||[],tags:s.tags||[],at:s.createdAt,_:'berea-study'};
  let encoded='';
  try{ encoded=btoa(unescape(encodeURIComponent(JSON.stringify(payload)))); }catch(e){}
  Layers.openSheet((h,b)=>{
    h.innerHTML='<div class="h2" style="flex:1">Compartir estudio</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    b.innerHTML='<p class="sub" style="margin-bottom:18px">El receptor podrá <b>ver</b> el estudio, pero no editarlo.</p>'+
      '<div class="field"><label>Enlace</label><textarea class="textarea" id="lnk" style="min-height:90px;font-size:12px" readonly>'+esc(location.origin+location.pathname+'#/compartido/'+encoded)+'</textarea></div>'+
      '<button class="btn btn-primary btn-block" style="margin-bottom:8px" id="cplink">'+ic('copy')+' Copiar enlace</button>'+
      '<button class="btn btn-block" style="margin-bottom:8px" id="cphtml">'+ic('copy')+' Copiar como texto</button>'+
      '<button class="btn btn-block" id="dlfile">'+ic('download')+' Descargar .berea</button>';
    h.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    b.querySelector('#cplink').onclick=async()=>{ await copyText(b.querySelector('#lnk').value); haptic('success'); toast('Enlace copiado','copy'); };
    b.querySelector('#cphtml').onclick=async()=>{
      const txt=(s.title||'')+'\n\n'+stripTags(blocksToHtml(s.blocks||[]));
      await copyText(txt); haptic('success'); toast('Contenido copiado','copy');
    };
    b.querySelector('#dlfile').onclick=()=>{
      download((s.title||'estudio').replace(/[^\w\s-]/g,'').slice(0,40)+'.berea',JSON.stringify(payload,null,2),'application/json');
      haptic('success'); toast('Archivo descargado','download');
    };
  });
}

View.shared=function(el,route){
  setTopbar({back:true,title:'Estudio compartido',actions:[]});
  let data=null;
  try{ data=JSON.parse(decodeURIComponent(escape(atob(route[1])))); }catch(e){}
  if(!data){ el.innerHTML='<div class="page"><div class="empty">'+ic('info')+'<p>Enlace no válido</p></div></div>'; return; }
  el.innerHTML='<div class="page">'+
    '<div style="padding:20px 0 6px"><div class="tiny" style="font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)">Compartido</div>'+
    '<h1 class="h1" style="margin-top:6px">'+esc(data.t||'Estudio')+'</h1>'+
    '<p class="sub">Sólo lectura · '+fmtFull(new Date(data.at||Date.now()).getTime())+'</p></div>'+
    '<div class="divider"></div>'+
    '<div class="editor" style="pointer-events:none">'+(data.c&&data.c[0]?data.c[0].html:'')+'</div>'+
    '<div style="height:24px"></div></div>';
};

function openRelateDialog(fromType,fromId,fromLabel){
  const groups=[
    {key:'doctrine',label:'Doctrinas',ic:'shield',arr:S.doctrines,name:d=>d.title},
    {key:'word',label:'Palabras',ic:'type',arr:S.words,name:w=>w.term},
    {key:'explore',label:'Explorar',ic:'compass',arr:S.explore,name:x=>x.title},
    {key:'study',label:'Mis estudios',ic:'layers',arr:S.studies.filter(s=>!s.deletedAt),name:s=>s.title||'Sin título'},
    {key:'note',label:'Mis notas',ic:'note',arr:S.notes.filter(n=>!n.deletedAt),name:n=>n.title||stripTags(n.content).slice(0,40)||'Nota'}
  ];
  Layers.openSheet((h,b)=>{
    h.innerHTML='<div class="h2" style="flex:1">Relacionar</div><button class="icon-btn" data-close>'+ic('close')+'</button>';
    b.innerHTML='<div class="sheet-quote">'+esc(fromLabel)+'</div>'+
      '<div class="field"><label>Buscar</label><input class="input" id="rq" placeholder="Término, doctrina, estudio…"></div><div id="rres"></div>';
    h.querySelector('[data-close]').onclick=()=>Layers.closeSheet();
    const res=b.querySelector('#rres');
    const paint=q=>{
      const html=groups.map(g=>{
        const items=g.arr.filter(o=>!q||fuzzyMatch(g.name(o),q)).slice(0,8);
        if(!items.length) return '';
        return '<div class="tiny" style="font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin:14px 0 8px">'+g.label+'</div>'+
          '<div class="list">'+items.map(o=>'<button class="row" data-l="'+g.key+':'+o.id+'" data-n="'+esc(g.name(o))+'">'+
          '<div class="row-ic">'+ic(g.ic)+'</div><div class="row-main"><div class="row-t">'+esc(g.name(o))+'</div></div>'+ic('link','row-x')+'</button>').join('')+'</div>';
      }).join('');
      res.innerHTML=html||'<p class="tiny" style="padding:10px 0">Sin coincidencias.</p>';
      res.querySelectorAll('[data-l]').forEach(el=>el.onclick=()=>{
        const p=el.dataset.l.split(':');
        Data.relate({type:fromType,id:fromId,label:fromLabel},{type:p[0],id:p[1],label:el.dataset.n});
        haptic('success'); Layers.closeSheet(); render(); toast('Conexión creada','link');
      });
    };
    paint('');
    b.querySelector('#rq').addEventListener('input',e=>paint(e.target.value.trim()));
  });
}
function openEntity(type,id){
  switch(type){
    case 'word': go('#/palabra/'+id); break;
    case 'doctrine': go('#/doctrina/'+id); break;
    case 'explore': go('#/entrada/'+id); break;
    case 'study': go('#/estudio/'+id); break;
    case 'note': go('#/nota/'+id); break;
    case 'chapter':{ const p=id.split('.'); go('#/leer/'+p[0]+'/'+p[1]); break; }
    case 'verse':{ const p=id.split('.'); go('#/leer/'+p[0]+'/'+p[1]+'/'+p[2]); break; }
    default: toast('Tipo desconocido: '+type,'info');
  }
}

/* ============================================================
   BOOT
   ============================================================ */
async function loadPersisted(){
  S.settings = await NativeStore.get('settings') || {...DEFAULT_SETTINGS};
  S.settings = {...DEFAULT_SETTINGS, ...S.settings};
  S.notes     = await NativeStore.get('notes') || [];
  S.studies   = await NativeStore.get('studies') || [];
  S.highlights= await NativeStore.get('highlights') || [];
  S.bookmarks = await NativeStore.get('bookmarks') || [];
  S.favorites = await NativeStore.get('favorites') || [];
  S.inbox     = await NativeStore.get('inbox') || [];
  S.relations = await NativeStore.get('relations') || [];
  S.folders   = await NativeStore.get('folders') || [];
  S.words     = await NativeStore.get('words') || null;
  S.doctrines = await NativeStore.get('doctrines') || null;
  S.explore   = await NativeStore.get('explore') || null;
  S.vod       = await NativeStore.get('vod') || null;
  S.bible     = await NativeStore.get('bible') || null;
  S.history   = await NativeStore.get('history') || [];
  S.versions  = await NativeStore.get('versions') || null;
  S.savedSearches = await NativeStore.get('savedSearches') || [];
  S.stats     = await NativeStore.get('stats') || {openedAt:Date.now(),days:[]};

  let bundledSeededNow=false;
  if(!S.versions){
    S.versions=[{id:'rv1909',name:'Reina-Valera 1909',abbr:'RV1909',lang:'es',license:'Dominio público',source:'Muestra incluida',sample:true}]
      .concat(BUNDLED_VERSIONS.map(v=>Object.assign({},v)));
    bundledSeededNow=true;
    await NativeStore.set('versions',S.versions);
  } else if(!S.settings.bundledSeeded){
    BUNDLED_VERSIONS.forEach(v=>{ if(!S.versions.some(x=>x.id===v.id)) S.versions.push(Object.assign({},v)); });
    bundledSeededNow=true;
    await NativeStore.set('versions',S.versions);
  }
  if(bundledSeededNow || !S.settings.bundledSeeded){
    S.settings.bundledSeeded=true;
    await NativeStore.set('settings',S.settings);
  }
  const needVersion=!S.settings.versionId || !S.versions.some(v=>v.id===S.settings.versionId);
  if(needVersion || (bundledSeededNow && S.settings.versionId==='rv1909')){
    const first=BUNDLED_VERSIONS.find(v=>v.id==='rvr1960')||BUNDLED_VERSIONS[0];
    if(first && S.versions.some(v=>v.id===first.id)){
      S.settings.versionId=first.id;
      await NativeStore.set('settings',S.settings);
    }
  }
  if(!S.words){ S.words=seedWords(); await NativeStore.set('words',S.words); }
  if(!S.doctrines){ S.doctrines=seedDoctrines(); await NativeStore.set('doctrines',S.doctrines); }
  if(!S.explore){ S.explore=seedExplore(); await NativeStore.set('explore',S.explore); }
  if(!S.vod){ S.vod=seedVod(); await NativeStore.set('vod',S.vod); }
}

async function handleNotifClick(data){
  if(!data) return;
  if(data.book && data.chapter && data.verse){
    go('#/leer/'+data.book+'/'+data.chapter+'/'+data.verse);
  }
}

async function boot(){
  await loadPersisted();
  applyTheme(S.settings.theme);
  document.documentElement.style.setProperty('--read-size',S.settings.readSize+'px');
  document.documentElement.style.setProperty('--read-lh',S.settings.readLh);

  mountBottomNav();
  mountFab();

  window.addEventListener('hashchange',()=>{
    const active=document.activeElement;
    if(active && active.isContentEditable) active.blur();
    render();
  });
  window.addEventListener('online',()=>toast('Conexión restaurada','cloud'));
  window.addEventListener('offline',()=>toast('Sin conexión · modo offline','wifiOff'));

  if(isNative && Cap.App){
    Cap.App.addListener('backButton',()=>{
      if(document.body.classList.contains('zen')){ toggleZen(false); return; }
      if($('#sheet').classList.contains('on') || $('#panel').classList.contains('on')){
        Layers.closeAll();
        return;
      }
      const h=location.hash||'#/';
      if(h && h!=='#/' && h!==''){ history.back(); return; }
      Cap.App.exitApp();
    });
    try{
      Cap.App.addListener('appStateChange',({ isActive })=>{
        if(isActive && S.settings.dailyNotif){
          Notif.schedule30();
        }
      });
    }catch(e){}
  }

  if(isNative && Cap.LocalNotifications){
    try{
      Cap.LocalNotifications.addListener('localNotificationActionPerformed', (ev)=>{
        const extra = ev && ev.notification && ev.notification.extra;
        handleNotifClick(extra);
      });
    }catch(e){}
    if(S.settings.dailyNotif) setTimeout(()=>Notif.schedule30(), 1500);
  }

  document.addEventListener('contextmenu',e=>{
    if(!e.target.closest('input, textarea, [contenteditable="true"]')) e.preventDefault();
  });
  let lastTouch=0;
  document.addEventListener('touchend',e=>{
    const now=Date.now();
    if(now-lastTouch<=300) e.preventDefault();
    lastTouch=now;
  },{passive:false});
  document.addEventListener('gesturestart',e=>e.preventDefault());
  document.addEventListener('gesturechange',e=>e.preventDefault());
  document.addEventListener('gestureend',e=>e.preventDefault());

  document.addEventListener('keydown',e=>{
    if(e.target.matches('input,textarea,[contenteditable="true"]')) return;
    if(e.key==='Escape'){ if(document.body.classList.contains('zen')) toggleZen(false); else Layers.closeAll(); }
  });

  if(isNative && Cap.SplashScreen){
    try{ setTimeout(()=>Cap.SplashScreen.hide(), 400); }catch(e){}
  }

  if(!location.hash) location.replace('#/');
  render();
  loadBundled(S.settings.versionId).catch(()=>{});
}

boot().catch(err=>{
  console.error('Boot error',err);
  document.body.innerHTML='<div style="padding:40px;text-align:center;font-family:sans-serif"><h2>Error al iniciar</h2><p>'+esc(err.message)+'</p></div>';
});
