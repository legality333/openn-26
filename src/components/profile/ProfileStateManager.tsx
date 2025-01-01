import React, { useEffect } from "react";
import { useIcebreakersState } from "./useIcebreakersState";

interface ProfileStateManagerProps {
  currentProfile: Record<string, string>;
  children: React.ReactNode;
  showProfiles: boolean;
  showSavedIcebreakers: boolean;
}

// Define the extended props that will be passed to children
interface ExtendedChildProps {
  isFirstTime: boolean;
  setIsFirstTime: (value: boolean) => void;
  persistedIcebreakers: string[];
  handleIcebreakersUpdate: (icebreakers: string[]) => void;
  clearIcebreakers: () => void;
}

export const ProfileStateManager: React.FC<ProfileStateManagerProps> = ({
  currentProfile,
  children,
  showProfiles,
  showSavedIcebreakers,
}) => {
  const {
    persistedIcebreakers,
    isFirstTime,
    setIsFirstTime,
    handleIcebreakersUpdate,
    clearIcebreakers,
  } = useIcebreakersState(currentProfile);

  // Reset scroll position when showing forms
  useEffect(() => {
    if (!showProfiles && !showSavedIcebreakers) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [showProfiles, showSavedIcebreakers]);

  // Save form data to localStorage
  useEffect(() => {
    if (currentProfile && Object.keys(currentProfile).length > 0) {
      localStorage.setItem('currentProfile', JSON.stringify(currentProfile));
    }
  }, [currentProfile]);

  // Save icebreakers to localStorage
  useEffect(() => {
    if (persistedIcebreakers.length > 0) {
      localStorage.setItem('currentIcebreakers', JSON.stringify(persistedIcebreakers));
    }
  }, [persistedIcebreakers]);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        isFirstTime,
        setIsFirstTime,
        persistedIcebreakers,
        handleIcebreakersUpdate,
        clearIcebreakers,
      } as ExtendedChildProps);
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};