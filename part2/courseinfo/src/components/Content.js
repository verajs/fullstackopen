import React from "react"
import Part from "./Part"

const Content = ({parts}) => (
    parts.map((part) => <Part key={part.id} data={part} />)


)

export default Content