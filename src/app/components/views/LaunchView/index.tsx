import * as React from 'react';

import {ViewContext} from '../../contexts';
import {CopyLink, Button} from '../../elements';

declare function require(path: string): any;

const pluginLogo = require('../../../assets/logo.svg');
const jasonMask = require('../../../assets/jason-mask.svg');

import styles from './launchView.module.scss';

interface Props {
    fileOnChange(event: React.FormEvent<HTMLInputElement>): void;
    urlOnClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

const LaunchView: React.SFC<Props> = props => {
    return (
        <ViewContext.Consumer>
            {() => (
                <main className={styles.wrap} style={{backgroundImage: `url(${jasonMask})`}}>
                    <img className={styles.logo} src={pluginLogo} />
                    <section className={styles.buttonsSection}>
                        <Button icon="upload" fileType text={'From local file'} onChange={props.fileOnChange} />
                        <Button icon="copy" text={'From Clipboard link'} onClick={props.urlOnClick} />
                    </section>
                    <p className={styles.caption}>
                        JSON file should have a{' '}
                        {
                            <CopyLink
                                text="certain structure"
                                className="yo"
                                link="https://github.com/PavelLaptev/JSON-to-Figma-2.0-React/blob/master/README.md#-the-correct-json-structure"
                            />
                        }{' '}
                        to be readable.
                    </p>
                </main>
            )}
        </ViewContext.Consumer>
    );
};

export default LaunchView;
