import { useEffect, useState, FormEvent } from "react";

import {
  Sparkles,
  Calendar,
  Clock,
  Trash2,
  LogOut,
  User,
  Mail,
  Phone,
  Bell,
  Shield,
  KeyRound,
  ChevronDown,
  Pencil,
  Check,
  X,
  Globe,
  Gift,
  Copy,
  Crown,
  Wine,
  CalendarCheck,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";

import { QRCodeSVG } from "qrcode.react";

import { supabase } from "../lib/supabase";


// ---------------- TABLES ----------------

const MEMBERS_TABLE = "members";
const BOOKINGS_TABLE = "bookings";
const POINTS_TABLE = "points_history";


// ---------------- TYPES ----------------

interface LuxeUser {
  id: string;
  user_id: string;
  email: string;
  name: string | null;
  phone: string | null;
  tier: string;
  points: number;
  card_id: string | null;
  member_since: string | null;
  expiry_date: string | null;
  valet_code: string | null;
  avatar_url: string | null;
}

interface Booking {
  id: string;
  type: string;
  storeName?: string;
  notes?: string;
  date: string;
  time: string;
  status: string;
}

interface PointHistory {
  id: string;
  points: number;
  reason: string;
  created_at: string;
}


// ---------------- PROPS ----------------

interface ProfileViewProps {
  onSignedOut?: () => void;
}

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ta", label: "Tamil" },
  { code: "hi", label: "Hindi" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" },
  { code: "ar", label: "Arabic" },
];


// ---------------- COMPONENT ----------------

export default function ProfileView({ onSignedOut }: ProfileViewProps) {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState<any>(null);
  const [member, setMember] = useState<LuxeUser | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pointsHistory, setPointsHistory] = useState<PointHistory[]>([]);

  // Registration form (no profile yet)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Inline edit of Account Details (name / phone) — this is what was
  // missing: there were no inputs to actually edit anything.
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState("");

  // Settings accordion — self-contained, no parent handlers required.
  type SettingsPanel = "password" | "notifications" | "language" | "privacy" | null;
  const [openPanel, setOpenPanel] = useState<SettingsPanel>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(false);
  const [notifPromo, setNotifPromo] = useState(true);
  const [language, setLanguage] = useState("en");
  const [referralCopied, setReferralCopied] = useState(false);

  function handleCopyReferral() {
    if (!member) return;
    const code = member.card_id || member.id;
    navigator.clipboard.writeText(code).then(() => {
      setReferralCopied(true);
      setTimeout(() => setReferralCopied(false), 2000);
    });
  }


  // ---------------- LOAD PROFILE ----------------

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    if (!authUser) return;
    const storedLang = localStorage.getItem(`luxe_lang_${authUser.id}`);
    if (storedLang) setLanguage(storedLang);

    const storedNotif = localStorage.getItem(`luxe_notif_${authUser.id}`);
    if (storedNotif) {
      try {
        const parsed = JSON.parse(storedNotif);
        setNotifEmail(parsed.email ?? true);
        setNotifSms(parsed.sms ?? false);
        setNotifPromo(parsed.promo ?? true);
      } catch {
        // ignore malformed local cache
      }
    }
  }, [authUser]);

  async function loadProfile() {
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    setAuthUser(user);

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: memberData, error } = await supabase
      .from(MEMBERS_TABLE)
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.log(error.message);
    }

    setMember(memberData);
    setName(memberData?.name || "");
    setPhone(memberData?.phone || "");

    if (memberData) {
      const { data: bookingData } = await supabase
        .from(BOOKINGS_TABLE)
        .select("*")
        .eq("member_id", memberData.id)
        .order("date", { ascending: true });

      setBookings(bookingData || []);

      const { data: pointsData } = await supabase
        .from(POINTS_TABLE)
        .select("*")
        .eq("member_id", memberData.id)
        .order("created_at", { ascending: false });

      setPointsHistory(pointsData || []);
    }

    setLoading(false);
  }


  // ---------------- CREATE PROFILE ----------------

  async function handleCompleteProfile(e: FormEvent) {
    e.preventDefault();

    if (!authUser) return;

    if (!name || !phone) {
      setFormError("Please fill all fields");
      return;
    }

    setSaving(true);

    const { data, error } = await supabase
      .from(MEMBERS_TABLE)
      .insert({
        user_id: authUser.id,
        name,
        email: authUser.email,
        phone,
        tier: "Signature",
        points: 0,
        card_id: `LX-${authUser.id.slice(0, 8).toUpperCase()}`,
        valet_code: Math.random().toString(36).slice(2, 8).toUpperCase(),
        member_since: new Date().getFullYear().toString(),
        expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .select()
      .single();

    setSaving(false);

    if (error) {
      setFormError(error.message);
      return;
    }

    setMember(data);
  }


  // ---------------- EDIT ACCOUNT DETAILS ----------------

  function startEditing() {
    if (!member) return;
    setEditName(member.name || "");
    setEditPhone(member.phone || "");
    setEditError("");
    setIsEditing(true);
  }

  async function handleSaveEdit(e: FormEvent) {
    e.preventDefault();
    if (!member) return;

    if (!editName.trim()) {
      setEditError("Name cannot be empty.");
      return;
    }

    setEditError("");
    setEditSaving(true);

    const { data, error } = await supabase
      .from(MEMBERS_TABLE)
      .update({ name: editName.trim(), phone: editPhone.trim() })
      .eq("id", member.id)
      .select()
      .single();

    setEditSaving(false);

    if (error) {
      setEditError(error.message);
      return;
    }

    setMember(data);
    setName(data.name || "");
    setPhone(data.phone || "");
    setIsEditing(false);
  }


  // ---------------- CHANGE PASSWORD ----------------

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPasswordSaving(false);

    if (error) {
      setPasswordError(error.message);
      return;
    }

    setPasswordSuccess("Password updated successfully.");
    setNewPassword("");
    setConfirmPassword("");
  }


  // ---------------- NOTIFICATIONS / LANGUAGE ----------------

  function updateNotif(next: { email?: boolean; sms?: boolean; promo?: boolean }) {
    const merged = {
      email: next.email ?? notifEmail,
      sms: next.sms ?? notifSms,
      promo: next.promo ?? notifPromo,
    };
    setNotifEmail(merged.email);
    setNotifSms(merged.sms);
    setNotifPromo(merged.promo);
    if (authUser) localStorage.setItem(`luxe_notif_${authUser.id}`, JSON.stringify(merged));
  }

  function updateLanguage(code: string) {
    setLanguage(code);
    if (authUser) localStorage.setItem(`luxe_lang_${authUser.id}`, code);
  }


  // ---------------- DELETE BOOKING ----------------

  async function handleCancelBooking(id: string) {
    const { error } = await supabase.from(BOOKINGS_TABLE).delete().eq("id", id);

    if (error) {
      console.log(error.message);
      return;
    }

    setBookings((prev) => prev.filter((item) => item.id !== id));
  }


  // ---------------- SIGN OUT ----------------

  async function handleSignOut() {
    await supabase.auth.signOut();

    setAuthUser(null);
    setMember(null);
    setBookings([]);

    if (onSignedOut) {
      onSignedOut();
    } else {
      window.location.reload();
    }
  }


  // ---------------- PROFILE COMPLETION ----------------

  const completion = member
    ? ([member.name, member.phone, member.card_id, member.valet_code].filter(Boolean).length / 4) * 100
    : 0;

  const TIER_THRESHOLDS = [
    { name: "Elite", points: 2500 },
    { name: "Prestige", points: 5000 },
    { name: "Inner Circle", points: 10000 },
  ];

  const nextTier = member
    ? TIER_THRESHOLDS.find((t) => member.points < t.points)
    : undefined;

  const pointsToNextTier = nextTier && member ? nextTier.points - member.points : 0;


  // ---------------- LOADING ----------------

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center py-20">
        <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-neutral-400 mt-4 tracking-widest uppercase">Loading Profile...</p>
      </div>
    );
  }


  // ---------------- NOT LOGIN ----------------

  if (!authUser) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-neutral-500">Please login to view your profile.</p>
      </div>
    );
  }


  // ---------------- COMPLETE PROFILE ----------------

  if (!member) {
    return (
      <div className="max-w-md mx-auto px-5 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] border border-neutral-100 p-8 shadow-sm"
        >
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="text-amber-400 w-5 h-5" />
            </div>
            <h1 className="text-xl font-semibold">Activate Membership</h1>
            <p className="text-xs text-neutral-500 mt-2">Complete your profile to create your Luxe Pass.</p>
          </div>

          <form onSubmit={handleCompleteProfile} className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full bg-neutral-50 rounded-xl px-4 py-3 text-sm outline-none"
            />

            <input
              value={authUser.email}
              disabled
              className="w-full bg-neutral-100 rounded-xl px-4 py-3 text-sm text-neutral-400"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full bg-neutral-50 rounded-xl px-4 py-3 text-sm outline-none"
            />

            {formError && <p className="text-red-500 text-xs text-center">{formError}</p>}

            <button
              disabled={saving}
              className="w-full bg-black text-white py-4 rounded-xl text-xs uppercase tracking-widest"
            >
              {saving ? "Creating..." : "Create Luxe Pass"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }


  // ---------------- DASHBOARD ----------------

  return (
    <div className="max-w-5xl mx-auto px-5 py-5 space-y-10">

      {/* MEMBER CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className="relative max-w-md mx-auto aspect-[1.6/1] rounded-3xl overflow-hidden p-6 text-white bg-gradient-to-br from-neutral-900 via-stone-900 to-black shadow-xl"
      >
        <div className="absolute w-60 h-60 bg-neutral-700 rounded-full blur-3xl opacity-30 right-0 top-0" />

        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-[9px] tracking-widest text-neutral-400">VIP DIGITAL PASS</p>
            <h2 className="text-xl font-bold tracking-widest">LUXE</h2>
          </div>

          <div className="text-right">
            <span className="text-[10px] border border-amber-500/40 text-amber-400 px-3 py-1 rounded-full">
              {member.tier}
            </span>
            <p className="text-[8px] text-neutral-400 mt-2 font-mono">{member.card_id}</p>
          </div>
        </div>

        <div className="flex justify-between items-center relative z-10 my-5">
          <div>
            <p className="text-[9px] text-neutral-400 uppercase">Points Balance</p>
            <p className="text-2xl font-semibold">{member.points.toLocaleString()} PTS</p>
          </div>

          <div className="bg-white rounded-xl p-2">
            <QRCodeSVG value={member.card_id || member.id} size={50} />
          </div>
        </div>

        <div className="flex justify-between relative z-10">
          <div>
            <p className="text-[9px] text-neutral-400">CARD HOLDER</p>
            <p className="text-xs uppercase font-semibold">{member.name}</p>
          </div>

          <div className="text-right">
            <p className="text-[9px] text-neutral-400">VALID UNTIL</p>
            <p className="text-xs font-semibold">
              {member.expiry_date ? new Date(member.expiry_date).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* NEXT TIER UPSELL */}
      {nextTier && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 flex items-center gap-4"
        >
          <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Crown className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-neutral-900">
              {pointsToNextTier.toLocaleString()} points to {nextTier.name}
            </p>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Book an experience to earn 500 points and get closer to unlocking {nextTier.name} perks.
            </p>
          </div>
        </motion.div>
      )}


      {/* PROFILE COMPLETION */}
      <div className="bg-white border border-neutral-100 rounded-2xl p-6">
        <div className="flex justify-between mb-3">
          <h3 className="text-sm font-semibold">Profile Completion</h3>
          <span className="text-xs">{Math.round(completion)}%</span>
        </div>
        <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
          <div className="h-full bg-black rounded-full transition-all" style={{ width: `${completion}%` }} />
        </div>
      </div>


      {/* TIER PROGRESS */}
      <div className="bg-white border border-neutral-100 rounded-2xl p-6">
        <div className="flex justify-between mb-4">
          <h3 className="text-sm font-semibold">Tier Progress</h3>
          <span className="text-xs text-amber-500">{Math.round((member.points / 10000) * 100)}%</span>
        </div>

        <div className="h-2 bg-neutral-100 rounded-full">
          <div className="h-full bg-black rounded-full" style={{ width: `${Math.min(100, member.points / 100)}%` }} />
        </div>

        <div className="flex justify-between text-[10px] text-neutral-400 mt-3">
          <span>SIGNATURE</span>
          <span>ELITE</span>
          <span>PRESTIGE</span>
          <span>INNER CIRCLE</span>
        </div>
      </div>


      {/* TIER BENEFITS + REFER A FRIEND */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-neutral-100 rounded-2xl p-6 space-y-5">
          <h3 className="text-xs uppercase tracking-widest text-neutral-400">Your {member.tier} Benefits</h3>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold">Complimentary Valet Parking</h4>
                <p className="text-[10px] text-neutral-500 mt-0.5">
                  Present code{" "}
                  <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded text-[9px]">{member.valet_code}</code>{" "}
                  to the valet concierge.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-neutral-100 text-black rounded-lg flex items-center justify-center flex-shrink-0">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold">Priority Reservations</h4>
                <p className="text-[10px] text-neutral-500 mt-0.5">
                  Instant confirmation for private fitting suites and chef's tables.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-indigo-50 text-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Wine className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold">Complimentary Champagne</h4>
                <p className="text-[10px] text-neutral-500 mt-0.5">
                  Redeem at Gucci or Le Luxe Bistro on any reservation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-950 text-white rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-neutral-800 rounded-full -mr-12 -mt-12 blur-3xl opacity-40 pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs uppercase tracking-widest text-neutral-300">Give 500 Points, Get 500 Points</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Share your referral code with friends. When they join and complete their first booking, you both
              earn 500 bonus points.
            </p>

            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <code className="flex-1 text-sm font-mono tracking-wider">{member.card_id || member.id}</code>
              <button
                onClick={handleCopyReferral}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-[10px] font-semibold uppercase tracking-wider rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors"
              >
                {referralCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {referralCopied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* BOOKINGS */}
      <div>
        <h2 className="text-xs tracking-widest uppercase text-neutral-400 mb-4">
          Active Reservations ({bookings.length})
        </h2>

        {bookings.length === 0 ? (
          <div className="bg-white border rounded-2xl p-10 text-center">
            <p className="text-xs text-neutral-400">No active reservations</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white border rounded-2xl p-5 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-semibold">{booking.storeName || "Luxe Terminal"}</h4>

                  <div className="flex gap-4 text-xs text-neutral-500 mt-2">
                    <span className="flex gap-1">
                      <Calendar size={14} />
                      {booking.date}
                    </span>
                    <span className="flex gap-1">
                      <Clock size={14} />
                      {booking.time}
                    </span>
                  </div>
                </div>

                <button onClick={() => handleCancelBooking(booking.id)} className="text-neutral-400 hover:text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* POINT HISTORY */}
      <div className="bg-white border border-neutral-100 rounded-2xl p-6">
        <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-5">Points History</h3>

        {pointsHistory.length === 0 ? (
          <p className="text-xs text-neutral-400">No points activity yet.</p>
        ) : (
          <div className="space-y-4">
            {pointsHistory.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-3 last:border-none">
                <div>
                  <p className="text-sm font-medium">{item.reason}</p>
                  <p className="text-[10px] text-neutral-400">{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
                <span className="text-green-600 text-sm font-semibold">+{item.points}</span>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* ACCOUNT + SETTINGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* ACCOUNT DETAILS — now actually editable */}
        <div className="bg-white border border-neutral-100 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-widest text-neutral-400">Account Details</h3>
            {!isEditing && (
              <button
                onClick={startEditing}
                className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-500 hover:text-black transition-colors cursor-pointer"
              >
                <Pencil className="w-3 h-3" />
                Edit
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-neutral-900 flex items-center justify-center text-white font-bold">
              {member.name?.charAt(0)}
            </div>

            <div>
              <p className="text-sm font-semibold">{member.name}</p>
              <p className="text-xs text-neutral-400">{member.email}</p>
            </div>
          </div>

          {!isEditing ? (
            <div className="space-y-4">
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <User size={15} />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400 uppercase">Name</p>
                  <p className="text-sm">{member.name}</p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <Mail size={15} />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400 uppercase">Email</p>
                  <p className="text-sm truncate">{member.email}</p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <Phone size={15} />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400 uppercase">Phone</p>
                  <p className="text-sm">{member.phone}</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">
                  Full Name
                </label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-neutral-50 focus:bg-white focus:ring-1 focus:ring-black rounded-lg px-3.5 py-2.5 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">
                  Phone Number
                </label>
                <input
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-neutral-50 focus:bg-white focus:ring-1 focus:ring-black rounded-lg px-3.5 py-2.5 text-xs outline-none"
                />
              </div>

              {editError && <p className="text-red-500 text-[11px]">{editError}</p>}

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={editSaving}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-black hover:bg-neutral-900 disabled:opacity-50 text-white text-[10px] font-semibold uppercase tracking-wider rounded-lg cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  {editSaving ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-500 text-[10px] font-semibold uppercase tracking-wider rounded-lg cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>


        {/* SETTINGS — accordion, fully self-contained */}
        <div className="bg-white border border-neutral-100 rounded-2xl p-6 space-y-1">
          <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">Settings</h3>

          {/* Change Password */}
          <div className="border-t border-neutral-100">
            <button
              onClick={() => setOpenPanel(openPanel === "password" ? null : "password")}
              className="w-full flex items-center gap-3 py-3 text-left cursor-pointer hover:bg-neutral-50 rounded-lg px-1 transition-all"
            >
              <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <KeyRound size={15} />
              </div>
              <span className="text-sm flex-1 text-left">Change Password</span>
              <ChevronDown className={`w-4 h-4 text-neutral-300 transition-transform ${openPanel === "password" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openPanel === "password" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <form onSubmit={handleChangePassword} className="px-1 pb-4 space-y-3">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password"
                      className="w-full bg-neutral-50 focus:bg-white focus:ring-1 focus:ring-black rounded-lg px-3.5 py-2.5 text-xs outline-none"
                    />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full bg-neutral-50 focus:bg-white focus:ring-1 focus:ring-black rounded-lg px-3.5 py-2.5 text-xs outline-none"
                    />
                    {passwordError && <p className="text-red-500 text-[11px]">{passwordError}</p>}
                    {passwordSuccess && <p className="text-green-600 text-[11px]">{passwordSuccess}</p>}
                    <button
                      type="submit"
                      disabled={passwordSaving}
                      className="w-full py-2.5 bg-black hover:bg-neutral-900 disabled:opacity-50 text-white text-[10px] font-semibold uppercase tracking-wider rounded-lg cursor-pointer"
                    >
                      {passwordSaving ? "Updating..." : "Update Password"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <div className="border-t border-neutral-100">
            <button
              onClick={() => setOpenPanel(openPanel === "notifications" ? null : "notifications")}
              className="w-full flex items-center gap-3 py-3 text-left cursor-pointer hover:bg-neutral-50 rounded-lg px-1 transition-all"
            >
              <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bell size={15} />
              </div>
              <span className="text-sm flex-1 text-left">Notifications</span>
              <ChevronDown className={`w-4 h-4 text-neutral-300 transition-transform ${openPanel === "notifications" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openPanel === "notifications" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-1 pb-4 space-y-3">
                    {[
                      { key: "email", label: "Email updates on bookings", value: notifEmail },
                      { key: "sms", label: "SMS alerts for reservations", value: notifSms },
                      { key: "promo", label: "Promotions & event invites", value: notifPromo },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <span className="text-xs text-neutral-600">{item.label}</span>
                        <button
                          onClick={() => updateNotif({ [item.key]: !item.value } as any)}
                          className={`w-10 h-5.5 rounded-full transition-colors relative cursor-pointer ${item.value ? "bg-black" : "bg-neutral-200"}`}
                        >
                          <span
                            className={`absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform ${item.value ? "translate-x-[19px]" : "translate-x-0.5"}`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Language */}
          <div className="border-t border-neutral-100">
            <button
              onClick={() => setOpenPanel(openPanel === "language" ? null : "language")}
              className="w-full flex items-center gap-3 py-3 text-left cursor-pointer hover:bg-neutral-50 rounded-lg px-1 transition-all"
            >
              <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe size={15} />
              </div>
              <span className="text-sm flex-1 text-left">Language</span>
              <span className="text-[10px] text-neutral-400 font-mono mr-1">
                {LANGUAGES.find((l) => l.code === language)?.label}
              </span>
              <ChevronDown className={`w-4 h-4 text-neutral-300 transition-transform ${openPanel === "language" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openPanel === "language" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-1 pb-4 grid grid-cols-2 gap-2">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => updateLanguage(lang.code)}
                        className={`px-3 py-2 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
                          language === lang.code
                            ? "bg-black text-white border-black"
                            : "bg-neutral-50 text-neutral-600 border-neutral-100 hover:border-neutral-300"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Privacy & Security */}
          <div className="border-t border-neutral-100">
            <button
              onClick={() => setOpenPanel(openPanel === "privacy" ? null : "privacy")}
              className="w-full flex items-center gap-3 py-3 text-left cursor-pointer hover:bg-neutral-50 rounded-lg px-1 transition-all"
            >
              <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield size={15} />
              </div>
              <span className="text-sm flex-1 text-left">Privacy &amp; Security</span>
              <ChevronDown className={`w-4 h-4 text-neutral-300 transition-transform ${openPanel === "privacy" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openPanel === "privacy" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-1 pb-4 space-y-3 text-xs text-neutral-500 leading-relaxed">
                    <p>
                      Your data is used solely to manage your LUXE membership, reservations, and concierge
                      requests. We never sell your information to third parties.
                    </p>
                    <a href="mailto:support@luxemall.example" className="text-neutral-700 underline block">
                      Contact support to request a data export or account deletion
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={handleSignOut}
            className="mt-5 w-full flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 py-3 rounded-xl text-xs uppercase tracking-widest transition-colors cursor-pointer"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
