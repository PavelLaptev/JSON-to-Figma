import * as React from 'react';

import {ViewContext} from '../../contexts';
import JSONbuttons from './sections/JSONbuttons';
import SkipLayers from './sections/SkipLayers';
import RandomSwitcher from './sections/RandomSwitcher';
import {Resizer} from '../../elements';

import styles from './styles.module.scss';

interface Props {
    onResetClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

const OperationsView: React.FunctionComponent<Props> = props => {
    const [isRandomSwitch, setIsRandomSwitch] = React.useState(false);
    const mainSectionRef = React.useRef(null);

    React.useEffect(() => {
        const frameHeight = mainSectionRef.current.getBoundingClientRect().height;
        parent.postMessage({pluginMessage: {type: 'change-size', frameHeight}}, '*');
    });

    const handleRandomSwitcher = e => {
        setIsRandomSwitch(e.target.checked);
    };

    return (
        <ViewContext.Consumer>
            {JSONobject => (
                <main ref={mainSectionRef} className={styles.wrap}>
                    <Resizer />
                    <JSONbuttons onResetClick={props.onResetClick} obj={JSONobject} random={isRandomSwitch} />
                    <SkipLayers />
                    <RandomSwitcher onSectionChange={handleRandomSwitcher} />
                </main>
            )}
        </ViewContext.Consumer>
    );
};

export default OperationsView;
