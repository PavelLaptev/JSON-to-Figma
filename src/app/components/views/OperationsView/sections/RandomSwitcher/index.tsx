import * as React from 'react';

import {Switcher, ElementCaption} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

import styles from './randomSwitcher.module.scss';

interface Props {
    onSectionChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const RandomSwitcher: React.SFC<Props> = props => {
    return (
        <SectionWrapper className={styles.wrap} onChange={props.onSectionChange}>
            <ElementCaption text="All items will be filled in a random order.">
                <Switcher id="random-order-check" label="Random order" />
            </ElementCaption>
        </SectionWrapper>
    );
};

export default RandomSwitcher;
