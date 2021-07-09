import * as React from 'react';

import {isImageString, downloadJSON, filterObjRange, postFigmaMessage} from '../../../../../utils';
import {Button} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

import styles from './styles.module.scss';

interface Props {
    obj: Object;
    random: boolean;
    range: string;
    onReuploadClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

const JSONButtons: React.FC<Props> = props => {
    // INITIAL CONSTANTS
    const initialToggle = Object.keys(props.obj[0]).reduce((acc, curr) => ((acc[curr] = false), acc), {});
    const obj = Object.keys(props.obj[0]);

    // STATES
    const [selectedItems, setSelecteditems] = React.useState([] as Array<string>);
    const [toggle, setToggle] = React.useState(initialToggle);

    // POST DATA FOO TEMPLATE
    const postPluginData = () => {
        postFigmaMessage({
            type: 'post-plugin-storage',
            random: props.random,
            manual: false,
            selected: selectedItems,
            obj: filterObjRange(props.range, props.obj),
        });
    };

    // USE EFFECT
    React.useEffect(() => {
        postPluginData();
    }, [selectedItems, props.random]);

    // BUTTONS
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

    // HANDLERS
    const handllePopulate = obj => {
        postFigmaMessage({
            type: 'populate',
            random: props.random,
            selected: selectedItems,
            obj: filterObjRange(props.range, obj),
        });
    };

    const handleReset = () => {
        setSelecteditems([]);
        setToggle(initialToggle);
    };

    const handleInvert = () => {
        const invertedObj = Object.entries(toggle).map(item => {
            return {[item[0]]: !item[1]};
        });
        setToggle(Object.assign({}, ...invertedObj));
        const invertedItems = invertedObj
            .map(item => (Object.values(item)[0] ? Object.keys(item)[0] : false))
            .filter(Boolean);

        setSelecteditems(invertedItems as Array<string>);
    };

    const handleDownload = obj => {
        downloadJSON(filterObjRange(props.range, obj));
    };

    // RENDER
    return (
        <SectionWrapper className={styles.wrap} title="Select keys ↴">
            <div className={styles.buttonsWrap}>{createButtons()}</div>
            <div className={styles.manipulationButtons}>
                <Button className={styles.button} text={'Invert'} mod="PRIMARY" onClick={handleInvert} />
                <Button className={styles.icon} icon="reset" title="Reset" mod="PRIMARY" onClick={handleReset} />
                <Button
                    className={styles.icon}
                    icon="save"
                    title="Save JSON"
                    mod="PRIMARY"
                    onClick={() => handleDownload(props.obj)}
                />
                <Button
                    className={styles.icon}
                    icon="reject"
                    title="Reupload"
                    mod="PRIMARY"
                    onClick={props.onReuploadClick}
                />
            </div>
            <div className={styles.actionButtons}>
                <Button
                    className={styles.button}
                    text={'Populate selected'}
                    mod="PRIMARY"
                    onClick={() => handllePopulate(props.obj)}
                />
            </div>
        </SectionWrapper>
    );
};

export default JSONButtons;
