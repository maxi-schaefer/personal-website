import React from 'react'

const Snow = (props) => {
  return (
    <p className='snowflake' id={`item${props.id}`} style={props.style}>❄</p>
  )
}

export default Snow