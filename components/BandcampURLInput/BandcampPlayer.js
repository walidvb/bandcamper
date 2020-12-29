import React, { useRef } from 'react';


function BandcampPlayer(props) {
  const { metadata } = props
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