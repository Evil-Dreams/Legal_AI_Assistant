import { FC } from "react";

type Mood = "neutral" | "happy" | "thoughtful" | "excited" | "serious";

interface AICharacterProps {
  mood: Mood;
}

const AICharacter: FC<AICharacterProps> = ({ mood }) => {
  // Define expressions for different moods
  const expressions = {
    neutral: {
      eyes: "◕‿◕",
      mouth: "─",
      color: "bg-blue-100",
    },
    happy: {
      eyes: "^‿^",
      mouth: "⌣",
      color: "bg-green-100",
    },
    thoughtful: {
      eyes: "⊙﹏⊙",
      mouth: "~",
      color: "bg-purple-100",
    },
    excited: {
      eyes: "♥‿♥",
      mouth: "◡",
      color: "bg-yellow-100",
    },
    serious: {
      eyes: "⌐■_■",
      mouth: "ᐧ",
      color: "bg-gray-100",
    },
  };

  const currentExpression = expressions[mood];
  
  return (
    <div className={`p-4 rounded-full ${currentExpression.color} shadow-md transition-all duration-300 transform hover:scale-105`}>
      <div className="w-20 h-20 flex flex-col items-center justify-center">
        <div className="text-2xl mb-1">{currentExpression.eyes}</div>
        <div className="text-xl font-bold">
          {currentExpression.mouth}
        </div>
        <div className="mt-2 text-xs font-bold text-gray-700">
          LawAI
        </div>
      </div>
    </div>
  );
};

export default AICharacter;