import * as React from 'react';
import {Icon} from '../index';

import styles from './styles.module.scss';

interface Props {
    text?: string;
    title?: string;
    className?: any;
    icon?: string;
    iconColor?: string;
    mod?: 'PRIMARY' | 'OUTLINE' | 'ACTIVE';
    fileType?: boolean;
    onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const selectBtnStyle = mod => {
    switch (mod) {
        case 'OUTLINE':
            return 'outline';
        case 'ACTIVE':
            return 'active';
        default:
            return 'primary';
    }
};

const Button: React.FC<Props> = props => {
    const isIcon = () => {
        if (typeof props.icon !== 'undefined') {
            return true;
        } else {
            return false;
        }
    };

    const btnComponent = () => {
        return (
            <button
                className={`${styles.button} ${props.className} ${styles[selectBtnStyle(props.mod)]}`}
                onClick={props.onClick}
                onChange={props.onChange}
                title={props.title !== '' ? props.title : null}
            >
                <span>{props.text}</span>
                {isIcon() ? <Icon name={props.icon} color={props.iconColor} /> : null}
            </button>
        );
    };

    const fileBtnComponent = () => {
        return (
            <label
                className={`${styles.button} ${styles.fileButton} ${props.className} ${
                    styles[selectBtnStyle(props.mod)]
                }`}
            >
                <input type="file" accept="application/json" onClick={props.onClick} onChange={props.onChange} />
                {props.text !== '' ? <span>{props.text}</span> : null}
                {typeof props.icon !== 'undefined' ? <Icon name={props.icon} /> : null}
            </label>
        );
    };

    return props.fileType ? fileBtnComponent() : btnComponent();
};

Button.defaultProps = {
    className: '',
    mod: 'PRIMARY',
    fileType: false,
    text: '',
    title: '',
} as Partial<Props>;

export default Button;
