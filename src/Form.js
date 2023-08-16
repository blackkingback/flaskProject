import React, {useState,useEffect} from "react";
import APIService from "./components/APIService";
function Form(props) {

    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')

    useEffect(()=>{
        setTitle(props.article.title)
        setBody(props.article.body)
    },[props.article])

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id,{title,body})
            .then(resp => props.updatedData(resp))
            .catch(error => console.log(error))
    }

    const insertArticle = () => {
        APIService.InsertArticle({title,body})
            .then(resp => props.insertedArticle(resp))
            .catch(error => console.log(error))
    }

    return (
        <div>
            {props.article ? (
                <div className="mb-3">
                    <label  className= "form-label" htmlFor= "title">Title</label>
                    <input type = "text" className = "form-control" placeholder="Please Enter Title" value={title}
                           onChange={(e)=>setTitle(e.target.value)}/>
                    <label  className= "form-label" htmlFor= "body">Description</label>
                    <textarea rows= "5" value={body} className = "form-control" placeholder = "Please Enter Description"
                              onChange={(e)=>setBody(e.target.value)}/>
                    { props.article.id ? <button className="btn btn-success" onClick={updateArticle}>Update</button> :
                        <button className="btn btn-success" onClick={insertArticle}>InsertArticle</button>}

                </div>
            ):null}
    </div>
    )
}

export default Form