import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Mail, 
  MapPin, 
  Camera, 
  FileText, 
  ChevronRight, 
  Globe, 
  Star,
  ExternalLink,
  Award,
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
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'loading', 'success'
  const [inquiryStatus, setInquiryStatus] = useState('idle'); // For the Modal

  // Replace this with your actual Formspree ID
  const FORMSPREE_ID = "https://formspree.io/f/mjgevjge"; 

  // Newsletter Handler
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    
    // Example fetch to Formspree for Newsletter
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
  };

  // Partnership Inquiry Handler
  const handleInquiry = async (e) => {
    e.preventDefault();
    setInquiryStatus('loading');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, subject: "New Partnership Inquiry" })
    });

    if (response.ok) {
      setInquiryStatus('success');
      setTimeout(() => {
        setShowContact(false);
        setInquiryStatus('idle');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] flex justify-center selection:bg-[#E5E1D8] overflow-x-hidden font-sans">
      
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')]"></div>

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

        {/* Action Buttons */}
        <nav className="space-y-4 mb-14">
          {DATA.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url || '#'}
              onClick={link.type === 'modal' ? (e) => { e.preventDefault(); setShowContact(true); } : undefined}
              className={`group flex items-center justify-between p-5 rounded-xl border transition-all duration-300 ${
                link.highlight 
                ? 'bg-[#2C2C2C] border-[#2C2C2C] text-white shadow-xl hover:bg-black' 
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

        {/* Partnerships List */}
        <section className="mb-14 text-center">
           <h2 className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#AAA] mb-6 px-4">Collaborations & Partnerships</h2>
           <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 opacity-50 grayscale px-2">
              {DATA.partners.map((partner, i) => (
                <span key={i} className="text-[10px] font-serif tracking-widest italic text-[#2C2C2C]">{partner}</span>
              ))}
           </div>
        </section>

        {/* Portfolio Gallery */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-5 px-1">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#BFA37E]">The Portfolio</h2>
            <div className="h-[1px] flex-grow ml-4 bg-[#E5E1D8]"></div>
          </div>
          <div className="grid grid-cols-3 gap-3 px-1">
            {DATA.gallery.map((img, i) => (
              <div key={i} className="aspect-[3/4] rounded-lg overflow-hidden bg-[#F5F2EA] shadow-sm group">
                <img src={img.url} alt={img.label} className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mb-16 bg-[#F5F2EA] p-8 rounded-2xl border border-[#E5E1D8] relative overflow-hidden mx-1">
          <div className="relative z-10 text-center">
            <h3 className="font-serif text-2xl mb-1 text-[#1a1a1a]">The Sunday Dispatch</h3>
            <p className="text-[9px] text-[#BFA37E] font-bold tracking-[0.3em] uppercase mb-6">Curated Hideaways & Industry Insights</p>
            {formStatus === 'success' ? (
              <div className="flex flex-col items-center py-4 animate-in zoom-in">
                <CheckCircle2 className="w-8 h-8 text-[#BFA37E] mb-2" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#2C2C2C]">Welcome to the Inner Circle</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input 
                  type="email" required placeholder="Email Address" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-[#E5E1D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFA37E]/10 shadow-sm"
                />
                <button disabled={formStatus === 'loading'} className="w-full bg-[#2C2C2C] text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all shadow-md disabled:opacity-50">
                  {formStatus === 'loading' ? 'Authenticating...' : 'Request Membership'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-10 mt-auto">
          <div className="flex items-center gap-12">
            <a href={DATA.socials.instagram} target="_blank" rel="noreferrer" className="text-[#CCC] hover:text-[#BFA37E] transition-all"><Instagram className="w-6 h-6" /></a>
            <a href={`mailto:${DATA.socials.email}`} className="text-[#CCC] hover:text-[#BFA37E] transition-all"><Mail className="w-6 h-6" /></a>
            <a href={DATA.socials.website} className="text-[#CCC] hover:text-[#BFA37E] transition-all"><Globe className="w-6 h-6" /></a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-[1px] w-8 bg-[#E5E1D8]"></div>
            <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#AAA] mb-2">Mustache Journey © 2026</span>
          </div>
        </footer>
      </div>

      {/* Partnership Modal */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-white/80 backdrop-blur-xl">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 relative border border-[#F5F2EA]">
            <button onClick={() => setShowContact(false)} className="absolute top-8 right-8 p-2 text-[#AAA] hover:text-black hover:bg-[#F9F8F4] rounded-full transition-all">
              <X className="w-5 h-5" />
            </button>
            <div className="p-10 text-center">
              <h2 className="font-serif text-3xl mb-4 text-[#1a1a1a]">Partnership Inquiry</h2>
              <p className="text-[10px] text-[#AAA] uppercase tracking-[0.3em] mb-10">Confidential Collaboration Request</p>

              {inquiryStatus === 'success' ? (
                <div className="py-12 flex flex-col items-center animate-in zoom-in">
                  <CheckCircle2 className="w-12 h-12 text-[#BFA37E] mb-4" />
                  <p className="text-sm font-serif italic text-[#666]">Dispatch Received. Talk soon.</p>
                </div>
              ) : (
                <form className="space-y-6 text-left" onSubmit={handleInquiry}>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#BFA37E] mb-2">Entity / Property Name</label>
                    <input name="property" type="text" required className="w-full border-b border-[#E5E1D8] py-2 text-sm focus:outline-none focus:border-[#BFA37E] bg-transparent" placeholder="e.g., The Aman Kyoto" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#BFA37E] mb-2">Proposed Timeline</label>
                    <input name="timeline" type="text" required className="w-full border-b border-[#E5E1D8] py-2 text-sm focus:outline-none focus:border-[#BFA37E] bg-transparent" placeholder="Q3 2026" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#BFA37E] mb-2">Your Email</label>
                    <input name="email" type="email" required className="w-full border-b border-[#E5E1D8] py-2 text-sm focus:outline-none focus:border-[#BFA37E] bg-transparent" placeholder="contact@brand.com" />
                  </div>
                  <button disabled={inquiryStatus === 'loading'} className="w-full mt-10 bg-[#2C2C2C] text-white py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-3 shadow-xl hover:bg-black transition-all disabled:opacity-50">
                    <Send className="w-3 h-3" /> {inquiryStatus === 'loading' ? 'Dispatching...' : 'Dispatch Proposal'}
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