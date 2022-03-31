import React from 'react'

const Part = ({data}) => (
  <p>
    {data.name} <span>{data.exercises}</span>
  </p>
)

export default Part