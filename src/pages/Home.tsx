import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import './Home.css';
import config from '../config/data.json'
import { useHistory, useLocation } from 'react-router';
import { Request } from '../models/SessionData';

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
    if(!request.value && !request.value_type){
      setMissingValue(true);
      setMissingType(true);
      return;
    }
    if(!request.value){
      setMissingValue(true);
      return;
    }
    if(!request.value_type){
      setMissingType(true);
      return;
    }
    history.push({ pathname: "/res", search: "request=" + encodeURIComponent(JSON.stringify(request)) });
  }

  function metricToggle() {
    setMetric(!metric)
  }

  return (
    <IonPage>
      <IonToolbar>
        <IonTitle>Useless Unit</IonTitle>
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
                  <IonInput slot="start" type="number" onIonChange={e => setValue(Number(e.detail.value))} value={Number(value)}></IonInput>
                </IonItem>
                <IonItem color={missing_type ? "danger" : ""}>
                  <IonSelect interface="popover" slot="end" placeholder="Unit" onIonChange={e => { setValueType(e.detail.value) }} value={value_type}>
                    {config.value_types.map((option, index) => (
                      <IonSelectOption key={index} value={option.type}>{metric ? option.metric : option.imperial}</IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonItem>
              <IonButton expand="block" onClick={e => {_calculate() }} type="submit">
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
