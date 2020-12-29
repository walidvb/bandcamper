import React, { useRef } from 'react';


function BandcampPlayer(props) {
  const { metadata } = props
  if(!metadata?.url){
    return null
  }

  if (metadata?.type === 'b' /* type is band */){
    return <div className="flex items-center">
      <img className="mini-thumbnail mr-2" src={metadata.img} />
      View&nbsp; 
      <a href={metadata.url} target="_blank" className="underline hover:no-underline">
        {metadata.name}
      </a>
      &nbsp;on bandcamp
    </div>
  }
  const { id, album_id } = metadata
  return (
      <iframe
        className={'miniplayer'}
        src={`https://bandcamp.com/EmbeddedPlayer/album=${album_id || id}/size=small/bgcol=E2E8F0/linkcol=2c5282/transparent=true/`}
        // src={`https://bandcamp.com/EmbeddedPlayer/album=${album_id || id }/size=large/bgcol=E2E8F0/linkcol=2c5282/tracklist=false/artwork=small/transparent=true/`}
        seamless
      />
  );
}

export default React.memo(BandcampPlayer);