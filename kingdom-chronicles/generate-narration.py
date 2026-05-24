"""
Kingdom Chronicles EP02 — The Ashanti Empire
Generates all voiceover WAVs using piper neural TTS (Ryan/high quality).
Run from: /home/user/wdd130/kingdom-chronicles/
Smooth, continuous narration — no awkward pauses.
"""
import subprocess, os

MODEL = "/home/user/wdd130/epl-video/voices/en-us-ryan-high.onnx"
OUT = "public/vo"
os.makedirs(OUT, exist_ok=True)

LINES = [
    # 0 — Hook (0:00 - 0:20, ~20s)
    "The British tried to conquer them four times. "
    "They failed four times. "
    "This is the story of a kingdom that refused to kneel.",

    # 1 — Founding (0:20 - 1:00, ~40s)
    "Before the eighteenth century, the Akan people were fragmented, a collection of smaller kingdoms paying tribute to the Denkyira Empire. "
    "That changed in seventeen-oh-one, when a warrior named Osei Tutu the First forged something unprecedented. "
    "He united the Akan states into a single confederacy under one golden symbol. "
    "The Ashanti Empire was born. "
    "And from its capital in Kumasi, it would reshape the history of West Africa.",

    # 2 — Golden Stool (1:00 - 2:10, ~70s)
    "Osei Tutu's spiritual advisor, Okomfo Anokye, reportedly called down a golden stool from the heavens. "
    "It landed on Osei Tutu's knees, and in that moment, the Ashanti nation was born. "
    "But the stool was not a throne. "
    "The Ashanti never sat on it. "
    "It was called the Sika Dwa Kofi, the Golden Stool, "
    "and it represented the sunsum of the Ashanti people, their collective soul, their spirit as a nation. "
    "To lose the stool was not to lose an object. "
    "To lose it was to lose everything. "
    "This belief would define every conflict the Ashanti ever fought.",

    # 3 — Military (2:10 - 3:00, ~50s)
    "The Ashanti did not build their empire through spirituality alone. "
    "Their military was among the most sophisticated in West Africa, "
    "organized into wings with a standing army, military intelligence networks, "
    "and a logistical system capable of mobilizing tens of thousands of warriors. "
    "By the early nineteenth century, Ashanti territory stretched across much of modern-day Ghana, "
    "parts of the Ivory Coast, and into Togo. "
    "The Ashanti controlled the gold trade, the inland corridors, "
    "and the routes that European powers desperately wanted access to.",

    # 4 — War 1 (3:00 - 4:10, ~70s)
    "Britain wanted the coast. The Ashanti controlled the interior. "
    "In eighteen twenty-three, British forces marched north under Governor Sir Charles MacCarthy. "
    "He was so confident of victory that he ordered his military band to play music as they advanced toward the Ashanti lines. "
    "At the Battle of Nsamankow, the Ashanti army surrounded and destroyed the British column. "
    "MacCarthy was killed in the battle. "
    "His skull was kept by the Ashanti as a war trophy and used as a ceremonial drinking cup. "
    "The first attempt to break the Ashanti had ended in humiliation for the British Empire.",

    # 5 — Wars 2&3 (4:10 - 4:50, ~40s)
    "Britain returned in eighteen sixty-three. "
    "The result was the same. "
    "The Ashanti army held their ground in the jungle, with disease and fierce resistance forcing a British withdrawal. "
    "A pattern was forming. "
    "The most powerful empire in the world could not defeat a West African kingdom on its own terrain. "
    "The Ashanti were not lucky. They were disciplined. They were strategic. And they were fighting for their soul.",

    # 6 — Kumasi Burns (4:50 - 5:50, ~60s)
    "In eighteen seventy-three, Britain sent a much larger force under General Wolseley, "
    "with two thousand five hundred British regulars and West African allies. "
    "For the first time, they reached Kumasi. They burned it to the ground. "
    "But the Ashanti king, Kofi Karikari, had made a critical decision before the British arrived. "
    "He evacuated the people and, most importantly, he moved the Golden Stool out of the city before the British could reach it. "
    "Britain destroyed buildings. They did not break the nation. "
    "The Golden Stool was never captured.",

    # 7 — Yaa Asantewaa (5:50 - 6:50, ~60s)
    "In nineteen hundred, the British Governor Frederick Hodgson gathered the Ashanti chiefs and made a catastrophic mistake. "
    "He demanded they hand over the Golden Stool so he could sit on it as a symbol of British authority. "
    "The chiefs fell silent. "
    "Then an elder woman named Yaa Asantewaa rose to her feet. "
    "She said: if you men will not go forward, then we women will. "
    "We will fight the white men. We will fight until the last of us falls in the battlefield. "
    "She organized the final Ashanti uprising herself, and she led it, "
    "besieging the British garrison at Kumasi for months.",

    # 8 — Aftermath (6:50 - 7:40, ~50s)
    "The British eventually broke the siege and captured Yaa Asantewaa. "
    "She was exiled to the Seychelles, where she died in nineteen twenty-one. "
    "The Ashanti Confederacy was formally annexed into the British Gold Coast in nineteen-oh-two. "
    "But the Golden Stool was never surrendered. "
    "Ordinary Ashanti people hid it. "
    "When it was accidentally rediscovered in nineteen twenty-one, "
    "the British, having finally learned from decades of failure, wisely chose not to demand it. "
    "The Ashanti had kept their soul.",

    # 9 — Legacy (7:40 - 8:30, ~50s)
    "Today, the Ashanti Confederacy lives on as the Ashanti Region of Ghana. "
    "Twi, their language, is spoken by more than nine million people across West Africa. "
    "Kente cloth, woven by Ashanti craftspeople, is worn by presidents and at graduation ceremonies around the world. "
    "Adinkra symbols appear in African art, architecture, and design globally. "
    "And the Golden Stool still sits in Kumasi, protected by the Asantehene, "
    "the Ashanti king, an institution that survives to this day. "
    "The empire did not end. It became a culture.",

    # 10 — Closing (8:30 - 9:00, ~30s)
    "Four times the most powerful empire in the world tried to break them. "
    "Four times, they held. "
    "And the one thing Britain truly wanted, the Golden Stool, the soul of the Ashanti people, they never got it. "
    "Some things cannot be colonised.",
]

for i, text in enumerate(LINES):
    out_path = f"{OUT}/scene-{i}.wav"
    proc = subprocess.run(
        ["python3", "-m", "piper", "--model", MODEL, "--output_file", out_path],
        input=text.encode(),
        capture_output=True
    )
    if proc.returncode != 0:
        print(f"  ERROR scene-{i}: {proc.stderr.decode()[:200]}")
    else:
        size_kb = os.path.getsize(out_path) // 1024
        print(f"  scene-{i}.wav  ({size_kb} KB)")

print("\nAll narration generated.")
