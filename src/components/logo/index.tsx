import { IonIcon, IonImg, IonItem } from '@ionic/react';
import { logoGithub } from 'ionicons/icons';
import './style.css';

interface ContainerProps { }

const Logo: React.FC<ContainerProps> = () => {
    return (
        <IonImg className="logo" slot="start" src="assets/icon/favicon.png"></IonImg>
    );
};

export default Logo;
