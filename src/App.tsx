import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import { ThreeWorld } from './ThreeWorld';

type Stop = 'intro'|'experience'|'work'|'skills'|'contact';
const stops: {id:Stop; label:string; x:number; y:number; icon:string}[] = [
  {id:'intro',label:'Meet me',x:18,y:73,icon:'01'},
  {id:'experience',label:'Experience',x:37,y:56,icon:'02'},
  {id:'work',label:'Projects',x:59,y:68,icon:'03'},
  {id:'skills',label:'Skills',x:78,y:43,icon:'04'},
  {id:'contact',label:'Contact',x:83,y:78,icon:'05'},
];
const projects = [
  {title:'Stream line Interview',desc:'Video interviewing with real-time calls, scheduling and authentication.',url:'https://remote-interview-platform-pi.vercel.app/'},
  {title:'Gemini ChatGPT Clone',desc:'AI chat application using the Google Gemini API.',url:'https://chat-gpt-sable-five.vercel.app/'},
  {title:'Sorting Visualizer',desc:'Interactive sorting algorithms.',url:'https://legendcyber28.github.io/sorting-visualizer/'},
  {title:'Motivational Webpage',desc:'A front-end motivational quotes site.',url:'https://legendcyber28.github.io/Motivation-poster/'},
  {title:'Crime Prediction Model',desc:'Spatial autoregression and ML comparisons.',url:''},
];
const techTags=['Citrix','ServiceNow','JavaScript','React','C++','HTML/CSS','SQL','Git','ITSM','Python'];
function SkillPlayground(){
 const [items,setItems]=useState(techTags.map((name,i)=>({name,x:11+(i%5)*19,y:26+Math.floor(i/5)*47,vx:0,vy:0})));
 const [running,setRunning]=useState(false);
 const box=useRef<HTMLDivElement|null>(null);
 const raf=useRef<number|null>(null);
 const state=useRef(items);
 useEffect(()=>{state.current=items},[items]);
 useEffect(()=>{if(!running)return;let previous=performance.now();const tick=(now:number)=>{if(now-previous>25){previous=now;const update=state.current.map(b=>{let vx=b.vx*.985,vy=b.vy*.985+.014,x=b.x+vx,y=b.y+vy;if(x<8||x>92){x=Math.max(8,Math.min(92,x));vx*=-.78}if(y<18||y>82){y=Math.max(18,Math.min(82,y));vy*=-.77}return {...b,x,y,vx,vy}});state.current=update;setItems(update)}raf.current=requestAnimationFrame(tick)};raf.current=requestAnimationFrame(tick);return()=>{if(raf.current)cancelAnimationFrame(raf.current)}},[running]);
 function push(e:React.PointerEvent<HTMLDivElement>){if(!box.current)return;const rect=box.current.getBoundingClientRect();const px=(e.clientX-rect.left)/rect.width*100,py=(e.clientY-rect.top)/rect.height*100;state.current=state.current.map(b=>{const dx=b.x-px,dy=b.y-py,dist=Math.hypot(dx,dy)||1;if(dist>28)return b;const force=(28-dist)/28*1.8;return {...b,vx:b.vx+dx/dist*force,vy:b.vy+dy/dist*force}});setRunning(true)}
 return <div className="skill-play" ref={box} onPointerMove={push} onPointerDown={push} aria-label="Interactive skill balls: move your pointer to nudge them"><span className="skill-hint">Nudge the skills</span>{items.map(b=><span className="skill-ball" key={b.name} style={{left:`${b.x}%`,top:`${b.y}%`}}>{b.name}</span>)}</div>
}
function StopContent({id}:{id:Stop}) {
  if(id==='intro') return <><h2>Hi, I'm Prashant.</h2><p>Citrix Support Engineer at HCLTech and a software builder in Nagpur. I make technology easier for people to use.</p></>;
  if(id==='experience') return <><h2>Experience & education</h2><div className="detail-list"><p><strong>Citrix Support Engineer · HCLTech</strong><br/>July 2025 - present. Troubleshoot Citrix Workspace access, virtual app launches, session failures and connectivity issues; coordinate with IT and network teams.</p><p><strong>B.Tech, Computer Science & Engineering</strong><br/>G.H. Raisoni College of Engineering, Nagpur · June 2025 · CGPA 8.43.</p></div></>;
  if(id==='work') return <><h2>Selected projects</h2><div className="project-grid">{projects.map(p=><div className="project" key={p.title}><strong>{p.title}</strong><span>{p.desc}</span>{p.url&&<a href={p.url} target="_blank" rel="noopener noreferrer">Explore project ↗</a>}</div>)}</div></>;
  if(id==='skills') return <><h2>Tools I work with</h2><p>Citrix Workspace · ServiceNow · ITSM · Incident management · C++ · HTML · CSS · JavaScript · SQL · MySQL · Git · GitHub.</p><p>Team Leader at Smart India Hackathon 2023. Solved 150+ DSA problems on LeetCode and GeeksforGeeks.</p><SkillPlayground/></>;
  return <><h2>Let's connect.</h2><p>Open to opportunities in IT support, Citrix and software development.</p><div className="contact-links"><a href="mailto:prashantkatheriya9970@gmail.com">Email ↗</a><a href="https://www.linkedin.com/in/prashant-katheriya" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/legendcyber28" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></>;
}
export function App() {
 const [theme,setTheme]=useState<'teal'|'slate'|'sand'|'dark'>('teal');
 const [active,setActive]=useState<Stop|null>(null);
 const [progress,setProgress]=useState(0);
 const [paused,setPaused]=useState(false);
 const [reduced,setReduced]=useState(false);
 const [look,setLook]=useState({x:0,y:0});
 const [dwell,setDwell]=useState(false);
 const [laps,setLaps]=useState(0);
 const [celebrating,setCelebrating]=useState(false);
 const [visitorName,setVisitorName]=useState(()=>{try{return localStorage.getItem('pk-visitor-name')||''}catch{return ''}});
 const [nameEntry,setNameEntry]=useState(()=>{try{return !localStorage.getItem('pk-visitor-name')}catch{return true}});
 const celebrationTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 function saveVisitorName(){const name=visitorName.trim().slice(0,32);setVisitorName(name);try{if(name)localStorage.setItem('pk-visitor-name',name);else localStorage.removeItem('pk-visitor-name')}catch{}setNameEntry(false)}
 function celebrateLap(){setLaps(v=>v+1);setCelebrating(true);if(celebrationTimer.current)clearTimeout(celebrationTimer.current);celebrationTimer.current=setTimeout(()=>setCelebrating(false),4200)}
 const [sound,setSound]=useState(false);
 const [visits,setVisits]=useState<number|null>(null);
 useEffect(()=>{const timer=setTimeout(()=>{fetch('https://page-views-api.ratneshc.com/api/v1/views?site=legendcyber28.github.io&path=%2Fprashant-3d-portfolio%2F').then(r=>r.ok?r.json():Promise.reject()).then(data=>{if(Number.isFinite(data.views))setVisits(data.views)}).catch(()=>{})},1200);return()=>clearTimeout(timer)},[]);
 const audio=useRef<AudioContext|null>(null);
 const soundRef=useRef(false);
 const soundLoop=useRef<ReturnType<typeof setInterval>|null>(null);
 const ambience=useRef<{source:AudioBufferSourceNode;filter:BiquadFilterNode;gain:GainNode}|null>(null);
 useEffect(()=>{soundRef.current=sound},[sound]);
 const lastStop=useRef(-1);
 const dwellTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const progressRef=useRef(0);
 const pausedRef=useRef(false);
 const dwellRef=useRef(false);
 const reducedRef=useRef(false);
 useEffect(()=>{pausedRef.current=paused},[paused]);
 useEffect(()=>()=>{if(soundLoop.current)clearInterval(soundLoop.current);ambience.current?.source.stop();audio.current?.close()},[]);
 function chime(){if(!soundRef.current||!audio.current)return;const ctx=audio.current;for(const [i,hz] of [659,880].entries()){const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type='sine';osc.frequency.value=hz;gain.gain.setValueAtTime(.0001,ctx.currentTime+i*.08);gain.gain.exponentialRampToValueAtTime(.09,ctx.currentTime+i*.08+.03);gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+i*.08+.24);osc.connect(gain).connect(ctx.destination);osc.start(ctx.currentTime+i*.08);osc.stop(ctx.currentTime+i*.08+.25)}}
 function bikeTick(){const ctx=audio.current;if(!ctx||ctx.state!=='running'||!soundRef.current||pausedRef.current||dwellRef.current)return;
   const t=ctx.currentTime;const noise=ctx.createBuffer(1,Math.round(ctx.sampleRate*.045),ctx.sampleRate);const samples=noise.getChannelData(0);for(let i=0;i<samples.length;i++)samples[i]=(Math.random()*2-1)*Math.exp(-i/samples.length*8);
   const src=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();src.buffer=noise;filter.type='bandpass';filter.frequency.value=370+(Math.random()*130);filter.Q.value=.7;gain.gain.setValueAtTime(.24,t);gain.gain.exponentialRampToValueAtTime(.001,t+.045);src.connect(filter).connect(gain).connect(ctx.destination);src.start(t);src.stop(t+.05);
 }
 function toggleSound(){if(!sound){const ctx=new AudioContext();audio.current=ctx;soundRef.current=true;setSound(true);
    ctx.resume().then(()=>{if(!soundRef.current)return;const buffer=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate),data=buffer.getChannelData(0);let last=0;for(let i=0;i<data.length;i++){last=(last*.985)+(Math.random()*2-1)*.015;data[i]=last}const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();source.buffer=buffer;source.loop=true;filter.type='lowpass';filter.frequency.value=650;gain.gain.value=.65;source.connect(filter).connect(gain).connect(ctx.destination);source.start();ambience.current={source,filter,gain};bikeTick();soundLoop.current=setInterval(bikeTick,380);chime()})
   }else{if(soundLoop.current)clearInterval(soundLoop.current);soundLoop.current=null;ambience.current?.source.stop();ambience.current=null;audio.current?.close();audio.current=null;soundRef.current=false;setSound(false)}}

 useEffect(()=>{dwellRef.current=dwell},[dwell]);
 useEffect(()=>{reducedRef.current=reduced},[reduced]);
 useEffect(()=>{const mq=window.matchMedia('(prefers-reduced-motion: reduce)');setReduced(mq.matches);const fn=()=>setReduced(mq.matches);mq.addEventListener?.('change',fn);return()=>mq.removeEventListener?.('change',fn)},[]);
 useEffect(()=>{if(reduced)return;let prev=performance.now(),raf=0;function frame(now:number){const dt=Math.min((now-prev)/1000,.1);prev=now;if(!pausedRef.current&&!dwellRef.current){const p=(progressRef.current+dt/29)%1;progressRef.current=p;setProgress(p);if(p<dt/29)celebrateLap();const segment=Math.floor(p*stops.length);const fraction=p*stops.length-segment;if(fraction<.04&&lastStop.current!==segment){lastStop.current=segment;setDwell(true);dwellRef.current=true;setActive(stops[segment].id);chime();dwellTimer.current=setTimeout(()=>{if(!pausedRef.current){setActive(null);setDwell(false);dwellRef.current=false}},3300)}}raf=requestAnimationFrame(frame)}raf=requestAnimationFrame(frame);return()=>{cancelAnimationFrame(raf);if(dwellTimer.current)clearTimeout(dwellTimer.current)}},[reduced]);
 const segment=Number.isFinite(progress)?Math.min(stops.length-1,Math.max(0,Math.floor(progress*stops.length)%stops.length)):0;
 const activeIndex=active?stops.findIndex(s=>s.id===active):-1;
 const currentIndex=activeIndex>=0?activeIndex:segment;
 function pauseHere(){if(dwellTimer.current)clearTimeout(dwellTimer.current);setPaused(true);pausedRef.current=true;setDwell(false);dwellRef.current=false;setActive(stops[segment].id)}
 function resume(){setPaused(false);pausedRef.current=false;setDwell(false);dwellRef.current=false;setActive(null)}
 function jump(i:number){if(dwellTimer.current)clearTimeout(dwellTimer.current);progressRef.current=i/stops.length;setProgress(progressRef.current);lastStop.current=i;setDwell(false);dwellRef.current=false;setPaused(true);pausedRef.current=true;setActive(stops[i].id);chime()}
 return <div className={`journey theme-${theme}`}>
  <header className="top"><a href="#world" className="brand">PK<span>.</span></a><span>PRASHANT'S WORLD</span><div className="themes" aria-label="Choose theme">{(['teal','slate','sand','dark'] as const).map(t=><button aria-label={`${t} theme`} aria-pressed={theme===t} title={t} key={t} onClick={()=>setTheme(t)} className={`swatch ${t}`}>{t==='dark'?'☾':''}</button>)}</div></header>
  <main id="world" className="world-wrap">
   {nameEntry&&<div className="welcome-input"><label htmlFor="visitor-name">Want the rider to greet you by name?</label><input id="visitor-name" type="text" maxLength={32} value={visitorName} onChange={e=>setVisitorName(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')saveVisitorName()}} placeholder="Your first name (optional)" autoComplete="given-name"/><button type="button" onClick={saveVisitorName}>Start the ride</button><button type="button" className="skip-name" onClick={()=>{setVisitorName('');try{localStorage.removeItem('pk-visitor-name')}catch{}setNameEntry(false)}}>Skip</button><small>Saved only on this device. Clear or change it anytime.</small></div>}<div className="world-heading"><span className="eyebrow">AN INTERACTIVE PORTFOLIO</span><h1>Ride through my world.</h1><p>{visitorName?`Welcome, ${visitorName}! `:''}The cyclist rides a full loop. Each stop reveals a chapter; pause to explore it.</p></div>
   <div className="world" aria-label="Interactive portfolio map" onPointerMove={e=>{if(e.pointerType==='mouse'){const r=e.currentTarget.getBoundingClientRect();setLook({x:((e.clientX-r.left)/r.width-.5)*14,y:((e.clientY-r.top)/r.height-.5)*8})}}} onPointerLeave={()=>setLook({x:0,y:0})}>
    <ThreeWorld progress={progress} paused={paused||dwell} reduced={reduced} look={look}/>
    <div className="world-tint"/><div className="starfield" aria-hidden="true">{Array.from({length:21},(_,i)=><span key={i} style={{left:`${(i*47)%97}%`,top:`${(i*29)%67}%`,animationDelay:`${i*.17}s`}}/>)}</div>
    <svg className="route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points={[...stops,stops[0]].map(s=>`${s.x},${s.y}`).join(' ')} /></svg>
    {stops.map((s,i)=><button key={s.id} type="button" className={`stop ${currentIndex===i?'selected':''}`} style={{left:`${s.x}%`,top:`${s.y}%`}} onClick={()=>jump(i)} aria-label={`Ride to ${s.label}`}><span className="stop-dot">{s.icon}</span><span className="stop-label">{s.label}</span></button>)}

    {celebrating&&<div className="lap-surprise" role="status"><span className="waving-rider" aria-hidden="true">🚴 👋</span><strong>Thanks for visiting{visitorName?`, ${visitorName}`:''}!</strong><div className="confetti" aria-hidden="true">{Array.from({length:24},(_,i)=><i key={i} style={{'--piece':i} as React.CSSProperties}/>)}</div></div>}<div className="world-caption">{paused?'PAUSED AT A CHAPTER':dwell?'STOPPING TO SHARE A CHAPTER':`RIDING THE LOOP · LAP ${laps+1}`}</div>
   </div>
   <div className="world-actions"><button type="button" className="primary" onClick={paused?resume:pauseHere}>{paused?'Continue riding ▶':'Stop and explore Ⅱ'}</button><button type="button" className="secondary" onClick={()=>jump((segment+1)%stops.length)}>Skip to next chapter →</button><button type="button" className="secondary sound-toggle" onClick={toggleSound} aria-pressed={sound}>{sound?'Sound on · tap to mute 🔊':'Tap for sound 🔊'}</button></div>
   <div className={`reveal ${active?'open':''}`} aria-live="polite">{active&&<article key={active} className="reveal-card"><div className="reveal-top"><span>STOP {String(currentIndex+1).padStart(2,'0')} / 05 · {stops[currentIndex].label.toUpperCase()}</span><button onClick={resume} aria-label="Close detail and continue riding">✕</button></div><StopContent id={active}/><div className="reveal-foot"><button onClick={paused?resume:pauseHere}>{paused?'Continue riding ▶':'Stop here to explore Ⅱ'}</button><span>{paused?'Rider waits until you continue':'Rider continues in a moment'}</span></div></article>}</div>
  </main><footer>PRASHANT KATHERIYA <span><button className="change-name" type="button" onClick={()=>setNameEntry(true)}>Change greeting</button> <span aria-live="polite">{visits===null?'Visitor count loading':`${visits.toLocaleString()} visits`}</span></span></footer>
 </div>;
}
