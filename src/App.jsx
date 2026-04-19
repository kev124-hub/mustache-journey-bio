import React, { useState, useEffect } from 'react';
import {
  Instagram, Mail, MapPin, FileText, ChevronRight,
  Globe, X, Send, CreditCard, CheckCircle2,
  BarChart3, Users, Globe2, PlayCircle, ShieldCheck, Zap, ArrowLeft,
  Eye, Focus, Camera, Award, Download, Linkedin, Calendar
} from 'lucide-react';

/**
 * CONFIGURATION BLOCK
 * Content enriched from PDF Media Kit
 */
const DATA = {
  profile: {
    name: "Mustache Journey",
    handle: "@mustache.journey",
    tagline: "Retired FDNY Lieutenant and RN. These days I move through the world differently — F1 paddocks, exotic cars, five-star properties across 40+ countries. I don't manufacture this lifestyle for content. I live it.",
    location: "Worldwide",
    avatar: "/avatar.jpg",
    about: "A cinematic lifestyle brand creating UGC for luxury travel, automotive, men's grooming, and fine dining brands. Real person. Real lifestyle. Content rooted in a life actually lived."
  },
  socials: {
    instagram: "https://instagram.com/mustache.journey",
    email: "collabs@mustachejourney.com",
    website: "https://mustachejourney.com",
    linkedin: "https://www.linkedin.com/in/mustachejourney"
  },
  stats: [
    { label: "Monthly Reach", value: "240K+", icon: <Zap className="w-4 h-4" /> },
    { label: "Avg. Engagement", value: "8.4%", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "UHNW Audience", value: "62%", icon: <Users className="w-4 h-4" /> }
  ],
  audience: {
    age: "30 — 55",
    profile: "Executives, Entrepreneurs, & Senior Professionals",
    geography: "USA, UK, Europe, & Global Luxury Hubs",
    interests: "Five-star hotels, Design-led destinations, Premium travel"
  },
  formats: [
    {
      name: "Silent Authority Walk",
      desc: "Controlled movement through corridors and transitional spaces. Access, not attention.",
      icon: <Focus className="w-5 h-5" />
    },
    {
      name: "Access, Not Attention",
      desc: "POV details highlighting design, service flow, and atmosphere.",
      icon: <Eye className="w-5 h-5" />
    },
    {
      name: "Earned Stillness",
      desc: "Calm moments capturing light, space, and the reward of arrival.",
      icon: <Camera className="w-5 h-5" />
    }
  ],
  links: [
    {
      title: "Partnership Inquiries",
      subtitle: "Inquire for 2026/27 collaborations",
      icon: <Mail className="w-5 h-5" />,
      type: 'modal',
      highlight: true
    },
    {
      title: "Digital Media Kit",
      subtitle: "View Portfolio & Content Packages",
      icon: <FileText className="w-5 h-5" />,
      url: "/mustache-journey-media-kit.pdf",
      type: 'link'
    },
    {
      title: "2026 Travel Roster",
      subtitle: "View upcoming F1 races & destinations",
      icon: <Globe2 className="w-5 h-5" />,
      type: 'page',
      pageId: 'schedule'
    },
  ],
  schedule: [
    { month: "April 2026", location: "Los Ángeles, CA", event: "Regent Santa Monica Beach", type: "Luxury Hospitality", status: "Open for Inquiry" },
    { month: "May 2026", location: "Alexandria, VA", event: "Festival of Speed and Style", type: "Automotive", status: "Limited Availability" },
    { month: "May 2026", location: "Casablanca, Morocco", event: "Royal Mansour Casablanca", type: "Luxury Hospitality", status: "Open for Inquiry" },
    { month: "June 2026", location: "Rome, Italy", event: "Lifestyle Suites Rome", type: "Luxury Hospitality", status: "Open for Inquiry" },
    { month: "June 2026", location: "Monaco", event: "Monaco Grand Prix", type: "F1 Motorsport", status: "Limited Availability" },
    { month: "July 2026", location: "Athens & Mykonos, Greece", event: "Summer Edit", type: "Luxury Travel", status: "Open for Inquiry" },
    { month: "July 2026", location: "London, UK", event: "UK Tour", type: "Luxury Travel", status: "Open for Inquiry" },
    { month: "August 2026", location: "Amsterdam", event: "Zandvoort Grand Prix & Grand Sofitel", type: "F1 / Hospitality", status: "Open for Inquiry" },
    { month: "September 2026", location: "Munich, Germany", event: "Oktoberfest @ Sofitel Bayerpost", type: "Lifestyle / Event", status: "Open for Inquiry" },
    { month: "October 2026", location: "Singapore", event: "Singapore Grand Prix & Ritz Carlton", type: "F1 / Hospitality", status: "Open for Inquiry" },
    { month: "October 2026", location: "Hualalai, Hawaii", event: "Four Seasons", type: "Luxury Hospitality", status: "Open for Inquiry" },
    { month: "November 2026", location: "São Paulo, Brazil", event: "F1 Brazilian GP @ Tivoli Mofarraj", type: "F1 Motorsport", status: "Limited Availability" },
    { month: "November 2026", location: "Iguassu & Rio, Brazil", event: "Belmond Cataratas & Copacabana Palace", type: "Luxury Travel", status: "Open for Inquiry" },
    { month: "December 2026", location: "Dubai, UAE", event: "Winter Edit", type: "Luxury Travel", status: "Open for Inquiry" },
    { month: "December 2026", location: "Monaco", event: "Hotel de Paris", type: "Luxury Hospitality", status: "Open for Inquiry" }
  ],
  gallery: [
    { url: "https://www.dropbox.com/scl/fi/xmv928whoehz22ep0znoy/Collabstr-Spec-Car-Video-1.mp4?rlkey=fg80vwvdb2yzgq9u74flvohfb&st=8cojhvyi&raw=1", label: "Exotic Cars" },
    { url: "https://www.dropbox.com/scl/fi/r2jfi7r5i54cpz93lvtv2/F1-Spec-Reel.mp4?rlkey=3ouvgszu9wnosyqp4c76lwdz2&st=g1nam0dq&raw=1", label: "F1 Motorsport" },
    { url: "https://www.dropbox.com/scl/fi/7y2sl0teg90qsacf57nzi/Luxury-Hotel-Spec-Reel-1.mp4?rlkey=jftqs9n4x20r84lpllpvyzqxr&st=3nywoor1&raw=1", label: "Luxury Travel" },
  ],
  partners: ["Four Seasons", "Ritz-Carlton", "Collabstr", "Insense"]
};

const App = () => {
  const [view, setView] = useState('home'); // 'home' or 'mediakit'
  const [showContact, setShowContact] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const [activeMedia, setActiveMedia] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleInquiry = (e) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => { setShowContact(false); setFormStatus('idle'); }, 2000);
    }, 1500);
  };

  const BioView = () => (
    <div className="animate-in fade-in duration-700">
      <header className="flex flex-col items-center text-center mb-10">
        <div className="relative mb-8 group cursor-pointer">
          <div className="absolute -inset-6 bg-gradient-to-tr from-amber-700/30 to-stone-900/10 rounded-full blur-2xl opacity-40 animate-pulse group-hover:opacity-60 transition-opacity duration-700"></div>
          <div className="relative w-40 h-40 rounded-full bg-white shadow-2xl flex items-center justify-center p-1.5 transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="w-full h-full rounded-full overflow-hidden border border-stone-200/30 bg-stone-50">
              <img
                src={DATA.profile.avatar}
                alt="Profile"
                className="w-full h-full object-cover object-top scale-95 origin-bottom transition-transform duration-1000 group-hover:scale-105"
                onError={(e) => e.target.src = "https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&q=80&w=400"}
              />
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-serif font-medium tracking-tight mb-2 text-stone-900 uppercase">{DATA.profile.name}</h1>
        <div className="flex items-center justify-center gap-2 text-amber-700 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
          <MapPin className="w-3 h-3" />
          <span>{DATA.profile.location}</span>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-[280px] mx-auto not-italic text-sm mb-6">"{DATA.profile.tagline}"</p>
        <div className="w-full p-4 border-y border-stone-200 mb-8">
           <p className="text-[11px] text-gray-600 leading-relaxed uppercase tracking-[0.2em] italic text-center">{DATA.profile.about}</p>
        </div>
      </header>

      <nav className="flex flex-col items-center w-full space-y-4 mb-14 px-2">
        {DATA.links.map((link, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (link.type === 'modal') setShowContact(true);
              if (link.type === 'page') setView(link.pageId);
              if (link.type === 'link') window.open(link.url, '_blank');
            }}
            style={{ animationDelay: `${(idx + 1) * 150}ms` }}
            className={`
              group flex items-center justify-between
              w-full max-w-[340px] p-5
              rounded-full border transition-all duration-500 cursor-pointer
              animate-in fade-in slide-in-from-bottom-8 fill-mode-both
              ${link.highlight
                ? 'bg-stone-900 border-stone-900 text-white shadow-xl hover:bg-black hover:scale-[1.03]'
                : 'bg-white border-stone-200 text-stone-900 hover:border-amber-700 hover:shadow-md hover:-translate-y-0.5'
              }
            `}
          >
            <div className="flex items-center gap-4 text-left">
              <div className={`p-2 rounded-full ${link.highlight ? 'bg-white/10 text-white' : 'bg-stone-50 text-amber-700'}`}>
                {link.icon}
              </div>
              <div>
                <div className={`font-semibold text-sm tracking-tight ${link.highlight ? 'text-white' : 'text-stone-900'}`}>
                  {link.title}
                </div>
                <div className={`text-[9px] uppercase tracking-[0.2em] font-bold mt-0.5 ${link.highlight ? 'text-white/60' : 'text-gray-400'}`}>
                  {link.subtitle}
                </div>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${link.highlight ? 'text-white/40' : 'text-stone-200'}`} />
          </button>
        ))}
      </nav>

      <section className="mb-14 px-1 animate-in fade-in duration-1000 delay-500 fill-mode-both">
        <div className="flex items-center justify-between mb-5 px-1">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">The Portfolio</h2>
          <div className="h-[1px] flex-grow ml-4 bg-stone-200"></div>
        </div>
        <div className="mb-4 rounded-md overflow-hidden border border-stone-200 shadow-sm bg-black aspect-[9/16]">
          <video
            src="https://www.dropbox.com/scl/fi/ms2t1bilalhyadzyftgoe/Collab-Intro.mp4?rlkey=zjf2oujfnp6fdcckknah46c3x&raw=1"
            controls
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {DATA.gallery.map((media, i) => (
            <div 
              key={i} 
              className="group relative aspect-[3/4] p-1.5 border border-stone-200 rounded-md overflow-hidden bg-white shadow-sm transition-all hover:border-amber-700 cursor-zoom-in"
              onClick={() => setActiveMedia(media.url)}
            >
              <div className="w-full h-full overflow-hidden rounded-sm bg-stone-50">
                <video 
                  src={media.url} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-transform duration-700 transform group-hover:scale-110" 
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Partners Section */}
      <section className="mb-14 px-1 text-center animate-in fade-in duration-1000 delay-700 fill-mode-both">
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Trusted By</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 opacity-50 grayscale">
          {DATA.partners.map((partner, i) => (
            <span key={i} className="text-[15px] font-serif italic text-stone-900">{partner}</span>
          ))}
        </div>
      </section>
    </div>
  );

  const MediaKitView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 py-4 pb-20">
      <div className="flex justify-between items-center mb-12">
        <button
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Profile
        </button>

        <a
          href="/mustache-journey-media-kit.pdf"
          download
          className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-amber-700 transition-colors"
        >
          <Download className="w-3 h-3" /> PDF Version
        </a>
      </div>

      <header className="mb-12">
        <h2 className="text-4xl font-serif mb-3 italic">The Media Kit</h2>
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">@mustache.journey — Narrative-led integration</p>
      </header>

      {/* Brand Overview Section */}
      <section className="mb-16 border-b border-stone-200 pb-12">
        <div className="bg-white p-8 rounded-[2rem] border border-stone-200">
           <p className="text-sm leading-relaxed text-gray-600 italic">
             "mustache.journey is a cinematic lifestyle brand documenting luxury travel through the lens of earned confidence and quiet authority. Content crafted for hospitality partners seeking brand-safe storytelling that enhances perception."
           </p>
        </div>
      </section>

      {/* Dynamic Performance Stats */}
      <div className="grid grid-cols-1 gap-4 mb-16">
        {DATA.stats.map((stat, i) => (
          <div key={i} className="bg-white border border-stone-200 p-6 rounded-3xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-stone-50 rounded-2xl text-amber-700">{stat.icon}</div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{stat.label}</span>
            </div>
            <span className="text-2xl font-serif text-stone-900">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Signature Storytelling Formats */}
      <section className="mb-16">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 mb-6 text-center">Signature Formats</h3>
        <div className="space-y-4">
          {DATA.formats.map((format, i) => (
            <div key={i} className="p-6 bg-stone-50 border border-stone-200 rounded-3xl flex gap-5 items-start">
               <div className="mt-1 text-amber-700">{format.icon}</div>
               <div>
                 <h4 className="font-serif text-lg text-stone-900 mb-1">{format.name}</h4>
                 <p className="text-xs text-gray-500 leading-relaxed">{format.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audience Insights */}
      <section className="mb-16 bg-stone-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-700/10 blur-3xl rounded-full"></div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 mb-8">Audience Profile</h3>
        <div className="grid grid-cols-1 gap-8">
           <div>
             <span className="block text-[11px] font-bold text-white/40 uppercase mb-2">Age Range</span>
             <p className="text-2xl font-serif italic text-amber-700">{DATA.audience.age}</p>
           </div>
           <div>
             <span className="block text-[11px] font-bold text-white/40 uppercase mb-2">Primary Profile</span>
             <p className="text-sm text-white/80">{DATA.audience.profile}</p>
           </div>
           <div>
             <span className="block text-[11px] font-bold text-white/40 uppercase mb-2">Key Geography</span>
             <p className="text-sm text-white/80">{DATA.audience.geography}</p>
           </div>
        </div>
      </section>

      {/* Brand Safety Policy */}
      <section className="bg-white border border-stone-200 p-10 rounded-[2.5rem] mb-16 text-center">
        <ShieldCheck className="w-8 h-8 text-amber-700 mx-auto mb-6" />
        <h4 className="text-xl font-serif mb-4 italic">Creative & Brand Safety</h4>
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">No forced talking points</p>
          <div className="h-[1px] w-8 bg-stone-200 mx-auto"></div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">No trend-driven formats</p>
          <div className="h-[1px] w-8 bg-stone-200 mx-auto"></div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Asset Utility Focused</p>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="px-1">
        <button
          onClick={() => setShowContact(true)}
          className="w-full bg-amber-700 text-white py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl hover:bg-stone-900 cursor-pointer transition-all flex items-center justify-center gap-3"
        >
          <Award className="w-3 h-3" /> Secure Partnership Details
        </button>
      </section>
    </div>
  );

  const ScheduleView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 py-4 pb-20">
      <div className="flex justify-between items-center mb-12">
        <button
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Profile
        </button>
      </div>

      <header className="mb-12">
        <h2 className="text-4xl font-serif mb-3 italic">2026 Itinerary</h2>
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Upcoming Destinations & Availability</p>
      </header>

      <div className="space-y-4 mb-16">
        {DATA.schedule.map((item, i) => (
          <div key={i} className="bg-white border border-stone-200 p-6 rounded-3xl shadow-sm hover:border-amber-700 transition-colors group relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 mb-1 block">{item.month}</span>
                <h3 className="text-xl font-serif text-stone-900 group-hover:text-amber-700 transition-colors">{item.location}</h3>
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                item.status === 'Booking Closed' ? 'bg-stone-100 text-stone-400' :
                item.status === 'Limited Availability' ? 'bg-amber-100 text-amber-700' :
                'bg-emerald-50 text-emerald-600'
              }`}>
                {item.status}
              </span>
            </div>
            
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-600 font-medium">{item.event}</p>
              <p className="text-xs text-gray-400">{item.type}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Booking CTA */}
      <section className="px-1">
        <button
          onClick={() => setShowContact(true)}
          className="w-full bg-stone-900 text-white py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl hover:bg-black cursor-pointer transition-all flex items-center justify-center gap-3"
        >
          <Mail className="w-3 h-3" /> Inquire For Dates
        </button>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 flex justify-center selection:bg-stone-200 overflow-x-hidden font-sans">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')]"></div>

      <div className={`relative w-full max-w-md bg-white min-h-screen px-6 pt-16 pb-24 shadow-sm transition-all duration-700 ${showContact ? 'blur-lg scale-95 opacity-40' : 'opacity-100'}`}>
        {view === 'home' && <BioView />}
        {view === 'mediakit' && <MediaKitView />}
        {view === 'schedule' && <ScheduleView />}

        <footer className="flex flex-col items-center gap-10 mt-auto pt-10">
          <div className="flex items-center gap-12">
            <a href={DATA.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-700 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href={DATA.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-700 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href={`mailto:${DATA.socials.email}`} className="text-gray-300 hover:text-amber-700 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
            <a href={DATA.socials.website} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-700 transition-colors">
              <Globe className="w-6 h-6" />
            </a>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Mustache Journey © 2026</span>
        </footer>
      </div>

      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/20 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setShowContact(false)}>
          <div className="bg-white/70 backdrop-blur-2xl w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-white/40 animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowContact(false)} className="absolute top-6 right-6 p-2 text-stone-900/40 hover:text-stone-900 rounded-full transition-all z-10">
              <X className="w-5 h-5" />
            </button>
            <div className="p-10 text-center">
              <h2 className="font-serif text-2xl mb-2">Partnership Inquiry</h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-8">Confidential Request</p>
              {formStatus === 'success' ? (
                <div className="py-12 flex flex-col items-center animate-in zoom-in">
                  <CheckCircle2 className="w-12 h-12 text-amber-700 mb-4" />
                  <p className="text-sm font-serif italic text-gray-600">Dispatch Received.</p>
                </div>
              ) : (
                <form className="space-y-6 text-left" onSubmit={handleInquiry}>
                  <input required className="w-full border-b border-stone-200/50 py-2 text-sm focus:outline-none bg-transparent" placeholder="Entity Name" />
                  <input required type="email" className="w-full border-b border-stone-200/50 py-2 text-sm focus:outline-none bg-transparent" placeholder="Email Address" />
                  <button className="w-full mt-8 bg-stone-900 text-white py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl hover:bg-black transition-all">
                    Send Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Video Modal */}
      {activeMedia && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/95 backdrop-blur-sm animate-in fade-in duration-300" 
          onClick={() => setActiveMedia(null)}
        >
          <button 
            onClick={() => setActiveMedia(null)} 
            className="absolute top-6 right-6 p-2 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-[110]"
          >
            <X className="w-8 h-8" />
          </button>
          <div 
            className="relative w-full max-w-lg max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 bg-black" 
            onClick={(e) => e.stopPropagation()}
          >
            <video 
              src={activeMedia} 
              controls 
              autoPlay 
              playsInline
              className="w-full h-full max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
