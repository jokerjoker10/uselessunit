import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Result.css';
import config from '../config/config.json'
import { useHistory, useLocation } from 'react-router';
import { SessionData } from '../models/SessionData';

const Result: React.FC = () => {
    const history = useHistory();
    const location = useLocation();

    const [metric, setMetric] = useState<Boolean>(true);
    const [value, setValue] = useState<Number>(0);
    const [value_type, setValueType] = useState<String>("");

    const [result_name, setResultName] = useState<String>("");
    const [result_value, setResultValue] = useState<Number>(0);

    const [image_path, setImagePath] = useState<String>("none");
    const [image_credit, setImageCredit] = useState<String>("");


    var session_data: SessionData = {
        value: value,
        value_type: value_type
    }

    const [result, setResult] = useState<String>("")

    function getImage() {
        config.result_types.forEach(element => {
            if (element.name == result_name) {
                setImageCredit(element.img.credit);
                setImagePath(element.img.file);
            }
        })
    }

    function getResultString() {
        var type = "";
        config.value_types.forEach(element => {
            if (element.type == value_type) {
                type = metric ? element.metric : element.imperial;
                if (!metric) {
                    setResult(String(Number(value) * element.in_metric + " " + type + " = " + Number(result_value) * element.in_metric + " " + result_name));
                }
                else {
                    setResult(String(value + " " + type + " = " + result_value + " " + result_name));
                }
            }
        });
    }

    useIonViewDidEnter(() => {
        var _session_data = new URLSearchParams(location.search).get("data") || null;

        if (_session_data != null) {
            var parsed_data: SessionData = JSON.parse(decodeURIComponent(_session_data));

            console.log(parsed_data);

            setValue(parsed_data.value);
            setValueType(parsed_data.value_type);
            setResultName(parsed_data.result_name!);
            setResultValue(parsed_data.result_value!);
        }
    })

    useEffect(() => {
        getResultString();
        getImage();
    })

    function metricToggle() {
        setMetric(!metric)
    }

    return (
        <IonPage>
            <IonToolbar>
                <IonTitle>Useless Unit</IonTitle>
                <IonButtons slot="end">
                    <IonLabel>Imperial</IonLabel>
                    <IonToggle checked={Boolean(metric)} onIonChange={e => { metricToggle(); getResultString(); }}></IonToggle>
                    <IonLabel>Metric</IonLabel>
                </IonButtons>
            </IonToolbar>
                <IonContent fullscreen style={{ "--background": "url('" + image_path + "') no-repeat center center / cover"}}>
                <div className="main_field">
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>
                                {result != "" ? result : "Error no data Available. Click \"Calculate Another\""}
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent></IonCardContent>
                        <IonCardContent>
                            <IonButton expand="block" fill="outline" href="/">
                                Calculate another
                            </IonButton>
                        </IonCardContent>
                    </IonCard>
                </div>
                <p style={{ position: "fixed", bottom: "0px" }}>{image_credit != "" ? "Photo: " + image_credit : ""}</p>

            </IonContent>
        </IonPage>
    );
};

export default Result;
