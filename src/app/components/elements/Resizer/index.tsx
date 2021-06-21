import * as React from 'react';
import styles from './styles.module.scss';

const Resizer: React.FunctionComponent = () => {
    const resizerRef = React.useRef(null);
    const [pressed, setPressed] = React.useState(false);

    React.useEffect(() => {
        const handlePointerDown = (e: PointerEvent) => {
            resizerRef.current.setPointerCapture(e.pointerId);
            setPressed(true);
        };

        const handlePointerUp = (e: PointerEvent) => {
            resizerRef.current.releasePointerCapture(e.pointerId);
            setPressed(false);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (pressed) {
                parent.postMessage(
                    {pluginMessage: {type: 'manual-resize', size: {width: e.clientX, height: e.clientY}}},
                    '*'
                );
            }
        };

        resizerRef.current.addEventListener('pointerdown', handlePointerDown);
        resizerRef.current.addEventListener('pointerup', handlePointerUp);
        resizerRef.current.addEventListener('mousemove', handleMouseMove);

        return () => {
            resizerRef.current.removeEventListener('pointerdown', handlePointerDown);
            resizerRef.current.removeEventListener('pointerup', handlePointerUp);
            resizerRef.current.removeEventListener('mousemove', handleMouseMove);
        };
    }, [pressed]);

    return <div ref={resizerRef} className={styles.resizer} />;
};

export default Resizer;
