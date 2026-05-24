import subprocess, os

MODEL = "/home/user/wdd130/epl-video/voices/en-us-ryan-high.onnx"
OUT   = "public/vo"

LINES = [
    # 0 — Hook
    "In 1324... one man's pilgrimage crashed the world economy. "
    "His name was Mansa Musa. "
    "And he didn't conquer anyone. He didn't fire a single arrow. "
    "He simply... went on a trip.",

    # 1 — World Stage
    "The year is the early 14th century. "
    "Europe is recovering from plague and famine. The Mongol Empire is fracturing. The Byzantine Empire is shrinking. "
    "But deep in West Africa — stretching from the Atlantic coast to the bend of the Niger River — "
    "one kingdom controls something the entire world desperately wants. "
    "Salt. Gold. And the trade routes that connect them. "
    "This... is the Mali Empire.",

    # 2 — The Empire
    "The Mali Empire was, at its height, one of the largest empires on Earth — roughly 2 million square kilometers. "
    "It controlled nearly half of the world's gold supply. "
    "Its cities were legendary. Timbuktu was not a mythical place. "
    "It was a thriving metropolis — home to over 100,000 people, "
    "one of the largest universities on the planet, "
    "and a book trade so vast that manuscripts were more valuable than gold. "
    "And ruling over all of it — the Mansa. The Emperor. "
    "By 1312, the throne passed to a man whose name would echo through centuries. "
    "Musa Keita. Mansa Musa. The Lion King of Mali.",

    # 3 — The Pilgrimage
    "In 1324, Mansa Musa decided to fulfill one of the Five Pillars of Islam — the Hajj. The pilgrimage to Mecca. "
    "But Mansa Musa did not simply pack a bag. "
    "He brought an entourage of 60,000 people. "
    "12,000 servants — each carrying 1.8 kilograms of gold. "
    "500 heralds, each bearing golden staffs and dressed in silk. "
    "80 camels, each loaded with between 50 and 300 pounds of gold dust. "
    "And Mansa Musa himself — riding a horse, preceded by 500 servants waving golden staffs — "
    "distributed gold to the poor at every city he passed through.",

    # 4 — Cairo Crisis
    "When Mansa Musa's caravan arrived in Cairo, the city had never seen anything like it. "
    "He gave away gold. Freely. Generously. Joyfully. "
    "To mosques. To beggars. To merchants. To officials. "
    "The people of Cairo were overjoyed. "
    "And then... the economy collapsed. "
    "Here is what happened: Gold was currency. The more gold in circulation, the less each piece was worth. "
    "Mansa Musa flooded Egypt with so much gold that the value of gold in Cairo plummeted. "
    "Prices for goods skyrocketed. Merchants who had saved gold for years saw their wealth halved overnight. "
    "Egypt suffered economic depression for 12 years. "
    "One man's generosity... caused a continent-wide financial crisis.",

    # 5 — Return
    "On his return journey, Mansa Musa reportedly tried to remedy the situation. "
    "He borrowed gold back from Egyptian lenders — at high interest — "
    "specifically to reduce the gold supply in circulation and stabilize prices. "
    "He became, perhaps, the first person in history to single-handedly crash — "
    "and then attempt to fix — an international economy. "
    "He did not fully succeed. "
    "But the attempt alone speaks to the scale of his economic power.",

    # 6 — Legacy
    "Mansa Musa's pilgrimage put Mali — and Africa — on the map. Literally. "
    "The 1375 Catalan Atlas, one of the most important maps in medieval history, "
    "depicts Mansa Musa on his throne, holding a gold nugget, "
    "with a caption describing him as the richest and most noble king in all the land. "
    "European traders began actively seeking routes to Mali. His journey accelerated the Age of Exploration. "
    "Back home, he brought architects from Andalusia who built the famous Djinguereber Mosque in Timbuktu — still standing today. "
    "He expanded Timbuktu into one of the world's great centers of Islamic scholarship. "
    "He was not just a king who had gold. He was a king who used gold to build something permanent.",

    # 7 — The Number
    "So — how rich was he, exactly? "
    "Economists and historians have attempted to calculate Mansa Musa's wealth in modern terms. "
    "Most estimates place his net worth at approximately... 400 billion dollars. "
    "Some estimates go higher. Much higher. "
    "For context — the wealthiest person alive today is worth roughly 300 billion dollars. "
    "Mansa Musa lived 700 years ago. Without electricity. Without the internet. Without a stock market. "
    "And he was still richer.",

    # 8 — The Close
    "The Mali Empire would eventually decline — internal succession crises, "
    "the rise of the Songhai Empire, and later, the devastation of the trans-Atlantic slave trade. "
    "But for over a century, it stood as the wealthiest, most powerful civilization on Earth. "
    "And Mansa Musa — who simply went on a pilgrimage — "
    "became a ghost that haunted European imaginations for two centuries. "
    "A man so rich, his generosity was a weapon. "
    "A king so powerful, his footsteps reshaped the global economy. "
    "History remembers conquerors. "
    "But the man who changed the world most in the 14th century never raised a sword. "
    "He just walked through the desert... handing out gold.",
]

for i, text in enumerate(LINES):
    out = f"{OUT}/scene-{i}.wav"
    r = subprocess.run(["python3","-m","piper","--model",MODEL,"--output_file",out],
                       input=text.encode(), capture_output=True)
    kb = os.path.getsize(out)//1024 if r.returncode==0 else 0
    print(f"{'✓' if r.returncode==0 else '✗'} scene-{i}.wav ({kb} KB)")
print("Done.")
