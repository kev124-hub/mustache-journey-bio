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
 * Update these values to refresh your content instantly.
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

  // Replace with your Formspree ID (e.g., "mjgevjge")
  const FORMSPREE_ID = "mjgevjge"; 

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, subject: "New Partnership Inquiry" })
      });
      if (response.ok) {
        setInquiryStatus('success');
        setTimeout(() => { setShowContact(false); setInquiryStatus('idle'); }, 3000);
      }
    } catch (err) { setInquiryStatus('idle'); }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] flex justify-center selection:bg-[#E5E1D8] overflow-x-hidden font-sans">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')]"></div>

      {/* Main Column Wrapper: max-w-md prevents full-page stretching */}
      <div className={`relative w-full max-w-md bg-[#FDFCF8] min-h-screen px-6 pt-16 pb-24 shadow-sm transition-all duration-700 ${showContact ? 'blur-lg scale-95 opacity-40' : 'opacity-100'}`}>
        
        {/* Profile Header */}
        <header className="flex flex-col items-center text-center mb-10">
          <div className="relative mb-6 group cursor-pointer">
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#BFA37E] to-[#2C2C2C] rounded-full blur-md opacity-20 animate-pulse group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <img 
                src={DATA.profile.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover grayscale-[10%]" 
                onError={(e) => e.target.src = "https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&q=80&w=400"}
              />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-medium tracking-tight mb-2 text-[#1a1a1a] uppercase tracking-wider">{DATA.profile.name}</h1>
          <div className="flex items-center justify-center gap-2 text-[#BFA37E] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
            <MapPin className="w-3 h-3" />
            <span>{DATA.profile.location}</span>
          </div>
          <p className="text-[#666] leading-relaxed max-w-[280px] mx-auto italic text-sm mb-6">"{DATA.profile.tagline}"</p>
          <div className="w-full p-4 border-y border-[#E5E1D8] mb-8">
             <p className="text-[11px] text-[#888] leading-relaxed uppercase tracking-widest italic text-center">{DATA.profile.about}</p>
          </div>
        </header>

        {/* Links Navigation */}
        <nav className="space-y-4 mb-14">
          {DATA.links.map((link, idx) => (
            <a
              key={idx}
              href={link.type === 'link' ? link.url : '#'}
              target={link.type === 'link' ? "_blank" : undefined}
              rel={link.type === 'link' ? "noopener noreferrer" : undefined}
              onClick={link.type === 'modal' ? (e) => { e.preventDefault(); setShowContact(true); } : undefined}
              className={`group flex items-center justify-between p-5 rounded-xl border transition-all duration-300 ${
                link.highlight 
                ? 'bg-[#2C2C2C] border-[#2C2C2C] text-white shadow-xl hover:bg-black scale-[1.02]' 
                : 'bg-white border-[#E5E1D8] hover:border-[#BFA37E] hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-lg ${link.highlight ? 'bg-white/10' : 'bg-[#F9F8F4]'}`}>
                  {link.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm tracking-tight">{link.title}</div>
                  <div className={`text-[10px] uppercase tracking-widest font-bold mt-0.5 ${link.highlight ? 'text-white/50' : 'text-[#AAA]'}`}>
                    {link.subtitle}
                  </div>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${link.highlight ? 'text-white/40' : 'text-[#DDD]'}`} />
            </a>
          ))}
        </nav>

        {/* Portfolio Gallery with Editorial Frames */}
        <section className="mb-14 px-1">
          <div className="flex items-center justify-between mb-5 px-1">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#BFA37E]">The Portfolio</h2>
            <div className="h-[1px] flex-grow ml-4 bg-[#E5E1D8]"></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {DATA.gallery.map((img, i) => (
              <div key={i} className="group relative aspect-[3/4] p-1.5 border border-[#E5E1D8] rounded-md overflow-hidden bg-white shadow-sm transition-all hover:border-[#BFA37E]">
                <div className="w-full h-full overflow-hidden rounded-sm bg-[#F5F2EA]">
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

        {/* Newsletter Section: Fixed Container Width */}
        <section className="mb-16 px-1">
          <div className="bg-[#F5F2EA] p-8 rounded-2xl border border-[#E5E1D8] relative overflow-hidden flex flex-col items-center">
            <div className="relative z-10 text-center w-full max-w-[280px]">
              <h3 className="font-serif text-2xl mb-1 text-[#1a1a1a]">The Sunday Dispatch</h3>
              <p className="text-[9px] text-[#BFA37E] font-bold tracking-[0.3em] uppercase mb-6">Curated Hideaways</p>
              {formStatus === 'success' ? (
                <div className="flex flex-col items-center py-4 animate-in zoom-in">
                  <CheckCircle2 className="w-8 h-8 text-[#BFA37E] mb-2" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Subscription Confirmed</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <input 
                    type="email" required placeholder="Email Address" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-[#E5E1D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFA37E]/20 shadow-sm"
                  />
                  <button disabled={formStatus === 'loading'} className="w-full bg-[#2C2C2C] text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all shadow-md">
                    {formStatus === 'loading' ? 'Sending...' : 'Join the Inner Circle'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Footer Socials */}
        <footer className="flex flex-col items-center gap-10 mt-auto">
          <div className="flex items-center gap-12">
            <a href={DATA.socials.instagram} target="_blank" rel="noreferrer" className="text-[#CCC] hover:text-[#BFA37E] transition-all"><Instagram className="w-6 h-6" /></a>
            <a href={`mailto:${DATA.socials.email}`} className="text-[#CCC] hover:text-[#BFA37E] transition-all"><Mail className="w-6 h-6" /></a>
            <a href={DATA.socials.website} target="_blank" rel="noreferrer" className="text-[#CCC] hover:text-[#BFA37E] transition-all"><Globe className="w-6 h-6" /></a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-[1px] w-8 bg-[#E5E1D8]"></div>
            <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#AAA] mb-2">Mustache Journey © 2026</span>
          </div>
        </footer>
      </div>

      {/* Partnership Inquiry Modal */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 relative border border-[#F5F2EA]">
            <button onClick={() => setShowContact(false)} className="absolute top-6 right-6 p-2 text-[#AAA] hover:text-black hover:bg-[#F9F8F4] rounded-full transition-all">
              <X className="w-5 h-5" />
            </button>
            <div className="p-10 text-center">
              <h2 className="font-serif text-2xl mb-2 text-[#1a1a1a]">Partnership Inquiry</h2>
              <p className="text-[10px] text-[#AAA] uppercase tracking-[0.3em] mb-8">Confidential Collaboration Request</p>

              {inquiryStatus === 'success' ? (
                <div className="py-12 flex flex-col items-center animate-in zoom-in">
                  <CheckCircle2 className="w-12 h-12 text-[#BFA37E] mb-4" />
                  <p className="text-sm font-serif italic text-[#666]">Dispatch Received. Talk soon.</p>
                </div>
              ) : (
                <form className="space-y-5 text-left" onSubmit={handleInquiry}>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#BFA37E] mb-1.5">Entity / Property Name</label>
                    <input name="property" type="text" required className="w-full border-b border-[#E5E1D8] py-2 text-sm focus:outline-none focus:border-[#BFA37E] bg-transparent" placeholder="e.g., The Aman Kyoto" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#BFA37E] mb-1.5">Your Email</label>
                    <input name="email" type="email" required className="w-full border-b border-[#E5E1D8] py-2 text-sm focus:outline-none focus:border-[#BFA37E] bg-transparent" placeholder="contact@brand.com" />
                  </div>
                  <button disabled={inquiryStatus === 'loading'} className="w-full mt-8 bg-[#2C2C2C] text-white py-4.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-3 shadow-xl hover:bg-black transition-all disabled:opacity-50">
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