import React, { useState } from 'react';
import { components } from 'react-select';
import Creatable from 'react-select/creatable';
import BandcampPlayer from './BandcampPlayer';
import Axios from 'axios';

const bgBlue = 'rgba(235, 248, 255, 1)'
const blue = 'rgba(235, 248, 255, var(--bg-opacity))'
const customStyles = {
  option: (provided, state) => {
    return ({
      ...provided,
      color: blue,
      backgroundColor: !state.isSelected ? 'none' : 'white',
    })
  },
  container: (provided) => ({
    ...provided,
    width: '100%'
  }),
  valueContainer: (provided) => ({
    ...provided,
    color: blue,
    padding: "0px 0px",
    height: 'var(--height)',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    '[class*="indicatorContainer"]': {
      padding: 5,
    }
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  control: (provided) => ({
    ...provided,
    border: 'none',
    backgroundColor: 'white',
    padding: 0,
    width: "100%",
    minWidth: 400,
    minHeight: 'auto'
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { 
      ...provided, 
      opacity, 
      transition,
      marginLeft: '0px',
      width: '100%',
    };
  }
}

const Option = ({ data, ...props }) => {
  console.log(data, props)
  if(!data.url){
    return <components.Option {...props} />
  }
  return <div>
    <components.Option {...props}>
      <div className="flex">
        <img src={data.img} className="h-12 mr-2"/>
        <div>
          {data.band_name} - { data.name}
          <br />
          <em>{data.url.replace(/https?:\/\//, '')}</em>
        </div>
      </div>
    </components.Option>
  </div>
}


const loaders = [
  "Let's get you a player...",
  "Might be better with music",
  "Getting you sound",
  "Patience and sound will come",
  "Everything is better embedded",
]

const BandcampUrlInput = ({ idx, options, selected, dispatch }) => {
  const [loading, setLoading] = useState(false)
  const onSelect = (option) => dispatch({
    type: 'UPDATE_TRACK',
    payload: {
      idx,
      metadata: option.value,
      imageUrl: option.img,
    }
  })
  const SingleValue = (props) => {

    return <components.SingleValue {...props}>
      {!selected?.url ? <div className="opacity-50 pl-2">
        {loading ? <>
          <span className="bc-loading mr-4" />
          {loaders[Math.floor(Math.random() * loaders.length)]}
          <span className="bc-loading" />
        </> : <>
          Enter bandcamp URL or use the auto-fetch →
        </> }
      </div> :
        <div className="rounded-sm overflow-hidden">
          <BandcampPlayer metadata={selected} /> 
        </div>
      }
    </components.SingleValue>
  }

  const onCreateOption = async (customUrl) => {
    setLoading(true)
    try{
      const { data: value } = await Axios.get('/api/getAlbumInfo?url='+ encodeURIComponent(customUrl))
      onSelect({
        value,
      })
    }
    catch(err){

    }
    finally{
      setLoading(false)
    }
  }
  return <div className="player-container">
    { !selected?.url && <div className="album-placeholder" />}
    <Creatable
      value={{ value: selected, label: selected }}
      defaultValue={selected}
      styles={customStyles}
      components={{ Option, SingleValue }}
      onChange={onSelect}
      onCreateOption={onCreateOption}
      options={options.map(o => ({...o, label: o.url, value: o}))}
      placeholder="Enter bandcamp URL"
      noOptionsMessage={() => ""}
    />
  </div>
}

export default React.memo(BandcampUrlInput)