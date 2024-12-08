import { Notice } from "@/components/ui/Notice";
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the type for the context value
interface NotificationContextType {
  showNotification: (message: string) => void;
}

// Define the props type for NotificationProvider
interface NotificationProviderProps {
  children: React.ReactNode; // Specify the type for children
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined); // Provide a default value

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notification, setNotification] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const showNotification = (message: string) => {
    if (message && message !== notification) {
      console.log("Showing notification:", message);
      setNotification(message);
      setIsVisible(true);

      // Clear any existing timer
      if (timer) {
        clearTimeout(timer);
      }

      // Set a new timer to hide the notification
      const newTimer = setTimeout(() => {
        setIsVisible(false);
        setNotification(null);
      }, 5000);
      setTimer(newTimer);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const handleClose = () => {
    setIsVisible(false);
    setNotification(null);
    if (timer) {
      clearTimeout(timer);
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {isVisible && (
        <Notice
          message={notification}
          onClose={handleClose}
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
