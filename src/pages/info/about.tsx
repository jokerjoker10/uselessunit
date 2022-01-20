import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import Logo from '../../components/logo';
import './about.css';
import { logoDocker, logoGithub, logoIonic, logoReact, logoTwitter, mailOutline } from 'ionicons/icons';

const About: React.FC = () => {

    function openMail() {
        window.open("mailto:uselessunit@jokerjoker10.cloud");
    }
  
    function openGithub() {
        window.open("https://github.com/jokerjoker10/uselessunit/issues");
    }
    return (
        <IonPage>
            <IonToolbar>
                <Logo></Logo>
                <IonButtons slot="start">
                    <IonBackButton defaultHref='/'></IonBackButton>
                </IonButtons>
                <IonTitle slot="start">Useless Unit</IonTitle>
            </IonToolbar>
            <IonContent fullscreen>
                <div className="card_wrapper">
                    <IonCard className="card">
                        <IonCardHeader>
                            <IonCardTitle color="primary">
                                About
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            All information on this website/app is provided without guarantee!
                        </IonCardContent>
                        <IonCardContent>
                            This website/app is open Source Software. You can find the GitHub repo here: https://github.com/jokerjoker10/uselessunit.
                        </IonCardContent>
                        <IonCardContent>
                            This website/app uses Matomo Tracking for website usage analysis. Matomo is configured to don't use cookies. The data about you is anonymised and will be deleted after 30 days. 
                        </IonCardContent>
                        <IonCardContent>
                            <IonButton onClick={e => openMail()}><IonIcon icon={mailOutline}></IonIcon>Contact per E-Mail</IonButton>
                            <IonButton onClick={e => openGithub()}><IonIcon icon={logoGithub}></IonIcon>Create an Issue on GitHub</IonButton>
                        </IonCardContent>

                        <IonCardContent>
                            <IonList>
                                <IonListHeader>Developers:</IonListHeader>
                            </IonList>
                            <IonItem>
                                <IonLabel>jokerjoker10<p>Development</p></IonLabel>
                                <IonItem lines="none">
                                    <IonList>
                                        
                                        <IonItem lines="none">
                                            <IonIcon icon={logoTwitter} slot='start'></IonIcon>
                                            <IonLabel><a href="https://twitter.com/jokerjoker_10">jokerjoker_10</a></IonLabel>
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonIcon icon={logoGithub} slot='start'></IonIcon>
                                            <IonLabel><a href="https://github.com/jokerjoker10">jokerjoker10</a></IonLabel>
                                        </IonItem>

                                    </IonList>
                                </IonItem>
                            </IonItem>
                            <IonItem>
                                <IonLabel>LordTheoThor<p>Data Research</p></IonLabel>
                            </IonItem>
                        </IonCardContent>

                        <IonCardContent>
                            <IonList>
                                <IonListHeader>Used Tech:</IonListHeader>
                                <IonItem>
                                    <IonIcon icon={logoIonic} slot='start'></IonIcon>
                                    <IonLabel>Ionic - React<p>Frontend Framework</p></IonLabel>
                                </IonItem>

                                <IonItem>
                                    <IonIcon slot='start'></IonIcon>
                                    <IonLabel>Matomo<p>Tracking</p></IonLabel>
                                </IonItem>

                                <IonItem>
                                    <IonIcon icon={logoDocker} slot='start'></IonIcon>
                                    <IonLabel>Docker<p>Container Engine</p></IonLabel>
                                </IonItem>

                                <IonItem>
                                    <IonIcon icon={logoGithub} slot='start'></IonIcon>
                                    <IonLabel>GitHub<p>Code Management</p></IonLabel>
                                </IonItem>
                            </IonList>

                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default About;
