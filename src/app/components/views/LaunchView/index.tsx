import * as React from 'react';
import styles from './launchView.module.scss';

import {CopyLink, Button} from '../../elements';

declare function require(path: string): any;

const pluginLogo = require('../../../assets/logo.svg');
const jasonMask = require('../../../assets/jason-mask.svg');

const LaunchView = ({}) => {
    return (
        <main className={styles.wrap} style={{backgroundImage: `url(${jasonMask})`}}>
            <img className={styles.logo} src={pluginLogo} />
            <section className={styles.buttonsSection}>
                <Button icon="yo" text={'From local file'} />
                <Button text={'From Clipboard link'} />
            </section>
            <p className={styles.caption}>
                Your JSON file should have a{' '}
                {<CopyLink text="certain structure" className="yo" link="https://www.google.com/" />} to be readable.
            </p>
        </main>
    );
};

export default LaunchView;
