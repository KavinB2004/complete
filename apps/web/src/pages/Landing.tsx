import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Aurora from "../components/Aurora";
import TiltedCard from "../components/TiltedCard";
import GridScan from "../components/GridScan";
import "./css/Landing.css";

export default function Landing() {
  const navigate = useNavigate();
  const [stepsVisible, setStepsVisible] = useState([false, false, false, false]);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [whyCardIndex, setWhyCardIndex] = useState(0);
  const whySectionRef = useRef<HTMLElement>(null);
  const scrollProgressRef = useRef(0);
  const landingContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers = stepsRef.current.map((step, index) => {
      if (!step) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !stepsVisible[index]) {
              setStepsVisible((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(step);
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (observer && stepsRef.current[index]) {
          observer.unobserve(stepsRef.current[index]!);
        }
      });
    };
  }, [stepsVisible]);

  // Why section scroll-locking effect
  useEffect(() => {
    const landingContainer = landingContainerRef.current;
    if (!landingContainer) return;

    const handleScroll = () => {
      const whySection = whySectionRef.current;
      if (!whySection) return;

      const rect = whySection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check if section is locked in viewport
      if (rect.top <= 0 && rect.bottom >= viewportHeight) {
        // Calculate scroll progress (0 to 1)
        const sectionScrollHeight = rect.height - viewportHeight;
        const scrolledAmount = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolledAmount / sectionScrollHeight));
        scrollProgressRef.current = progress;
        
        // Map progress to card index (0-3) with clear thresholds
        let newIndex = 0;
        if (progress >= 0.75) {
          newIndex = 3;
        } else if (progress >= 0.5) {
          newIndex = 2;
        } else if (progress >= 0.25) {
          newIndex = 1;
        } else {
          newIndex = 0;
        }
        
        console.log('Progress:', progress.toFixed(3), 'Card:', newIndex, 'Top:', rect.top.toFixed(0), 'Bottom:', rect.bottom.toFixed(0));
        setWhyCardIndex(newIndex);
      }
    };

    // Listen to scroll on the landing container, not window
    landingContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => landingContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-container" ref={landingContainerRef}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="aurora-background">
          <Aurora
            colorStops={["#667eea", "#764ba2", "#667eea"]}
            blend={0.6}
            amplitude={1.2}
            speed={0.8}
          />
        </div>
        <div className="hero-background">
          <div className="floating-orb orb-1" />
          <div className="floating-orb orb-2" />
          <div className="floating-orb orb-3" />
          <div className="floating-orb orb-4" />
        </div>

        <nav className="landing-nav">
          <img 
            src="/Complete Logo.png" 
            alt="Complete Logo" 
            className="nav-logo" 
            style={{ height: '50px', width: 'auto' }}
          />
          <div className="nav-buttons">
            <button className="nav-login-btn" onClick={() => navigate("/login")}>
              Log In
            </button>
            <button className="nav-signup-btn" onClick={() => navigate("/register")}>
              Get Started
            </button>
          </div>
        </nav>

        <div className="hero-content">
          <h1 className="hero-title">
            Turn Goals Into <span className="gradient-text">Competitions</span>
          </h1>
          <p className="hero-subtitle">
            You're 3x more likely to achieve your goals when you compete with friends.
            Make progress visible. Make it fun. Make it Complete.
          </p>
          <div className="hero-cta">
            <button className="cta-primary" onClick={() => navigate("/register")}>
              Start Competing Free
            </button>
            <button className="cta-secondary" onClick={() => navigate("/login")}>
              I have an account
            </button>
          </div>
          <p className="hero-caption">Join 1000+ competitive goal-getters</p>
        </div>
      </section>

      {/* Why Complete Section - Scroll-locked */}
      <section className="why-section-scroll" ref={whySectionRef}>
        <div className={`why-sticky-container card-${whyCardIndex}`}>
          <h2 className="section-heading">Why goals fail (and how we fix it)</h2>
          
          {/* Card 0: No Accountability - CENTER */}
          <div className={`why-card-animated card-center ${
            whyCardIndex >= 0 && whyCardIndex < 3 ? 'visible' : ''
          } ${
            whyCardIndex === 0 ? 'active' : ''
          } ${
            whyCardIndex === 3 ? 'exit-up' : ''
          }`}>
            <div className="why-icon">😴</div>
            <h3 className="why-title">No Accountability</h3>
            <p className="why-description">
              Working alone? You're your only motivator. With Complete, your friends see your progress.
              Suddenly, skipping a workout means falling behind.
            </p>
          </div>

          {/* Card 1: Invisible Progress - LEFT */}
          <div className={`why-card-animated card-left ${
            whyCardIndex >= 1 && whyCardIndex < 3 ? 'visible' : ''
          } ${
            whyCardIndex === 1 ? 'active' : ''
          } ${
            whyCardIndex === 3 ? 'exit-left' : ''
          }`}>
            <div className="why-icon">📊</div>
            <h3 className="why-title">Invisible Progress</h3>
            <p className="why-description">
              You can't see how you're doing compared to others. Complete puts everyone on a leaderboard.
              Real-time rankings create urgency and excitement.
            </p>
          </div>

          {/* Card 2: It's Boring - RIGHT */}
          <div className={`why-card-animated card-right ${
            whyCardIndex >= 2 && whyCardIndex < 3 ? 'visible' : ''
          } ${
            whyCardIndex === 2 ? 'active' : ''
          } ${
            whyCardIndex === 3 ? 'exit-right' : ''
          }`}>
            <div className="why-icon">🎮</div>
            <h3 className="why-title">It's Boring</h3>
            <p className="why-description">
              Goals are serious. But they don't have to be dull. Add rewards for winners, punishments for losers.
              Make it a game you actually want to play.
            </p>
          </div>

          {/* Card 3: Built on Honesty - Full Screen */}
          <div className={`why-card-animated honesty-final ${
            whyCardIndex === 3 ? 'active' : 'hidden'
          }`}>
            <div className="why-icon">✨</div>
            <h3 className="why-title">Built on Honesty</h3>
            <p className="why-description">
              Real progress requires real honesty. Our manager approval system keeps everyone accountable,
              but the magic happens when you're honest with yourself. That's how you truly improve.
              Complete won't work unless you commit to being truthful about your journey — and that's what makes it powerful.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-section">
        <h2 className="section-heading">How Complete Works</h2>
        <div className="steps-container">
          <div 
            ref={(el) => { stepsRef.current[0] = el; }}
            className={`step-card ${stepsVisible[0] ? 'visible' : ''}`}
          >
            <div className="step-number">01</div>
            <div className="step-content">
              <h3 className="step-title">Create a Challenge</h3>
              <p className="step-description">
                Set any goal — 50 workouts, 100 LeetCode problems, 10K daily steps, read 20 books.
                Define the timeline, reward, and punishment.
              </p>
            </div>
            <div className="step-visual">🏆</div>
          </div>

          <div 
            ref={(el) => { stepsRef.current[1] = el; }}
            className={`step-card reverse ${stepsVisible[1] ? 'visible' : ''}`}
          >
            <div className="step-number">02</div>
            <div className="step-content">
              <h3 className="step-title">Invite Your Friends</h3>
              <p className="step-description">
                Share a code or link. Your friends join the leaderboard.
                Now everyone can see who's crushing it and who's slacking.
              </p>
            </div>
            <div className="step-visual">👥</div>
          </div>

          <div 
            ref={(el) => { stepsRef.current[2] = el; }}
            className={`step-card ${stepsVisible[2] ? 'visible' : ''}`}
          >
            <div className="step-number">03</div>
            <div className="step-content">
              <h3 className="step-title">Submit & Compete</h3>
              <p className="step-description">
                Completed a task? Submit it to the manager for approval.
                Once approved, your score updates and rankings shift. Watch yourself climb!
              </p>
            </div>
            <div className="step-visual">📈</div>
          </div>

          <div 
            ref={(el) => { stepsRef.current[3] = el; }}
            className={`step-card reverse ${stepsVisible[3] ? 'visible' : ''}`}
          >
            <div className="step-number">04</div>
            <div className="step-content">
              <h3 className="step-title">Win or Face the Music</h3>
              <p className="step-description">
                First place gets the glory (and the reward). Last place? Time to pay up.
                It's all in good fun — but it keeps everyone motivated.
              </p>
            </div>
            <div className="step-visual">🎯</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-heading">Built for Competition</h2>
        <div className="features-grid">
          <TiltedCard
            imageSrc=""
            containerHeight="220px"
            containerWidth="280px"
            imageHeight="220px"
            imageWidth="280px"
            rotateAmplitude={12}
            scaleOnHover={1.15}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={true}
            overlayContent={
              <div className="feature-card-content">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">Real-Time Leaderboards</h3>
                <p className="feature-description">
                  See live rankings update as people submit progress. Know exactly where you stand.
                </p>
              </div>
            }
          />
          <TiltedCard
            imageSrc=""
            containerHeight="220px"
            containerWidth="280px"
            imageHeight="220px"
            imageWidth="280px"
            rotateAmplitude={12}
            scaleOnHover={1.15}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={true}
            overlayContent={
              <div className="feature-card-content">
                <div className="feature-icon">✅</div>
                <h3 className="feature-title">Manager Approval System</h3>
                <p className="feature-description">
                  Keep it fair — only the challenge creator can approve submissions. No cheating.
                </p>
              </div>
            }
          />
          <TiltedCard
            imageSrc=""
            containerHeight="220px"
            containerWidth="280px"
            imageHeight="220px"
            imageWidth="280px"
            rotateAmplitude={12}
            scaleOnHover={1.15}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={true}
            overlayContent={
              <div className="feature-card-content">
                <div className="feature-icon">🎁</div>
                <h3 className="feature-title">Custom Rewards & Stakes</h3>
                <p className="feature-description">
                  Set prizes for winners and funny punishments for losers. Make it personal.
                </p>
              </div>
            }
          />
          <TiltedCard
            imageSrc=""
            containerHeight="220px"
            containerWidth="280px"
            imageHeight="220px"
            imageWidth="280px"
            rotateAmplitude={12}
            scaleOnHover={1.15}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={true}
            overlayContent={
              <div className="feature-card-content">
                <div className="feature-icon">📱</div>
                <h3 className="feature-title">Any Goal, Any Timeline</h3>
                <p className="feature-description">
                  Fitness, coding, reading, habits — if you can track it, you can compete on it.
                </p>
              </div>
            }
          />
          <TiltedCard
            imageSrc=""
            containerHeight="220px"
            containerWidth="280px"
            imageHeight="220px"
            imageWidth="280px"
            rotateAmplitude={12}
            scaleOnHover={1.15}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={true}
            overlayContent={
              <div className="feature-card-content">
                <div className="feature-icon">💬</div>
                <h3 className="feature-title">Trash Talk Mode</h3>
                <p className="feature-description">
                  Message your rivals. Talk smack. Keep the banter flowing. Competition is fun.
                </p>
              </div>
            }
          />
          <TiltedCard
            imageSrc=""
            containerHeight="220px"
            containerWidth="280px"
            imageHeight="220px"
            imageWidth="280px"
            rotateAmplitude={12}
            scaleOnHover={1.15}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={true}
            overlayContent={
              <div className="feature-card-content">
                <div className="feature-icon">📊</div>
                <h3 className="feature-title">Progress History</h3>
                <p className="feature-description">
                  Track your journey. See past challenges, your wins, and how you've improved.
                </p>
              </div>
            }
          />
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="proof-section">
        <h2 className="section-heading">People Actually Complete Their Goals</h2>
        <div className="testimonials">
          <div className="testimonial-card">
            <div className="testimonial-content">
              "I've tried solo workout plans a million times. They always fail. But when my friends could
              see my progress? I didn't want to be last. Finished 50 workouts in 30 days for the first time ever."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">A</div>
              <div className="author-info">
                <div className="author-name">Alex M.</div>
                <div className="author-title">Completed 3 challenges</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              "LeetCode grind was lonely and boring. Complete turned it into a competition with my college friends.
              We set a $50 prize and it pushed me way harder than I'd ever push myself."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">S</div>
              <div className="author-info">
                <div className="author-name">Sarah K.</div>
                <div className="author-title">1st place in 2 challenges</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              "The trash talk feature is hilarious. My buddy was ahead of me by 2 workouts and kept sending me
              messages. That motivated me more than any fitness app ever did. I ended up winning."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">M</div>
              <div className="author-info">
                <div className="author-name">Mike R.</div>
                <div className="author-title">Won his first challenge</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="grid-scan-background">
          <GridScan
            sensitivity={0.55}
            lineThickness={1}
            linesColor="#392e4e"
            gridScale={0.1}
            scanColor="#a78bfa"
            scanOpacity={0.6}
            enablePost
            bloomIntensity={0.8}
            chromaticAberration={0.002}
            noiseIntensity={0.01}
          />
        </div>
        <div className="final-cta-content">
          <h2 className="final-cta-title">Ready to Actually Complete Your Goals?</h2>
          <p className="final-cta-subtitle">
            Join thousands of people who stopped working alone and started competing together.
          </p>
          <button className="final-cta-btn" onClick={() => navigate("/register")}>
            Get Started Free
          </button>
          <p className="final-cta-note">Takes 30 seconds to sign up</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img 
              src="/Complete Logo.png" 
              alt="Complete Logo" 
              className="footer-logo" 
              style={{ height: '40px', width: 'auto' }}
            />
            <p className="footer-tagline">Compete with friends. Reach your goals.</p>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">About</a>
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Complete. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
