import { components } from 'react-select';
import Creatable from 'react-select/creatable';

const bgBlue = 'rgba(235, 248, 255, 1)'
const blue = 'rgba(235, 248, 255, var(--bg-opacity))'
const customStyles = {
  option: (provided, state) => {
    console.log(state, 'state')
    return ({
      ...provided,
      color: blue,
      backgroundColor: !state.isSelected ? 'none' : bgBlue,
    })
  },
  container: (provided) => ({
    ...provided,
    width: '100%'
  }),
  valueContainer: (provided) => ({
    ...provided,
    color: blue,
    padding: "0px 8px",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    '[class*="indicatorContainer"]': {
      padding: 5,
    }
  }),
  control: (provided) => ({
    ...provided,
    border: 'none',
    backgroundColor: bgBlue,
    padding: 0,
    width: "100%",
    minWidth: 400,
    minHeight: 'auto'
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
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

const BandcampUrlInput = ({ idx, options, selected, dispatch }) => {

  const onSelect = (option) => dispatch({
    type: 'UPDATE_TRACK',
    payload: {
      idx,
      url: option.value,
      imageUrl: option.img,
    }
  })
  console.log(selected, 'url')
  
  return <Creatable
    value={{ value: selected, label: selected }}
    defaultValue={selected}
    styles={customStyles}
    components={{ Option }}
    onChange={onSelect}
    options={options.map(o => ({...o, label: o.url, value: o.url}))}
  />
}

export default BandcampUrlInput