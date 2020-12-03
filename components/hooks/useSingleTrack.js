
import { useReducer, useState } from 'react';

const routes = {
  bandcamp: '/api/bandcamper'
}


const reducer = (state, { type, payload }) => {
  const { idx, ...track } = payload
  const updateIFromState = (cb) => state.map((t, i) => i === idx ? cb(t) : t)
  console.log(track)
  switch(type){
    case 'BANDCAMP_FOUND':
      return state.map((t, i) => i === idx ? track : t)
    default:
      return state
  }
}

const useTracks = (srcTracks) => {
  const [tracks, dispatch] = useReducer(reducer, srcTracks)

  return {
    tracks,
    dispatch,
  }
}

export default useTracks