import { useEffect, useMemo, useState } from 'react';


const GAME_DURATION = 30;
const SHOT_COOLDOWN_MS = 3000;

const TEAMS = {
  celta: {
    name: 'RC Celta de Vigo',
    goalkeeperSkill: 7,
    shirtColor: '#66a5d6',
    shortsColor: '#ffffff',
  },
  pontevedra: {
    name: 'Pontevedra CF',
    goalkeeperSkill: 6,
    shirtColor: '#870e4b',
    shortsColor: '#143580',
  },
};

function Team({
  name,
  goalkeeperSkill,
  shirtColor,
  shortsColor,
  onShoot,
  disabled,
}) {
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  useEffect(() => {
    if (!isCoolingDown) {
      return undefined;
    }

    const cooldownTimer = window.setTimeout(() => {
      setIsCoolingDown(false);
    }, SHOT_COOLDOWN_MS);

    return () => {
      window.clearTimeout(cooldownTimer);
    };
  }, [isCoolingDown]);

  const canShoot = !disabled && !isCoolingDown;

  const handleShoot = () => {
    if (!canShoot) {
      return;
    }

    onShoot();
    setIsCoolingDown(true);
  };

  return (
    <section className="team-card">
      <h2>{name}</h2>

      <div className="kit-wrapper" aria-label={`Equipación de ${name}`}>
        <span className="kit shirt" style={{ backgroundColor: shirtColor }} />
        <span className="kit shorts" style={{ backgroundColor: shortsColor }} />
      </div>

      <p>Habilidad del portero: {goalkeeperSkill}</p>

      <button type="button" onClick={handleShoot} disabled={!canShoot}>
        Tirar
      </button>

      {isCoolingDown && !disabled ? (
        <p className="cooldown-message">Espera 3 segundos para volver a tirar.</p>
      ) : null}
    </section>
  );
}

function Parte1() {
  const [gameState, setGameState] = useState('inicio');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState({ celta: 0, pontevedra: 0 });
  const [lastPlay, setLastPlay] = useState('Pulsa "Comenzar partido" para iniciar.');

  useEffect(() => {
    if (gameState !== 'en curso') {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          window.clearInterval(timer);
          setGameState('fin');
          return 0;
        }
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [gameState]);

  const shoot = (attackingTeam, defendingTeam) => {
    if (gameState !== 'en curso') {
      return;
    }

    const power = Math.floor(Math.random() * 10) + 1;
    const goalkeeperSkill = TEAMS[defendingTeam].goalkeeperSkill;

    if (power > goalkeeperSkill) {
      setScore((previousScore) => ({
        ...previousScore,
        [attackingTeam]: previousScore[attackingTeam] + 1,
      }));

      setLastPlay(`⚽ Gol de ${TEAMS[attackingTeam].name} (potencia ${power} > ${goalkeeperSkill}).`);
      return;
    }

    setLastPlay(
      `🧤 Parada de ${TEAMS[defendingTeam].name} (potencia ${power} ≤ ${goalkeeperSkill}).`,
    );
  };

  const winner = useMemo(() => {
    if (score.celta > score.pontevedra) {
      return TEAMS.celta.name;
    }

    if (score.pontevedra > score.celta) {
      return TEAMS.pontevedra.name;
    }

    return 'Empate';
  }, [score.celta, score.pontevedra]);
  const finalPlayMessage =
    winner === 'Empate'
      ? '⏱️ Final del partido: empate.'
      : `⏱️ Final del partido. Ganador: ${winner}.`;

  const startGame = () => {
    setGameState('en curso');
    setTimeLeft(GAME_DURATION);
    setScore({ celta: 0, pontevedra: 0 });
    setLastPlay('¡Comienza el partido!');
  };

  return (
    <div className="match-container">
      <h1>Simulación Celta vs Pontevedra</h1>

      <div className="scoreboard">
        <p>
          {TEAMS.celta.name} {score.celta} - {score.pontevedra} {TEAMS.pontevedra.name}
        </p>
        <p>Tiempo restante: {timeLeft}s</p>
        <p>Estado del juego: {gameState}</p>
        <p className="last-play">Última jugada: {gameState === 'fin' ? finalPlayMessage : lastPlay}</p>
      </div>

      <div className="teams-grid">
        <Team
          name={TEAMS.celta.name}
          goalkeeperSkill={TEAMS.celta.goalkeeperSkill}
          shirtColor={TEAMS.celta.shirtColor}
          shortsColor={TEAMS.celta.shortsColor}
          onShoot={() => shoot('celta', 'pontevedra')}
          disabled={gameState !== 'en curso'}
        />

        <Team
          name={TEAMS.pontevedra.name}
          goalkeeperSkill={TEAMS.pontevedra.goalkeeperSkill}
          shirtColor={TEAMS.pontevedra.shirtColor}
          shortsColor={TEAMS.pontevedra.shortsColor}
          onShoot={() => shoot('pontevedra', 'celta')}
          disabled={gameState !== 'en curso'}
        />
      </div>

      {(gameState === 'inicio' || gameState === 'fin') && (
        <button type="button" className="start-button" onClick={startGame}>
          {gameState === 'inicio' ? 'Comenzar partido' : 'Jugar de nuevo'}
        </button>
      )}

      {gameState === 'fin' ? <p className="winner-banner">Ganador: {winner}</p> : null}
    </div>
  );
}
export default Parte1;
