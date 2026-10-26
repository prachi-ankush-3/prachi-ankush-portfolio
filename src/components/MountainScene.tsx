import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const scenes = [
  {id:'hero', image:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=85', alt:'Snow-covered Himalayan mountain peaks'},
  {id:'about', image:'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=2000&q=80', alt:'High mountain valley at sunrise'},
  {id:'foundations', image:'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2000&q=80', alt:'Rocky mountain ridge above the clouds'},
  {id:'skills', image:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80', alt:'Mountain ridgeline in the distance'},
  {id:'projects', image:'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=2000&q=80', alt:'Mountain expedition landscape'},
  {id:'achievements', image:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80', alt:'High-altitude mountain range'},
  {id:'contact', image:'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2200&q=85', alt:'Sunlit summit above the clouds'},
]
export function MountainScene({scene}:{scene:string}) {
 const ref=useRef<HTMLDivElement>(null)
 useEffect(()=>{
   if(!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
   const ctx=gsap.context(()=>{
    gsap.fromTo(ref.current,{scale:1.04,yPercent:1},{scale:1,yPercent:-2,ease:'none',scrollTrigger:{trigger:ref.current, start:'top bottom',end:'bottom top',scrub:true}})
   },ref)
   return ()=>ctx.revert()
 },[])
 const current=scenes.find(s=>s.id===scene) ?? scenes[0]
 return <div ref={ref} className={`mountain-scene scene-${scene}`} role="img" aria-label={current.alt} style={{backgroundImage:`linear-gradient(180deg,rgba(8,21,34,.2),rgba(8,21,34,.84)),url("${current.image}")`}}><div className="scene-grain" /></div>
}
