import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { useState } from 'react';
import './Home.css';
import config from '../config/data.json'
import { useHistory, useLocation } from 'react-router';
import { Request } from '../models/SessionData';
import Logo from '../components/logo';
import { url_fun } from '../util/url';

const Home: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [metric, setMetric] = useState<Boolean>(true);
  const [value, setValue] = useState<Number>(0);
  const [value_type, setValueType] = useState<String>("");

  var request: Request = {
    value: value,
    value_type: value_type
  }

  const [missing_value, setMissingValue] = useState<Boolean>(false);
  const [missing_type, setMissingType] = useState<Boolean>(false);

  function _calculate() {
    if (!request.value && !request.value_type) {
      setMissingValue(true);
      setMissingType(true);
      return;
    }
    if (!request.value) {
      setMissingValue(true);
      return;
    }
    if (!request.value_type) {
      setMissingType(true);
      return;
    }
    history.push({pathname: "/res", search: String(url_fun.getQuerryString({request: JSON.stringify(request), metric: metric}))});
  }

  function metricToggle() {
    var _metric = !metric;
    setMetric(_metric);
  }

  useIonViewDidEnter(() => {
    var _metric = new URLSearchParams(location.search).get("metric") || null;
    console.log(_metric)
    if(_metric != null){
        if(_metric == "false") {
            setMetric(false);
        }
        else if(_metric == "true") {
            setMetric(true);
        }
    }
  })

  return (
    <IonPage>
      <IonToolbar>
      <Logo></Logo>
        <IonTitle slot="start">Useless Unit</IonTitle>
        <IonButtons slot="end">
          <IonLabel>Imperial</IonLabel>
          <IonToggle checked={Boolean(metric)} onIonChange={e => { metricToggle(); }}></IonToggle>
          <IonLabel>Metric</IonLabel>
        </IonButtons>
      </IonToolbar>
      <IonContent fullscreen>
        <div className="main_field">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                Useless Units
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonItem color={missing_value ? "danger" : ""}>
                  <IonInput type="number" onIonChange={e => setValue(Number(e.detail.value))} value={Number(value)}></IonInput>
                </IonItem>
                <IonItem color={missing_type ? "danger" : ""}>
                  <IonSelect interface="popover" placeholder="Unit" onIonChange={e => { setValueType(e.detail.value) }} value={value_type}>
                    {config.value_types.map((option, index) => (
                      <IonSelectOption key={index} value={option.type}>{metric ? option.metric : option.imperial}</IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonItem>
              <IonButton expand="block" onClick={e => { _calculate() }} type="submit">
                Calculate
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
