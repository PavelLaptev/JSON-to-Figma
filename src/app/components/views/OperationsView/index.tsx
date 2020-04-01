import * as React from 'react';

import {ViewContext} from '../../contexts';
import FileInfo from './sections/FileInfo';
import JSONbuttons from './sections/JSONbuttons';
import Options from './sections/Options';
import RandomSwitcher from './sections/RandomSwitcher';

import styles from './operationsView.module.scss';

import {radioGroupName, radioArray} from './sections/Options/buttonsArray';

interface Props {
    onResetClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

const OperationsView: React.SFC<Props> = props => {
    const [selectedOption, setSelectedOption] = React.useState(radioArray[0].id);
    const [isRandomSwitch, setIsRandomSwitch] = React.useState(false);
    const mainSectionRef = React.useRef(null);

    React.useEffect(() => {
        const frameHeight = mainSectionRef.current.getBoundingClientRect().height;
        parent.postMessage({pluginMessage: {type: 'change-size', frameHeight}}, '*');
    });

    const handleSelectedOption = e => {
        setSelectedOption(e.target['value']);
    };

    const handleRandomSwitcher = e => {
        setIsRandomSwitch(e.target.checked);
    };

    return (
        <ViewContext.Consumer>
            {JSONobject => (
                <main ref={mainSectionRef} className={styles.wrap}>
                    <FileInfo obj={JSONobject} onResetClick={props.onResetClick} />
                    <JSONbuttons obj={JSONobject} selected={{option: selectedOption, random: isRandomSwitch}} />
                    <Options
                        onSectionChange={handleSelectedOption}
                        array={radioArray}
                        groupName={radioGroupName}
                        defaultRadio={selectedOption}
                    />
                    <RandomSwitcher onSectionChange={handleRandomSwitcher} />
                </main>
            )}
        </ViewContext.Consumer>
    );
};

export default OperationsView;
