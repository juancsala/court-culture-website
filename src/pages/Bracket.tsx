import { useState } from 'react'

const CAT_COLOR: Record<string, string> = {
  A: 'bg-white text-cc-dark font-bold',
  B: 'bg-white/70 text-cc-dark',
  C: 'bg-white/40 text-cc-dark',
  D: 'bg-white/15 text-white/70',
  '?': 'bg-white/20 text-white/60',
}

interface Player { seed: number; name: string; cat: string }

const BASE_PLAYERS: Record<number, Player> = {
  1:  { seed:1,  name:'Carlos Chavez',           cat:'A' },
  2:  { seed:2,  name:'Paco Moreno',             cat:'A' },
  3:  { seed:3,  name:'Vale Cardenas',           cat:'A' },
  4:  { seed:4,  name:'Luis Emiliano Guzman',    cat:'A' },
  5:  { seed:5,  name:'Carlos Escobar',          cat:'A' },
  6:  { seed:6,  name:'Mauricio Velazquez',      cat:'A' },
  7:  { seed:7,  name:'Josue Gomez',             cat:'A' },
  8:  { seed:8,  name:'Miguel Martinez',         cat:'B' },
  9:  { seed:9,  name:'Danilo Garces',           cat:'B' },
  10: { seed:10, name:'Carlos Altamirano',       cat:'B' },
  11: { seed:11, name:'Santiago Resendiz',       cat:'B' },
  12: { seed:12, name:'Jorge E Resendiz',        cat:'B' },
  13: { seed:13, name:'Jose Ivan Arguelles',     cat:'B' },
  14: { seed:14, name:'Camilo Quiroz',           cat:'B' },
  15: { seed:15, name:'Claudia Salinas',         cat:'B' },
  16: { seed:16, name:'L.A. Dominguez',          cat:'C' },
  17: { seed:17, name:'Janeth Cantú Garza',      cat:'C' },
  18: { seed:18, name:'Sergio Sanchez',          cat:'C' },
  19: { seed:19, name:'Erick Lozano',            cat:'C' },
  20: { seed:20, name:'Fernando Roman',          cat:'C' },
  21: { seed:21, name:'Leopoldo Rojas',          cat:'C' },
  22: { seed:22, name:'Ricardo Loera',           cat:'C' },
  23: { seed:23, name:'Melisa Rodriguez',        cat:'C' },
  24: { seed:24, name:'Ulrich Martinez',         cat:'C' },
  25: { seed:25, name:'Sergio Muñoz',            cat:'C' },
  26: { seed:26, name:'Marco A. Ramirez',        cat:'C' },
  27: { seed:27, name:'Veronica Porras',         cat:'C' },
  28: { seed:28, name:'Mariana Alvarez',         cat:'C' },
  29: { seed:29, name:'David Gutierrez',         cat:'C' },
  30: { seed:30, name:'Natalia Barradas',        cat:'C' },
  31: { seed:31, name:'Jannhela Valencia',       cat:'C' },
  32: { seed:32, name:'Donnet Hernandez',        cat:'C' },
  33: { seed:33, name:'Francisco Zamora',        cat:'D' },
  34: { seed:34, name:'Jair Guzmán',             cat:'D' },
  35: { seed:35, name:'Émilie Darragon',         cat:'D' },
  36: { seed:36, name:'Manuel Ortiz',            cat:'D' },
  37: { seed:37, name:'Dimitra Sañudo',          cat:'D' },
  38: { seed:38, name:'Javier Murillo',          cat:'D' },
  39: { seed:39, name:'J.R. Castillo',           cat:'D' },
  40: { seed:40, name:'Hugo López',              cat:'D' },
  41: { seed:41, name:'Cristobal Garcia',        cat:'D' },
  42: { seed:42, name:'Leonel Martinez',         cat:'D' },
  43: { seed:43, name:'Jaime Arellano',          cat:'D' },
  44: { seed:44, name:'Moises Lopez',            cat:'D' },
  45: { seed:45, name:'Rodrigo Mayo',            cat:'D' },
  46: { seed:46, name:'Darina Gudyma',           cat:'D' },
  47: { seed:47, name:'Susana Murillo',          cat:'D' },
  48: { seed:48, name:'Luigi Jacob',             cat:'D' },
  49: { seed:49, name:'Adrian Espinosa',         cat:'D' },
  50: { seed:50, name:'Camila Escobar',          cat:'D' },
  51: { seed:51, name:'M.F. Jorge Zavala',       cat:'D' },
  52: { seed:52, name:'Daniela Aguilar',         cat:'D' },
  53: { seed:53, name:'Alondra Martinez',        cat:'D' },
  54: { seed:54, name:'Ashley Cantu',            cat:'D' },
  55: { seed:55, name:'Ana Teniente',            cat:'D' },
}

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

const ROW_H = 26
const TOTAL_H = 1024
const CONNECTOR_W = 16

function PlayerRow({ player, isWinner, onClick, canClick, side = 'left' }: {
  player: Player | null; isWinner: boolean; onClick?: () => void; canClick?: boolean; side?: 'left' | 'right'
}) {
  if (!player) return (
    <div className="flex items-center px-2 text-white/15 text-[11px] font-sans italic" style={{ height: ROW_H }}>
      {side === 'right' ? '— Por definir' : 'Por definir —'}
    </div>
  )
  return (
    <button
      onClick={onClick}
      disabled={!canClick}
      title={isWinner ? 'Click para revertir' : canClick ? 'Click para seleccionar ganador' : ''}
      className={`w-full flex items-center gap-1.5 px-2 transition-all duration-150 group
        ${isWinner ? 'bg-white text-cc-dark' : 'text-white/75'}
        ${canClick ? 'hover:bg-white/10 hover:text-white cursor-pointer' : 'cursor-default'}`}
      style={{ height: ROW_H }}
    >
      {side === 'right' ? (
        <>
          <span className="font-sans text-[11px] truncate flex-1 text-right">{player.name}</span>
          <span className={`text-[9px] px-1 py-px shrink-0 ${isWinner ? 'bg-cc-dark text-white' : CAT_COLOR[player.cat] || CAT_COLOR['?']}`}>{player.cat}</span>
          {isWinner && <span className="text-cc-dark text-xs shrink-0">✓</span>}
        </>
      ) : (
        <>
          <span className={`text-[9px] px-1 py-px shrink-0 ${isWinner ? 'bg-cc-dark text-white' : CAT_COLOR[player.cat] || CAT_COLOR['?']}`}>{player.cat}</span>
          <span className="font-sans text-[11px] truncate flex-1">{player.name}</span>
          {isWinner && <span className="text-cc-dark text-xs shrink-0">✓</span>}
        </>
      )}
    </button>
  )
}

function AddPlayerForm({ onAdd, onCancel }: {
  onAdd: (name: string, cat: string) => void; onCancel: () => void
}) {
  const [name, setName] = useState('')
  const [cat, setCat] = useState('D')
  return (
    <div className="p-2 bg-white/5 border-t border-white/10 flex flex-col gap-1.5">
      <input
        autoFocus
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nombre del jugador"
        className="w-full bg-white/10 border border-white/20 px-2 py-1 text-[11px] font-sans text-white placeholder-white/30 focus:outline-none focus:border-white/40"
        onKeyDown={e => { if (e.key === 'Enter' && name.trim()) onAdd(name.trim(), cat) }}
      />
      <div className="flex gap-1 items-center">
        {['A','B','C','D'].map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`text-[10px] px-2 py-0.5 transition-all ${cat === c ? 'bg-white text-cc-dark' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
            {c}
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={onCancel} className="text-[10px] font-sans text-white/30 hover:text-white/50 px-1">✕</button>
        <button onClick={() => name.trim() && onAdd(name.trim(), cat)}
          className="text-[10px] font-sans bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 disabled:opacity-40"
          disabled={!name.trim()}>
          OK
        </button>
      </div>
    </div>
  )
}

function MatchBox({ p1, p2, winner, onWin, isByeAuto, showAdd, onAddPlayer, side }: {
  p1: Player | null; p2: Player | null; winner: number; onWin: (seed: number) => void;
  isByeAuto?: boolean; showAdd?: boolean; onAddPlayer?: () => void; side?: 'left' | 'right'
}) {
  const canClick = !!(p1 && p2)
  const [addingPlayer, setAddingPlayer] = useState(false)

  return (
    <div className="border border-white/15 overflow-hidden w-[170px]" style={{ background: 'rgba(13,26,13,0.7)' }}>
      <PlayerRow player={p1} isWinner={canClick && winner === p1?.seed && winner !== 0}
        onClick={canClick ? () => onWin(p1!.seed) : undefined} canClick={canClick} side={side} />
      {!isByeAuto && <div className="border-t border-white/10" />}
      {!isByeAuto && (
        <PlayerRow player={p2} isWinner={canClick && winner === p2?.seed && winner !== 0}
          onClick={canClick ? () => onWin(p2!.seed) : undefined} canClick={canClick} side={side} />
      )}
      {isByeAuto && !addingPlayer && showAdd && (
        <button onClick={() => setAddingPlayer(true)}
          className="w-full text-[10px] font-sans text-white/20 hover:text-white/50 hover:bg-white/5 py-1 transition-colors border-t border-white/6 flex items-center justify-center gap-1">
          <span>+</span> agregar rival
        </button>
      )}
      {addingPlayer && (
        <AddPlayerForm
          onAdd={(name, cat) => {
            setAddingPlayer(false)
            onAddPlayer && onAddPlayer()
            // handled externally via callback with name+cat
            if (onAddPlayer) (onAddPlayer as any)(name, cat)
          }}
          onCancel={() => setAddingPlayer(false)}
        />
      )}
    </div>
  )
}

export default function BracketPage() {
  const [extraPlayers, setExtraPlayers] = useState<Record<number, Player>>({})
  const allPlayers = { ...BASE_PLAYERS, ...extraPlayers }

  const [winners, setWinners] = useState<number[][]>(() => {
    const r0 = SLOTS.map(s => s.bye ?? 0)
    return [r0, Array(16).fill(0), Array(8).fill(0), Array(4).fill(0), Array(2).fill(0), Array(1).fill(0)]
  })

  function addExtraPlayer(slotIdx: number, name: string, cat: string) {
    const seed = 56 + Object.keys(extraPlayers).length
    const player: Player = { seed, name, cat }
    setExtraPlayers(prev => ({ ...prev, [slotIdx]: player }))
    // Clear the auto-win for this bye slot
    setWinners(prev => {
      const next = prev.map(r => [...r])
      next[0][slotIdx] = 0
      let idx = slotIdx
      for (let r = 1; r < next.length; r++) {
        idx = Math.floor(idx / 2)
        next[r][idx] = 0
      }
      return next
    })
  }

  function setWinnerR(round: number, absIdx: number, seed: number) {
    setWinners(prev => {
      const next = prev.map(r => [...r])
      // Toggle: click winner again to deselect
      if (next[round][absIdx] === seed) {
        next[round][absIdx] = 0
        let idx = absIdx
        for (let r = round + 1; r < next.length; r++) {
          idx = Math.floor(idx / 2)
          next[r][idx] = 0
        }
      } else {
        next[round][absIdx] = seed
        let idx = absIdx
        for (let r = round + 1; r < next.length; r++) {
          idx = Math.floor(idx / 2)
          next[r][idx] = 0
        }
      }
      return next
    })
  }

  function getSlotPlayers(absIdx: number): [Player | null, Player | null] {
    const s = SLOTS[absIdx]
    if (!s) return [null, null]
    if (s.bye) {
      const extra = extraPlayers[absIdx]
      return [allPlayers[s.bye] || null, extra || null]
    }
    return [s.p1 ? allPlayers[s.p1] || null : null, s.p2 ? allPlayers[s.p2] || null : null]
  }

  function BracketHalf({ slotStart, side }: { slotStart: number; side: 'left' | 'right' }) {
    const rounds = [0, 1, 2, 3, 4]

    function getMatchPlayers(round: number, localIdx: number): [Player | null, Player | null] {
      const absIdx = slotStart / Math.pow(2, round) + localIdx
      if (round === 0) return getSlotPlayers(absIdx)
      const p1seed = winners[round - 1]?.[absIdx * 2]
      const p2seed = winners[round - 1]?.[absIdx * 2 + 1]
      return [p1seed ? allPlayers[p1seed] : null, p2seed ? allPlayers[p2seed] : null]
    }

    function getWinner(round: number, localIdx: number): number {
      const absIdx = slotStart / Math.pow(2, round) + localIdx
      if (round === 0 && SLOTS[absIdx]?.bye && !extraPlayers[absIdx]) return SLOTS[absIdx].bye!
      return winners[round]?.[absIdx] ?? 0
    }

    return (
      <div className={`flex ${side === 'right' ? 'flex-row-reverse' : 'flex-row'}`} style={{ height: TOTAL_H }}>
        {rounds.map(round => {
          const count = 16 / Math.pow(2, round)
          const slotH = TOTAL_H / count
          return (
            <div key={round} className="flex flex-col" style={{ width: 170 + (round < 4 ? CONNECTOR_W : 0) }}>
              {Array.from({ length: count }, (_, li) => {
                const [p1, p2] = getMatchPlayers(round, li)
                const w = getWinner(round, li)
                const absIdx = slotStart / Math.pow(2, round) + li
                const isByeAuto = round === 0 && !!SLOTS[absIdx]?.bye && !extraPlayers[absIdx]
                const isTopOfPair = li % 2 === 0

                return (
                  <div key={li} className="relative flex items-center" style={{ height: slotH }}>
                    <MatchBox
                      p1={p1} p2={p2} winner={w} side={side}
                      isByeAuto={isByeAuto}
                      showAdd={round === 0 && !!SLOTS[absIdx]?.bye && !extraPlayers[absIdx]}
                      onAddPlayer={((name: string, cat: string) => addExtraPlayer(absIdx, name, cat)) as any}
                      onWin={(seed) => setWinnerR(round, absIdx, seed)}
                    />
                    {round < 4 && (
                      <div className="absolute" style={{
                        [side === 'left' ? 'right' : 'left']: 0,
                        width: CONNECTOR_W,
                        top: isTopOfPair ? '50%' : 0,
                        bottom: isTopOfPair ? 0 : '50%',
                        borderTop: isTopOfPair ? '1px solid rgba(255,255,255,0.18)' : 'none',
                        borderBottom: isTopOfPair ? 'none' : '1px solid rgba(255,255,255,0.18)',
                        [side === 'left' ? 'borderRight' : 'borderLeft']: '1px solid rgba(255,255,255,0.18)',
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

  const leftFinalist = winners[4]?.[0] ? allPlayers[winners[4][0]] : null
  const rightFinalist = winners[4]?.[1] ? allPlayers[winners[4][1]] : null
  const champion = winners[5]?.[0] ? allPlayers[winners[5][0]] : null

  return (
    <div className="min-h-screen bg-cc-dark overflow-auto select-none">
      {/* Header */}
      <div className="flex flex-col items-center py-5 border-b border-white/8">
        <img src="/logo-main-white.png" alt="Court Culture" className="h-12 w-auto object-contain mb-3 opacity-80" />
        <h1 className="font-display text-white" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 300, fontStyle: 'italic' }}>
          One Point Slam · 30 Mayo 2026
        </h1>
        <div className="flex items-center gap-5 mt-2">
          {['A','B','C','D'].map(c => (
            <div key={c} className="flex items-center gap-1">
              <span className={`text-[9px] px-1 py-px ${CAT_COLOR[c]}`}>{c}</span>
              <span className="text-[10px] font-sans text-white/25">{c==='A'||c==='B'?'Avanzado':c==='C'?'Intermedio':'Básico'}</span>
            </div>
          ))}
          <span className="text-[10px] font-sans text-white/20 ml-4">Click ganador · Click de nuevo para revertir</span>
        </div>
      </div>

      {/* Bracket */}
      <div className="flex items-center justify-center pb-8 pt-4" style={{ overflowX: 'auto', minWidth: 'max-content' }}>
        <BracketHalf slotStart={0} side="left" />

        {/* Center Final */}
        <div className="flex flex-col items-center justify-center px-4" style={{ height: TOTAL_H, minWidth: 180 }}>
          {champion ? (
            <div className="text-center mb-5">
              <p className="text-[10px] tracking-widest uppercase font-sans text-yellow-400/60 mb-1">🏆 Campeón</p>
              <p className="font-display text-white text-lg" style={{ fontStyle: 'italic', fontWeight: 300 }}>{champion.name}</p>
              <span className={`text-[9px] px-2 py-px mt-1 inline-block ${CAT_COLOR[champion.cat] || CAT_COLOR['?']}`}>{champion.cat}</span>
            </div>
          ) : (
            <p className="font-display text-white/15 text-base mb-5" style={{ fontStyle: 'italic' }}>CAMPEÓN</p>
          )}

          <div className="border border-white/20 w-full overflow-hidden mb-1">
            <p className="text-center text-[9px] tracking-widest uppercase font-sans text-white/20 py-1.5 border-b border-white/10">
              Gran Final
            </p>
            {[leftFinalist, rightFinalist].map((finalist, fi) => (
              <div key={fi}>
                {fi === 1 && <div className="border-t border-white/10" />}
                <button
                  disabled={!leftFinalist || !rightFinalist}
                  onClick={() => finalist && leftFinalist && rightFinalist && setWinnerR(5, 0, finalist.seed)}
                  className={`w-full flex items-center gap-2 px-3 transition-all
                    ${leftFinalist && rightFinalist ? 'cursor-pointer hover:bg-white/10' : 'cursor-default'}
                    ${champion?.seed === finalist?.seed && champion ? 'bg-white text-cc-dark' : 'text-white/60'}`}
                  style={{ height: ROW_H + 4 }}
                >
                  {finalist ? (
                    <>
                      <span className={`text-[9px] px-1 py-px shrink-0 ${champion?.seed === finalist.seed && champion ? 'bg-cc-dark text-white' : CAT_COLOR[finalist.cat] || CAT_COLOR['?']}`}>{finalist.cat}</span>
                      <span className="text-[11px] font-sans truncate">{finalist.name}</span>
                      {champion?.seed === finalist.seed && <span className="ml-auto text-[11px]">✓</span>}
                    </>
                  ) : (
                    <span className="text-white/15 text-[11px] italic font-sans">{fi === 0 ? 'Finalista A' : 'Finalista B'}</span>
                  )}
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setExtraPlayers({})
              setWinners(() => {
                const r0 = SLOTS.map(s => s.bye ?? 0)
                return [r0, Array(16).fill(0), Array(8).fill(0), Array(4).fill(0), Array(2).fill(0), Array(1).fill(0)]
              })
            }}
            className="mt-4 text-[10px] font-sans text-white/15 hover:text-white/35 border border-white/10 px-4 py-1.5 transition-colors">
            Reiniciar bracket
          </button>
        </div>

        <BracketHalf slotStart={16} side="right" />
      </div>
    </div>
  )
}
