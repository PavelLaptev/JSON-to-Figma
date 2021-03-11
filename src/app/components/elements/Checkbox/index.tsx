import * as React from 'react';

import styles from './checkbox.module.scss';

interface Props {
    label?: string;
}

const Checkbox: React.FunctionComponent<Props> = props => {
    const handleClick = () => {
        console.log('Item click');
    };

    return (
        <div className={styles.wrap} onClick={handleClick}>
            <div className={styles.checkbox} />
            <span className={styles.label}>{props.label}</span>
        </div>
    );
};

Checkbox.defaultProps = {
    label: 'Label',
} as Partial<Props>;

export default Checkbox;
