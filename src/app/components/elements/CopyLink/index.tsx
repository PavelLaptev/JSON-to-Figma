import * as React from 'react';
// import {formatSuccessMessage} from '@create-figma-plugin/utilities';

import styles from './copylink.module.scss';

interface Props {
    text: string;
    link: string;
}

const CopyLink: React.SFC<Props> = props => {
    const execCopy = link => {
        const textField = document.createElement('textarea');
        textField.innerText = link;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    };

    const copyToClipboard = (link: string): void => {
        execCopy(link);
        let notifyText: string = 'Link copied';
        parent.postMessage({pluginMessage: {type: 'copy-to-clipboard', link: link, notifyText: notifyText}}, '*');
    };

    return (
        <span className={styles.copyLink} onClick={() => copyToClipboard(props.link)}>
            {props.text}
        </span>
    );
};

CopyLink.defaultProps = {
    text: 'Hallo',
    link: '',
};

export default CopyLink;
