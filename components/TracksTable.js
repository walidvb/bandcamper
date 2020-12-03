import React, { useState } from 'react'
import TrackRow from '../components/TrackRow';

const TrackNew = ({ dispatch }) => {
  const [track, setTrack] = useState({})

  const onChange = ({ target: { value, name } }) => setTrack({
    ...track,
    [name]: value
  })

  const onAdd = () => {
    dispatch({
      type: 'ADD_TRACK',
      payload: { track, fetchRequested: true }
    })
    setTrack({})
  }
  const cellClasses = "pb-2 pr-2"
  return (
    <tr className="">
      <td className={cellClasses}>

      </td>
      <td className={cellClasses}>
        <input onChange={onChange} name="artist" className="w-full px-2 py-1 rounded-sm bg-blue-100" type="text" value={track.artist || ''} />
      </td>
      <td className={cellClasses}>
        <input onChange={onChange} name="name" className="w-full px-2 py-1 rounded-sm bg-blue-100" type="text" value={track.name || ''} />
      </td>
      <td className={cellClasses}>
        <input type="submit" onClick={onAdd} className="w-full px-2 py-1 rounded-sm bg-blue-100 text-center border border-blue-500 border-dashed cursor-pointer" value="+ Add Track" />
      </td>
      <td className={cellClasses}>

      </td>
    </tr>
  )
}

export default ({ tracks, dispatch}) => {
  return <div className="mx-auto container py-8">
    <table className="w-full text-blue-800 text-center">
      <thead>
        <tr>
          <td className="pb-4 font-bold"></td>
          <td className="pb-4 font-bold">Artist</td>
          <td className="pb-4 font-bold">Track</td>
          <td className="pb-4 font-bold">Link</td>
        </tr>
      </thead>
      <tbody>
        {tracks.map((t, i) => <TrackRow idx={i} key={i} dispatch={dispatch} track={t} />)}
        <TrackNew dispatch={dispatch} />
      </tbody>
    </table>
  </div>
}
