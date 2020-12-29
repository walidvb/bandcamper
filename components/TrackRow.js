import Axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import BandcampUrlInput from './BandcampURLInput';

const TrackRow = (props) => {
  const { track, dispatch, idx, metadata } = props
  const { artist, name, version, label, imageUrl, fetchRequested } = track
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    if(fetchRequested){
      query()
    }
  }, [fetchRequested])

  const query = async ()  => {
    if(loading || (!artist || !track) ) return
    setLoading(true)
    setError(false)
    try{
      const { data: newCandidates } = await Axios.post('/api/bandcamper', {
        artist,
        name
      })
      setCandidates(newCandidates)
      const bestMatch = newCandidates[0]
      dispatch({ type: 'UPDATE_TRACK', payload: { idx, ...{ ...track, metadata: bestMatch, imageUrl: bestMatch.img } }})
    }catch(err){
      console.log(err)
      dispatch({ type: 'BANDCAMP_NOT_FOUND', payload: { idx } })
      setError(true)
    }
    setLoading(false)
  }

  const onChange = ({ target: { value, name } }) => dispatch({ 
    type: 'UPDATE_TRACK', 
    payload: { 
      idx,
      [name]: value 
    }
  })

  const cellClasses = "pb-2 pr-2"
  return (
    <tr className="text-left">
      <td className={cellClasses}>
        <div className="text-white">{idx+1}</div>
      </td>
      <td className={cellClasses}>
        <input onChange={onChange} name="artist" className="w-full px-2 py-2 rounded-sm bg-white" type="text" value={artist} />
        {/* {fetchedTrack.artist && <div className="text-xs pl-2 text-blue-500"> {fetchedTrack.artist} ?</div>} */}
      </td>
      <td className={cellClasses}>
        <input onChange={onChange} name="name" className="w-full px-2 py-2 rounded-sm bg-white" type="text" value={name} />
        {/* {fetchedTrack.name && <div className="text-xs pl-2 text-blue-500"> {fetchedTrack.name} ?</div>} */}
      </td>
      <td className={cellClasses}>
        <input onChange={onChange} name="version" className="w-full px-2 py-2 rounded-sm bg-white" type="text" value={version} />
        {/* {fetchedTrack.name && <div className="text-xs pl-2 text-blue-500"> {fetchedTrack.name} ?</div>} */}
      </td>
      <td className={cellClasses}>
        <input onChange={onChange} name="label" className="w-full px-2 py-2 rounded-sm bg-white" type="text" value={label} />
        {/* {fetchedTrack.name && <div className="text-xs pl-2 text-blue-500"> {fetchedTrack.name} ?</div>} */}
      </td>
      <td className={cellClasses}>
        <BandcampUrlInput idx={idx} dispatch={dispatch} options={candidates} selected={metadata} />
        {/* <input onChange={onChange} name="url" className="w-full px-2 py-1 rounded-sm bg-white" type="text" value={url} /> */}
      </td>
      <td className="py-0">

      </td>
      <td className={""}>
        <div className={`cursor-pointer ${loading && "animate-bounce cursor-none"} text-blue-300`} onClick={query}>
          {((!artist || !track) 
              ? null 
              : (error ? <Error /> : <Download />
              )
            )
          }
        </div>
      </td>
    </tr>
  )

}

export default TrackRow


const Download = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z" clipRule="evenodd" /></svg>
const Check = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
const Error = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>