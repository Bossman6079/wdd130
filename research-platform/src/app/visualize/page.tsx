'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getTemplate, DiagramType, DiagramNode, DiagramEdge } from '@/lib/platformData';

const diagramTypes: { key: DiagramType; label: string; icon: string; desc: string }[] = [
  { key: 'conceptual',  label: 'Conceptual Framework', icon: '🔷', desc: 'IV → Mediator → DV with moderator' },
  { key: 'causal',      label: 'Causal Chain',          icon: '⛓',  desc: 'Root cause → mechanisms → outcome' },
  { key: 'methodology', label: 'Methodology Flowchart', icon: '⚙️', desc: 'Research design decision tree' },
  { key: 'mindmap',     label: 'Theory Map',            icon: '🧠', desc: 'Central concept → branches' },
];

const shapeColors: Record<string, string> = {
  iv: '#00D4FF', dv: '#00FF88', med: '#FBB924', mod: '#EF4444',
  cv: '#8BA3B8', cause: '#EF4444', mech: '#FBB924', effect: '#00D4FF',
  outcome: '#00FF88', fb: '#A855F7', start: '#00D4FF', step: '#E8F4FD',
  dec: '#FBB924', end: '#00FF88', center: '#00D4FF', branch: '#A855F7',
  leaf: '#8BA3B8',
};

function SvgDiagram({ nodes, edges, W = 700, H = 500 }: { nodes: DiagramNode[]; edges: DiagramEdge[]; W?: number; H?: number }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const lookup = Object.fromEntries(nodes.map(n => [n.id, n]));

  const getEndpoints = (n: DiagramNode, t: DiagramNode) => {
    const dx = t.x - n.x, dy = t.y - n.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const r = n.shape === 'circle' ? 28 : n.shape === 'ellipse' ? 42 : 52;
    const tr = t.shape === 'circle' ? 28 : t.shape === 'ellipse' ? 42 : 52;
    return {
      x1: n.x + (dx / len) * r, y1: n.y + (dy / len) * r,
      x2: t.x - (dx / len) * (tr + 5), y2: t.y - (dy / len) * (tr + 5),
    };
  };

  return (
    <div className="overflow-auto rounded-2xl" style={{ background: 'rgba(5,11,24,0.8)', border: '1px solid rgba(0,212,255,0.12)' }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ minWidth: '500px', width: '100%' }}>
        <defs>
          <marker id="varr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="rgba(0,212,255,0.6)" />
          </marker>
        </defs>
        {/* Edges */}
        {edges.map((e, i) => {
          const n = lookup[e.from], t = lookup[e.to];
          if (!n || !t) return null;
          const { x1, y1, x2, y2 } = getEndpoints(n, t);
          const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(0,212,255,0.4)" strokeWidth="1.5"
                strokeDasharray={e.dashed ? '6,4' : undefined}
                markerEnd="url(#varr)" />
              {e.label && (
                <text x={mx} y={my - 6} textAnchor="middle" fontSize="9"
                  fill="rgba(0,212,255,0.7)" fontWeight="600">{e.label}</text>
              )}
            </g>
          );
        })}
        {/* Nodes */}
        {nodes.map(n => {
          const color = n.color || shapeColors[n.type] || '#00D4FF';
          const isHov = hovered === n.id;
          const lines = n.label.split('\n');
          const lh = 13;
          const textY = n.y - ((lines.length - 1) * lh) / 2;
          return (
            <g key={n.id}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}>
              {n.shape === 'circle' && (
                <circle cx={n.x} cy={n.y} r={28}
                  fill={`${color}18`} stroke={color} strokeWidth={isHov ? 2.5 : 1.5} />
              )}
              {n.shape === 'ellipse' && (
                <ellipse cx={n.x} cy={n.y} rx={44} ry={24}
                  fill={`${color}18`} stroke={color} strokeWidth={isHov ? 2.5 : 1.5} />
              )}
              {n.shape === 'diamond' && (
                <polygon
                  points={`${n.x},${n.y - 30} ${n.x + 55},${n.y} ${n.x},${n.y + 30} ${n.x - 55},${n.y}`}
                  fill={`${color}18`} stroke={color} strokeWidth={isHov ? 2.5 : 1.5} />
              )}
              {(n.shape === 'rect' || !n.shape) && (
                <rect x={n.x - 56} y={n.y - 24} width={112} height={48}
                  rx={10} fill={`${color}18`} stroke={color} strokeWidth={isHov ? 2.5 : 1.5} />
              )}
              {lines.map((line, li) => (
                <text key={li} x={n.x} y={textY + li * lh}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="10" fontWeight="700" fill={isHov ? color : '#E8F4FD'}>
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function VisualizePage() {
  const [diagramType, setDiagramType] = useState<DiagramType>('conceptual');
  const [topic, setTopic] = useState('Financial Stability');
  const [generated, setGenerated] = useState(false);
  const [template, setTemplate] = useState(getTemplate('conceptual', 'Financial Stability'));

  const generate = () => {
    setTemplate(getTemplate(diagramType, topic.trim() || 'Research Topic'));
    setGenerated(true);
  };

  const copyAsSvg = () => {
    const svgEl = document.querySelector('svg[viewBox]');
    if (svgEl) navigator.clipboard.writeText(svgEl.outerHTML);
  };

  return (
    <div className="min-h-screen" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-20">
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8BA3B8' }}>
          <Link href="/" style={{ color: '#00D4FF' }} className="hover:underline">Home</Link>
          <span>/</span><span>Visualization Studio</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#E8F4FD' }}>🎨 Visualization Studio</h1>
        <p className="max-w-xl text-base leading-relaxed mb-10" style={{ color: '#8BA3B8' }}>
          Generate publication-quality research diagrams automatically. Choose a diagram type, enter your topic, and get an editable SVG framework in seconds.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Controls */}
          <div className="md:col-span-1 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#8BA3B8' }}>Diagram Type</p>
              <div className="space-y-2">
                {diagramTypes.map(dt => (
                  <button key={dt.key} onClick={() => setDiagramType(dt.key)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
                    style={{
                      background: diagramType === dt.key ? 'rgba(0,212,255,0.1)' : 'rgba(13,27,42,0.6)',
                      border: `1px solid ${diagramType === dt.key ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.06)'}`,
                    }}>
                    <span className="text-lg">{dt.icon}</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: diagramType === dt.key ? '#00D4FF' : '#E8F4FD' }}>{dt.label}</p>
                      <p className="text-xs" style={{ color: '#8BA3B8' }}>{dt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Research Topic</p>
              <input
                className="w-full px-4 py-3 rounded-xl text-sm bg-transparent outline-none"
                style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.2)', color: '#E8F4FD' }}
                placeholder="e.g. Financial Stability"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && generate()}
              />
            </div>

            <button onClick={generate}
              className="w-full py-4 rounded-xl font-black text-sm transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
              🎨 Generate Diagram
            </button>

            {generated && (
              <button onClick={copyAsSvg}
                className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00D4FF' }}>
                ⎘ Copy as SVG
              </button>
            )}

            {/* Node legend */}
            {generated && (
              <div className="p-4 rounded-xl" style={{ background: 'rgba(13,27,42,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#8BA3B8' }}>Legend</p>
                {diagramType === 'conceptual' && (
                  <div className="space-y-2 text-xs">
                    {[['IV (Independent)', '#00D4FF'], ['DV (Dependent)', '#00FF88'], ['Mediator', '#FBB924'], ['Moderator', '#EF4444'], ['Control', '#8BA3B8']].map(([label, color]) => (
                      <div key={label} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm" style={{ background: `${color}25`, border: `1px solid ${color}` }} />
                        <span style={{ color: '#8BA3B8' }}>{label}</span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs mt-3" style={{ color: '#8BA3B8' }}>Dashed lines = moderating relationships</p>
              </div>
            )}
          </div>

          {/* Diagram output */}
          <div className="md:col-span-2">
            {generated ? (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-sm" style={{ color: '#E8F4FD' }}>{template.name}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(0,255,136,0.1)', color: '#00FF88', border: '1px solid rgba(0,255,136,0.2)' }}>
                    ✓ Generated
                  </span>
                </div>
                <SvgDiagram
                  nodes={template.nodes}
                  edges={template.edges}
                  W={diagramType === 'methodology' ? 650 : 700}
                  H={diagramType === 'methodology' ? 680 : 480}
                />
                <p className="text-xs mt-3 text-center" style={{ color: '#8BA3B8' }}>
                  Hover nodes to highlight · Click ⎘ Copy as SVG to use in your paper
                </p>
              </div>
            ) : (
              <div className="h-80 flex flex-col items-center justify-center rounded-2xl"
                style={{ background: 'rgba(13,27,42,0.5)', border: '2px dashed rgba(0,212,255,0.15)' }}>
                <p className="text-5xl mb-4">🎨</p>
                <p className="font-bold" style={{ color: '#E8F4FD' }}>Select a diagram type and click Generate</p>
                <p className="text-sm mt-1" style={{ color: '#8BA3B8' }}>Your diagram will appear here</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Link href="/review"
            className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
            📝 Literature Review →
          </Link>
          <Link href="/supervisor"
            className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.2)', color: '#8BA3B8' }}>
            🎓 AI Supervisor →
          </Link>
        </div>
      </div>
    </div>
  );
}
