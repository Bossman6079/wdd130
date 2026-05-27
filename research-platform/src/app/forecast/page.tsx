'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getForecast, FieldForecast } from '@/lib/platformData';
import { trendingTopics } from '@/lib/mockData';

function LineChart({
  data, forecast, width = 500, height = 180, color = '#00D4FF', label = 'papers',
}: {
  data: { year: number; value: number }[];
  forecast?: { year: number; value: number; confidence: number }[];
  width?: number; height?: number; color?: string; label?: string;
}) {
  const all = [...data, ...(forecast ?? [])];
  const minV = Math.min(...all.map(d => d.value));
  const maxV = Math.max(...all.map(d => d.value));
  const minY = Math.min(...all.map(d => d.year));
  const maxY = Math.max(...all.map(d => d.year));
  const pad = { l: 50, r: 20, t: 20, b: 30 };
  const W = width - pad.l - pad.r;
  const H = height - pad.t - pad.b;
  const xScale = (y: number) => pad.l + ((y - minY) / (maxY - minY)) * W;
  const yScale = (v: number) => pad.t + H - ((v - minV) / (maxV - minV || 1)) * H;

  const histPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(d.year).toFixed(1)},${yScale(d.value).toFixed(1)}`).join(' ');
  const forecastPath = forecast && forecast.length
    ? `M${xScale(data[data.length - 1].year).toFixed(1)},${yScale(data[data.length - 1].value).toFixed(1)} ` +
      forecast.map(d => `L${xScale(d.year).toFixed(1)},${yScale(d.value).toFixed(1)}`).join(' ')
    : '';

  const areaPath = histPath + ` L${xScale(data[data.length - 1].year)},${pad.t + H} L${xScale(data[0].year)},${pad.t + H} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`area-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0.25, 0.5, 0.75, 1].map(p => (
        <line key={p} x1={pad.l} y1={pad.t + H * (1 - p)} x2={pad.l + W} y2={pad.t + H * (1 - p)}
          stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}
      {/* Area fill */}
      <path d={areaPath} fill={`url(#area-${color.replace('#', '')})`} />
      {/* Historical line */}
      <path d={histPath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Forecast line */}
      {forecastPath && <path d={forecastPath} fill="none" stroke={color} strokeWidth="2" strokeDasharray="6,4" opacity="0.7" />}
      {/* Year labels */}
      {data.filter((_, i) => i % 2 === 0 || i === data.length - 1).map(d => (
        <text key={d.year} x={xScale(d.year)} y={pad.t + H + 18} textAnchor="middle" fontSize="9" fill="#8BA3B8">
          {d.year}
        </text>
      ))}
      {forecast?.map(d => (
        <text key={d.year} x={xScale(d.year)} y={pad.t + H + 18} textAnchor="middle" fontSize="9" fill={`${color}80`}>
          {d.year}
        </text>
      ))}
      {/* Value labels at last real and last forecast points */}
      {data.length > 0 && (
        <text x={xScale(data[data.length - 1].year)} y={yScale(data[data.length - 1].value) - 8}
          textAnchor="middle" fontSize="9" fontWeight="700" fill={color}>
          {data[data.length - 1].value}
        </text>
      )}
      {/* Y-axis label */}
      <text x={pad.l - 6} y={pad.t + H / 2} textAnchor="middle" fontSize="9" fill="#8BA3B8"
        transform={`rotate(-90, ${pad.l - 6}, ${pad.t + H / 2})`}>
        {label}
      </text>
    </svg>
  );
}

export default function ForecastPage() {
  const [field, setField] = useState('Financial Stability');
  const [forecast, setForecast] = useState<FieldForecast | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    setForecast(null);
    const t = setTimeout(() => { setForecast(getForecast(field)); setVisible(true); }, 800);
    return () => clearTimeout(t);
  }, [field]);

  return (
    <div className="min-h-screen" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-20">
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8BA3B8' }}>
          <Link href="/" style={{ color: '#00D4FF' }} className="hover:underline">Home</Link>
          <span>/</span><span>AI Research Forecasting</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#E8F4FD' }}>🔮 AI Research Forecasting</h1>
        <p className="max-w-xl text-base leading-relaxed mb-8" style={{ color: '#8BA3B8' }}>
          Publication velocity, citation acceleration, rising keywords, and funding trends — with AI-predicted trajectories through 2027.
        </p>

        {/* Field selector */}
        <div className="flex flex-wrap gap-2 mb-10">
          {trendingTopics.slice(0, 4).map(t => (
            <button key={t.name} onClick={() => setField(t.name)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{
                background: field === t.name ? 'rgba(0,212,255,0.12)' : 'rgba(13,27,42,0.6)',
                border: `1px solid ${field === t.name ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                color: field === t.name ? '#00D4FF' : '#8BA3B8',
              }}>
              {t.name}
            </button>
          ))}
        </div>

        {!forecast && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
              style={{ borderTopColor: '#00D4FF', borderRightColor: '#7B2FBE' }} />
          </div>
        )}

        {forecast && visible && (
          <div className={`transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

            {/* Charts row */}
            <div className="grid md:grid-cols-2 gap-5 mb-6">
              {/* Publication velocity */}
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(0,212,255,0.15)' }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-black text-sm" style={{ color: '#E8F4FD' }}>Publication Velocity</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(0,212,255,0.1)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.2)' }}>
                    papers/year
                  </span>
                </div>
                <LineChart
                  data={forecast.velocitySeries.map(d => ({ year: d.year, value: d.papers }))}
                  forecast={forecast.forecastYears.map(d => ({ year: d.year, value: d.papers, confidence: d.confidence }))}
                  color="#00D4FF" label="papers"
                />
                <div className="flex gap-4 mt-3">
                  {forecast.forecastYears.map(f => (
                    <div key={f.year} className="text-center">
                      <p className="text-base font-black" style={{ color: '#00D4FF' }}>{f.papers}</p>
                      <p className="text-xs" style={{ color: '#8BA3B8' }}>{f.year} est.</p>
                      <p className="text-xs font-mono" style={{ color: '#00FF88' }}>{f.confidence}% conf.</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Citation acceleration */}
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(168,85,247,0.15)' }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-black text-sm" style={{ color: '#E8F4FD' }}>Citation Acceleration</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(168,85,247,0.1)', color: '#A855F7', border: '1px solid rgba(168,85,247,0.2)' }}>
                    citations/year
                  </span>
                </div>
                <LineChart
                  data={forecast.citationSeries.map(d => ({ year: d.year, value: d.citations }))}
                  color="#A855F7" label="citations"
                />
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <div className="h-1.5 rounded-full" style={{ width: '82%', background: 'linear-gradient(90deg, #A855F7, #00D4FF)' }} />
                  </div>
                  <span className="text-xs font-mono font-bold" style={{ color: '#A855F7' }}>+{Math.round((forecast.citationSeries[forecast.citationSeries.length - 1].citations / forecast.citationSeries[0].citations - 1) * 100)}% since {forecast.citationSeries[0].year}</span>
                </div>
              </div>
            </div>

            {/* Rising keywords */}
            <div className="p-6 rounded-2xl mb-5" style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(0,255,136,0.12)' }}>
              <h3 className="font-black text-base mb-5" style={{ color: '#E8F4FD' }}>⚡ Rising Keywords</h3>
              <div className="space-y-3">
                {forecast.risingKeywords.map((kw, i) => (
                  <div key={kw.word} className="flex items-center gap-4">
                    <span className="text-xs font-mono w-5 text-right" style={{ color: '#8BA3B8' }}>#{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold" style={{ color: '#E8F4FD' }}>{kw.word}</span>
                        <span className="text-xs font-bold font-mono" style={{ color: kw.color }}>+{kw.growth}%</span>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                        <div className="h-2 rounded-full transition-all duration-700"
                          style={{ width: `${Math.min((kw.growth / 600) * 100, 100)}%`, background: kw.color, opacity: 0.85 }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Funding trends */}
            <div className="p-6 rounded-2xl mb-5" style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(251,191,36,0.12)' }}>
              <h3 className="font-black text-base mb-5" style={{ color: '#E8F4FD' }}>💰 Funding Trends</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {forecast.fundingTrends.map(f => (
                  <div key={f.source} className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ background: `${f.color}08`, border: `1px solid ${f.color}20` }}>
                    <div className="flex-1">
                      <p className="font-bold text-sm" style={{ color: '#E8F4FD' }}>{f.source}</p>
                      <p className="text-xl font-black mt-1" style={{ color: f.color }}>{f.amount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black" style={{ color: f.color }}>{f.trend}</p>
                      <p className="text-xs" style={{ color: '#8BA3B8' }}>YoY growth</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prediction summary */}
            <div className="p-6 rounded-2xl" style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.2)' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🔮</span>
                <h3 className="font-black text-base" style={{ color: '#00D4FF' }}>AI Forecast Summary</h3>
                <span className="text-xs px-2 py-0.5 rounded-full ml-auto"
                  style={{ background: 'rgba(0,212,255,0.1)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.2)' }}>
                  2025–2027
                </span>
              </div>
              <p className="text-sm leading-loose" style={{ color: '#E8F4FD' }}>{forecast.predictionSummary}</p>
            </div>

            <div className="mt-8 flex gap-4 flex-wrap">
              <Link href="/trends"
                className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
                🚀 View All Emerging Trends →
              </Link>
              <Link href={`/research?q=${encodeURIComponent(field)}`}
                className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.2)', color: '#8BA3B8' }}>
                Research Report →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
