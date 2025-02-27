import React from "react";
import { IcebreakerGenerator } from "./IcebreakerGenerator";
import { IcebreakerList } from "../icebreakers/IcebreakerList";
import { useIcebreakers } from "@/hooks/useIcebreakers";

interface IcebreakerSectionProps {
  userProfile: Record<string, string>;
  onIcebreakersUpdate: (icebreakers: string[]) => void;
  isFirstTime: boolean;
}

export const IcebreakerSection: React.FC<IcebreakerSectionProps> = ({
  userProfile,
  onIcebreakersUpdate,
  isFirstTime,
}) => {
  const { savedIcebreakers, icebreakers, setIcebreakers, toggleIcebreaker, clearAllIcebreakers } = useIcebreakers();

  React.useEffect(() => {
    clearAllIcebreakers();
    setIcebreakers([]);
  }, [userProfile, clearAllIcebreakers, setIcebreakers]);

  const handleIcebreakersGenerated = (newIcebreakers: string[]) => {
    console.log("IcebreakerSection: New icebreakers generated", newIcebreakers);
    setIcebreakers(newIcebreakers);
    onIcebreakersUpdate(newIcebreakers);
  };

  return (
    <>
      <IcebreakerGenerator 
        userProfile={userProfile}
        onIcebreakersGenerated={handleIcebreakersGenerated}
        isFirstTime={isFirstTime}
      />
      <IcebreakerList 
        icebreakers={icebreakers}
        savedIcebreakers={savedIcebreakers}
        onToggleSave={toggleIcebreaker}
      />
    </>
  );
};