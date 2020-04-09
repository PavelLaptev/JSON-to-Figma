import * as React from 'react';

import {Button} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

import styles from './jsonItemsSection.module.scss';

interface Props {
    obj: Object;
    selected: Object;
    onSectionChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const createButtons = (obj, props) => {
    const handleClick = e => {
        let selected = {...props.selected, ...{btnName: e.target.textContent}};

        parent.postMessage({pluginMessage: {type: selected.option, selected, obj}}, '*');
    };

    return Object.keys(obj[0]).map((item, i) => {
        return <Button key={`item-button-${i}`} text={item} mod="ghost-dark" onClick={handleClick} />;
    });
};

const JSONbuttons: React.SFC<Props> = props => {
    return (
        <SectionWrapper title="JSON Items">
            <div onChange={props.onSectionChange} className={styles.buttonsWrap}>
                {createButtons(props.obj, props)}
            </div>
        </SectionWrapper>
    );
};

export default JSONbuttons;
