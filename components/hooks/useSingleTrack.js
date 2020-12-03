
import { useReducer, useState } from 'react';

const routes = {
  bandcamp: '/api/bandcamper'
}

// const updateIFromState = (cb) => state.map((t, i) => i === idx ? cb(t) : t)

const reducer = (state, { type, payload }) => {
  const { idx, ...track } = payload
  switch(type){
    case 'FETCH_REMAINING':
      return state.map((t) => ({ ...t, fetchRequested: !t.url }))
    case 'BANDCAMP_NOT_FOUND':
      return state.map((t, i) => i === idx ? { ...t, fetchRequested: false, } : t)
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