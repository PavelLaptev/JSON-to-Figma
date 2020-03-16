import * as React from 'react';

import Icon from '../Icon';

import styles from './button.module.scss';

interface Props {
    text: string;
    click?: string;
    className?: any;
    mod?: string;
    icon?: string;
    fileType?: boolean;
}

const Button: React.SFC<Props> = props => {
    const btnComponent = () => {
        return (
            <button
                className={`${styles.button} ${props.className} ${styles[props.mod]}`}
                onClick={() => console.log('click ones')}
            >
                <span>{props.text}</span>
                {typeof props.icon !== 'undefined' ? <Icon name={props.icon} /> : null}
            </button>
        );
    };

    const fileComponent = () => {
        return <input className={`${styles.button} ${props.className} ${styles[props.mod]}`} type="file" />;
    };

    return props.fileType ? fileComponent() : btnComponent();
};

Button.defaultProps = {
    mod: 'blue',
    className: null,
    fileType: false,
} as Partial<Props>;

export default Button;
