import React, {useState} from 'react';

import styles from './styles.module.scss';

interface Props {
    label?: string;
    checked?: boolean;
    id: string;
}

const Switcher: React.FC<Props> = props => {
    const [switcherChecked, setSwitcherChecked] = useState(props.checked);

    const handleChange = () => {
        setSwitcherChecked(!switcherChecked);
    };

    return (
        <div className={styles.wrap}>
            <input type="checkbox" id={props.id} checked={switcherChecked} onChange={handleChange} />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
};

Switcher.defaultProps = {
    label: 'label',
    checked: false,
} as Partial<Props>;

export default Switcher;
