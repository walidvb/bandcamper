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
          {data.artist} { data.name}
          <br />
          {data.url.replace(/https?:\/\//, '')}
        </div>
      </div>
    </components.Option>
  </div>
}

const BandcampUrlInput = ({ options, selected, onChange }) => {

  const onSelect = (option) => onChange({ target: { value: option.value, name: 'url' }})
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