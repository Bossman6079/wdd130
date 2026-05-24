import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import React from "react";
import { TitleCard } from "./scenes/TitleCard";
import { MomentScene } from "./scenes/MomentScene";
import { ChampionsScene } from "./scenes/ChampionsScene";
import { RecordsScene } from "./scenes/RecordsScene";
import { OutroScene } from "./scenes/OutroScene";
import { StatPanel } from "./scenes/StatPanel";
import { TrophyPanel } from "./scenes/TrophyPanel";
import {
  AgueroVisual, LeicesterVisual, InvinciblesVisual,
  TrebleVisual, LiverpoolVisual, CityHundredVisual,
  CityTreble23Visual, BlackburnVisual, BirthVisual,
} from "./scenes/MomentVisuals";

// Scene durations auto-fitted from piper VO lengths + 2s buffer
// Total: 12090 frames ≈ 6m44s at 30fps
export const SCENES = [
  180,  // 0  Title card
  420,  // 1  What is the PL
  600,  // 2  Birth 1992
  510,  // 3  Man Utd 1993
  510,  // 4  Blackburn 1995
  480,  // 5  Fergie dynasty
  630,  // 6  The Treble 1999
  510,  // 7  United 2000-03
  600,  // 8  Arsenal Invincibles
  660,  // 9  Chelsea revolution
  510,  // 10 United return 07-09
  450,  // 11 City takeover 2008
  900,  // 12 Agüero 93:20
  660,  // 13 Liverpool near miss
  810,  // 14 Leicester miracle
  720,  // 15 City 100 points
  660,  // 16 Liverpool 2020
  660,  // 17 City treble 2023
  600,  // 18 Champions table
  510,  // 19 Records
  510,  // 20 Outro
] as const;

const STARTS = SCENES.reduce<number[]>((acc, dur, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + SCENES[i - 1]);
  return acc;
}, []);

export const TOTAL_FRAMES = SCENES.reduce((a, b) => a + b, 0);

const BLUE = "#00c7ff";

const VO = ({ n }: { n: number }) => (
  <Audio src={staticFile(`vo/scene-${n}.wav`)} volume={1.0} />
);

export const EPLVideo: React.FC = () => {
  return (
    <AbsoluteFill>

      {/* 0 — Title card */}
      <Sequence from={STARTS[0]} durationInFrames={SCENES[0]}>
        <VO n={0} /><TitleCard durationInFrames={SCENES[0]} />
      </Sequence>

      {/* 1 — What is the Premier League? */}
      <Sequence from={STARTS[1]} durationInFrames={SCENES[1]}>
        <VO n={1} />
        <MomentScene
          years="1992 — Present" title="The Premier League"
          champion="The world's most-watched football league" championColor={BLUE}
          facts={[
            "20 clubs compete across a 38-game season, playing each other home and away.",
            "3 clubs are relegated to the Championship; 3 are promoted from below.",
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
          years="1992" title="The Birth of the Premier League"
          champion="22 founding clubs break away" championColor={BLUE}
          facts={[
            "20 February 1992: The Premier League is approved as a fully independent body.",
            "A landmark £304 million, five-year deal with BSkyB transforms football broadcasting.",
            "15 August 1992: The first ever Premier League season kicks off.",
            "Brian Deane of Sheffield United scores the very first Premier League goal.",
          ]}
          visual={<BirthVisual />}
          durationInFrames={SCENES[2]}
        />
      </Sequence>

      {/* 3 — Man Utd 1993 */}
      <Sequence from={STARTS[3]} durationInFrames={SCENES[3]}>
        <VO n={3} />
        <MomentScene
          years="1992 – 1994" title="United's First Double"
          champion="Manchester United · 1993 & 1994" championColor="#DA020E"
          facts={[
            "Manchester United win the inaugural PL title in 1993, ending a 26-year drought.",
            "Eric Cantona joins from Leeds for £1.2m — one of the greatest bargains ever.",
            "1993–94: United win the Double — Premier League and FA Cup — for the first time.",
            "Sir Alex Ferguson builds the foundations of the most dominant dynasty English football has seen.",
          ]}
          visual={<TrophyPanel count={2} label="First two Premier League titles" color="#DA020E" />}
          durationInFrames={SCENES[3]}
        />
      </Sequence>

      {/* 4 — Blackburn 1995 */}
      <Sequence from={STARTS[4]} durationInFrames={SCENES[4]}>
        <VO n={4} />
        <MomentScene
          years="1994 – 1995" title="Blackburn Rovers Shock the World"
          champion="Blackburn Rovers · 1 title" championColor="#009EE0"
          facts={[
            "Jack Walker pours millions into his hometown club, allowing manager Kenny Dalglish to spend big.",
            "Alan Shearer scores 34 Premier League goals — a then-record tally for a single season.",
            "Blackburn clinch the title on the final day as United drop points at West Ham.",
            "It remains Blackburn's only top-flight title — one of the great underdog stories.",
          ]}
          visual={<BlackburnVisual />}
          durationInFrames={SCENES[4]}
        />
      </Sequence>

      {/* 5 — Fergie dynasty */}
      <Sequence from={STARTS[5]} durationInFrames={SCENES[5]}>
        <VO n={5} />
        <MomentScene
          years="1996 – 2001" title="The Fergie Dynasty"
          champion="Manchester United · 4 more titles" championColor="#DA020E"
          facts={[
            "The 'Class of '92' — Beckham, Scholes, Giggs, the Nevilles — become the core of a generation.",
            "Back-to-back titles in 1996 and 1997, with Cantona lifting the trophy in his final season.",
            "1998–99: Ferguson's greatest squad — Yorke, Cole, Keane, Schmeichel — delivers the Treble.",
            "Titles in 2000 and 2001: United win 5 of the first 9 Premier League seasons.",
          ]}
          visual={<TrophyPanel count={5} label="United titles · 1993 to 2001" color="#DA020E" />}
          durationInFrames={SCENES[5]}
        />
      </Sequence>

      {/* 6 — The Treble 1999 */}
      <Sequence from={STARTS[6]} durationInFrames={SCENES[6]}>
        <VO n={6} />
        <MomentScene
          years="1998 – 1999" title="The Treble — An Impossible Season"
          champion="Manchester United · PL + FA Cup + Champions League" championColor="#DA020E"
          facts={[
            "United win the Premier League on the final day, then beat Newcastle 2–0 in the FA Cup final.",
            "Champions League final vs Bayern Munich — United are 1–0 down with 90 minutes played.",
            "Teddy Sheringham equalises in the 91st minute. Ole Gunnar Solskjær wins it in the 93rd.",
            "Sir Alex Ferguson is knighted. The greatest season in English club football history.",
          ]}
          visual={<TrebleVisual />}
          durationInFrames={SCENES[6]}
        />
      </Sequence>

      {/* 7 — United 2000–03 */}
      <Sequence from={STARTS[7]} durationInFrames={SCENES[7]}>
        <VO n={7} />
        <MomentScene
          years="2000 – 2003" title="United's Millennial Dominance"
          champion="Manchester United · 2000, 2001, 2003" championColor="#DA020E"
          facts={[
            "United win titles in 2000 and 2001 with relative ease as rivals struggle to match their depth.",
            "Arsenal break the run in 2001–02 with a stunning Double led by Thierry Henry.",
            "United return in 2002–03: Ruud van Nistelrooy scores 25 league goals to reclaim the title.",
            "8 titles from 11 seasons — an astonishing monopoly on the Premier League trophy.",
          ]}
          visual={<TrophyPanel count={8} label="PL titles in first 11 seasons" color="#DA020E" />}
          durationInFrames={SCENES[7]}
        />
      </Sequence>

      {/* 8 — Arsenal Invincibles */}
      <Sequence from={STARTS[8]} durationInFrames={SCENES[8]}>
        <VO n={8} />
        <MomentScene
          years="2003 – 2004" title="The Invincibles"
          champion="Arsenal · Unbeaten all season" championColor="#EF0107"
          facts={[
            "2003–04: Arsène Wenger's Arsenal go the entire 38-game season without a single defeat.",
            "Final record: 26 wins, 12 draws, 0 losses — 90 points. They also win the FA Cup.",
            "Thierry Henry scores 30 goals; Patrick Vieira anchors midfield; Pires provides 14 assists.",
            "The unbeaten run extends to 49 games across two seasons — an all-time English record.",
          ]}
          visual={<InvinciblesVisual />}
          durationInFrames={SCENES[8]}
        />
      </Sequence>

      {/* 9 — Chelsea revolution */}
      <Sequence from={STARTS[9]} durationInFrames={SCENES[9]}>
        <VO n={9} />
        <MomentScene
          years="2003 – 2006" title="The Chelsea Revolution"
          champion="Chelsea · 2005 & 2006" championColor="#4F7FBE"
          facts={[
            "June 2003: Roman Abramovich purchases Chelsea for £140m, reshaping English football ownership.",
            "Over 18 months Chelsea spend £150m+ — Robben, Drogba, Essien, Makelele, Cech all arrive.",
            "José Mourinho arrives in 2004, declaring himself 'The Special One'. He delivers back-to-back titles.",
            "Chelsea's 2004–05 title: a record 95 points and just 15 goals conceded all season.",
          ]}
          visual={<StatPanel stat="95" label="Points in 2004–05 title season" color="#4F7FBE" subLabel="15 goals conceded — a PL defensive record" />}
          durationInFrames={SCENES[9]}
        />
      </Sequence>

      {/* 10 — United return */}
      <Sequence from={STARTS[10]} durationInFrames={SCENES[10]}>
        <VO n={10} />
        <MomentScene
          years="2006 – 2009" title="United's Champions Return"
          champion="Manchester United · 2007, 2008, 2009" championColor="#DA020E"
          facts={[
            "A new generation arrives: Rooney, Ronaldo, Tevez and Ferdinand form a formidable squad.",
            "Cristiano Ronaldo wins the Ballon d'Or in 2008 after scoring 42 goals in all competitions.",
            "2007–08: United win the Premier League and the Champions League — a second European double.",
            "Three consecutive titles (2007–09) match their own record from the Treble era.",
          ]}
          visual={<StatPanel stat="42" label="Ronaldo goals in 2007–08" color="#DA020E" subLabel="Ballon d'Or · Champions League winner" emoji="⭐" />}
          durationInFrames={SCENES[10]}
        />
      </Sequence>

      {/* 11 — City takeover */}
      <Sequence from={STARTS[11]} durationInFrames={SCENES[11]}>
        <VO n={11} />
        <MomentScene
          years="2008" title="The Abu Dhabi Takeover"
          champion="Manchester City — a new superpower" championColor="#6CABDD"
          facts={[
            "September 2008: Sheikh Mansour's Abu Dhabi United Group buys Manchester City for £210 million.",
            "On deadline day City sign Robinho from Real Madrid for a British-record £32.5m.",
            "City had won just one top-flight title since 1968. The new owners signal unprecedented ambition.",
            "Within four years City will have won their first Premier League title in 44 years.",
          ]}
          visual={<StatPanel stat="£210M" label="Abu Dhabi takeover · 2008" color="#6CABDD" subLabel="The start of a new era" />}
          durationInFrames={SCENES[11]}
        />
      </Sequence>

      {/* 12 — Agüero goal */}
      <Sequence from={STARTS[12]} durationInFrames={SCENES[12]}>
        <VO n={12} />
        <MomentScene
          years="2011 – 2012" title="Agüeroooo!"
          champion="Manchester City · First title in 44 years" championColor="#6CABDD"
          facts={[
            "Final day, May 2012: City need to beat QPR. United have already won their match. City trail 2–1.",
            "Dzeko equalises in the 92nd minute — but City still need one more goal.",
            "93 minutes and 20 seconds: Agüero controls, swivels, shoots. 3–2. City are champions.",
            "Martin Tyler: 'AGUEROOOO!' — the most iconic commentary moment in Premier League history.",
          ]}
          visual={<AgueroVisual />}
          durationInFrames={SCENES[12]}
        />
      </Sequence>

      {/* 13 — Liverpool near miss */}
      <Sequence from={STARTS[13]} durationInFrames={SCENES[13]}>
        <VO n={13} />
        <MomentScene
          years="2013 – 2014" title="Liverpool's Heartbreak"
          champion="Manchester City win · Liverpool so close" championColor="#C8102E"
          facts={[
            "Liverpool are electric: Suárez scores 31 goals, Sturridge 21 more.",
            "Brendan Rodgers' side lead the table with 3 games to go.",
            "Captain Steven Gerrard slips on his own pitch against Chelsea. Liverpool lose 2–0.",
            "City capitalise to win the title by just 2 points. Liverpool finish with 84 — still not enough.",
          ]}
          visual={<StatPanel stat="2 PTS" label="Liverpool's title margin miss · 2014" color="#C8102E" subLabel="84 points — and still not enough" emoji="😞" />}
          durationInFrames={SCENES[13]}
        />
      </Sequence>

      {/* 14 — Leicester miracle */}
      <Sequence from={STARTS[14]} durationInFrames={SCENES[14]}>
        <VO n={14} />
        <MomentScene
          years="2015 – 2016" title="The Leicester Miracle"
          champion="Leicester City · 5000/1 outsiders" championColor="#FDBE11"
          facts={[
            "Bookmakers set Leicester's pre-season odds at 5000/1 — the same as Elvis being found alive.",
            "Claudio Ranieri, N'Golo Kanté, Jamie Vardy and Riyad Mahrez form an unstoppable unit.",
            "Vardy breaks the record for scoring in 11 consecutive Premier League games.",
            "They win the title with two games to spare — the greatest sporting upset in history.",
          ]}
          visual={<LeicesterVisual />}
          durationInFrames={SCENES[14]}
        />
      </Sequence>

      {/* 15 — City 100 points */}
      <Sequence from={STARTS[15]} durationInFrames={SCENES[15]}>
        <VO n={15} />
        <MomentScene
          years="2017 – 2018" title="Pep's Perfect Season"
          champion="Manchester City · 100 points" championColor="#6CABDD"
          facts={[
            "Pep Guardiola arrives at City in 2016 and immediately revolutionises their style.",
            "2017–18: City win with a record 100 points — 32 wins, 4 draws, 2 losses.",
            "They score 106 goals, the most ever in a Premier League season, with De Bruyne orchestrating.",
            "City finish 19 points clear — the most dominant title victory in Premier League history.",
          ]}
          visual={<CityHundredVisual />}
          durationInFrames={SCENES[15]}
        />
      </Sequence>

      {/* 16 — Liverpool 2020 */}
      <Sequence from={STARTS[16]} durationInFrames={SCENES[16]}>
        <VO n={16} />
        <MomentScene
          years="2019 – 2020" title="Liverpool's 30-Year Wait Ends"
          champion="Liverpool · 99 points" championColor="#C8102E"
          facts={[
            "Jürgen Klopp's Liverpool finally end their 30-year wait for the league title.",
            "Liverpool wrap up the title with 7 games to spare — finishing with 99 points.",
            "The season is partly played in empty stadiums due to the COVID-19 pandemic.",
            "Salah, Mané, Firmino and a rock-solid defence power Liverpool all season long.",
          ]}
          visual={<LiverpoolVisual />}
          durationInFrames={SCENES[16]}
        />
      </Sequence>

      {/* 17 — City treble 2023 */}
      <Sequence from={STARTS[17]} durationInFrames={SCENES[17]}>
        <VO n={17} />
        <MomentScene
          years="2021 – 2023" title="City's Historic Treble"
          champion="Manchester City · 2021, 2022, 2023" championColor="#6CABDD"
          facts={[
            "Under Guardiola, City win 3 consecutive Premier League titles in 2021, 2022 and 2023.",
            "Erling Haaland arrives in 2022 and scores 36 Premier League goals in his debut season.",
            "2022–23: City become only the second English club ever to win the Treble.",
            "Seven Premier League titles since 2012 — City are the defining club of the modern era.",
          ]}
          visual={<CityTreble23Visual />}
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
