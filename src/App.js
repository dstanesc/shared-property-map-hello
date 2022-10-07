import React, { useEffect, useState } from 'react';
import './App.css';
import { initMap } from '@dstanesc/shared-property-map';

function App() {

  const [diceValue, setDiceValue] = useState();

  const [sharedPropertyMap, setSharedPropertyMap] = useState();

  const mapId = window.location.hash.substring(1) || undefined;

  useEffect(() => {
    async function init() {
      const sharedMap = await initMap(
        mapId,
        updateLocalModel,
        updateLocalModel,
        deleteLocalModel
      );
      if (mapId === undefined) {
        window.location.hash = sharedMap.mapId();
        sharedMap.set("keyZero", "abc");
        sharedMap.commit();
      }

      sharedMap.forEach((value, key) => {
        updateLocalModel(key, value)
      });

      setSharedPropertyMap(sharedMap);
    }
    init();
  }, []);

  const updateLocalModel = (key, value) => {
    console.log(`Updating local model ${key} -> ${value}`);
    setDiceValue(value);
  };

  const deleteLocalModel = (key) => {
    console.log(`Deleting local model ${key}`);
  };

  const roll = () => {
    const newValue = Math.floor(Math.random() * 1024) + 1;
    console.log(`Updating remote model ${newValue}`);
    sharedPropertyMap.set("keyOne", newValue.toString());
    sharedPropertyMap.commit();
  };

  return (
    <div className="App">
      <div className="commit" onClick={() => roll()}>
        {diceValue}
      </div>
    </div>
  );
}

export default App;
