import { createRoot, events } from "@react-three/fiber";
import { Component, useEffect, useLayoutEffect, useRef, useState } from "react";

class SceneErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    this.props.onError(error);
  }

  render() {
    return this.state.error ? null : this.props.children;
  }
}

export default function LeanR3FCanvas({ active, maxDpr, antialias, eventSource, children }) {
  const canvasRef = useRef(null);
  const rootRef = useRef(null);
  const disposeTimerRef = useRef(null);
  const syncRef = useRef(null);
  const syncVersionRef = useRef(0);
  const latestRef = useRef({ active, maxDpr, antialias, eventSource, children });
  const [sceneError, setSceneError] = useState(null);

  latestRef.current = { active, maxDpr, antialias, eventSource, children };

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    if (disposeTimerRef.current !== null) {
      window.clearTimeout(disposeTimerRef.current);
      disposeTimerRef.current = null;
    }

    const measureTarget = canvas.parentElement ?? canvas;
    // Keep the root across Strict Mode's synchronous replay; cancel disposal if setup resumes.
    const root = rootRef.current ?? createRoot(canvas);
    rootRef.current = root;
    let mounted = true;
    const pointerMetrics = {
      documentLeft: 0,
      documentTop: 0,
      width: 0,
      height: 0,
    };

    const sync = async () => {
      if (!mounted) return;
      const version = ++syncVersionRef.current;
      const rect = measureTarget.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const latest = latestRef.current;
      const pointerTarget = latest.eventSource?.current ?? canvas;
      const pointerRect = pointerTarget.getBoundingClientRect();
      pointerMetrics.documentLeft = pointerRect.left + window.scrollX;
      pointerMetrics.documentTop = pointerRect.top + window.scrollY;
      pointerMetrics.width = pointerRect.width;
      pointerMetrics.height = pointerRect.height;
      try {
        await root.configure({
          camera: { position: [0, 0, 6], fov: 42 },
          dpr: [1, Math.max(1, latest.maxDpr)],
          frameloop: latest.active ? "always" : "demand",
          gl: {
            antialias: latest.antialias,
            alpha: true,
            powerPreference: "high-performance",
          },
          performance: { min: 0.5 },
          events,
          size: {
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left,
          },
          onCreated: (state) => {
            state.setEvents({
              compute: (event, currentState) => {
                const { documentLeft, documentTop, width, height } = pointerMetrics;
                if (width <= 0 || height <= 0) return;
                const left = documentLeft - window.scrollX;
                const top = documentTop - window.scrollY;
                currentState.pointer.set(
                  ((event.clientX - left) / width) * 2 - 1,
                  -((event.clientY - top) / height) * 2 + 1,
                );
                currentState.raycaster.setFromCamera(currentState.pointer, currentState.camera);
              },
            });
            state.events.connect?.(pointerTarget);
          },
        });

        if (!mounted || version !== syncVersionRef.current) return;
        root.render(
          <SceneErrorBoundary onError={(error) => setSceneError(() => error)}>
            {latestRef.current.children}
          </SceneErrorBoundary>,
        );
      } catch (error) {
        if (mounted && version === syncVersionRef.current) {
          setSceneError(() => error);
        }
      }
    };

    syncRef.current = sync;
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => void sync());
    resizeObserver?.observe(measureTarget);
    if (!resizeObserver) window.addEventListener("resize", sync, { passive: true });
    void sync();

    return () => {
      mounted = false;
      syncVersionRef.current += 1;
      syncRef.current = null;
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener("resize", sync);
      disposeTimerRef.current = window.setTimeout(() => {
        root.unmount();
        if (rootRef.current === root) rootRef.current = null;
        disposeTimerRef.current = null;
      }, 0);
    };
  }, []);

  useEffect(() => {
    void syncRef.current?.();
  }, [active, antialias, children, eventSource, maxDpr]);

  if (sceneError) throw sceneError;

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none block h-full w-full" />;
}
