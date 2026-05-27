'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getMockResponse, suggestedQuestions, ChatMessage } from '@/lib/chatData';
import { trendingTopics } from '@/lib/mockData';

function TypewriterText({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const idx = useRef(0);

  useEffect(() => {
    idx.current = 0;
    setDisplayed('');
    const speed = text.length > 400 ? 8 : 14;
    const interval = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1));
        idx.current++;
      } else {
        clearInterval(interval);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, onDone]);

  return <span style={{ whiteSpace: 'pre-wrap' }}>{displayed}<span className="animate-pulse">▋</span></span>;
}

function MessageBubble({ msg, isLatestAssistant }: { msg: ChatMessage; isLatestAssistant: boolean }) {
  const isUser = msg.role === 'user';
  const [done, setDone] = useState(!isLatestAssistant);

  const formatContent = (text: string) =>
    text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-black mt-3 mb-1" style={{ color: '#00D4FF' }}>{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.match(/^\*\*.*\*\*/)) {
        return <p key={i} className="mt-2" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#E8F4FD">$1</strong>') }} />;
      }
      if (line.startsWith('→') || line.startsWith('🔴') || line.startsWith('🟡') || line.startsWith('🟢')) {
        return <p key={i} className="ml-2 mt-1">{line}</p>;
      }
      if (!line.trim()) return <br key={i} />;
      return <p key={i}>{line}</p>;
    });

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-black mt-1"
        style={{
          background: isUser ? 'linear-gradient(135deg, #00D4FF, #7B2FBE)' : 'rgba(0,212,255,0.1)',
          color: isUser ? '#050B18' : '#00D4FF',
          border: isUser ? 'none' : '1px solid rgba(0,212,255,0.3)',
        }}>
        {isUser ? 'U' : 'L'}
      </div>

      <div
        className="max-w-[85%] px-5 py-4 rounded-2xl text-sm leading-relaxed"
        style={{
          background: isUser ? 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(123,47,190,0.12))' : 'rgba(13,27,42,0.8)',
          border: `1px solid ${isUser ? 'rgba(0,212,255,0.25)' : 'rgba(255,255,255,0.06)'}`,
          color: '#E8F4FD',
          borderRadius: isUser ? '20px 20px 6px 20px' : '20px 20px 20px 6px',
        }}>
        {isLatestAssistant && !done
          ? <TypewriterText text={msg.content} onDone={() => setDone(true)} />
          : <div style={{ whiteSpace: 'pre-wrap' }}>{formatContent(msg.content)}</div>
        }
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [field, setField] = useState('Financial Stability');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Welcome. I am LEXIS — an AI research intelligence trained on the entire Financial Stability literature.\n\nI can synthesize findings across thousands of papers, explain contradictions, recommend methodologies, and identify research gaps. What would you like to explore?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [latestIdx, setLatestIdx] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const changeField = (f: string) => {
    setField(f);
    setMessages([{
      role: 'assistant',
      content: `Field switched to **${f}**.\n\nI am now drawing on the complete ${f} literature. Ask me anything — contradictions, methodology, gaps, key theories, or recent developments.`,
    }]);
    setLatestIdx(0);
  };

  const sendMessage = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || typing) return;
    setInput('');

    const userMsg: ChatMessage = { role: 'user', content: msg };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setTyping(true);

    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      const response = getMockResponse(field, msg);
      const assistantMsg: ChatMessage = { role: 'assistant', content: response };
      setMessages(prev => {
        const updated = [...prev, assistantMsg];
        setLatestIdx(updated.length - 1);
        return updated;
      });
      setTyping(false);
    }, delay);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />

      <div className="flex flex-1 pt-16 max-w-6xl mx-auto w-full px-4">

        {/* Left: Field selector */}
        <div className="hidden md:flex w-64 shrink-0 flex-col pt-8 pr-6">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#8BA3B8' }}>Research Field</p>
          <div className="space-y-1.5">
            {trendingTopics.map(t => (
              <button
                key={t.name}
                onClick={() => changeField(t.name)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all"
                style={{
                  background: field === t.name ? 'rgba(0,212,255,0.1)' : 'transparent',
                  border: `1px solid ${field === t.name ? 'rgba(0,212,255,0.4)' : 'transparent'}`,
                  color: field === t.name ? '#00D4FF' : '#8BA3B8',
                }}>
                {t.name}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#8BA3B8' }}>Suggested</p>
            <div className="space-y-1.5">
              {suggestedQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs transition-all hover:bg-white/5"
                  style={{ color: '#8BA3B8', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pb-8">
            <Link href={`/research?q=${encodeURIComponent(field)}`}
              className="block text-center py-2 rounded-lg text-xs transition-all hover:scale-105"
              style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', color: '#00D4FF' }}>
              View Full Report →
            </Link>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-h-0 py-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: 'rgba(0,212,255,0.1)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black"
              style={{ background: 'linear-gradient(135deg, #00D4FF20, #7B2FBE20)', border: '1px solid rgba(0,212,255,0.3)', color: '#00D4FF' }}>
              L
            </div>
            <div>
              <h1 className="font-black text-base" style={{ color: '#E8F4FD' }}>Talk to a Research Field</h1>
              <p className="text-xs" style={{ color: '#8BA3B8' }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block mr-1.5 align-middle animate-pulse" style={{ background: '#00FF88' }} />
                Conversing with the <strong style={{ color: '#00D4FF' }}>{field}</strong> literature
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-5 pr-2"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,212,255,0.2) transparent' }}>
            {messages.map((msg, i) => (
              <MessageBubble
                key={i}
                msg={msg}
                isLatestAssistant={msg.role === 'assistant' && i === latestIdx}
              />
            ))}

            {typing && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-black mt-1"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00D4FF' }}>
                  L
                </div>
                <div className="px-5 py-4 rounded-2xl rounded-tl-md"
                  style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex gap-1 items-center py-1">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ background: '#00D4FF', animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="mt-4 flex gap-3">
            <div className="flex-1 flex items-center rounded-2xl overflow-hidden transition-all"
              style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.2)' }}
              onFocusCapture={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)')}
              onBlurCapture={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)')}>
              <input
                className="flex-1 px-5 py-4 bg-transparent outline-none text-sm"
                style={{ color: '#E8F4FD' }}
                placeholder={`Ask anything about ${field}…`}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                disabled={typing}
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || typing}
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18', alignSelf: 'flex-end' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>

          {/* Mobile suggested questions */}
          <div className="md:hidden mt-3 flex flex-wrap gap-2">
            {suggestedQuestions.slice(0, 3).map(q => (
              <button key={q} onClick={() => sendMessage(q)}
                className="px-3 py-1.5 rounded-full text-xs transition-all"
                style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.2)', color: '#8BA3B8' }}>
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
