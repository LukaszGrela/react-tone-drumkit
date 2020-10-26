import React from 'react';
import { Players, start as toneStart } from 'tone';
import './App.css';
import Key from './Key/Key';

const instruments = [
  { key: 'A', keyCode: 65, label: 'clap' },
  { key: 'S', keyCode: 83, label: 'hihat' },
  { key: 'D', keyCode: 68, label: 'kick' },
  { key: 'F', keyCode: 70, label: 'openhat' },
  { key: 'G', keyCode: 71, label: 'boom' },
  { key: 'H', keyCode: 72, label: 'ride' },
  { key: 'J', keyCode: 74, label: 'snare' },
  { key: 'K', keyCode: 75, label: 'tom' },
  { key: 'L', keyCode: 76, label: 'tink' },
];

const App: React.FC = (): JSX.Element => {
  const [initiated, setInitiated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const players = new Players(
    instruments.reduce((acc, instrument) => {
      return {
        ...acc,
        [instrument.key]: `./sound/${instrument.label}.mp3`,
      };
    }, {}),
    (): void => {
      setLoading(false);
      players.toDestination();
    }
  );
  const downHandler = (e: KeyboardEvent): void => {
    const instrument = instruments.find(
      (needle): boolean => needle.keyCode === e.which
    );
    if (instrument) {
      if (players.has(instrument.key)) {
        players.player(instrument.key).start();
      }
    }
  };
  // const upHandler = (e: KeyboardEvent): void => {};
  React.useEffect((): (() => void) => {
    window.addEventListener('keydown', downHandler);
    // window.addEventListener('keyup', upHandler);
    return (): void => {
      window.removeEventListener('keydown', downHandler);
      // window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <p>Drum Kit</p>
      </header>

      <section className='App-section'>
        <div className='keys'>
          {loading && <p>LOADING...</p>}
          {!loading &&
            initiated &&
            instruments.map(
              ({ key, keyCode, label }): JSX.Element => (
                <Key
                  key={keyCode}
                  keyCode={keyCode}
                  label={label}
                  onClick={(): void => {
                    if (players.has(key)) {
                      players.player(key).start();
                    }
                  }}
                />
              )
            )}
          {!loading && !initiated && (
            <button
              className='tap-to-start'
              onClick={async () => {
                await toneStart();
                setInitiated(true);
              }}
            >
              Tap to start
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default App;
