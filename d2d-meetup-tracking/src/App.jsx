/* global React, ReactDOM, TrackingScreen, DesignCanvas, DCSection, DCArtboard */

const { createRoot } = ReactDOM;

function CanvasApp() {
  return (
    <DesignCanvas title="D2D Meetup Tracking — Recreation" subtitle="Per edit recommendations · 2026-04-30">
      <DCSection id="slide0" title="① Matching — Preparing your luggage pickup (no driver yet)">
        <DCArtboard id="s0-en" label="Slide · Matching driver" width={420} height={820}>
          <div style={{ padding: 15 }}>
            <TrackingScreen variant="matching" lang="en"/>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="slide1" title="② Meetup Spot — pin + suitcase icon · car moves along route · ETA above car">
        <DCArtboard id="s1-en" label="Slide · ~30 min" width={420} height={820}>
          <div style={{ padding: 15 }}>
            <TrackingScreen variant="enroute" lang="en"/>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="slide2" title="③ Vehicle info — ETA on top · Korean plate · Sedan / Truck">
        <DCArtboard id="s2-en" label="Slide · 5 min" width={420} height={820}>
          <div style={{ padding: 15 }}>
            <TrackingScreen variant="arriving" lang="en"/>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="slide3" title="④ Arriving Soon — two-line bubble below the car (Uber pattern)">
        <DCArtboard id="s3-en" label="Slide · Arriving Soon" width={420} height={820}>
          <div style={{ padding: 15 }}>
            <TrackingScreen variant="near" lang="en"/>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="slide-delay-1" title="⑤ Slight delay — New ETA 10:10 am">
        <DCArtboard id="sd1-en" label="Slide · Slightly delayed" width={420} height={820}>
          <div style={{ padding: 15 }}>
            <TrackingScreen variant="delaySlight" lang="en"/>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="slide-delay-2" title="⑥ Significant delay — New ETA 10:35 am">
        <DCArtboard id="sd2-en" label="Slide · Delayed" width={420} height={820}>
          <div style={{ padding: 15 }}>
            <TrackingScreen variant="delayBig" lang="en"/>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="slide4" title="⑦ Meetup completed — bag handed over">
        <DCArtboard id="s4-en" label="Slide · Meetup completed" width={420} height={820}>
          <div style={{ padding: 15 }}>
            <TrackingScreen variant="delivered" lang="en"/>
          </div>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

createRoot(document.getElementById('root')).render(<CanvasApp/>);
