import React, { useState } from 'react';
import { 
  Instagram, 
  Mail, 
  MapPin, 
  FileText, 
  ChevronRight, 
  Globe, 
  X, 
  Send, 
  CreditCard, 
  CheckCircle2 
} from 'lucide-react';

/**
 * CONFIGURATION BLOCK
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
  socials: {
    instagram: "https://instagram.com/mustache.journey",
    email: "collabs@mustachejourney.com",
    website: "https://mustachejourney.com"
  },
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
      subtitle: "Download 2024 Performance Data",
      icon: <FileText className="w-5 h-5" />, 
      url: "/mustache-journey-media-kit.pdf", 
      type: 'link'
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
  const [showContact, setShowContact] = useState(false);
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('idle');
  const [inquiryStatus, setInquiryStatus] = useState('idle');

  const FORMSPREE_ID = "mjgevjge"; 

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, subject: "Newsletter Signup" })
      });
      if (response.ok) {
        setFormStatus('success');
        setEmail('');
        setTimeout(() => setFormStatus('idle'), 4000);
      }
    } catch (err) { setFormStatus('idle'); }
  };

  const handleInquiry = async (e) => {
    e.preventDefault();
    setInquiryStatus('loading');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, subject: "New Partnership Inquiry" })
      });
      if (response.ok) {
        setInquiryStatus('success');
        setTimeout(() => { setShowContact(false); setInquiryStatus('idle'); }, 3000);
      }
    } catch (err) { setInquiryStatus('idle'); }
  };

  return (
    <div className="min-h-screen bg-brand-creme flex justify-center selection:bg-brand-stone overflow-x-hidden font-sans">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')]"></div>

      <div className={`relative w-full max-w-md bg-brand-paper min-h-screen px-6 pt-16 pb-24 shadow-sm transition-all duration-700 ${showContact ? 'blur-lg scale-95 opacity-40' : 'opacity-100'}`}>
        
        {/* Profile Header with Initial Fade-In */}
        <header className="flex flex-col items-center text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
  <div className="relative mb-8 group cursor-pointer">
    {/* Ambient Glow */}
    <div className="absolute -inset-6 bg-gradient-to-tr from-brand-gold/30 to-brand-charcoal/10 rounded-full blur-2xl opacity-40 animate-pulse group-hover:opacity-60 transition-opacity duration-700"></div>
    
    {/* Outer Frame - provides the white border depth */}
    <div className="relative w-40 h-40 rounded-full bg-white shadow-2xl flex items-center justify-center p-1.5 transition-transform duration-500 group-hover:scale-[1.02]">
      {/* Inner Image Container */}
      <div className="w-full h-full rounded-full overflow-hidden border border-brand-stone/30 bg-brand-creme">
        <img 
          src={DATA.profile.avatar} 
          alt="Profile" 
          /* Changed: added object-top and scale-95 to prevent head clipping */
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

        {/* Links Navigation with Staggered Entrance */}
        <nav className="flex flex-col items-center w-full space-y-4 mb-14 px-2">
          {DATA.links.map((link, idx) => (
            <a
              key={idx}
              href={link.type === 'link' ? link.url : undefined}
              target={link.type === 'link' ? "_blank" : undefined}
              rel={link.type === 'link' ? "noopener noreferrer" : undefined}
              onClick={link.type === 'modal' ? (e) => { e.preventDefault(); setShowContact(true); } : undefined}
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
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${link.highlight ? 'bg-white/10 text-white' : 'bg-brand-creme text-brand-gold'}`}>
                  {link.icon}
                </div>
                <div className="text-left">
                  <div className={`font-semibold text-sm tracking-tight ${link.highlight ? 'text-white' : 'text-brand-ink'}`}>
                    {link.title}
                  </div>
                  <div className={`text-[9px] uppercase tracking-luxury font-bold mt-0.5 ${link.highlight ? 'text-white/60' : 'text-gray-400'}`}>
                    {link.subtitle}
                  </div>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${link.highlight ? 'text-white/40' : 'text-brand-stone'}`} />
            </a>
          ))}
        </nav>

        {/* Portfolio Gallery */}
        <section className="mb-14 px-1 animate-in fade-in duration-1000 delay-500 fill-mode-both">
          <div className="flex items-center justify-between mb-5 px-1">
            <h2 className="text-[10px] font-bold uppercase tracking-luxury text-brand-gold">The Portfolio</h2>
            <div className="h-[1px] flex-grow ml-4 bg-brand-stone"></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {DATA.gallery.map((img, i) => (
              <div key={i} className="group relative aspect-[3/4] p-1.5 border border-brand-stone rounded-md overflow-hidden bg-white shadow-sm transition-all hover:border-brand-gold cursor-zoom-in">
                <div className="w-full h-full overflow-hidden rounded-sm bg-brand-creme">
                  <img 
                    src={img.url} 
                    alt={img.label} 
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Partners Section */}
        <section className="mb-14 px-1 text-center animate-in fade-in duration-1000 delay-700 fill-mode-both">
           <p className="text-[9px] font-bold uppercase tracking-luxury text-gray-400 mb-4">Trusted By</p>
           <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 opacity-50 grayscale">
              {DATA.partners.map((partner, i) => (
                <span key={i} className="text-[10px] font-serif italic text-brand-ink">{partner}</span>
              ))}
           </div>
        </section>

        {/* Newsletter Section */}
        <section className="mb-16 px-1 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000 fill-mode-both">
          <div className="bg-brand-creme p-8 rounded-2xl border border-brand-stone relative overflow-hidden flex flex-col items-center">
            <div className="relative z-10 text-center w-full max-w-[280px]">
              <h3 className="font-serif text-2xl mb-1 text-brand-ink">The Sunday Dispatch</h3>
              <p className="text-[9px] text-brand-gold font-bold tracking-luxury uppercase mb-6">Curated Hideaways</p>
              {formStatus === 'success' ? (
                <div className="flex flex-col items-center py-4">
                  <CheckCircle2 className="w-8 h-8 text-brand-gold mb-2" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Subscription Confirmed</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <input 
                    type="email" required placeholder="Email Address" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-brand-stone bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 shadow-sm"
                  />
                  <button disabled={formStatus === 'loading'} className="w-full bg-brand-charcoal text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-luxury hover:bg-black transition-all shadow-md">
                    {formStatus === 'loading' ? 'Sending...' : 'Join the Inner Circle'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Footer Socials */}
        <footer className="flex flex-col items-center gap-10 mt-auto animate-in fade-in duration-1000 delay-[1200ms] fill-mode-both">
          <div className="flex items-center gap-12">
            <a href={DATA.socials.instagram} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-brand-gold transition-all"><Instagram className="w-6 h-6" /></a>
            <a href={`mailto:${DATA.socials.email}`} className="text-gray-300 hover:text-brand-gold transition-all"><Mail className="w-6 h-6" /></a>
            <a href={DATA.socials.website} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-brand-gold transition-all"><Globe className="w-6 h-6" /></a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-[1px] w-8 bg-brand-stone"></div>
            <span className="text-[9px] font-bold uppercase tracking-ultra text-gray-400 mb-2">Mustache Journey © 2026</span>
          </div>
        </footer>
      </div>

      {/* Partnership Inquiry Modal */}
      {/* Partnership Inquiry Modal - Glassmorphism Edition */}
{showContact && (
  <div 
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/20 backdrop-blur-md animate-in fade-in duration-500" 
    onClick={() => setShowContact(false)}
  >
    <div 
      className="bg-white/70 backdrop-blur-2xl w-full max-w-sm rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden relative border border-white/40 animate-in zoom-in-95 duration-300" 
      onClick={(e) => e.stopPropagation()}
    >
      {/* Decorative inner glow for the "Glass" effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

      <button 
        onClick={() => setShowContact(false)} 
        className="absolute top-6 right-6 p-2 text-brand-ink/40 hover:text-brand-ink hover:bg-white/50 rounded-full transition-all z-10"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="p-10 text-center relative z-0">
        <h2 className="font-serif text-2xl mb-2 text-brand-ink">Partnership Inquiry</h2>
        <p className="text-[10px] text-brand-ink/50 uppercase tracking-luxury mb-8">Confidential Collaboration Request</p>

        {inquiryStatus === 'success' ? (
          <div className="py-12 flex flex-col items-center animate-in zoom-in">
            <CheckCircle2 className="w-12 h-12 text-brand-gold mb-4" />
            <p className="text-sm font-serif italic text-brand-ink/70">Dispatch Received. Talk soon.</p>
          </div>
        ) : (
          <form className="space-y-6 text-left" onSubmit={handleInquiry}>
            <div className="group">
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-1.5 transition-colors group-focus-within:text-brand-ink">Entity / Property Name</label>
              <input 
                name="property" type="text" required 
                className="w-full border-b border-brand-stone/50 py-2 text-sm focus:outline-none focus:border-brand-gold bg-transparent placeholder:text-brand-ink/20" 
                placeholder="e.g., The Aman Kyoto" 
              />
            </div>
            <div className="group">
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-1.5 transition-colors group-focus-within:text-brand-ink">Your Email</label>
              <input 
                name="email" type="email" required 
                className="w-full border-b border-brand-stone/50 py-2 text-sm focus:outline-none focus:border-brand-gold bg-transparent placeholder:text-brand-ink/20" 
                placeholder="contact@brand.com" 
              />
            </div>
            <button 
              disabled={inquiryStatus === 'loading'} 
              className="w-full mt-8 bg-brand-charcoal text-white py-4.5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-3 shadow-xl hover:bg-black hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              <Send className="w-3 h-3" /> {inquiryStatus === 'loading' ? 'Dispatching...' : 'Send Inquiry'}
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