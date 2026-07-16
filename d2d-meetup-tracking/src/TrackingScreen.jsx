/* global React */
// Goodlugg D2D Meetup Tracking screen — variants: 'enroute' | 'arriving' | 'near' | 'delivered'
// Rendered inside a phone-sized (390×760) card that mimics the in-app webview.

const { useEffect, useState, useRef } = React;

// ---------- i18n strings ----------
const STRINGS = {
  kr: {
    lang: '한국어',
    poc: 'POC · KD MEET',
    bookingRef: '예약번호',
    from: '맡기는 곳',
    to: '도착지',
    origin: '그랜드 조선 부산',
    dest: '목시 서울 명동',
    eta: '도착 예정',
    minsLeft: '분 남음',
    soon: '곧',
    soonLabel: '도착',
    meetupSpot: '만남 장소',
    arrivesAt: (h12, mm, ampm) => `${ampm} ${h12}:${mm} 도착 예정`,
    nearPickup: '기사가 근처에 있어요',
    assigned: '배정된 차량',
    sedan: '승용차',
    truck: '트럭',
    complete: '미팅 완료',
    completeSub: '짐을 전달했어요.',
    ladderTitle: 'ETA · 세분화된 단계',
    ladder: ['30분', '20분', '10분', '5분', '곧'],
  },
  en: {
    lang: 'English',
    poc: 'POC · KD MEET',
    bookingRef: 'Booking No.',
    from: 'From',
    to: 'To',
    origin: 'Grand Josun Busan',
    dest: 'Moxy Seoul, Myeongdong',
    eta: 'Arriving in',
    minsLeft: 'min',
    soon: 'Soon',
    soonLabel: 'Arriving',
    meetupSpot: 'Meetup Spot',
    arrivesAt: (h12, mm, ampm) => `Arrives ${h12}:${mm} ${ampm === '오후' ? 'pm' : 'am'}`,
    nearPickup: 'Driver is nearby',
    assigned: 'Assigned vehicle',
    sedan: 'Sedan',
    truck: 'Truck',
    complete: 'Meetup completed',
    completeSub: 'Bag handed over.',
    ladderTitle: 'ETA · granular bands',
    ladder: ['30 min', '20 min', '10 min', '5 min', 'Soon'],
  },
};

// ---------- Shared: iPhone-ish browser-chrome frame ----------
function PhoneFrame({ children, label }) {
  return (
    <div style={{
      width: 390, height: 760, background: '#fff',
      borderRadius: 36, overflow: 'hidden', position: 'relative',
      boxShadow: 'var(--gl-shadow-lg)',
      border: '8px solid #1a1420',
      fontFamily: 'var(--gl-font-ui)',
    }}>
      {/* iOS status bar */}
      <div style={{
        height: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 22px', font: '600 15px/1 var(--gl-font-ui)', color: '#1a1420',
        background: '#fff', position: 'relative', zIndex: 10,
      }}>
        <span>10:57</span>
        <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <svg width="18" height="11" viewBox="0 0 18 11" fill="none"><path d="M1 8.5h2v2H1zM5 6.5h2v4H5zM9 4h2v6.5H9zM13 1.5h2V10.5h-2z" fill="#1a1420"/></svg>
          <span style={{ font: '700 13px/1 var(--gl-font-ui)' }}>5G</span>
          <svg width="24" height="11" viewBox="0 0 24 11" fill="none">
            <rect x=".5" y=".5" width="19" height="10" rx="2.5" stroke="#1a1420"/>
            <rect x="2" y="2" width="16" height="7" rx="1.2" fill="#1a1420"/>
            <rect x="20.5" y="3.5" width="1.6" height="4" rx=".8" fill="#1a1420"/>
          </svg>
        </span>
      </div>
      {/* screen content */}
      <div style={{ height: 'calc(100% - 44px)', overflow: 'hidden', position: 'relative', background: 'var(--gl-bg)' }}>
        {children}
      </div>
    </div>
  );
}

// ---------- Goodlugg top bar (web-app-in-Safari look) ----------
function TopBar({ lang = 'kr' }) {
  const t = STRINGS[lang];
  return (
    <div style={{ background: '#fff', padding: '12px 20px 14px', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 16, top: 12, display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 10px', borderRadius: 999, background: 'var(--gl-bg-alt)',
        font: '500 12px/1 var(--gl-font-ui)', color: 'var(--gl-ink-2)' }}>
        <span style={{ fontSize: 12 }}>🌐</span>
        <span>{t.lang}</span>
        <span style={{ fontSize: 9, opacity: .6 }}>▾</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 2 }}>
        <div style={{ font: '800 26px/1 var(--gl-font-display)', letterSpacing: '-0.025em' }}>
          <span style={{ color: 'var(--gl-purple-600)' }}>Good</span>
          <span style={{ color: 'var(--gl-lime-500)' }}>lugg</span>
        </div>
      </div>
      <div style={{ position: 'absolute', right: 18, top: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ width: 22, height: 2, background: 'var(--gl-ink)' }}></span>
        <span style={{ width: 22, height: 2, background: 'var(--gl-ink)' }}></span>
        <span style={{ width: 22, height: 2, background: 'var(--gl-ink)' }}></span>
      </div>
    </div>
  );
}

// ---------- Booking ref + route pill (compact) ----------
function RouteHeader({ compact = false, lang = 'kr' }) {
  const t = STRINGS[lang];
  if (compact) {
    // Slim single-row strip: pill · ref · route pills inline
    return (
      <div style={{ padding: '8px 14px 10px', background: '#fff', borderBottom: '1px solid var(--gl-line-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '4px 9px', borderRadius: 999,
            background: 'var(--gl-purple-700)', color: '#fff',
            font: '700 9px/1 var(--gl-font-ui)', letterSpacing: '.08em', flexShrink: 0,
          }}>
            <span style={{ width: 4, height: 4, borderRadius: 999, background: 'var(--gl-lime-500)' }}></span>
            {t.poc}
          </span>
          <span style={{ font: '700 13px/1 var(--gl-font-mono)', color: 'var(--gl-ink)', letterSpacing: '.01em' }}>
            752PNZC64Z
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, font: '600 11px/1.2 var(--gl-font-ui)' }}>
          <span style={{ flex: 1, color: 'var(--gl-ink)', textAlign: 'left' }}>
            {t.origin}
          </span>
          <span style={{ color: 'var(--gl-ink-3)' }}>→</span>
          <span style={{ flex: 1, color: 'var(--gl-ink)', textAlign: 'right' }}>
            {t.dest}
          </span>
        </div>
      </div>
    );
  }
  // Full header (used on delivered slide only)
  return (
    <div style={{ padding: '14px 20px 16px', background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 11px', borderRadius: 999,
          background: 'var(--gl-purple-700)', color: '#fff',
          font: '700 10px/1 var(--gl-font-ui)', letterSpacing: '.08em',
        }}>
          <span style={{ width: 4, height: 4, borderRadius: 999, background: 'var(--gl-lime-500)' }}></span>
          {t.poc}
        </span>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{ font: '500 12px/1 var(--gl-font-ui)', color: 'var(--gl-ink-3)' }}>{t.bookingRef}</div>
        <div style={{ font: '800 22px/1.1 var(--gl-font-mono)', color: 'var(--gl-ink)', marginTop: 4, letterSpacing: '.01em' }}>
          752PNZC64Z
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 10 }}>
        <div style={{
          background: '#fff', border: '1px solid var(--gl-line)',
          borderRadius: 14, padding: '10px 12px', textAlign: 'center',
        }}>
          <div style={{ font: '500 11px/1 var(--gl-font-ui)', color: 'var(--gl-ink-3)' }}>{t.from}</div>
          <div style={{ font: '700 14px/1.25 var(--gl-font-ui)', color: 'var(--gl-ink)', marginTop: 4 }}>{t.origin}</div>
        </div>
        <span style={{ color: 'var(--gl-ink-3)', font: '500 16px/1 var(--gl-font-ui)' }}>→</span>
        <div style={{
          background: '#fff', border: '1px solid var(--gl-line)',
          borderRadius: 14, padding: '10px 12px', textAlign: 'center',
        }}>
          <div style={{ font: '500 11px/1 var(--gl-font-ui)', color: 'var(--gl-ink-3)' }}>{t.to}</div>
          <div style={{ font: '700 14px/1.25 var(--gl-font-ui)', color: 'var(--gl-ink)', marginTop: 4 }}>{t.dest}</div>
        </div>
      </div>
    </div>
  );
}

// ---------- SVG primitives for map ----------

// Purple pin with suitcase — drop-in replacement for the tiny dot
function MeetupPin({ x, y, scale = 1 }) {
  // size 48×60 base
  const w = 48 * scale, h = 60 * scale;
  return (
    <g transform={`translate(${x - w/2}, ${y - h})`}>
      {/* shadow */}
      <ellipse cx={w/2} cy={h - 2} rx={w*0.28} ry={3} fill="#000" opacity=".14"/>
      {/* pin body */}
      <path
        d={`M ${w/2} ${h - 4} C ${w*0.82} ${h*0.65}, ${w} ${h*0.45}, ${w} ${h*0.32}
            C ${w} ${h*0.14}, ${w*0.78} 0, ${w/2} 0
            C ${w*0.22} 0, 0 ${h*0.14}, 0 ${h*0.32}
            C 0 ${h*0.45}, ${w*0.18} ${h*0.65}, ${w/2} ${h - 4} Z`}
        fill="var(--gl-purple-600)"
      />
      {/* inner disc */}
      <circle cx={w/2} cy={h*0.32} r={w*0.34} fill="#fff"/>
      {/* suitcase glyph, centered in disc */}
      <g transform={`translate(${w/2 - w*0.18}, ${h*0.32 - w*0.22})`}>
        {/* handle */}
        <rect x={w*0.12} y={0} width={w*0.12} height={w*0.06} rx={w*0.02} fill="var(--gl-purple-600)"/>
        {/* body */}
        <rect x={0} y={w*0.07} width={w*0.36} height={w*0.37} rx={w*0.04} fill="var(--gl-purple-600)"/>
        {/* vertical light stripe */}
        <rect x={w*0.16} y={w*0.10} width={w*0.04} height={w*0.31} rx={w*0.01} fill="#fff" opacity=".7"/>
      </g>
    </g>
  );
}

// Restore the original top-down car marker for the MAP — this is the
// "moving driver" indicator users see traveling along the route.
function SedanMarker({ x, y, angle = 0, eta, etaLabel, bubbleBelow = false }) {
  const twoLine = !!etaLabel;
  const bubbleW = twoLine ? 92 : 52;
  const bubbleH = twoLine ? 36 : 22;
  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle})`}>
      {/* shadow */}
      <ellipse cx={0} cy={16} rx={11} ry={2.5} fill="#000" opacity=".18"/>
      {/* car body — original top-down detailed look */}
      <g transform="scale(0.7)">
        <rect x={-14} y={-22} width={28} height={44} rx={8} fill="var(--gl-purple-600)" stroke="#fff" strokeWidth={2}/>
        <path d="M -11 -12 Q 0 -18 11 -12 L 11 4 Q 0 0 -11 4 Z" fill="#b499cc" opacity=".7"/>
        <path d="M -11 12 Q 0 16 11 12 L 11 20 L -11 20 Z" fill="#b499cc" opacity=".55"/>
        <rect x={-10} y={-22} width={4} height={2} rx={1} fill="var(--gl-lime-400)"/>
        <rect x={6} y={-22} width={4} height={2} rx={1} fill="var(--gl-lime-400)"/>
      </g>
      {/* ETA bubble — un-rotate so it stays readable. If bubbleBelow, flip to under the car. */}
      {eta ? (
        <g transform={`rotate(${-angle})`}>
          <g transform={`translate(0, ${bubbleBelow ? (twoLine ? 40 : 30) : (twoLine ? -32 : -24)})`}>
            <rect
              x={-bubbleW/2} y={-bubbleH + 4} width={bubbleW} height={bubbleH}
              rx={twoLine ? 10 : 11}
              fill="#fff" stroke="var(--gl-line)" strokeWidth={1}
            />
            {/* tail — points UP when bubble is below car, DOWN when above */}
            {bubbleBelow ? (
              <path
                d={`M -4 ${-bubbleH + 4} L 0 ${-bubbleH} L 4 ${-bubbleH + 4} Z`}
                fill="#fff" stroke="var(--gl-line)" strokeWidth={1}
              />
            ) : (
              <path
                d={`M -4 ${4} L 0 ${8} L 4 ${4} Z`}
                fill="#fff" stroke="var(--gl-line)" strokeWidth={1}
              />
            )}
            {twoLine ? (
              <>
                <text x={0} y={-12} textAnchor="middle" fill="var(--gl-ink)"
                  style={{ font: '800 11px/1 var(--gl-font-display)', letterSpacing: '-.01em' }}>
                  {etaLabel}
                </text>
                <text x={0} y={0} textAnchor="middle" fill="var(--gl-ink-2)"
                  style={{ font: '600 10px/1 var(--gl-font-ui)', letterSpacing: '.04em' }}>
                  {eta}
                </text>
              </>
            ) : (
              <text x={0} y={-3} textAnchor="middle" fill="var(--gl-ink)"
                style={{ font: '700 11px/1 var(--gl-font-ui)' }}>
                {eta}
              </text>
            )}
          </g>
        </g>
      ) : null}
    </g>
  );
}

// ---------- Map ----------
// Stylized road network (no real tiles, but reads as a city map)
function MapBackdrop({ children, height }) {
  return (
    <div style={{
      position: 'relative', width: '100%', height,
      overflow: 'hidden', background: '#e8ece9',
    }}>
      <svg viewBox="0 0 390 320" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* water wedge bottom-left */}
        <path d="M 0 220 L 120 320 L 0 320 Z" fill="#cfdbe4"/>
        {/* park block */}
        <rect x={40} y={40} width={90} height={70} rx={4} fill="#d7e2cf"/>
        <rect x={240} y={180} width={110} height={90} rx={4} fill="#d7e2cf"/>
        {/* building blocks */}
        <rect x={150} y={30} width={70} height={50} rx={2} fill="#e3dcd0"/>
        <rect x={240} y={30} width={90} height={50} rx={2} fill="#e3dcd0"/>
        <rect x={40} y={140} width={80} height={70} rx={2} fill="#ece7dd"/>
        <rect x={140} y={110} width={80} height={100} rx={2} fill="#ece7dd"/>
        <rect x={230} y={110} width={100} height={60} rx={2} fill="#e3dcd0"/>
        {/* roads */}
        <g stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round">
          <path d="M -10 100 L 400 100"/>
          <path d="M -10 220 L 400 220"/>
          <path d="M 130 -10 L 130 330"/>
          <path d="M 230 -10 L 230 330"/>
        </g>
        <g stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" opacity=".85">
          <path d="M 60 -10 L 60 330"/>
          <path d="M 340 -10 L 340 330"/>
          <path d="M -10 50 L 400 50"/>
          <path d="M -10 160 L 400 160"/>
          <path d="M -10 280 L 400 280"/>
        </g>
        {/* labels */}
        <g style={{ font: '600 8px/1 var(--gl-font-ui)', fill: '#6a5d74' }}>
          <text x={180} y={46}>해운대로</text>
          <text x={60} y={156}>중앙대로</text>
          <text x={262} y={216}>진구로</text>
        </g>
        {children}
      </svg>
      {/* Google attribution to match real feel */}
      <div style={{ position: 'absolute', bottom: 4, left: 8, font: '500 10px/1 var(--gl-font-ui)', color: '#5e5e5e' }}>Google</div>
      <div style={{ position: 'absolute', bottom: 4, right: 8, font: '500 9px/1 var(--gl-font-ui)', color: '#5e5e5e' }}>©2026 TMap Mobility</div>
      {/* zoom */}
      <div style={{ position: 'absolute', bottom: 20, right: 12, display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 10, boxShadow: 'var(--gl-shadow-sm)', overflow: 'hidden' }}>
        <div style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', font: '500 18px/1 var(--gl-font-ui)', color: 'var(--gl-ink)', borderBottom: '1px solid var(--gl-line)' }}>+</div>
        <div style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', font: '500 18px/1 var(--gl-font-ui)', color: 'var(--gl-ink)' }}>−</div>
      </div>
    </div>
  );
}

// ---------- Animated route+car ----------
// Route definition in map viewBox (390×320) coordinates.
// Start (car origin) → end (meetup pin).
const ROUTE = {
  points: [
    [60, 260],   // start — bottom-left road
    [60, 220],
    [130, 220],
    [130, 160],
    [230, 160],
    [230, 100],
    [285, 100],  // destination near meetup pin
  ],
  pin: [285, 95],
};

// Build SVG path d from points
function routePath(points) {
  return points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
}

function AnimatedRoute({ progress, etaLabel, etaTopLine, lang = 'kr' }) {
  // progress 0..1 along path; compute point & angle
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: ROUTE.points[0][0], y: ROUTE.points[0][1], angle: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const len = ref.current.getTotalLength();
    const p = ref.current.getPointAtLength(len * progress);
    const p2 = ref.current.getPointAtLength(Math.min(len, len * progress + 1));
    const dx = p2.x - p.x, dy = p2.y - p.y;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90; // rotate so sedan points along path
    setPos({ x: p.x, y: p.y, angle });
  }, [progress]);

  const d = routePath(ROUTE.points);

  // If the car is close to the pin, its bubble would collide with the "Meetup Spot"
  // tooltip sitting above the pin. In that case, flip the car's bubble to below.
  // Also always flip below when the two-line "Arriving Soon" bubble is shown,
  // since that bubble is tall enough to always overlap.
  const distToPin = Math.hypot(pos.x - ROUTE.pin[0], pos.y - ROUTE.pin[1]);
  const carBubbleBelow = distToPin < 70 || !!etaTopLine;

  return (
    <>
      {/* route line — purple, slightly glowy */}
      <path d={d} ref={ref}
        stroke="var(--gl-purple-600)" strokeWidth={5} fill="none"
        strokeLinecap="round" strokeLinejoin="round" opacity=".25"/>
      <path d={d}
        stroke="var(--gl-purple-600)" strokeWidth={3} fill="none"
        strokeLinecap="round" strokeLinejoin="round"/>
      {/* dashed "traveled" segment */}
      {/* meetup pin at destination */}
      <MeetupPin x={ROUTE.pin[0]} y={ROUTE.pin[1]} scale={0.62}/>
      {/* Meetup Spot label — positioned ABOVE the pin (Uber pattern) */}
      {(() => {
        const w = lang === 'en' ? 96 : 84;
        const pinH = 60 * 0.62; // matches MeetupPin scale
        const tx = ROUTE.pin[0] - w/2;
        const ty = ROUTE.pin[1] - pinH - 30; // sit above the pin top with a gap for the tail
        // clamp so it never clips the viewBox edges (0..390)
        const clampedX = Math.max(6, Math.min(tx, 390 - w - 6));
        const tailX = ROUTE.pin[0] - clampedX; // where the tail points (relative)
        return (
          <g transform={`translate(${clampedX}, ${ty})`}>
            <rect x={0} y={0} width={w} height={26} rx={13} fill="#fff" stroke="var(--gl-line)" strokeWidth={1}/>
            {/* downward-pointing tail */}
            <path d={`M ${tailX - 5} 26 L ${tailX} 32 L ${tailX + 5} 26 Z`} fill="#fff" stroke="var(--gl-line)" strokeWidth={1}/>
            <text x={w/2} y={17} textAnchor="middle" fill="var(--gl-ink)"
              style={{ font: '700 11px/1 var(--gl-font-ui)' }}>
              {lang === 'en' ? 'Meetup Spot' : '만남 장소'}
            </text>
          </g>
        );
      })()}
      {/* car */}
      <SedanMarker x={pos.x} y={pos.y} angle={pos.angle} eta={etaLabel} etaLabel={etaTopLine} bubbleBelow={carBubbleBelow}/>
    </>
  );
}

// ---------- Korean license plate (realistic) ----------
function KoreanPlate({ text = '11가 4864' }) {
  // Real spec: KR commercial plates are yellow with black border + bold black text
  const [left, right] = text.split(/\s+/);
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: '6px 14px', background: '#f7c948',
      border: '2px solid #1a1420', borderRadius: 6,
      position: 'relative',
      font: '800 28px/1 var(--gl-font-display)', color: '#1a1420',
      letterSpacing: '.01em',
    }}>
      {/* rivets */}
      <span style={{ position: 'absolute', left: -5, top: '50%', transform: 'translateY(-50%)', width: 6, height: 6, borderRadius: 999, background: '#f7c948', border: '1.5px solid #1a1420' }}></span>
      <span style={{ position: 'absolute', right: -5, top: '50%', transform: 'translateY(-50%)', width: 6, height: 6, borderRadius: 999, background: '#f7c948', border: '1.5px solid #1a1420' }}></span>
      <span>{left}</span>
      <span style={{ margin: '0 2px' }}>{right}</span>
    </div>
  );
}

// ---------- Info card variants ----------
// eta is either a minute number, 'soon', or null (delivered)
// Small side-view sedan/truck icon for the InfoCard vehicle row
function VehicleIcon({ type = 'sedan' }) {
  if (type === 'tbd') {
    // dashed placeholder silhouette with a question mark
    return (
      <svg width="30" height="20" viewBox="0 0 30 20" fill="none" aria-hidden="true">
        <path d="M 2 13 L 4 10 L 9 8 L 20 8 L 25 10 L 28 11 L 28 14 L 2 14 Z"
          fill="none" stroke="var(--gl-ink-3)" strokeWidth="1.2" strokeDasharray="2 2"/>
        <path d="M 8 8 L 11 4.5 L 19 4.5 L 22 8"
          fill="none" stroke="var(--gl-ink-3)" strokeWidth="1.2" strokeDasharray="2 2"/>
        <text x="15" y="13" textAnchor="middle" fill="var(--gl-ink-3)"
          style={{ font: '700 8px/1 var(--gl-font-ui)' }}>?</text>
        <circle cx="8" cy="15" r="2" fill="none" stroke="var(--gl-ink-3)" strokeWidth="1.2" strokeDasharray="2 2"/>
        <circle cx="22" cy="15" r="2" fill="none" stroke="var(--gl-ink-3)" strokeWidth="1.2" strokeDasharray="2 2"/>
      </svg>
    );
  }
  if (type === 'truck') {
    // 1-ton Damas-style cab-over box truck, side view
    return (
      <svg width="34" height="22" viewBox="0 0 34 22" fill="none" aria-hidden="true">
        {/* cargo box */}
        <rect x="11" y="3" width="19" height="13" rx="1.5" fill="var(--gl-purple-600)"/>
        {/* cab */}
        <path d="M 2 9 L 2 16 L 11 16 L 11 5 L 7 5 Z" fill="var(--gl-purple-800)"/>
        {/* windshield */}
        <path d="M 7 5.5 L 10 5.5 L 10 9 L 3 9 Z" fill="#b499cc"/>
        {/* chassis line */}
        <rect x="2" y="16" width="28" height="1" fill="var(--gl-ink)"/>
        {/* wheels */}
        <circle cx="8" cy="18" r="2.6" fill="var(--gl-ink)"/>
        <circle cx="8" cy="18" r="1" fill="#fff"/>
        <circle cx="24" cy="18" r="2.6" fill="var(--gl-ink)"/>
        <circle cx="24" cy="18" r="1" fill="#fff"/>
      </svg>
    );
  }
  // Cute rounded sedan, side view — matches the reference screenshot
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none" aria-hidden="true">
      {/* main body — one continuous rounded silhouette with a domed roof */}
      <path
        d="M 4 16
           L 4 12
           C 4 10.5, 5 9.5, 7 9
           L 10 5.5
           C 11 4.5, 12.5 4, 14 4
           L 21 4
           C 22.5 4, 24 4.6, 25 5.8
           L 27.5 9
           C 29.5 9.4, 31 10.5, 31 12
           L 31 16
           Z"
        fill="var(--gl-purple-600)"
      />
      {/* windows — single simplified shape with a pillar gap */}
      <path d="M 11 8.6 L 13 5.8 L 16.5 5.8 L 16.5 8.6 Z" fill="#fff" opacity=".85"/>
      <path d="M 17.5 5.8 L 20.5 5.8 L 23 8.6 L 17.5 8.6 Z" fill="#fff" opacity=".85"/>
      {/* wheel wells */}
      <circle cx="10" cy="16" r="3.4" fill="var(--gl-ink)"/>
      <circle cx="10" cy="16" r="1.4" fill="#fff"/>
      <circle cx="25" cy="16" r="3.4" fill="var(--gl-ink)"/>
      <circle cx="25" cy="16" r="1.4" fill="#fff"/>
    </svg>
  );
}

// Status banner above the map — variants: info / warn / alert
function StatusBanner({ tone = 'info', title, sub }) {
  const tones = {
    info:  { bg: 'var(--gl-lime-100)', border: 'var(--gl-lime-400)', dot: 'var(--gl-lime-700)', titleColor: 'var(--gl-purple-800)' },
    warn:  { bg: '#fff5e8', border: '#f7d9a7', dot: '#e08a1e', titleColor: '#7a3f00' },
    alert: { bg: '#fde9e8', border: '#f4b7b3', dot: '#d83a2c', titleColor: '#7a1410' },
  };
  const c = tones[tone] || tones.info;
  return (
    <div style={{
      margin: '8px 14px 0',
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: 12, padding: '10px 12px',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <span style={{
        flexShrink: 0, position: 'relative', width: 10, height: 10,
      }}>
        <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: c.dot }}></span>
        {tone === 'info' && (
          <span style={{ position: 'absolute', inset: -4, borderRadius: 999, background: c.dot, opacity: .3, animation: 'glPulse 1.8s ease-out infinite' }}></span>
        )}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '700 13px/1.15 var(--gl-font-display)', color: c.titleColor, letterSpacing: '-.005em' }}>{title}</div>
        {sub ? <div style={{ font: '500 11px/1.2 var(--gl-font-ui)', color: 'var(--gl-ink-2)', marginTop: 2 }}>{sub}</div> : null}
      </div>
      <style>{'@keyframes glPulse{0%{transform:scale(1);opacity:.45}100%{transform:scale(2);opacity:0}}'}</style>
    </div>
  );
}

function InfoCard({ eta, plate, vehicleType, minsApprox, delayedTo, lang = 'kr' }) {
  const t = STRINGS[lang];
  const vehicleLabelPrimary = vehicleType === 'truck' ? t.truck
    : vehicleType === 'tbd' ? 'TBD'
    : t.sedan;

  // ETA display
  let big, label, arrivesAt;
  if (eta === 'matching') {
    big = 'Preparing'; label = ''; arrivesAt = '';
  } else if (eta === 'soon') {
    big = t.soon;
    label = '';
    arrivesAt = delayedTo ? `New ETA ${delayedTo}` : t.nearPickup;
  } else if (typeof eta === 'number') {
    big = String(eta); label = t.minsLeft;
    const now = new Date(); now.setMinutes(now.getMinutes() + eta);
    const hh = now.getHours(), mm = now.getMinutes().toString().padStart(2, '0');
    const ampm = hh >= 12 ? '오후' : '오전';
    const h12 = ((hh + 11) % 12) + 1;
    arrivesAt = delayedTo ? `New ETA ${delayedTo}` : t.arrivesAt(h12, mm, ampm);
  }

  return (
    <div style={{
      background: '#fff',
      borderTopLeftRadius: 20, borderTopRightRadius: 20,
      boxShadow: '0 -8px 24px rgba(50, 25, 80, .08)',
      padding: '10px 16px 14px',
    }}>
      {/* drag handle */}
      <div style={{ width: 36, height: 4, borderRadius: 999, background: 'var(--gl-line)', margin: '0 auto 10px' }}></div>

      {/* ETA on top (Uber pattern) — compact row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 10 }}>
        <div>
          <div style={{ font: '500 11px/1 var(--gl-font-ui)', color: 'var(--gl-ink-3)' }}>{t.eta}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <span style={{ font: '800 32px/1 var(--gl-font-display)', color: 'var(--gl-purple-600)', letterSpacing: '-.03em' }}>{big}</span>
            <span style={{ font: '600 15px/1 var(--gl-font-ui)', color: 'var(--gl-ink)' }}>{label}</span>
          </div>
        </div>
        <div style={{ font: '700 17px/1.25 var(--gl-font-ui)', color: 'var(--gl-ink)', textAlign: 'right', paddingBottom: 3, maxWidth: 200 }}>{arrivesAt}</div>
      </div>

      <div style={{ height: 1, background: 'var(--gl-line)', margin: '10px 0' }}></div>

      {/* Vehicle info below — single row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ font: '500 10px/1 var(--gl-font-ui)', color: 'var(--gl-ink-3)', marginBottom: 3 }}>{t.assigned}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, font: '600 13px/1.1 var(--gl-font-ui)', color: 'var(--gl-ink)' }}>
            {vehicleType !== 'tbd' && <VehicleIcon type={vehicleType}/>}
            {vehicleLabelPrimary}
          </span>
        </div>
        <KoreanPlate text={plate}/>
      </div>
    </div>
  );
}

// ---------- Delivered state ----------
function DeliveredCard({ lang = 'kr' }) {
  const t = STRINGS[lang];
  return (
    <div style={{
      margin: '16px 16px 0', background: '#fff', borderRadius: 20,
      border: '2px dashed var(--gl-purple-200)',
      padding: '32px 20px', textAlign: 'center',
    }}>
      {/* checkmark circle */}
      <div style={{
        width: 56, height: 56, margin: '0 auto 14px',
        borderRadius: 999, background: 'var(--gl-lime-500)',
        display: 'grid', placeItems: 'center',
      }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M 6 14 L 12 20 L 22 8" stroke="var(--gl-purple-800)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div style={{ font: '800 22px/1.1 var(--gl-font-display)', color: 'var(--gl-ink)', letterSpacing: '-.015em' }}>{t.complete}</div>
      <div style={{ font: '400 13px/1.4 var(--gl-font-ui)', color: 'var(--gl-ink-2)', marginTop: 10 }}>
        {t.completeSub}
      </div>
    </div>
  );
}

// ---------- Matching state (no driver yet) ----------
// Mirrors DeliveredCard styling — dashed purple border, centered icon + copy —
// but with a chartreuse pulsing dot instead of a checkmark.
function MatchingCard() {
  return (
    <div style={{
      margin: '16px 16px 0', background: '#fff', borderRadius: 20,
      border: '2px dashed var(--gl-purple-200)',
      padding: '32px 20px', textAlign: 'center',
    }}>
      <div style={{
        width: 56, height: 56, margin: '0 auto 14px',
        borderRadius: 999, background: 'var(--gl-lime-100)',
        display: 'grid', placeItems: 'center', position: 'relative',
      }}>
        <span style={{
          width: 18, height: 18, borderRadius: 999,
          background: 'var(--gl-lime-500)',
        }}></span>
        <span style={{
          position: 'absolute', inset: 14, borderRadius: 999,
          background: 'var(--gl-lime-500)', opacity: .35,
          animation: 'matchPulse 1.8s ease-out infinite',
        }}></span>
      </div>
      <div style={{ font: '800 22px/1.1 var(--gl-font-display)', color: 'var(--gl-ink)', letterSpacing: '-.015em' }}>
        Pickup is being arranged
      </div>
      <style>{'@keyframes matchPulse{0%{transform:scale(.6);opacity:.45}100%{transform:scale(1.6);opacity:0}}'}</style>
    </div>
  );
}

// ---------- Safari bottom bar ----------
function SafariBar() {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 54, background: 'rgba(249,248,252,.96)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid var(--gl-line)',
      display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px',
    }}>
      <span style={{ font: '400 18px/1 var(--gl-font-ui)', color: 'var(--gl-ink-3)' }}>‹</span>
      <span style={{ font: '400 18px/1 var(--gl-font-ui)', color: 'var(--gl-ink-3)', opacity: .4 }}>›</span>
      <div style={{
        flex: 1, height: 36, borderRadius: 10, background: '#fff',
        border: '1px solid var(--gl-line)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        font: '500 13px/1 var(--gl-font-ui)', color: 'var(--gl-ink-2)',
      }}>
        <span style={{ fontSize: 11, color: 'var(--gl-ink-3)' }}>🔒</span>
        goodlugg.com
        <span style={{ fontSize: 11, color: 'var(--gl-ink-3)', marginLeft: 4 }}>↻</span>
      </div>
      <span style={{ font: '400 18px/1 var(--gl-font-ui)', color: 'var(--gl-ink-3)' }}>⇧</span>
      <span style={{ font: '400 18px/1 var(--gl-font-ui)', color: 'var(--gl-ink-3)' }}>⊞</span>
    </div>
  );
}

// ---------- Arriving Soon banner (Uber-style) ----------
function ArrivingSoonBanner({ lang = 'kr' }) {
  const labelKr = '곧 도착';
  const labelEn = 'Arriving Soon';
  return (
    <div style={{
      position: 'absolute', top: 14, left: 16, right: 16, zIndex: 5,
      background: 'var(--gl-ink)', borderRadius: 12,
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px', color: '#fff',
      boxShadow: 'var(--gl-shadow-md)',
    }}>
      {/* pulsing green dot to signal liveness */}
      <span style={{
        position: 'relative', width: 10, height: 10, flexShrink: 0,
      }}>
        <span style={{
          position: 'absolute', inset: 0, borderRadius: 999,
          background: 'var(--gl-lime-500)',
        }}></span>
        <span style={{
          position: 'absolute', inset: -4, borderRadius: 999,
          background: 'var(--gl-lime-500)', opacity: .35,
          animation: 'glPulse 1.6s ease-out infinite',
        }}></span>
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ font: '800 15px/1.1 var(--gl-font-display)', letterSpacing: '-.01em' }}>
          {lang === 'en' ? labelEn : labelKr}
        </div>
      </div>
      <style>{'@keyframes glPulse{0%{transform:scale(1);opacity:.5}100%{transform:scale(1.9);opacity:0}}'}</style>
    </div>
  );
}

// ---------- Main screen ----------
function TrackingScreen({ variant = 'enroute', showLadder = false, lang = 'kr' }) {
  // Animate car along path for moving variants
  const movingVariants = ['enroute', 'arriving', 'near', 'matching', 'delaySlight', 'delayBig'];
  const [progress, setProgress] = useState(() => {
    if (variant === 'enroute') return 0.18;
    if (variant === 'arriving') return 0.78;
    if (variant === 'near') return 0.93;
    if (variant === 'matching') return 0.0; // car not moving yet
    if (variant === 'delaySlight') return 0.35;
    if (variant === 'delayBig') return 0.20;
    return 1;
  });

  useEffect(() => {
    if (variant === 'delivered' || variant === 'matching') return;
    let raf;
    const start = performance.now();
    const from = progress;
    // Loop a gentle drift so the frame doesn't feel frozen
    const drift = variant === 'enroute' ? 0.1 : variant === 'arriving' ? 0.06 : 0.03;
    const period = 6500;
    const tick = (t) => {
      const phase = ((t - start) % period) / period; // 0..1
      const eased = 0.5 - 0.5 * Math.cos(phase * Math.PI * 2); // 0..1..0
      setProgress(Math.min(1, from + eased * drift));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [variant]);

  // ETA label on car bubble — localized (minutes)
  const etaMap = lang === 'en'
    ? { enroute: '30 MIN', arriving: '5 MIN', near: '2 MIN', delaySlight: 'Soon', delayBig: '37 MIN' }
    : { enroute: '30분', arriving: '5분', near: '2분', delaySlight: '곧 도착', delayBig: '37분' };
  const carEta = (variant === 'delivered' || variant === 'matching') ? null
    : variant === 'near' ? (lang === 'en' ? 'Soon' : '곧 도착')
    : etaMap[variant];

  // Top line removed — single "Soon" word on the bubble for the near variant
  const etaTopLine = null;

  // Status banner above the map (matching / delays)
  const banner = (() => {
    if (variant === 'matching') {
      return null;
    }
    if (variant === 'delaySlight') {
      return { tone: 'warn', title: 'Arrival is slightly delayed', sub: 'New ETA 10:10 am' };
    }
    if (variant === 'delayBig') {
      return { tone: 'alert', title: 'Arrival is delayed', sub: 'New ETA 10:35 am' };
    }
    return null;
  })();

  // Info card ETA props
  const infoProps = {
    enroute:     { eta: 30, plate: '11가 4864', vehicleType: 'sedan' },
    arriving:    { eta: 5,  plate: '11가 4864', vehicleType: 'sedan' },
    near:        { eta: 'soon', plate: '경남 91자 3810', vehicleType: 'truck', minsApprox: 2 },
    matching:    { eta: 'matching', plate: 'TBD', vehicleType: 'tbd' },
    delaySlight: { eta: 'soon', plate: '11가 4864', vehicleType: 'sedan', delayedTo: '10:10 am' },
    delayBig:    { eta: 37, plate: '11가 4864', vehicleType: 'sedan', delayedTo: '10:35 am' },
  }[variant];

  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--gl-bg)', position: 'relative' }}>
        <TopBar lang={lang}/>
        {(variant === 'delivered' || variant === 'matching') ? <RouteHeader lang={lang}/> : <RouteHeader compact lang={lang}/>}

        {/* Status banner (matching / delay states) */}
        {banner ? <StatusBanner {...banner}/> : null}

        {/* Map OR alt body (matching / delivered) */}
        {variant === 'delivered' ? (
          <div style={{ flex: 1, padding: '0 0 60px', overflow: 'hidden' }}>
            <DeliveredCard lang={lang}/>
          </div>
        ) : variant === 'matching' ? (
          <div style={{ flex: 1, padding: '0 0 60px', overflow: 'hidden' }}>
            <MatchingCard/>
          </div>
        ) : (
          <>
            <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
              <MapBackdrop height="100%">
                <AnimatedRoute progress={progress} etaLabel={carEta} etaTopLine={etaTopLine} lang={lang}/>
              </MapBackdrop>
            </div>
            {/* Bottom sheet — docked, not overlapping */}
            <div style={{ flexShrink: 0, paddingBottom: 54 }}>
              <InfoCard {...infoProps} lang={lang}/>
            </div>
          </>
        )}

        <SafariBar/>
      </div>
    </PhoneFrame>
  );
}

window.TrackingScreen = TrackingScreen;
window.PhoneFrame = PhoneFrame;
