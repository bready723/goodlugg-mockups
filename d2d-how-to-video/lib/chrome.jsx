// chrome.jsx — shared video chrome for the D2D how-to video
// Exposes: SECTIONS, TOTAL, useSec, Reveal, SceneBG, ProgressBar, Kicker,
//   HL, CaptionTitle, Bullet, FaqCard, EmailToast, WordmarkPng, BetaPill, Tiger
// Relies on globals from animations.jsx (useTime, Easing, clamp, interpolate).

// ── Timeline config (shared by progress bar + scenes) ───────────────────────
const SECTIONS = [
  { key: 'intro',  label: "What's D2D?", num: '–',  start: 0,  end: 6 },
  { key: 'book',   label: 'Book',        num: '01', start: 6,  end: 34 },
  { key: 'drop',   label: 'Drop-off',    num: '02', start: 34, end: 54 },
  { key: 'track',  label: 'Track',       num: '03', start: 54, end: 67 },
  { key: 'pickup', label: 'Collect',     num: '04', start: 67, end: 77 },
];
const TOTAL = 86;
const OUTRO_START = 77; // contact + ending pages — progress bar hidden here

// current section index for a given time
function secIndex(t) {
  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    if (t >= SECTIONS[i].start) return i;
  }
  return 0;
}

// ── Reveal: fade + slide an absolutely-positioned block in at `at`, out at `out`
function Reveal({ at = 0, out = Infinity, x, y, right, dx = 0, dy = 18,
                  inDur = 0.55, outDur = 0.4, children, style = {}, width }) {
  const t = useTime();
  let opacity = 0, tx = dx, ty = dy;
  if (t >= at) {
    const e = Easing.easeOutCubic(clamp((t - at) / inDur, 0, 1));
    opacity = e; tx = dx * (1 - e); ty = dy * (1 - e);
  }
  if (t >= out) {
    const p = Easing.easeInCubic(clamp((t - out) / outDur, 0, 1));
    opacity = (opacity) * (1 - p); ty = ty - 10 * p;
  }
  const pos = right != null ? { right } : { left: x };
  return (
    <div style={{ position: 'absolute', ...pos, top: y, width,
      transform: `translate(${tx}px, ${ty}px)`, opacity, willChange: 'transform, opacity', ...style }}>
      {children}
    </div>
  );
}

// ── Full-bleed scene background that cross-fades in/out ──────────────────────
function SceneBG({ start, end, color, children, fade = 0.6 }) {
  const t = useTime();
  let opacity = 0;
  if (t >= start - fade) opacity = clamp((t - (start - fade)) / fade, 0, 1);
  if (t >= end) opacity = clamp(1 - (t - end) / fade, 0, 1);
  if (opacity <= 0) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, background: color, opacity, willChange: 'opacity' }}>
      {children}
    </div>
  );
}

// ── Chartreuse keyword highlight (marker style) ──────────────────────────────
function HL({ children, on = 'light' }) {
  return (
    <span style={{
      background: 'var(--hl-bg, var(--gl-lime-500))',
      color: 'var(--hl-fg, var(--gl-purple-800))',
      borderRadius: 6, padding: '0.02em 0.22em', boxDecorationBreak: 'clone',
      WebkitBoxDecorationBreak: 'clone', fontWeight: 800,
    }}>{children}</span>
  );
}

// purple keyword (for use inside chartreuse-heavy areas)
function PK({ children }) {
  return <span style={{ color: 'var(--gl-purple-600)', fontWeight: 800 }}>{children}</span>;
}

// ── Section kicker (STEP 01 · 짐 맡기기) ─────────────────────────────────────
function Kicker({ num, label, color = 'var(--gl-purple-600)' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
      <span style={{
        font: '800 16px/1 var(--gl-font-ui)', letterSpacing: '.02em',
        color: '#fff', background: color, borderRadius: 8, padding: '7px 12px',
      }}>STEP {num}</span>
      <span style={{ font: '800 22px/1 var(--gl-font-ui)', letterSpacing: '.06em',
        textTransform: 'uppercase', color: 'var(--gl-purple-500)' }}>{label}</span>
    </div>
  );
}

// big caption title
function CaptionTitle({ children, color = 'var(--gl-ink)', size = 58 }) {
  return (
    <h2 style={{ font: `800 ${size}px/1.06 var(--gl-font-display)`, letterSpacing: '-0.02em',
      color, margin: 0, textWrap: 'balance' }}>{children}</h2>
  );
}

// numbered point row
function Bullet({ n, children, active = true }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', opacity: active ? 1 : 0.4 }}>
      <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 999,
        background: 'var(--gl-purple-600)', color: '#fff',
        font: '800 16px/32px var(--gl-font-ui)', textAlign: 'center' }}>{n}</span>
      <span style={{ font: '500 30px/1.34 var(--gl-font-ui)', color: 'var(--gl-ink)', paddingTop: 2 }}>{children}</span>
    </div>
  );
}

// ── Inline FAQ card ──────────────────────────────────────────────────────────
function FaqCard({ q, a, width = 560 }) {
  return (
    <div style={{
      width, background: '#fff', borderRadius: 18, padding: '20px 22px',
      boxShadow: '0 14px 34px rgba(81,42,114,.16)', border: '1px solid var(--gl-line)',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ font: '800 13px/1 var(--gl-font-ui)', letterSpacing: '.12em',
          textTransform: 'uppercase', color: '#fff', background: 'var(--gl-beta)',
          borderRadius: 999, padding: '5px 11px' }}>FAQ</span>
        <span style={{ font: '700 26px/1.2 var(--gl-font-ui)', color: 'var(--gl-purple-700)' }}>{q}</span>
      </div>
      <div style={{ font: '500 24px/1.4 var(--gl-font-ui)', color: 'var(--gl-ink-2)' }}>{a}</div>
    </div>
  );
}

// ── Email notification toast ─────────────────────────────────────────────────
function EmailToast({ title, sub }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 13, background: '#fff', borderRadius: 16,
      padding: '14px 18px 14px 14px', boxShadow: '0 16px 38px rgba(81,42,114,.22)',
      border: '1px solid var(--gl-line)', minWidth: 330,
    }}>
      <span style={{ flexShrink: 0, width: 42, height: 42, borderRadius: 12,
        background: 'var(--gl-purple-050)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gl-purple-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
      </span>
      <div>
        <div style={{ font: '700 17px/1.2 var(--gl-font-ui)', color: 'var(--gl-ink)' }}>{title}</div>
        <div style={{ font: '500 14px/1.3 var(--gl-font-ui)', color: 'var(--gl-ink-3)', marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

// ── Brand bits ───────────────────────────────────────────────────────────────
function WordmarkPng({ white = false, height = 46 }) {
  return <img src={white ? 'assets/logo_wordmark_white.png' : 'assets/logo_wordmark.png'}
    alt="Goodlugg" style={{ height, display: 'block' }} />;
}
// text wordmark fallback / inline
function Wordmark({ size = 34, white = false }) {
  return (
    <span style={{ font: `800 ${size}px/1 var(--gl-font-display)`, letterSpacing: '-0.03em' }}>
      <span style={{ color: white ? '#fff' : 'var(--gl-purple-600)' }}>Good</span>
      <span style={{ color: 'var(--gl-lime-500)' }}>lugg</span>
    </span>
  );
}
function BetaPill() {
  return <span style={{ font: '800 14px/1 var(--gl-font-ui)', letterSpacing: '.06em',
    color: '#fff', background: 'var(--gl-beta)', borderRadius: 999, padding: '6px 12px',
    verticalAlign: 'middle' }}>Beta</span>;
}

// ── Tiger mascot (transparent png) ───────────────────────────────────────────
function Tiger({ width = 200, style = {} }) {
  return <img src="assets/tiger.png" alt="" style={{ width, display: 'block',
    filter: 'drop-shadow(0 12px 18px rgba(43,22,64,.30))', ...style }} />;
}

// ── Persistent bottom progress bar (table-of-contents) ───────────────────────
function ProgressBar() {
  const t = useTime();
  if (t >= OUTRO_START) return null; // hidden over the closing contact/ending pages
  const cur = secIndex(t);
  const overall = clamp(t / TOTAL, 0, 1);
  const H = 44;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: H,
      background: '#fff', borderTop: '1px solid var(--gl-line)', display: 'flex',
      boxShadow: '0 -6px 24px rgba(43,22,64,.06)', zIndex: 50 }}>
      {/* overall progress sliver along the very top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--gl-line-2)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: `${overall * 100}%`, height: 4,
        background: 'var(--gl-lime-500)', transition: 'none' }} />
      {SECTIONS.map((s, i) => {
        const done = i < cur, active = i === cur;
        const segP = active ? clamp((t - s.start) / (s.end - s.start), 0, 1) : 0;
        return (
          <div key={s.key} style={{ flex: 1, position: 'relative', overflow: 'hidden',
            background: active ? 'var(--gl-purple-600)' : '#fff',
            borderRight: i < SECTIONS.length - 1 ? '1px solid var(--gl-line)' : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
            {active && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0,
              width: `${segP * 100}%`, background: 'rgba(255,255,255,.12)' }} />}
            <span style={{ position: 'relative', zIndex: 1, width: 18, height: 18, borderRadius: 999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              font: '800 11px/1 var(--gl-font-ui)',
              background: done ? 'var(--gl-lime-500)' : active ? 'rgba(255,255,255,.16)' : 'var(--gl-purple-050)',
              color: done ? 'var(--gl-purple-800)' : active ? '#fff' : 'var(--gl-purple-400)' }}>
              {done ? '✓' : s.num}
            </span>
            <span style={{ position: 'relative', zIndex: 1, font: '700 15px/1 var(--gl-font-ui)',
              color: active ? '#fff' : done ? 'var(--gl-purple-400)' : 'var(--gl-ink-3)',
              letterSpacing: '-0.01em' }}>{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  SECTIONS, TOTAL, secIndex,
  Reveal, SceneBG, HL, PK, Kicker, CaptionTitle, Bullet,
  FaqCard, EmailToast, WordmarkPng, Wordmark, BetaPill, Tiger, ProgressBar,
});
