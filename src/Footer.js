import React from "react"

const Footer = ({length})=>{

    return (
<footer> {length} - { (length > 1) ? "list items" : "list item"}</footer>
    )
}

export default Footer