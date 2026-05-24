import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import React from "react";
import { TitleCard } from "./scenes/TitleCard";
import { MomentScene } from "./scenes/MomentScene";
import { ChampionsScene } from "./scenes/ChampionsScene";
import { RecordsScene } from "./scenes/RecordsScene";
import { OutroScene } from "./scenes/OutroScene";
import { StatPanel } from "./scenes/StatPanel";
import { TrophyPanel } from "./scenes/TrophyPanel";

// Scene durations auto-fitted to voiceover lengths (VO duration + 2s buffer, rounded to whole seconds)
// Total: 10470 frames = ~5m49s
export const SCENES = [
  180,  // 0  Title card              (6s  – short dramatic opener)
  420,  // 1  What is the PL         (14s – VO 9.9s)
  480,  // 2  Birth 1992             (16s – VO 13.8s)
  450,  // 3  Man Utd 1993           (15s – VO 12.9s)
  450,  // 4  Blackburn 1995         (15s – VO 12.1s)
  420,  // 5  Fergie dynasty         (14s – VO 11.8s)
  570,  // 6  The Treble 1999        (19s – VO 16.6s)
  450,  // 7  United 2000-03         (15s – VO 12.8s)
  510,  // 8  Arsenal Invincibles    (17s – VO 14.8s)
  510,  // 9  Chelsea revolution     (17s – VO 14.8s)
  450,  // 10 United return 07-09    (15s – VO 12.4s)
  420,  // 11 City takeover 2008     (14s – VO 11.0s)
  690,  // 12 Agüero 93:20           (23s – VO 20.4s)
  510,  // 13 Liverpool near miss    (17s – VO 14.0s)
  690,  // 14 Leicester miracle      (23s – VO 20.9s)
  570,  // 15 City 100 points        (19s – VO 16.1s)
  540,  // 16 Liverpool 2020         (18s – VO 16.0s)
  630,  // 17 City treble 2023       (21s – VO 18.0s)
  570,  // 18 Champions table        (19s – VO 16.3s)
  480,  // 19 Records                (16s – VO 13.2s)
  480,  // 20 Outro                  (16s – VO 12.3s)
] as const;

// Cumulative start offsets
const STARTS = SCENES.reduce<number[]>((acc, dur, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + SCENES[i - 1]);
  return acc;
}, []);

export const TOTAL_FRAMES = SCENES.reduce((a, b) => a + b, 0);

const BLUE = "#00c7ff";

// Voiceover helper — plays the scene's narration WAV from the start of the Sequence
const VO = ({ n }: { n: number }) => (
  <Audio src={staticFile(`vo/scene-${n}.wav`)} volume={1.0} />
);

export const EPLVideo: React.FC = () => {
  return (
    <AbsoluteFill>

      {/* 0 — Title card */}
      <Sequence from={STARTS[0]} durationInFrames={SCENES[0]}>
        <VO n={0} />
        <TitleCard durationInFrames={SCENES[0]} />
      </Sequence>

      {/* 1 — What is the Premier League? */}
      <Sequence from={STARTS[1]} durationInFrames={SCENES[1]}>
        <VO n={1} />
        <MomentScene
          years="1992 — Present"
          title="The Premier League"
          champion="The world's most-watched football league"
          championColor={BLUE}
          facts={[
            "20 clubs compete across a 38-game season, playing each other home and away.",
            "3 clubs are relegated to the Championship each season; 3 are promoted from below.",
            "Over 4.7 billion people across 188 countries tune in every season.",
            "The league generates over £5 billion per year in broadcast revenue alone.",
          ]}
          visual={<StatPanel stat="20" label="Clubs · 380 matches per season" color={BLUE} subLabel="3 up · 3 down" emoji="⚽" />}
          durationInFrames={SCENES[1]}
        />
      </Sequence>

      {/* 2 — Birth 1992 */}
      <Sequence from={STARTS[2]} durationInFrames={SCENES[2]}>
        <VO n={2} />
        <MomentScene
          years="1992"
          title="The Birth of the Premier League"
          champion="22 founding clubs break away"
          championColor={BLUE}
          facts={[
            "20 February 1992: The Football Association approves the Premier League as a fully independent body.",
            "A landmark £304 million, five-year deal with BSkyB revolutionised football broadcasting forever.",
            "The first season kicked off on 15 August 1992 — Brian Deane of Sheffield United scored the very first goal.",
            "Leeds United were the reigning First Division champions entering the new era.",
          ]}
          visual={<StatPanel stat="£304M" label="First TV deal · BSkyB 1992" color={BLUE} subLabel="Changed football forever" />}
          durationInFrames={SCENES[2]}
        />
      </Sequence>

      {/* 3 — Man Utd 1993 */}
      <Sequence from={STARTS[3]} durationInFrames={SCENES[3]}>
        <VO n={3} />
        <MomentScene
          years="1992 – 1994"
          title="United's First Double"
          champion="Manchester United · 1993 & 1994"
          championColor="#DA020E"
          facts={[
            "Manchester United win the inaugural Premier League title in 1992–93, ending a 26-year league drought.",
            "Eric Cantona joins from Leeds in November 1992 for just £1.2m — one of the greatest bargains ever.",
            "1993–94: United win the Double — Premier League and FA Cup — for the first time in the club's history.",
            "Sir Alex Ferguson builds the foundations of the most dominant dynasty English football has ever seen.",
          ]}
          visual={<TrophyPanel count={2} label="First two Premier League titles" color="#DA020E" />}
          durationInFrames={SCENES[3]}
        />
      </Sequence>

      {/* 4 — Blackburn 1995 */}
      <Sequence from={STARTS[4]} durationInFrames={SCENES[4]}>
        <VO n={4} />
        <MomentScene
          years="1994 – 1995"
          title="Blackburn Rovers Shock the World"
          champion="Blackburn Rovers · 1 title"
          championColor="#009EE0"
          facts={[
            "Jack Walker pours millions into his hometown club, allowing manager Kenny Dalglish to spend big.",
            "Alan Shearer scores 34 Premier League goals in the title season — a then-record tally.",
            "Blackburn clinch the title on the final day as Manchester United drop points at West Ham.",
            "It remains Blackburn's only top-flight title — and one of the great underdog stories.",
          ]}
          visual={<StatPanel stat="34" label="Shearer's goals · 1994–95" color="#009EE0" subLabel="A then Premier League record" emoji="🥅" />}
          durationInFrames={SCENES[4]}
        />
      </Sequence>

      {/* 5 — Fergie dynasty */}
      <Sequence from={STARTS[5]} durationInFrames={SCENES[5]}>
        <VO n={5} />
        <MomentScene
          years="1996 – 2001"
          title="The Fergie Dynasty"
          champion="Manchester United · 4 more titles"
          championColor="#DA020E"
          facts={[
            "1996: The 'Class of '92' — Beckham, Scholes, Giggs, the Nevilles — become the core of a generation.",
            "United win back-to-back titles in 1996 and 1997, with Cantona lifting the trophy in his final season.",
            "1998–99: Ferguson's greatest squad — Yorke, Cole, Keane, Schmeichel — delivers the Treble.",
            "Titles in 2000 and 2001 cement United's status as the decade's dominant force, winning 5 in 7 years.",
          ]}
          visual={<TrophyPanel count={5} label="United titles · 1993 to 2001" color="#DA020E" />}
          durationInFrames={SCENES[5]}
        />
      </Sequence>

      {/* 6 — The Treble 1999 */}
      <Sequence from={STARTS[6]} durationInFrames={SCENES[6]}>
        <VO n={6} />
        <MomentScene
          years="1998 – 1999"
          title="The Treble — An Impossible Season"
          champion="Manchester United · PL + FA Cup + CL"
          championColor="#DA020E"
          facts={[
            "United win the Premier League on the final day, then beat Newcastle 2–0 in the FA Cup final.",
            "In the Champions League final against Bayern Munich, United are 1–0 down with 90 minutes played.",
            "Teddy Sheringham equalises in the 91st minute. Ole Gunnar Solskjær wins it in the 93rd. 2–1.",
            "Sir Alex Ferguson is knighted. It remains the greatest season in English club football history.",
          ]}
          visual={<StatPanel stat="91+3" label="Solskjær scores — 1999 CL Final" color="#DA020E" subLabel="The most extraordinary comeback in football" emoji="🏆" />}
          durationInFrames={SCENES[6]}
        />
      </Sequence>

      {/* 7 — United 2000–03 */}
      <Sequence from={STARTS[7]} durationInFrames={SCENES[7]}>
        <VO n={7} />
        <MomentScene
          years="2000 – 2003"
          title="United's Millennial Dominance"
          champion="Manchester United · 2000, 2001, 2003"
          championColor="#DA020E"
          facts={[
            "United win titles in 2000 and 2001 with relative ease as rivals struggle to match their depth.",
            "Arsenal break the run in 2001–02, with Thierry Henry and Patrick Vieira leading a stunning Double.",
            "United return in 2002–03: Ruud van Nistelrooy scores 25 league goals to reclaim the title.",
            "By 2003, United have won 8 of the first 11 Premier League titles — an astonishing monopoly.",
          ]}
          visual={<TrophyPanel count={8} label="PL titles in first 11 seasons" color="#DA020E" />}
          durationInFrames={SCENES[7]}
        />
      </Sequence>

      {/* 8 — Arsenal Invincibles */}
      <Sequence from={STARTS[8]} durationInFrames={SCENES[8]}>
        <VO n={8} />
        <MomentScene
          years="2003 – 2004"
          title="The Invincibles"
          champion="Arsenal · Unbeaten all season"
          championColor="#EF0107"
          facts={[
            "2003–04: Arsène Wenger's Arsenal go the entire 38-game season without a single defeat.",
            "The final record: 26 wins, 12 draws, 0 losses — 90 points. They also win the FA Cup.",
            "Thierry Henry scores 30 goals; Patrick Vieira anchors midfield. Robert Pires adds 14 assists.",
            "The unbeaten run stretches to 49 games across two seasons — still an all-time English record.",
          ]}
          visual={<StatPanel stat="49" label="Consecutive unbeaten league games" color="#EF0107" subLabel="An all-time English football record" emoji="🔴" />}
          durationInFrames={SCENES[8]}
        />
      </Sequence>

      {/* 9 — Chelsea revolution */}
      <Sequence from={STARTS[9]} durationInFrames={SCENES[9]}>
        <VO n={9} />
        <MomentScene
          years="2003 – 2006"
          title="The Chelsea Revolution"
          champion="Chelsea · 2005 & 2006"
          championColor="#4F7FBE"
          facts={[
            "June 2003: Roman Abramovich purchases Chelsea for £140m, transforming English football ownership.",
            "In 18 months Chelsea spend over £150m — Robben, Drogba, Essien, Makelele, Cech all arrive.",
            "José Mourinho arrives in 2004, declaring himself 'The Special One'. He delivers back-to-back titles.",
            "Chelsea's 2004–05 title is won with a record 95 points and just 15 goals conceded all season.",
          ]}
          visual={<StatPanel stat="95" label="Points in 2004–05 title season" color="#4F7FBE" subLabel="15 goals conceded — a PL defensive record" />}
          durationInFrames={SCENES[9]}
        />
      </Sequence>

      {/* 10 — United return */}
      <Sequence from={STARTS[10]} durationInFrames={SCENES[10]}>
        <VO n={10} />
        <MomentScene
          years="2006 – 2009"
          title="United's Champions Return"
          champion="Manchester United · 2007, 2008, 2009"
          championColor="#DA020E"
          facts={[
            "A new generation arrives at Old Trafford: Rooney, Ronaldo, Tevez and Ferdinand form a powerhouse.",
            "Cristiano Ronaldo wins the Ballon d'Or in 2008 after scoring 42 goals in all competitions.",
            "2007–08: United win the Premier League and the Champions League — a second European double.",
            "Three consecutive league titles (2007, 08, 09) match their own record from the Treble era.",
          ]}
          visual={<StatPanel stat="42" label="Ronaldo goals in 2007–08" color="#DA020E" subLabel="Ballon d'Or · Champions League winner" emoji="⭐" />}
          durationInFrames={SCENES[10]}
        />
      </Sequence>

      {/* 11 — City takeover */}
      <Sequence from={STARTS[11]} durationInFrames={SCENES[11]}>
        <VO n={11} />
        <MomentScene
          years="2008"
          title="The Abu Dhabi Takeover"
          champion="Manchester City — a new superpower"
          championColor="#6CABDD"
          facts={[
            "September 2008: Sheikh Mansour's Abu Dhabi United Group buys Manchester City for £210 million.",
            "On deadline day of the same window, City sign Robinho from Real Madrid for a British-record £32.5m.",
            "City had won just one top-flight title since 1968. The new owners signal unprecedented ambition.",
            "Within four years, City will have won their first Premier League title in 44 years.",
          ]}
          visual={<StatPanel stat="£210M" label="Abu Dhabi takeover · 2008" color="#6CABDD" subLabel="The start of a new era" />}
          durationInFrames={SCENES[11]}
        />
      </Sequence>

      {/* 12 — Agüero */}
      <Sequence from={STARTS[12]} durationInFrames={SCENES[12]}>
        <VO n={12} />
        <MomentScene
          years="2011 – 2012"
          title="Agüeroooo!"
          champion="Manchester City · First title in 44 years"
          championColor="#6CABDD"
          facts={[
            "May 2012: City need to beat QPR on the final day. United have already won their game. City trail 2–1.",
            "Edin Džeko pulls one back. Then, in the 93rd minute and 20 seconds, Sergio Agüero fires home.",
            "City win 3–2. They take the title on goal difference from United — by +8 goals.",
            "Martin Tyler's commentary — 'AGUEROOOO!' — is one of the most iconic moments in sports history.",
          ]}
          visual={<StatPanel stat="93:20" label="Agüero's title-winning goal" color="#6CABDD" subLabel="Man City 3–2 QPR · 13 May 2012" emoji="💙" />}
          durationInFrames={SCENES[12]}
        />
      </Sequence>

      {/* 13 — Liverpool near miss */}
      <Sequence from={STARTS[13]} durationInFrames={SCENES[13]}>
        <VO n={13} />
        <MomentScene
          years="2013 – 2014"
          title="Liverpool's Heartbreak"
          champion="Manchester City win · Liverpool so close"
          championColor="#C8102E"
          facts={[
            "Liverpool are electric in 2013–14: Luis Suárez scores 31 goals, Daniel Sturridge 21 more.",
            "Brendan Rodgers' side lead the table with 3 games to go — seemingly set for their first title in 24 years.",
            "Captain Steven Gerrard slips at a crucial moment against Chelsea. Liverpool lose 2–0.",
            "City capitalise to win the title by 2 points. Liverpool finish with 84 points — still not enough.",
          ]}
          visual={<StatPanel stat="2 PTS" label="Liverpool's title margin miss · 2014" color="#C8102E" subLabel="84 points — and still not enough" emoji="😞" />}
          durationInFrames={SCENES[13]}
        />
      </Sequence>

      {/* 14 — Leicester miracle */}
      <Sequence from={STARTS[14]} durationInFrames={SCENES[14]}>
        <VO n={14} />
        <MomentScene
          years="2015 – 2016"
          title="The Leicester Miracle"
          champion="Leicester City · 5000/1 outsiders"
          championColor="#FDBE11"
          facts={[
            "Bookmakers set Leicester's pre-season odds at 5000/1 — the same as Elvis being found alive.",
            "Manager Claudio Ranieri, N'Golo Kanté, Jamie Vardy and Riyad Mahrez form an unstoppable unit.",
            "Vardy breaks the record for scoring in 11 consecutive Premier League games during the title run.",
            "They win the title with two games to spare — universally celebrated as the greatest sporting upset ever.",
          ]}
          visual={<StatPanel stat="5000/1" label="Pre-season title odds" color="#FDBE11" subLabel="The greatest sporting upset of all time" emoji="🦊" />}
          durationInFrames={SCENES[14]}
        />
      </Sequence>

      {/* 15 — City 100 points */}
      <Sequence from={STARTS[15]} durationInFrames={SCENES[15]}>
        <VO n={15} />
        <MomentScene
          years="2017 – 2018"
          title="Pep's Perfect Season"
          champion="Manchester City · 100 points"
          championColor="#6CABDD"
          facts={[
            "Pep Guardiola arrives at City in 2016 and immediately revolutionises their style and squad.",
            "2017–18: City win the title with a then-record 100 points from 38 games — 32 wins, 4 draws, 2 losses.",
            "They also score 106 goals — the most ever in a Premier League season — with Kevin De Bruyne orchestrating.",
            "City finish 19 points ahead of second-placed United. The most dominant title victory in PL history.",
          ]}
          visual={<StatPanel stat="100" label="Record points in a PL season" color="#6CABDD" subLabel="City 2017–18 · 19 points clear" emoji="🔵" />}
          durationInFrames={SCENES[15]}
        />
      </Sequence>

      {/* 16 — Liverpool 2020 */}
      <Sequence from={STARTS[16]} durationInFrames={SCENES[16]}>
        <VO n={16} />
        <MomentScene
          years="2019 – 2020"
          title="Liverpool's 30-Year Wait Ends"
          champion="Liverpool · 99 points"
          championColor="#C8102E"
          facts={[
            "Jürgen Klopp's Liverpool finally end their 30-year wait, wrapping up the title with 7 games to spare.",
            "Liverpool finish with 99 points — the second-highest total in Premier League history.",
            "The season is partly played behind closed doors due to the COVID-19 pandemic.",
            "Mohamed Salah, Sadio Mané, Roberto Firmino and a rock-solid defence power Liverpool all season.",
          ]}
          visual={<StatPanel stat="30" label="Years since their last league title" color="#C8102E" subLabel="2019–20 champions · 99 points" emoji="🔴" />}
          durationInFrames={SCENES[16]}
        />
      </Sequence>

      {/* 17 — City treble 2023 */}
      <Sequence from={STARTS[17]} durationInFrames={SCENES[17]}>
        <VO n={17} />
        <MomentScene
          years="2021 – 2023"
          title="City's Historic Treble"
          champion="Manchester City · 2021, 2022, 2023"
          championColor="#6CABDD"
          facts={[
            "Under Guardiola, City win 3 consecutive Premier League titles in 2021, 2022 and 2023.",
            "Erling Haaland arrives in 2022 and scores 36 Premier League goals in his debut season — a new record.",
            "2022–23: City become only the second English club ever to win the Treble (PL, FA Cup, Champions League).",
            "City have now won 7 Premier League titles since 2012 — more than any other club in the era.",
          ]}
          visual={<StatPanel stat="36" label="Haaland PL goals · debut season 2022–23" color="#6CABDD" subLabel="A new Premier League record" emoji="🏆" />}
          durationInFrames={SCENES[17]}
        />
      </Sequence>

      {/* 18 — Champions table */}
      <Sequence from={STARTS[18]} durationInFrames={SCENES[18]}>
        <VO n={18} />
        <ChampionsScene durationInFrames={SCENES[18]} />
      </Sequence>

      {/* 19 — Records */}
      <Sequence from={STARTS[19]} durationInFrames={SCENES[19]}>
        <VO n={19} />
        <RecordsScene durationInFrames={SCENES[19]} />
      </Sequence>

      {/* 20 — Outro */}
      <Sequence from={STARTS[20]} durationInFrames={SCENES[20]}>
        <VO n={20} />
        <OutroScene durationInFrames={SCENES[20]} />
      </Sequence>

    </AbsoluteFill>
  );
};
