import { IonItem, IonLabel } from '@ionic/react';
import './style.css';
import config from '../../config/config.json';

interface ContainerProps { }

const GithubLogo: React.FC<ContainerProps> = () => {    
    return (
        <IonItem  className="github_logo_frame">
            <IonLabel><a href="/about">About</a></IonLabel>
            <IonLabel><a href={config.privacy_policy_url}>Privacy</a></IonLabel>
        </IonItem>
    );
};

export default GithubLogo;
