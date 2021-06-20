import * as React from 'react';

import styles from './styles.module.scss';

interface Props {
    text: string;
}

const ElementCaption: React.SFC<Props> = props => {
    return (
        <div>
            {props.children ? <div>{props.children}</div> : null}
            <p className={styles.caption}>{props.text}</p>
        </div>
    );
};

export default ElementCaption;
