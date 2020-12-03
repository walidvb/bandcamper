import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { BUTTON_CLASSES } from '../../pages/index';
import { CopyToClipboard } from 'react-copy-to-clipboard';


const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if(!copied) return
    setTimeout(() => setCopied(false), 2000)
  }, [copied])
  return (
    <CopyToClipboard text={text}
      onCopy={() => setCopied(true)}>
        <div className={`${BUTTON_CLASSES} inline-flex`}>
          {
            copied ? (
              <>
                <Copied /> &nbsp; Copied!
              </>
            )
            : 
          <>
            <Copy /> &nbsp; Copy to clipboard
            </>
          }
        </div>
    </CopyToClipboard>
  )

}

const formatTrack = ({ artist, name, label, url, ...t }, idx) => `${idx+1}.   ${name} – ${artist} ${url ? `[${url}]` : ''}`
function EnhancedTrackList({ tracks }) {
  const [isOpen, setIsOpen] = useState(false)

  const stringToCopy = tracks.map(formatTrack).join('\n')
  const modalContent = () => (
    <div className="flex flex-col h-full max-w-64">
      <div className="flex-grow mb-4">
        <textarea 
          className={'px-2 w-full h-full'}
          value={stringToCopy}
          editable={false}
          onClick={({ target }) => target.select()}
        />
      </div>
      <div className="flex justify-end">
        <div className={`${BUTTON_CLASSES} mr-6`} onClick={() => setIsOpen(false)}>
          Close
        </div>
        <CopyButton text={stringToCopy} />
      </div>
    </div>
  )
  return (
    <div>
      <div onClick={() => setIsOpen(true)} className={BUTTON_CLASSES}> Copy List</div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}

        contentLabel={
          "Enhanced Track List"
  /* String indicating how the content container should be announced
     to screenreaders */}

        portaalClassName={
          "ReactModalPortal"
  /* String className to be applied to the portal.
     See the `Styles` section for more details. */}

        overlaayClassName={
          "ReactModal__Overlay "
  /* String className to be applied to the overlay.
     See the `Styles` section for more details. */}
        >
          {modalContent()}
      </ReactModal>
    </div>
  );
}

export default EnhancedTrackList;

const Copy = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" /><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" /></svg>
const Copied = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" /><path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" /></svg>
