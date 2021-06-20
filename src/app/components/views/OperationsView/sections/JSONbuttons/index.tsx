import * as React from 'react';

import {isImageString} from '../../../../../utils/';
import {Button} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

import styles from './styles.module.scss';

interface Props {
    obj: Object;
    random: boolean;
    onResetClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

const JSONbuttons: React.FC<Props> = props => {
    const [selectedItems, setSelecteditems] = React.useState([] as Array<string>);

    const createButtons = () => {
        return Object.keys(props.obj[0]).map((item, i) => {
            const [toggle, setToggle] = React.useState(false);

            const handleClick = e => {
                if (typeof e.target.textContent !== 'undefined') {
                    setToggle(!toggle);
                }
            };

            React.useEffect(() => {
                if (toggle) {
                    setSelecteditems([...selectedItems, item]);
                } else {
                    setSelecteditems(selectedItems.filter(c => c !== item));
                }
            }, [toggle]);

            const isImage = isImageString(props.obj[0][item].toString().split('?')[0]);
            return (
                <Button
                    key={`item-button-${i}`}
                    text={item}
                    icon={isImage ? 'image' : undefined}
                    mod={toggle ? 'ACTIVE' : 'OUTLINE'}
                    onClick={handleClick}
                />
            );
        });
    };

    const populateSelected = obj => {
        parent.postMessage(
            {pluginMessage: {type: 'populate-selected', random: props.random, selected: selectedItems, obj}},
            '*'
        );
    };

    return (
        <SectionWrapper className={styles.wrap} title="JSON keys">
            <Button className={styles.reset} text="Reset" mod="OUTLINE" onClick={props.onResetClick} />
            <div className={styles.buttonsWrap}>{createButtons()}</div>
            <Button text={'Populate selected'} mod="PRIMARY" onClick={() => populateSelected(props.obj)} />
        </SectionWrapper>
    );
};

export default JSONbuttons;
