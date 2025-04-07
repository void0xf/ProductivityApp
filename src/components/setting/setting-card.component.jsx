import { X } from "lucide-react";
import React, { useContext, useEffect, useState, useRef } from "react";
import SettingsCartElement from "./settings-cart-element.component";
import { UserContext } from "../../contexts/user.context";
import { logOutUser } from "../../firebase/auth";
import { useRouter } from "next/navigation";

const SettingCard = ({ isMobile }) => {
  const { state, dispatch } = useContext(UserContext);
  const [isSystemTheme, setIsSystemTheme] = useState(true);
  const router = useRouter();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  // System theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (e) => {
      if (isSystemTheme) {
        updateTheme(e.matches);
      }
    };

    // Initial theme setup
    if (isSystemTheme) {
      updateTheme(mediaQuery.matches);
    }

    // Listen for system theme changes
    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, [isSystemTheme]);

  const updateTheme = (isDark) => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty("--color-bkg", "210deg 10% 13%");
      root.style.setProperty("--color-text", "0deg 9% 98%");
      root.style.setProperty("--border-outline", "216deg 12% 24%");
      if (!state.darkMode) {
        dispatch({ type: "TOGGLE_DARKMODE" });
      }
    } else {
      root.style.setProperty("--color-bkg", "0deg 9% 98%");
      root.style.setProperty("--color-text", "210deg 10% 13%");
      root.style.setProperty("--border-outline", "216deg 12% 84%");
      if (state.darkMode) {
        dispatch({ type: "TOGGLE_DARKMODE" });
      }
    }
  };

  // Focus management
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        dispatch({ type: "TOGGLE_SETTINGS_CARD" });
      }
      if (event.key === "Tab") {
        // Get all focusable elements
        const focusableElements = dialogRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements?.[0];
        const lastElement = focusableElements?.[focusableElements.length - 1];

        // If shift+tab on first element, focus last element
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
        // If tab on last element, focus first element
        else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Focus the close button when dialog opens
    closeButtonRef.current?.focus();

    // Add event listener for keyboard navigation
    document.addEventListener("keydown", handleKeyDown);

    // Prevent scrolling of background content
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [dispatch]);

  const handleToggleVibration = () => {
    dispatch({ type: "TOGGLE_VIBRATION" });
  };

  const handleNOD = () => {
    if (!("Notification" in window)) {
      console.error("Web Notifications API is not supported in this browser.");
    }
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    if (Notification.permission == "granted") {
      dispatch({ type: "TOGGLE_NOD" });
    }
  };

  const handleSystemTheme = () => {
    setIsSystemTheme(!isSystemTheme);
    if (!isSystemTheme) {
      // Switching to system theme
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      updateTheme(isDarkMode);
    }
  };

  const handleLogOut = () => {
    if (logOutUser()) {
      router.push("/");
    }
  };

  const handleClose = () => {
    dispatch({ type: "TOGGLE_SETTINGS_CARD" });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[480px] max-w-[95%] rounded-lg z-50 bg-bkg border border-bordercolor shadow-lg"
      >
        <div className="flex justify-between items-center p-4 border-b border-bordercolor">
          <h2
            id="settings-title"
            className="text-xl font-semibold text-textcolor"
          >
            Settings
          </h2>
          <button
            ref={closeButtonRef}
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div role="group" aria-labelledby="theme-title">
            <h3 id="theme-title" className="text-sm font-medium mb-2">
              Theme
            </h3>
            <SettingsCartElement
              name={"Use system theme"}
              valueToSet={isSystemTheme}
              setterFunction={handleSystemTheme}
              ariaLabel="Toggle system theme"
            />
            {!isSystemTheme && (
              <SettingsCartElement
                name={"Dark mode"}
                valueToSet={state.darkMode}
                setterFunction={() => updateTheme(!state.darkMode)}
                ariaLabel="Toggle dark mode"
              />
            )}
          </div>

          <div role="group" aria-labelledby="notifications-title">
            <h3 id="notifications-title" className="text-sm font-medium mb-2">
              Notifications
            </h3>
            {isMobile && (
              <SettingsCartElement
                name={"Vibration on task done"}
                valueToSet={state.vibrationOnTaskDone}
                setterFunction={handleToggleVibration}
                ariaLabel="Toggle vibration on task completion"
              />
            )}
            <SettingsCartElement
              name={"Deadline notifications"}
              valueToSet={state.NOD}
              setterFunction={handleNOD}
              ariaLabel="Toggle deadline notifications"
            />
          </div>

          <div>
            <button
              onClick={handleLogOut}
              className="w-full px-3 py-1.5 text-sm border border-bordercolor rounded-lg hover:bg-gray-100"
              aria-label="Log out from this device"
            >
              Log out on this device
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingCard;
