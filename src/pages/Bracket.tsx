import { useState } from 'react'

const CAT_COLOR: Record<string, string> = {
  A: 'bg-gray-900 text-white font-bold',
  B: 'bg-gray-600 text-white',
  C: 'bg-gray-300 text-gray-800',
  D: 'bg-gray-100 text-gray-500',
  '?': 'bg-gray-200 text-gray-500',
}

interface Player { seed: number; name: string; cat: string }
type Slot = { bye?: number; p1?: number; p2?: number }

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

const BYE_POSITIONS = [0, 2, 4, 6, 8, 10, 12, 14, 16]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function makeSlots(players: Player[]): Slot[] {
  const shuffled = shuffle(players)
  const byePlayers = shuffled.slice(0, 9)
  const rest = shuffled.slice(9) // 46 players → 23 matches
  const slots: Slot[] = []
  let bi = 0, mi = 0
  for (let i = 0; i < 32; i++) {
    if (BYE_POSITIONS.includes(i)) {
      slots.push({ bye: byePlayers[bi++].seed })
    } else {
      slots.push({ p1: rest[mi].seed, p2: rest[rest.length - 1 - mi].seed })
      mi++
    }
  }
  return slots
}

const ROW_H = 26
const TOTAL_H = 1024
const CONNECTOR_W = 16

function PlayerRow({ player, isWinner, onClick, canClick, side = 'left' }: {
  player: Player | null; isWinner: boolean; onClick?: () => void; canClick?: boolean; side?: 'left' | 'right'
}) {
  if (!player) return (
    <div className="flex items-center px-2 text-gray-300 text-[11px] font-sans italic" style={{ height: ROW_H }}>
      {side === 'right' ? '— Por definir' : 'Por definir —'}
    </div>
  )
  return (
    <button onClick={onClick} disabled={!canClick}
      title={isWinner ? 'Click para revertir' : canClick ? 'Click para seleccionar ganador' : ''}
      className={`w-full flex items-center gap-1.5 px-2 transition-all duration-150
        ${isWinner ? 'bg-gray-900 text-white' : 'text-gray-700'}
        ${canClick ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-default'}`}
      style={{ height: ROW_H }}>
      {side === 'right' ? (
        <>
          <span className="font-sans text-[11px] truncate flex-1 text-right">{player.name}</span>
          <span className={`text-[9px] px-1 py-px shrink-0 ${isWinner ? 'bg-white text-gray-900' : CAT_COLOR[player.cat] || CAT_COLOR['?']}`}>{player.cat}</span>
          {isWinner && <span className="text-white text-xs shrink-0">✓</span>}
        </>
      ) : (
        <>
          <span className={`text-[9px] px-1 py-px shrink-0 ${isWinner ? 'bg-white text-gray-900' : CAT_COLOR[player.cat] || CAT_COLOR['?']}`}>{player.cat}</span>
          <span className="font-sans text-[11px] truncate flex-1">{player.name}</span>
          {isWinner && <span className="text-white text-xs shrink-0">✓</span>}
        </>
      )}
    </button>
  )
}

function AddPlayerForm({ onAdd, onCancel }: { onAdd: (name: string, cat: string) => void; onCancel: () => void }) {
  const [name, setName] = useState('')
  const [cat, setCat] = useState('D')
  return (
    <div className="no-print p-2 bg-gray-50 border-t border-gray-200 flex flex-col gap-1.5">
      <input autoFocus value={name} onChange={e => setName(e.target.value)} placeholder="Nombre"
        className="w-full bg-white border border-gray-300 px-2 py-1 text-[11px] font-sans text-gray-800 placeholder-gray-300 focus:outline-none"
        onKeyDown={e => e.key === 'Enter' && name.trim() && onAdd(name.trim(), cat)} />
      <div className="flex gap-1">
        {['A','B','C','D'].map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`text-[10px] px-2 py-0.5 ${cat === c ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>{c}</button>
        ))}
        <div className="flex-1" />
        <button onClick={onCancel} className="text-[10px] text-gray-400 hover:text-gray-600 px-1">✕</button>
        <button onClick={() => name.trim() && onAdd(name.trim(), cat)} disabled={!name.trim()}
          className="text-[10px] bg-gray-900 hover:bg-gray-700 text-white px-2 py-0.5 disabled:opacity-40">OK</button>
      </div>
    </div>
  )
}

function MatchBox({ p1, p2, winner, onWin, isByeAuto, showAdd, onAddPlayer, side }: {
  p1: Player | null; p2: Player | null; winner: number; onWin: (seed: number) => void;
  isByeAuto?: boolean; showAdd?: boolean; onAddPlayer?: (name: string, cat: string) => void; side?: 'left' | 'right'
}) {
  const [addingPlayer, setAddingPlayer] = useState(false)
  const canClick = !!(p1 && p2)
  return (
    <div className="border border-gray-300 overflow-hidden w-[170px] bg-white">
      <PlayerRow player={p1} isWinner={canClick && winner === p1?.seed && winner !== 0}
        onClick={canClick ? () => onWin(p1!.seed) : undefined} canClick={canClick} side={side} />
      {!isByeAuto && <div className="border-t border-white/10" />}
      {!isByeAuto && <PlayerRow player={p2} isWinner={canClick && winner === p2?.seed && winner !== 0}
        onClick={canClick ? () => onWin(p2!.seed) : undefined} canClick={canClick} side={side} />}
      {isByeAuto && !addingPlayer && showAdd && (
        <button onClick={() => setAddingPlayer(true)}
          className="no-print w-full text-[10px] font-sans text-gray-300 hover:text-gray-500 hover:bg-gray-50 py-1 border-t border-gray-100 flex items-center justify-center gap-1 transition-colors">
          + agregar rival
        </button>
      )}
      {addingPlayer && (
        <AddPlayerForm
          onAdd={(name, cat) => { setAddingPlayer(false); onAddPlayer?.(name, cat) }}
          onCancel={() => setAddingPlayer(false)} />
      )}
    </div>
  )
}

export default function BracketPage() {
  const allBasePlayers = Object.values(BASE_PLAYERS)
  const [slots, setSlots] = useState<Slot[]>(() => makeSlots(allBasePlayers))
  const [extraPlayers, setExtraPlayers] = useState<Record<number, Player>>({})
  const allPlayers = { ...BASE_PLAYERS, ...extraPlayers }

  const initWinners = (sl: Slot[]) => [
    sl.map(s => s.bye ?? 0),
    Array(16).fill(0), Array(8).fill(0), Array(4).fill(0), Array(2).fill(0), Array(1).fill(0),
  ]
  const [winners, setWinners] = useState<number[][]>(() => initWinners(makeSlots(allBasePlayers)))

  function sortear() {
    const newSlots = makeSlots(allBasePlayers)
    setSlots(newSlots)
    setExtraPlayers({})
    setWinners(initWinners(newSlots))
  }

  function reset() {
    setExtraPlayers({})
    setWinners(initWinners(slots))
  }

  function addExtraPlayer(slotIdx: number, name: string, cat: string) {
    const seed = 56 + Object.keys(extraPlayers).length
    setExtraPlayers(prev => ({ ...prev, [slotIdx]: { seed, name, cat } }))
    setWinners(prev => {
      const next = prev.map(r => [...r])
      next[0][slotIdx] = 0
      let idx = slotIdx
      for (let r = 1; r < next.length; r++) { idx = Math.floor(idx / 2); next[r][idx] = 0 }
      return next
    })
  }

  function setWinnerR(round: number, absIdx: number, seed: number) {
    setWinners(prev => {
      const next = prev.map(r => [...r])
      next[round][absIdx] = next[round][absIdx] === seed ? 0 : seed
      let idx = absIdx
      for (let r = round + 1; r < next.length; r++) { idx = Math.floor(idx / 2); next[r][idx] = 0 }
      return next
    })
  }

  function getSlotPlayers(absIdx: number): [Player | null, Player | null] {
    const s = slots[absIdx]
    if (!s) return [null, null]
    if (s.bye) return [allPlayers[s.bye] || null, extraPlayers[absIdx] || null]
    return [s.p1 ? allPlayers[s.p1] || null : null, s.p2 ? allPlayers[s.p2] || null : null]
  }

  function BracketHalf({ slotStart, side }: { slotStart: number; side: 'left' | 'right' }) {
    function getMatchPlayers(round: number, localIdx: number): [Player | null, Player | null] {
      const absIdx = slotStart / Math.pow(2, round) + localIdx
      if (round === 0) return getSlotPlayers(absIdx)
      const p1seed = winners[round - 1]?.[absIdx * 2]
      const p2seed = winners[round - 1]?.[absIdx * 2 + 1]
      return [p1seed ? allPlayers[p1seed] : null, p2seed ? allPlayers[p2seed] : null]
    }
    function getWinner(round: number, localIdx: number): number {
      const absIdx = slotStart / Math.pow(2, round) + localIdx
      if (round === 0 && slots[absIdx]?.bye && !extraPlayers[absIdx]) return slots[absIdx].bye!
      return winners[round]?.[absIdx] ?? 0
    }
    return (
      <div className={`flex ${side === 'right' ? 'flex-row-reverse' : 'flex-row'}`} style={{ height: TOTAL_H }}>
        {[0,1,2,3,4].map(round => {
          const count = 16 / Math.pow(2, round)
          const slotH = TOTAL_H / count
          return (
            <div key={round} className="flex flex-col" style={{ width: 170 + (round < 4 ? CONNECTOR_W : 0) }}>
              {Array.from({ length: count }, (_, li) => {
                const [p1, p2] = getMatchPlayers(round, li)
                const w = getWinner(round, li)
                const absIdx = slotStart / Math.pow(2, round) + li
                const isByeAuto = round === 0 && !!slots[absIdx]?.bye && !extraPlayers[absIdx]
                const isTop = li % 2 === 0
                return (
                  <div key={li} className="relative flex items-center" style={{ height: slotH }}>
                    <MatchBox p1={p1} p2={p2} winner={w} side={side} isByeAuto={isByeAuto}
                      showAdd={round === 0 && !!slots[absIdx]?.bye && !extraPlayers[absIdx]}
                      onAddPlayer={(name, cat) => addExtraPlayer(absIdx, name, cat)}
                      onWin={seed => setWinnerR(round, absIdx, seed)} />
                    {round < 4 && (
                      <div className="absolute pointer-events-none" style={{
                        [side === 'left' ? 'right' : 'left']: 0, width: CONNECTOR_W,
                        top: isTop ? '50%' : 0, bottom: isTop ? 0 : '50%',
                        borderTop: isTop ? '1px solid #ccc' : 'none',
                        borderBottom: isTop ? 'none' : '1px solid #ccc',
                        [side === 'left' ? 'borderRight' : 'borderLeft']: '1px solid #ccc',
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
    <div className="min-h-screen bg-white overflow-auto select-none">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; }
          @page { size: A3 landscape; margin: 10mm; }
        }
      `}</style>

      <div className="flex flex-col items-center py-4 border-b border-gray-200 no-print">
        <img src="/logo-main.png" alt="Court Culture" className="h-10 w-auto object-contain mb-2" />
        <h1 className="font-display text-gray-900" style={{ fontSize: 'clamp(1.3rem, 2vw, 2rem)', fontWeight: 300, fontStyle: 'italic' }}>
          One Point Slam · 30 Mayo 2026
        </h1>
        <div className="flex items-center gap-4 mt-2 flex-wrap justify-center">
          {['A','B','C','D'].map(c => (
            <div key={c} className="flex items-center gap-1">
              <span className={`text-[9px] px-1 py-px ${CAT_COLOR[c]}`}>{c}</span>
              <span className="text-[10px] font-sans text-gray-400">{c==='A'||c==='B'?'Avanzado':c==='C'?'Intermedio':'Básico'}</span>
            </div>
          ))}
          <button onClick={sortear}
            className="text-[10px] font-sans bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 transition-colors border border-gray-300 ml-4">
            🎲 Sortear
          </button>
          <button onClick={() => window.print()}
            className="text-[10px] font-sans bg-gray-900 hover:bg-gray-700 text-white px-3 py-1 transition-colors border border-gray-900 ml-1">
            🖨 Imprimir / PDF
          </button>
          <span className="text-[10px] font-sans text-gray-300">Click ganador · Click de nuevo para revertir</span>
        </div>
      </div>

      {/* Print header — only shows when printing */}
      <div className="hidden print:flex flex-col items-center py-3 border-b border-gray-200">
        <img src="/logo-main.png" alt="Court Culture" style={{ height: 36, marginBottom: 6 }} />
        <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 18, margin: 0 }}>One Point Slam · Court Sessions Vol. II · 30 Mayo 2026</p>
      </div>

      <div className="flex items-center justify-center pb-8 pt-4" style={{ overflowX: 'auto', minWidth: 'max-content' }}>
        <BracketHalf slotStart={0} side="left" />

        <div className="flex flex-col items-center justify-center px-4" style={{ height: TOTAL_H, minWidth: 175 }}>
          {champion ? (
            <div className="text-center mb-4">
              <p className="text-[10px] tracking-widest uppercase font-sans text-yellow-600 mb-1">🏆 Campeón</p>
              <p className="font-display text-gray-900 text-lg" style={{ fontStyle: 'italic', fontWeight: 400 }}>{champion.name}</p>
              <span className={`text-[9px] px-2 py-px mt-1 inline-block ${CAT_COLOR[champion.cat] || CAT_COLOR['?']}`}>{champion.cat}</span>
            </div>
          ) : (
            <p className="font-display text-gray-300 text-base mb-4" style={{ fontStyle: 'italic' }}>CAMPEÓN</p>
          )}

          <div className="border border-gray-300 w-full overflow-hidden mb-3 bg-white">
            <p className="text-center text-[9px] tracking-widest uppercase font-sans text-gray-400 py-1.5 border-b border-gray-200">Gran Final</p>
            {[leftFinalist, rightFinalist].map((finalist, fi) => (
              <div key={fi}>
                {fi === 1 && <div className="border-t border-gray-200" />}
                <button disabled={!leftFinalist || !rightFinalist}
                  onClick={() => finalist && leftFinalist && rightFinalist && setWinnerR(5, 0, finalist.seed)}
                  className={`w-full flex items-center gap-2 px-3 transition-all
                    ${leftFinalist && rightFinalist ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default'}
                    ${champion?.seed === finalist?.seed && champion ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
                  style={{ height: ROW_H + 4 }}>
                  {finalist ? (
                    <>
                      <span className={`text-[9px] px-1 py-px shrink-0 ${champion?.seed === finalist.seed && champion ? 'bg-white text-gray-900' : CAT_COLOR[finalist.cat] || CAT_COLOR['?']}`}>{finalist.cat}</span>
                      <span className="text-[11px] font-sans truncate">{finalist.name}</span>
                      {champion?.seed === finalist.seed && <span className="ml-auto text-[11px]">✓</span>}
                    </>
                  ) : <span className="text-gray-300 text-[11px] italic font-sans">{fi === 0 ? 'Finalista A' : 'Finalista B'}</span>}
                </button>
              </div>
            ))}
          </div>

          <button onClick={reset}
            className="no-print text-[10px] font-sans text-gray-300 hover:text-gray-500 border border-gray-200 px-4 py-1.5 transition-colors w-full text-center">
            Reiniciar resultados
          </button>
        </div>

        <BracketHalf slotStart={16} side="right" />
      </div>
    </div>
  )
}
