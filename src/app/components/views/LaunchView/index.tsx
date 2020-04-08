import * as React from 'react';

import {ViewContext} from '../../contexts';
import {CopyLink, Button} from '../../elements';

declare function require(path: string): any;

const pluginLogo = require('../../../assets/logo.svg');
const jsonMask = require('../../../assets/jason-mask.svg');

import styles from './launchView.module.scss';

interface Props {
    fileOnChange(event: React.FormEvent<HTMLInputElement>): void;
    urlOnClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

const LaunchView: React.SFC<Props> = props => {
    return (
        <ViewContext.Consumer>
            {() => (
                <main className={styles.wrap}>
                    <section className={styles.head}>
                        <img className={styles.jsonMaskLogo} src={jsonMask} />
                        <img className={styles.logo} src={pluginLogo} />
                    </section>
                    <section className={styles.buttonsSection}>
                        <Button icon="upload" fileType text={'From local file'} onChange={props.fileOnChange} />
                        <Button icon="copy" text={'From Clipboard link'} onClick={props.urlOnClick} />
                    </section>
                    <p className={styles.caption}>
                        Learn more on the{' '}
                        {
                            <CopyLink
                                text="GitHub page"
                                className={styles.copyLink}
                                link="https://github.com/PavelLaptev/JSON-to-Figma-2.0-React/blob/master/README.md#-the-correct-json-structure"
                            />
                        }
                        .
                    </p>
                </main>
            )}
        </ViewContext.Consumer>
    );
};

export default LaunchView;
