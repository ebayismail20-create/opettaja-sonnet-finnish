/* =============================================
   LESSONS DATA
   Each lesson is a self-contained object.
   ============================================= */
const LESSONS = [
  {
    id: 1,
    level: "A1",
    titleFi: "Suomen ääntäminen & tervehdykset",
    titleEn: "Pronunciation & Greetings",
    goal: "Master the Finnish alphabet sounds (Ä, Ö, Y) and learn 10 survival phrases",
    tomorrowPreview: "The verb 'to be' (olla) and telling people where you are from.",
    homework: "Practice rolling your R. Say 'tika-tika-tika' fast 20 times!",
    vocabulary: [
      { word: "Moi / Hei", pron: "[moy] / [hay]", en: "Hi / Hello" },
      { word: "Kiitos", pron: "[KEE-tos]", en: "Thank you" },
      { word: "Anteeksi", pron: "[AN-teyk-si]", en: "Sorry / Excuse me" },
      { word: "Ole hyvä", pron: "[O-le HÜ-vä]", en: "You're welcome / Please" },
      { word: "Mitä kuuluu?", pron: "[MI-tä KOO-loo]", en: "How are you?" },
      { word: "Kiitos, hyvää", pron: "[KEE-tos HÜ-vää]", en: "Good, thanks" },
      { word: "Kyllä / Joo", pron: "[KÜL-lä] / [yoh]", en: "Yes (formal / casual)" },
      { word: "Ei", pron: "[ay]", en: "No" },
      { word: "Minä", pron: "[MI-nä]", en: "I / Me" },
      { word: "Sinä", pron: "[SI-nä]", en: "You (singular)" },
      { word: "Nähdään!", pron: "[NÄH-dään]", en: "See you!" },
      { word: "Moi moi", pron: "[moy moy]", en: "Bye bye (casual)" }
    ],
    memoryTrick: `"Moi" sounds like "Boy" → You wave hi to a boy. "Kiitos" sounds like "Key-toss" → You toss someone their keys and they say thank you!`,

    grammarTitle: "The Finnish Alphabet & Stress Rules",
    grammarRules: [
      {
        rule: "Word Stress — Always First Syllable",
        pattern: "STRES-sed syl-la-ble is al-ways #1",
        explanation: "Unlike English which stresses different syllables, Finnish ALWAYS stresses the first syllable. This makes pronunciation predictable!",
        examples: ["<strong>SUO</strong>-mi (Finland)", "<strong>KII</strong>-tos (Thank you)", "<strong>AN</strong>-teek-si (Sorry)"]
      },
      {
        rule: "Special Vowels: Ä, Ö, Y",
        pattern: "Back: A O U | Front: Ä Ö Y | Neutral: E I",
        explanation: "A = 'father', Ä = 'cat'. O = 'hot', Ö = 'fur'. Y = say 'ee' but round your lips tight. These are DIFFERENT letters, not decorations!",
        examples: ["Talo (house) vs. Tälö (not a word — hear the difference?)", "Yö (night) — pure front vowels", "Auto (car) — pure back vowels"]
      },
      {
        rule: "Double Letters = Long Sound",
        pattern: "Single letter = short | Double letter = 2× duration",
        explanation: "Length changes meaning! Hold the sound exactly twice as long for double letters.",
        examples: ["Tuli (fire) vs. Tuuli (wind)", "Taka (back) vs. Takka (fireplace)", "Kuka (who) vs. Kukka (flower)"]
      }
    ],
    easyRemember: "Think of your mouth as a house 🏠. <strong>Back vowels (A,O,U)</strong> live in the back rooms (throat). <strong>Front vowels (Ä,Ö,Y)</strong> live in the front rooms (lips/teeth). <strong>Neutral vowels (E,I)</strong> are guests who can visit any room. You usually can't mix back and front vowels in one Finnish word!",
    commonMistake: "Treating Ä and A as the same letter. They are completely different sounds and different letters in Finnish! Writing 'a' when you need 'ä' changes the word's meaning entirely.",
    compareEnglish: "Unlike English where 'a' can be pronounced 10 different ways, each Finnish letter has exactly ONE sound. Always. This makes Finnish pronunciation very regular once you learn the sounds!",

    audioScene: "Two friends, Matti and Liisa, bump into each other on the street in Helsinki. The tone is casual and warm.",
    audioScript: [
      { speaker: "Matti", line: "Moi, Liisa!", note: "(Rising, cheerful tone)" },
      { speaker: "Liisa", line: "Hei Matti! Mitä kuuluu?", note: "(Friendly, curious)" },
      { speaker: "Matti", line: "Kiitos, hyvää! Entä sinulle?", note: "(Upbeat)" },
      { speaker: "Liisa", line: "Ihan hyvää, kiitos.", note: "(Relaxed, content)" },
      { speaker: "Matti", line: "Hienoa! No niin, nähdään!", note: "(Wrapping up)" },
      { speaker: "Liisa", line: "Moi moi!", note: "(Quick, casual goodbye)" }
    ],
    audioKeyPhrases: ["Mitä kuuluu?", "Kiitos, hyvää", "Moi moi"],
    audioTask: "Is this conversation formal or informal? How can you tell? (Hint: look at how they greet and say goodbye)",

    writingTask: "Introduce yourself in Finnish! Write 5–8 short lines as if you just met a friendly Finn at a café.",
    writingRequirements: "Use at least: 'Moi', 'Minä olen [your name]', 'Mitä kuuluu?', and 'Kiitos'.",
    writingExample: "Moi! Minä olen Ahmed. Mitä kuuluu? ...",

    exercises: [
      {
        type: "fill",
        question: "Complete the greeting: \"_____, mitä kuuluu?\"",
        answer: "moi",
        hint: "The most casual Finnish greeting (3 letters)"
      },
      {
        type: "fill",
        question: "How do you say 'thank you'? → _____",
        answer: "kiitos",
        hint: "Sounds like 'key-toss'"
      },
      {
        type: "fill",
        question: "Reply to 'Mitä kuuluu?': \"Kiitos, _____\"",
        answer: "hyvää",
        hint: "It means 'good' and has a special Finnish letter at the end"
      },
      {
        type: "fill",
        question: "The stress in Finnish words is always on the _____ syllable.",
        answer: "first",
        hint: "Think: position #1"
      },
      {
        type: "fill",
        question: "Tuli means 'fire'. Tuuli (double u) means '_____'.",
        answer: "wind",
        hint: "Double letter = longer sound = different meaning"
      }
    ],

    quiz: [
      {
        question: "How do you say 'Thank you' in Finnish?",
        options: ["Anteeksi", "Kiitos", "Ole hyvä", "Nähdään"],
        correct: 1
      },
      {
        question: "Where is the stress in the Finnish word 'banaani'?",
        options: ["Second syllable (na)", "Third syllable (ni)", "First syllable (ba)", "Evenly distributed"],
        correct: 2
      },
      {
        question: "How is 'Ä' pronounced?",
        options: ["Like 'A' in 'father'", "Like 'A' in 'cat'", "Like 'E' in 'bed'", "It's silent"],
        correct: 1
      },
      {
        question: "What does 'Anteeksi' mean?",
        options: ["Thank you", "Please", "Sorry / Excuse me", "Goodbye"],
        correct: 2
      },
      {
        question: "(YKI Style) You hear someone say 'Moi moi!' — What are they doing?",
        options: ["Asking for help", "Saying hello formally", "Saying goodbye casually", "Ordering food"],
        correct: 2
      }
    ],

    ykiSkillFocus: "Speaking (Pronunciation)",
    ykiTip: "In the YKI speaking test, clear pronunciation scores higher than complex vocabulary. Examiners need to understand you! Practice each sound distinctly.",
    ykiSample: "In the real YKI test, you will be asked to introduce yourself. Practice saying 'Minä olen [name]' until it's completely automatic.",

    reviewPrevious: [],
  },

  {
    id: 2,
    level: "A1",
    titleFi: "Olla-verbi & mistä olet kotoisin?",
    titleEn: "The verb 'to be' & Where are you from?",
    goal: "Learn to conjugate 'olla' (to be) and tell people your nationality and where you're from",
    tomorrowPreview: "Numbers 1-20 and asking 'how much does this cost?'",
    homework: "Write 5 sentences about yourself using 'olla' in different forms (minä olen, sinä olet, hän on...)",
    vocabulary: [
      { word: "Olla", pron: "[OL-la]", en: "To be" },
      { word: "Olen", pron: "[O-len]", en: "I am" },
      { word: "Olet", pron: "[O-let]", en: "You are" },
      { word: "Hän on", pron: "[hän on]", en: "He/She is" },
      { word: "Olemme", pron: "[O-lem-me]", en: "We are" },
      { word: "Olette", pron: "[O-let-te]", en: "You (pl.) are" },
      { word: "He ovat", pron: "[he O-vat]", en: "They are" },
      { word: "Suomalainen", pron: "[SUO-ma-lai-nen]", en: "Finnish (person)" },
      { word: "Mistä?", pron: "[MIS-tä]", en: "From where?" },
      { word: "Kotoisin", pron: "[KO-toi-sin]", en: "Originally from" },
      { word: "Suomesta", pron: "[SUO-mes-ta]", en: "From Finland" },
      { word: "Maa", pron: "[maa]", en: "Country / Land" }
    ],
    memoryTrick: `"Olla" sounds like "all-a" → The verb that does it ALL. Imagine a Swiss Army knife – 'olla' is the most essential Finnish verb, like 'to be' in English.`,

    grammarTitle: "Olla (To Be) — Conjugation & Usage",
    grammarRules: [
      {
        rule: "Olla Conjugation — Present Tense",
        pattern: "minä olen | sinä olet | hän on | me olemme | te olette | he ovat",
        explanation: "Finnish is a 'pro-drop' language: you can drop the pronoun because the verb ending tells you who! 'Olen suomalainen' = 'I am Finnish' (no need for 'minä').",
        examples: ["(Minä) olen opiskelija. — I am a student.", "(Sinä) olet kaunis. — You are beautiful.", "Hän on opettaja. — He/She is a teacher."]
      },
      {
        rule: "Asking 'Where are you from?'",
        pattern: "Mistä (sinä) olet kotoisin? → (Minä) olen [country]-sta/-stä kotoisin.",
        explanation: "The -sta/-stä ending (Elative case) means 'from (inside)'. Think of it as coming OUT of a country.",
        examples: ["Olen Suomesta kotoisin. — I'm from Finland.", "Olen Irakista kotoisin. — I'm from Iraq.", "Olen Marokosta kotoisin. — I'm from Morocco."]
      }
    ],
    easyRemember: "Think of 'olla' like a Lego base plate 🧱 — everything in Finnish attaches to it. <br><strong>Ol-</strong> is the stem. The ending tells you WHO:<br>Ol + <strong>en</strong> (I) | Ol + <strong>et</strong> (you) | On (he/she — irregular!) | Ol + <strong>emme</strong> (we) | Ol + <strong>ette</strong> (you pl.) | Ovat (they — irregular!)",
    commonMistake: "Using 'on' for everything. Beginners say 'Minä on suomalainen' ❌ instead of 'Minä olen suomalainen' ✅. Remember: the verb ending must match the person!",
    compareEnglish: "Finnish has no separate words for he/she — 'hän' covers both! Also, unlike English 'am/is/are', Finnish uses 6 distinct verb forms. But the pattern is very regular.",

    audioScene: "At a language class. The teacher asks new students to introduce themselves and say where they are from.",
    audioScript: [
      { speaker: "Opettaja (Teacher)", line: "Hei kaikki! Minä olen Maija. Olen opettaja. Mistä te olette kotoisin?", note: "(Warm, welcoming)" },
      { speaker: "Ahmed", line: "Moi! Minä olen Ahmed. Olen Irakista kotoisin.", note: "(Slightly nervous but clear)" },
      { speaker: "Maria", line: "Hei! Minä olen Maria. Olen Espanjasta kotoisin.", note: "(Confident)" },
      { speaker: "Opettaja", line: "Hienoa! Tervetuloa Suomeen!", note: "(Encouraging — 'Welcome to Finland!')" }
    ],
    audioKeyPhrases: ["Mistä olette kotoisin?", "Olen...kotoisin", "Tervetuloa Suomeen"],
    audioTask: "What countries are the students from? What does 'Tervetuloa Suomeen' mean?",

    writingTask: "Write a self-introduction as if you are in a Finnish language class. Tell us your name, where you are from, and one thing about yourself.",
    writingRequirements: "Must use 'olen' at least 3 times and include 'kotoisin'.",
    writingExample: "Hei! Minä olen [name]. Olen [country]-sta kotoisin. Olen opiskelija...",

    exercises: [
      {
        type: "fill",
        question: "Minä _____ opiskelija. (I am a student)",
        answer: "olen",
        hint: "First person singular of 'olla'"
      },
      {
        type: "fill",
        question: "Sinä _____ suomalainen. (You are Finnish)",
        answer: "olet",
        hint: "Second person singular of 'olla'"
      },
      {
        type: "fill",
        question: "Hän _____ opettaja. (He/She is a teacher)",
        answer: "on",
        hint: "Third person — the short irregular form"
      },
      {
        type: "fill",
        question: "Mistä sinä olet _____? (Where are you originally from?)",
        answer: "kotoisin",
        hint: "This word means 'originally from'"
      },
      {
        type: "fill",
        question: "Olen Suome_____ kotoisin. (I'm from Finland)",
        answer: "sta",
        hint: "The 'from inside' case ending for back vowel words"
      }
    ],

    quiz: [
      {
        question: "What is the correct conjugation: 'Minä _____ opiskelija'?",
        options: ["on", "olet", "olen", "ovat"],
        correct: 2
      },
      {
        question: "How do you say 'She is a teacher'?",
        options: ["Hän olet opettaja", "Hän olen opettaja", "Hän on opettaja", "Hän ovat opettaja"],
        correct: 2
      },
      {
        question: "What does 'Mistä sinä olet kotoisin?' mean?",
        options: ["What is your name?", "Where are you from?", "How old are you?", "Where do you live?"],
        correct: 1
      },
      {
        question: "The word 'hän' in Finnish means:",
        options: ["He only", "She only", "He or She (gender neutral)", "They"],
        correct: 2
      },
      {
        question: "(YKI Style) You hear: 'Olen Marokosta kotoisin.' What did the speaker say?",
        options: ["They live in Morocco now", "They are originally from Morocco", "They want to visit Morocco", "They like Moroccan food"],
        correct: 1
      }
    ],

    ykiSkillFocus: "Speaking (Self-Introduction)",
    ykiTip: "The YKI speaking test always starts with introducing yourself. Practice: name, origin, occupation, one hobby. Keep it simple and clear.",
    ykiSample: "Introduce yourself in 30 seconds: 'Hei, minä olen [name]. Olen [country]-sta kotoisin. Olen [occupation].'",

    reviewPrevious: ["Lesson 1: Finnish stress is always on the first syllable", "Lesson 1: Ä ≠ A — they are different sounds!", "Lesson 1: Double letters = longer sound = different meaning"],
  }
];
