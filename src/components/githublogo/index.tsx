import { IonItem, IonLabel } from '@ionic/react';
import './style.css';

interface ContainerProps { }

const GithubLogo: React.FC<ContainerProps> = () => {    
    return (
        <IonItem  className="github_logo_frame">
            <IonLabel><a href="/about">About&Privacy</a></IonLabel>
        </IonItem>
    );
};

export default GithubLogo;
