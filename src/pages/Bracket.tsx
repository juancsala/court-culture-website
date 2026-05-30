import Navbar from '../components/Navbar'

const CAT_COLOR: Record<string, string> = {
  A: 'bg-cc-dark text-white',
  B: 'bg-cc-text/70 text-white',
  C: 'bg-cc-text/30 text-white',
  D: 'bg-cc-text/12 text-cc-text/60',
}

const PLAYERS = [
  // Byes (seeds 1-9)
  { seed: 1,  name: 'Carlos Chavez',                     cat: 'A', bye: true },
  { seed: 2,  name: 'Paco Moreno',                       cat: 'A', bye: true },
  { seed: 3,  name: 'Vale Cardenas',                     cat: 'A', bye: true },
  { seed: 4,  name: 'Luis Emiliano Guzman',              cat: 'A', bye: true },
  { seed: 5,  name: 'Carlos Escobar',                    cat: 'A', bye: true },
  { seed: 6,  name: 'Mauricio Velazquez',                cat: 'A', bye: true },
  { seed: 7,  name: 'Josue Gomez',                       cat: 'A', bye: true },
  { seed: 8,  name: 'Miguel Martinez',                   cat: 'B', bye: true },
  { seed: 9,  name: 'Danilo Garces',                     cat: 'B', bye: true },
  // Ronda 1
  { seed: 10, name: 'Carlos Altamirano',                 cat: 'B', bye: false },
  { seed: 11, name: 'Santiago Resendiz',                 cat: 'B', bye: false },
  { seed: 12, name: 'Jorge E Resendiz',                  cat: 'B', bye: false },
  { seed: 13, name: 'Jose Ivan Arguelles Acebo',         cat: 'B', bye: false },
  { seed: 14, name: 'Camilo Quiroz',                     cat: 'B', bye: false },
  { seed: 15, name: 'Claudia Salinas Maldonado',         cat: 'B', bye: false },
  { seed: 16, name: 'Luis Arturo Dominguez Garibay',     cat: 'C', bye: false },
  { seed: 17, name: 'Janeth Alejandra Cantú Garza',      cat: 'C', bye: false },
  { seed: 18, name: 'Sergio Sanchez',                    cat: 'C', bye: false },
  { seed: 19, name: 'Erick Lozano',                      cat: 'C', bye: false },
  { seed: 20, name: 'Fernando Roman Silva Aguilar',      cat: 'C', bye: false },
  { seed: 21, name: 'Leopoldo Rojas',                    cat: 'C', bye: false },
  { seed: 22, name: 'Ricardo Loera Buenrostro',          cat: 'C', bye: false },
  { seed: 23, name: 'Melisa Sarahi Rodriguez Salazar',   cat: 'C', bye: false },
  { seed: 24, name: 'Ulrich Martinez',                   cat: 'C', bye: false },
  { seed: 25, name: 'Sergio Muñoz',                      cat: 'C', bye: false },
  { seed: 26, name: 'Marco Antonio Ramirez Prieto',      cat: 'C', bye: false },
  { seed: 27, name: 'Veronica Porras',                   cat: 'C', bye: false },
  { seed: 28, name: 'Mariana Alvarez',                   cat: 'C', bye: false },
  { seed: 29, name: 'David Gutierrez Moreno',            cat: 'C', bye: false },
  { seed: 30, name: 'Natalia Barradas',                  cat: 'C', bye: false },
  { seed: 31, name: 'Jannhela Valencia',                 cat: 'C', bye: false },
  { seed: 32, name: 'Donnet Hernandez',                  cat: 'C', bye: false },
  { seed: 33, name: 'Francisco Zamora',                  cat: 'D', bye: false },
  { seed: 34, name: 'Jair Guzmán',                       cat: 'D', bye: false },
  { seed: 35, name: 'Émilie Darragon',                   cat: 'D', bye: false },
  { seed: 36, name: 'Manuel Ortiz',                      cat: 'D', bye: false },
  { seed: 37, name: 'Dimitra Sañudo',                    cat: 'D', bye: false },
  { seed: 38, name: 'Javier Murillo',                    cat: 'D', bye: false },
  { seed: 39, name: 'José Roberto Castillo Enríquez',    cat: 'D', bye: false },
  { seed: 40, name: 'Hugo López',                        cat: 'D', bye: false },
  { seed: 41, name: 'Cristobal Garcia',                  cat: 'D', bye: false },
  { seed: 42, name: 'Leonel Eduardo Martinez Alanis',    cat: 'D', bye: false },
  { seed: 43, name: 'Jaime Arellano',                    cat: 'D', bye: false },
  { seed: 44, name: 'Moises Lopez',                      cat: 'D', bye: false },
  { seed: 45, name: 'Rodrigo Mayo',                      cat: 'D', bye: false },
  { seed: 46, name: 'Darina Gudyma',                     cat: 'D', bye: false },
  { seed: 47, name: 'Susana Murillo',                    cat: 'D', bye: false },
  { seed: 48, name: 'Luigi Jacob Creado Gonzalez',       cat: 'D', bye: false },
  { seed: 49, name: 'Adrian Espinosa Aguilar',           cat: 'D', bye: false },
  { seed: 50, name: 'Camila Melissa Escobar Esquivel',   cat: 'D', bye: false },
  { seed: 51, name: 'Marcos Francisco Jorge Zavala',     cat: 'D', bye: false },
  { seed: 52, name: 'Daniela Aguilar López',             cat: 'D', bye: false },
  { seed: 53, name: 'Alondra Y Martinez Soto',           cat: 'D', bye: false },
  { seed: 54, name: 'Ashley Cantu',                      cat: 'D', bye: false },
  { seed: 55, name: 'Ana Teniente',                      cat: 'D', bye: false },
]

// Round 1 matchups: seed 10 vs 55, 11 vs 54 ... 32 vs 33
const R1_MATCHES = Array.from({ length: 23 }, (_, i) => ({
  match: i + 1,
  p1: PLAYERS[9 + i],        // seeds 10-32
  p2: PLAYERS[54 - i],       // seeds 55-33
}))

// Round 2 groups: byes + R1 winners, paired in order
const R2_GROUPS = [
  // Upper half: bye seeds 1-9 each vs R1 winner
  ...Array.from({ length: 9 }, (_, i) => ({
    slot: i + 1,
    bye: PLAYERS[i],
    r1match: i + 1,
  })),
  // Lower half: remaining R1 winners play each other
  { slot: 10, r1match: 10, r1match2: 11 },
  { slot: 11, r1match: 12, r1match2: 13 },
  { slot: 12, r1match: 14, r1match2: 15 },
  { slot: 13, r1match: 16, r1match2: 17 },
  { slot: 14, r1match: 18, r1match2: 19 },
  { slot: 15, r1match: 20, r1match2: 21 },
  { slot: 16, r1match: 22, r1match2: 23 },
]

function PlayerCell({ player, dim = false }: { player: typeof PLAYERS[0], dim?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${dim ? 'opacity-50' : ''}`}>
      <span className={`text-[10px] font-sans font-medium px-1.5 py-0.5 rounded-sm shrink-0 ${CAT_COLOR[player.cat]}`}>
        {player.cat}
      </span>
      <span className="font-sans text-sm text-cc-text/80 truncate">{player.name}</span>
    </div>
  )
}

export default function BracketPage() {
  return (
    <div className="min-h-screen bg-cc-base text-cc-text">
      <Navbar solid />
      <div className="h-16 md:h-20" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">

        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/25 mb-2">Court Sessions Vol. II · 30 Mayo 2026</p>
            <h1 className="font-display text-cc-text leading-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, fontStyle: 'italic' }}>
              One Point Slam
            </h1>
            <p className="font-sans text-cc-text/40 text-sm mt-2">55 jugadores · Llave de 64 · 9 byes</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {['A','B','C','D'].map(c => (
              <span key={c} className={`text-xs font-sans px-3 py-1.5 ${CAT_COLOR[c]}`}>
                Cat. {c}
              </span>
            ))}
          </div>
        </div>

        {/* Seedings */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-5">
            <p className="text-xs tracking-[0.2em] uppercase font-sans text-cc-text/30">Seedings</p>
            <div className="flex-1 h-px bg-cc-text/8" />
            <span className="text-xs font-sans text-cc-text/25">Seeds 1–9 avanzan directo a Ronda 2</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
            {PLAYERS.map(p => (
              <div key={p.seed}
                className={`flex items-center gap-3 px-4 py-2.5 border border-cc-text/6 ${p.bye ? 'bg-cc-text/[0.03]' : ''}`}>
                <span className="text-xs font-sans text-cc-text/25 w-5 shrink-0">{p.seed}</span>
                <PlayerCell player={p} />
                {p.bye && <span className="text-[10px] font-sans text-cc-text/25 ml-auto shrink-0">BYE</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Round 1 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-5">
            <p className="text-xs tracking-[0.2em] uppercase font-sans text-cc-text/30">Ronda 1 — 23 partidos</p>
            <div className="flex-1 h-px bg-cc-text/8" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {R1_MATCHES.map(m => (
              <div key={m.match} className="border border-cc-text/8 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-cc-text/6 hover:bg-cc-text/[0.02]">
                  <PlayerCell player={m.p1} />
                  <span className="text-xs font-sans text-cc-text/20 mx-3 shrink-0">vs</span>
                  <div className="w-6 h-5 border border-cc-text/15 shrink-0" title="Resultado" />
                </div>
                <div className="flex items-center justify-between px-4 py-2.5 hover:bg-cc-text/[0.02]">
                  <PlayerCell player={m.p2} />
                  <div className="w-6 h-5 border border-cc-text/15 ml-auto shrink-0" title="Resultado" />
                </div>
                <div className="px-4 py-1 bg-cc-text/[0.02] border-t border-cc-text/6">
                  <span className="text-[10px] font-sans text-cc-text/20 uppercase tracking-widest">Partido {m.match}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Round 2 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-5">
            <p className="text-xs tracking-[0.2em] uppercase font-sans text-cc-text/30">Ronda 2 — 16 partidos</p>
            <div className="flex-1 h-px bg-cc-text/8" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {R2_GROUPS.map((g: any) => (
              <div key={g.slot} className="border border-cc-text/8 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-cc-text/6 bg-cc-text/[0.015]">
                  {'bye' in g ? (
                    <div className="flex items-center gap-2">
                      <PlayerCell player={g.bye} />
                      <span className="text-[10px] font-sans text-cc-text/25 ml-auto">BYE → directo</span>
                    </div>
                  ) : (
                    <p className="text-xs font-sans text-cc-text/35">Ganador partido {g.r1match}</p>
                  )}
                </div>
                <div className="px-4 py-2.5">
                  <p className="text-xs font-sans text-cc-text/35">
                    {'bye' in g
                      ? `vs Ganador partido ${g.r1match}`
                      : `vs Ganador partido ${g.r1match2}`}
                  </p>
                </div>
                <div className="px-4 py-1 bg-cc-text/[0.02] border-t border-cc-text/6">
                  <span className="text-[10px] font-sans text-cc-text/20 uppercase tracking-widest">R2 · Slot {g.slot}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rounds 3-6 structure */}
        <section>
          <div className="flex items-center gap-4 mb-5">
            <p className="text-xs tracking-[0.2em] uppercase font-sans text-cc-text/30">Rondas siguientes</p>
            <div className="flex-1 h-px bg-cc-text/8" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { ronda: 'Ronda 3', partidos: 8, desc: 'Cuartos' },
              { ronda: 'Ronda 4', partidos: 4, desc: 'Semis' },
              { ronda: 'Ronda 5', partidos: 2, desc: 'Final' },
              { ronda: 'Ronda 6', partidos: 1, desc: 'Gran Final' },
            ].map(r => (
              <div key={r.ronda} className="border border-cc-text/8 p-5 text-center">
                <p className="text-xs tracking-widest uppercase font-sans text-cc-text/25 mb-2">{r.desc}</p>
                <p className="font-display text-cc-text text-3xl mb-1" style={{ fontWeight: 300, fontStyle: 'italic' }}>{r.partidos}</p>
                <p className="text-xs font-sans text-cc-text/30">{r.partidos === 1 ? 'partido' : 'partidos'}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
