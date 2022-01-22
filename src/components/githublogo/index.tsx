import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { logoGithub } from 'ionicons/icons';
import './style.css';

interface ContainerProps { }

const GithubLogo: React.FC<ContainerProps> = () => {
    function loadGithub() {
        window.open('https://github.com/jokerjoker10/uselessunit');
    }
    
    return (
        <IonItem  className="github_logo_frame">
            <IonList>
                <IonLabel><a href="/about">About&Privacy</a></IonLabel>
            </IonList>
            <IonIcon onClick={loadGithub} icon={logoGithub} className="github_logo"></IonIcon>
        </IonItem>
    );
};

export default GithubLogo;
