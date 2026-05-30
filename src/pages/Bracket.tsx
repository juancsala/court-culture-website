import { useState } from 'react'

const CAT_COLOR: Record<string, string> = {
  A: 'bg-white text-cc-dark font-bold',
  B: 'bg-white/70 text-cc-dark',
  C: 'bg-white/40 text-cc-dark',
  D: 'bg-white/15 text-white/70',
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
  13: { seed:13, name:'Jose Ivan Arguelles',             cat:'B' },
  14: { seed:14, name:'Camilo Quiroz',                   cat:'B' },
  15: { seed:15, name:'Claudia Salinas',                 cat:'B' },
  16: { seed:16, name:'L.A. Dominguez',                  cat:'C' },
  17: { seed:17, name:'Janeth Cantú Garza',              cat:'C' },
  18: { seed:18, name:'Sergio Sanchez',                  cat:'C' },
  19: { seed:19, name:'Erick Lozano',                    cat:'C' },
  20: { seed:20, name:'Fernando Roman',                  cat:'C' },
  21: { seed:21, name:'Leopoldo Rojas',                  cat:'C' },
  22: { seed:22, name:'Ricardo Loera',                   cat:'C' },
  23: { seed:23, name:'Melisa Rodriguez',                cat:'C' },
  24: { seed:24, name:'Ulrich Martinez',                 cat:'C' },
  25: { seed:25, name:'Sergio Muñoz',                    cat:'C' },
  26: { seed:26, name:'Marco A. Ramirez',                cat:'C' },
  27: { seed:27, name:'Veronica Porras',                 cat:'C' },
  28: { seed:28, name:'Mariana Alvarez',                 cat:'C' },
  29: { seed:29, name:'David Gutierrez',                 cat:'C' },
  30: { seed:30, name:'Natalia Barradas',                cat:'C' },
  31: { seed:31, name:'Jannhela Valencia',               cat:'C' },
  32: { seed:32, name:'Donnet Hernandez',                cat:'C' },
  33: { seed:33, name:'Francisco Zamora',                cat:'D' },
  34: { seed:34, name:'Jair Guzmán',                     cat:'D' },
  35: { seed:35, name:'Émilie Darragon',                 cat:'D' },
  36: { seed:36, name:'Manuel Ortiz',                    cat:'D' },
  37: { seed:37, name:'Dimitra Sañudo',                  cat:'D' },
  38: { seed:38, name:'Javier Murillo',                  cat:'D' },
  39: { seed:39, name:'J.R. Castillo',                   cat:'D' },
  40: { seed:40, name:'Hugo López',                      cat:'D' },
  41: { seed:41, name:'Cristobal Garcia',                cat:'D' },
  42: { seed:42, name:'Leonel Martinez',                 cat:'D' },
  43: { seed:43, name:'Jaime Arellano',                  cat:'D' },
  44: { seed:44, name:'Moises Lopez',                    cat:'D' },
  45: { seed:45, name:'Rodrigo Mayo',                    cat:'D' },
  46: { seed:46, name:'Darina Gudyma',                   cat:'D' },
  47: { seed:47, name:'Susana Murillo',                  cat:'D' },
  48: { seed:48, name:'Luigi Jacob',                     cat:'D' },
  49: { seed:49, name:'Adrian Espinosa',                 cat:'D' },
  50: { seed:50, name:'Camila Escobar',                  cat:'D' },
  51: { seed:51, name:'M.F. Jorge Zavala',               cat:'D' },
  52: { seed:52, name:'Daniela Aguilar',                 cat:'D' },
  53: { seed:53, name:'Alondra Martinez',                cat:'D' },
  54: { seed:54, name:'Ashley Cantu',                    cat:'D' },
  55: { seed:55, name:'Ana Teniente',                    cat:'D' },
}

// 32 bracket slots
const SLOTS: Array<{ bye?: number; p1?: number; p2?: number }> = [
  { bye:1 }, { p1:10, p2:55 }, { bye:8 }, { p1:11, p2:54 },
  { bye:2 }, { p1:12, p2:53 }, { bye:9 }, { p1:13, p2:52 },
  { bye:3 }, { p1:14, p2:51 }, { bye:4 }, { p1:15, p2:50 },
  { bye:5 }, { p1:16, p2:49 }, { bye:6 }, { p1:17, p2:48 },
  { bye:7 }, { p1:18, p2:47 }, { p1:19, p2:46 }, { p1:20, p2:45 },
  { p1:21, p2:44 }, { p1:22, p2:43 }, { p1:23, p2:42 }, { p1:24, p2:41 },
  { p1:25, p2:40 }, { p1:26, p2:39 }, { p1:27, p2:38 }, { p1:28, p2:37 },
  { p1:29, p2:36 }, { p1:30, p2:35 }, { p1:31, p2:34 }, { p1:32, p2:33 },
]

const ROW_H = 26 // px per player row
const TOTAL_H = 1024 // total bracket height per half

function PlayerRow({ player, isWinner, isBye, onClick, canClick, side = 'left' }: {
  player: Player | null; isWinner: boolean; isBye?: boolean; onClick?: () => void; canClick?: boolean; side?: 'left' | 'right'
}) {
  if (!player) return (
    <div className={`flex items-center gap-1.5 px-2 text-white/15 text-[11px] font-sans italic`} style={{ height: ROW_H }}>
      {side === 'right' ? <>— Por definir</> : <>Por definir —</>}
    </div>
  )
  return (
    <button
      onClick={onClick}
      disabled={!canClick && !isBye}
      className={`w-full flex items-center gap-1.5 px-2 transition-all duration-150 ${
        isWinner ? 'bg-white text-cc-dark' : 'text-white/75 hover:bg-white/10 hover:text-white'
      } ${(!canClick && !isBye) ? 'cursor-default' : 'cursor-pointer'}`}
      style={{ height: ROW_H }}
    >
      {side === 'right' ? (
        <>
          <span className="font-sans text-[11px] truncate flex-1 text-right">{player.name}</span>
          <span className={`text-[9px] px-1 py-px shrink-0 ${isWinner ? 'bg-cc-dark text-white' : CAT_COLOR[player.cat]}`}>{player.cat}</span>
        </>
      ) : (
        <>
          <span className={`text-[9px] px-1 py-px shrink-0 ${isWinner ? 'bg-cc-dark text-white' : CAT_COLOR[player.cat]}`}>{player.cat}</span>
          <span className="font-sans text-[11px] truncate flex-1">{player.name}</span>
        </>
      )}
    </button>
  )
}

function Match({ slot, winner, p1, p2, onWin, isBye, side }: {
  slot?: typeof SLOTS[0]; winner: number; p1: Player | null; p2: Player | null;
  onWin: (seed: number) => void; isBye?: boolean; side?: 'left' | 'right'
}) {
  const canClick = !!(p1 && p2)
  return (
    <div className="border border-white/15 overflow-hidden bg-cc-dark/60 backdrop-blur-sm w-[170px]">
      <PlayerRow player={p1} isWinner={winner === p1?.seed && winner !== 0} isBye={isBye && !p2}
        onClick={canClick ? () => onWin(p1!.seed) : undefined} canClick={canClick} side={side} />
      {!isBye && <div className="border-t border-white/10" />}
      {!isBye && <PlayerRow player={p2} isWinner={winner === p2?.seed && winner !== 0}
        onClick={canClick ? () => onWin(p2!.seed) : undefined} canClick={canClick} side={side} />}
      {isBye && <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />}
    </div>
  )
}

function BracketHalf({ slotStart, winners, setWinnerR, side }: {
  slotStart: number; winners: number[][]; setWinnerR: (r: number, mi: number, seed: number) => void; side: 'left' | 'right'
}) {
  const rounds = [0, 1, 2, 3, 4] // R1 to SF (5 rounds per half)

  function getMatchPlayers(round: number, localIdx: number): [Player | null, Player | null] {
    const absIdx = slotStart / Math.pow(2, round) + localIdx
    if (round === 0) {
      const s = SLOTS[absIdx]
      if (!s) return [null, null]
      if (s.bye) return [P[s.bye], null]
      return [s.p1 ? P[s.p1] : null, s.p2 ? P[s.p2] : null]
    }
    const p1seed = winners[round - 1]?.[absIdx * 2]
    const p2seed = winners[round - 1]?.[absIdx * 2 + 1]
    return [p1seed ? P[p1seed] : null, p2seed ? P[p2seed] : null]
  }

  function getWinner(round: number, localIdx: number): number {
    const absIdx = slotStart / Math.pow(2, round) + localIdx
    if (round === 0 && SLOTS[absIdx]?.bye) return SLOTS[absIdx].bye!
    return winners[round]?.[absIdx] ?? 0
  }

  const CONNECTOR_W = 16

  return (
    <div className={`flex ${side === 'right' ? 'flex-row-reverse' : 'flex-row'}`} style={{ height: TOTAL_H }}>
      {rounds.map(round => {
        const count = 16 / Math.pow(2, round)
        const slotH = TOTAL_H / count
        const connectorW = round < 4 ? CONNECTOR_W : 0
        return (
          <div key={round} className={`flex flex-col relative`} style={{ width: 170 + connectorW }}>
            {Array.from({ length: count }, (_, li) => {
              const [p1, p2] = getMatchPlayers(round, li)
              const w = getWinner(round, li)
              const absIdx = slotStart / Math.pow(2, round) + li
              const isBye = round === 0 && !!SLOTS[absIdx]?.bye
              const isTopOfPair = li % 2 === 0
              return (
                <div key={li} className="relative flex items-center"
                  style={{ height: slotH, [side === 'left' ? 'paddingLeft' : 'paddingRight']: round * 0 }}>
                  {/* Match box */}
                  <div style={{ [side === 'left' ? 'marginLeft' : 'marginRight']: 0 }}>
                    <Match p1={p1} p2={p2} winner={w} isBye={isBye} side={side}
                      onWin={(seed) => {
                        setWinnerR(round, absIdx, seed)
                      }} />
                  </div>
                  {/* Connector to next round */}
                  {round < 4 && (
                    <div className="absolute" style={{
                      [side === 'left' ? 'right' : 'left']: 0,
                      width: CONNECTOR_W,
                      top: isTopOfPair ? '50%' : 0,
                      bottom: isTopOfPair ? 0 : '50%',
                      borderTop: isTopOfPair ? '1px solid rgba(255,255,255,0.2)' : 'none',
                      borderBottom: isTopOfPair ? 'none' : '1px solid rgba(255,255,255,0.2)',
                      [side === 'left' ? 'borderRight' : 'borderLeft']: '1px solid rgba(255,255,255,0.2)',
                    }} />
                  )}
                  {/* Horizontal line to center of pair */}
                  {round < 4 && (
                    <div className="absolute" style={{
                      [side === 'left' ? 'right' : 'left']: 0,
                      width: CONNECTOR_W,
                      top: isTopOfPair ? 'calc(50% + 25%)' : '25%',
                      height: 1,
                      background: 'rgba(255,255,255,0.2)',
                    }} />
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default function BracketPage() {
  const initWinners = () => {
    const r0 = SLOTS.map(s => s.bye ?? 0)
    return [r0, Array(16).fill(0), Array(8).fill(0), Array(4).fill(0), Array(2).fill(0), Array(1).fill(0)]
  }
  const [winners, setWinners] = useState<number[][]>(initWinners)

  function setWinnerR(round: number, absIdx: number, seed: number) {
    setWinners(prev => {
      const next = prev.map(r => [...r])
      next[round][absIdx] = seed
      let idx = absIdx
      for (let r = round + 1; r < next.length; r++) {
        idx = Math.floor(idx / 2)
        next[r][idx] = 0
      }
      return next
    })
  }

  // Final match: winner of left half final (absIdx=0 in r4) vs right half (absIdx=1 in r4)
  const leftFinalist = winners[4]?.[0] ? P[winners[4][0]] : null
  const rightFinalist = winners[4]?.[1] ? P[winners[4][1]] : null
  const champion = winners[5]?.[0] ? P[winners[5][0]] : null
  const canFinal = !!(leftFinalist && rightFinalist)

  return (
    <div className="min-h-screen bg-cc-dark overflow-auto">
      {/* Header */}
      <div className="text-center py-6">
        <p className="text-xs tracking-[0.3em] uppercase font-sans text-white/25 mb-1">Court Culture · 30 Mayo 2026</p>
        <h1 className="font-display text-white" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, fontStyle: 'italic' }}>
          One Point Slam
        </h1>
        <div className="flex items-center justify-center gap-6 mt-3">
          {['A','B','C','D'].map(c => (
            <div key={c} className="flex items-center gap-1.5">
              <span className={`text-[9px] px-1.5 py-px ${CAT_COLOR[c]}`}>{c}</span>
              <span className="text-[10px] font-sans text-white/30">{c==='A'?'Avanzado':c==='B'?'Avanzado+':c==='C'?'Intermedio':'Básico'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bracket */}
      <div className="flex items-center justify-center px-4 pb-8 gap-0" style={{ overflowX: 'auto' }}>

        {/* Left half */}
        <BracketHalf slotStart={0} winners={winners} setWinnerR={setWinnerR} side="left" />

        {/* Center — Final */}
        <div className="flex flex-col items-center justify-center px-3" style={{ height: TOTAL_H, minWidth: 180 }}>
          <div className="text-center mb-6">
            {champion ? (
              <>
                <p className="text-xs tracking-[0.2em] uppercase font-sans text-yellow-400/70 mb-2">🏆 Campeón</p>
                <p className="font-display text-white text-xl" style={{ fontStyle: 'italic', fontWeight: 300 }}>{champion.name}</p>
                <span className={`text-[10px] px-2 py-0.5 mt-1 inline-block ${CAT_COLOR[champion.cat]}`}>{champion.cat}</span>
              </>
            ) : (
              <p className="font-display text-white/20 text-lg" style={{ fontStyle: 'italic', fontWeight: 300 }}>CAMPEÓN</p>
            )}
          </div>

          {/* Final match */}
          <div className="border border-white/20 w-full overflow-hidden">
            <p className="text-center text-[10px] tracking-widest uppercase font-sans text-white/25 py-1.5 border-b border-white/10">
              Gran Final
            </p>
            <button
              className={`w-full flex items-center gap-2 px-3 py-2 transition-all ${canFinal && leftFinalist ? 'hover:bg-white/10 cursor-pointer' : 'cursor-default'} ${champion?.seed === leftFinalist?.seed && champion ? 'bg-white text-cc-dark' : 'text-white/70'}`}
              style={{ height: ROW_H + 4 }}
              onClick={() => leftFinalist && canFinal && setWinnerR(5, 0, leftFinalist.seed)}
            >
              {leftFinalist ? (
                <>
                  <span className={`text-[9px] px-1 py-px shrink-0 ${champion?.seed === leftFinalist.seed && champion ? 'bg-cc-dark text-white' : CAT_COLOR[leftFinalist.cat]}`}>{leftFinalist.cat}</span>
                  <span className="text-[11px] font-sans truncate">{leftFinalist.name}</span>
                  {champion?.seed === leftFinalist.seed && <span className="ml-auto text-cc-dark text-xs">✓</span>}
                </>
              ) : <span className="text-white/20 text-xs italic font-sans">Finalista izquierdo</span>}
            </button>
            <div className="border-t border-white/10" />
            <button
              className={`w-full flex items-center gap-2 px-3 py-2 transition-all ${canFinal && rightFinalist ? 'hover:bg-white/10 cursor-pointer' : 'cursor-default'} ${champion?.seed === rightFinalist?.seed && champion ? 'bg-white text-cc-dark' : 'text-white/70'}`}
              style={{ height: ROW_H + 4 }}
              onClick={() => rightFinalist && canFinal && setWinnerR(5, 0, rightFinalist.seed)}
            >
              {rightFinalist ? (
                <>
                  <span className={`text-[9px] px-1 py-px shrink-0 ${champion?.seed === rightFinalist.seed && champion ? 'bg-cc-dark text-white' : CAT_COLOR[rightFinalist.cat]}`}>{rightFinalist.cat}</span>
                  <span className="text-[11px] font-sans truncate">{rightFinalist.name}</span>
                  {champion?.seed === rightFinalist.seed && <span className="ml-auto text-cc-dark text-xs">✓</span>}
                </>
              ) : <span className="text-white/20 text-xs italic font-sans">Finalista derecho</span>}
            </button>
          </div>

          <button onClick={() => setWinners(initWinners)}
            className="mt-6 text-[10px] font-sans text-white/20 hover:text-white/40 border border-white/10 px-4 py-1.5 transition-colors">
            Reiniciar
          </button>
        </div>

        {/* Right half */}
        <BracketHalf slotStart={16} winners={winners} setWinnerR={setWinnerR} side="right" />
      </div>
    </div>
  )
}
