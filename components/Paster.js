import React, { useState } from 'react';
import { BUTTON_CLASSES } from '../pages/index';

const initVal = "Patten - Rorsach [Patten]\n" +
"Beatrice Dillon - Workaround 8[PAN]\n" +
"Es.Tereo & Felix K - Faces[Hidden Hawai]\n" +
"Azu Tiwaline - Red Viper[IOT]\n" +
"FFT - Fask[BRUK]\n" +
"DYL & DB1 - ECOU#11[Relation Reset]\n" +
"Forest Drive West - Curved Path\n" +
"Galcid - Scheme & Impatience[Peder Mannerfelt]\n" +
"Mike Parker - The Demon's Platform [Spazio Disponibile]\n" +
"Black Merlin - PK 9[Bitta]\n" +
"Cool Tiger - Hide & Seek(AQXDM Remix)[Junction]\n" +
"Zora Jones - Low Orbit Cannon[Fractal Fantasy]\n" +
"Pearson Sounds - Cobwebs[Hessle]\n" +
"Lurka - Ssppeedd[TimeDance]\n" +
"DJ Donini - Donini's Dream [Planete Euphorique]\n" +
"Vladimir Dubyshkin - Amphetamine Freak[Trip]\n" +
"Under Black Helmet - Direct Collapse[KRLF]\n" +
"Gooooose - Arp Kicks[SVBKVLT]\n" +
"Osheyack & Nahash - Hold Pattern[SVBKVLT]\n" +
"Tescam + - Aue(Dat Booty Bad Elektro)[Syberia]\n" +
"Peder Mannerfelt - A Queen[Voam]\n" +
"IVVVO Feat.Maxwell Sterling - Last Days[Halcyon Veil]"

const regexp = /^(?<artist>[^-]*) - ?(?<name>[^\(\[]*)\s*?(?:\((?<version>[^\)]*))?\s*(?:\[(?<label>[^\]]*))?/

function Paster({ dispatch, onNext }) {
  const [raw, setRaw] = useState(initVal)
  const onChange = ({ target: { value } }) => setRaw(value)

  const convert = () => {
    const entries = raw.split('\n')
    const tracks = entries.map((entry) => {
      const track = regexp.exec(entry).groups
      return track
    })
    console.table(tracks)
    dispatch({ type: 'PARSED_TRACKLIST', payload: tracks })
    onNext()
  }
  return (
    <div className="mx-auto container h-screen py-8 flex flex-col">
      <textarea onChange={onChange} className="w-full flex-grow" value={raw} />
      <input type="submit" className={BUTTON_CLASSES} value="convert" onClick={convert}/>
    </div>
  );
}

export default Paster;