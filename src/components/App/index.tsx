import { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from "react-router-dom"

import Loader from "../shared/Loader"
import Link from "../Link"

import "./index.sass"
import api from "../../config/api"

const Redirecter = ({ match }: RouteComponentProps) => {
  const { shortLink }: any = match.params

  const [message, setMessage] = useState("Redirecting...")

  useEffect(() => {
    api.get(shortLink).then(({ data: { fullLink } }) => {
      if (fullLink !== undefined) {
        window.location.href = fullLink
      } else {
        setMessage(`Could not find full link for ${shortLink}`)
      }
    })
  }, [shortLink])

  return <div>{message}</div>
}

export default () => {
  const [loader, toggle] = useState(true)

  setTimeout(() => toggle(false), 6000)

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            { loader ? <Loader /> : <Link />}
          </Route>
          <Route path="/:shortLink" component={Redirecter} />
        </Switch>
      </div>
    </Router>
  )
}
