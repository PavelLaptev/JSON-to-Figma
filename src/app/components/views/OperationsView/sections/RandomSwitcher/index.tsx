import * as React from 'react';

import {Switcher} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

import styles from './styles.module.scss';

interface Props {
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const RandomSwitcher: React.FC<Props> = props => {
    return (
        <SectionWrapper title="Random order" className={styles.wrap} onChange={props.onChange}>
            <Switcher id="random-order-check" label="All items will be filled in a random order." />
        </SectionWrapper>
    );
};

RandomSwitcher.defaultProps = {
    onChange: () => {},
} as Partial<Props>;

export default RandomSwitcher;
