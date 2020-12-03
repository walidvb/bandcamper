import React from 'react'
import useTracks from '../components/hooks/useSingleTrack';
import TracksTable from '../components/TracksTable';
import EnhancedTrackList from '../components/hooks/EnhancedTrackList';


const initalTracks = [
  { artist: "Hodge", name: "Return To The East" },
  { artist: "Reptant", name: "Freq Accident" },
  { artist: "Konduku", name: "Uzaktaki Isik" },
  { artist: "Robert Fleck", name: "Echo Chamber" },
  { artist: "PlantsArmyRevolver", name: "Borneo Memories" },
  { artist: "Aurora Halal", name: "Eternal Blue (Wata Igarashi remix)" },
  { artist: "ORBE", name: "Deployment Models" },
  { artist: "Anastasia Kristensen", name: "Ak Ok" },
  { artist: "Innerloire Rende", name: "ous" },
  { artist: "Batu_music", name: "Marius" },
  { artist: "Callahan", name: "Kudzu" },
  { artist: "Lucy", name: "Starving The Mind" },
  { artist: "M.E.S.H.", name: "Search Reveal" },
  { artist: "Leftfield", name: "Double Flash (Headstart remix)" },
  { artist: "Architectural", name: "Piedras" },
  { artist: "Broken English Club", name: "Domestic Animals" },
  { artist: "Mark Verbos", name: "Walk The Distance" },
  { artist: "Rob Alcock & Tommy Gillard", name: "Nature (Max Duley ARCform Mix)" },
  { artist: "Rhyw", name: "Biggest Bully" },
  { artist: "Barker (Sam Barker)", name: "Look How Hard I Tried" },
]

export const BUTTON_CLASSES = "py-2 rounded-sm cursor-pointer inline-block px-4 text-uppercase bg-blue-700 text-white font-bold"

export default () => {
  const { tracks, dispatch } = useTracks(initalTracks)
  console.log(tracks)
  return <div className="mx-auto container py-8">
    <h1 className="uppercase text-4xl text-center font-bold ">
      WELCOME TO BANDCAMPER
    </h1>
    <TracksTable tracks={tracks} dispatch={dispatch} />
    <div className="flex justify-end">
      <div 
        className={`${BUTTON_CLASSES} mr-6`} 
        onClick={() => dispatch({ type: 'FETCH_REMAINING', payload: {} })}
      >
        Get Bandcamp Links
      </div>
      <div className="mr-6">
        <EnhancedTrackList tracks={tracks} />
      </div>
      <div className={BUTTON_CLASSES} onClick={() => dispatch({ type: 'CLEAR_LIST', payload: {} })}>
        Clear
      </div>
    </div>
  </div>
}
