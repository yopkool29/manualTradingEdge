export type Trade = {
  id: number
  points: number
  comment: string
  listId: number
  createdAt: Date
}

export type TradeList = {
  id: number
  title: string
  mode: string
  comment: string
  trades: Trade[]
  createdAt: Date
}

export type Settings = {
  pointValues: number[]  // Les valeurs pour les boutons rapides (+1, +5, etc.)
  options?: {
      winrateForNull?: boolean
  }
}

// Component Types
export interface LogoProps {
    width?: number
    height?: number
    isDark?: boolean
}

export interface Mode1Config {
    lot1: {
        size: number
        tp: number
    }
    lot2: {
        size: number
        initialStop: number
    }
    risk: {
        maxLoss: number
        totalSize: number
    }
}
