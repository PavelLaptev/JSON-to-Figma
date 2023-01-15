import * as React from "react";
import styles from "./styles.module.scss";

const Resizer: React.FunctionComponent = () => {
  const resizerRef = React.useRef(null);
  const [pressed, setPressed] = React.useState(false);

  React.useEffect(() => {
    const instance = resizerRef.current;

    const handlePointerDown = (e: PointerEvent) => {
      instance.setPointerCapture(e.pointerId);
      setPressed(true);
    };

    const handlePointerUp = (e: PointerEvent) => {
      instance.releasePointerCapture(e.pointerId);
      setPressed(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (pressed) {
        parent.postMessage(
          {
            pluginMessage: {
              type: "manual-resize",
              size: { width: e.clientX, height: e.clientY },
            },
          },
          "*"
        );
      }
    };

    instance.addEventListener("pointerdown", handlePointerDown);
    instance.addEventListener("pointerup", handlePointerUp);
    instance.addEventListener("mousemove", handleMouseMove);

    return () => {
      instance.removeEventListener("pointerdown", handlePointerDown);
      instance.removeEventListener("pointerup", handlePointerUp);
      instance.removeEventListener("mousemove", handleMouseMove);
    };
  }, [pressed]);

  return <div ref={resizerRef} className={styles.resizer} />;
};

export default Resizer;
