import { Link } from 'react-router-dom';
import './Home.scss';

export function Home() {
  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__title">ArtInMotion<span>.Live</span></h1>
        <p className="home__subtitle">
          Volumetric 3D live-streaming for movement arts.<br />
          Capoeira, martial arts, dance — captured in real time.
        </p>
        <div className="home__actions">
          <Link to="/studio" className="btn btn--primary btn--lg">Go to Studio</Link>
          <Link to="/viewer" className="btn btn--outline btn--lg">Watch Live</Link>
        </div>
      </section>

      <section className="home__features">
        {[
          { icon: '🎥', title: 'WebRTC Capture', desc: 'Ultra-low latency camera capture via WebRTC.' },
          { icon: '🤸', title: 'Pose Tracking', desc: 'Real-time skeleton detection with MediaPipe.' },
          { icon: '🌐', title: '3D Rendering', desc: 'Immersive volumetric view powered by Babylon.js.' },
          { icon: '⚡', title: 'Live Streaming', desc: 'Real-time pose data via SignalR.' },
        ].map(f => (
          <div key={f.title} className="home__feature">
            <span className="home__feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
