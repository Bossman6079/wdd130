"""
Regenerates all voiceover WAVs using the piper neural TTS (Ryan/high quality).
Run from: /home/user/wdd130/epl-video/
"""
import subprocess, os

MODEL = "voices/en-us-ryan-high.onnx"
OUT   = "public/vo"
os.makedirs(OUT, exist_ok=True)

# Cinematic, punchy narration — written for documentary pacing
LINES = [
    # 0 — Title (6s)
    "Welcome... to the story of the Premier League.",

    # 1 — What is the PL (14s)
    "Twenty clubs. Three hundred and eighty matches. Four point seven billion viewers across a hundred and eighty-eight countries. "
    "The Premier League is the most-watched sporting event on the planet — and this is how it all began.",

    # 2 — Birth 1992 (16s)
    "February, nineteen ninety-two. Twenty-two First Division clubs make a historic decision — they break away and form "
    "the Premier League. A three-hundred-million-pound television deal with Sky Sports changes football forever. "
    "On the fifteenth of August, the curtain rises. Brian Deane of Sheffield United scores — the very first goal.",

    # 3 — Man Utd 1993 (15s)
    "Manchester United win the very first Premier League title in nineteen ninety-three — ending a twenty-six-year drought. "
    "Then they do it again in ninety-four. Eric Cantona. Roy Keane. Sir Alex Ferguson. "
    "English football had found its new king — and they were just getting started.",

    # 4 — Blackburn 1995 (15s)
    "But someone dares to interrupt. Nineteen ninety-five. Blackburn Rovers, bankrolled by local millionaire Jack Walker, "
    "stun the football world. Alan Shearer scores thirty-four goals — a record. "
    "On the final day, Blackburn are champions. Their one and only top-flight title.",

    # 5 — Fergie dynasty (14s)
    "Then the dynasty truly begins. Beckham. Scholes. Giggs. The Neville brothers. "
    "Ferguson's Class of Ninety-Two — the greatest homegrown group English football has ever produced. "
    "Five titles in seven years. The rest of England simply watching on.",

    # 6 — The Treble 1999 (19s)
    "But their greatest moment comes not in Manchester — but in Barcelona. "
    "Twenty-sixth of May, nineteen ninety-nine. United trail Bayern Munich one-nil. "
    "Ninety minutes are up. Injury time begins. Sheringham — one-one. "
    "Then — Solskjaer — two-one. Two goals. Two minutes. "
    "The Treble. The most extraordinary three minutes in the history of English football.",

    # 7 — United 2000–03 (15s)
    "United keep winning — two thousand, two thousand-and-one, two thousand-and-three. "
    "Eight titles from eleven seasons. Arsenal briefly interrupt with a stunning Double in two-thousand-and-two — "
    "but Ferguson rebuilds, and comes back stronger. That is what dynasties do.",

    # 8 — Arsenal Invincibles (17s)
    "Two thousand and four. Arsene Wenger's Arsenal do something no team had done in over a century of English football. "
    "Thirty-eight games. Not one single defeat. "
    "Thierry Henry. Patrick Vieira. Robert Pires. The Invincibles. "
    "They extend the unbeaten run to forty-nine games — a record that stands to this very day.",

    # 9 — Chelsea revolution (17s)
    "Then Roman Abramovich arrives — and rewrites the rulebook. "
    "A hundred-and-forty million pounds for Chelsea. Then hundreds of millions more. "
    "Jose Mourinho steps off the plane at Heathrow and announces — quote — I am a Special One. "
    "He delivers back-to-back titles and sets a defensive record of just fifteen goals conceded all season. "
    "A new superpower is born.",

    # 10 — United return (15s)
    "But Ferguson is never finished. Cristiano Ronaldo. Wayne Rooney. Rio Ferdinand. "
    "United win three consecutive titles and conquer Europe again in two thousand and eight. "
    "Ronaldo wins the Ballon d'Or with forty-two goals in a single season. "
    "Old Trafford roars once more.",

    # 11 — City takeover (14s)
    "September, two thousand and eight. Sheikh Mansour bin Zayed al Nahyan buys Manchester City "
    "for two hundred and ten million pounds. "
    "Few realise it yet — but the balance of power in English football has just permanently shifted.",

    # 12 — Agüero goal (23s)
    "The thirteenth of May, two thousand and twelve. Manchester City versus QPR. Final day. "
    "United have already won their match. City need a win — and they are losing two-one. "
    "Dzeko makes it two-all in the ninety-second minute. "
    "Then — ninety-three minutes and twenty seconds — "
    "Balotelli lays it off. Aguero controls. Swivels. Fires. "
    "Three-two. Manchester City are champions for the first time in forty-four years. "
    "Martin Tyler's voice breaks: AGUEROOOOO! "
    "The greatest moment in Premier League history.",

    # 13 — Liverpool near miss (17s)
    "Two thousand and fourteen brings heartbreak to Anfield. "
    "Liverpool are electric — Suarez, Sturridge, and Gerrard — firing on all cylinders. "
    "But with three games to go, captain Steven Gerrard slips on his own pitch against Chelsea. "
    "Two-nil. The dream is shattered. City take the title by just two points. "
    "Liverpool's most painful near-miss.",

    # 14 — Leicester miracle (23s)
    "And then — the miracle. "
    "Leicester City enter the twenty-fifteen to twenty-sixteen season at five-thousand-to-one odds. "
    "The same odds as Elvis Presley being found alive. "
    "Manager Claudio Ranieri. Jamie Vardy. N'Golo Kante. Riyad Mahrez. "
    "Vardy scores in eleven consecutive Premier League games — breaking the record. "
    "They win the title with two matches to spare. "
    "The entire football world stops — and stares. "
    "The greatest sporting upset in the history of the game.",

    # 15 — City 100 points (19s)
    "Pep Guardiola arrives at Manchester City in twenty-sixteen — and breaks everything. "
    "In twenty-seventeen to twenty-eighteen, his team win one hundred points from thirty-eight games. "
    "One hundred points. They score a hundred and six goals. "
    "Kevin De Bruyne pulls the strings. Leroy Sane runs riot. "
    "They finish nineteen points clear. The most dominant title season English football has ever seen.",

    # 16 — Liverpool 2020 (18s)
    "Then thirty years of waiting ends. "
    "Jurgen Klopp's Liverpool, powered by Salah, Mane and Firmino, "
    "clinch the twenty-nineteen to twenty title with seven games to spare. "
    "The season is played in empty stadiums — the shadow of the pandemic hanging over football. "
    "But nothing diminishes the magnitude of this moment. Liverpool are champions of England.",

    # 17 — City treble 2023 (21s)
    "Erling Haaland arrives at City in twenty-twenty-two — and immediately breaks records. "
    "Thirty-six Premier League goals in his debut season. A new benchmark. "
    "City win the Premier League. Then the FA Cup. Then the Champions League. "
    "The Treble — only the second English club to ever achieve it. "
    "Seven Premier League titles since twenty-twelve. Under Guardiola, City are the team of the era.",

    # 18 — Champions table (19s)
    "Thirteen titles for Manchester United. Seven for Manchester City. "
    "Five for Chelsea. Three for Arsenal. "
    "One each for Blackburn Rovers, Leicester City, and Liverpool. "
    "Thirty-two seasons. Seven different champions. "
    "But only two clubs have truly dominated — the Red Devils of the nineties, and the sky blues of today.",

    # 19 — Records (16s)
    "One hundred points. Forty-nine games unbeaten. "
    "Thirty-six goals by one striker in a single season. "
    "Aguero at ninety-three twenty. Leicester at five thousand to one. "
    "These are not just statistics — they are the moments that made the Premier League "
    "the greatest football league on earth.",

    # 20 — Outro (16s)
    "From Brian Deane's first goal in August nineteen ninety-two — "
    "to a global audience of billions watching today. "
    "The Premier League has given us drama, heartbreak, miracles, and moments of pure genius. "
    "The Beautiful Game continues. And the next chapter... has not yet been written.",
]

for i, text in enumerate(LINES):
    out_path = f"{OUT}/scene-{i}.wav"
    proc = subprocess.run(
        ["python3", "-m", "piper", "--model", MODEL, "--output_file", out_path],
        input=text.encode(),
        capture_output=True
    )
    if proc.returncode != 0:
        print(f"  ERROR scene-{i}: {proc.stderr.decode()}")
    else:
        size_kb = os.path.getsize(out_path) // 1024
        print(f"  ✓ scene-{i}.wav  ({size_kb} KB)")

print("\nAll narration generated with piper neural TTS.")
