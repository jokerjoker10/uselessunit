import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Logo from '../../components/logo';
import './about.css';
import { logoDocker, logoGithub, logoIonic, logoTwitter, mailOutline } from 'ionicons/icons';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useEffect } from 'react';
import config from '../../config/config.json';

const About: React.FC = () => {
    // Matomo Site Tracking
    const { trackPageView } = useMatomo();
    useEffect(() => {
        trackPageView({
            documentTitle: 'Reusult',
            href: '/res'
        })
    }, [])

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
                            <IonTitle color="primary">Disclaimer</IonTitle>
                            All information on this website/app is provided without guarantee!
                        </IonCardContent>
                        {
                            !config.matomo.use_matomo ? <></> : 
                            <>
                                <IonCardContent>
                                    <IonTitle color="primary">Tracking</IonTitle>
                                    This website/app uses Matomo Tracking. Matomo is configured to don't use cookies. You can opt out of tracking here:
                                    
                                    <IonCard style={{ backgroundColor: "#1e1e1e"}}>
                                        <iframe
                                        style={{border: 0, width: "100%"}}
                                        src={config.matomo.matomo_url + "index.php?module=CoreAdminHome&action=optOut&language=en&backgroundColor=1e1e1e&fontColor=949494&fontSize=14px&fontFamily=sans-serif"}
                                        ></iframe>
                                    </IonCard>

                                </IonCardContent>
                            </>  
                        }
                        <IonCardContent>

                            <IonTitle color="primary">Contact</IonTitle>
                            <IonButton onClick={e => openMail()}><IonIcon icon={mailOutline}></IonIcon>Contact per E-Mail</IonButton>
                            <IonButton onClick={e => openGithub()}><IonIcon icon={logoGithub}></IonIcon>Create an Issue on GitHub</IonButton>
                        </IonCardContent>

                        <IonCardContent>

                            <IonTitle color="primary">Developers</IonTitle>
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

                            <IonTitle color="primary">Used Tech</IonTitle>
                            <IonList>
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
