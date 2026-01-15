export const CHARACTERS = {
  papa: {
    id: 'papa',
    name: 'パパ',
    icon: '🦊',
    animal: 'きつね',
    color: 'character-papa',
    bgGradient: 'from-violet-400 to-violet-600',
    borderColor: 'border-violet-400',
    glowColor: 'rgba(124, 58, 237, 0.5)',
    hintMessage: 'パパきつね、めをつぶって！',
    description: 'かしこい きつねの パパ',
  },
  mama: {
    id: 'mama',
    name: 'ママ',
    icon: '🐻',
    animal: 'くま',
    color: 'character-mama',
    bgGradient: 'from-pink-400 to-pink-600',
    borderColor: 'border-pink-400',
    glowColor: 'rgba(236, 72, 153, 0.5)',
    hintMessage: 'ママくま、めをつぶって！',
    description: 'やさしい くまの ママ',
  },
  jiiji: {
    id: 'jiiji',
    name: 'じーじ',
    icon: '🦉',
    animal: 'ふくろう',
    color: 'character-jiiji',
    bgGradient: 'from-emerald-500 to-emerald-700',
    borderColor: 'border-emerald-500',
    glowColor: 'rgba(5, 150, 105, 0.5)',
    hintMessage: 'じーじふくろう、めをつぶって！',
    description: 'ものしりな ふくろうの じーじ',
  },
  baaba: {
    id: 'baaba',
    name: 'ばーば',
    icon: '🐰',
    animal: 'うさぎ',
    color: 'character-baaba',
    bgGradient: 'from-orange-400 to-orange-600',
    borderColor: 'border-orange-400',
    glowColor: 'rgba(249, 115, 22, 0.5)',
    hintMessage: 'ばーばうさぎ、めをつぶって！',
    description: 'あたたかい うさぎの ばーば',
  },
  ojichan: {
    id: 'ojichan',
    name: 'おじちゃん',
    icon: '🦝',
    animal: 'たぬき',
    color: 'character-ojichan',
    bgGradient: 'from-blue-400 to-blue-600',
    borderColor: 'border-blue-400',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    hintMessage: 'おじちゃんたぬき、めをつぶって！',
    description: 'ゆかいな たぬきの おじちゃん',
  },
  obachan: {
    id: 'obachan',
    name: 'おばちゃん',
    icon: '🦔',
    animal: 'はりねずみ',
    color: 'character-obachan',
    bgGradient: 'from-pink-300 to-pink-500',
    borderColor: 'border-pink-300',
    glowColor: 'rgba(244, 114, 182, 0.5)',
    hintMessage: 'おばちゃんはりねずみ、めをつぶって！',
    description: 'かわいい はりねずみの おばちゃん',
  },
} as const

export type CharacterType = keyof typeof CHARACTERS
export type Character = (typeof CHARACTERS)[CharacterType]

export const CHARACTER_LIST = Object.values(CHARACTERS)

export const PRONOUNS = {
  boku: {
    id: 'boku',
    label: 'ぼく',
    icon: '👦',
    turnMessage: 'ぼくの ばん！',
    color: 'from-sky-400 to-sky-600',
    borderColor: 'border-sky-400',
    description: 'ぼうけんずきな おとこのこ',
  },
  watashi: {
    id: 'watashi',
    label: 'わたし',
    icon: '👧',
    turnMessage: 'わたしの ばん！',
    color: 'from-rose-400 to-rose-500',
    borderColor: 'border-rose-400',
    description: 'げんきな おんなのこ',
  },
} as const

export type PronounType = keyof typeof PRONOUNS
export type Pronoun = (typeof PRONOUNS)[PronounType]
