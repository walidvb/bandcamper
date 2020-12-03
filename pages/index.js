import React from 'react'
import useTracks from '../components/hooks/useSingleTrack';
import TrackRow from '../components/TrackRow';
import TracksTable from '../components/TracksTable';


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

export default () => {
  const { tracks, dispatch } = useTracks(initalTracks)

  return <div className="mx-auto container py-8">
    <TracksTable tracks={tracks} dispatch={dispatch} />
    <div>
      <div 
        className="py-2 cursor-pointer inline-block px-4 text-uppercase bg-blue-700 text-white font-bold" 
        onClick={() => dispatch({ type: 'FETCH_REMAINING', payload: {} })}
      >
        Get Bandcamp Links
      </div>
    </div>
  </div>
}
