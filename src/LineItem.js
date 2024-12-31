import { FaTrash } from "react-icons/fa6";
const LineItem = ({item,handleCheck,handleDelete})=>{
console.log(item,"checking ")
    return (
        <li className="item" key={item.id}>
                        <input type="checkbox" onChange={()=>handleCheck(item.id)} checked = {item.checked}/>
                        <label onDoubleClick={()=>handleCheck(item.id)} style={(item.checked)  ? {textDecoration: "line-through"} : null}>{item.item} </label>
                        <FaTrash onClick={()=>{handleDelete(item.id)}}
                        aria-label={`delete ${item.item}`} />
                        </li>
    )
}

export default LineItem