import React from "react"
import Content from "./Content"
import Header from "./Header"
import Total from "./Total"

const Course = ({course}) => (
    <div>
        <Header text="Half Stack application development" />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default Course