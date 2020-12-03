import React from 'react'
import TrackRow from '../components/TrackRow';

export default ({ tracks, dispatch}) => {
  return <div className="mx-auto container py-8">
    <table className="w-full text-blue-800">
      <thead>
        <tr>
          <td className="pb-4 font-bold"></td>
          <td className="pb-4 font-bold">Artist</td>
          <td className="pb-4 font-bold">Track</td>
          <td className="pb-4 font-bold">Link</td>
        </tr>
      </thead>
      <tbody>
        {tracks.map((t, i) => <TrackRow idx={i} key={t.name} dispatch={dispatch} {...t} />)}
      </tbody>
    </table>
  </div>
}
