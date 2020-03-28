import * as React from 'react';

import {Button} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

import styles from './jsonItemsSection.module.scss';

interface Props {
    obj: Object;
}

const createButtons = obj => {
    return Object.keys(obj[0]).map((item, i) => {
        console.log(item);
        return <Button key={`item-button-${i}`} text={item} mod="ghost-dark" />;
    });
};

const JSONItemsSection: React.SFC<Props> = props => {
    return (
        <SectionWrapper title="JSON Items">
            <div className={styles.buttonsWrap}>{createButtons(props.obj)}</div>
        </SectionWrapper>
    );
};

export default JSONItemsSection;
