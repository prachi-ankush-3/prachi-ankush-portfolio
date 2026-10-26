import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Mountain, MoveUpRight, Download, Code2, Compass, ExternalLink } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import { MountainScene } from './components/MountainScene'
import ProjectCard from './components/ProjectCard'
import { profile } from './data/profile'
import { projects, type ProjectCategory } from './data/projects'
import { foundations, capabilities } from './data/skills'
import { academics, highlights, experience, certifications } from './data/achievements'
gsap.registerPlugin(ScrollTrigger)
const filters = ['All','AI & Computer Vision','Web Development','Android','Cybersecurity','Computer Science'] as const
type Filter = typeof filters[number]
const categoryFor = (f:Filter):ProjectCategory|null => f==='All'?null:f
function go(id:string){document.getElementById(id)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
function SectionIntro({number,kicker,title,copy}:{number:string;kicker:string;title:string;copy:string}){return <div className="section-intro"><div className="section-kicker"><span>{number}</span><i/>{kicker}</div><h2>{title}</h2><p>{copy}</p></div>}
function App(){
 const [filter,setFilter]=useState<Filter>('All'),[showAll,setShowAll]=useState(false)
 const reduced=useReducedMotion()
 const heroRef=useRef<HTMLElement>(null)
 const visibleProjects=useMemo(()=>{const subset=filter==='All'?projects:projects.filter(p=>p.category===categoryFor(filter));return showAll||filter!=='All'?subset:subset.filter(p=>p.featured).slice(0,8)},[filter,showAll])
 useEffect(()=>{
  if(reduced)return
  const ctx=gsap.context(()=>{
   gsap.from('.hero-copy > *',{y:28,opacity:0,duration:.9,stagger:.12,ease:'power3.out',delay:.12})
   gsap.utils.toArray<HTMLElement>('.reveal').forEach(el=>gsap.fromTo(el,{y:28,opacity:0},{y:0,opacity:1,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}}))
   gsap.to('.hero-trekker',{yPercent:-7,ease:'none',scrollTrigger:{trigger:heroRef.current,start:'top top',end:'bottom top',scrub:true}})
  })
  return()=>ctx.revert()
 },[reduced])
 const socialLinks=[{name:'GitHub',url:profile.github,icon:<Github size={18}/>},{name:'LinkedIn',url:profile.linkedin,icon:<Linkedin size={18}/>},{name:'LeetCode',url:profile.leetcodeUrl,icon:<Code2 size={18}/>},{name:'HackerRank',url:profile.hackerRank,icon:<ExternalLink size={18}/>}]
 return <div className="site-shell"><Navbar/>
  <section className="hero" id="hero" ref={heroRef}><MountainScene scene="hero"/><div className="hero-vignette"/><div className="hero-copy"><div className="eyebrow hero-eyebrow"><span className="eyebrow-dot"/>COMPUTER ENGINEERING STUDENT <b>·</b> SOFTWARE DEVELOPER</div><h1>THE SUMMIT IS<br/><em>NOT THE DESTINATION.</em><br/>IT'S THE JOURNEY.</h1><p>I'm Prachi Ankush — a developer who believes every challenge is an opportunity to learn, build, and rise higher.</p><div className="hero-meta"><span>VIT PUNE</span><i/><span>CGPA {profile.cgpa}</span><i/><span>{profile.leetcode} LEETCODE PROBLEMS</span></div><div className="hero-actions"><button className="button button-gold" onClick={()=>go('about')}>START THE JOURNEY <ArrowDown size={16}/></button><button className="button button-ghost" onClick={()=>go('projects')}>EXPLORE MY WORK <ArrowUpRight size={16}/></button></div></div><div className="hero-trekker" aria-hidden="true"><div className="trekker-silhouette"><div className="trekker-pack"/><div className="trekker-head"/><div className="trekker-body"/><div className="trekker-leg leg-one"/><div className="trekker-leg leg-two"/><div className="trekker-pole"/></div></div><div className="hero-coordinate">27°59′ N / 86°55′ E <span>HIMALAYAN RANGE</span></div><button className="scroll-cue" onClick={()=>go('about')}><span>SCROLL TO ASCEND</span><ArrowDown size={15}/></button></section>
  <main>
   <section id="about" className="journey-section about-section"><MountainScene scene="about"/><div className="section-inner about-grid"><div className="reveal"><div className="section-kicker"><span>01</span><i/>BASE CAMP</div><p className="quote-line">Every expert<br/>was once a <em>beginner.</em></p></div><div className="about-copy reveal"><span className="eyebrow">MEET THE DEVELOPER</span><h2>Prachi Ankush</h2><p className="lead">Computer Engineering student at VIT Pune, focused on software development, problem-solving, and building practical technology solutions.</p><p>I enjoy taking an idea from a rough sketch to a working application. From Android development to web tools and computer-vision experiments, each project is another opportunity to learn with purpose.</p><div className="fact-grid"><div><strong>B.Tech</strong><span>Computer Engineering</span></div><div><strong>9.55</strong><span>Current CGPA</span></div><div><strong>200+</strong><span>LeetCode problems</span></div><div><strong>01</strong><span>Android internship</span></div></div><button className="text-link button-link" onClick={()=>go('projects')}>See what I've built <ArrowRight size={16}/></button></div></div></section>
   <section id="foundations" className="journey-section foundation-section"><MountainScene scene="foundations"/><div className="section-inner"><SectionIntro number="02" kicker="FIRST ASCENT" title="Strong foundations. Steady progress." copy="The fundamentals are the footholds that make a harder climb possible."/><div className="foundation-grid">{foundations.map((group,i)=><motion.article className="foundation-card reveal" key={group.title} initial={reduced?false:{opacity:0,y:22}} whileInView={reduced?{}:{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{delay:i*.1,duration:.55}}><div className="trail-number">0{i+1}</div><h3>{group.title}</h3><div className="trail-tags">{group.items.map(item=><span key={item}>{item}</span>)}</div></motion.article>)}</div><div className="trail-note"><Compass size={18}/><span>One concept at a time. One step at a time.</span></div></div></section>
   <section id="skills" className="journey-section skills-section"><MountainScene scene="skills"/><div className="section-inner"><SectionIntro number="03" kicker="TECHNICAL RIDGE" title="Tools for the terrain." copy="A growing toolkit across software, web, mobile, data, and AI — built through coursework and hands-on projects."/><div className="capability-grid">{capabilities.map((c,i)=><article className="capability reveal" key={c.title}><div className="capability-num">0{i+1}</div><h3>{c.title}</h3><div className="capability-tags">{c.items.map(t=><span key={t}>{t}</span>)}</div></article>)}</div></div></section>
   <section id="projects" className="journey-section projects-section"><MountainScene scene="projects"/><div className="section-inner"><SectionIntro number="04" kicker="THE HARD CLIMB" title="Built along the way." copy="A field log of ideas turned into experiments, interfaces, and working software. Open a repository to explore the implementation."/><div className="project-toolbar"><div className="filter-list" role="group" aria-label="Filter projects">{filters.map(f=><button key={f} className={filter===f?'selected':''} onClick={()=>{setFilter(f);if(f!=='All')setShowAll(true)}} aria-pressed={filter===f}>{f}</button>)}</div><span className="project-count">{visibleProjects.length} PROJECT{visibleProjects.length===1?'':'S'}</span></div><div className="projects-grid">{visibleProjects.map((p,i)=><ProjectCard project={p} index={i} key={p.name}/>)}</div>{filter==='All'&&<button className="button button-outline view-all" onClick={()=>setShowAll(v=>!v)}>{showAll?'SHOW FEATURED PROJECTS':'VIEW ALL PROJECTS'} <ArrowRight size={16}/></button>}</div></section>
   
<section id="achievements" className="journey-section achievements-section">
  <MountainScene scene="achievements" />

  <div className="section-inner">
    <SectionIntro
      number="05"
      kicker="ACHIEVEMENT CAMP"
      title="Milestones, not finish lines."
      copy="Every checkpoint reflects effort, practice, and the willingness to keep learning."
    />

    <div className="achievement-columns">
      <div className="timeline-column">
        <span className="eyebrow">ACADEMICS</span>

        <div className="timeline">
          {academics.map((a, i) => (
            <article className="timeline-item reveal" key={a.title}>
              <span className="timeline-dot" />
              <span className="timeline-index">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div>
                <h3>{a.title}</h3>
                <p>{a.place}</p>
                <strong>{a.detail}</strong>
              </div>
            </article>
          ))}
        </div>

        <span className="eyebrow achievement-subhead">EXPERIENCE</span>

        <article className="experience-card reveal">
          <div className="experience-head">
            <div>
              <h3>{experience.title}</h3>
              <p>
                {experience.company} · {experience.location}
              </p>
            </div>
            <span>{experience.period}</span>
          </div>

          <ul>
            {experience.details.map((d, i) => (
              <li key={`${i}-${d}`}>{d}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className="achievement-side">
        <span className="eyebrow">CODING CHECKPOINTS</span>

        {highlights.map((h, i) => (
          <div className="highlight-row reveal" key={h.title}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{h.title}</h3>
              <p>{h.detail}</p>
            </div>
          </div>
        ))}

        <div className="cert-list">
          <span className="eyebrow">CERTIFICATIONS & LEARNING</span>

          {certifications.map((cert) => (
            <a
              key={cert.title}
              className="cert-item"
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View certificate: ${cert.title}`}
            >
              <ArrowUpRight size={15} />
              <span>{cert.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

   <section id="ascent" className="journey-section ascent-section"><MountainScene scene="contact"/><div className="section-inner ascent-inner"><div className="section-kicker"><span>06</span><i/>FINAL ASCENT</div><h2 className="ascent-title reveal">THE NEXT SUMMIT<br/>IS ALWAYS <em>WAITING.</em></h2><p className="ascent-copy reveal">I'm continuously learning, experimenting with new technologies, and building projects that turn ideas into practical solutions.</p><div className="interest-list reveal">{['Software engineering','AI & generative AI','Data Structures & Algorithms','Backend development & APIs','Android development','Cybersecurity fundamentals','Cloud computing','Open-source software'].map((i,n)=><span key={i}><b>0{n+1}</b>{i}</span>)}</div></div></section>
   <section id="contact" className="journey-section contact-section"><MountainScene scene="contact"/><div className="contact-content"><div className="section-kicker"><span>07</span><i/>THE SUMMIT</div><Mountain size={27} strokeWidth={1.2}/><h2>THE SUMMIT IS<br/>JUST ANOTHER <em>BEGINNING.</em></h2><p>Have an interesting idea or opportunity? Let's build something meaningful together.</p><a className="button button-gold" href={`mailto:${profile.email}?subject=${encodeURIComponent('Let\'s connect')}`}>LET'S CONNECT <Mail size={17}/></a><div className="contact-links"><a href={`mailto:${profile.email}`}><Mail size={17}/><span>{profile.email}</span></a>{socialLinks.map(s=>s.url?<a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">{s.icon}<span>{s.name}</span><MoveUpRight size={13}/></a>:<span key={s.name} className="social-missing" title={`Add your ${s.name} URL in src/data/profile.ts`}>{s.icon}<span>{s.name} · add URL</span></span>)}</div><a className="resume-link" href={profile.resumePath} download><Download size={16}/> DOWNLOAD RESUME <span>(ADD YOUR PDF FIRST)</span></a></div></section>
  </main>
  <footer className="footer"><span>PA<span className="gold-dot">.</span></span><p>BUILT WITH CURIOSITY. DRIVEN BY THE CLIMB.</p><span>© {new Date().getFullYear()} PRACHI ANKUSH</span></footer>
 </div>
}
export default App
