export const CHARACTERS = {
  papa: {
    id: 'papa',
    name: 'パパ',
    icon: '👨',
    hintMessage: 'パパ、めをつぶって！',
  },
  mama: {
    id: 'mama',
    name: 'ママ',
    icon: '👩',
    hintMessage: 'ママ、めをつぶって！',
  },
  jiiji: {
    id: 'jiiji',
    name: 'じーじ',
    icon: '👴',
    hintMessage: 'じーじ、めをつぶって！',
  },
  baaba: {
    id: 'baaba',
    name: 'ばーば',
    icon: '👵',
    hintMessage: 'ばーば、めをつぶって！',
  },
  ojichan: {
    id: 'ojichan',
    name: 'おじちゃん',
    icon: '👨',
    hintMessage: 'おじちゃん、めをつぶって！',
  },
  obachan: {
    id: 'obachan',
    name: 'おばちゃん',
    icon: '👩',
    hintMessage: 'おばちゃん、めをつぶって！',
  },
} as const

export type CharacterType = keyof typeof CHARACTERS

export const CHARACTER_LIST = Object.values(CHARACTERS)

export const PRONOUNS = {
  boku: {
    id: 'boku',
    label: 'ぼく',
    icon: '👦',
    turnMessage: 'ぼくの ばん！',
  },
  watashi: {
    id: 'watashi',
    label: 'わたし',
    icon: '👧',
    turnMessage: 'わたしの ばん！',
  },
} as const

export type PronounType = keyof typeof PRONOUNS
