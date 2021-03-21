import * as React from 'react';
import {Header} from '../../elements';

import styles from './sectionWrapper.module.scss';

interface Props {
    title?: string;
    className?: string;
    onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const SectionWrapper: React.FunctionComponent<Props> = props => {
    return (
        <section className={`${styles.wrap} ${props.className}`} onClick={props.onClick} onChange={props.onChange}>
            {props.title !== null ? <Header text={props.title} /> : null}
            {props.children}
            <div className={styles.hr}></div>
        </section>
    );
};

SectionWrapper.defaultProps = {
    title: null,
    className: null,
} as Partial<Props>;

export default SectionWrapper;
