import Axios from 'axios';
import { useState } from 'react';

const TrackRow = ({ artist, name, url, dispatch, idx }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const query = async ()  => {
    if(loading) return
    setLoading(true)
    setError(false)
    try{
      const { data } = await Axios.post('/api/bandcamper', {
        artist,
        name
      })
      dispatch({ type: 'BANDCAMP_FOUND', payload: { idx, ...data }})
    }catch(err){
      setError(true)
    }
    setLoading(false)
    
  }

  const cellClasses = "pb-2 pr-2"
  return (
    <tr className="">
      <td className={cellClasses}>
        <div>{idx+1}</div>
      </td>
      <td className={cellClasses}>
        <input className="w-full px-2 py-1 rounded-sm bg-blue-100" type="text" value={artist} />
      </td>
      <td className={cellClasses}>
        <input className="w-full px-2 py-1 rounded-sm bg-blue-100" type="text" value={name} />
      </td>
      <td className={cellClasses}>
        <input className="w-full px-2 py-1 rounded-sm bg-blue-100" type="text" value={url} />
      </td>
      <td className={cellClasses}>
        <div class={`cursor-pointer ${loading && "animate-bounce cursor-none"} text-blue-300`} onClick={query}>
          { url ? <Check />
            : (error ? <Error /> : <Download />)
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