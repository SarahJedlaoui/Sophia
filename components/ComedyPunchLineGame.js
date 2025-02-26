import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const scenarios = [
  {
    question: "You walk into a room full of people, and someone says, ‘You’re late!’",
    options: [
      "Yeah, I got stuck in traffic with a snail. It was a real race.",
      "I was just testing if the room could survive without me. Spoiler: it didn’t.",
      "I thought this was a surprise party. Turns out, I was the only one who didn’t know.",
      "I was trying to make an entrance. Mission accomplished!"
    ],
    funnyIndex: [3, 4, 2, 3]
  },
  {
    question: "You see someone struggling with a vending machine. What do you say?",
    options: [
      "Try whispering sweet things to it. Machines respond to love.",
      "Let me show you how it's done. *Fails immediately*",
      "If this was a horror movie, the snack would definitely win.",
      "You just unlocked a secret workout program—arms of steel!"
    ],
    funnyIndex: [4, 3, 4, 2]
  },
  {
    question: "You're on an elevator, and it suddenly stops. What’s your reaction?",
    options: [
      "Finally, a break! I needed time to think about my life choices.",
      "Don’t panic! …Well, actually, maybe a little panic is fine.",
      "Alright, who's got snacks? We're gonna be here a while.",
      "Good thing I practiced my dramatic monologues for situations like this."
    ],
    funnyIndex: [3, 2, 4, 4]
  },
  {
    question: "You're at a fancy restaurant and drop your fork. What do you say?",
    options: [
      "That was just a practice round. The real performance starts now!",
      "I’m testing gravity. So far, it’s still working!",
      "This is why I don’t dine with forks. Hands are the future.",
      "Waiter! My fork just tried to escape—can I get another?"
    ],
    funnyIndex: [3, 4, 2, 4]
  }
];

const ComedyPunchlineGame = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [funnyScore, setFunnyScore] = useState(0);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSelectOption = (index) => {
    setSelectedAnswer(index);
    setFunnyScore(funnyScore + scenarios[currentScenario].funnyIndex[index]);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newSelections = [...selectedOptions, selectedAnswer];
    setSelectedOptions(newSelections);
    setSelectedAnswer(null);

    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
    } else {
      setShowEvaluation(true);
    }
  };

  const getFunnyEvaluation = () => {
    if (funnyScore >= 14) return "You're a comedy genius! People probably laugh before you even speak.";
    if (funnyScore >= 10) return "You're naturally funny! Keep refining your timing and delivery.";
    return "You have potential! A little practice, and you'll be making people laugh effortlessly.";
  };

  return (
    <div className="flex justify-center items-center mt-5 p-4">
      <div
        className="relative bg-white bg-opacity-10 rounded-lg p-6 w-full max-w-3xl mx-auto shadow-lg backdrop-blur-xl"
      >
        {/* Saif Omrane Profile Section */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative w-24 h-24">
            <Image src="/saif/saif.png" alt="Saif Omrane" width={100} height={100} className="rounded-full" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">What Would You Say?</h2>
            <p className="text-sm text-gray-300">By Saif Omrane</p>
          </div>
        </div>

        {!showEvaluation ? (
          <>
            {/* Scenario */}
            <p className="text-sm text-gray-400 italic mb-4">
              You’re on stage, and the crowd is waiting for your next line. Choose the best punchline below!
            </p>
            <p className="text-md font-semibold text-white mb-4">💡 {scenarios[currentScenario].question}</p>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenarios[currentScenario].options.map((option, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-lg border bg-gray-800 border-gray-500 hover:bg-gray-700 transition ${
                    selectedAnswer === index ? "border-white bg-gray-700" : ""
                  }`}
                  onClick={() => handleSelectOption(index)}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Next Button */}
            {selectedAnswer !== null && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition flex items-center"
                >
                  Next one <ArrowRight className="ml-2" size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Funny Evaluation */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">Your Funny Meter Score: {funnyScore}</h3>
              <p className="text-lg text-white">{getFunnyEvaluation()}</p>
              <Image
                src="/icons/laugh-meter.svg"
                alt="Funny Meter"
                width={200}
                height={200}
                className="mx-auto my-6"
              />
              <button
                onClick={() => {
                  setCurrentScenario(0);
                  setSelectedOptions([]);
                  setFunnyScore(0);
                  setSelectedAnswer(null);
                  setShowEvaluation(false);
                }}
                className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition"
              >
                Play Again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ComedyPunchlineGame;
