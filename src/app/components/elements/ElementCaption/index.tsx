import * as React from 'react';

import styles from './elementCaption.module.scss';

interface Props {
    text: string;
}

const ElementCaption: React.SFC<Props> = props => {
    return (
        <div>
            <div>{props.children}</div>
            <p className={styles.caption}>{props.text}</p>
        </div>
    );
};

export default ElementCaption;
