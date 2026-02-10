import React, { useState, useEffect } from 'react';
import { 
  Instagram, Mail, MapPin, FileText, ChevronRight, 
  Globe, X, Send, CreditCard, CheckCircle2, 
  BarChart3, Users, Globe2, PlayCircle, ShieldCheck, Zap, ArrowLeft,
  Eye, Focus, Camera, Award
} from 'lucide-react';

/**
 * CONFIGURATION BLOCK
 * Content enriched from PDF Media Kit
 */
const DATA = {
  profile: {
    name: "Mustache Journey",
    handle: "@mustache.journey",
    tagline: "Documenting the world's most iconic heritage hotels through a lens of modern character and timeless style.",
    location: "Global Explorer",
    avatar: "/avatar.jpg", 
    about: "A cinematic lifestyle brand documenting luxury travel through the lens of earned confidence and quiet authority. Specializing in refined storytelling that enhances guest perception."
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
      subtitle: "Interactive Performance Portal",
      icon: <FileText className="w-5 h-5" />, 
      type: 'page',
      pageId: 'mediakit'
    },
    { 
      title: "Luxury Consultation", 
      subtitle: "1-on-1 Content Strategy Call",
      icon: <CreditCard className="w-5 h-5" />, 
      url: "https://stripe.com/your-payment-link",
      type: 'link'
    },
  ],
  gallery: [
    { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400", label: "Grand Suites" },
    { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400", label: "Heritage Lounge" },
    { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=400", label: "Estate Views" },
  ],
  partners: ["Aman", "Belmond", "Rosewood", "Ritz-Carlton"]
};

const App = () => {
  const [view, setView] = useState('home'); // 'home' or 'mediakit'
  const [showContact, setShowContact] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');

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
          <div className="absolute -inset-6 bg-gradient-to-tr from-brand-gold/30 to-brand-charcoal/10 rounded-full blur-2xl opacity-40 animate-pulse group-hover:opacity-60 transition-opacity duration-700"></div>
          <div className="relative w-40 h-40 rounded-full bg-white shadow-2xl flex items-center justify-center p-1.5 transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="w-full h-full rounded-full overflow-hidden border border-brand-stone/30 bg-brand-creme">
              <img 
                src={DATA.profile.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover object-top scale-95 origin-bottom transition-transform duration-1000 group-hover:scale-105" 
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
        <div className="w-full p-4 border-y border-brand-stone mb-8">
           <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-luxury italic text-center">{DATA.profile.about}</p>
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
                ? 'bg-brand-charcoal border-brand-charcoal text-white shadow-xl hover:bg-black hover:scale-[1.03]' 
                : 'bg-white border-brand-stone text-brand-ink hover:border-brand-gold hover:shadow-md hover:-translate-y-0.5'
              }
            `}
          >
            <div className="flex items-center gap-4 text-left">
              <div className={`p-2 rounded-full ${link.highlight ? 'bg-white/10 text-white' : 'bg-brand-creme text-brand-gold'}`}>
                {link.icon}
              </div>
              <div>
                <div className={`font-semibold text-sm tracking-tight ${link.highlight ? 'text-white' : 'text-brand-ink'}`}>
                  {link.title}
                </div>
                <div className={`text-[9px] uppercase tracking-luxury font-bold mt-0.5 ${link.highlight ? 'text-white/60' : 'text-gray-400'}`}>
                  {link.subtitle}
                </div>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${link.highlight ? 'text-white/40' : 'text-brand-stone'}`} />
          </button>
        ))}
      </nav>

      <section className="mb-14 px-1 animate-in fade-in duration-1000 delay-500 fill-mode-both">
        <div className="flex items-center justify-between mb-5 px-1">
          <h2 className="text-[10px] font-bold uppercase tracking-luxury text-brand-gold">The Portfolio</h2>
          <div className="h-[1px] flex-grow ml-4 bg-brand-stone"></div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {DATA.gallery.map((img, i) => (
            <div key={i} className="group relative aspect-[3/4] p-1.5 border border-brand-stone rounded-md overflow-hidden bg-white shadow-sm transition-all hover:border-brand-gold cursor-zoom-in">
              <div className="w-full h-full overflow-hidden rounded-sm bg-brand-creme">
                <img src={img.url} className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const MediaKitView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 py-4 pb-20">
      <button 
        onClick={() => setView('home')}
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-luxury text-brand-gold mb-12 hover:translate-x-[-4px] transition-transform"
      >
        <ArrowLeft className="w-3 h-3" /> Back to Profile
      </button>

      <header className="mb-12">
        <h2 className="text-4xl font-serif mb-3 italic">The Media Kit</h2>
        <p className="text-[9px] font-bold uppercase tracking-ultra text-gray-400">@mustache.journey — Narrative-led integration</p>
      </header>

      {/* Brand Overview Section */}
      <section className="mb-16 border-b border-brand-stone pb-12">
        <div className="bg-white p-8 rounded-[2rem] border border-brand-stone">
           <p className="text-sm leading-relaxed text-gray-600 italic">
             "mustache.journey is a cinematic lifestyle brand documenting luxury travel through the lens of earned confidence and quiet authority. Content crafted for hospitality partners seeking brand-safe storytelling that enhances perception."
           </p>
        </div>
      </section>

      {/* Dynamic Performance Stats */}
      <div className="grid grid-cols-1 gap-4 mb-16">
        {DATA.stats.map((stat, i) => (
          <div key={i} className="bg-white border border-brand-stone p-6 rounded-3xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-creme rounded-2xl text-brand-gold">{stat.icon}</div>
              <span className="text-[10px] font-bold uppercase tracking-luxury text-gray-400">{stat.label}</span>
            </div>
            <span className="text-2xl font-serif text-brand-ink">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Signature Storytelling Formats */}
      <section className="mb-16">
        <h3 className="text-[10px] font-bold uppercase tracking-luxury text-brand-gold mb-6 text-center">Signature Formats</h3>
        <div className="space-y-4">
          {DATA.formats.map((format, i) => (
            <div key={i} className="p-6 bg-brand-creme border border-brand-stone rounded-3xl flex gap-5 items-start">
               <div className="mt-1 text-brand-gold">{format.icon}</div>
               <div>
                 <h4 className="font-serif text-lg text-brand-ink mb-1">{format.name}</h4>
                 <p className="text-xs text-gray-500 leading-relaxed">{format.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audience Insights */}
      <section className="mb-16 bg-brand-charcoal text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 blur-3xl rounded-full"></div>
        <h3 className="text-[10px] font-bold uppercase tracking-luxury text-brand-gold mb-8">Audience Profile</h3>
        <div className="grid grid-cols-1 gap-8">
           <div>
             <span className="block text-[11px] font-bold text-white/40 uppercase mb-2">Age Range</span>
             <p className="text-2xl font-serif italic text-brand-gold">{DATA.audience.age}</p>
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
      <section className="bg-white border border-brand-stone p-10 rounded-[2.5rem] mb-16 text-center">
        <ShieldCheck className="w-8 h-8 text-brand-gold mx-auto mb-6" />
        <h4 className="text-xl font-serif mb-4 italic">Creative & Brand Safety</h4>
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">No forced talking points</p>
          <div className="h-[1px] w-8 bg-brand-stone mx-auto"></div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">No trend-driven formats</p>
          <div className="h-[1px] w-8 bg-brand-stone mx-auto"></div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Asset Utility Focused</p>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="px-1">
        <button 
          onClick={() => setShowContact(true)}
          className="w-full bg-brand-gold text-white py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl hover:bg-brand-charcoal transition-all flex items-center justify-center gap-3"
        >
          <Award className="w-3 h-3" /> Secure Partnership Details
        </button>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-creme flex justify-center selection:bg-brand-stone overflow-x-hidden font-sans">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')]"></div>

      <div className={`relative w-full max-w-md bg-brand-paper min-h-screen px-6 pt-16 pb-24 shadow-sm transition-all duration-700 ${showContact ? 'blur-lg scale-95 opacity-40' : 'opacity-100'}`}>
        {view === 'home' ? <BioView /> : <MediaKitView />}

        <footer className="flex flex-col items-center gap-10 mt-auto pt-10">
          <div className="flex items-center gap-12">
            <Instagram className="w-6 h-6 text-gray-300 hover:text-brand-gold cursor-pointer" />
            <Mail className="w-6 h-6 text-gray-300 hover:text-brand-gold cursor-pointer" />
            <Globe className="w-6 h-6 text-gray-300 hover:text-brand-gold cursor-pointer" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-ultra text-gray-400">Mustache Journey © 2026</span>
        </footer>
      </div>

      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/20 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setShowContact(false)}>
          <div className="bg-white/70 backdrop-blur-2xl w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-white/40 animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowContact(false)} className="absolute top-6 right-6 p-2 text-brand-ink/40 hover:text-brand-ink rounded-full transition-all z-10">
              <X className="w-5 h-5" />
            </button>
            <div className="p-10 text-center">
              <h2 className="font-serif text-2xl mb-2">Partnership Inquiry</h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-luxury mb-8">Confidential Request</p>
              {formStatus === 'success' ? (
                <div className="py-12 flex flex-col items-center animate-in zoom-in">
                  <CheckCircle2 className="w-12 h-12 text-brand-gold mb-4" />
                  <p className="text-sm font-serif italic text-gray-600">Dispatch Received.</p>
                </div>
              ) : (
                <form className="space-y-6 text-left" onSubmit={handleInquiry}>
                  <input required className="w-full border-b border-brand-stone/50 py-2 text-sm focus:outline-none bg-transparent" placeholder="Entity Name" />
                  <input required type="email" className="w-full border-b border-brand-stone/50 py-2 text-sm focus:outline-none bg-transparent" placeholder="Email Address" />
                  <button className="w-full mt-8 bg-brand-charcoal text-white py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl hover:bg-black transition-all">
                    Send Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;