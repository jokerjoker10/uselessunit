import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { logoGithub } from 'ionicons/icons';
import './style.css';

import * as config from '../../config/config.env';

interface ContainerProps { }

const GithubLogo: React.FC<ContainerProps> = () => {
    function loadGithub() {
        window.open('https://github.com/jokerjoker10/uselessunit');
    }
    console.log(config.default.matomo_config)
    return (
        <IonItem  className="github_logo_frame">
            <IonList>
                <IonLabel><a href="/about">About</a></IonLabel>
            </IonList>
            <IonIcon onClick={loadGithub} icon={logoGithub} className="github_logo"></IonIcon>
        </IonItem>
    );
};

export default GithubLogo;
