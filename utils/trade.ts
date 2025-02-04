import type { Trade, TradeList, Settings, Mode1Config } from '~/types'

// Configuration pour le mode1
const mode1Config: Mode1Config = {
    lot1: {
        size: 2,  // taille du premier lot
        tp: 2     // take profit fixe de 2 unités
    },
    lot2: {
        size: 1,  // taille du lot trailing
        initialStop: 2  // stop loss initial pour le trailing
    },
    risk: {
        maxLoss: 2,     // perte maximale en points
        totalSize: 3    // nombre total de lots pour le calcul de la perte
    }
}

export const getWinRate = (list: TradeList, settings: Settings): number => {
    if (!list?.trades || list.trades.length === 0) return 0
    const winningTrades = list.trades.filter(trade => trade.points > 0).length
    const totalTrades = settings?.options?.winrateForNull 
        ? list.trades.length 
        : list.trades.filter(trade => trade.points !== 0).length
    return Math.round((winningTrades / totalTrades) * 100)
}

export const getGain = (trade: Trade, mode: string): number => {
    if (mode !== 'mode1') {
        return trade.points
    }

    const direction = Math.sign(trade.points)  // 1 pour long, -1 pour short
    const absPoints = Math.abs(trade.points)
    let totalGain = 0

    // Si points négatifs, retourne la perte maximale configurée
    if (trade.points < 0) {
        return -mode1Config.risk.maxLoss * mode1Config.risk.totalSize
    }

    // Si points positifs mais < 2, retourne 0
    if (trade.points >= 0 && absPoints < mode1Config.lot1.tp) {
        return 0
    }

    // Calcul pour le premier lot avec TP fixe
    if (absPoints >= mode1Config.lot1.tp) {
        totalGain += direction * mode1Config.lot1.tp * mode1Config.lot1.size
    }

    // Calcul pour le deuxième lot avec trailing stop
    if (absPoints > mode1Config.lot2.initialStop) {
        // On garde tous les points une fois le seuil dépassé
        totalGain += trade.points * mode1Config.lot2.size
    }

    return totalGain
}
