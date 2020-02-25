import * as React from 'react';

import styles from './copylink.module.scss';

interface Props {
    text?: string;
}

const CopyLink: React.SFC<Props> = props => {
    const copyToClipboard = (text: string): void => {
        console.log(text);
    };

    return (
        <span className={styles.copyLink} onClick={() => copyToClipboard('sd')}>
            {props.text}
        </span>
    );
};

CopyLink.defaultProps = {
    text: 'Hallo',
};

export default CopyLink;
