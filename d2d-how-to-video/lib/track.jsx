// track.jsx — animated Goodlugg tracking screen (recreated from real screens)
// Exposes: TrackingScreen. Drives step-completion + scroll from the timeline clock.

function TrkPhoto({ src, when }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <div style={{ width: 78, height: 78, borderRadius: 12, overflow: 'hidden', background: '#efeaf4', border: '1px solid var(--gl-line)' }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <span style={{ font: '500 11px/1.25 var(--gl-font-ui)', color: 'var(--gl-purple-400)', textAlign: 'center' }}>{when}</span>
    </div>
  );
}

// One timeline step. `nodeScale` & `bodyOpacity` are time-driven for the pop.
function TrkStep({ num, title, body, done, last, nodeScale = 1, children }) {
  return (
    <div style={{ display: 'flex', gap: 16, opacity: done ? 1 : 0.4 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ width: 46, height: 46, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: `scale(${nodeScale})`, willChange: 'transform',
          background: done ? 'var(--gl-purple-600)' : 'var(--gl-purple-100)',
          color: done ? '#fff' : 'var(--gl-purple-400)', font: '800 17px/1 var(--gl-font-ui)' }}>
          {done ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          ) : num}
        </div>
        {!last && <div style={{ flex: 1, width: 2, minHeight: 30, background: done ? 'var(--gl-purple-600)' : 'var(--gl-purple-100)', marginTop: 4 }} />}
      </div>
      <div style={{ paddingBottom: 26, flex: 1 }}>
        <div style={{ font: '700 20px/1.2 var(--gl-font-display)', letterSpacing: '-.01em', color: 'var(--gl-purple-700)' }}>{title}</div>
        <div style={{ font: '500 15px/1.4 var(--gl-font-ui)', color: 'var(--gl-ink-2)', marginTop: 4 }}>{body}</div>
        {done && children}
      </div>
    </div>
  );
}

// Props: startAt (sec when timeline content settles), stepTimes [t1..t4] absolute,
//        scrollKf {times:[], vals:[]}
function TrackingScreen({ startAt = 0, stepTimes = [], scrollKf }) {
  const t = useTime();
  const popScale = (ct) => {
    if (ct == null || t < ct) return 1;
    const e = Easing.easeOutBack(clamp((t - ct) / 0.45, 0, 1));
    return 0.6 + 0.4 * e;
  };
  const isDone = (i) => t >= (stepTimes[i] ?? Infinity);
  const scrollY = scrollKf ? interpolate(scrollKf.times, scrollKf.vals, Easing.easeInOutCubic)(t) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f6f3fb' }}>
      <StatusBar />
      <GlSiteHeader />
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, padding: '20px 20px 24px',
          transform: `translateY(${-scrollY}px)`, willChange: 'transform' }}>
          {/* booking number */}
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ font: '700 13px/1 var(--gl-font-ui)', letterSpacing: '.04em', color: 'var(--gl-purple-300)', textTransform: 'uppercase' }}>Booking Number</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 6 }}>
              <span style={{ font: '800 26px/1 var(--gl-font-mono)', color: 'var(--gl-purple-800)', letterSpacing: '.02em' }}>1899D8OX18</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gl-purple-400)" strokeWidth="2"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
            </div>
          </div>
          {/* from / to */}
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 8, marginBottom: 26 }}>
            {[['From', '2026-06-03', 'Fraser Place, Seoul'], ['To', '2026-06-04', 'Urban Groove Hotel, Busan']].map(([k, d, p], i) => (
              <React.Fragment key={i}>
                <div style={{ flex: 1, background: '#fff', border: '1px solid var(--gl-line)', borderRadius: 14, padding: '12px 10px', textAlign: 'center', boxShadow: 'var(--gl-shadow-xs)' }}>
                  <div style={{ font: '600 12px/1 var(--gl-font-ui)', color: 'var(--gl-purple-300)' }}>{k}</div>
                  <div style={{ font: '800 15px/1.1 var(--gl-font-ui)', color: 'var(--gl-ink)', marginTop: 6 }}>{d}</div>
                  <div style={{ font: '600 12px/1.25 var(--gl-font-ui)', color: 'var(--gl-purple-600)', marginTop: 5 }}>{p}</div>
                </div>
                {i === 0 && <div style={{ display: 'flex', alignItems: 'center', color: 'var(--gl-purple-400)', font: '700 18px/1 var(--gl-font-ui)' }}>→</div>}
              </React.Fragment>
            ))}
          </div>
          {/* timeline */}
          <TrkStep num="1" done={isDone(0)} nodeScale={popScale(stepTimes[0])} title="Booking Confirmation" body="Your booking is confirmed!" />
          <TrkStep num="2" done={isDone(1)} nodeScale={popScale(stepTimes[1])} title="Bag Drop-off" body="Photos uploaded successfully.">
            <div style={{ display: 'flex', gap: 9, marginTop: 12 }}>
              <TrkPhoto src="assets/hero_2bags.jpg" when={'06/03\n19:57'} />
              <TrkPhoto src="assets/hero_2bags.jpg" when={'06/03\n19:57'} />
            </div>
          </TrkStep>
          <TrkStep num="3" done={isDone(2)} nodeScale={popScale(stepTimes[2])} title="Driver Picked up" body="Driver has picked up your luggage. Delivery is on the way!">
            <div style={{ display: 'flex', gap: 9, marginTop: 12 }}>
              <TrkPhoto src="assets/hero_2bags.jpg" when={'06/03\n21:39'} />
            </div>
          </TrkStep>
          <TrkStep num="4" done={isDone(3)} last nodeScale={popScale(stepTimes[3])} title="Bag Arrived" body="Luggage delivered! Collect your bags at Urban Groove Hotel, Busan.">
            <div style={{ font: '700 14px/1 var(--gl-font-ui)', color: 'var(--gl-purple-500)', marginTop: 8 }}>06/04 09:48</div>
            <div style={{ display: 'flex', gap: 9, marginTop: 10 }}>
              <TrkPhoto src="assets/hero_2bags.jpg" when={'06/04\n09:48'} />
            </div>
          </TrkStep>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TrackingScreen, TrkStep, TrkPhoto });
