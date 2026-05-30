import { useState } from 'react'
import Navbar from '../components/Navbar'

const CAT_COLOR: Record<string, string> = {
  A: 'bg-cc-dark text-white',
  B: 'bg-cc-text/60 text-white',
  C: 'bg-cc-text/25 text-cc-text',
  D: 'bg-cc-text/10 text-cc-text/50',
}

interface Player { seed: number; name: string; cat: string }

const P: Record<number, Player> = {
  1:  { seed:1,  name:'Carlos Chavez',                   cat:'A' },
  2:  { seed:2,  name:'Paco Moreno',                     cat:'A' },
  3:  { seed:3,  name:'Vale Cardenas',                   cat:'A' },
  4:  { seed:4,  name:'Luis Emiliano Guzman',            cat:'A' },
  5:  { seed:5,  name:'Carlos Escobar',                  cat:'A' },
  6:  { seed:6,  name:'Mauricio Velazquez',              cat:'A' },
  7:  { seed:7,  name:'Josue Gomez',                     cat:'A' },
  8:  { seed:8,  name:'Miguel Martinez',                 cat:'B' },
  9:  { seed:9,  name:'Danilo Garces',                   cat:'B' },
  10: { seed:10, name:'Carlos Altamirano',               cat:'B' },
  11: { seed:11, name:'Santiago Resendiz',               cat:'B' },
  12: { seed:12, name:'Jorge E Resendiz',                cat:'B' },
  13: { seed:13, name:'Jose Ivan Arguelles Acebo',       cat:'B' },
  14: { seed:14, name:'Camilo Quiroz',                   cat:'B' },
  15: { seed:15, name:'Claudia Salinas Maldonado',       cat:'B' },
  16: { seed:16, name:'Luis Arturo Dominguez Garibay',   cat:'C' },
  17: { seed:17, name:'Janeth Alejandra Cantú Garza',    cat:'C' },
  18: { seed:18, name:'Sergio Sanchez',                  cat:'C' },
  19: { seed:19, name:'Erick Lozano',                    cat:'C' },
  20: { seed:20, name:'Fernando Roman Silva Aguilar',    cat:'C' },
  21: { seed:21, name:'Leopoldo Rojas',                  cat:'C' },
  22: { seed:22, name:'Ricardo Loera Buenrostro',        cat:'C' },
  23: { seed:23, name:'Melisa Sarahi Rodriguez Salazar', cat:'C' },
  24: { seed:24, name:'Ulrich Martinez',                 cat:'C' },
  25: { seed:25, name:'Sergio Muñoz',                    cat:'C' },
  26: { seed:26, name:'Marco Antonio Ramirez Prieto',    cat:'C' },
  27: { seed:27, name:'Veronica Porras',                 cat:'C' },
  28: { seed:28, name:'Mariana Alvarez',                 cat:'C' },
  29: { seed:29, name:'David Gutierrez Moreno',          cat:'C' },
  30: { seed:30, name:'Natalia Barradas',                cat:'C' },
  31: { seed:31, name:'Jannhela Valencia',               cat:'C' },
  32: { seed:32, name:'Donnet Hernandez',                cat:'C' },
  33: { seed:33, name:'Francisco Zamora',                cat:'D' },
  34: { seed:34, name:'Jair Guzmán',                     cat:'D' },
  35: { seed:35, name:'Émilie Darragon',                 cat:'D' },
  36: { seed:36, name:'Manuel Ortiz',                    cat:'D' },
  37: { seed:37, name:'Dimitra Sañudo',                  cat:'D' },
  38: { seed:38, name:'Javier Murillo',                  cat:'D' },
  39: { seed:39, name:'José Roberto Castillo Enríquez',  cat:'D' },
  40: { seed:40, name:'Hugo López',                      cat:'D' },
  41: { seed:41, name:'Cristobal Garcia',                cat:'D' },
  42: { seed:42, name:'Leonel Eduardo Martinez Alanis',  cat:'D' },
  43: { seed:43, name:'Jaime Arellano',                  cat:'D' },
  44: { seed:44, name:'Moises Lopez',                    cat:'D' },
  45: { seed:45, name:'Rodrigo Mayo',                    cat:'D' },
  46: { seed:46, name:'Darina Gudyma',                   cat:'D' },
  47: { seed:47, name:'Susana Murillo',                  cat:'D' },
  48: { seed:48, name:'Luigi Jacob Creado Gonzalez',     cat:'D' },
  49: { seed:49, name:'Adrian Espinosa Aguilar',         cat:'D' },
  50: { seed:50, name:'Camila Melissa Escobar Esquivel', cat:'D' },
  51: { seed:51, name:'Marcos Francisco Jorge Zavala',   cat:'D' },
  52: { seed:52, name:'Daniela Aguilar López',           cat:'D' },
  53: { seed:53, name:'Alondra Y Martinez Soto',         cat:'D' },
  54: { seed:54, name:'Ashley Cantu',                    cat:'D' },
  55: { seed:55, name:'Ana Teniente',                    cat:'D' },
}

// 32 bracket slots: [bye_seed | null, p1_seed | null, p2_seed | null]
// bye_seed = auto winner; p1/p2 = match players
const SLOTS: Array<{ bye?: number; p1?: number; p2?: number }> = [
  { bye: 1 }, { p1: 10, p2: 55 },
  { bye: 8 }, { p1: 11, p2: 54 },
  { bye: 2 }, { p1: 12, p2: 53 },
  { bye: 9 }, { p1: 13, p2: 52 },
  { bye: 3 }, { p1: 14, p2: 51 },
  { bye: 4 }, { p1: 15, p2: 50 },
  { bye: 5 }, { p1: 16, p2: 49 },
  { bye: 6 }, { p1: 17, p2: 48 },
  { bye: 7 }, { p1: 18, p2: 47 },
  { p1: 19, p2: 46 }, { p1: 20, p2: 45 },
  { p1: 21, p2: 44 }, { p1: 22, p2: 43 },
  { p1: 23, p2: 42 }, { p1: 24, p2: 41 },
  { p1: 25, p2: 40 }, { p1: 26, p2: 39 },
  { p1: 27, p2: 38 }, { p1: 28, p2: 37 },
  { p1: 29, p2: 36 }, { p1: 30, p2: 35 },
  { p1: 31, p2: 34 }, { p1: 32, p2: 33 },
]

const ROUNDS = ['R1', 'R2', 'R3', 'R4', 'Semi', 'Final']

function PlayerBtn({ player, winner, onClick, disabled }: {
  player: Player | null
  winner: boolean
  onClick?: () => void
  disabled?: boolean
}) {
  if (!player) return (
    <div className="flex items-center gap-2 px-3 py-2 border border-dashed border-cc-text/10 text-cc-text/20 text-xs font-sans italic">
      Por definir
    </div>
  )
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-2 px-3 py-2.5 text-left transition-all duration-200 ${
        winner
          ? 'bg-cc-dark text-white'
          : disabled
          ? 'opacity-50 cursor-default'
          : 'hover:bg-cc-text/[0.04] cursor-pointer'
      }`}
    >
      <span className={`text-[9px] font-sans px-1 py-0.5 shrink-0 ${winner ? 'bg-white/20 text-white' : CAT_COLOR[player.cat]}`}>
        {player.cat}
      </span>
      <span className={`text-xs font-sans truncate ${winner ? 'text-white font-medium' : 'text-cc-text/70'}`}>
        {player.name}
      </span>
      {winner && <span className="ml-auto text-white/60 text-xs shrink-0">✓</span>}
    </button>
  )
}

export default function BracketPage() {
  // winners[round][matchIndex] = seed of winner (0 = unset)
  const [winners, setWinners] = useState<number[][]>(() => {
    const r1 = SLOTS.map(s => s.bye ?? 0)
    return [r1, Array(16).fill(0), Array(8).fill(0), Array(4).fill(0), Array(2).fill(0), Array(1).fill(0)]
  })

  function getWinner(round: number, idx: number): Player | null {
    const seed = winners[round][idx]
    return seed ? P[seed] : null
  }

  function setWinner(round: number, matchIdx: number, seed: number) {
    setWinners(prev => {
      const next = prev.map(r => [...r])
      next[round][matchIdx] = seed
      // Clear downstream winners if changed
      const clearFrom = round + 1
      let idx = matchIdx
      for (let r = clearFrom; r < ROUNDS.length; r++) {
        idx = Math.floor(idx / 2)
        next[r][idx] = 0
      }
      return next
    })
  }

  function getMatchPlayers(round: number, matchIdx: number): [Player | null, Player | null] {
    if (round === 0) {
      const slot = SLOTS[matchIdx]
      if (slot.bye) return [P[slot.bye], null]
      return [slot.p1 ? P[slot.p1] : null, slot.p2 ? P[slot.p2] : null]
    }
    const p1seed = winners[round - 1][matchIdx * 2]
    const p2seed = winners[round - 1][matchIdx * 2 + 1]
    return [p1seed ? P[p1seed] : null, p2seed ? P[p2seed] : null]
  }

  const champion = winners[5][0] ? P[winners[5][0]] : null

  return (
    <div className="min-h-screen bg-cc-base text-cc-text">
      <Navbar solid />
      <div className="h-16 md:h-20" />

      <div className="px-4 md:px-8 py-10">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/25 mb-2">Court Sessions Vol. II · 30 Mayo 2026</p>
            <h1 className="font-display text-cc-text leading-none"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, fontStyle: 'italic' }}>
              One Point Slam — Draw
            </h1>
            <p className="font-sans text-cc-text/35 text-sm mt-1">55 jugadores · 9 byes · Haz click en el ganador de cada partido</p>
          </div>
          {champion && (
            <div className="border border-cc-dark/20 bg-cc-dark/5 px-6 py-4 text-center">
              <p className="text-xs tracking-widest uppercase font-sans text-cc-text/30 mb-1">Campeón</p>
              <p className="font-display text-cc-text text-xl" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                {champion.name}
              </p>
            </div>
          )}
        </div>

        {/* Bracket — horizontal scroll */}
        <div className="overflow-x-auto pb-6">
          <div className="flex gap-3 min-w-max">
            {ROUNDS.map((roundName, round) => {
              const matchCount = 32 / Math.pow(2, round)
              return (
                <div key={round} className="flex flex-col" style={{ width: round < 2 ? '220px' : '200px' }}>
                  <div className="text-center mb-3">
                    <p className="text-xs tracking-[0.2em] uppercase font-sans text-cc-text/30">{roundName}</p>
                    <p className="text-[10px] font-sans text-cc-text/20">{matchCount} {matchCount === 1 ? 'partido' : 'partidos'}</p>
                  </div>
                  <div className="flex flex-col gap-2" style={{ justifyContent: 'space-around', flex: 1 }}>
                    {Array.from({ length: matchCount }, (_, mi) => {
                      const [p1, p2] = getMatchPlayers(round, mi)
                      const w = winners[round][mi]
                      const isBye = round === 0 && SLOTS[mi].bye
                      return (
                        <div key={mi} className="border border-cc-text/10 overflow-hidden bg-white/50"
                          style={{ marginBottom: round > 0 ? `${(Math.pow(2, round) - 1) * 8}px` : '0' }}>
                          {isBye ? (
                            <div className="px-3 py-2 bg-cc-text/[0.02]">
                              <PlayerBtn player={p1} winner disabled />
                              <div className="text-[9px] font-sans text-cc-text/20 px-1 pt-1">BYE — avanza directo</div>
                            </div>
                          ) : (
                            <>
                              <PlayerBtn player={p1} winner={w === p1?.seed && w !== 0}
                                onClick={p1 && p2 ? () => setWinner(round, mi, p1.seed) : undefined}
                                disabled={!p1 || !p2} />
                              <div className="h-px bg-cc-text/8" />
                              <PlayerBtn player={p2} winner={w === p2?.seed && w !== 0}
                                onClick={p1 && p2 ? () => setWinner(round, mi, p2.seed) : undefined}
                                disabled={!p1 || !p2} />
                            </>
                          )}
                          <div className="px-2 py-0.5 bg-cc-text/[0.02] border-t border-cc-text/6">
                            <span className="text-[9px] font-sans text-cc-text/20">
                              {round === 0 ? (isBye ? `Seed ${SLOTS[mi].bye}` : `P${mi - 8}`) : `${roundName} · P${mi + 1}`}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Reset */}
        <div className="text-center mt-6">
          <button
            onClick={() => setWinners(() => {
              const r1 = SLOTS.map(s => s.bye ?? 0)
              return [r1, Array(16).fill(0), Array(8).fill(0), Array(4).fill(0), Array(2).fill(0), Array(1).fill(0)]
            })}
            className="text-xs font-sans text-cc-text/25 hover:text-cc-text/50 transition-colors border border-cc-text/10 px-5 py-2 hover:border-cc-text/25"
          >
            Reiniciar bracket
          </button>
        </div>
      </div>
    </div>
  )
}
