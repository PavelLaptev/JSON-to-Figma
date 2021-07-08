import * as React from 'react';

import {isImageString, downloadJSON, filterObjRange} from '../../../../../utils';
import {Button} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

import styles from './styles.module.scss';

interface Props {
    obj: Object;
    random: boolean;
    range: string;
    onReuploadClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

const ManualJSONButtons: React.FC<Props> = props => {
    // INITIAL CONSTANTS
    const obj = Object.keys(props.obj[0]);

    // STATES
    const [selected, setSelected] = React.useState(null);

    const createButtons = () => {
        return obj.map((item, i) => {
            const handleClick = e => {
                if (typeof e.target.textContent !== 'undefined') {
                    if (e.target.textContent === selected) {
                        setSelected(null);
                    } else {
                        setSelected(item);
                    }
                }
            };

            const isImage = isImageString(props.obj[0][item].toString().split('?')[0]);

            return (
                <Button
                    key={`item-button-${i}`}
                    text={item}
                    icon={isImage ? 'image' : undefined}
                    mod={selected === item ? 'ACTIVE' : 'OUTLINE'}
                    onClick={handleClick}
                />
            );
        });
    };

    // HANDLERS
    const handllePopulate = obj => {
        parent.postMessage(
            {
                pluginMessage: {
                    type: 'manual-populate',
                    random: props.random,
                    selected: selected,
                    obj: filterObjRange(props.range, obj),
                },
            },
            '*'
        );
    };

    const handleDownload = obj => {
        downloadJSON(filterObjRange(props.range, obj));
    };

    return (
        <SectionWrapper className={styles.wrap} title="Select JSON key ↴">
            <div className={styles.buttonsWrap}>{createButtons()}</div>
            <div className={styles.manipulationButtons}>
                <Button
                    className={styles.button}
                    text={'Populate selected'}
                    mod="PRIMARY"
                    onClick={() => handllePopulate(props.obj)}
                />
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
        </SectionWrapper>
    );
};

export default ManualJSONButtons;
