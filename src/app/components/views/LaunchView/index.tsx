import React, {useState} from 'react';
import styles from './launchView.module.scss';

import ViewProvider from '../ViewContext';
import {CopyLink, Button} from '../../elements';

declare function require(path: string): any;

const pluginLogo = require('../../../assets/logo.svg');
const jasonMask = require('../../../assets/jason-mask.svg');

const LaunchView = ({}) => {
    const [isJSONloaded, setIsJSONloaded] = useState(null);

    const handleChangeFile = e => {
        const fileReader = new FileReader();

        fileReader.readAsText(e.target.files[0]);

        fileReader.onload = () => {
            setIsJSONloaded(fileReader.result);
            // console.log(fileReader.result);
            console.log(isJSONloaded);
        };
    };

    return (
        <ViewProvider.Provider value={isJSONloaded}>
            <main className={styles.wrap} style={{backgroundImage: `url(${jasonMask})`}}>
                <img className={styles.logo} src={pluginLogo} />
                <section className={styles.buttonsSection}>
                    <Button icon="upload" fileType text={'From local file'} onChange={e => handleChangeFile(e)} />
                    <Button icon="copy" text={'From Clipboard link'} onClick={e => console.log(e.target)} />
                </section>
                <p className={styles.caption}>
                    Your JSON file should have a{' '}
                    {<CopyLink text="certain structure" className="yo" link="https://www.google.com/" />} to be
                    readable.
                </p>
            </main>
        </ViewProvider.Provider>
    );
};

export default LaunchView;
