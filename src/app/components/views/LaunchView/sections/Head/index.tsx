import * as React from 'react';
import {pluginFrameSize} from '../../../../../../data/pluginFrameSize';

import styles from './styles.module.scss';

declare function require(path: string): any;

const pluginLogo = require('../../../../../assets/plugin-logo.svg');

const LaunchView: React.FC = () => {
    const eyeRef = React.useRef(null);
    const [nes1989, setNes1989] = React.useState(false);
    const [eyePos, setEyePos] = React.useState({x: 0, y: 0});

    React.useEffect(() => {
        const updatePos = e => {
            let posX = e.clientX / (pluginFrameSize.width / 4);
            let posY = e.clientY / (pluginFrameSize.height / 4);

            setEyePos({
                x: posX,
                y: posY,
            });
        };

        window.addEventListener('mousemove', updatePos);

        return () => {
            window.removeEventListener('mousemove', updatePos);
        };
    }, []);

    return (
        <section className={styles.head} onDoubleClick={() => setNes1989(!nes1989)}>
            <div
                style={{
                    transform: `translate(${eyePos.x}px, ${eyePos.y}px)`,
                }}
                ref={eyeRef}
                className={styles.eyes}
            />
            <img className={styles.logo} src={pluginLogo} />
        </section>
    );
};

export default LaunchView;
