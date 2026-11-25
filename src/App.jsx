import React, { useMemo, useState } from "react";
import { Routes, Route, Link, NavLink, useNavigate, useParams } from "react-router-dom";
import {
  Search, MapPin, BriefcaseBusiness, Bookmark, BookmarkCheck, ArrowRight,
  Menu, X, LayoutDashboard, FileText, UserRound, Settings, Bell, Plus,
  Clock3, SlidersHorizontal, CheckCircle2, Building2, ChevronDown, LogIn,
  Sparkles, Users, TrendingUp
} from "lucide-react";

const jobs = [
  { id: 1, title: "Frontend Developer", company: "BrightLabs", location: "Bengaluru, India", type: "Full-time", salary: "₹6–9 LPA", category: "Engineering", posted: "2 days ago", level: "Entry level", logo: "B", color: "purple", description: "Build delightful, accessible web experiences with a collaborative product team. You will work closely with designers and backend engineers to ship features used by thousands of customers.", skills: ["React", "JavaScript", "CSS", "Git"] },
  { id: 2, title: "Data Analyst", company: "Northstar Analytics", location: "Hyderabad, India", type: "Full-time", salary: "₹4–7 LPA", category: "Data & Analytics", posted: "1 day ago", level: "Fresher", logo: "N", color: "blue", description: "Turn business data into clear insights. Create dashboards, explore trends, and help teams make informed decisions.", skills: ["SQL", "Python", "Power BI", "Excel"] },
  { id: 3, title: "Python Developer Intern", company: "CodeCraft", location: "Remote", type: "Internship", salary: "₹15k–25k / month", category: "Engineering", posted: "3 days ago", level: "Internship", logo: "C", color: "orange", description: "Join our engineering team to build and maintain Python services, write clean code, and learn modern software development practices.", skills: ["Python", "Django", "REST API", "MySQL"] },
  { id: 4, title: "UI/UX Designer", company: "PixelWorks", location: "Pune, India", type: "Full-time", salary: "₹5–8 LPA", category: "Design", posted: "4 days ago", level: "1–2 years", logo: "P", color: "pink", description: "Design simple and intuitive product experiences. Work from early concepts through prototypes and polished design handoffs.", skills: ["Figma", "Prototyping", "Research", "UI Design"] },
  { id: 5, title: "MERN Stack Developer", company: "Launchpad Tech", location: "Chennai, India", type: "Full-time", salary: "₹5–8 LPA", category: "Engineering", posted: "5 days ago", level: "Entry level", logo: "L", color: "green", description: "Develop responsive applications using MongoDB, Express, React, and Node.js. Collaborate with the team to deliver reliable features.", skills: ["MongoDB", "Express", "React", "Node.js"] },
  { id: 6, title: "Business Development Associate", company: "GrowthHive", location: "Bengaluru, India", type: "Full-time", salary: "₹3–5 LPA", category: "Business", posted: "1 week ago", level: "Fresher", logo: "G", color: "yellow", description: "Build customer relationships, identify new opportunities, and help the sales team grow our customer base.", skills: ["Communication", "Research", "Sales", "CRM"] }
];

const categories = ["All categories", "Engineering", "Data & Analytics", "Design", "Business"];
const initialApplications = [
  { id: 1, jobId: 2, status: "Under review", date: "Nov 21, 2026" },
  { id: 2, jobId: 3, status: "Shortlisted", date: "Nov 19, 2026" }
];

function Brand() {
  return <Link to="/" className="brand"><span className="brand-mark">J</span><span>job<span className="brand-accent">connect</span></span></Link>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header"><div className="container nav-wrap">
    <Brand />
    <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
    <nav className={menuOpen ? "main-nav open" : "main-nav"}>
      <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
      <NavLink to="/jobs" onClick={() => setMenuOpen(false)}>Find jobs</NavLink>
      <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
    </nav>
    <div className="nav-actions"><Link className="login-link" to="/login">Log in</Link><Link className="btn btn-primary btn-small" to="/register">Get started <ArrowRight size={16}/></Link></div>
  </div></header>;
}

function Footer() {
  return <footer className="footer"><div className="container footer-inner"><Brand/><p>Connecting people with opportunities.</p><span>© 2026 JobConnect. Demo project.</span></div></footer>;
}

function JobLogo({ job }) {
  return <div className={`company-logo ${job.color}`}>{job.logo}</div>;
}

function JobCard({ job, saved, onSave, onApply }) {
  return <article className="job-card">
    <div className="job-card-top"><JobLogo job={job}/><button className="icon-button" onClick={() => onSave(job.id)} aria-label="Save job">{saved ? <BookmarkCheck size={19} className="saved-icon"/> : <Bookmark size={19}/>}</button></div>
    <div className="job-company">{job.company} <span className="verified">✓</span></div>
    <h3><Link to={`/jobs/${job.id}`}>{job.title}</Link></h3>
    <div className="job-meta"><span><MapPin size={14}/>{job.location}</span><span><BriefcaseBusiness size={14}/>{job.type}</span></div>
    <div className="job-tags"><span>{job.level}</span><span>{job.category}</span></div>
    <div className="job-card-bottom"><div><strong>{job.salary}</strong><small>{job.posted}</small></div><button className="btn btn-outline btn-small" onClick={() => onApply(job)}>Apply <ArrowRight size={15}/></button></div>
  </article>;
}

function Home({ saved, onSave, onApply }) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const submit = (e) => { e.preventDefault(); navigate(`/jobs?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`); };
  return <>
    <section className="hero"><div className="hero-glow"></div><div className="container hero-grid">
      <div className="hero-copy"><div className="eyebrow"><Sparkles size={15}/> YOUR NEXT CHAPTER STARTS HERE</div><h1>Find a job that<br/><span>moves you forward.</span></h1><p>Discover opportunities from companies that value your skills, ambition, and potential.</p>
        <form className="hero-search" onSubmit={submit}><label><Search size={19}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Job title, skill, or company"/></label><label><MapPin size={19}/><input value={location} onChange={e => setLocation(e.target.value)} placeholder="City or remote"/></label><button className="btn btn-primary" type="submit">Search jobs <ArrowRight size={17}/></button></form>
        <div className="popular"><span>Popular:</span><button onClick={() => navigate("/jobs?q=React")}>React Developer</button><button onClick={() => navigate("/jobs?q=Data")}>Data Analyst</button><button onClick={() => navigate("/jobs?q=Python")}>Python</button></div>
      </div>
      <div className="hero-visual"><div className="visual-card visual-main"><div className="visual-top"><span className="live-dot"></span> Recommended for you <span className="match">98% match</span></div><div className="visual-job"><div className="company-logo purple">B</div><div><b>Frontend Developer</b><small>BrightLabs · Bengaluru</small></div></div><div className="visual-line"></div><div className="visual-stats"><span><small>Salary</small><b>₹6–9 LPA</b></span><span><small>Job type</small><b>Full-time</b></span></div><div className="visual-skills"><span>React</span><span>JavaScript</span><span>CSS</span></div><div className="visual-cta">Your next opportunity is one click away <ArrowRight size={16}/></div></div><div className="float-card float-one"><div className="float-icon"><CheckCircle2 size={18}/></div><div><b>Application sent!</b><small>You're on your way</small></div></div><div className="float-card float-two"><div className="avatar-stack"><i>R</i><i>A</i><i>S</i></div><div><b>2,400+</b><small>new opportunities</small></div></div><div className="hero-orbit"></div></div>
    </div></section>
    <section className="stats-strip"><div className="container stats-grid"><div><strong>2,400+</strong><span>Active opportunities</span></div><div><strong>850+</strong><span>Partner companies</span></div><div><strong>12k+</strong><span>Career connections</span></div><div><strong>4.8/5</strong><span>Candidate satisfaction</span></div></div></section>
    <section className="section"><div className="container"><div className="section-heading"><div><div className="eyebrow dark">HAND-PICKED FOR YOU</div><h2>Featured opportunities</h2><p>Explore roles from teams looking for people like you.</p></div><Link className="text-link" to="/jobs">View all jobs <ArrowRight size={17}/></Link></div><div className="jobs-grid">{jobs.slice(0,3).map(job => <JobCard key={job.id} job={job} saved={saved.includes(job.id)} onSave={onSave} onApply={onApply}/>)}</div></div></section>
    <section className="cta-section"><div className="container cta-box"><div><div className="eyebrow">FOR YOUR NEXT MOVE</div><h2>Your skills deserve<br/>the right opportunity.</h2><p>Create your free profile and start exploring jobs today.</p></div><Link to="/register" className="btn btn-light">Create your profile <ArrowRight size={17}/></Link></div></section>
  </>;
}

function Jobs({ saved, onSave, onApply }) {
  const params = new URLSearchParams(window.location.search);
  const [query, setQuery] = useState(params.get("q") || "");
  const [location, setLocation] = useState(params.get("location") || "");
  const [category, setCategory] = useState("All categories");
  const [type, setType] = useState("All types");
  const filtered = useMemo(() => jobs.filter(job =>
    (`${job.title} ${job.company} ${job.skills.join(" ")}`.toLowerCase().includes(query.toLowerCase())) &&
    job.location.toLowerCase().includes(location.toLowerCase()) &&
    (category === "All categories" || job.category === category) &&
    (type === "All types" || job.type === type)
  ), [query, location, category, type]);
  return <main className="page-section"><div className="container"><div className="page-heading"><div><div className="eyebrow dark">EXPLORE OPPORTUNITIES</div><h1>Find your next job</h1><p>Thoughtful opportunities for your next big move.</p></div><div className="results-pill"><BriefcaseBusiness size={16}/>{filtered.length} jobs found</div></div>
    <div className="filter-bar"><label className="filter-search"><Search/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search job title or skill"/></label><label className="filter-search"><MapPin/><input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location"/></label><select value={category} onChange={e => setCategory(e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select><select value={type} onChange={e => setType(e.target.value)}><option>All types</option><option>Full-time</option><option>Internship</option></select></div>
    <div className="listing-layout"><aside className="filter-sidebar"><h3><SlidersHorizontal size={17}/> Filters</h3><p className="filter-label">JOB TYPE</p>{["All types","Full-time","Internship"].map(t => <label className="check-row" key={t}><input type="radio" name="jobtype" checked={type===t} onChange={() => setType(t)}/>{t}</label>)}<div className="filter-divider"></div><p className="filter-label">CATEGORY</p>{categories.map(c => <label className="check-row" key={c}><input type="radio" name="category" checked={category===c} onChange={() => setCategory(c)}/>{c}</label>)}<button className="clear-btn" onClick={() => {setQuery("");setLocation("");setCategory("All categories");setType("All types");}}>Clear all filters</button></aside>
      <div className="listing-results"><div className="listing-top"><span>Showing <b>{filtered.length}</b> opportunities</span><span className="sort-label">Sort by: <b>Most relevant <ChevronDown size={14}/></b></span></div>{filtered.length ? <div className="jobs-grid">{filtered.map(job => <JobCard key={job.id} job={job} saved={saved.includes(job.id)} onSave={onSave} onApply={onApply}/>)}</div> : <div className="empty-state"><Search size={30}/><h3>No jobs found</h3><p>Try a different keyword or clear your filters.</p></div>}</div>
    </div></div></main>;
}

function JobDetails({ saved, onSave, onApply }) {
  const { id } = useParams();
  const job = jobs.find(j => j.id === Number(id));
  if (!job) return <main className="page-section container"><div className="empty-state"><h2>Job not found</h2><Link to="/jobs" className="text-link">Browse all jobs</Link></div></main>;
  return <main className="page-section"><div className="container details-layout"><div><Link to="/jobs" className="back-link">← Back to jobs</Link><div className="details-card"><div className="details-title"><JobLogo job={job}/><div><div className="job-company">{job.company} <span className="verified">✓</span></div><h1>{job.title}</h1><div className="job-meta"><span><MapPin size={15}/>{job.location}</span><span><BriefcaseBusiness size={15}/>{job.type}</span><span><Clock3 size={15}/>{job.posted}</span></div></div></div><div className="details-divider"></div><h3>About the role</h3><p className="body-copy">{job.description}</p><h3>Skills you'll use</h3><div className="skill-list">{job.skills.map(s => <span key={s}>{s}</span>)}</div><h3>What you'll get</h3><ul className="benefit-list"><li>Opportunity to work with a collaborative team</li><li>Learning and professional development</li><li>Supportive and inclusive work environment</li></ul></div></div><aside className="apply-card"><div className="eyebrow dark">JOB OVERVIEW</div><div className="salary-large">{job.salary}</div><span className="muted">Estimated compensation</span><div className="details-divider"></div><div className="overview-row"><span>Experience</span><b>{job.level}</b></div><div className="overview-row"><span>Employment</span><b>{job.type}</b></div><div className="overview-row"><span>Location</span><b>{job.location}</b></div><button className="btn btn-primary full-btn" onClick={() => onApply(job)}>Apply for this job <ArrowRight size={17}/></button><button className="btn btn-outline full-btn" onClick={() => onSave(job.id)}>{saved.includes(job.id) ? <BookmarkCheck size={17}/> : <Bookmark size={17}/>} {saved.includes(job.id) ? "Saved" : "Save job"}</button><p className="muted apply-note">Demo only: applications are stored in this browser session.</p></aside></div></main>;
}

function Dashboard({ applications, saved }) {
  const [tab, setTab] = useState("Applications");
  const applied = applications.map(a => ({...a, job: jobs.find(j => j.id === a.jobId)})).filter(a => a.job);
  const savedJobs = jobs.filter(j => saved.includes(j.id));
  return <main className="page-section dashboard-bg"><div className="container dashboard-layout"><aside className="dash-sidebar"><div className="profile-mini"><div className="profile-avatar">S</div><div><b>Sravan Kumar</b><small>Job seeker</small></div></div><div className="dash-nav"><button className={tab==="Overview"?"active":""} onClick={() => setTab("Overview")}><LayoutDashboard/>Overview</button><button className={tab==="Applications"?"active":""} onClick={() => setTab("Applications")}><FileText/>My applications</button><button className={tab==="Saved jobs"?"active":""} onClick={() => setTab("Saved jobs")}><Bookmark/>Saved jobs</button><button onClick={() => setTab("Profile")} className={tab==="Profile"?"active":""}><UserRound/>My profile</button><button onClick={() => setTab("Settings")} className={tab==="Settings"?"active":""}><Settings/>Settings</button></div><Link to="/jobs" className="btn btn-primary full-btn"><Search size={16}/> Find a job</Link></aside><section className="dash-content"><div className="dash-welcome"><div><div className="eyebrow dark">CANDIDATE SPACE</div><h1>Good morning, Sravan <span>✦</span></h1><p>Keep your career momentum going. Your next opportunity is out there.</p></div><button className="notification-btn"><Bell size={18}/><i></i></button></div>
    <div className="dash-stats"><div className="dash-stat"><span className="stat-icon violet"><FileText/></span><small>Applications</small><strong>{applications.length}</strong><em>Jobs you've applied to</em></div><div className="dash-stat"><span className="stat-icon green"><CheckCircle2/></span><small>Shortlisted</small><strong>{applications.filter(a=>a.status==="Shortlisted").length}</strong><em>Moving forward</em></div><div className="dash-stat"><span className="stat-icon orange"><Bookmark/></span><small>Saved jobs</small><strong>{saved.length}</strong><em>Worth exploring</em></div></div>
    <div className="dash-panel"><div className="panel-heading"><div><h2>{tab}</h2><p>{tab==="Applications"?"Track the progress of your job applications.":tab==="Saved jobs"?"Jobs you've bookmarked for later.":"Your personal career workspace."}</p></div>{tab==="Applications" && <Link to="/jobs" className="text-link">Find more jobs <ArrowRight size={16}/></Link>}</div>
      {tab==="Applications" ? applied.length ? <div className="application-list">{applied.map(a=><div className="application-row" key={a.id}><JobLogo job={a.job}/><div className="application-info"><b>{a.job.title}</b><span>{a.job.company} · Applied {a.date}</span></div><span className={`status ${a.status==="Shortlisted"?"status-green":"status-blue"}`}>{a.status}</span><Link to={`/jobs/${a.job.id}`} className="row-arrow"><ArrowRight size={17}/></Link></div>)}</div> : <div className="empty-state"><FileText/><h3>No applications yet</h3><p>When you apply for a job, it will appear here.</p><Link to="/jobs" className="btn btn-primary">Explore jobs</Link></div>
      : tab==="Saved jobs" ? savedJobs.length ? <div className="application-list">{savedJobs.map(j=><div className="application-row" key={j.id}><JobLogo job={j}/><div className="application-info"><b>{j.title}</b><span>{j.company} · {j.location}</span></div><Link to={`/jobs/${j.id}`} className="text-link">View job <ArrowRight size={15}/></Link></div>)}</div> : <div className="empty-state"><Bookmark/><h3>No saved jobs</h3><p>Save interesting jobs and come back to them later.</p><Link to="/jobs" className="btn btn-primary">Browse jobs</Link></div>
      : <div className="profile-placeholder"><div className="profile-avatar large">S</div><h3>Sravan Kumar</h3><p>Job seeker · Bengaluru, India</p><span className="status status-green">Profile active</span></div>}
    </div></section></div></main>;
}

function AuthPage({ mode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  return <main className="auth-page"><div className="auth-card"><Brand/><div className="auth-heading"><div className="eyebrow dark">{mode==="login"?"WELCOME BACK":"START YOUR JOURNEY"}</div><h1>{mode==="login"?"Welcome back":"Create your account"}</h1><p>{mode==="login"?"Sign in to continue your career journey.":"Join JobConnect and discover what's possible."}</p></div>{submitted ? <div className="success-message"><CheckCircle2/><h3>Demo form submitted!</h3><p>This frontend demo does not connect to a real account system.</p><Link to="/dashboard" className="btn btn-primary full-btn">View demo dashboard</Link></div> : <form className="auth-form" onSubmit={e=>{e.preventDefault();setSubmitted(true);}}>{mode==="register" && <label>Full name<input required placeholder="Your full name"/></label>}<label>Email address<input type="email" required placeholder="you@example.com"/></label><label>Password<div className="password-wrap"><input type={showPassword?"text":"password"} required minLength="6" placeholder="Enter your password"/><button type="button" onClick={()=>setShowPassword(!showPassword)}>{showPassword?"Hide":"Show"}</button></div></label>{mode==="register" && <label>I am a<select><option>Job seeker</option><option>Employer</option></select></label>}<button className="btn btn-primary full-btn" type="submit">{mode==="login"?"Sign in":"Create account"} <ArrowRight size={17}/></button></form>}<p className="auth-switch">{mode==="login"?"Don't have an account?":"Already have an account?"} <Link to={mode==="login"?"/register":"/login"}>{mode==="login"?"Create account":"Log in"}</Link></p><p className="demo-note">Demo interface · No real authentication or data storage</p></div></main>;
}

function App() {
  const [saved, setSaved] = useState([]);
  const [applications, setApplications] = useState(initialApplications);
  const [toast, setToast] = useState("");
  const toggleSave = (id) => { setSaved(old => old.includes(id) ? old.filter(x=>x!==id) : [...old,id]); setToast(saved.includes(id)?"Removed from saved jobs":"Job saved successfully"); setTimeout(()=>setToast(""),2400); };
  const apply = (job) => {
    if (applications.some(a=>a.jobId===job.id)) { setToast("You've already applied for this demo job"); setTimeout(()=>setToast(""),2400); return; }
    setApplications(old=>[...old,{id:Date.now(),jobId:job.id,status:"Under review",date:"Nov 25, 2026"}]);
    setToast("Application submitted successfully!"); setTimeout(()=>setToast(""),2600);
  };
  return <><Header/><Routes>
    <Route path="/" element={<Home saved={saved} onSave={toggleSave} onApply={apply}/>}/>
    <Route path="/jobs" element={<Jobs saved={saved} onSave={toggleSave} onApply={apply}/>}/>
    <Route path="/jobs/:id" element={<JobDetails saved={saved} onSave={toggleSave} onApply={apply}/>}/>
    <Route path="/dashboard" element={<Dashboard applications={applications} saved={saved}/>}/>
    <Route path="/login" element={<AuthPage mode="login"/>}/>
    <Route path="/register" element={<AuthPage mode="register"/>}/>
    <Route path="*" element={<main className="page-section container empty-state"><h1>Page not found</h1><Link to="/" className="btn btn-primary">Go home</Link></main>}/>
  </Routes><Footer/>{toast && <div className="toast"><CheckCircle2 size={18}/>{toast}</div>}</>;
}

export default App;
