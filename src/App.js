import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {

  const API_URL = "http://localhost:3500/items" ;

  const [items,setItems] = useState([])

  const [newItem, setNewItem] = useState("")

  const [search,setSearch] = useState("")

  const [fetchError, setFetchError] = useState(null)

  const [isLoading, setIsLoading] = useState(true)

      useEffect(()=>{
    const fetchItems = async () => {
      try{
    const response = await fetch(API_URL)
    if (!response.ok) throw Error("Data not received")
    const listItem = await response.json()
    setItems(listItem)
    setFetchError(null)
      }
      catch(err){ 
    setFetchError(err.message)
      }
      finally{
        setIsLoading(false)
      }
    }

    setTimeout(()=>{
      (async () => await fetchItems())()
    },2000)
  },[])

  const addItem = async (item)=>{
    const id = items.length ? items[items.length-1].id +1 : 1;
    const addNewItem = {id,checked:false,item}
    const listItem = [...items, addNewItem]
    setItems(listItem)

    const postOption = {
      method : "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addNewItem)
    }

    const result = await apiRequest(API_URL,postOption);
    if(result) setFetchError(result)  
     
  }
  
  const handleCheck = async (id)=>{
    const listItem = items.map((item)=> item.id === id ? {...item, checked: !item.checked} : item)
    setItems(listItem )

    const myItem = listItem.filter(item => item.id === id)

    console.log(myItem,"myItem")

    const updateOption = {
      method : "PATCH",
      headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({checked : myItem[0].checked})
    }

    const reqUrl = `${API_URL}/${id}`

    const result = await apiRequest(reqUrl,updateOption);
    if(result) setFetchError(result)  

  }
  
  const handleDelete = async (id)=>{
    const listItem = items.filter((item)=> item.id !== id )
    setItems(listItem)

    const deleteOption = {
      method: "Delete"
    }

    const reqUrl = `${API_URL}/${id}`

    const result = await apiRequest(reqUrl,deleteOption);
    if(result) setFetchError(result)  
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
if(!newItem) return;
console.log(newItem)
addItem(newItem)
setNewItem("")
  }

  return (
    <div>
    <Header />
    <AddItem 
    newItem = {newItem}
    setNewItem = {setNewItem}
handleSubmit = {handleSubmit}
     />
     <SearchItem
      search={search}
      setSearch={setSearch}
     />
     <main>
     {isLoading && <p style={{marginTop: "20px"}}> Loading....</p>}
     {fetchError && <p> {`Error : ${fetchError}`}</p>}
    {!isLoading && <Content  items = {items.filter((item)=>((item.item).toLowerCase()).includes(search.toLowerCase()))} handleCheck={handleCheck} handleDelete={handleDelete}/>}
    </main>
    <Footer length={items.length}/>
    </div>
  );
}

export default App;
