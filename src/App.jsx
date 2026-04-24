import { useState, useRef, useEffect } from "react";
import "./App.css";

const TABS = ["Patient Support", "Volunteer", "Contact", "AI Assistant"];

const FAQS = [
  { q: "appointment", a: "You can book an appointment through our patient portal at portal.healthcaresupport.org, or call our scheduling line at 1-800-HEALTH-1 Monday–Friday 8am–6pm." },
  { q: "insurance", a: "We accept most major insurance plans including Medicare, Medicaid, Blue Cross, Aetna, and United Healthcare. Please bring your insurance card to your first visit." },
  { q: "emergency", a: "For life-threatening emergencies, call 911 immediately. For urgent but non-emergency issues, visit our urgent care center — open daily 7am–9pm." },
  { q: "prescription", a: "Prescription refills can be requested through our patient portal, by calling your provider's office, or through your pharmacy. Allow 48–72 hours for processing." },
  { q: "records", a: "Medical record requests are processed within 30 days per HIPAA guidelines. Submit your request through the patient portal or in person at our records office." },
  { q: "telehealth", a: "Telehealth visits are available for most non-emergency consultations. Book through the portal and you'll receive a video link 15 minutes before your appointment." },
  { q: "hours", a: "Our main clinic is open Monday–Friday 7am–7pm, Saturday 8am–4pm. Urgent care is open daily 7am–9pm. The ER is open 24/7." },
  { q: "volunteer", a: "We'd love your help! Fill out the Volunteer tab on this page or email volunteer@healthcaresupport.org. Orientation sessions are held monthly." },
];

function getAIResponse(userMessage) {
  const lower = userMessage.toLowerCase();
  for (const faq of FAQS) {
    if (lower.includes(faq.q)) return faq.a;
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! I'm HealthBot, your healthcare assistant. I can help with appointments, insurance, prescriptions, medical records, telehealth, hours, and volunteer info. What do you need help with today?";
  }
  if (lower.includes("thank")) return "You're welcome! Is there anything else I can help you with today?";
  if (lower.includes("pain") || lower.includes("hurt") || lower.includes("sick")) {
    return "I'm sorry to hear you're not feeling well. For medical concerns, please contact your provider directly or visit our urgent care if you need prompt attention. For emergencies, please call 911.";
  }
  return "I can help with: appointments, insurance, prescriptions, medical records, telehealth visits, clinic hours, and volunteering. Would you like information on any of these topics?";
}

function SubmitBtn({ children, loading, onClick }) {
  return (
    <button onClick={onClick} disabled={loading} className="submit-btn">
      {loading ? "Submitting…" : children}
    </button>
  );
}

function SuccessCard({ title, message, onReset }) {
  return (
    <div className="success-card">
      <div className="success-icon">✓</div>
      <p className="success-title">{title}</p>
      <p className="success-msg">{message}</p>
      <button onClick={onReset} className="reset-link">Submit another</button>
    </div>
  );
}

function Field({ label, id, required, type = "text", value, onChange, placeholder, options }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}{required && <span className="req">*</span>}</label>
      {type === "select" ? (
        <select id={id} value={value} onChange={onChange}>
          <option value="">Select…</option>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea id={id} value={value} onChange={onChange} placeholder={placeholder} rows={3} />
      ) : (
        <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} />
      )}
    </div>
  );
}

function PatientForm() {
  const [form, setForm] = useState({ name: "", dob: "", phone: "", email: "", support: "", details: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = () => {
    if (!form.name || !form.email || !form.support) return alert("Please fill required fields.");
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1200);
  };
  if (done) return <SuccessCard title="Request received" message={`Thank you, ${form.name}. Our patient services team will contact you within 1–2 business days regarding your ${form.support.toLowerCase()} request.`} onReset={() => { setForm({ name: "", dob: "", phone: "", email: "", support: "", details: "" }); setDone(false); }} />;
  return (
    <div>
      <p className="form-desc">Need help navigating your care? Fill out this form and a patient advocate will reach out within 1–2 business days.</p>
      <Field label="Full name" id="p-name" required value={form.name} onChange={set("name")} placeholder="Jane Smith" />
      <Field label="Date of birth" id="p-dob" type="date" value={form.dob} onChange={set("dob")} />
      <div className="row2">
        <Field label="Phone" id="p-phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="(555) 000-0000" />
        <Field label="Email" id="p-email" type="email" required value={form.email} onChange={set("email")} placeholder="you@email.com" />
      </div>
      <Field label="Type of support needed" id="p-support" type="select" required value={form.support} onChange={set("support")} options={["Appointment Scheduling", "Insurance & Billing", "Care Navigation", "Mental Health Support", "Transportation Assistance", "Prescription Help", "Other"]} />
      <Field label="Additional details" id="p-details" type="textarea" value={form.details} onChange={set("details")} placeholder="Describe your situation or any specific questions…" />
      <SubmitBtn loading={loading} onClick={submit}>Submit Request</SubmitBtn>
    </div>
  );
}

function VolunteerForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", area: "", avail: "", experience: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = () => {
    if (!form.name || !form.email || !form.area) return alert("Please fill required fields.");
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1200);
  };
  if (done) return <SuccessCard title="Application submitted!" message={`Welcome, ${form.name}! We're excited about your interest in volunteering. You'll receive a confirmation email shortly with details about our next orientation session.`} onReset={() => { setForm({ name: "", email: "", phone: "", area: "", avail: "", experience: "" }); setDone(false); }} />;
  return (
    <div>
      <div className="info-banner">Volunteers make a meaningful difference. Join our team and help patients and families in your community.</div>
      <div className="row2">
        <Field label="Full name" id="v-name" required value={form.name} onChange={set("name")} placeholder="Jane Smith" />
        <Field label="Email" id="v-email" type="email" required value={form.email} onChange={set("email")} placeholder="you@email.com" />
      </div>
      <Field label="Phone" id="v-phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="(555) 000-0000" />
      <Field label="Area of interest" id="v-area" type="select" required value={form.area} onChange={set("area")} options={["Patient Companion", "Administrative Support", "Transportation Aid", "Community Outreach", "Event Support", "Youth Programs", "Hospice & Palliative Care"]} />
      <Field label="Availability" id="v-avail" type="select" value={form.avail} onChange={set("avail")} options={["Weekday mornings", "Weekday afternoons", "Weekday evenings", "Weekends", "Flexible"]} />
      <Field label="Relevant experience (optional)" id="v-exp" type="textarea" value={form.experience} onChange={set("experience")} placeholder="Brief background — healthcare, caregiving, admin, etc." />
      <SubmitBtn loading={loading} onClick={submit}>Apply to Volunteer</SubmitBtn>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = () => {
    if (!form.name || !form.email || !form.message) return alert("Please fill required fields.");
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1200);
  };
  if (done) return <SuccessCard title="Message sent!" message="Thank you for reaching out. Our team will respond within 24 hours. For urgent matters, please call 1-800-HEALTH-1." onReset={() => { setForm({ name: "", email: "", subject: "", message: "" }); setDone(false); }} />;
  return (
    <div>
      <div className="row2">
        <Field label="Your name" id="c-name" required value={form.name} onChange={set("name")} placeholder="Jane Smith" />
        <Field label="Email" id="c-email" type="email" required value={form.email} onChange={set("email")} placeholder="you@email.com" />
      </div>
      <Field label="Subject" id="c-sub" type="select" value={form.subject} onChange={set("subject")} options={["General Inquiry", "Appointment Help", "Billing Question", "Feedback / Complaint", "Media / Press", "Partnerships"]} />
      <Field label="Message" id="c-msg" type="textarea" required value={form.message} onChange={set("message")} placeholder="How can we help you?" />
      <p className="contact-info"><strong>Phone:</strong> 1-800-HEALTH-1 &nbsp;|&nbsp; <strong>Hours:</strong> Mon–Fri 8am–6pm</p>
      <SubmitBtn loading={loading} onClick={submit}>Send Message</SubmitBtn>
    </div>
  );
}

function ChatBot() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm HealthBot, your AI assistant. I can answer common questions about appointments, insurance, prescriptions, hours, and more. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [useAPI, setUseAPI] = useState(false);
  const bottomRef = useRef(null);
  const suggested = ["How do I book an appointment?", "What insurance do you accept?", "How do I request my records?", "What are your clinic hours?"];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput("");
    setMessages(m => [...m, { role: "user", text: msg }]);
    setTyping(true);
    if (useAPI) {
      try {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system:
        "You are HealthBot, a friendly and concise AI assistant for a healthcare support center. Help patients with questions about appointments, insurance, prescriptions, medical records, telehealth, clinic hours, and volunteering. Keep responses brief (2–4 sentences). If the question is a medical emergency, advise calling 911. Don't give personal medical advice.",
      messages: [
        {
          role: "user",
          content: msg,
        },
      ],
    }),
  });
        const data = await res.json();
        setMessages(m => [...m, { role: "bot", text: data.content?.[0]?.text || "Sorry, I couldn't process that." }]);
      } catch {
        setMessages(m => [...m, { role: "bot", text: "Sorry, I'm having trouble connecting right now." }]);
      }
    } else {
      await new Promise(r => setTimeout(r, 700 + Math.random() * 500));
      setMessages(m => [...m, { role: "bot", text: getAIResponse(msg) }]);
    }
    setTyping(false);
  };

  return (
    <div>
      <div className="chat-header">
        <p className="form-desc" style={{ margin: 0 }}>Powered by AI — common questions answered instantly</p>
        <label className="api-toggle">
          <input type="checkbox" checked={useAPI} onChange={e => setUseAPI(e.target.checked)} />
          Use Claude AI
        </label>
      </div>
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`msg-row ${m.role}`}>
            {m.role === "bot" && <div className="bot-avatar">H</div>}
            <div className={`bubble ${m.role}`}>{m.text}</div>
          </div>
        ))}
        {typing && (
          <div className="msg-row bot">
            <div className="bot-avatar">H</div>
            <div className="bubble bot typing-dots">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="suggested-row">
        {suggested.map(q => <button key={q} className="suggested-btn" onClick={() => send(q)}>{q}</button>)}
      </div>
      <div className="chat-input-row">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask a question…" className="chat-input" />
        <button onClick={() => send()} className="send-btn">Send</button>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState(0);
  const icons = ["♥", "★", "✉", "◉"];
  const subtitles = ["Request assistance from our patient advocates", "Join our volunteer community", "Get in touch with our team", "Ask our AI assistant any healthcare question"];

  return (
    <div className="app">
      <div className="header">
        <div className="logo">+</div>
        <div>
          <div className="app-title">Healthcare Support Center</div>
          <div className="app-subtitle">Patient services, volunteer programs, and 24/7 AI assistance</div>
        </div>
      </div>

      <div className="tab-switcher">
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} className={`tab-btn ${tab === i ? "active" : ""}`}>
            <span className="tab-icon">{icons[i]}</span>
            <span>{t}</span>
            {i === 3 && <span className="ai-badge">AI</span>}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-icon">{icons[tab]}</span>
          <div>
            <div className="card-title">{TABS[tab]}</div>
            <div className="card-subtitle">{subtitles[tab]}</div>
          </div>
        </div>
        {tab === 0 && <PatientForm />}
        {tab === 1 && <VolunteerForm />}
        {tab === 2 && <ContactForm />}
        {tab === 3 && <ChatBot />}
      </div>

      <div className="footer-tiles">
        {[["Emergency", "Call 108"], ["Urgent Care", "Open daily 7am–9pm"], ["24/7 Nurse Line", "1-800-HEALTH-1"]].map(([t, s]) => (
          <div key={t} className="tile">
            <div className="tile-title">{t}</div>
            <div className="tile-sub">{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
