import * as React from 'react';

import {Switcher} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

import styles from './styles.module.scss';

interface Props {
    onSectionChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const RandomSwitcher: React.SFC<Props> = props => {
    return (
        <SectionWrapper title="Random order" className={styles.wrap} onChange={props.onSectionChange}>
            <Switcher id="random-order-check" label="All items will be filled in a random order." />
        </SectionWrapper>
    );
};

export default RandomSwitcher;
