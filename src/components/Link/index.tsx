import api from "../../config/api"
import React, { useState } from "react"

import "./index.sass"

export default () => {
  const [fullLink, setFullLink] = useState("")
  const [shortLink, setShortLink] = useState("")
  const [copied, setCopied] = useState(false)

  const keyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    setShortLink("")
    setCopied(false)

    if (e.code === "Enter") {
      const { data } = await api.post("/", { link: fullLink })
      setShortLink(`${process.env.REACT_APP_URL}/${data.shortLink}`)
    }
  }

  const copyToClipboard = async (e: any) => {
    e.preventDefault()
    await navigator.clipboard.writeText(shortLink)
    setCopied(true)
  }

  return (
    <div className="link-container">
      { shortLink && copied && <span>COPIED</span> }
      {
        shortLink && !copied && (
          <span>
            <span>Your short link is: </span>
            <a
              title="Click to copy to Clipboard"
              href={shortLink}
              onClick={copyToClipboard}>
              {shortLink}
            </a>
          </span>
        )
      }

      <input
        className="link"
        type="text"
        placeholder="Paste your URL here"
        value={fullLink}
        onChange={e => setFullLink(e.target.value)}
        onKeyPress={keyPress}
      />
    </div>
  )
}
