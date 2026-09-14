import React, { useState, useEffect } from 'react';
import { Terminal, Layout, Activity, Code2, Cpu, Sparkles, Layers, Zap, Play, RotateCcw } from 'lucide-react';
import './WebDevGraphics.css';

export default function WebDevGraphics() {
  const [activeTab, setActiveTab] = useState('code');
  const [typedCode, setTypedCode] = useState('');
  const [counter, setCounter] = useState(1);
  const [copiedCode, setCopiedCode] = useState(false);

  const fullCode = `// Akeel Guhagarkar — High-Performance Web Engine
import { createDigitalProfile } from '@akeel/core';

export default function WebApplication() {
  const [metrics, setMetrics] = useState({
    fps: 60,
    status: 'PRODUCTION_READY',
    architecture: 'Clean & Scalable'
  });

  return (
    <PortfolioTheme mode="ultra-premium">
      <HeroTitle name="AKEEL GUHAGARKAR" />
      <CursiveAccent text="Turning Ideas into Digital Reality." />
      <FeaturedSolutions items={['My Portfolio', 'Mauli Homestay', 'CleanMax']} />
    </PortfolioTheme>
  );
}`;

  // Typing effect loop
  useEffect(() => {
    let index = 0;
    setTypedCode('');
    const interval = setInterval(() => {
      if (index < fullCode.length) {
        setTypedCode(fullCode.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, []);

  const handleRestartTyping = () => {
    let index = 0;
    setTypedCode('');
    const interval = setInterval(() => {
      if (index < fullCode.length) {
        setTypedCode(fullCode.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 18);
  };

  return (
    <section className="webdev-graphics-section" aria-label="Web Development Interactive Canvas">
      
      {/* Section Line Divider */}
      <div className="section-header-line-row">
        <div className="header-left">
          <span className="section-num">[ EXCELLENCE ]</span>
          <h2 className="header-title-text">WEB ENGINE & CREATIVE GRAPHICS</h2>
        </div>
        <div className="header-line"></div>
        <span className="header-right-label">INTERACTIVE CODE & UI ARCHITECTURE</span>
      </div>

      {/* Main Terminal & Visual Workspace Grid */}
      <div className="webdev-workspace-card">
        
        {/* Floating Levitating Tech Cards */}
        <div className="floating-badge badge-top-left animate-float-slow">
          <Zap size={14} className="badge-icon-blue" />
          <span>60 FPS PERFORMANCE</span>
        </div>

        <div className="floating-badge badge-top-right animate-float-medium">
          <Sparkles size={14} className="badge-icon-purple" />
          <span>AWWWARDS GRADE UI</span>
        </div>

        <div className="floating-badge badge-bottom-right animate-float-fast">
          <Layers size={14} className="badge-icon-green" />
          <span>RESPONSIVE GLASS ENGINE</span>
        </div>

        {/* Top Terminal Header Bar */}
        <div className="terminal-header-bar">
          <div className="terminal-window-controls">
            <span className="term-dot dot-red"></span>
            <span className="term-dot dot-yellow"></span>
            <span className="term-dot dot-green"></span>
            <span className="term-file-name">akeel-engine.config.tsx</span>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="terminal-nav-tabs">
            <button 
              className={`term-tab ${activeTab === 'code' ? 'active' : ''}`}
              onClick={() => setActiveTab('code')}
            >
              <Code2 size={13} />
              <span>LIVE CODE</span>
            </button>
            <button 
              className={`term-tab ${activeTab === 'ui' ? 'active' : ''}`}
              onClick={() => setActiveTab('ui')}
            >
              <Layout size={13} />
              <span>UI CANVAS</span>
            </button>
            <button 
              className={`term-tab ${activeTab === 'metrics' ? 'active' : ''}`}
              onClick={() => setActiveTab('metrics')}
            >
              <Activity size={13} />
              <span>METRICS</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Live Code Editor Screen */}
        {activeTab === 'code' && (
          <div className="terminal-body-code">
            <div className="code-editor-header">
              <span className="editor-lang-tag">TypeScript React (TSX)</span>
              <button className="restart-btn" onClick={handleRestartTyping} title="Replay code typing animation">
                <RotateCcw size={12} />
                <span>Replay Animation</span>
              </button>
            </div>
            <pre className="code-pre">
              <code>
                {typedCode}
                <span className="typing-cursor">|</span>
              </code>
            </pre>
          </div>
        )}

        {/* Tab 2: Interactive UI Preview Canvas */}
        {activeTab === 'ui' && (
          <div className="terminal-body-ui">
            <div className="ui-canvas-preview">
              <div className="ui-preview-header">
                <span className="preview-label">INTERACTIVE COMPONENT CANVAS</span>
                <span className="live-status-pill">● STATEFUL COMPONENT</span>
              </div>
              
              <div className="ui-interactive-widget">
                <h4 className="widget-title">Dynamic UI Engine</h4>
                <p className="widget-desc">Click button to trigger real-time reactive state animation:</p>
                <div className="widget-action-row">
                  <button onClick={() => setCounter(c => c + 1)} className="ui-pulse-btn">
                    <Play size={14} />
                    <span>INTERACT (State: {counter})</span>
                  </button>
                  <span className="state-badge">Render Cycles: {counter * 12}ms</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Performance Metrics */}
        {activeTab === 'metrics' && (
          <div className="terminal-body-metrics">
            <div className="metrics-grid">
              <div className="metric-box">
                <span className="metric-val">100%</span>
                <span className="metric-lbl">Lighthouse Performance</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">60 FPS</span>
                <span className="metric-lbl">Smooth Refresh Rate</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">0.08s</span>
                <span className="metric-lbl">Edge Response Speed</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">A+ Grade</span>
                <span className="metric-lbl">Clean Code Standard</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Status Bar */}
        <div className="terminal-status-footer">
          <div className="status-left">
            <Cpu size={12} className="status-icon" />
            <span>Vite 8.3 Engine Active</span>
            <span className="status-sep">•</span>
            <span>UTF-8</span>
          </div>
          <div className="status-right">
            <span className="green-pulse-dot"></span>
            <span className="status-green">DEPLOYED & OPERATIONAL</span>
          </div>
        </div>

      </div>

    </section>
  );
}
