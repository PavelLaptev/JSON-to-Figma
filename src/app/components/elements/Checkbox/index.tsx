import * as React from 'react';

import './checkbox.scss';
import {Icon} from '../index';

interface Props {
    label?: string;
    nested?: boolean;
    onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

const Checkbox: React.FunctionComponent<Props> = props => {
    const [checked, setChecked] = React.useState(false);
    const handleClick = e => {
        setChecked(!checked);
        // console.log(e.target.getAttribute('data-checked'));
        props.onClick(e);
    };

    return (
        <div data-checked={checked} className={`wrap`} onClick={handleClick}>
            <div className={`checkbox  ${checked ? `checked` : null}`}>
                <Icon name={'tick'} />
            </div>
            <span className={`label`}>{props.label}</span>
        </div>
    );
};

Checkbox.defaultProps = {
    label: 'Label',
    onClick: () => {},
    nested: false,
} as Partial<Props>;

export default Checkbox;
