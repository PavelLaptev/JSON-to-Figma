import * as React from 'react';

import {ElementCaption, Button} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

import styles from './SkipLayers.module.scss';

interface Props {
    onSectionChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const SkipLayers: React.SFC<Props> = props => {
    const addSkipSign = () => {
        parent.postMessage({pluginMessage: {type: 'add-skip-sign'}}, '*');
    };

    const removeSign = () => {
        parent.postMessage({pluginMessage: {type: 'remove-skip-sign'}}, '*');
    };

    return (
        <SectionWrapper className={styles.wrap} onChange={props.onSectionChange} title="Skip marked layers">
            <ElementCaption text="Select layers you want to exclude or include in the population. The plugin will skip entirely layers with the special “skip” sign — ^. You could, also, add or remove the sign manually."></ElementCaption>
            <div className={styles.btnWrap}>
                <Button text="Add “skip” sign" mod="ghost-dark" onClick={addSkipSign} />
                <Button text="Remove “skip” sign" mod="ghost-dark" onClick={removeSign} />
            </div>
        </SectionWrapper>
    );
};

export default SkipLayers;
