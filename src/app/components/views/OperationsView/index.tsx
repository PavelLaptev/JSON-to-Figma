import React from 'react';

import ViewProvider from '../ViewContext';
import FileSection from './sections/FileSection';
import JSONItemsSection from './sections/JSONItemsSection';
import OptionsSection from './sections/OptionsSection';
import ExtraSection from './sections/ExtraSection';

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
        <ViewProvider.Consumer>
            {JSONobject => (
                <main ref={mainSectionRef} className={styles.wrap}>
                    <FileSection obj={JSONobject} onResetClick={props.onResetClick} />
                    <JSONItemsSection obj={JSONobject} />
                    <OptionsSection />
                    <ExtraSection />
                </main>
            )}
        </ViewProvider.Consumer>
    );
};

export default OperationsView;
