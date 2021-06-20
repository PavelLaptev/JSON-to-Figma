import * as React from 'react';
import styles from './styles.module.scss';

interface Props {
    text: string;
    link: string;
    className?: any;
}

const Link: React.FC<Props> = props => {
    return (
        <a className={`${styles.Link} ${props.className}`} target="_blank" href={props.link}>
            {props.text}
        </a>
    );
};

export default Link;
