'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AssistantContextType {
  isAssistantOpen: boolean;
  setAssistantOpen: (isOpen: boolean) => void;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export const AssistantProvider = ({ children }: { children: ReactNode }) => {
  const [isAssistantOpen, setAssistantOpen] = useState(false);

  return (
    <AssistantContext.Provider value={{ isAssistantOpen, setAssistantOpen }}>
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (context === undefined) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};
