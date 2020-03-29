import React from 'react';

import {ViewContext} from '../../contexts';
import FileInfo from './sections/FileInfo';
import JSONItems from './sections/JSONItems';
import Options from './sections/Options';
import ExtraOptions from './sections/ExtraOptions';

import styles from './operationsView.module.scss';

interface Props {
    onResetClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

const OperationsView: React.SFC<Props> = props => {
    const mainSectionRef = React.useRef(null);

    React.useEffect(() => {
        const frameHeight = mainSectionRef.current.getBoundingClientRect().height;
        parent.postMessage({pluginMessage: {type: 'change-size', frameHeight}}, '*');
    });

    return (
        <ViewContext.Consumer>
            {JSONobject => (
                <main ref={mainSectionRef} className={styles.wrap}>
                    <FileInfo obj={JSONobject} onResetClick={props.onResetClick} />
                    <JSONItems obj={JSONobject} />
                    <Options />
                    <ExtraOptions />
                </main>
            )}
        </ViewContext.Consumer>
    );
};

export default OperationsView;
