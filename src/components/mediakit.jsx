import React, { useState, useEffect } from 'react';
import { 
  Instagram, Mail, MapPin, FileText, ChevronRight, 
  Globe, X, Send, CreditCard, CheckCircle2, BarChart3, Users, Globe2, PlayCircle, ShieldCheck, Zap 
} from 'lucide-react';

/**
 * CONFIGURATION & CONTENT
 */
const DATA = {
  profile: {
    name: "Mustache Journey",
    handle: "@mustache.journey",
    tagline: "Documenting the world's most iconic heritage hotels through a lens of modern character and timeless style.",
    location: "Global Explorer",
    avatar: "/avatar.jpg", 
    about: "Specializing in visual storytelling for boutique estates and historic luxury properties. My mission is to bridge the gap between classic elegance and modern digital reach."
  },
  links: [
    { title: "Professional Media Kit", subtitle: "View Live Performance Data", icon: <BarChart3 className="w-5 h-5" />, type: 'internal', target: 'mediakit', highlight: true },
    { title: "Partnership Inquiries", subtitle: "Inquire for 2026/27 collaborations", icon: <Mail className="w-5 h-5" />, type: 'modal' },
    { title: "Digital Media Kit (PDF)", subtitle: "Legacy Download", icon: <FileText className="w-5 h-5" />, url: "/mustache-journey-media-kit.pdf", type: 'link' },
  ],
  stats: [
    { label: "Monthly Reach", value: "240K+", icon: <Zap className="w-4 h-4" /> },
    { label: "Avg. Engagement", value: "8.4%", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "UHNW Audience", value: "62%", icon: <Users className="w-4 h-4" /> }
  ]
};

// --- COMPONENT: MEDIA KIT VIEW ---
const MediaKitView = ({ onBack }) => (
  <div className="min-h-screen bg-brand-paper text-brand-ink px-6 py-20 animate-in fade-in duration-700">
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-12 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-gold hover:text-brand-ink transition-colors">
        <ChevronRight className="w-4 h-4 rotate-180" /> Back to Profile
      </button>

      <header className="mb-20 text-center">
        <h1 className="text-5xl font-serif mb-4 uppercase tracking-widest">Media Kit</h1>
        <p className="text-brand-gold font-bold tracking-luxury uppercase text-[10px]">@mustache.journey — Quiet Authority</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {DATA.stats.map((stat, i) => (
          <div key={i} className="p-8 border border-brand-stone rounded-2xl bg-white text-center shadow-sm">
            <div className="flex justify-center mb-4 text-brand-gold">{stat.icon}</div>
            <div className="text-3xl font-serif mb-1">{stat.value}</div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <section className="mb-20">
        <h3 className="text-[10px] font-bold uppercase tracking-luxury text-brand-gold mb-8">Cinematic Asset Utility</h3>
        <div className="aspect-video bg-brand-charcoal rounded-[2rem] overflow-hidden relative group border border-brand-stone">
           <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
             <PlayCircle className="w-16 h-16 text-white/50" />
           </div>
           <div className="absolute bottom-8 left-8 text-white">
             <p className="text-xs font-serif italic">Sample: The Heritage Verdict (4K High-Bitrate)</p>
           </div>
        </div>
      </section>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---
const App = () => {
  const [view, setView] = useState('bio'); // 'bio' or 'mediakit'
  const [showContact, setShowContact] = useState(false);

  // Scroll to top when switching views
  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  if (view === 'mediakit') {
    return <MediaKitView onBack={() => setView('bio')} />;
  }

  return (
    <div className="min-h-screen bg-brand-creme flex justify-center selection:bg-brand-stone font-sans">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')]"></div>

      <div className={`relative w-full max-w-md bg-brand-paper min-h-screen px-6 pt-16 pb-24 shadow-sm transition-all duration-700 ${showContact ? 'blur-lg scale-95 opacity-40' : 'opacity-100'}`}>
        
        {/* Profile Header */}
        <header className="flex flex-col items-center text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="relative mb-8 group cursor-pointer">
            <div className="absolute -inset-6 bg-gradient-to-tr from-brand-gold/30 to-brand-charcoal/10 rounded-full blur-2xl opacity-40 animate-pulse transition-opacity duration-700"></div>
            <div className="relative w-40 h-40 rounded-full bg-white shadow-2xl flex items-center justify-center p-1.5">
              <div className="w-full h-full rounded-full overflow-hidden border border-brand-stone/30 bg-brand-creme">
                <img 
                  src={DATA.profile.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover object-top scale-95 origin-bottom" 
                  onError={(e) => e.target.src = "https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&q=80&w=400"}
                />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-serif font-medium tracking-tight mb-2 text-brand-ink uppercase tracking-wider">{DATA.profile.name}</h1>
          <div className="flex items-center justify-center gap-2 text-brand-gold text-[10px] font-bold tracking-luxury uppercase mb-4">
            <MapPin className="w-3 h-3" />
            <span>{DATA.profile.location}</span>
          </div>
          <p className="text-gray-600 leading-relaxed max-w-[280px] mx-auto italic text-sm mb-6">"{DATA.profile.tagline}"</p>
        </header>

        {/* Links Navigation */}
        <nav className="flex flex-col items-center w-full space-y-4 mb-14 px-2">
          {DATA.links.map((link, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (link.type === 'internal') setView(link.target);
                if (link.type === 'modal') setShowContact(true);
                if (link.type === 'link') window.open(link.url, '_blank');
              }}
              style={{ animationDelay: `${(idx + 1) * 150}ms` }}
              className={`
                group flex items-center justify-between w-full p-5 rounded-full border transition-all duration-500
                animate-in fade-in slide-in-from-bottom-8 fill-mode-both
                ${link.highlight 
                  ? 'bg-brand-charcoal border-brand-charcoal text-white shadow-xl hover:scale-[1.03]' 
                  : 'bg-white border-brand-stone text-brand-ink hover:border-brand-gold hover:-translate-y-0.5'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${link.highlight ? 'bg-white/10 text-white' : 'bg-brand-creme text-brand-gold'}`}>
                  {link.icon}
                </div>
                <div className="text-left">
                  <div className={`font-semibold text-sm tracking-tight ${link.highlight ? 'text-white' : 'text-brand-ink'}`}>{link.title}</div>
                  <div className={`text-[9px] uppercase tracking-luxury font-bold mt-0.5 ${link.highlight ? 'text-white/60' : 'text-gray-400'}`}>{link.subtitle}</div>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 ${link.highlight ? 'text-white/40' : 'text-brand-stone'}`} />
            </button>
          ))}
        </nav>

        <footer className="text-center mt-20 opacity-30">
          <p className="text-[9px] font-bold uppercase tracking-ultra">Mustache Journey © 2026</p>
        </footer>
      </div>

      {/* Modal - Glassmorphism */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/20 backdrop-blur-md animate-in fade-in" onClick={() => setShowContact(false)}>
          <div className="bg-white/80 backdrop-blur-2xl w-full max-w-sm rounded-[2.5rem] p-10 shadow-2xl relative border border-white/40" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowContact(false)} className="absolute top-6 right-6 p-2 text-brand-ink/40"><X className="w-5 h-5" /></button>
            <h2 className="font-serif text-2xl mb-8 text-center text-brand-ink">Partnership Inquiry</h2>
            <form className="space-y-6">
               <input type="text" placeholder="Entity Name" className="w-full border-b border-brand-stone/50 py-2 text-sm focus:outline-none bg-transparent" />
               <input type="email" placeholder="Email" className="w-full border-b border-brand-stone/50 py-2 text-sm focus:outline-none bg-transparent" />
               <button className="w-full bg-brand-charcoal text-white py-4 rounded-full text-[10px] font-bold uppercase tracking-widest mt-4">Send Inquiry</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;