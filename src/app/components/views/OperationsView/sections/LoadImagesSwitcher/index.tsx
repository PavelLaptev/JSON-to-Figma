import * as React from 'react';

import {Switcher, ElementCaption} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

import styles from './LoadImagesSwitcher.module.scss';

interface Props {
    onSectionChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const LoadImagesSwitcher: React.SFC<Props> = props => {
    return (
        <SectionWrapper className={styles.wrap} onChange={props.onSectionChange}>
            <ElementCaption text="Fetch images if you have lines ending with *.PNG, *.JPEG and *.GIF.">
                <Switcher id="load-images-check" label="Fetch Images" />
            </ElementCaption>
        </SectionWrapper>
    );
};

export default LoadImagesSwitcher;
