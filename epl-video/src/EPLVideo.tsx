import { AbsoluteFill, Sequence } from "remotion";
import React from "react";
import { TitleCard } from "./scenes/TitleCard";
import { EraScene } from "./scenes/EraScene";
import { ChampionsScene } from "./scenes/ChampionsScene";
import { OutroScene } from "./scenes/OutroScene";

export const TITLE_DUR = 120;  // 4s
export const ERA_DUR = 270;    // 9s each × 6 eras
export const CHAMPS_DUR = 300; // 10s
export const OUTRO_DUR = 180;  // 6s

export const EPLVideo: React.FC = () => {
  let offset = 0;

  const next = (dur: number) => {
    const from = offset;
    offset += dur;
    return from;
  };

  const titleStart = next(TITLE_DUR);
  const era1Start = next(ERA_DUR);
  const era2Start = next(ERA_DUR);
  const era3Start = next(ERA_DUR);
  const era4Start = next(ERA_DUR);
  const era5Start = next(ERA_DUR);
  const era6Start = next(ERA_DUR);
  const champsStart = next(CHAMPS_DUR);
  const outroStart = next(OUTRO_DUR);

  return (
    <AbsoluteFill>
      {/* 1 — Title card */}
      <Sequence from={titleStart} durationInFrames={TITLE_DUR}>
        <TitleCard durationInFrames={TITLE_DUR} />
      </Sequence>

      {/* 2 — Origins 1992 */}
      <Sequence from={era1Start} durationInFrames={ERA_DUR}>
        <EraScene
          years="1992"
          title="The Birth of the Premier League"
          champion="A new era begins"
          championColor="#00c7ff"
          facts={[
            "In February 1992, 22 First Division clubs broke away from the Football League to form an independent Premier League.",
            "A landmark £304 million TV deal with BSkyB transformed English football into a global spectacle.",
            "The very first Premier League season kicked off on 15 August 1992 — 22 clubs, one dream.",
            "Brian Deane of Sheffield United scored the historic first ever Premier League goal on the opening day.",
          ]}
          durationInFrames={ERA_DUR}
        />
      </Sequence>

      {/* 3 — Man Utd dominance 1993–2003 */}
      <Sequence from={era2Start} durationInFrames={ERA_DUR}>
        <EraScene
          years="1993 – 2003"
          title="United's Dominance Begins"
          champion="Manchester United · 8 of 11 titles"
          championColor="#DA020E"
          facts={[
            "Sir Alex Ferguson's Manchester United win 8 of the first 11 Premier League titles, defining a dynasty.",
            "1994: United claim the Double — Premier League and FA Cup — for the first time in 26 years.",
            "1999: The Treble. United win the Premier League, FA Cup, and Champions League in one historic season.",
            "1994–95: Blackburn Rovers, bankrolled by Jack Walker, deny United and claim their only ever PL title.",
          ]}
          durationInFrames={ERA_DUR}
        />
      </Sequence>

      {/* 4 — Arsenal Invincibles + Chelsea revolution */}
      <Sequence from={era3Start} durationInFrames={ERA_DUR}>
        <EraScene
          years="2003 – 2010"
          title="Invincibles & the Chelsea Revolution"
          champion="Arsenal 2004 · Chelsea 2005, 2006"
          championColor="#034694"
          facts={[
            "2003–04: Arsenal's 'Invincibles' go the entire 38-game season unbeaten, finishing with 90 points.",
            "Arsenal set the all-time record of 49 unbeaten league games across two seasons — never since matched.",
            "2003: Roman Abramovich buys Chelsea for £140m, ushering in the era of mega-rich club ownership.",
            "José Mourinho's Chelsea win back-to-back titles in 2005 and 2006, declaring himself 'The Special One'.",
          ]}
          durationInFrames={ERA_DUR}
        />
      </Sequence>

      {/* 5 — City rise & Agüero */}
      <Sequence from={era4Start} durationInFrames={ERA_DUR}>
        <EraScene
          years="2011 – 2015"
          title="City's Rise & the Agüero Moment"
          champion="Manchester City · 2012, 2014"
          championColor="#6CABDD"
          facts={[
            "2012: Manchester City win their first title in 44 years on goal difference from United — in stoppage time.",
            "Sergio Agüero's 93:20 goal against QPR is the most dramatic moment in Premier League history.",
            "City under Manuel Pellegrini win the 2013–14 title, scoring 102 league goals — a new Premier League record.",
            "2013–14: Liverpool's Luis Suárez scores 31 goals yet the Reds miss the title by just 2 points.",
          ]}
          durationInFrames={ERA_DUR}
        />
      </Sequence>

      {/* 6 — Leicester miracle */}
      <Sequence from={era5Start} durationInFrames={ERA_DUR}>
        <EraScene
          years="2015 – 2016"
          title="The Leicester Miracle"
          champion="Leicester City · 5000/1 outsiders"
          championColor="#FDBE11"
          facts={[
            "Rated 5000/1 outsiders before the season, Leicester City defy every statistic to win the 2015–16 title.",
            "Manager Claudio Ranieri and striker Jamie Vardy lead the Foxes on an unforgettable fairytale campaign.",
            "Jamie Vardy breaks the record by scoring in 11 consecutive Premier League games during the title run.",
            "Universally celebrated as the greatest sporting upset of all time, it changed what we believe is possible.",
          ]}
          durationInFrames={ERA_DUR}
        />
      </Sequence>

      {/* 7 — Pep era */}
      <Sequence from={era6Start} durationInFrames={ERA_DUR}>
        <EraScene
          years="2016 – 2024"
          title="The Pep Guardiola Era"
          champion="Manchester City · 5 titles in 6 seasons"
          championColor="#6CABDD"
          facts={[
            "Pep Guardiola arrives at Manchester City in 2016, rebuilding the club into the most dominant force in England.",
            "2017–18: City set the all-time record of 100 points from 38 games — a mark of total dominance.",
            "2019–20: Liverpool under Jürgen Klopp win the title with 99 points — their first league crown in 30 years.",
            "2022–23: City become only the second English club ever to win the Treble (PL, FA Cup, Champions League).",
          ]}
          durationInFrames={ERA_DUR}
        />
      </Sequence>

      {/* 8 — Champions table */}
      <Sequence from={champsStart} durationInFrames={CHAMPS_DUR}>
        <ChampionsScene durationInFrames={CHAMPS_DUR} />
      </Sequence>

      {/* 9 — Outro */}
      <Sequence from={outroStart} durationInFrames={OUTRO_DUR}>
        <OutroScene durationInFrames={OUTRO_DUR} />
      </Sequence>
    </AbsoluteFill>
  );
};
