import * as React from 'react';

import styles from './styles.module.scss';

interface Props {
    title?: string;
    className?: string;
    divider?: boolean;
    onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const SectionWrapper: React.FC<Props> = props => {
    return (
        <section className={`${styles.wrap} ${props.className}`} onClick={props.onClick} onChange={props.onChange}>
            {props.title !== null ? <h3 className={styles.title}>{props.title}</h3> : null}
            {props.children}
            {props.divider ? <div className={styles.divider} /> : null}
        </section>
    );
};

SectionWrapper.defaultProps = {
    title: 'Title',
    className: '',
    divider: false,
} as Partial<Props>;

export default SectionWrapper;
