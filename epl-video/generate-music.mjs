// Generates an epic 5-min background music WAV via sine-wave synthesis
import { writeFileSync } from "fs";

const SR = 44100;
const CH = 1;
const DURATION = 308;
const BPM = 88;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;

// D major chord progression: D → G → A → Bm
const CHORDS = [
  { r: 293.66, t: 369.99, f: 440.00 }, // D
  { r: 392.00, t: 493.88, f: 587.33 }, // G
  { r: 440.00, t: 554.37, f: 659.26 }, // A
  { r: 246.94, t: 293.66, f: 370.00 }, // Bm
];
const CHORD_DUR = BAR * 4;
const PROG_DUR = CHORD_DUR * 4;

// D pentatonic melody pattern [note-index, beats]
const MEL = [[4,1],[4,.5],[3,.5],[2,1],[1,1],[0,1],[1,.5],[2,.5],[3,2],[4,1],[3,.5],[2,.5],[4,.5],[3,.5],[1,1],[0,2]];
const MEL_CYCLE = MEL.reduce((a,[,d])=>a+d*BEAT,0);
const MEL_FREQS = [293.66,329.63,369.99,440.00,493.88];

const sin = (f,t,ph=0) => Math.sin(2*Math.PI*f*t+ph);

function adsr(t,a,d,s,r,total){
  if(t<a) return t/a;
  if(t<a+d) return 1-(1-s)*(t-a)/d;
  if(t<total-r) return s;
  return Math.max(0,s*(total-t)/r);
}

function melody(t){
  let pos = t % MEL_CYCLE;
  for(const[ni,dur]of MEL){
    const d=dur*BEAT;
    if(pos<d) return{freq:MEL_FREQS[ni]*2,env:adsr(pos,.02,.08,.7,.3,d)};
    pos-=d;
  }
  return{freq:440,env:0};
}

const N = Math.ceil(SR*DURATION);
const pcm = Buffer.alloc(N*2);

for(let i=0;i<N;i++){
  const t=i/SR;

  const fadeIn=Math.min(t/3,1);
  const fadeOut=t>DURATION-5?Math.max((DURATION-t)/5,0):1;

  const ci=Math.floor((t%PROG_DUR)/CHORD_DUR)%4;
  const c=CHORDS[ci];
  const tc=t%CHORD_DUR;
  const cEnv=adsr(tc,.3,.5,.8,1.5,CHORD_DUR);

  // Bass
  const bp=(t%BEAT)/BEAT;
  const bass=.26*(Math.exp(-bp*4)*.6+.35)*sin(c.r/2,t);

  // Pad (strings)
  const vib=1+.003*sin(5.5,t);
  const pad=cEnv*(
    .13*sin(c.r*vib,t)+
    .11*sin(c.t*vib,t,.15)+
    .09*sin(c.f*vib,t,.3)+
    .05*sin(c.r*1.005,t,.6)+
    .04*sin(c.f*.997,t,.9)
  );

  // Melody lead
  const{freq,env:mE}=melody(t);
  const mel=.13*mE*(.6*sin(freq,t)+.3*sin(freq*2,t)+.1*sin(freq*3,t));

  // Kick (beats 1 & 3)
  const barP=t%BAR;
  const kP=barP<BEAT?barP:(barP>=BEAT*2&&barP<BEAT*3?barP-BEAT*2:null);
  const kick=kP!=null?.35*Math.exp(-kP*18)*sin(55*Math.exp(-kP*15),t):0;

  // Hi-hat 16ths
  const hhP=(t%(BEAT*.5))/(BEAT*.5);
  const hihat=.05*Math.exp(-hhP*18)*(Math.random()*2-1);

  let s=(bass+pad+mel+kick+hihat)*fadeIn*fadeOut;
  s=Math.tanh(s*1.4)*.75;

  pcm.writeInt16LE(Math.max(-32768,Math.min(32767,Math.round(s*32767))),i*2);
}

const hdr=Buffer.alloc(44);
hdr.write("RIFF",0,"ascii"); hdr.writeUInt32LE(36+pcm.length,4);
hdr.write("WAVE",8,"ascii"); hdr.write("fmt ",12,"ascii");
hdr.writeUInt32LE(16,16); hdr.writeUInt16LE(1,20);
hdr.writeUInt16LE(CH,22); hdr.writeUInt32LE(SR,24);
hdr.writeUInt32LE(SR*CH*2,28); hdr.writeUInt16LE(CH*2,32);
hdr.writeUInt16LE(16,34); hdr.write("data",36,"ascii");
hdr.writeUInt32LE(pcm.length,40);

writeFileSync("public/bg-music.wav",Buffer.concat([hdr,pcm]));
console.log(`bg-music.wav: ${((44+pcm.length)/1024/1024).toFixed(1)} MB`);
