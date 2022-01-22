import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Result.css';
import config from '../config/data.json'
import { useHistory, useLocation } from 'react-router';
import { Request, Result } from '../models/SessionData';
import calculator from '../util/claculator';
import { logoGithub } from 'ionicons/icons'
import Logo from '../components/logo';
import { url_fun } from '../util/url';
import { CreditModel } from '../models/CreditModel';
import { useMatomo } from '@datapunt/matomo-tracker-react';

const ResultPage: React.FC = () => {
    // Matomo Site Tracking
    const { trackPageView } = useMatomo();
    useEffect(() => {
        trackPageView({
            documentTitle: 'Reusult',
            href: '/res',
            customDimensions: [
                {
                    id: 1,
                    value: metric ? "metric_system" : "imperial_system"
                }
            ]
        })
    }, [])

    const history = useHistory();
    const location = useLocation();

    const [metric, setMetric] = useState<Boolean>(true);

    const [image_path, setImagePath] = useState<String>("none");
    const [image_credit, setImageCredit] = useState<CreditModel | null>();


    const [result_list, setResultList] = useState<Array<Result>>();
    const [current_result, setCurrentResult] = useState<Result>();

    const [result, setResult] = useState<String>("");
    const [request, setRequest] = useState<Request>();

    function setImage() {
        config.result_types.forEach(element => {
            if (element.name == current_result?.name) {
                setImageCredit(element.img.credit == null ? null : {
                    author: element.img.credit.author,
                    photo: element.img.credit.photo,
                    license: element.img.credit.license ?? ""
                });
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

    function roundNumber(n: Number): String {
        if (Number(n) % 1 == 0) {
            return n.toString();
        }
        return n.toFixed(20).match(/^-?\d*\.?0*\d{0,2}/)![0];
    }

    useIonViewDidEnter(() => {
        var _request = new URLSearchParams(location.search).get("request") || null;
        var _metric = new URLSearchParams(location.search).get("metric") || null;

        if (_metric != null) {
            if (_metric == "false") {
                setMetric(false);
            }
            else if (_metric == "true") {
                setMetric(true);
            }
        }

        if (_request != null) {
            var parsed_data: Request = JSON.parse(decodeURIComponent(_request));
            setRequest(parsed_data);

            console.log(parsed_data);
            var _result_list: Array<Result> = calculator.getResultList(parsed_data);
            setResultList(_result_list);


            var current_result_set = false;
            _result_list.forEach(element => {
                if (element.name == parsed_data.result_name) {
                    setCurrentResult(element);
                    current_result_set = true;
                }
            });

            console.log(_result_list)
            var rand_result: Result = _result_list[Math.floor(Math.random() * _result_list.length)];
            if (!current_result_set) {
                console.log(rand_result);
                setCurrentResult(rand_result);
            }
        }
        else {
            // no Request. return to home
            window.location.href = "/";
        }
    })

    useEffect(() => {
        getResultString();
        setImage();
    });

    function metricToggle() {
        var _metric = !metric;
        setMetric(_metric);
        var _request: Request = { value_type: String(request?.value_type), value: Number(request?.value), result_name: request?.result_name }
        history.push({ pathname: location.pathname, search: String(url_fun.getQuerryString({ request: JSON.stringify(_request), metric: _metric })) });
    }

    function nextResult() {
        var new_result: Result;
        if (result_list?.indexOf(current_result!) == result_list?.length! - 1) {
            new_result = result_list[0];
        }
        else {
            new_result = result_list![result_list?.indexOf(current_result!)! + 1];
        }
        setCurrentResult(new_result);
        var _request: Request = { value_type: String(request?.value_type), value: Number(request?.value), result_name: new_result?.name }
        setRequest(_request);
        history.push({ pathname: "/res", search: String(url_fun.getQuerryString({ request: JSON.stringify(_request), metric: metric })) });

        setImage();
    }

    function prevResult() {
        var new_result: Result;

        if (result_list?.indexOf(current_result!) == 0) {
            new_result = result_list[result_list.length - 1];
        }
        else {
            new_result = result_list![result_list?.indexOf(current_result!)! - 1];
        }
        setCurrentResult(new_result);
        var _request: Request = { value_type: String(request?.value_type), value: Number(request?.value), result_name: new_result?.name }
        setRequest(_request);
        history.push({ pathname: "/res", search: String(url_fun.getQuerryString({ request: JSON.stringify(_request), metric: metric })) });

        setImage();
    }

    return (
        <IonPage>
            <IonToolbar>
                <Logo></Logo>
                <IonTitle slot="start">Useless Unit</IonTitle>
                <IonButtons slot="end">
                    <IonLabel>Imperial</IonLabel>
                    <IonToggle checked={Boolean(metric)} onIonChange={e => { metricToggle(); getResultString(); }}></IonToggle>
                    <IonLabel>Metric</IonLabel>
                </IonButtons>
            </IonToolbar>
            <IonContent fullscreen style={{ "--background": "url('" + image_path + "') no-repeat center center / cover" }}>
                <div className="main_field">
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>
                                {result != "" ? result : ""}
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent></IonCardContent>
                        <IonCardContent style={{ display: "flex", justifyContent: "center" }}>
                            <IonButton fill="outline" slot='start' onClick={e => { prevResult() }}>{"<"}</IonButton>
                            <IonButton fill="outline" slot='end' onClick={e => { nextResult() }}>{">"}</IonButton>
                        </IonCardContent>
                        <IonCardContent>
                            <IonButton expand="block" fill="outline" onClick={e => history.push({ pathname: "/", search: String(url_fun.getQuerryString({ metric: metric })) })}>
                                Calculate another
                            </IonButton>
                        </IonCardContent>
                        {
                            image_credit == null ? <></> :
                                <>
                                    <IonCardContent>
                                        <IonAccordionGroup>
                                            <IonAccordion>
                                                <IonItem slot='header'>
                                                    <IonLabel>Image Credit</IonLabel>
                                                </IonItem>
                                                <IonItem slot='content'>
                                                    <p>Author: {image_credit.author}</p>
                                                </IonItem>
                                                <IonItem slot='content'>
                                                    <p>Photo:<a href={String(image_credit.photo)}> {image_credit.photo}</a></p>
                                                </IonItem>
                                                <IonItem slot='content'>
                                                    <p>License:<a href={String(image_credit.license)}> {image_credit.license}</a></p>
                                                </IonItem>
                                            </IonAccordion>
                                        </IonAccordionGroup>
                                    </IonCardContent>
                                </>
                        }
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ResultPage;
