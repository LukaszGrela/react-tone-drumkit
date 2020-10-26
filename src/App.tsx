import React from 'react';
import './App.css';
import Key from './Key/Key';

const App: React.FC = (): JSX.Element => {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>Drum Kit</p>
      </header>
      <section className='App-section'>
        <div className='keys'>
          {/* A */}
          <Key keyCode={65} label={'clap'}></Key>
          {/* S */}
          <Key keyCode={83} label={'hihat'}></Key>
          {/* D */}
          <Key keyCode={68} label={'kick'}></Key>
          {/* F */}
          <Key keyCode={70} label={'openhat'}></Key>
          {/* G */}
          <Key keyCode={71} label={'boom'}></Key>
          {/* H */}
          <Key keyCode={72} label={'ride'}></Key>
          {/* J */}
          <Key keyCode={74} label={'snare'}></Key>
          {/* K */}
          <Key keyCode={75} label={'tom'}></Key>
          {/* L */}
          <Key keyCode={76} label={'tink'}></Key>
        </div>
      </section>
    </div>
  );
};

export default App;
