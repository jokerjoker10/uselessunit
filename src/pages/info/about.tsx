import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import config from '../../config/data.json'
import Logo from '../../components/logo';
import './about.css';
import { logoDocker, logoGithub, logoIonic, logoReact, logoTwitter, mailOutline } from 'ionicons/icons';

const About: React.FC = () => {
    function openMail(){
        window.open("mailto:uselessunit@jokerjoker10.cloud");
    }
    function openGithub(){
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
                            This App is Open Source Software. You can find the GitHub Repo here: https://github.com/jokerjoker10/uselessunit.
                        </IonCardContent>
                        <IonCardContent>
                            This Website is currently hosted in Germany and uses Matomo for tracking the website usage.
                        </IonCardContent>
                        <IonCardContent>
                            <IonButton onClick={e => openMail()}><IonIcon icon={mailOutline}></IonIcon>Contact per E-Mail</IonButton>
                            <IonButton onClick={e => openGithub()}><IonIcon icon={logoGithub}></IonIcon>Create an Issue on GitHub</IonButton>
                        </IonCardContent>
                        <IonCardContent>
                            <IonList>
                                <IonListHeader>Developers:</IonListHeader>
                                
                                <IonItem>
                                    <IonLabel>jokerjoker10<p>Developer</p></IonLabel>
                                    <IonItem>
                                        <IonIcon icon={logoTwitter}></IonIcon>
                                        <IonLabel><a href='https://twitter.com/jokerjoker_10'>@jokerjoker_10</a></IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonIcon icon={logoGithub}></IonIcon>
                                        <IonLabel><a href='https://github.com/jokerjoker10'>jokerjoker10</a></IonLabel>
                                    </IonItem>
                                </IonItem>

                                <IonItem>
                                    <IonLabel>LordTheoThor<p>Data Research</p></IonLabel>
                                </IonItem>

                            </IonList>
                        </IonCardContent>
                        <IonCardContent>
                            <IonList>
                                <IonListHeader>Used Tech:</IonListHeader>
                                <IonItem>
                                    <IonIcon icon={logoIonic} slot='start'></IonIcon>
                                    <IonLabel><p>Ionic</p></IonLabel>
                                </IonItem>

                                <IonItem>
                                    <IonIcon icon={logoReact} slot='start'></IonIcon>
                                    <IonLabel><p>React</p></IonLabel>
                                </IonItem>

                                <IonItem>
                                    <IonIcon slot='start'></IonIcon>
                                    <IonLabel><p>Matomo</p></IonLabel>
                                </IonItem>

                                <IonItem>
                                    <IonIcon icon={logoDocker} slot='start'></IonIcon>
                                    <IonLabel><p>Docker</p></IonLabel>
                                </IonItem>

                                <IonItem>
                                    <IonIcon icon={logoGithub} slot='start'></IonIcon>
                                    <IonLabel><p>GitHub</p></IonLabel>
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
