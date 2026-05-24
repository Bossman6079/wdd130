// Generates voiceover WAV files for each scene using espeak-ng
import { execSync } from "child_process";
import { mkdirSync } from "fs";

mkdirSync("public/vo", { recursive: true });

// Voice settings: British English, measured pace, warm tone
const VOICE = "en-gb";
const SPEED = 142;   // words per minute-ish
const AMP   = 185;
const GAP   = 8;     // ms gap between sentences

const lines = [
  // 0 — Title (6s) — short dramatic opener
  [0, `Welcome... to the story of the Premier League.`],

  // 1 — What is the PL (14s)
  [1, `Twenty clubs. Three hundred and eighty matches. Four point seven billion viewers in a hundred and eighty-eight countries. The Premier League is the most-watched sporting event on the planet — and this is how it began.`],

  // 2 — Birth 1992 (14s)
  [2, `February nineteen ninety-two. Twenty-two First Division clubs make a bold decision — they break away from the old Football League and form the Premier League. A three hundred and four million pound television deal with BSkyB changes football forever. On the fifteenth of August, the curtain rises.`],

  // 3 — Man Utd 1993 (14s)
  [3, `Manchester United win the very first Premier League title in nineteen ninety-three — ending a twenty-six-year wait for a league championship. Then they do it again. And again. Sir Alex Ferguson and Eric Cantona are just getting started — and English football would never be the same.`],

  // 4 — Blackburn 1995 (12s)
  [4, `But in nineteen ninety-five, someone dares to interrupt. Blackburn Rovers — backed by local millionaire Jack Walker — stun the football world. Alan Shearer scores thirty-four goals. On the final day, Blackburn are champions. Their only ever top-flight title.`],

  // 5 — Fergie dynasty (14s)
  [5, `Then comes the dynasty. Beckham. Scholes. Giggs. The Neville brothers. Ferguson's Class of Ninety-Two — the greatest group of homegrown talents English football has ever produced. United win five titles in seven years. They are untouchable.`],

  // 6 — Treble 1999 (18s)
  [6, `But their greatest night comes in Barcelona. Twenty-sixth of May, nineteen ninety-nine. United trail Bayern Munich one-nil in the Champions League final. Ninety minutes played. The board shows three minutes of stoppage time. Sheringham scores. Then — Solskjaer. Two-one. The Treble. The most extraordinary three minutes in English football history.`],

  // 7 — United 2000-03 (14s)
  [7, `United keep winning — two thousand, two thousand and one, two thousand and three. Eight titles from eleven seasons. Arsenal briefly interrupt with a Double in two thousand and two — but Ferguson simply rebuilds and comes back stronger. This is what dynasties do.`],

  // 8 — Arsenal Invincibles (16s)
  [8, `Two thousand and four. Arsene Wenger's Arsenal achieve something no team had done in over a century of English football. Thirty-eight games. Not one single defeat. The Invincibles. Thierry Henry, Patrick Vieira, Robert Pires — they extend the run to forty-nine unbeaten. A record that stands to this day.`],

  // 9 — Chelsea revolution (14s)
  [9, `Then Roman Abramovich arrives — and rewrites the rules. A hundred and forty million pounds for Chelsea. Hundreds of millions more on players. Jose Mourinho steps off the plane at Heathrow and announces — quote — "I am a Special One." He proves it. Back-to-back titles. A new power is born.`],

  // 10 — United return (14s)
  [10, `But Ferguson is not finished. Cristiano Ronaldo. Wayne Rooney. Rio Ferdinand. United win three consecutive titles and conquer Europe again in two thousand and eight. Ronaldo wins the Ballon d'Or with forty-two goals. Old Trafford roars once more.`],

  // 11 — City takeover (10s)
  [11, `September two thousand and eight. Sheikh Mansour bin Zayed Al Nahyan purchases Manchester City for two hundred and ten million pounds. Few people realise it yet — but the balance of power in English football has just permanently shifted.`],

  // 12 — Agüero 93:20 (18s)
  [12, `The thirteenth of May, two thousand and twelve. City versus QPR. Final day of the season. United have already won their match. City trail two-one. Dzeko makes it two-all. And then — ninety-three minutes and twenty seconds — Sergio Agüero controls, swivels, and fires. Three-two. Manchester City are champions. Martin Tyler's voice breaks: AGUEROOOO! The greatest moment in Premier League history.`],

  // 13 — Liverpool 2014 (12s)
  [13, `Two thousand and fourteen brings heartbreak to Anfield. Liverpool are electric — Suárez, Sturridge, Gerrard — but with three games to go, captain Steven Gerrard slips on his own pitch against Chelsea. Two-nil. City capitalise. The title is gone by just two points. Liverpool are devastated.`],

  // 14 — Leicester miracle (20s)
  [14, `And then — the miracle. Leicester City enter the two thousand and fifteen to sixteen season at five thousand to one odds. The same odds as Elvis Presley being found alive. But Claudio Ranieri, Jamie Vardy, and N'Golo Kante do not care about odds. Vardy scores in eleven consecutive games. They win the title with two matches to spare. The entire football world stops and stares. It is the greatest sporting upset in history.`],

  // 15 — City 100 points (14s)
  [15, `Pep Guardiola arrives at City in two thousand and sixteen and breaks everything. In two thousand and seventeen to eighteen, his team win one hundred points from thirty-eight games. One hundred. They score a hundred and six goals. They finish nineteen points clear. It is the most dominant title season English football has ever witnessed.`],

  // 16 — Liverpool 2020 (14s)
  [16, `And then — thirty years of waiting ends. Jurgen Klopp's Liverpool, powered by Salah, Mane and Firmino, clinch the two thousand and nineteen to twenty title with seven games to spare. The season is played in empty stadiums — because of the COVID pandemic. But nothing can diminish the magnitude of this moment. Liverpool are champions.`],

  // 17 — City treble 2023 (16s)
  [17, `Erling Haaland arrives at City in two thousand and twenty-two — and scores thirty-six Premier League goals in his debut season. A new record. City win the title. Then the FA Cup. Then the Champions League. The Treble. Only the second English club ever to do it. Seven Premier League titles since two thousand and twelve. Pep's City are the team of the era.`],

  // 18 — Champions table (16s)
  [18, `Thirteen titles for Manchester United. Seven for Manchester City. Five for Chelsea. Three for Arsenal. One each for Blackburn Rovers, Leicester City and Liverpool. Thirty-two seasons. Seven different champions. But only one truly dominant force across the era — the Red Devils of Old Trafford and now the sky blues of the Etihad.`],

  // 19 — Records (14s)
  [19, `One hundred points. Forty-nine games unbeaten. Thirty-six goals by one striker in a single season. Aguero at ninety-three twenty. Leicester at five thousand to one. These are not just statistics. They are the moments that made the Premier League the greatest football league on earth.`],

  // 20 — Outro (16s)
  [20, `From Brian Deane's first goal in August nineteen ninety-two — to a global audience of billions today. The Premier League has given us drama, heartbreak, miracles and moments of pure genius. The Beautiful Game continues. And the next chapter... has not yet been written.`],
];

for (const [idx, text] of lines) {
  const out = `public/vo/scene-${idx}.wav`;
  const cmd = `espeak-ng -v ${VOICE} -s ${SPEED} -a ${AMP} -g ${GAP} ${JSON.stringify(text)} -w ${out}`;
  execSync(cmd);
  console.log(`✓ scene-${idx}.wav`);
}

console.log("\nAll voiceover files generated.");
