import React, { useEffect, useState } from 'react'
import Axios from 'axios'

const routes = {
  bandcamp: '/api/bandcamper'
}

export default () => {
  const [bandcampLink, setBandcampLink] = useState()

  useEffect(() => {
    (async function () {
      const { data } = await Axios.post(routes.bandcamp, {
        artist: "Hodge",
        name: "Return To The East"
      })
      setBandcampLink(data)
    })()
  }, [])
  return <div>
    result: {JSON.stringify(bandcampLink)}
  </div>
}
