'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getGraphData, GraphNode, GraphEdge } from '@/lib/mockData';

const NODE_COLORS: Record<string, { fill: string; stroke: string; glow: string }> = {
  theory:  { fill: '#00D4FF20', stroke: '#00D4FF', glow: '#00D4FF' },
  variable:{ fill: '#00FF8820', stroke: '#00FF88', glow: '#00FF88' },
  author:  { fill: '#A855F720', stroke: '#A855F7', glow: '#A855F7' },
  method:  { fill: '#FBB92420', stroke: '#FBB924', glow: '#FBB924' },
  finding: { fill: '#EF444420', stroke: '#EF4444', glow: '#EF4444' },
};

const REPULSION = 8000;
const ATTRACTION = 0.04;
const DAMPING = 0.82;
const NODE_R = 30;

export default function GraphContent() {
  const params = useSearchParams();
  const q = params.get('q') ?? 'Financial Stability';
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<GraphNode[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const isDraggingPan = useRef(false);
  const lastPan = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const data = getGraphData(q);
    const cx = 500, cy = 340;
    const spread = data.nodes.length;
    const initialized = data.nodes.map((n, i) => ({
      ...n,
      x: cx + 200 * Math.cos((i / spread) * 2 * Math.PI),
      y: cy + 200 * Math.sin((i / spread) * 2 * Math.PI),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));
    nodesRef.current = initialized;
    setNodes([...initialized]);
    setEdges(data.edges);
  }, [q]);

  const simulate = useCallback(() => {
    const ns = nodesRef.current;
    if (!ns.length) return;

    for (let i = 0; i < ns.length; i++) {
      let fx = 0, fy = 0;

      for (let j = 0; j < ns.length; j++) {
        if (i === j) continue;
        const dx = ns[i].x - ns[j].x;
        const dy = ns[i].y - ns[j].y;
        const dist2 = dx * dx + dy * dy + 1;
        const force = REPULSION / dist2;
        fx += (dx / Math.sqrt(dist2)) * force;
        fy += (dy / Math.sqrt(dist2)) * force;
      }

      edges.forEach(e => {
        const src = ns.find(n => n.id === e.source);
        const tgt = ns.find(n => n.id === e.target);
        if (!src || !tgt) return;
        if (ns[i].id === e.source || ns[i].id === e.target) {
          const other = ns[i].id === e.source ? tgt : src;
          const dx = other.x - ns[i].x;
          const dy = other.y - ns[i].y;
          fx += dx * ATTRACTION;
          fy += dy * ATTRACTION;
        }
      });

      // Center gravity
      fx += (500 - ns[i].x) * 0.003;
      fy += (340 - ns[i].y) * 0.003;

      ns[i].vx = (ns[i].vx + fx) * DAMPING;
      ns[i].vy = (ns[i].vy + fy) * DAMPING;
      ns[i].x += ns[i].vx;
      ns[i].y += ns[i].vy;
    }

    setNodes([...ns]);
    animRef.current = requestAnimationFrame(simulate);
  }, [edges]);

  useEffect(() => {
    if (!edges.length || !nodesRef.current.length) return;
    animRef.current = requestAnimationFrame(simulate);
    return () => cancelAnimationFrame(animRef.current);
  }, [simulate, edges]);

  const handleNodeMouseDown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDragging(id);
    const node = nodesRef.current.find(n => n.id === id);
    if (node) { node.vx = 0; node.vy = 0; }
  };

  const handleSVGMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDraggingPan.current) {
      const dx = e.clientX - lastPan.current.x;
      const dy = e.clientY - lastPan.current.y;
      setPan(p => ({ x: p.x + dx, y: p.y + dy }));
      lastPan.current = { x: e.clientX, y: e.clientY };
      return;
    }
    if (!dragging) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;
    const node = nodesRef.current.find(n => n.id === dragging);
    if (node) { node.x = x; node.y = y; node.vx = 0; node.vy = 0; }
  };

  const handleSVGMouseUp = () => {
    setDragging(null);
    isDraggingPan.current = false;
  };

  const handleSVGMouseDown = (e: React.MouseEvent) => {
    if ((e.target as SVGElement).closest('circle')) return;
    isDraggingPan.current = true;
    lastPan.current = { x: e.clientX, y: e.clientY };
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(z => Math.max(0.3, Math.min(3, z - e.deltaY * 0.001)));
  };

  const selectedNode = selected ?? (hovered ? nodes.find(n => n.id === hovered) ?? null : null);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />
      <div className="flex flex-1 pt-16 overflow-hidden">

        {/* Graph SVG */}
        <div className="flex-1 relative overflow-hidden">
          <svg
            ref={svgRef}
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            style={{ minHeight: 'calc(100vh - 4rem)' }}
            onMouseMove={handleSVGMouseMove}
            onMouseUp={handleSVGMouseUp}
            onMouseDown={handleSVGMouseDown}
            onMouseLeave={handleSVGMouseUp}
            onWheel={handleWheel}
          >
            <defs>
              {Object.entries(NODE_COLORS).map(([type, c]) => (
                <filter key={type} id={`glow-${type}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              ))}
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 Z" fill="rgba(0,212,255,0.4)" />
              </marker>
            </defs>

            <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
              {/* Edges */}
              {edges.map((e, i) => {
                const src = nodes.find(n => n.id === e.source);
                const tgt = nodes.find(n => n.id === e.target);
                if (!src || !tgt) return null;
                const isHighlighted = hovered === e.source || hovered === e.target;
                return (
                  <g key={i}>
                    <line
                      x1={src.x} y1={src.y} x2={tgt.x} y2={tgt.y}
                      stroke={isHighlighted ? 'rgba(0,212,255,0.7)' : 'rgba(0,212,255,0.15)'}
                      strokeWidth={isHighlighted ? 1.5 : 0.8}
                      markerEnd="url(#arrow)"
                    />
                    {e.label && isHighlighted && (
                      <text
                        x={(src.x + tgt.x) / 2}
                        y={(src.y + tgt.y) / 2 - 5}
                        textAnchor="middle"
                        fontSize="9"
                        fill="rgba(0,212,255,0.8)"
                      >{e.label}</text>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map(node => {
                const colors = NODE_COLORS[node.type] ?? NODE_COLORS.theory;
                const isActive = hovered === node.id || selected?.id === node.id;
                const r = isActive ? NODE_R + 6 : NODE_R;
                return (
                  <g
                    key={node.id}
                    style={{ cursor: dragging === node.id ? 'grabbing' : 'pointer' }}
                    onMouseEnter={() => setHovered(node.id)}
                    onMouseLeave={() => setHovered(null)}
                    onMouseDown={e => handleNodeMouseDown(node.id, e)}
                    onClick={() => setSelected(s => s?.id === node.id ? null : node)}
                  >
                    {/* Glow ring */}
                    {isActive && (
                      <circle cx={node.x} cy={node.y} r={r + 10}
                        fill="none" stroke={colors.stroke} strokeWidth="1.5" opacity="0.3"
                        filter={`url(#glow-${node.type})`} />
                    )}
                    <circle
                      cx={node.x} cy={node.y} r={r}
                      fill={colors.fill}
                      stroke={colors.stroke}
                      strokeWidth={isActive ? 2 : 1}
                      filter={isActive ? `url(#glow-${node.type})` : undefined}
                      style={{ transition: 'r 0.2s' }}
                    />
                    <text
                      x={node.x} y={node.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={node.label.length > 10 ? "8" : "10"}
                      fill={isActive ? colors.stroke : '#E8F4FD'}
                      fontWeight={isActive ? 'bold' : 'normal'}
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                      {node.label.length > 14 ? node.label.slice(0, 12) + '…' : node.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 p-3 rounded-xl flex flex-wrap gap-2 max-w-xs"
            style={{ background: 'rgba(13,27,42,0.85)', border: '1px solid rgba(0,212,255,0.15)', backdropFilter: 'blur(10px)' }}>
            {Object.entries(NODE_COLORS).map(([type, c]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full border" style={{ background: c.fill, borderColor: c.stroke }} />
                <span className="text-xs capitalize" style={{ color: '#8BA3B8' }}>{type}</span>
              </div>
            ))}
          </div>

          {/* Controls hint */}
          <div className="absolute top-20 left-4 p-2 rounded-lg text-xs" style={{ color: '#8BA3B8', background: 'rgba(13,27,42,0.7)' }}>
            Scroll to zoom · Drag to pan · Click node for details
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 shrink-0 border-l flex flex-col" style={{ borderColor: 'rgba(0,212,255,0.1)', background: 'rgba(13,27,42,0.6)', backdropFilter: 'blur(10px)' }}>
          <div className="p-5 border-b" style={{ borderColor: 'rgba(0,212,255,0.1)' }}>
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-black text-sm" style={{ color: '#00D4FF' }}>Knowledge Graph</h2>
              <Link href={`/research?q=${encodeURIComponent(q)}`}
                className="text-xs px-2 py-1 rounded-lg hover:underline"
                style={{ color: '#8BA3B8' }}>
                ← Report
              </Link>
            </div>
            <p className="text-sm font-bold" style={{ color: '#E8F4FD' }}>{q}</p>
            <p className="text-xs mt-1" style={{ color: '#8BA3B8' }}>
              {nodes.length} nodes · {edges.length} connections
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {selectedNode ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full" style={{ background: NODE_COLORS[selectedNode.type]?.stroke ?? '#00D4FF' }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: NODE_COLORS[selectedNode.type]?.stroke }}>
                    {selectedNode.type}
                  </span>
                </div>
                <h3 className="font-black text-lg mb-3" style={{ color: '#E8F4FD' }}>{selectedNode.label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8BA3B8' }}>{selectedNode.description}</p>

                <div className="mt-5">
                  <p className="text-xs font-semibold mb-2" style={{ color: '#8BA3B8' }}>CONNECTIONS</p>
                  {edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).map((e, i) => {
                    const otherId = e.source === selectedNode.id ? e.target : e.source;
                    const other = nodes.find(n => n.id === otherId);
                    if (!other) return null;
                    return (
                      <div key={i} className="flex items-center gap-2 py-2 border-b cursor-pointer"
                        style={{ borderColor: 'rgba(0,212,255,0.08)' }}
                        onClick={() => setSelected(other)}>
                        <div className="w-2 h-2 rounded-full" style={{ background: NODE_COLORS[other.type]?.stroke ?? '#00D4FF' }} />
                        <span className="text-xs" style={{ color: '#E8F4FD' }}>{other.label}</span>
                        {e.label && <span className="text-xs ml-auto" style={{ color: '#8BA3B8' }}>{e.label}</span>}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <div className="text-4xl mb-3">🕸</div>
                <p className="text-sm font-semibold mb-1" style={{ color: '#E8F4FD' }}>Interactive Knowledge Graph</p>
                <p className="text-xs leading-relaxed" style={{ color: '#8BA3B8' }}>
                  Click any node to explore its details and connections. The graph shows how theories, variables, methods, and authors interconnect.
                </p>
              </div>
            )}
          </div>

          <div className="p-4 border-t" style={{ borderColor: 'rgba(0,212,255,0.1)' }}>
            <Link href={`/research?q=${encodeURIComponent(q)}`}
              className="w-full block text-center py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
              ← Back to Full Report
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
