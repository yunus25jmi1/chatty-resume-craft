
import { useState, useEffect } from "react";

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo = ({ className = "" }: AnimatedLogoProps) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-3xl mr-2">📝</span>
      <span className="font-bold text-blue-600">
        ChattyResume
        <span className="ml-1 inline-block">
          {animationStep === 0 && ""}
          {animationStep === 1 && "."}
          {animationStep === 2 && ".."}
        </span>
      </span>
    </div>
  );
};

export default AnimatedLogo;
