import * as React from 'react';

import styles from './radioBtn.module.scss';

interface Props {
    groupName: string;
    id: string;
    label?: string;
}

const RadioBtn: React.SFC<Props> = props => {
    return (
        <div className={styles.wrap}>
            <input type="radio" name={props.groupName} id={props.id} />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
};

RadioBtn.defaultProps = {
    label: 'label',
} as Partial<Props>;

export default RadioBtn;
