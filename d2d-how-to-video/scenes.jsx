// scenes.jsx — D2D how-to video composition v2 (1600×900 canvas)
// Consumes globals from animations.jsx, chrome.jsx, phone.jsx, track.jsx.

const LX = 84, LW = 940;            // left text column
const PHONE_X = 1110, PHONE_Y = 46; // phone placement (nudged down, centered above the bar)
const PURPLE = '#512B74';           // official brand purple

// ── Phone content swap (crossfade between app screens by absolute time) ──────
function PhoneSwap({ frames }) {
  const t = useTime();
  return frames.map((f, i) => {
    const next = frames[i + 1] ? frames[i + 1].at : Infinity;
    const fade = 0.45;
    let op = clamp((t - f.at) / fade, 0, 1);
    if (t >= next) op = Math.min(op, clamp(1 - (t - next) / fade, 0, 1));
    if (op <= 0.001) return null;
    return <div key={i} style={{ position: 'absolute', inset: 0, opacity: op, willChange: 'opacity' }}>{f.el}</div>;
  });
}

// small label used above caption beats
function BeatLabel({ children }) {
  return <div style={{ font: '700 22px/1.3 var(--gl-font-ui)', color: 'var(--gl-purple-500)', marginBottom: 10 }}>{children}</div>;
}
function BeatText({ children }) {
  return <div style={{ font: '500 38px/1.4 var(--gl-font-ui)', color: 'var(--gl-ink)', textWrap: 'pretty' }}>{children}</div>;
}

// two-row split deadline rule (Hotel vs Airbnb meet-up)
function DeadlineRule() {
  const Row = ({ tag, children }) => (
    <div style={{ font: '500 26px/1.6 var(--gl-font-ui)', color: 'var(--gl-ink-2)' }}>
      <HL>{tag}</HL> — {children}
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20,
      borderLeft: '3px solid var(--gl-lime-500)', paddingLeft: 16 }}>
      <Row tag="Hotel">book by your <b style={{ color: 'var(--gl-ink)' }}>drop-off time</b> on the service day.</Row>
      <Row tag="Airbnb meet-up">book <b style={{ color: 'var(--gl-ink)' }}>before midnight</b> the day before.</Row>
    </div>
  );
}

// ════════════════════════════ INTRO (Tiger) · 0–9 ═══════════════════════════
function IntroScene({ style = 'tiger' }) {
  const t = useTime();
  const discRot = t * 12; // slow chartreuse disc rotation
  return (
    <SceneBG start={0} end={6} color={PURPLE}>
      <div style={{ position: 'absolute', top: -160, right: -120, width: 460, height: 460, borderRadius: 999, background: 'radial-gradient(circle, rgba(199,194,46,.22), transparent 70%)' }} />

      <Reveal at={0.3} out={5.3} x={LX} y={62}><WordmarkPng white height={42} /></Reveal>
      <Reveal at={0.7} out={5.3} x={LX} y={134}>
        <span style={{ font: '800 17px/1 var(--gl-font-ui)', letterSpacing: '.18em', color: 'var(--gl-lime-500)' }}>HOW TO · GOODLUGG GUIDE</span>
      </Reveal>

      {style === 'banner' && (
        <>
          <Reveal at={1.1} out={5.3} x={LX} y={178} width={760}>
            <h1 style={{ font: '800 78px/1.0 var(--gl-font-display)', letterSpacing: '-.03em', color: '#fff', margin: 0 }}>
              Door2Door<br />Delivery <span style={{ color: 'var(--gl-lime-500)' }}>across Korea</span>
            </h1>
            <div style={{ marginTop: 18 }}><BetaPill /></div>
          </Reveal>
          <Reveal at={2.2} out={5.3} x={LX} y={470} width={720}>
            <p style={{ font: '500 30px/1.45 var(--gl-font-ui)', color: 'rgba(255,255,255,.92)', margin: 0, textWrap: 'pretty' }}>
              Goodlugg picks up your luggage from <HL>any accommodation</HL> in Korea and delivers it to your next hotel or airport — same day. <HL>Yes, even from your Airbnb.</HL>
            </p>
          </Reveal>
          <Reveal at={1.0} out={5.3} x={1006} y={150} width={510}>
            <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,.4)' }}>
              <img src="assets/d2d_banner.png" alt="Door2Door across Korea" style={{ width: '100%', display: 'block' }} />
            </div>
          </Reveal>
        </>
      )}

      {style === 'tiger' && (
        <>
          <Reveal at={1.1} out={5.3} x={LX} y={206} width={860}>
            <h1 style={{ font: '800 78px/1.0 var(--gl-font-display)', letterSpacing: '-.03em', color: '#fff', margin: 0 }}>
              Door2Door<br />Delivery <span style={{ color: 'var(--gl-lime-500)' }}>across Korea</span>
            </h1>
            <div style={{ marginTop: 20 }}>
              <span style={{ font: '700 26px/1.3 var(--gl-font-ui)', color: 'rgba(255,255,255,.95)' }}>
                <span style={{ color: 'var(--gl-lime-500)', fontWeight: 800 }}>Yes,</span> even from your Airbnb
              </span>
            </div>
          </Reveal>
          <Reveal at={2.4} out={5.3} x={LX} y={540} width={680}>
            <p style={{ font: '500 27px/1.5 var(--gl-font-ui)', color: 'rgba(255,255,255,.92)', margin: 0, textWrap: 'pretty' }}>
              Goodlugg picks up your luggage from <span style={{ whiteSpace: 'nowrap' }}><HL>any accommodation in Korea</HL></span> and delivers it to your next hotel or airport — <HL>same day or scheduled</HL>.
            </p>
          </Reveal>
          <div style={{ position: 'absolute', right: 168, top: 158, width: 548, height: 548, borderRadius: 999,
            background: 'var(--gl-lime-500)', transform: `rotate(${discRot}deg)`, willChange: 'transform' }} />
          <Reveal at={2.0} out={5.3} right={96} y={170} dx={120} inDur={1.1}>
            <Tiger width={524} />
          </Reveal>
        </>
      )}

      {style === 'minimal' && (
        <Reveal at={1.1} out={5.3} x={LX} y={300} width={1400}>
          <h1 style={{ font: '800 132px/0.96 var(--gl-font-display)', letterSpacing: '-.04em', color: '#fff', margin: 0 }}>
            Door2Door<br /><span style={{ color: 'var(--gl-lime-500)' }}>across Korea</span>
          </h1>
          <p style={{ font: '500 32px/1.4 var(--gl-font-ui)', color: 'rgba(255,255,255,.9)', marginTop: 28, maxWidth: 900 }}>
            Pick-up from <HL>any accommodation</HL> — delivered to your next hotel or airport, same day.
          </p>
        </Reveal>
      )}

      {style !== 'tiger' && (
        <Reveal at={2.8} out={5.3} right={150} y={476} dx={150} inDur={1.2}>
          <Tiger width={272} />
        </Reveal>
      )}
    </SceneBG>
  );
}

// ════════════════════════ PERSISTENT PHONE (6–77) ═══════════════════════════
function PhoneRig() {
  return (
    <Reveal at={6} out={77} x={PHONE_X} y={PHONE_Y} dy={28} inDur={0.7}>
      <Phone>
        <PhoneSwap frames={[
          { at: 6,    el: <ScrPriceCalc /> },
          { at: 10,   el: <ScrPriceBook /> },
          { at: 13.5, el: <ScrSchedule /> },     /* pick pickup time slot (Airbnb meet-up) */
          { at: 16.5, el: <ScrScheduled /> },    /* same-day or a later scheduled date */
          { at: 19.5, el: <ScrContactInfo /> },  /* customer info + country-code picker */
          { at: 24,   el: <ScrPaySummary /> },
          { at: 27,   el: <ScrPayMethod /> },
          { at: 29,   el: <ScrConfirm /> },
          { at: 31.5, el: <ScrEmailTrack /> },   /* confirmation email w/ tracking link */
          { at: 34,   el: <ScrHotelCard /> },
          { at: 39,   el: <ScrUpload /> },
          { at: 44.5, el: <ScrDriverEta /> },
          { at: 49,   el: <ScrMeetupDone /> },
          { at: 54,   el: <TrackingScreen
              stepTimes={[54, 54, 60, 69]}
              scrollKf={{ times: [54, 58, 68, 73, 77], vals: [0, 0, 140, 196, 196] }} /> },
        ]} />
      </Phone>
    </Reveal>
  );
}

// shared left-column header for step sections
function StepHead({ at, out, num, label, title }) {
  return (
    <>
      <Reveal at={at} out={out} x={LX} y={70}><Kicker num={num} label={label} /></Reveal>
      <Reveal at={at + 0.25} out={out} x={LX} y={128} width={LW}>
        <CaptionTitle>{title}</CaptionTitle>
      </Reveal>
    </>
  );
}

// ════════════════════════════ BOOK · 6–34 ═══════════════════════════════════
function BookScene() {
  const by = 250;
  return (
    <>
      <StepHead at={6.1} out={33.8} num="01" label="Book" title="Book your delivery" />
      {/* beat 1 — price + deadline */}
      <Reveal at={6.4} out={12.8} x={LX} y={by} width={900}>
        <BeatLabel>Booking deadline</BeatLabel>
        <DeadlineRule />
        <BeatText>Check your route and price first with the <HL>Price Calculator</HL>, then tap <PK>Book with these options</PK>.</BeatText>
      </Reveal>
      {/* beat 2 — schedule: same-day vs scheduled + meet-up time (Airbnb only) */}
      <Reveal at={13.2} out={18.8} x={LX} y={by} width={900}>
        <BeatLabel>Same-day or scheduled — your choice.</BeatLabel>
        <BeatText>Get your bags the <HL>same day</HL>, or <HL>schedule</HL> pickup for a later date in your trip.</BeatText>
        <div style={{ font: '500 22px/1.5 var(--gl-font-ui)', color: 'var(--gl-ink-3)', marginTop: 16 }}>
          Airbnb meet-up: pick a meet-up time slot. Hotel: no slot needed — just leave your bags at the front desk by 10 AM. A small storage fee applies for extra days.
        </div>
      </Reveal>
      {/* beat 3 — contact info + Korean-phone FAQ */}
      <Reveal at={19.2} out={23.6} x={LX} y={by} width={900}>
        <BeatLabel>Add your contact info.</BeatLabel>
        <BeatText>Enter your name, email, and phone — <HL>any country's number works</HL>.</BeatText>
      </Reveal>
      <Reveal at={20.4} out={23.6} x={LX} y={470} width={700}>
        <FaqCard width={700} q="Need a Korean phone number?" a="No — we accept international phone numbers too." />
      </Reveal>
      {/* beat 4 — pay */}
      <Reveal at={24} out={28.6} x={LX} y={by} width={900}>
        <BeatLabel>Paying from abroad? No problem.</BeatLabel>
        <BeatText>Pay with your <HL>home-country credit card or PayPal</HL>.</BeatText>
      </Reveal>
      {/* beat 5 — confirm + email with tracking link */}
      <Reveal at={29} out={33.8} x={LX} y={by} width={900}>
        <BeatLabel>That's it.</BeatLabel>
        <BeatText>Your booking is <HL>confirmed</HL> — you'll get a confirmation email with your <HL>tracking link</HL>.</BeatText>
      </Reveal>
    </>
  );
}

// small framed "example: hotel tag" reference image
function TagExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ background: '#fff', borderRadius: 14, padding: 8, boxShadow: '0 14px 34px rgba(81,42,114,.16)',
        border: '1px solid var(--gl-line)', transform: 'rotate(-3deg)' }}>
        <img src="assets/hotel_tag_example.jpg" alt="Example hotel luggage tag"
          style={{ width: 150, borderRadius: 8, display: 'block' }} />
      </div>
      <span style={{ font: '700 16px/1 var(--gl-font-ui)', color: 'var(--gl-purple-500)' }}>Example: hotel tag</span>
    </div>
  );
}

// ════════════════════════════ DROP-OFF · 34–54 ══════════════════════════════
function DropScene() {
  const by = 240;
  return (
    <>
      <StepHead at={34.1} out={53.8} num="02" label="Drop-off" title="Drop off your bags" />
      {/* hotel */}
      <Reveal at={34.5} out={43.9} x={LX} y={by} width={880}>
        <BeatLabel>Staying at a hotel?</BeatLabel>
        <BeatText>Show your <HL>message card</HL> at the front desk upon check-out, then <HL>upload photos of your luggage and hotel tags</HL> to tracking.</BeatText>
      </Reveal>
      {/* hotel-tag FAQ + a real example tag */}
      <Reveal at={37.5} out={43.9} x={LX} y={470} width={900}>
        <div style={{ display: 'flex', gap: 22, alignItems: 'flex-start' }}>
          <FaqCard width={540} q="What's a hotel tag?" a="A tag the hotel gives you when you leave your bags. No tag? Just upload a clear photo instead." />
          <TagExample />
        </div>
      </Reveal>
      {/* moved here from Collect: pickup timing is a drop-off concern */}
      <Reveal at={39.5} out={43.9} x={LX} y={688} width={560}>
        <FaqCard width={560} q="When are bags collected?" a="The driver picks up from hotels between 10:00 AM and 12:00 PM." />
      </Reveal>
      {/* airbnb */}
      <Reveal at={44.4} out={53.8} x={LX} y={by} width={900}>
        <BeatLabel><HL>Staying at an Airbnb</HL>? Two easy ways:</BeatLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 8 }}>
          <Bullet n="1"><HL>Leave your bags at the Airbnb</HL> and upload a photo.</Bullet>
          <Bullet n="2">Or <HL>meet the driver</HL> — wait from 10 min before your time and upload luggage photos while you wait. See their ETA &amp; plate number from 30 min before.</Bullet>
        </div>
      </Reveal>
    </>
  );
}

// ════════════════════════════ TRACK · 50–66 ═════════════════════════════════
function TrackScene() {
  return (
    <>
      <StepHead at={54.1} out={66.8} num="03" label="Track" title="Track by step, not by second." />
      <Reveal at={54.6} out={66.8} x={LX} y={300} width={860}>
        <BeatText>Every update lands <HL>in your inbox</HL> — at pickup and at delivery — with <HL>photos right in the timeline</HL>. No refreshing required.</BeatText>
      </Reveal>
      {/* email toasts that pop as the timeline advances */}
      <Reveal at={59} out={66.8} x={LX} y={470} dx={-30}>
        <EmailToast title="Driver picked up your luggage" sub="Delivery is on the way" />
      </Reveal>
      <Reveal at={63.5} out={66.8} x={LX} y={560} dx={-30}>
        <EmailToast title="Your luggage has arrived" sub="With pickup & delivery photos" />
      </Reveal>
    </>
  );
}

// ════════════════════════════ COLLECT · 67–77 ═══════════════════════════════
function CollectScene() {
  return (
    <>
      <StepHead at={67.1} out={76.8} num="04" label="Collect" title="Collect your bags" />
      <Reveal at={67.6} out={76.8} x={LX} y={300} width={860}>
        <BeatText>Your bags arrive at the hotel lobby <HL>by 10 PM</HL> the <HL>same day</HL> — or on the date you <HL>scheduled</HL>. Enjoy bagless travel: just pick them up at your destination.</BeatText>
      </Reveal>
    </>
  );
}

// ════════════════════════════ CONTACT · 78–84 ═══════════════════════════════
function ContactScene() {
  const QR = ({ src, label }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 196, height: 196, borderRadius: 22, overflow: 'hidden', background: '#fff', padding: 12 }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <span style={{ font: '700 26px/1 var(--gl-font-ui)', color: '#fff' }}>{label}</span>
    </div>
  );
  return (
    <SceneBG start={77} end={81} color={PURPLE}>
      <div style={{ position: 'absolute', top: -160, right: -120, width: 460, height: 460, borderRadius: 999, background: 'radial-gradient(circle, rgba(199,194,46,.20), transparent 70%)' }} />
      <Reveal at={77.2} x={LX} y={132} inDur={0.4}>
        <span style={{ font: '800 18px/1 var(--gl-font-ui)', letterSpacing: '.18em', color: 'var(--gl-lime-500)' }}>NEED HELP?</span>
        <h1 style={{ font: '800 84px/1.02 var(--gl-font-display)', letterSpacing: '-.03em', color: '#fff', margin: '14px 0 0' }}>We're one<br />message away</h1>
        <p style={{ font: '500 30px/1.4 var(--gl-font-ui)', color: 'rgba(255,255,255,.9)', marginTop: 26, maxWidth: 620 }}>
          For any questions, reach us anytime on <HL>WhatsApp</HL> or <HL>KakaoTalk</HL>.
        </p>
      </Reveal>
      <Reveal at={77.7} right={150} y={250} dx={40} inDur={0.4}>
        <div style={{ display: 'flex', gap: 46 }}>
          <QR src="assets/qr_whatsapp.jpeg" label="WhatsApp" />
          <QR src="assets/qr_kakao.jpeg" label="KakaoTalk" />
        </div>
      </Reveal>
    </SceneBG>
  );
}

// ════════════════════════════ ENDING · 84–90 ════════════════════════════════
function EndingScene() {
  const t = useTime();
  const discRot = t * 10;
  return (
    <SceneBG start={81} end={86} color={PURPLE}>
      <div style={{ position: 'absolute', left: '50%', top: 150, width: 360, height: 360, borderRadius: 999,
        transform: `translateX(-50%) rotate(${discRot}deg)`, background: 'radial-gradient(circle, rgba(199,194,46,.18), transparent 70%)' }} />
      <Reveal at={81.3} x={0} y={150} style={{ width: '100%', textAlign: 'center' }} inDur={0.5}>
        <div style={{ display: 'flex', justifyContent: 'center' }}><Tiger width={300} /></div>
      </Reveal>
      <Reveal at={81.7} x={0} y={486} style={{ width: '100%', textAlign: 'center' }} inDur={0.45}>
        <h1 style={{ font: '800 60px/1.12 var(--gl-font-display)', letterSpacing: '-.03em', color: '#fff', margin: 0 }}>
          Your <span style={{ color: 'var(--gl-lime-500)' }}>bagless travel</span> in Korea<br />starts here!
        </h1>
      </Reveal>
      <Reveal at={82.4} x={0} y={678} style={{ width: '100%', textAlign: 'center' }} inDur={0.45}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <WordmarkPng white height={48} />
          <div style={{ font: '800 44px/1 var(--gl-font-display)', letterSpacing: '-.02em', color: 'var(--gl-lime-500)' }}>Have a Goodlugg on every trip!</div>
        </div>
      </Reveal>
    </SceneBG>
  );
}

// ════════════════════════════ ROOT ══════════════════════════════════════════
function Scenes({ tw = {} }) {
  return (
    <>
      <PhoneRig />
      <BookScene />
      <DropScene />
      <TrackScene />
      <CollectScene />
      <IntroScene style={tw.introStyle || 'tiger'} />
      <ContactScene />
      <EndingScene />
      <ProgressBar />
    </>
  );
}

Object.assign(window, { Scenes, PhoneSwap, IntroScene, ContactScene, EndingScene });
