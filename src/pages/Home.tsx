import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Home.css';
import config from '../config/data.json'
import { useHistory, useLocation } from 'react-router';
import { SessionData } from '../models/SessionData';
import calculator from '../util/claculator';

const Home: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [metric, setMetric] = useState<Boolean>(true);
  const [value, setValue] = useState<Number>(0);
  const [value_type, setValueType] = useState<String>("");

  var session_data: SessionData = {
    value: value,
    value_type: value_type
  }

  const [missing_value, setMissingValue] = useState<Boolean>(false);
  const [missing_type, setMissingType] = useState<Boolean>(false); 

  function _calculate() {
    if(!session_data.value && !session_data.value_type){
      setMissingValue(true);
      setMissingType(true);
      return;
    }
    if(!session_data.value){
      setMissingValue(true);
      return;
    }
    if(!session_data.value_type){
      setMissingType(true);
      return;
    }
    var _session_data = calculator.calulate(session_data);
    console.log(_session_data)

    session_data = _session_data;
    history.push({ pathname: "/res", search: "data=" + encodeURIComponent(JSON.stringify(session_data)) });
  }

  useIonViewDidEnter(() => {
    var _session_data = new URLSearchParams(location.search).get("data") || null;

    if (_session_data != null) {
      var parsed_data: SessionData = JSON.parse(decodeURIComponent(_session_data));
      console.log(parsed_data)

      setValue(parsed_data.value);
      setValueType(parsed_data.value_type);
    }
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
