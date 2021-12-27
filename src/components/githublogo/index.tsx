import { IonIcon, IonItem } from '@ionic/react';
import { logoGithub } from 'ionicons/icons';
import './style.css';

interface ContainerProps { }

const GithubLogo: React.FC<ContainerProps> = () => {
    function loadGithub() {
        window.open('https://github.com/jokerjoker10/uselessunit');
    }

    return (
        <IonItem button onClick={loadGithub} className="github_logo_frame">
            <IonIcon icon={logoGithub} className="github_logo"></IonIcon>
        </IonItem>
    );
};

export default GithubLogo;
