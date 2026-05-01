import { useState, useEffect } from "react";

const CADENCE_OPTIONS = [
  { value: 3, label: "Every few days" },
  { value: 7, label: "Weekly" },
  { value: 14, label: "Bi-weekly" },
  { value: 30, label: "Monthly" },
  { value: 90, label: "Quarterly" },
];

const LOVE_LANGUAGES = [
  { key: "words", label: "Words of Affirmation", icon: "💬" },
  { key: "acts", label: "Acts of Service", icon: "🤝" },
  { key: "gifts", label: "Receiving Gifts", icon: "🎁" },
  { key: "time", label: "Quality Time", icon: "⏳" },
  { key: "touch", label: "Physical Touch", icon: "🤗" },
];

const CONTACT_COLORS = ["#9b7fbd","#c47fa0","#7a9fbf","#6aab8a","#c4956a","#7fbdbd","#bd7f9b","#9bbd7f"];

const DEFAULT_CONTACTS = [
  {
    id: 1, name: "Claire Navarro", initials: "CN", tier: "close", cadenceDays: 3,
    birthday: "1984-09-12", lastContact: "2026-04-22", preferredChannel: "text",
    notes: "Elementary school teacher with a huge laugh and zero filter. Warm, funny, fiercely loyal. Going through a separation after 12 years of marriage and handling it with more grace than anyone has a right to.",
    address: "214 Birchwood Lane\nAustin, TX 78701", favoriteRestaurant: "Lupe's Tacos", goToGesture: "Iced chai latte on her doorstep",
    guiltyPleasure: "Real Housewives of anywhere", favoriteBeverage: "Iced chai latte", favoriteSnack: "Takis",
    currentHardThing: "Navigating a separation after 12 years. Single parenting Mateo and Sofia while keeping it together for them.",
    howToSupport: "Wants to talk it through — she needs to feel heard, not fixed. Just showing up is everything.",
    whatMakesThemLaugh: "Self-deprecating humor and 90s sitcom references. She can quote Friends in her sleep.",
    currentlyInto: "Pottery classes on Saturday mornings — says it's the only hour of the week that's just hers.",
    faith: "Catholic", prayerRequests: "Peace through the separation. Strength for her kids, especially Mateo who's been struggling.",
    loveLanguages: ["words", "time"],
    significantOther: { name: "", birthday: "" },
    kids: [{ name: "Mateo", birthday: "2016-03-08" }, { name: "Sofia", birthday: "2019-11-21" }],
    pets: [],
    lifeEvents: [
      { date: "2026-03-15", event: "Moved into her own apartment for the first time", category: "life" },
      { date: "2026-01-10", event: "Told the kids about the separation", category: "family" },
    ],
    color: "#9b7fbd"
  },
  {
    id: 2, name: "Tom Okafor", initials: "TO", tier: "friend", cadenceDays: 14,
    birthday: "1981-06-03", lastContact: "2026-04-01", preferredChannel: "call",
    notes: "Former college roommate. Software engineer by day, woodworker by night. Dry humor, big heart, and incapable of small talk. Just relocated to Portland with his wife Kezia.",
    address: "88 Maple Street\nPortland, OR 97201", favoriteRestaurant: "Pok Pok", goToGesture: "A good bottle of bourbon",
    guiltyPleasure: "Competitive reality cooking shows — very serious about them", favoriteBeverage: "Black coffee, no exceptions", favoriteSnack: "Salt and vinegar chips",
    currentHardThing: "",
    howToSupport: "Doesn't process out loud — give him space and he'll come to you when he's ready.",
    whatMakesThemLaugh: "Absurdist humor and terrible puns. The worse the pun, the better.",
    currentlyInto: "Sourdough bread baking. He texts photos of every loaf.",
    faith: "", prayerRequests: "",
    loveLanguages: ["acts"],
    significantOther: { name: "Kezia", birthday: "1983-02-14" },
    kids: [],
    pets: [{ name: "Biscuit", type: "Beagle" }],
    lifeEvents: [
      { date: "2026-02-01", event: "Relocated from Chicago to Portland", category: "life" },
      { date: "2025-11-15", event: "Launched a woodworking Etsy shop — first sale in two weeks", category: "career" },
    ],
    color: "#7a9fbf"
  },
  {
    id: 3, name: "Priya Mehta", initials: "PM", tier: "close", cadenceDays: 14,
    birthday: "1986-04-28", lastContact: "2026-04-10", preferredChannel: "text",
    notes: "Radiologist and quiet force of nature. Meticulous, deeply creative, and one of the kindest people alive. Huge Bollywood fan. Has been going through IVF for over a year — second round now.",
    address: "", favoriteRestaurant: "Rasika (or any great Indian place)", goToGesture: "Drop off dinner — she never thinks to eat when she's stressed",
    guiltyPleasure: "K-dramas until 1am", favoriteBeverage: "Masala chai, the real kind", favoriteSnack: "Mango with chili and lime",
    currentHardThing: "Second round of IVF. She is hopeful but exhausted and trying not to let it take over her whole identity.",
    howToSupport: "Doesn't want advice or silver linings — just company and normalcy. Treat her like a person, not a patient.",
    whatMakesThemLaugh: "Her husband Raj's terrible dancing. And anything absurd — she has a surprisingly dark sense of humor.",
    currentlyInto: "Watercolor painting. She's surprisingly good and very self-deprecating about it.",
    faith: "Hindu", prayerRequests: "The IVF working. Peace either way.",
    loveLanguages: ["time", "acts"],
    significantOther: { name: "Raj", birthday: "1984-04-03" },
    kids: [],
    pets: [],
    lifeEvents: [
      { date: "2026-03-01", event: "Started second round of IVF", category: "health" },
      { date: "2025-12-20", event: "Her mom visited from Mumbai for a month — really lifted her spirits", category: "family" },
    ],
    color: "#c4956a"
  },
  {
    id: 4, name: "Becca Lawson", initials: "BL", tier: "close", cadenceDays: 7,
    birthday: "1988-11-30", lastContact: "2026-04-18", preferredChannel: "text",
    notes: "Stay-at-home mom turned entrepreneur. Launched a candle business from her kitchen that's actually taking off. Wildly creative, obsessively organized, and has the best meme game of anyone you know.",
    address: "502 Clover Hill Rd\nNashville, TN 37205", favoriteRestaurant: "Hattie B's", goToGesture: "Send her a meme — she will lose it. Or a Diet Coke.",
    guiltyPleasure: "True crime podcasts at 2am (her husband does not understand this)", favoriteBeverage: "Diet Coke — borderline religious about it", favoriteSnack: "Goldfish crackers by the handful",
    currentHardThing: "",
    howToSupport: "Hype her up — she second-guesses herself more than she lets on. She needs cheerleaders, not advisors.",
    whatMakesThemLaugh: "Her kids' chaos. Parenting memes. Anything that captures the absurdity of being a mom.",
    currentlyInto: "Her candle launch — working on getting into two local boutiques.",
    faith: "Non-denominational Christian", prayerRequests: "The candle business finding its footing. Her husband Jake's job search — he's been looking for 4 months.",
    loveLanguages: ["words", "gifts"],
    significantOther: { name: "Jake", birthday: "1986-08-19" },
    kids: [{ name: "Willa", birthday: "2018-05-14" }, { name: "Henry", birthday: "2021-02-03" }],
    pets: [{ name: "Moose", type: "Golden retriever" }],
    lifeEvents: [
      { date: "2026-04-01", event: "Launched her candle business — Hearthside Co.", category: "career" },
      { date: "2026-01-20", event: "Jake started a job search after his company downsized", category: "family" },
    ],
    color: "#6aab8a"
  },
];

const T = {
  bg: "#f7f4fc", bgCard: "#ffffff", bgSidebar: "#f0ebf8",
  border: "#e0d6f0", accentMid: "#c4b0f0",
  accent: "#8b5cf6", accentLight: "#ede9ff",
  text: "#2d2540", textMid: "#6b5d7e", textLight: "#9d8fb0",
  header: "#ffffff",
  success: "#6aab8a", warm: "#c4956a", danger: "#c47fa0", warning: "#c4a86a",
};

const categoryColors = { career: "#7a9fbf", family: "#c4956a", life: "#9b7fbd", personal: "#6aab8a", health: "#c47fa0" };
const categoryIcons = { career: "💼", family: "👨‍👩‍👧", life: "🏠", personal: "✨", health: "🌸" };
const tierLabels = { close: "Close Friend", friend: "Friend", acquaintance: "Acquaintance" };
const channelIcons = { text: "💬", call: "📞", email: "✉️" };

function makeInitials(name) {
  return name.split(" ").filter(Boolean).map(function(w) { return w[0]; }).join("").toUpperCase().slice(0, 2);
}

function blankContact(id) {
  return {
    id: id, name: "", initials: "", tier: "friend", cadenceDays: 14,
    birthday: null, lastContact: new Date().toISOString().split("T")[0],
    preferredChannel: "text", notes: "", address: "", favoriteRestaurant: "",
    goToGesture: "", guiltyPleasure: "", favoriteBeverage: "", favoriteSnack: "",
    currentHardThing: "", howToSupport: "", whatMakesThemLaugh: "", currentlyInto: "",
    faith: "", prayerRequests: "", pets: [], loveLanguages: [],
    significantOther: { name: "", birthday: "" }, kids: [], lifeEvents: [],
    color: CONTACT_COLORS[Math.floor(Math.random() * CONTACT_COLORS.length)]
  };
}

function loadContacts() {
  try {
    var saved = localStorage.getItem("ck_v4");
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return DEFAULT_CONTACTS;
}

function saveContacts(contacts) {
  try { localStorage.setItem("ck_v4", JSON.stringify(contacts)); } catch (e) {}
}

function daysBetween(d1, d2) {
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}

function nextOccurrence(dateStr) {
  if (!dateStr) return null;
  var today = new Date();
  var d = new Date(dateStr);
  var next = new Date(today.getFullYear(), d.getMonth(), d.getDate());
  if (next < today) next.setFullYear(today.getFullYear() + 1);
  return next;
}

function daysSince(dateStr) {
  return daysBetween(new Date(dateStr), new Date());
}

function getNudgeUrgency(contact) {
  var days = daysSince(contact.lastContact);
  var cadence = contact.cadenceDays || 14;
  if (days > cadence * 1.5) return "overdue";
  if (days > cadence) return "due";
  return "ok";
}

function getUpcomingDates(contacts) {
  var events = [];
  var today = new Date();
  contacts.forEach(function(c) {
    function addDate(dateStr, label) {
      var next = nextOccurrence(dateStr);
      if (!next) return;
      var days = daysBetween(today, next);
      if (days <= 60) events.push({ contact: c, label: label, days: days });
    }
    if (c.birthday) addDate(c.birthday, c.name + "'s Birthday");
    if (c.significantOther && c.significantOther.name && c.significantOther.birthday)
      addDate(c.significantOther.birthday, c.significantOther.name + "'s Birthday (" + c.name + "'s partner)");
    (c.kids || []).forEach(function(k) {
      if (k.name && k.birthday) addDate(k.birthday, k.name + "'s Birthday (" + c.name + "'s kid)");
    });
  });
  return events.sort(function(a, b) { return a.days - b.days; });
}

var btnBase = { borderRadius: "9px", cursor: "pointer", fontSize: "14px", fontFamily: "inherit", transition: "all 0.15s", padding: "9px 18px" };

function btn(variant) {
  if (variant === "ghost") return Object.assign({}, btnBase, { background: "transparent", color: T.textMid, border: "1px solid " + T.border });
  if (variant === "secondary") return Object.assign({}, btnBase, { background: T.accentLight, color: T.accent, border: "1px solid " + T.accentMid });
  if (variant === "danger") return Object.assign({}, btnBase, { background: "#fdf0f5", color: T.danger, border: "1px solid #e8a0b044" });
  if (variant === "sm") return Object.assign({}, btnBase, { background: "transparent", color: T.textMid, border: "1px solid " + T.border, padding: "5px 12px", fontSize: "13px" });
  return Object.assign({}, btnBase, { background: T.accent, color: "#fff", border: "none", boxShadow: "0 2px 8px rgba(139,92,246,0.25)" });
}

var inputStyle = { background: T.bg, border: "1px solid " + T.border, borderRadius: "9px", padding: "10px 14px", color: T.text, fontFamily: "inherit", fontSize: "15px", width: "100%", boxSizing: "border-box" };
var selectStyle = Object.assign({}, inputStyle, { cursor: "pointer" });
var textareaStyle = Object.assign({}, inputStyle, { minHeight: "70px", resize: "vertical" });
var modalOverlay = { position: "fixed", inset: 0, background: "rgba(45,37,64,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 };
var modalBox = { background: T.bgCard, border: "1px solid " + T.border, borderRadius: "18px", padding: "28px", width: "540px", maxWidth: "94vw", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 8px 40px rgba(139,92,246,0.15)" };
var sectionTitle = { fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: T.textLight, marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid " + T.border };
var fieldLabel = { fontSize: "11px", color: T.textLight, marginBottom: "6px", letterSpacing: "0.08em", textTransform: "uppercase" };
var infoBox = { background: T.bg, border: "1px solid " + T.border, borderRadius: "10px", padding: "12px 16px", fontSize: "15px", color: T.textMid, lineHeight: 1.6 };
var row2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" };
var card = { background: T.bgCard, border: "1px solid " + T.border, borderRadius: "14px", padding: "20px", boxShadow: "0 2px 12px rgba(139,92,246,0.05)" };
var eventRow = { display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid " + T.border };

function Avatar(props) {
  var size = props.size || 38;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: props.color + "22", border: "2px solid " + props.color + "66", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.32, color: props.color, flexShrink: 0 }}>
      {props.initials}
    </div>
  );
}

function Tag(props) {
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", background: props.color + "18", color: props.color, border: "1px solid " + props.color + "44", marginRight: "6px", marginBottom: "4px" }}>
      {props.children}
    </span>
  );
}

export default function CircleKeeper() {
  var [contacts, setContacts] = useState(loadContacts);
  var [view, setView] = useState("today");
  var [selectedContact, setSelectedContact] = useState(null);
  var [editingContact, setEditingContact] = useState(null);
  var [isNew, setIsNew] = useState(false);
  var [draftTarget, setDraftTarget] = useState(null);
  var [draftContext, setDraftContext] = useState("");
  var [draftResult, setDraftResult] = useState("");
  var [draftLoading, setDraftLoading] = useState(false);
  var [addingEvent, setAddingEvent] = useState(false);
  var [newEvent, setNewEvent] = useState({ event: "", category: "life" });
  var [logContact, setLogContact] = useState(null);
  var [logNote, setLogNote] = useState("");
  var [banner, setBanner] = useState("");
  var [confirmDelete, setConfirmDelete] = useState(null);
  var [feedbackOpen, setFeedbackOpen] = useState(false);
  var [feedbackNote, setFeedbackNote] = useState("");
  var [feedbackSending, setFeedbackSending] = useState(false);
  var [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(function() { saveContacts(contacts); }, [contacts]);

  function showBanner(msg) {
    setBanner(msg);
    setTimeout(function() { setBanner(""); }, 2500);
  }

  function openEdit(contact) {
    setIsNew(false);
    setEditingContact(JSON.parse(JSON.stringify(contact)));
  }

  function openAdd() {
    setIsNew(true);
    setEditingContact(blankContact(Date.now()));
  }

  function saveEdit() {
    if (!editingContact.name.trim()) return;
    var c = Object.assign({}, editingContact, { initials: makeInitials(editingContact.name) });
    if (isNew) {
      setContacts(function(prev) { return prev.concat([c]); });
    } else {
      setContacts(function(prev) { return prev.map(function(x) { return x.id === c.id ? c : x; }); });
      if (selectedContact && selectedContact.id === c.id) setSelectedContact(c);
    }
    setEditingContact(null);
    showBanner("Saved");
  }

  function deleteContact(id) {
    setContacts(function(prev) { return prev.filter(function(c) { return c.id !== id; }); });
    setSelectedContact(null);
    setView("contacts");
    setConfirmDelete(null);
    showBanner("Removed");
  }

  function updateEdit(field, value) {
    setEditingContact(function(prev) { return Object.assign({}, prev, { [field]: value }); });
  }

  function updateEditNested(parent, field, value) {
    setEditingContact(function(prev) {
      var nested = Object.assign({}, prev[parent], { [field]: value });
      return Object.assign({}, prev, { [parent]: nested });
    });
  }

  function toggleLL(key) {
    setEditingContact(function(prev) {
      var langs = prev.loveLanguages || [];
      var next = langs.includes(key) ? langs.filter(function(l) { return l !== key; }) : langs.concat([key]);
      return Object.assign({}, prev, { loveLanguages: next });
    });
  }

  function addKid() {
    setEditingContact(function(prev) {
      return Object.assign({}, prev, { kids: (prev.kids || []).concat([{ name: "", birthday: "" }]) });
    });
  }

  function updateKid(i, field, value) {
    setEditingContact(function(prev) {
      var kids = prev.kids.slice();
      kids[i] = Object.assign({}, kids[i], { [field]: value });
      return Object.assign({}, prev, { kids: kids });
    });
  }

  function removeKid(i) {
    setEditingContact(function(prev) {
      return Object.assign({}, prev, { kids: prev.kids.filter(function(_, idx) { return idx !== i; }) });
    });
  }

  function addPet() {
    setEditingContact(function(prev) {
      return Object.assign({}, prev, { pets: (prev.pets || []).concat([{ name: "", type: "" }]) });
    });
  }

  function updatePet(i, field, value) {
    setEditingContact(function(prev) {
      var pets = prev.pets.slice();
      pets[i] = Object.assign({}, pets[i], { [field]: value });
      return Object.assign({}, prev, { pets: pets });
    });
  }

  function removePet(i) {
    setEditingContact(function(prev) {
      return Object.assign({}, prev, { pets: prev.pets.filter(function(_, idx) { return idx !== i; }) });
    });
  }

  function addLifeEvent(contactId) {
    var ev = { date: new Date().toISOString().split("T")[0], event: newEvent.event, category: newEvent.category };
    setContacts(function(prev) {
      return prev.map(function(c) {
        return c.id !== contactId ? c : Object.assign({}, c, { lifeEvents: [ev].concat(c.lifeEvents) });
      });
    });
    if (selectedContact && selectedContact.id === contactId) {
      setSelectedContact(function(prev) { return Object.assign({}, prev, { lifeEvents: [ev].concat(prev.lifeEvents) }); });
    }
    setAddingEvent(false);
    setNewEvent({ event: "", category: "life" });
    showBanner("Event added");
  }

  function logContactMade(contactId) {
    var today = new Date().toISOString().split("T")[0];
    setContacts(function(prev) {
      return prev.map(function(c) { return c.id !== contactId ? c : Object.assign({}, c, { lastContact: today }); });
    });
    if (selectedContact && selectedContact.id === contactId) {
      setSelectedContact(function(prev) { return Object.assign({}, prev, { lastContact: today }); });
    }
    setLogContact(null);
    setLogNote("");
    showBanner("Contact logged");
  }

  function exportContacts() {
    var data = JSON.stringify(contacts, null, 2);
    var blob = new Blob([data], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "circlekeeper-backup-" + new Date().toISOString().split("T")[0] + ".json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importContacts(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
      try {
        var imported = JSON.parse(ev.target.result);
        if (Array.isArray(imported)) {
          setContacts(imported);
          showBanner("Imported " + imported.length + " contacts");
        } else {
          alert("That doesn't look like a CircleKeeper backup file.");
        }
      } catch (err) {
        alert("Couldn't read that file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  async function draftMessage(contact, context) {
    setDraftLoading(true);
    setDraftResult("");
    var recentEvent = contact.lifeEvents[0];
    var loveLangs = (contact.loveLanguages || []).map(function(k) {
      var l = LOVE_LANGUAGES.find(function(x) { return x.key === k; });
      return l ? l.label : null;
    }).filter(Boolean);
    var prompt = "You are a warm assistant helping someone stay genuinely connected with a friend.\n\nFriend: " + contact.name + "\nRelationship: " + contact.tier + " friend\nAbout them: " + contact.notes + "\n" + (recentEvent ? "Most significant thing in their life: " + recentEvent.event + "\n" : "") + (contact.goToGesture ? "What they love receiving: " + contact.goToGesture + "\n" : "") + (loveLangs.length ? "Love language(s): " + loveLangs.join(", ") + "\n" : "") + "Preferred channel: " + contact.preferredChannel + "\n" + (context ? "Context: " + context + "\n" : "") + "\nWrite a short, genuine, warm message (2-4 sentences). Sound like a caring real friend. Be specific to their life. If they are going through something hard, lead with warmth. Do not use cliches. Do not say 'thinking of you' or 'reaching out' or 'just checking in'.";
    try {
      var res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] })
      });
      var data = await res.json();
      setDraftResult((data.content && data.content[0] && data.content[0].text) || "Could not generate message.");
    } catch (err) {
      setDraftResult("AI drafting will work once hosted. For now ask Claude directly in chat!");
    }
    setDraftLoading(false);
  }

  async function sendFeedback() {
    if (!feedbackNote.trim()) return;
    setFeedbackSending(true);
    try {
      await fetch("https://formspree.io/f/maqpezjg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "Krishilburnwilliams@gmail.com",
          _subject: "CircleKeeper Feedback",
          message: feedbackNote,
          date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
        })
      });
      setFeedbackSent(true);
      setFeedbackNote("");
      setTimeout(function() { setFeedbackSent(false); setFeedbackOpen(false); }, 2500);
    } catch (err) {
      alert("Couldn't send. Please try again.");
    }
    setFeedbackSending(false);
  }

  var upcoming = getUpcomingDates(contacts);
  var nudges = contacts.filter(function(c) { return getNudgeUrgency(c) !== "ok"; });

  function TodayView() {
    return (
      <div>
        <div style={{ fontSize: 28, fontWeight: 400, marginBottom: 4 }}>Good morning. 🌸</div>
        <div style={{ fontSize: 15, color: T.textLight, marginBottom: 28 }}>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · Here's who needs your attention</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div style={card}>
            <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textLight, marginBottom: 16 }}>🗓 Upcoming Dates</div>
            {upcoming.length === 0 && <div style={{ color: T.textLight, fontSize: 15 }}>Nothing in the next 60 days</div>}
            {upcoming.map(function(u, i) {
              return (
                <div key={i} style={eventRow}>
                  <Avatar color={u.contact.color} initials={u.contact.initials} size={32} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15 }}>{u.label}</div>
                    <div style={{ fontSize: 13, color: T.textLight }}>{u.days === 0 ? "Today!" : "in " + u.days + " days"}</div>
                  </div>
                  <button style={btn("secondary")} onClick={function() { setDraftTarget(u.contact); setDraftContext(u.label + (u.days === 0 ? " is today!" : " is in " + u.days + " days")); }}>Draft</button>
                </div>
              );
            })}
          </div>

          <div style={card}>
            <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textLight, marginBottom: 16 }}>💛 Check-in Nudges</div>
            {nudges.length === 0 && <div style={{ color: T.textLight, fontSize: 15 }}>You're all caught up!</div>}
            {nudges.map(function(c) {
              var days = daysSince(c.lastContact);
              var urgency = getNudgeUrgency(c);
              var cadenceLabel = (CADENCE_OPTIONS.find(function(o) { return o.value === c.cadenceDays; }) || {}).label || "Custom";
              return (
                <div key={c.id} style={eventRow}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: urgency === "overdue" ? T.danger : T.warning }} />
                  <Avatar color={c.color} initials={c.initials} size={32} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15 }}>{c.name}</div>
                    <div style={{ fontSize: 13, color: T.textLight }}>{days}d ago · {cadenceLabel.toLowerCase()}</div>
                  </div>
                  <button style={btn("secondary")} onClick={function() { setDraftTarget(c); setDraftContext(""); }}>Reach out</button>
                </div>
              );
            })}
          </div>

          <div style={Object.assign({}, card, { gridColumn: "1 / -1" })}>
            <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textLight, marginBottom: 16 }}>🌸 What's happening in your circle</div>
            {contacts.every(function(c) { return c.lifeEvents.length === 0; }) && (
              <div style={{ color: T.textLight, fontSize: 15 }}>Add life events to contacts to see them here.</div>
            )}
            {contacts.flatMap(function(c) { return c.lifeEvents.slice(0, 1).map(function(e) { return Object.assign({}, e, { contact: c }); }); })
              .sort(function(a, b) { return new Date(b.date) - new Date(a.date); })
              .slice(0, 6)
              .map(function(e, i) {
                return (
                  <div key={i} style={eventRow}>
                    <Avatar color={e.contact.color} initials={e.contact.initials} size={32} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 15 }}>{e.contact.name}</span>
                      <span style={{ fontSize: 15, color: T.textMid }}> — {e.event}</span>
                    </div>
                    <button style={btn("secondary")} onClick={function() { setDraftTarget(e.contact); setDraftContext(e.event); }}>Draft</button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }

  function ContactProfile(props) {
    var contact = props.contact;
    var urgency = getNudgeUrgency(contact);
    var days = daysSince(contact.lastContact);
    var bday = nextOccurrence(contact.birthday);
    var bdayDays = bday ? daysBetween(new Date(), bday) : null;
    var hasHardThing = contact.lifeEvents.some(function(e) { return e.category === "health" || (e.category === "family" && e.event.toLowerCase().includes("diagnos")); });
    var cadenceLabel = (CADENCE_OPTIONS.find(function(o) { return o.value === contact.cadenceDays; }) || {}).label || "Custom";
    var loveLangs = (contact.loveLanguages || []).map(function(k) { return LOVE_LANGUAGES.find(function(l) { return l.key === k; }); }).filter(Boolean);

    return (
      <div>
        <button style={btn("sm")} onClick={function() { setSelectedContact(null); }}>← Back</button>
        <div style={{ height: 20 }} />

        {hasHardThing && (
          <div style={{ background: "#fdf0f5", border: "1px solid #e8a0b044", borderRadius: 10, padding: "12px 16px", fontSize: 14, color: "#8a4060", lineHeight: 1.6, marginBottom: 16 }}>
            💙 {contact.name} is going through something difficult. A simple, genuine message goes a long way.
          </div>
        )}

        <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginBottom: 24, flexWrap: "wrap" }}>
          <Avatar color={contact.color} initials={contact.initials} size={62} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>{contact.name}</div>
            <div style={{ fontSize: 15, color: T.textMid, marginBottom: 10 }}>{tierLabels[contact.tier]} · {channelIcons[contact.preferredChannel]} {contact.preferredChannel} · {cadenceLabel.toLowerCase()}</div>
            <div>
              {urgency !== "ok" && <Tag color={urgency === "overdue" ? T.danger : T.warning}>{days}d since contact</Tag>}
              {bdayDays !== null && bdayDays <= 60 && <Tag color={T.warm}>🎂 Birthday in {bdayDays}d</Tag>}
              {loveLangs.map(function(l) { return <Tag key={l.key} color={T.accent}>{l.icon} {l.label}</Tag>; })}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button style={btn("ghost")} onClick={function() { openEdit(contact); }}>Edit</button>
            <button style={btn("ghost")} onClick={function() { setLogContact(contact); }}>Log contact</button>
            <button style={btn()} onClick={function() { setDraftTarget(contact); setDraftContext(""); }}>Draft message</button>
            <button style={btn("danger")} onClick={function() { setConfirmDelete(contact); }}>Remove</button>
          </div>
        </div>

        {contact.notes && (
          <div style={{ marginBottom: 24 }}>
            <div style={sectionTitle}>About</div>
            <div style={{ fontSize: 16, lineHeight: 1.7, color: T.textMid }}>{contact.notes}</div>
          </div>
        )}

        {contact.whatMakesThemLaugh && (
          <div style={{ marginBottom: 24 }}>
            <div style={sectionTitle}>😄 What makes them laugh</div>
            <div style={{ fontSize: 15, lineHeight: 1.7, color: T.textMid }}>{contact.whatMakesThemLaugh}</div>
          </div>
        )}

        {contact.currentHardThing && (
          <div style={{ marginBottom: 24 }}>
            <div style={sectionTitle}>💙 What they're carrying right now</div>
            <div style={{ background: "#fdf0f5", border: "1px solid #e8a0b044", borderRadius: 10, padding: "14px 16px", fontSize: 15, color: "#8a4060", lineHeight: 1.7 }}>
              {contact.currentHardThing}
            </div>
          </div>
        )}

        {contact.howToSupport && (
          <div style={{ marginBottom: 24 }}>
            <div style={sectionTitle}>🤲 How they like to be supported</div>
            <div style={{ background: T.accentLight, border: "1px solid " + T.accentMid, borderRadius: 10, padding: "14px 16px", fontSize: 15, color: T.textMid, lineHeight: 1.7 }}>
              {contact.howToSupport}
            </div>
          </div>
        )}

        {(contact.faith || contact.prayerRequests) && (
          <div style={{ marginBottom: 24 }}>
            <div style={sectionTitle}>🙏 Faith & Prayer</div>
            {contact.faith && (
              <div style={{ fontSize: 13, color: T.textLight, marginBottom: contact.prayerRequests ? 10 : 0 }}>
                <span style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>Tradition — </span>{contact.faith}
              </div>
            )}
            {contact.prayerRequests && (
              <div style={{ background: "#fdf8ed", border: "1px solid #e8d8a044", borderRadius: 10, padding: "14px 16px", fontSize: 15, color: "#7a6030", lineHeight: 1.7 }}>
                {contact.prayerRequests}
              </div>
            )}
          </div>
        )}

        <div style={{ marginBottom: 24 }}>
          <div style={sectionTitle}>How to care well</div>
          <div style={row2}>
            {contact.address && (
              <div style={infoBox}>
                <div style={{ fontSize: 11, color: T.textLight, marginBottom: 4 }}>📬 MAILING ADDRESS</div>
                <div style={{ whiteSpace: "pre-line" }}>{contact.address}</div>
              </div>
            )}
            {contact.favoriteRestaurant && (
              <div style={infoBox}>
                <div style={{ fontSize: 11, color: T.textLight, marginBottom: 4 }}>🍜 FAVORITE RESTAURANT</div>
                {contact.favoriteRestaurant}
              </div>
            )}
            {contact.goToGesture && (
              <div style={infoBox}>
                <div style={{ fontSize: 11, color: T.textLight, marginBottom: 4 }}>💝 GO-TO GESTURE</div>
                {contact.goToGesture}
              </div>
            )}
            {contact.favoriteBeverage && (
              <div style={infoBox}>
                <div style={{ fontSize: 11, color: T.textLight, marginBottom: 4 }}>☕ FAVORITE BEVERAGE</div>
                {contact.favoriteBeverage}
              </div>
            )}
            {contact.favoriteSnack && (
              <div style={infoBox}>
                <div style={{ fontSize: 11, color: T.textLight, marginBottom: 4 }}>🍿 FAVORITE SNACK</div>
                {contact.favoriteSnack}
              </div>
            )}
            {contact.guiltyPleasure && (
              <div style={infoBox}>
                <div style={{ fontSize: 11, color: T.textLight, marginBottom: 4 }}>🙈 GUILTY PLEASURE</div>
                {contact.guiltyPleasure}
              </div>
            )}
            {contact.currentlyInto && (
              <div style={infoBox}>
                <div style={{ fontSize: 11, color: T.textLight, marginBottom: 4 }}>✨ CURRENTLY INTO</div>
                {contact.currentlyInto}
              </div>
            )}
            {!contact.address && !contact.favoriteRestaurant && !contact.goToGesture && !contact.favoriteBeverage && !contact.favoriteSnack && !contact.guiltyPleasure && !contact.currentlyInto && (
              <div style={{ color: T.textLight, fontSize: 15 }}>
                No care details yet. <button style={{ background: "none", border: "none", color: T.accent, cursor: "pointer", fontFamily: "inherit", fontSize: 15, padding: 0 }} onClick={function() { openEdit(contact); }}>Add them →</button>
              </div>
            )}
          </div>
        </div>

        {(contact.significantOther && contact.significantOther.name || (contact.kids || []).some(function(k) { return k.name; }) || (contact.pets || []).some(function(p) { return p.name; })) && (
          <div style={{ marginBottom: 24 }}>
            <div style={sectionTitle}>Their world</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {contact.significantOther && contact.significantOther.name && (
                <div style={infoBox}>
                  <div style={{ fontSize: 11, color: T.textLight, marginBottom: 4 }}>❤️ PARTNER</div>
                  <div>{contact.significantOther.name}</div>
                  {contact.significantOther.birthday && <div style={{ fontSize: 13, color: T.textLight, marginTop: 2 }}>🎂 {new Date(contact.significantOther.birthday).toLocaleDateString("en-US", { month: "long", day: "numeric" })}</div>}
                </div>
              )}
              {(contact.kids || []).map(function(k, i) {
                return k.name ? (
                  <div key={i} style={infoBox}>
                    <div style={{ fontSize: 11, color: T.textLight, marginBottom: 4 }}>👧 KID</div>
                    <div>{k.name}</div>
                    {k.birthday && <div style={{ fontSize: 13, color: T.textLight, marginTop: 2 }}>🎂 {new Date(k.birthday).toLocaleDateString("en-US", { month: "long", day: "numeric" })}</div>}
                  </div>
                ) : null;
              })}
              {(contact.pets || []).map(function(p, i) {
                return p.name ? (
                  <div key={i} style={infoBox}>
                    <div style={{ fontSize: 11, color: T.textLight, marginBottom: 4 }}>🐾 PET</div>
                    <div>{p.name}</div>
                    {p.type && <div style={{ fontSize: 13, color: T.textLight, marginTop: 2 }}>{p.type}</div>}
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={sectionTitle}>Life Events</div>
            <button style={btn("sm")} onClick={function() { setAddingEvent(true); }}>+ Add</button>
          </div>
          {contact.lifeEvents.length === 0 && <div style={{ color: T.textLight, fontSize: 15 }}>No life events logged yet.</div>}
          {contact.lifeEvents.map(function(e, i) {
            return (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: (categoryColors[e.category] || T.accent) + "22", border: "1px solid " + (categoryColors[e.category] || T.accent) + "44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>{categoryIcons[e.category]}</div>
                <div>
                  <div style={{ fontSize: 15 }}>{e.event}</div>
                  <div style={{ fontSize: 13, color: T.textLight, marginTop: 2 }}>{new Date(e.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
                </div>
              </div>
            );
          })}
        </div>

        {contact.birthday && (
          <div style={{ marginBottom: 24 }}>
            <div style={sectionTitle}>Key Dates</div>
            <div style={Object.assign({}, infoBox, { display: "inline-block" })}>
              <div style={{ fontSize: 11, color: T.textLight, marginBottom: 3 }}>BIRTHDAY</div>
              <div style={{ fontSize: 16 }}>{new Date(contact.birthday).toLocaleDateString("en-US", { month: "long", day: "numeric" })}</div>
              {bdayDays !== null && <div style={{ fontSize: 13, color: T.accent, marginTop: 2 }}>{bdayDays === 0 ? "Today! 🎂" : "in " + bdayDays + " days"}</div>}
            </div>
          </div>
        )}
      </div>
    );
  }

  function ContactsView() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <div style={{ fontSize: 28, fontWeight: 400 }}>Your Circle 💜</div>
          <button style={btn()} onClick={openAdd}>+ Add Person</button>
        </div>
        <div style={{ fontSize: 15, color: T.textLight, marginBottom: 28 }}>{contacts.length} {contacts.length === 1 ? "person" : "people"} · all close to your heart</div>
        {contacts.length === 0 && (
          <div style={Object.assign({}, card, { textAlign: "center", padding: 40 })}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>💜</div>
            <div style={{ fontSize: 18, marginBottom: 8 }}>Your circle is empty</div>
            <div style={{ color: T.textLight, marginBottom: 20 }}>Add the people who matter most to you.</div>
            <button style={btn()} onClick={openAdd}>+ Add your first person</button>
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 }}>
          {contacts.map(function(c) {
            var urgency = getNudgeUrgency(c);
            var days = daysSince(c.lastContact);
            var hasHardThing = c.lifeEvents.some(function(e) { return e.category === "health" || (e.category === "family" && e.event.toLowerCase().includes("diagnos")); });
            var cadenceLabel = (CADENCE_OPTIONS.find(function(o) { return o.value === c.cadenceDays; }) || {}).label || "Custom";
            var loveLangs = (c.loveLanguages || []).map(function(k) { return LOVE_LANGUAGES.find(function(l) { return l.key === k; }); }).filter(Boolean);
            return (
              <div key={c.id} style={Object.assign({}, card, { cursor: "pointer" })} onClick={function() { setSelectedContact(c); setView("profile"); }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                  <Avatar color={c.color} initials={c.initials} size={42} />
                  <div>
                    <div style={{ fontSize: 16 }}>{c.name}</div>
                    <div style={{ fontSize: 13, color: T.textLight }}>{tierLabels[c.tier]} · {cadenceLabel.toLowerCase()}</div>
                  </div>
                </div>
                {c.notes && <div style={{ fontSize: 14, color: T.textMid, lineHeight: 1.6, marginBottom: 10 }}>{c.notes.slice(0, 85)}{c.notes.length > 85 ? "…" : ""}</div>}
                {loveLangs.length > 0 && <div style={{ marginBottom: 8 }}>{loveLangs.map(function(l) { return <span key={l.key} style={{ fontSize: 12, color: T.accent, marginRight: 6 }}>{l.icon} {l.label}</span>; })}</div>}
                {hasHardThing && <div style={{ fontSize: 13, color: T.danger }}>💙 Going through something hard</div>}
                {urgency !== "ok" && !hasHardThing && <div style={{ fontSize: 13, color: urgency === "overdue" ? T.danger : T.warning }}>{urgency === "overdue" ? "⚠ " : "• "}{days}d since last contact</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function EditModal() {
    if (!editingContact) return null;
    return (
      <div style={modalOverlay} onClick={function() { setEditingContact(null); }}>
        <div style={modalBox} onClick={function(e) { e.stopPropagation(); }}>
          <div style={{ fontSize: 20, marginBottom: 20 }}>{isNew ? "Add New Person" : "Edit — " + editingContact.name}</div>

          <div style={Object.assign({}, row2, { marginBottom: 16 })}>
            <div>
              <div style={fieldLabel}>Name *</div>
              <input style={inputStyle} value={editingContact.name} onChange={function(e) { updateEdit("name", e.target.value); }} placeholder="Full name" />
            </div>
            <div>
              <div style={fieldLabel}>Relationship</div>
              <select style={selectStyle} value={editingContact.tier} onChange={function(e) { updateEdit("tier", e.target.value); }}>
                <option value="close">Close Friend</option>
                <option value="friend">Friend</option>
                <option value="acquaintance">Acquaintance</option>
              </select>
            </div>
          </div>

          <div style={Object.assign({}, row2, { marginBottom: 16 })}>
            <div>
              <div style={fieldLabel}>Preferred Channel</div>
              <select style={selectStyle} value={editingContact.preferredChannel} onChange={function(e) { updateEdit("preferredChannel", e.target.value); }}>
                <option value="text">💬 Text</option>
                <option value="call">📞 Call</option>
                <option value="email">✉️ Email</option>
              </select>
            </div>
            <div>
              <div style={fieldLabel}>Check-in Cadence</div>
              <select style={selectStyle} value={editingContact.cadenceDays} onChange={function(e) { updateEdit("cadenceDays", Number(e.target.value)); }}>
                {CADENCE_OPTIONS.map(function(o) { return <option key={o.value} value={o.value}>{o.label}</option>; })}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={fieldLabel}>Birthday</div>
            <input style={inputStyle} type="date" value={editingContact.birthday || ""} onChange={function(e) { updateEdit("birthday", e.target.value || null); }} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={fieldLabel}>Notes — who are they?</div>
            <textarea style={textareaStyle} value={editingContact.notes} onChange={function(e) { updateEdit("notes", e.target.value); }} placeholder="Hobbies, interests, personality, what makes them them…" />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={fieldLabel}>😄 What makes them laugh</div>
            <input style={inputStyle} value={editingContact.whatMakesThemLaugh || ""} onChange={function(e) { updateEdit("whatMakesThemLaugh", e.target.value); }} placeholder="e.g. Dry humor, absurdist memes, self-deprecating jokes…" />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={fieldLabel}>✨ Currently into</div>
            <input style={inputStyle} value={editingContact.currentlyInto || ""} onChange={function(e) { updateEdit("currentlyInto", e.target.value); }} placeholder="e.g. Pickleball, a new podcast, learning Italian…" />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={fieldLabel}>💙 What they're carrying right now</div>
            <textarea style={Object.assign({}, textareaStyle, { minHeight: 60 })} value={editingContact.currentHardThing || ""} onChange={function(e) { updateEdit("currentHardThing", e.target.value); }} placeholder="Something hard, heavy, or uncertain in their life right now…" />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={fieldLabel}>🤲 How they like to be supported</div>
            <input style={inputStyle} value={editingContact.howToSupport || ""} onChange={function(e) { updateEdit("howToSupport", e.target.value); }} placeholder="e.g. Distraction and humor, just listen, show up with food…" />
          </div>

          <div style={Object.assign({}, row2, { marginBottom: 16 })}>
            <div>
              <div style={fieldLabel}>🙏 Faith / Tradition</div>
              <input style={inputStyle} value={editingContact.faith || ""} onChange={function(e) { updateEdit("faith", e.target.value); }} placeholder="e.g. Catholic, Jewish, non-denominational…" />
            </div>
            <div>
              <div style={fieldLabel}>Prayer Requests</div>
              <input style={inputStyle} value={editingContact.prayerRequests || ""} onChange={function(e) { updateEdit("prayerRequests", e.target.value); }} placeholder="What to be praying for them about…" />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={fieldLabel}>Love Language(s)</div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {LOVE_LANGUAGES.map(function(l) {
                var active = (editingContact.loveLanguages || []).includes(l.key);
                return (
                  <div key={l.key} onClick={function() { toggleLL(l.key); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 20, fontSize: 14, cursor: "pointer", border: "1px solid " + (active ? T.accent : T.border), background: active ? T.accentLight : T.bg, color: active ? T.accent : T.textMid, marginRight: 8, marginBottom: 8, userSelect: "none" }}>
                    {l.icon} {l.label}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={fieldLabel}>Mailing Address</div>
            <textarea style={Object.assign({}, textareaStyle, { minHeight: 55 })} value={editingContact.address} onChange={function(e) { updateEdit("address", e.target.value); }} placeholder="Street, City, State ZIP" />
          </div>

          <div style={Object.assign({}, row2, { marginBottom: 16 })}>
            <div>
              <div style={fieldLabel}>Favorite Restaurant</div>
              <input style={inputStyle} value={editingContact.favoriteRestaurant} onChange={function(e) { updateEdit("favoriteRestaurant", e.target.value); }} placeholder="For DoorDash or a visit" />
            </div>
            <div>
              <div style={fieldLabel}>Go-to Gesture</div>
              <input style={inputStyle} value={editingContact.goToGesture} onChange={function(e) { updateEdit("goToGesture", e.target.value); }} placeholder="What they love receiving" />
            </div>
          </div>

          <div style={Object.assign({}, row2, { marginBottom: 16 })}>
            <div>
              <div style={fieldLabel}>☕ Favorite Beverage</div>
              <input style={inputStyle} value={editingContact.favoriteBeverage || ""} onChange={function(e) { updateEdit("favoriteBeverage", e.target.value); }} placeholder="e.g. Oat milk latte, sweet tea…" />
            </div>
            <div>
              <div style={fieldLabel}>🍿 Favorite Snack</div>
              <input style={inputStyle} value={editingContact.favoriteSnack || ""} onChange={function(e) { updateEdit("favoriteSnack", e.target.value); }} placeholder="e.g. Flamin' Hot Cheetos…" />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={fieldLabel}>🙈 Guilty Pleasure</div>
            <input style={inputStyle} value={editingContact.guiltyPleasure || ""} onChange={function(e) { updateEdit("guiltyPleasure", e.target.value); }} placeholder="e.g. Reality TV, 2000s pop, true crime podcasts…" />
          </div>

          <div style={{ borderTop: "1px solid " + T.border, paddingTop: 16, marginBottom: 16 }}>
            <div style={fieldLabel}>Partner</div>
            <div style={row2}>
              <input style={inputStyle} value={(editingContact.significantOther && editingContact.significantOther.name) || ""} onChange={function(e) { updateEditNested("significantOther", "name", e.target.value); }} placeholder="Name" />
              <input style={inputStyle} type="date" value={(editingContact.significantOther && editingContact.significantOther.birthday) || ""} onChange={function(e) { updateEditNested("significantOther", "birthday", e.target.value); }} />
            </div>
          </div>

          <div style={{ borderTop: "1px solid " + T.border, paddingTop: 16, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={fieldLabel}>Kids</div>
              <button style={btn("sm")} onClick={addKid}>+ Add kid</button>
            </div>
            {(editingContact.kids || []).map(function(k, i) {
              return (
                <div key={i} style={Object.assign({}, row2, { marginBottom: 8 })}>
                  <input style={inputStyle} value={k.name} onChange={function(e) { updateKid(i, "name", e.target.value); }} placeholder="Name" />
                  <div style={{ display: "flex", gap: 6 }}>
                    <input style={Object.assign({}, inputStyle, { flex: 1 })} type="date" value={k.birthday} onChange={function(e) { updateKid(i, "birthday", e.target.value); }} />
                    <button style={Object.assign({}, btn("ghost"), { padding: "8px 11px" })} onClick={function() { removeKid(i); }}>×</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ borderTop: "1px solid " + T.border, paddingTop: 16, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={fieldLabel}>🐾 Pets</div>
              <button style={btn("sm")} onClick={addPet}>+ Add pet</button>
            </div>
            {(editingContact.pets || []).map(function(p, i) {
              return (
                <div key={i} style={Object.assign({}, row2, { marginBottom: 8 })}>
                  <input style={inputStyle} value={p.name} onChange={function(e) { updatePet(i, "name", e.target.value); }} placeholder="Name (e.g. Liko)" />
                  <div style={{ display: "flex", gap: 6 }}>
                    <input style={Object.assign({}, inputStyle, { flex: 1 })} value={p.type} onChange={function(e) { updatePet(i, "type", e.target.value); }} placeholder="Type (e.g. Golden retriever)" />
                    <button style={Object.assign({}, btn("ghost"), { padding: "8px 11px" })} onClick={function() { removePet(i); }}>×</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button style={btn()} onClick={saveEdit}>{isNew ? "Add to Circle" : "Save"}</button>
            <button style={btn("ghost")} onClick={function() { setEditingContact(null); }}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 16, display: "flex", flexDirection: "column" }}>

      {banner && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#edfaf3", border: "1px solid " + T.success, borderRadius: 10, padding: "10px 22px", fontSize: 14, color: "#2d6b4a", zIndex: 200, pointerEvents: "none" }}>
          ✓ {banner}
        </div>
      )}

      <div style={{ padding: "16px 28px", borderBottom: "1px solid " + T.border, display: "flex", alignItems: "center", justifyContent: "space-between", background: T.header, boxShadow: "0 1px 8px rgba(139,92,246,0.07)" }}>
        <div style={{ fontSize: 22, letterSpacing: "0.04em" }}>circle<span style={{ color: T.accent }}>keeper</span> 💜</div>
        <div style={{ display: "flex", gap: 4, background: T.accentLight, padding: 4, borderRadius: 10 }}>
          {["today", "contacts"].map(function(v) {
            var active = view === v || (view === "profile" && v === "contacts");
            return (
              <button key={v} style={{ padding: "7px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontFamily: "inherit", background: active ? T.accent : "transparent", color: active ? "#fff" : T.textMid, transition: "all 0.2s" }} onClick={function() { setView(v); if (v !== "contacts") setSelectedContact(null); }}>
                {v === "today" ? "Today" : "Circle"}
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button style={{ padding: "6px 13px", borderRadius: 8, border: "1px solid " + T.border, background: "transparent", color: T.textMid, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }} onClick={exportContacts}>⬇ Export</button>
          <label style={{ padding: "6px 13px", borderRadius: 8, border: "1px solid " + T.border, background: "transparent", color: T.textMid, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
            ⬆ Import
            <input type="file" accept=".json" style={{ display: "none" }} onChange={importContacts} />
          </label>
          <button style={{ padding: "6px 13px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }} onClick={function() { setFeedbackOpen(true); }}>💬 Feedback</button>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex" }}>
        {view !== "today" && (
          <div style={{ width: 250, borderRight: "1px solid " + T.border, padding: "20px 0", overflowY: "auto", background: T.bgSidebar, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "0 18px 10px", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textLight }}>Your circle</div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              {contacts.map(function(c) {
                var selected = selectedContact && selectedContact.id === c.id;
                return (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 18px", cursor: "pointer", background: selected ? T.accentLight : "transparent", borderLeft: selected ? "3px solid " + T.accent : "3px solid transparent" }} onClick={function() { setSelectedContact(c); setView("profile"); }}>
                    <Avatar color={c.color} initials={c.initials} size={32} />
                    <div>
                      <div style={{ fontSize: 15, color: T.text }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: T.textLight }}>{tierLabels[c.tier]}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: "16px 18px", borderTop: "1px solid " + T.border }}>
              <button style={Object.assign({}, btn(), { width: "100%", textAlign: "center" })} onClick={openAdd}>+ Add Person</button>
            </div>
          </div>
        )}

        <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>
          {view === "today" && <TodayView />}
          {view === "contacts" && !selectedContact && <ContactsView />}
          {view === "profile" && selectedContact && <ContactProfile contact={selectedContact} />}
        </div>
      </div>

      <EditModal />

      {confirmDelete && (
        <div style={modalOverlay} onClick={function() { setConfirmDelete(null); }}>
          <div style={Object.assign({}, modalBox, { width: 380 })} onClick={function(e) { e.stopPropagation(); }}>
            <div style={{ fontSize: 20, marginBottom: 10 }}>Remove {confirmDelete.name}?</div>
            <div style={{ fontSize: 15, color: T.textMid, marginBottom: 24 }}>This will permanently remove them from your circle.</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={btn("danger")} onClick={function() { deleteContact(confirmDelete.id); }}>Yes, remove</button>
              <button style={btn("ghost")} onClick={function() { setConfirmDelete(null); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {draftTarget && (
        <div style={modalOverlay} onClick={function() { setDraftTarget(null); setDraftResult(""); setDraftContext(""); }}>
          <div style={modalBox} onClick={function(e) { e.stopPropagation(); }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>Draft a message</div>
            <div style={{ fontSize: 14, color: T.textLight, marginBottom: 18 }}>for {draftTarget.name} · via {draftTarget.preferredChannel}</div>
            <div style={{ marginBottom: 14 }}>
              <div style={fieldLabel}>Occasion or context (optional)</div>
              <input style={inputStyle} value={draftContext} onChange={function(e) { setDraftContext(e.target.value); }} placeholder="e.g. Her birthday, checking in, Nova Scotia trip…" />
            </div>
            <button style={Object.assign({}, btn(), { width: "100%" })} onClick={function() { draftMessage(draftTarget, draftContext); }} disabled={draftLoading}>
              {draftLoading ? "Writing…" : "✦ Generate message"}
            </button>
            {draftLoading && <div style={{ textAlign: "center", color: T.textLight, fontSize: 14, marginTop: 14 }}>Crafting something personal…</div>}
            {draftResult && (
              <div style={{ background: T.accentLight, border: "1px solid " + T.accentMid, borderRadius: 12, padding: 16, marginTop: 14, fontSize: 15, lineHeight: 1.7 }}>
                <div style={{ fontSize: 11, color: T.textLight, marginBottom: 8, letterSpacing: "0.08em" }}>SUGGESTED MESSAGE</div>
                {draftResult}
                <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                  <button style={btn("ghost")} onClick={function() { draftMessage(draftTarget, draftContext); }}>Regenerate</button>
                  <button style={btn()} onClick={function() { if (navigator.clipboard) navigator.clipboard.writeText(draftResult); }}>Copy</button>
                </div>
              </div>
            )}
            <button style={Object.assign({}, btn("ghost"), { marginTop: 12, width: "100%" })} onClick={function() { setDraftTarget(null); setDraftResult(""); setDraftContext(""); }}>Close</button>
          </div>
        </div>
      )}

      {addingEvent && selectedContact && (
        <div style={modalOverlay} onClick={function() { setAddingEvent(false); }}>
          <div style={modalBox} onClick={function(e) { e.stopPropagation(); }}>
            <div style={{ fontSize: 20, marginBottom: 18 }}>Add life event for {selectedContact.name}</div>
            <div style={{ marginBottom: 12 }}>
              <div style={fieldLabel}>What happened</div>
              <input style={inputStyle} value={newEvent.event} onChange={function(e) { setNewEvent(function(p) { return Object.assign({}, p, { event: e.target.value }); }); }} placeholder="Describe the event…" />
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={fieldLabel}>Category</div>
              <select style={selectStyle} value={newEvent.category} onChange={function(e) { setNewEvent(function(p) { return Object.assign({}, p, { category: e.target.value }); }); }}>
                <option value="career">💼 Career</option>
                <option value="family">👨‍👩‍👧 Family</option>
                <option value="health">🌸 Health</option>
                <option value="life">🏠 Life</option>
                <option value="personal">✨ Personal</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={btn()} onClick={function() { addLifeEvent(selectedContact.id); }}>Add Event</button>
              <button style={btn("ghost")} onClick={function() { setAddingEvent(false); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {logContact && (
        <div style={modalOverlay} onClick={function() { setLogContact(null); }}>
          <div style={modalBox} onClick={function(e) { e.stopPropagation(); }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>Log contact</div>
            <div style={{ fontSize: 14, color: T.textLight, marginBottom: 18 }}>with {logContact.name}</div>
            <div style={{ marginBottom: 18 }}>
              <div style={fieldLabel}>What did you talk about? (optional)</div>
              <textarea style={textareaStyle} value={logNote} onChange={function(e) { setLogNote(e.target.value); }} placeholder="A few words to jog your memory later…" />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={btn()} onClick={function() { logContactMade(logContact.id); }}>Mark as contacted today</button>
              <button style={btn("ghost")} onClick={function() { setLogContact(null); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {feedbackOpen && (
        <div style={modalOverlay} onClick={function() { setFeedbackOpen(false); setFeedbackNote(""); }}>
          <div style={Object.assign({}, modalBox, { width: 420 })} onClick={function(e) { e.stopPropagation(); }}>
            {feedbackSent ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>💜</div>
                <div style={{ fontSize: 18, marginBottom: 6 }}>Feedback sent!</div>
                <div style={{ fontSize: 14, color: T.textLight }}>It's on its way to your inbox.</div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 20, marginBottom: 4 }}>Leave yourself a note</div>
                <div style={{ fontSize: 14, color: T.textLight, marginBottom: 18 }}>What's working? What's missing? What do you wish it did?</div>
                <textarea style={Object.assign({}, textareaStyle, { minHeight: 120 })} value={feedbackNote} onChange={function(e) { setFeedbackNote(e.target.value); }} placeholder="e.g. I wish I could see the last thing we talked about on the Today view..." />
                <div style={{ fontSize: 12, color: T.textLight, marginBottom: 16, marginTop: 6 }}>Sent to your Gmail as "CircleKeeper Feedback" for easy sorting.</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button style={btn()} onClick={sendFeedback} disabled={feedbackSending || !feedbackNote.trim()}>
                    {feedbackSending ? "Sending…" : "Send to my inbox"}
                  </button>
                  <button style={btn("ghost")} onClick={function() { setFeedbackOpen(false); setFeedbackNote(""); }}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
