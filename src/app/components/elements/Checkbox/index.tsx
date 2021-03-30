import * as React from 'react';

import styles from './checkbox.module.scss';
import {Icon} from '../index';

interface Props {
    label?: string;
    onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

const Checkbox: React.FunctionComponent<Props> = props => {
    const [checked, setChecked] = React.useState(false);

    const handleClick = e => {
        setChecked(!checked);
        console.log(e.target.getAttribute('data-checked'));
        props.onClick(e.target.getAttribute('data-checked'));
    };

    return (
        <div data-checked={checked} className={styles.wrap} onClick={handleClick}>
            <div className={`${styles.checkbox} ${checked ? styles.checked : null}`}>
                <Icon name="tick" />
            </div>
            <span className={styles.label}>{props.label}</span>
        </div>
    );
};

Checkbox.defaultProps = {
    label: 'Label',
    onClick: () => {},
} as Partial<Props>;

export default Checkbox;
