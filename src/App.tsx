import React from 'react';
import { Players } from 'tone';
import './App.css';
import Key from './Key/Key';

const instruments = [
  /* A */ { keyCode: 65, label: 'clap' },
  /* S */ { keyCode: 83, label: 'hihat' },
  /* D */ { keyCode: 68, label: 'kick' },
  /* F */ { keyCode: 70, label: 'openhat' },
  /* G */ { keyCode: 71, label: 'boom' },
  /* H */ { keyCode: 72, label: 'ride' },
  /* J */ { keyCode: 74, label: 'snare' },
  /* K */ { keyCode: 75, label: 'tom' },
  /* L */ { keyCode: 76, label: 'tink' },
];

const App: React.FC = (): JSX.Element => {
  const [loading, setLoading] = React.useState(true);
  const players = new Players(
    instruments.reduce((acc, instrument) => {
      return {
        ...acc,
        [String.fromCharCode(
          instrument.keyCode
        )]: `./sound/${instrument.label}.mp3`,
      };
    }, {}),
    (): void => {
      setLoading(false);
      players.toDestination()
    }
  );
  return (
    <div className='App'>
      <header className='App-header'>
        <p>Drum Kit</p>
      </header>

      <section className='App-section'>
        <div className='keys'>
          {loading && <p>LOADING...</p>}
          {!loading &&
            instruments.map(
              (instrument): JSX.Element => (
                <Key
                  key={instrument.keyCode}
                  keyCode={instrument.keyCode}
                  label={instrument.label}
                  onClick={(): void => {
                    const sound = String.fromCharCode(
                      instrument.keyCode
                    );
                    if(players.has(sound)) {
                      players.player(sound).start()
                    }
                  }}
                />
              )
            )}
        </div>
      </section>
    </div>
  );
};

export default App;
