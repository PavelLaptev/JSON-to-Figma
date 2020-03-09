import * as React from 'react';

import styles from './button.module.scss';

interface Props {
    text: string;
    click?: string;
    className?: any;
}

const Button: React.SFC<Props> = props => {
    return (
        <button className={`${styles.button} ${props.className}`} onClick={() => console.log('click')}>
            <span>{props.text}</span>
            <i>i</i>
        </button>
    );
};

export default Button;
