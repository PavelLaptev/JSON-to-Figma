import * as React from 'react';

import {isImageString} from '../../../../../utils/';
import {Button} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

import styles from './styles.module.scss';

interface Props {
    obj: Object;
    random: boolean;
    range: string;
    onResetClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

const JSONbuttons: React.FC<Props> = props => {
    const initialToggle = Object.keys(props.obj[0]).reduce((acc, curr) => ((acc[curr] = false), acc), {});
    const obj = Object.keys(props.obj[0]);

    const [selectedItems, setSelecteditems] = React.useState([] as Array<string>);
    const [toggle, setToggle] = React.useState(initialToggle);

    const createButtons = () => {
        return obj.map((item, i) => {
            const handleClick = e => {
                if (typeof e.target.textContent !== 'undefined') {
                    setToggle(prevState => ({
                        ...prevState,
                        [item]: !prevState[item],
                    }));
                }
            };

            React.useEffect(() => {
                if (toggle[item]) {
                    setSelecteditems([...selectedItems, item]);
                } else {
                    setSelecteditems(selectedItems.filter(c => c !== item));
                }
            }, [toggle[item]]);

            const isImage = isImageString(props.obj[0][item].toString().split('?')[0]);
            return (
                <Button
                    key={`item-button-${i}`}
                    text={item}
                    icon={isImage ? 'image' : undefined}
                    mod={toggle[item] ? 'ACTIVE' : 'OUTLINE'}
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

    const resetSelected = () => {
        setSelecteditems([]);
        setToggle(initialToggle);
    };

    const invertSelected = () => {
        const invertedObj = Object.entries(toggle).map(item => {
            return {[item[0]]: !item[1]};
        });
        setToggle(Object.assign({}, ...invertedObj));
        const invertedItems = invertedObj
            .map(item => (Object.values(item)[0] ? Object.keys(item)[0] : false))
            .filter(Boolean);

        setSelecteditems(invertedItems as Array<string>);
    };

    return (
        <SectionWrapper className={styles.wrap} title="JSON keys">
            <div className={styles.buttonsWrap}>{createButtons()}</div>
            <div className={styles.manipulationButtons}>
                <Button className={styles.button} text={'Invert'} mod="PRIMARY" onClick={invertSelected} />
                <Button className={styles.icon} icon="reset" title="Reset" mod="PRIMARY" onClick={resetSelected} />
                <Button
                    className={styles.icon}
                    icon="reject"
                    title="Reupload"
                    mod="PRIMARY"
                    onClick={props.onResetClick}
                />
            </div>
            <div className={styles.actionButtons}>
                <Button
                    className={styles.button}
                    text={'Populate selected'}
                    mod="PRIMARY"
                    onClick={() => populateSelected(props.obj)}
                />
            </div>
        </SectionWrapper>
    );
};

export default JSONbuttons;
