import * as React from 'react';

interface Props {
    groupName: string;
    id: string;
    label?: string;
}

const RadioBtn: React.SFC<Props> = props => {
    return (
        <div>
            <input type="radio" name={props.groupName} id={props.id} />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
};

RadioBtn.defaultProps = {
    label: 'label',
} as Partial<Props>;

export default RadioBtn;
