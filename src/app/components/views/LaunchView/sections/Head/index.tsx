import * as React from 'react';
import {pluginFrameSize} from '../../../../../../data/pluginFrameSize';
import img from '../../../../../assets/nes1989.gif';

import styles from './styles.module.scss';

declare function require(path: string): any;

const pluginLogo = require('../../../../../assets/plugin-logo.svg');
const audio = new Audio('https://github.com/PavelLaptev/JSON-to-Figma/raw/master/src/app/assets/nes1989.mp3');

const LaunchView: React.FC = () => {
    const eyeRef = React.useRef(null);
    const [nes1989, setNes1989] = React.useState(false);
    const [togglePlay, settogglePlay] = React.useState(false);
    const [eyePos, setEyePos] = React.useState({x: 0, y: 0});

    React.useEffect(() => {
        const updatePos = e => {
            let posX = (e.clientX - pluginFrameSize.width / 2) / 100;
            let posY = (e.clientY - pluginFrameSize.height / 2) / 100;

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

    const handleNesActivation = e => {
        e.detail === 18 ? setNes1989(true) : false;
    };

    return !nes1989 ? (
        <section className={styles.head} onClick={handleNesActivation}>
            <div
                style={{
                    transform: `translate(${eyePos.x}px, ${eyePos.y}px)`,
                }}
                ref={eyeRef}
                className={styles.eyes}
            />
            <img className={styles.logo} src={pluginLogo} />
        </section>
    ) : (
        <section className={styles.nes1989}>
            <img className={styles.jason} src={img} alt="JSON" />
            <div className={styles.buttonWrap}>
                <button
                    className={styles.button}
                    onClick={() => {
                        settogglePlay(!togglePlay);
                        !togglePlay ? audio.play() : audio.pause();
                    }}
                >
                    {!togglePlay ? 'Play ♫' : 'Pause ♫'}
                </button>
            </div>

            <audio controls={false}>
                <source
                    src="https://github.com/PavelLaptev/JSON-to-Figma/raw/master/src/app/assets/nes1989.mp3"
                    type="audio/mpeg"
                />
            </audio>
            <div className={styles.background} />
        </section>
    );
};

export default LaunchView;
