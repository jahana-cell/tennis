import React, { useState, useEffect, useCallback } from 'react';

// --- SVG Icons ---
// Re-created lucide-react icons and added a custom sparkle icon for confetti.

const TrophyIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.87 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.13 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const CircleIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"/>
    </svg>
);

const RotateCcwIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
    </svg>
);

const RefreshCwIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 2v6h6"/><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/>
        <path d="M21 22v-6h-6"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/>
    </svg>
);

const SparkleIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z"/></svg>
);

// --- Helper for class names ---
const cn = (...classes) => {
    return classes.filter(Boolean).join(' ');
}

// --- Confetti Component ---
// Renders a celebration animation when a player wins.
const Confetti = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
            {Array.from({ length: 15 }).map((_, i) => (
                <SparkleIcon
                    key={i}
                    className="absolute text-yellow-400 animate-confetti"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * -50}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                        width: `${12 + Math.random() * 12}px`,
                        height: `${12 + Math.random() * 12}px`,
                    }}
                />
            ))}
        </div>
    );
};


// --- PlayerCard Component ---
function PlayerCard({ 
  player, 
  score, 
  matches,
  onScore, 
  isServing,
  isWinner
}) {
  return (
    <div 
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden text-center transition-all duration-300 rounded-2xl",
        "bg-white/5 backdrop-blur-md border border-white/10",
        "hover:border-white/20 hover:-translate-y-2",
        isServing && !isWinner ? "border-sky-400/50 shadow-2xl shadow-sky-500/20" : "",
        isWinner ? "border-yellow-400/80 shadow-2xl shadow-yellow-400/30 animate-winner-glow" : "",
        isWinner ? "cursor-default hover:translate-y-0" : ""
      )}
      onClick={onScore}
      role="button"
      aria-label={`Increment Player ${player} score`}
    >
      <div 
        className={cn("absolute inset-0 bg-gradient-to-br from-sky-500/20 to-transparent transition-opacity duration-500",
        isServing && !isWinner ? "opacity-100" : "opacity-0"
        )} />

      {isServing && !isWinner && (
          <div className="absolute top-4 right-4 text-sky-400 animate-pulse">
              <CircleIcon className="h-6 w-6 fill-current" />
              <span className="sr-only">Player {player} Serving</span>
          </div>
      )}
      
      {isWinner && (
        <div className="absolute top-4 right-4 text-yellow-400">
            <TrophyIcon className="h-8 w-8" />
            <span className="sr-only">Player ${player} Wins!</span>
        </div>
      )}

      <div className="pb-2 pt-6 z-10">
          <h2 className="text-3xl font-medium text-gray-300">Player {player}</h2>
          <p className="text-sm text-gray-400">Matches Won: {matches}</p>
      </div>
      <div className="flex flex-grow items-center justify-center p-0 z-10">
          <span key={score} className="text-8xl md:text-9xl font-black text-white animate-fade-in-zoom">{score}</span>
      </div>
      <div className={cn(
        "flex h-16 items-center justify-center text-lg font-semibold text-sky-400 opacity-0 transition-opacity group-hover:opacity-100",
        isWinner ? "opacity-0" : ""
        )}>
          +1 Point
      </div>
    </div>
  );
}

// --- Main App Component ---
export default function App() {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1Matches, setPlayer1Matches] = useState(0);
  const [player2Matches, setPlayer2Matches] = useState(0);
  const [servingPlayer, setServingPlayer] = useState(1);
  const [winner, setWinner] = useState(null);

  const determineNextServer = (p1, p2) => {
    const totalScore = p1 + p2;
    const serviceIntervals = Math.floor(totalScore / 5);
    return (serviceIntervals % 2 === 0) ? 1 : 2;
  };

  const updateServingPlayer = useCallback((p1, p2) => {
      const nextServer = determineNextServer(p1, p2);
      setServingPlayer(nextServer);
  }, []);

  useEffect(() => {
    if (player1Score === 0 && player2Score === 0) {
      setServingPlayer(1);
    } else {
      updateServingPlayer(player1Score, player2Score);
    }

    if (winner === null) {
      if (player1Score >= 21 && player1Score >= player2Score + 2) {
        setWinner(1);
        setPlayer1Matches(m => m + 1);
      } else if (player2Score >= 21 && player2Score >= player1Score + 2) {
        setWinner(2);
        setPlayer2Matches(m => m + 1);
      }
    }
  }, [player1Score, player2Score, updateServingPlayer, winner]);

  const handleScoreIncrement = (player) => {
    if (winner) return;
    if (player === 1) {
      setPlayer1Score((s) => s + 1);
    } else {
      setPlayer2Score((s) => s + 1);
    }
  };

  const handleGameReset = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setWinner(null);
  };

  const handleMatchReset = () => {
    handleGameReset();
    setPlayer1Matches(0);
    setPlayer2Matches(0);
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0D1117] text-white font-sans overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,80,220,0.3),rgba(255,255,255,0))] -z-10" />
      {winner && <Confetti />}
      <main className="flex w-full max-w-5xl flex-1 flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <header className="mb-8 text-center sm:mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-br from-white via-gray-300 to-sky-300 bg-clip-text text-transparent drop-shadow-lg">
            Table Tennis
          </h1>
          <p className="text-gray-400 mt-2">Modern Ping Pong Scorer</p>
        </header>

        <div className="relative grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-8">
            <PlayerCard
                player={1}
                score={player1Score}
                matches={player1Matches}
                onScore={() => handleScoreIncrement(1)}
                isServing={servingPlayer === 1}
                isWinner={winner === 1}
            />
            
            <div className="hidden items-center justify-center md:flex">
                <span className="text-6xl font-black text-white/20 transition-all duration-300 w-16 text-center">
                    VS
                </span>
            </div>

            <PlayerCard
                player={2}
                score={player2Score}
                matches={player2Matches}
                onScore={() => handleScoreIncrement(2)}
                isServing={servingPlayer === 2}
                isWinner={winner === 2}
            />
        </div>

        <footer className="mt-8 flex flex-col sm:flex-row gap-4 sm:mt-12">
          <Button variant="outline" onClick={handleGameReset}>
            <RotateCcwIcon className="mr-2 h-5 w-5" />
            Reset Game
          </Button>
          <Button variant="destructive" onClick={handleMatchReset}>
            <RefreshCwIcon className="mr-2 h-5 w-5" />
            Reset Match
          </Button>
        </footer>
      </main>
      <footer className="w-full text-center p-4">
        <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Rebuilt with Gemini</p>
      </footer>
    </div>
  );
}


// --- Button Component ---
const Button = ({ variant, onClick, children }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1117] disabled:opacity-50 disabled:pointer-events-none text-base px-8 py-5 transform hover:scale-105";

    const variantClasses = {
        outline: "border border-white/20 bg-white/5 text-gray-200 hover:bg-white/10 hover:border-white/30",
        destructive: "bg-red-600/80 text-white hover:bg-red-600 border border-red-500/50",
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]}`} onClick={onClick}>
            {children}
        </button>
    );
};

// --- Add Styles to Document Head ---
// Injects Google Fonts and all necessary animations into the page.
const style = document.createElement('style');
style.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
body {
    font-family: 'Inter', sans-serif;
}
@keyframes fadeInZoom {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in-zoom {
  animation: fadeInZoom 0.4s cubic-bezier(0.215, 0.610, 0.355, 1.000);
}

@keyframes winner-glow {
  0% { box-shadow: 0 0 10px rgba(250, 204, 21, 0.2), 0 0 20px rgba(250, 204, 21, 0.2); }
  50% { box-shadow: 0 0 20px rgba(250, 204, 21, 0.5), 0 0 40px rgba(250, 204, 21, 0.5); }
  100% { box-shadow: 0 0 10px rgba(250, 204, 21, 0.2), 0 0 20px rgba(250, 204, 21, 0.2); }
}
.animate-winner-glow {
  animation: winner-glow 2.5s ease-in-out infinite;
}

@keyframes confetti {
    0% {
        transform: translateY(0) rotateZ(0);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotateZ(360deg);
        opacity: 0;
    }
}
.animate-confetti {
    animation: confetti linear;
}
`;
document.head.appendChild(style);

