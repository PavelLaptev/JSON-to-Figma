import * as React from 'react';

import styles from './copylink.module.scss';

interface Props {
    text: string;
    link: string;
    className?: any;
}

const CopyLink: React.SFC<Props> = props => {
    const execCopy = (link: string) => {
        const textField = document.createElement('textarea');
        textField.innerText = link;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    };

    const copyToClipboard = (link: string): void => {
        execCopy(link);
        let notifyText: string = '✂️ Link copied to Clipboard';
        parent.postMessage({pluginMessage: {type: 'copy-to-clipboard', link: link, notifyText: notifyText}}, '*');
    };

    return (
        <span className={`${styles.copyLink} ${props.className}`} onClick={() => copyToClipboard(props.link)}>
            {props.text}
        </span>
    );
};

export default CopyLink;
