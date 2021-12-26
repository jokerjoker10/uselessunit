import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Result.css';
import config from '../config/data.json'
import { useHistory, useLocation } from 'react-router';
import { Request, Result } from '../models/SessionData';
import calculator from '../util/claculator';

const ResultPage: React.FC = () => {
    const history = useHistory();
    const location = useLocation();

    const [metric, setMetric] = useState<Boolean>(true);

    const [image_path, setImagePath] = useState<String>("none");
    const [image_credit, setImageCredit] = useState<String>("");

    
    const [result_list, setResultList] = useState<Array<Result>>();
    const [current_result, setCurrentResult] = useState<Result>();

    const [result, setResult] = useState<String>("");
    const [request, setRequest] = useState<Request>();

    function setImage() {
        config.result_types.forEach(element => {
            if (element.name == current_result?.name) {
                setImageCredit(element.img.credit);
                setImagePath(element.img.file);
            }
        })
    }

    function getResultString() {
        var type = "";
        config.value_types.forEach(element => {
            if (element.type == current_result?.value_type) {
                type = metric ? element.metric : element.imperial;
                if (!metric) {
                    setResult(String(Number(request?.value) * element.in_metric + " " + type + " = " + roundNumber(Number(current_result.result) * element.in_metric) + " " + current_result.name));
                }
                else {
                    setResult(String(request?.value + " " + type + " = " + roundNumber(current_result.result) + " " + current_result.name));
                }
            }
        });
    }

    function roundNumber(n: Number): String{
        if(Number(n) % 1 == 0){
            return n.toString();
        }
        return n.toFixed(20).match(/^-?\d*\.?0*\d{0,2}/)![0];
    }

    useIonViewDidEnter(() => {
        var _request = new URLSearchParams(location.search).get("request") || null;

        if (_request != null) {
            var parsed_data: Request = JSON.parse(decodeURIComponent(_request));
            setRequest(parsed_data);

            console.log(parsed_data);
            var _result_list: Array<Result> = calculator.getResultList(parsed_data);
            setResultList(_result_list);
            

            var current_result_set = false;
            _result_list.forEach(element => {
                if(element.name == parsed_data.result_name){
                    setCurrentResult(element);
                    current_result_set = true;
                }
            });
            
            console.log(_result_list)
            var rand_result: Result = _result_list[Math.floor(Math.random()*_result_list.length)];
            if(!current_result_set){
                console.log(rand_result);
                setCurrentResult(rand_result);
            }
        }
        else{
            // no Request. return to home
            window.location.href = "/";
        }
    })

    useEffect(() => {
        getResultString();
        setImage();
    })

    function metricToggle() {
        setMetric(!metric)
    }

    function nextResult(){
        var new_result: Result;
        if(result_list?.indexOf(current_result!) == result_list?.length! - 1){
            new_result = result_list[0];
        }
        else{
            new_result = result_list![result_list?.indexOf(current_result!)! + 1];
        }
        setCurrentResult(new_result);
        var _request: Request = {value_type: String(request?.value_type), value: Number(request?.value), result_name: new_result?.name}
        setRequest(_request);
        history.push({ pathname: "/res", search: "request=" + encodeURIComponent(JSON.stringify(_request))});

        setImage();
    }

    function prevResult(){
        var new_result: Result;

        if(result_list?.indexOf(current_result!) == 0){
            new_result = result_list[result_list.length - 1];
        }
        else{
            new_result = result_list![result_list?.indexOf(current_result!)! - 1];
        }
        setCurrentResult(new_result);
        var _request: Request = {value_type: String(request?.value_type), value: Number(request?.value), result_name: new_result?.name}
        setRequest(_request);
        history.push({ pathname: "/res", search: "request=" + encodeURIComponent(JSON.stringify(_request))});

        setImage();
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
                                {result != "" ? result : ""}
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent></IonCardContent>
                        <IonCardContent style={{display: "flex", justifyContent: "center"}}>
                            <IonButton fill="outline" slot='start' onClick={e => {prevResult()}}>{"<"}</IonButton>
                            <IonButton fill="outline" slot='end' onClick={e => {nextResult()}}>{">"}</IonButton>
                        </IonCardContent>
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

export default ResultPage;
