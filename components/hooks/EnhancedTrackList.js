import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { BUTTON_CLASSES } from '../../pages/index';

const formatTrack = ({ artist, name, label, url, ...t }, idx) => `${idx+1}.   ${name} – ${artist} ${url ? `[${url}]` : ''}`
function EnhancedTrackList({ tracks }) {
  const [isOpen, setIsOpen] = useState(false)

  const stringToCopy = tracks.map(formatTrack).join('\n')
  const modalContent = () => (
    <div>
      <textarea 
        className={'w-full'}
        value={stringToCopy} 
      />
    </div>
  )
  return (
    <div>
      <div onClick={() => setIsOpen(true)} className={BUTTON_CLASSES}> Copy Lisast</div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={
          { overlay: {}, content: {} }
  /* Object indicating styles to be used for the modal.
     It has two keys, `overlay` and `content`.
     See the `Styles` section for more details. */}

        contentLabel={
          "Enhanced Track List"
  /* String indicating how the content container should be announced
     to screenreaders */}

        portaalClassName={
          "ReactModalPortal"
  /* String className to be applied to the portal.
     See the `Styles` section for more details. */}

        overlaayClassName={
          "ReactModal__Overlay"
  /* String className to be applied to the overlay.
     See the `Styles` section for more details. */}


        clasasName={
          "ReactModal__Content"
  /* String className to be applied to the modal content.
     See the `Styles` section for more details. */}
        >
          {modalContent()}
      </ReactModal>
    </div>
  );
}

export default EnhancedTrackList;