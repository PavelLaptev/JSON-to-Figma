import * as React from 'react';

import {isImageString} from '../../../../../utils/';
import {Button} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

import {radioArray, allMatches} from '../../sections/Options/buttonsArray';
import styles from './jsonItemsSection.module.scss';

interface Props {
    obj: Object;
    selected: Object;
    onSectionChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const createButtons = (obj, props) => {
    // console.log(Object.keys(obj[0]).length);

    const handleClick = e => {
        if (typeof e.target.textContent !== 'undefined') {
            let selected = {...props.selected, ...{btnName: e.target.textContent}};
            parent.postMessage({pluginMessage: {type: selected.option, selected, obj}}, '*');
        }
    };

    return Object.keys(obj[0]).map((item, i) => {
        const isImage = isImageString(obj[0][item].toString().split('?')[0]);
        return (
            <Button
                key={`item-button-${i}`}
                text={item}
                icon={isImage ? 'image' : undefined}
                mod="ghost-dark"
                onClick={handleClick}
            />
        );
    });
};

const handlePopulateAllMathces = (obj, props, e) => {
    let selected = {...props.selected, ...{btnName: e.target.textContent}};
    parent.postMessage({pluginMessage: {type: selected.option, selected, obj}}, '*');
};

const JSONbuttons: React.FunctionComponent<Props> = props => {
    return (
        <SectionWrapper className={styles.wrap}>
            <div className={styles.header}>
                <h3 className={styles.title}>
                    {`${Object.keys(props.obj[0]).length} keys`}
                    <span>{` / ${(props.obj as any).length} objects`}</span>
                </h3>
            </div>
            <div onChange={props.onSectionChange} className={styles.buttonsWrap}>
                {props.selected['option'] === radioArray[0].id || props.selected['option'] === radioArray[2].id ? (
                    <Button
                        text={allMatches.name}
                        mod="primary"
                        onClick={e => handlePopulateAllMathces(props.obj, props, e)}
                    />
                ) : null}
                {createButtons(props.obj, props)}
            </div>
        </SectionWrapper>
    );
};

export default JSONbuttons;
