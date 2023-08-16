import './App.css';
import{useState, useEffect} from "react";
import ArticleList from "./components/ArticleList";
import Form from "./Form";
import reportWebVitals from "./reportWebVitals";
import 'bootstrap/dist/css/bootstrap-grid.min.css'
function App() {

    const [articles, setArticles] = useState([])
    const [editedArticle, setEditedArticle] = useState(null)

    useEffect(()=>{
        fetch('http://localhost:5000/get',{
            'method':'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
            .then(resp=> resp.json())
            .then(resp => setArticles(resp))
            .catch(error => console.log(error))
    },[])

    const editArticle = (article) =>{
        setEditedArticle(article)
    }

    const updatedData = (article) => {
        const new_article = articles.map(my_article => {
            if (my_article.id === article.id){
                return article
            }
            else {
                return my_article
            }
        })
        setArticles(new_article)
    }

    const openForm = () => {
        setEditedArticle({title:"",body:""})
    }

    const insertedArticle = (article) => {
        const new_articles = [...articles,article]
        setArticles(new_articles)
    }

    const deleteArticle = (article) =>{
        const new_articles = articles.filter(myarticle => {
            return myarticle.id !== article.id;
        })
        setArticles(new_articles)



    }

    return (
    <div className="App">
        <div className="row">
            <div className="col">
                <h1>Flask and ReactJS Course</h1>
            </div>
            <div className="col">
                <button className = "btn btn-success" onClick={openForm}>InsertArticle</button>
            </div>
        </div>

        <ArticleList articles = {articles} editArticle = {editArticle} deleteArticle = {deleteArticle}/>
        {editedArticle ? <Form article = {editedArticle} updatedData = {updatedData} insertedArticle = {insertedArticle}/> : null}

    </div>
  );
}

export default App;
