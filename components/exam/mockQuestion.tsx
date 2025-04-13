// components/exam/mockQuestions.ts

export type Question = {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number; // optional, for review or scoring
  };
  
  export const mockQuestions: Question[] = [
    {
      id: 1,
      text: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
    },
    {
      id: 3,
      text: "Who developed the theory of relativity?",
      options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Marie Curie"],
      correctAnswer: 1,
    },
    {
      id: 4,
      text: "What is the chemical symbol for water?",
      options: ["O2", "CO2", "H2O", "NaCl"],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: "Which gas do plants use for photosynthesis?",
      options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Hydrogen"],
      correctAnswer: 2,
    },
  ];
  