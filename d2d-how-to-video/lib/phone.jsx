// phone.jsx — phone frame + Goodlugg app screen mockups (booking + drop-off)
// Exposes: Phone, StatusBar, AppHeader, GlSiteHeader, and screen components.

// ── Phone frame ──────────────────────────────────────────────────────────────
function Phone({ children, screenBg = '#fff' }) {
  return (
    <div style={{ width: 384, height: 784, borderRadius: 52, background: '#16101e',
      padding: 12, boxShadow: '0 36px 80px rgba(43,22,64,.42), inset 0 0 0 2px rgba(255,255,255,.06)' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 40,
        overflow: 'hidden', background: screenBg }}>
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          width: 116, height: 26, background: '#16101e', borderRadius: 14, zIndex: 40 }} />
        {children}
      </div>
    </div>
  );
}

function StatusBar({ dark = false }) {  const c = dark ? '#fff' : 'var(--gl-ink)';
  return (
    <div style={{ height: 46, flexShrink: 0, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 26px', font: '700 15px/1 var(--gl-font-ui)', color: c }}>
      <span>9:41</span>
      <span style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13 }}>
        <span>●●●</span><span>⌃</span><span style={{ fontWeight: 800 }}>96</span>
      </span>
    </div>
  );
}

// app header with back chevron + title
function AppHeader({ title, step }) {
  return (
    <div style={{ flexShrink: 0, padding: '4px 18px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--gl-purple-050)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          font: '700 20px/1 var(--gl-font-ui)', color: 'var(--gl-purple-700)' }}>‹</div>
        <div style={{ font: '800 21px/1 var(--gl-font-display)', letterSpacing: '-.02em', color: 'var(--gl-ink)' }}>{title}</div>
      </div>
      {step && (
        <div style={{ display: 'flex', gap: 5, marginTop: 14 }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{ flex: 1, height: 5, borderRadius: 999,
              background: i <= step ? 'var(--gl-purple-600)' : 'var(--gl-purple-100)' }} />
          ))}
        </div>
      )}
    </div>
  );
}

// Goodlugg tracking-site header (globe + centered wordmark + menu)
function GlSiteHeader() {
  return (
    <div style={{ flexShrink: 0 }}>
      <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 7, padding: '0 18px',
        borderBottom: '1px solid var(--gl-line)', font: '600 15px/1 var(--gl-font-ui)', color: 'var(--gl-ink)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>
        English <span style={{ color: 'var(--gl-ink-3)' }}>⌄</span>
      </div>
      <div style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Wordmark size={28} />
        <div style={{ position: 'absolute', right: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[0,1,2].map(i => <span key={i} style={{ width: 22, height: 2.5, background: 'var(--gl-purple-700)', borderRadius: 2 }} />)}
        </div>
      </div>
    </div>
  );
}

const scrollArea = { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' };
const fieldLabel = { font: '700 11px/1 var(--gl-font-ui)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gl-ink-3)' };
const cardBox = { background: '#fff', border: '1px solid var(--gl-line)', borderRadius: 16, boxShadow: 'var(--gl-shadow-sm)' };

// ── 1. Price Calculator screen ───────────────────────────────────────────────
function ScrPrice() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      <StatusBar />
      <AppHeader title="Price Calculator" />
      <div style={{ padding: '18px 18px 0', display: 'flex', flexDirection: 'column', gap: 13 }}>
        <div style={{ ...cardBox, padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '13px 16px', borderBottom: '1px dashed var(--gl-line)' }}>
            <div style={fieldLabel}>From</div>
            <div style={{ font: '700 16px/1.25 var(--gl-font-ui)', color: 'var(--gl-ink)', marginTop: 5 }}>Fraser Place, Seoul</div>
          </div>
          <div style={{ padding: '13px 16px' }}>
            <div style={fieldLabel}>To</div>
            <div style={{ font: '700 16px/1.25 var(--gl-font-ui)', color: 'var(--gl-ink)', marginTop: 5 }}>Urban Groove Hotel, Busan</div>
          </div>
        </div>
        <div style={{ ...cardBox, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={fieldLabel}>Bags</div>
            <div style={{ font: '800 30px/1 var(--gl-font-display)', color: 'var(--gl-purple-700)', marginTop: 4 }}>2</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, border: '1.5px solid var(--gl-purple-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 20px/1 var(--gl-font-ui)', color: 'var(--gl-purple-600)' }}>−</div>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--gl-purple-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 20px/1 var(--gl-font-ui)', color: '#fff' }}>+</div>
          </div>
        </div>
        <div style={{ background: 'var(--gl-purple-050)', borderRadius: 16, padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ font: '600 15px/1 var(--gl-font-ui)', color: 'var(--gl-ink-2)' }}>Estimated total</span>
          <span style={{ font: '800 26px/1 var(--gl-font-display)', color: 'var(--gl-purple-700)' }}>₩39,600</span>
        </div>
        <button style={{ marginTop: 4, border: 0, borderRadius: 16, padding: '17px', background: 'var(--gl-purple-600)', color: '#fff', font: '700 17px/1 var(--gl-font-ui)', boxShadow: 'var(--gl-shadow-purple)' }}>
          Book with these options ›
        </button>
        <div style={{ textAlign: 'center', font: '500 13px/1.4 var(--gl-font-ui)', color: 'var(--gl-ink-3)' }}>
          Route &amp; bags carry straight into your booking
        </div>
      </div>
    </div>
  );
}

// ── 2. Booking details / guest screen ────────────────────────────────────────
function ScrForm() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      <StatusBar />
      <AppHeader title="Booking details" step={3} />
      <div style={{ padding: '16px 18px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 9 }}>
          <div style={{ flex: 1, borderRadius: 13, padding: '12px', textAlign: 'center', background: 'var(--gl-purple-600)', color: '#fff', font: '700 14px/1.2 var(--gl-font-ui)' }}>Continue as guest</div>
          <div style={{ flex: 1, borderRadius: 13, padding: '12px', textAlign: 'center', border: '1.5px solid var(--gl-purple-200)', color: 'var(--gl-purple-600)', font: '700 14px/1.2 var(--gl-font-ui)' }}>Log in</div>
        </div>
        <div style={{ font: '500 13px/1.4 var(--gl-font-ui)', color: 'var(--gl-ink-3)', textAlign: 'center', marginTop: -2 }}>No account needed — guest booking works too</div>
        {[['Full name', 'Sara Kim'], ['Phone (any country)', '+1 415 555 0132'], ['Email', 'sara@email.com']].map(([l, v], i) => (
          <div key={i}>
            <div style={fieldLabel}>{l}</div>
            <div style={{ ...cardBox, padding: '13px 15px', marginTop: 6, font: '600 15px/1 var(--gl-font-ui)', color: 'var(--gl-ink)' }}>{v}</div>
          </div>
        ))}
        <button style={{ marginTop: 6, border: 0, borderRadius: 16, padding: '17px', background: 'var(--gl-purple-600)', color: '#fff', font: '700 17px/1 var(--gl-font-ui)' }}>Continue ›</button>
      </div>
    </div>
  );
}

// ── 3. Confirmation screen ────────────────────────────────────────────────────
function ScrConfirm() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '46px 24px 0' }}>
        <div style={{ width: 84, height: 84, borderRadius: 999, background: 'var(--gl-lime-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--gl-purple-800)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <div style={{ font: '800 30px/1.1 var(--gl-font-display)', letterSpacing: '-.02em', color: 'var(--gl-ink)', marginTop: 22 }}>Booking confirmed!</div>
        <div style={{ font: '600 15px/1.4 var(--gl-font-ui)', color: 'var(--gl-ink-3)', marginTop: 8, textAlign: 'center' }}>Booking number</div>
        <div style={{ font: '800 24px/1 var(--gl-font-mono)', color: 'var(--gl-purple-700)', marginTop: 4, letterSpacing: '.04em' }}>1899D8OX18</div>
        <div style={{ width: '100%', marginTop: 26, display: 'flex', alignItems: 'center', gap: 13, background: 'var(--gl-purple-050)', borderRadius: 16, padding: '15px 16px' }}>
          <span style={{ flexShrink: 0, width: 42, height: 42, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gl-purple-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
          </span>
          <div>
            <div style={{ font: '700 15px/1.2 var(--gl-font-ui)', color: 'var(--gl-ink)' }}>Confirmation email sent</div>
            <div style={{ font: '500 13px/1.3 var(--gl-font-ui)', color: 'var(--gl-ink-3)', marginTop: 2 }}>Check your inbox for details</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 4. Hotel drop-off — digital message card ─────────────────────────────────
function ScrHotelCard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--gl-purple-050)' }}>
      <StatusBar />
      <AppHeader title="Drop-off card" />
      <div style={{ padding: '18px 20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <div style={{ font: '600 15px/1.4 var(--gl-font-ui)', color: 'var(--gl-ink-2)', textAlign: 'center' }}>
          Show this card at the front desk<br />upon check-out
        </div>
        <img src="assets/message_card.jpeg" alt="Goodlugg pickup message card" style={{ width: '100%', borderRadius: 16, boxShadow: 'var(--gl-shadow-md)', display: 'block' }} />
      </div>
    </div>
  );
}

// ── 5. Upload bag photos to tracking ─────────────────────────────────────────
function ScrUpload() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      <StatusBar />
      <AppHeader title="Upload bag photos" />
      <div style={{ padding: '18px 18px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ font: '500 15px/1.45 var(--gl-font-ui)', color: 'var(--gl-ink-2)' }}>
          Snap your bags before drop-off and upload here.
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ width: 96, height: 96, borderRadius: 14, border: '2px dashed var(--gl-purple-300)', background: 'var(--gl-purple-050)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--gl-purple-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
          </div>
          <div style={{ width: 96, height: 96, borderRadius: 14, overflow: 'hidden', background: '#f3f1f6', border: '1px solid var(--gl-line)' }}>
            <img src="assets/hero_2bags.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--gl-lime-050)', border: '1px solid var(--gl-lime-300)', borderRadius: 14, padding: '13px 15px' }}>
          <span style={{ width: 24, height: 24, borderRadius: 999, background: 'var(--gl-lime-500)', color: 'var(--gl-purple-800)', font: '800 13px/24px var(--gl-font-ui)', textAlign: 'center', flexShrink: 0 }}>✓</span>
          <span style={{ font: '600 14px/1.35 var(--gl-font-ui)', color: 'var(--gl-ink-2)' }}>Got a hotel tag? Add a photo of it too.</span>
        </div>
        <button style={{ marginTop: 2, border: 0, borderRadius: 16, padding: '16px', background: 'var(--gl-purple-600)', color: '#fff', font: '700 16px/1 var(--gl-font-ui)' }}>Upload to tracking ›</button>
      </div>
    </div>
  );
}

// ── 6. Airbnb drop-off options ───────────────────────────────────────────────
function ScrAirbnb() {
  const Opt = ({ icon, t, d, sel }) => (
    <div style={{ borderRadius: 16, padding: '16px', display: 'flex', gap: 13, alignItems: 'flex-start',
      border: sel ? '2px solid var(--gl-purple-600)' : '1.5px solid var(--gl-line)',
      background: sel ? 'var(--gl-purple-050)' : '#fff' }}>
      <span style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 13, background: sel ? 'var(--gl-purple-600)' : 'var(--gl-purple-050)', color: sel ? '#fff' : 'var(--gl-purple-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ font: '700 16px/1.2 var(--gl-font-ui)', color: 'var(--gl-ink)' }}>{t}</div>
        <div style={{ font: '500 13px/1.35 var(--gl-font-ui)', color: 'var(--gl-ink-3)', marginTop: 4 }}>{d}</div>
      </div>
      <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 999, marginTop: 2,
        border: sel ? '0' : '2px solid var(--gl-purple-200)', background: sel ? 'var(--gl-purple-600)' : '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', font: '800 11px/1 var(--gl-font-ui)' }}>{sel ? '✓' : ''}</span>
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      <StatusBar />
      <AppHeader title="At the Airbnb" />
      <div style={{ padding: '18px 18px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ font: '700 18px/1.3 var(--gl-font-ui)', color: 'var(--gl-ink)' }}>How will you hand over your bags?</div>
        <Opt sel icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>}
          t="Leave at the Airbnb" d="Leave bags at the agreed spot, then upload a photo." />
        <Opt icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3v-5l2-5h10l3 5h1a2 2 0 0 1 2 2v3h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>}
          t="Meet the driver in person" d="Hand bags to the driver at the agreed place." />
      </div>
    </div>
  );
}

// ── 7. Driver ETA / meet-the-driver ──────────────────────────────────────────
function ScrDriver() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      <StatusBar />
      <AppHeader title="Your driver" />
      <div style={{ padding: '16px 18px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ position: 'relative', height: 168, borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(135deg,#ece3f2,#f6f1fa)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(81,42,114,.06) 0 1px, transparent 1px 26px), repeating-linear-gradient(90deg, rgba(81,42,114,.06) 0 1px, transparent 1px 26px)' }} />
          <svg style={{ position: 'absolute', inset: 0 }} width="100%" height="100%" viewBox="0 0 320 168" preserveAspectRatio="none"><path d="M20 150 C 90 120, 110 60, 200 50 S 300 30, 304 24" fill="none" stroke="var(--gl-purple-500)" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round"/></svg>
          <div style={{ position: 'absolute', left: 14, bottom: 12, width: 28, height: 28, borderRadius: 999, background: 'var(--gl-lime-500)', border: '3px solid #fff', boxShadow: 'var(--gl-shadow-sm)' }} />
          <div style={{ position: 'absolute', right: 16, top: 14, width: 34, height: 34, borderRadius: 999, background: 'var(--gl-purple-600)', border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--gl-shadow-md)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3v-5l2-5h10l3 5h1a2 2 0 0 1 2 2v3h-2"/><circle cx="7" cy="17" r="1.6"/><circle cx="17" cy="17" r="1.6"/></svg>
          </div>
        </div>
        <div style={{ ...cardBox, padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ font: '700 17px/1 var(--gl-font-ui)', color: 'var(--gl-ink)' }}>Driver arriving</span>
            <span style={{ font: '800 16px/1 var(--gl-font-ui)', color: '#fff', background: 'var(--gl-purple-600)', borderRadius: 999, padding: '6px 12px' }}>ETA 2:30 pm</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--gl-line)', paddingTop: 12 }}>
            <span style={{ font: '500 14px/1 var(--gl-font-ui)', color: 'var(--gl-ink-3)' }}>Plate number</span>
            <span style={{ font: '700 15px/1 var(--gl-font-mono)', color: 'var(--gl-purple-700)' }}>12가 3456</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ font: '500 14px/1 var(--gl-font-ui)', color: 'var(--gl-ink-3)' }}>Visible from</span>
            <span style={{ font: '700 15px/1 var(--gl-font-ui)', color: 'var(--gl-ink)' }}>30 min before</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Generic full-screen image (real app capture inside the phone) ────────────
function ImgScreen({ src, statusBar = false, bg = '#fff', fit = 'cover', pos = 'center top' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: bg }}>
      {statusBar && <StatusBar />}
      <div style={{ flex: 1, minHeight: 0 }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: fit, objectPosition: pos, display: 'block' }} />
      </div>
    </div>
  );
}

// Real captures (extracted 1:1 from the source deck) ─────────────────────────
function ScrPriceCalc()  { return <ImgScreen src="assets/scr_price_calc.png" fit="cover" pos="center top" />; }
function ScrPriceBook()  { return <ImgScreen src="assets/scr_price_book_clean.png" bg="#f7f8fc" fit="cover" pos="center top" />; }
function ScrSchedule()   { return <ImgScreen src="assets/scr_schedule_time.png" fit="cover" pos="center top" />; }   // pick drop-off / pickup time slot
function ScrScheduled()  { return <ImgScreen src="assets/scr_schedule_later.png" fit="cover" pos="center top" />; }  // pickup on a later date (scheduled)
function ScrContactInfo(){ return <ImgScreen src="assets/scr_contact_country.png" fit="cover" pos="center top" />; } // customer info + country-code picker
function ScrPaySummary() { return <ImgScreen src="assets/scr_pay_summary.png" fit="cover" pos="center top" />; }
function ScrPayMethod()  { return <ImgScreen src="assets/scr_pay_method.png" fit="cover" pos="center top" />; }
function ScrEmailTrack() { return <ImgScreen src="assets/scr_email_tracking.png" statusBar fit="cover" pos="center top" />; } // confirmation email w/ tracking link
function ScrDriverEta()  { return <ImgScreen src="assets/scr_driver_eta.jpeg" statusBar fit="contain" bg="#fff" />; }
function ScrMeetupDone() { return <ImgScreen src="assets/scr_meetup_done.png" fit="cover" pos="center top" />; }

Object.assign(window, {
  Phone, StatusBar, AppHeader, GlSiteHeader, ImgScreen,
  ScrPrice, ScrForm, ScrConfirm, ScrHotelCard, ScrUpload, ScrAirbnb, ScrDriver,
  ScrPriceCalc, ScrPriceBook, ScrSchedule, ScrScheduled, ScrContactInfo,
  ScrPaySummary, ScrPayMethod, ScrEmailTrack, ScrDriverEta, ScrMeetupDone,
});
