import React, { useEffect } from "react";
import {
  Players,
  start as toneStart,
  context as toneContext,
  loaded as toneLoaded,
} from "tone";
import "./App.css";
import { useMount } from "./hooks/useMount";
import Key from "./Key/Key";

class Instruments {
  instruments = [
    { key: "A", keyCode: 65, label: "clap" },
    { key: "S", keyCode: 83, label: "hihat" },
    { key: "D", keyCode: 68, label: "kick" },
    { key: "F", keyCode: 70, label: "openhat" },
    { key: "G", keyCode: 71, label: "boom" },
    { key: "H", keyCode: 72, label: "ride" },
    { key: "J", keyCode: 74, label: "snare" },
    { key: "K", keyCode: 75, label: "tom" },
    { key: "L", keyCode: 76, label: "tink" },
  ];
  players: Players | undefined = undefined;

  load(callback?: () => void): void {
    this.players = new Players(
      this.instruments.reduce((acc, instrument) => {
        return {
          ...acc,
          [instrument.key]: `./sound/${instrument.label}.mp3`,
        };
      }, {}),
      (): void => {
        this.players?.toDestination();
        callback && callback();
      }
    );
  }

  play(instrument: string): void {
    const found = this.instruments.find(
      (needle): boolean => `${needle.keyCode}` === instrument
    );
    if (found) {
      if (this.players?.has(found.key)) {
        this.players?.player(found.key).start();
      }
    }
  }

  get loaded(): boolean {
    return this.players?.loaded || false;
  }
}

const App: React.FC = (): JSX.Element => {
  console.log("App");
  const [initiated, setInitiated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const players = React.useRef<Instruments>(new Instruments());

  toneLoaded()
    .then((): void => {
      console.log("Tone.loaded", players.current.loaded);
    })
    .catch((reason): void => {
      console.error(reason);
    });

  useEffect((): void => {
    if (initiated) {
      players.current.load((): void => {
        setLoading(false);
      });
    }
  }, [initiated, players]);

  const downHandler = (e: KeyboardEvent): void => {
    players.current.play(`${e.which}`);
  };
  // const upHandler = (e: KeyboardEvent): void => {};
  useMount((): (() => void) => {
    window.addEventListener("keydown", downHandler);
    // window.addEventListener('keyup', upHandler);
    return (): void => {
      window.removeEventListener("keydown", downHandler);
      // window.removeEventListener('keyup', upHandler);
    };
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>Drum Kit</p>
      </header>

      <section className="App-section">
        <div className="keys">
          <button
            onClick={() => {
              console.log("players.loaded", players.current.loaded);
            }}
          >
            Tap to start
          </button>
          {loading && <p>LOADING...</p>}
          {!loading &&
            initiated &&
            players.current.instruments.map(
              ({ key, keyCode, label }): JSX.Element => (
                <Key
                  key={keyCode}
                  keyCode={keyCode}
                  label={label}
                  onClick={(): void => {
                    players.current.play(key);
                  }}
                />
              )
            )}
          {!initiated && (
            <button
              className="tap-to-start"
              onClick={async () => {
                await toneStart();
                toneContext.resume();
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
