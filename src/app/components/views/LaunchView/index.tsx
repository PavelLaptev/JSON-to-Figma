import * as React from 'react';
import CopyLink from '../../elements/CopyLink';

declare function require(path: string): any;

const pluginLogo = require('../../../assets/logo.svg');

const LaunchView = ({}) => {
    return (
        <div>
            <img src={pluginLogo} />
            <p>
                Your JSON file should have a certain {<CopyLink text="structure" link="https://www.google.com/" />} to
                be readable.
            </p>
        </div>
    );
};

export default LaunchView;
