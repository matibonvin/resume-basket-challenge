import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeCard from "./ResumeCard";
import ThrowingGame from "./ThrowingGame";
import CrumplingResume from "./CrumplingResume";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const GameView = () => {
  const [gameState, setGameState] = useState<"review" | "crumpling" | "throwing">("review");

  const handleHire = () => {
    toast.success("Candidate hired! 🎉");
    setTimeout(() => {
      setGameState("review");
    }, 2000);
  };

  const handleReject = () => {
    setGameState("crumpling");
    toast.error("Resume rejected! Click to crumple it!");
  };

  const handleCrumplingComplete = () => {
    setGameState("throwing");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {gameState === "review" && (
          <ResumeCard onHire={handleHire} onReject={handleReject} />
        )}
        {gameState === "crumpling" && (
          <CrumplingResume onComplete={handleCrumplingComplete} />
        )}
        {gameState === "throwing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-4xl"
          >
            <ThrowingGame />
            <Button
              onClick={() => setGameState("review")}
              className="mt-4"
            >
              Back to Resume Review
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameView;