import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
const links = [{label:'Journey',id:'about'},{label:'Skills',id:'skills'},{label:'Projects',id:'projects'},{label:'Achievements',id:'achievements'},{label:'Contact',id:'contact'}]
export default function Navbar(){
 const [open,setOpen]=useState(false),[active,setActive]=useState('hero'),[progress,setProgress]=useState(0)
 useEffect(()=>{
  const update=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;setProgress(max>0?window.scrollY/max*100:0)}
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)}),{rootMargin:'-40% 0px -50% 0px'})
  document.querySelectorAll('section[id]').forEach(s=>observer.observe(s));window.addEventListener('scroll',update,{passive:true});update()
  return()=>{observer.disconnect();window.removeEventListener('scroll',update)}
 },[])
 const go=(id:string)=>{document.getElementById(id)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});setOpen(false)}
 return <><div className="journey-progress" style={{transform:`scaleX(${progress/100})`}}/><header className={`navbar ${progress>4?'scrolled':''}`}><button className="wordmark" onClick={()=>go('hero')} aria-label="Go to top">PA<span>.</span></button><nav className={open?'nav-links open':'nav-links'} aria-label="Main navigation">{links.map(l=><button key={l.id} className={active===l.id?'active':''} onClick={()=>go(l.id)}>{l.label}</button>)}</nav><button className="menu-toggle" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></header></>
}
