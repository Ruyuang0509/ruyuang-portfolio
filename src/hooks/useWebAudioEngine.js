import { useCallback, useEffect, useRef, useState } from "react";
import {
  createWebAudioController,
  getInitialWebAudioState,
} from "../audio/webAudioEngineCore.js";

const getAudioContextClass = () =>
  typeof window === "undefined" ? null : window.AudioContext ?? window.webkitAudioContext ?? null;

export function useWebAudioEngine() {
  const controllerRef = useRef(null);
  const [engineState, setEngineState] = useState(() => getInitialWebAudioState(getAudioContextClass));

  const ensureController = useCallback(() => {
    if (!controllerRef.current) {
      controllerRef.current = createWebAudioController({
        getAudioContextClass,
        onStateChange: setEngineState,
      });
    }
    return controllerRef.current;
  }, []);

  const start = useCallback(() => ensureController().start(), [ensureController]);
  const stop = useCallback(() => controllerRef.current?.stop() ?? false, []);
  const updateParameters = useCallback(
    (parameters) => controllerRef.current?.updateParameters(parameters) ?? false,
    [],
  );

  useEffect(() => {
    const controller = ensureController();
    setEngineState(controller.getState());
    const handleVisibility = () => {
      if (document.hidden) controller.stop({ immediate: true });
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      controller.destroy();
      if (controllerRef.current === controller) controllerRef.current = null;
    };
  }, [ensureController]);

  return {
    audioStatus: engineState.status,
    errorMessage: engineState.errorMessage,
    start,
    stop,
    updateParameters,
  };
}
