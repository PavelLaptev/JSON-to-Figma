import * as React from 'react';

import styles from './title.module.scss';

interface Props {
    text: string;
}

const Header: React.FunctionComponent<Props> = props => {
    return (
        <div className={styles.header}>
            <h3 className={styles.title}>{props.text}</h3>
            {props.children ? <div className={styles.additions}>{props.children}</div> : null}
        </div>
    );
};

Header.defaultProps = {
    text: 'header',
} as Partial<Props>;

export default Header;
