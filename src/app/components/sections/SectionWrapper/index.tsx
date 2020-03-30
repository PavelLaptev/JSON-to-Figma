import * as React from 'react';

import styles from './sectionWrapper.module.scss';

interface Props {
    title?: string;
    className?: string;
    onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const SectionWrapper: React.SFC<Props> = props => {
    return (
        <section className={`${styles.wrap} ${props.className}`} onClick={props.onClick} onChange={props.onChange}>
            {props.title !== null ? <h3 className={styles.title}>{props.title}</h3> : null}
            {props.children}
        </section>
    );
};

SectionWrapper.defaultProps = {
    title: null,
    className: null,
} as Partial<Props>;

export default SectionWrapper;
