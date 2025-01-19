export type Trade = {
  id: number
  points: number
  listId: number
  createdAt: Date
}

export type TradeList = {
  id: number
  title: string
  comment: string
  trades: Trade[]
  createdAt: Date
}

export type Settings = {
  pointValues: number[]  // Les valeurs pour les boutons rapides (+1, +5, etc.)
}
