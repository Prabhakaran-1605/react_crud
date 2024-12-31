import { FaPlus } from "react-icons/fa6"
import {useRef} from "react"
const AddItem = ({newItem,setNewItem,handleSubmit}) =>{

    const inputRef = useRef();

    return (
        <form className="addForm" onSubmit={handleSubmit}>
        <input 
            autoFocus
            id="addItem"
            type="text"
            placeholder="Add Item"
            required
            value={newItem}
            onChange = {(e)=> setNewItem(e.target.value) }
            ref={inputRef}
        />
        <button type="submit" aria-label="Add Item"
        onClick={()=> inputRef.current.focus()}
        >
            <FaPlus/>
        </button>

        </form>

    )
}

export default AddItem 