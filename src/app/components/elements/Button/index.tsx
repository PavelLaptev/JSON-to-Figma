import * as React from 'react';

import styles from './button.module.scss';

interface Props {
    text: string;
    click?: string;
    className?: any;
    type?: string;
    icon?: string;
}

const Button: React.SFC<Props> = props => {
    return (
        <button
            className={`${styles.button} ${props.className} ${styles[props.type]}`}
            onClick={() => console.log('click ones')}
        >
            <span>{props.text}</span>
            {typeof props.icon === 'undefined' ? <i>i</i> : console.log(props.icon)}
        </button>
    );
};

Button.defaultProps = {
    type: 'blue',
    className: null,
} as Partial<Props>;

export default Button;
