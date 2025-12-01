import React, { useState, useContext } from "react";
import EpicGamesBackground from "./EpicGamesBackground";
import EpicGamesStartAppButtonContainer from "./EpicGamesStartAppButtonContainer";
import { UserContext } from '../../contexts/UserContext';

import EpicGamesPlatform from '../Platform/App';
import ErrorBoundary from '../ErrorBoundary';

const EpicGamesStartApp = () => {
    const [hideByModality, setHideByModality] = useState(false);

    return (
        <>
            <EpicGamesBackground hideByModality={hideByModality}/>
            <EpicGamesStartAppButtonContainer setHideByModality={setHideByModality} />
        </>
    );
}

const AppContent = () => {
    const { isAuthenticated } = useContext(UserContext);

    return (
        <>
            {isAuthenticated ? (
                <ErrorBoundary>
                    <EpicGamesPlatform />
                </ErrorBoundary>
            ) : <EpicGamesStartApp />}
        </>
    );
}

export default AppContent;