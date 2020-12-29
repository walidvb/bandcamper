import React, { useRef } from 'react';

const useWhyDidIRender = (props) => {
  const prevProps = useRef()
  if (prevProps.current) {
    const allKeys = [
      ...new Set([...Object.keys(props), ...Object.keys(prevProps.current)]),
    ]
    const diffKeys = allKeys.filter(k => props[k] !== prevProps.current[k])
    console.log(
      'DIFF',
      diffKeys.map(k => ({ k, prev: prevProps.current[k], cur: props[k] }))
    )
  } else {
    console.log('FIRST MOUNT')
  }
  prevProps.current = props
}


function BandcampPlayer(props) {
  const { metadata } = props
  useWhyDidIRender(props)
  if(!metadata?.url){
    return null
  }

  if (metadata?.type === 'b' /* type is band */){
    return <div>See {metadata.name}</div>
  }
  const { id, album_id } = metadata
  return (
      <iframe
        className={'miniplayer'}
      src={`https://bandcamp.com/EmbeddedPlayer/album=${album_id || id }/size=large/bgcol=E2E8F0/linkcol=2c5282/tracklist=false/artwork=small/transparent=true/`}
        seamless
      />
  );
}

export default React.memo(BandcampPlayer);