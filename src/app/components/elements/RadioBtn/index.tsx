import * as React from 'react';

import styles from './styles.module.scss';

interface Props {
    groupName: string;
    id: string;
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
    label?: string;
    checked?: boolean;
}

const RadioBtn: React.SFC<Props> = props => {
    return (
        <div className={styles.wrap}>
            <input
                type="radio"
                name={props.groupName}
                id={props.id}
                value={props.id}
                checked={props.checked}
                onChange={props.onChange}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
};

RadioBtn.defaultProps = {
    label: 'label',
    checked: false,
} as Partial<Props>;

export default RadioBtn;
