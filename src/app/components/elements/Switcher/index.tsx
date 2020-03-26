import * as React from 'react';

import styles from './switcher.module.scss';

interface Props {
    label?: string;
    state?: boolean;
    id: string;
}

const Switcher: React.SFC<Props> = props => {
    return (
        <div className={styles.wrap}>
            <input type="checkbox" id={props.id} />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
};

Switcher.defaultProps = {
    label: 'label',
    state: false,
} as Partial<Props>;

export default Switcher;
