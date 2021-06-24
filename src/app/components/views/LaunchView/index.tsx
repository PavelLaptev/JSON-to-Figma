import * as React from 'react';

import {ViewContext} from '../../contexts';
import {Link, Button} from '../../elements';
import Head from './sections/Head';

import styles from './styles.module.scss';

interface Props {
    fileOnChange(event: React.FormEvent<HTMLInputElement>): void;
    urlOnClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

const LaunchView: React.FC<Props> = props => {
    return (
        <ViewContext.Consumer>
            {() => (
                <main className={styles.wrap}>
                    <Head />
                    <section className={styles.buttonsSection}>
                        <Button icon="upload" fileType text={'From local file'} onChange={props.fileOnChange} />
                        <Button
                            icon="copy"
                            title="Copy link and press the button"
                            text={'From Clipboard link'}
                            onClick={props.urlOnClick}
                        />
                    </section>
                    <section className={styles.links}>
                        <p className={styles.caption}>
                            Read the <Link text="documentation" link="https://github.com/PavelLaptev/JSON-to-Figma" />
                        </p>
                        <p className={styles.caption}>
                            <Link text="Support plugin" link="https://www.paypal.com/paypalme/pavellaptev" /> 🧑‍💻
                        </p>
                    </section>
                </main>
            )}
        </ViewContext.Consumer>
    );
};

export default LaunchView;
