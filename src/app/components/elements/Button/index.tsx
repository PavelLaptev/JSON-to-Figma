import * as React from 'react';

import Icon from '../Icon';

import styles from './button.module.scss';

interface Props {
    text: string;
    className?: any;
    icon?: string;
    mod?: string;
    fileType?: boolean;
    onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const Button: React.SFC<Props> = props => {
    const btnComponent = () => {
        return (
            <button
                className={`${styles.button} ${props.className} ${styles[props.mod]}`}
                onClick={props.onClick}
                onChange={props.onChange}
            >
                <span>{props.text}</span>
                {typeof props.icon !== 'undefined' ? <Icon name={props.icon} /> : null}
            </button>
        );
    };

    const fileBtnComponent = () => {
        return (
            <label className={`${styles.button} ${styles.fileButton} ${props.className} ${styles[props.mod]}`}>
                <input type="file" onClick={props.onClick} onChange={props.onChange} />
                <span>{props.text}</span>
                {typeof props.icon !== 'undefined' ? <Icon name={props.icon} /> : null}
            </label>
        );
    };

    return props.fileType ? fileBtnComponent() : btnComponent();
};

Button.defaultProps = {
    className: null,
    mod: 'blue',
    fileType: false,
} as Partial<Props>;

export default Button;
