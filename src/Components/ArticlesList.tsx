import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { Article } from "../Types/article";
import { delay } from "../Helpers/delay";
import { API_URL } from "../constants/url";
import { ArticleForm } from "./ArticleForm";
import "../Styles/Components/article-list.scss";
import { Link } from "react-router-dom";
import { ArticleFilter } from "./ArticleFilter";
import Modal from "./Modal";
import "../Styles/Components/modal.scss";



export const ArticlesList = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loadingState, setLoadingState] = useState(false);
    const [isNewArticle, setIsNewArticle] = useState(false);
    const [editedArticle, setEditedArticle] = useState<null | Article>(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
 
    
    
    useEffect(()=>{
        
        const getData = async () => {
            try {
                setLoadingState(true);
                await delay(1000);
                const {data} = await axios.get(API_URL);
                setArticles(data);
                setLoadingState(false);
            }
            catch (error){
                setLoadingState(false);
                console.log("error", error);
            }
        }

        getData();
    }, []);

    const addArticle = async (article: Article) => {
      const newArticle = {
        ...article
      };

      try {
        setLoadingState(true);
        await delay(1000);

        const {data} = await axios.post(API_URL, newArticle);

        setArticles([...articles, data]);
        setLoadingState(false);
        setIsNewArticle(false);
      }catch(error){
        setLoadingState(false);
        console.log("error", error);
      }
    };

    const deleteArticle = async (id?: string) => {
      if (!id){
        return;
      }

      try {
        setLoadingState(true);
        await delay(1000);
        await axios.delete(`${API_URL}/${id}`);
        const newArticles = articles.filter((article)=> article.id !== id);
        setArticles(newArticles);
        setLoadingState(false);        
      }catch(error){
        setLoadingState(false);
        console.log("error", error);
      }
    };
    
    const filteredArticleList =  articles.filter(article => {
      if (selectedCategory=== "All"){
        return true;
      }
      return article.category === selectedCategory;
    });
    
    if (loadingState) {
        return <div className="Loading">Loading...</div>
    }

    const getOptions = (articles: Article[]):string[] => {
      let options: string[] = ["All"];
      articles.forEach((article) => {
        if (!options.includes(article.category)){
          options.push(article.category)
        }
      });
      return options;
    }

    return (

        <div className="container">
           { 
              
              <ArticleFilter
              label="Filter by category"
              options={getOptions(articles)}
              selectedValue={selectedCategory}
              onChange={(category) => {
                setSelectedCategory(category);
              }} />
              
            }

          {filteredArticleList.length > 0 ? (
  
          <ul className="article-list">
          
          {filteredArticleList.map((article) => {
                return (
                  <li key={article.id}>
                    <article className="article-card">
                      <Link to={`/articles/${article.id}`} title="Go to article">
                        <img src={article.imageLink} alt={article.title} />
                      </Link>
                      <div className="article-content">
                        <h3>{article.title}</h3>
                        <h4>{article.category}</h4>
                      </div>
                      <div className="card-buttons">
                        <Button 
                        onButtonClick={() => {
                          deleteArticle(article.id);
                        }}
                        >
                          Delete
                        </Button>

                        <Button
                          onButtonClick={()=>{
                            setEditedArticle(article);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </article> 
                </li>
                );
              })
            }
          </ul>
          ): ( <div> No articles found by category:{selectedCategory}</div> )}
          <div className="container-add">
          {!isNewArticle && (
          <Button 
            onButtonClick={() => {
              setIsNewArticle(true);
            }}
          >
            Add new article
          </Button>
          )}
          </div>
          <Modal isOpen={isNewArticle || !!editedArticle} onClose={() => {}}>
          {isNewArticle && (
            <ArticleForm
              onCancel={() =>{
                setIsNewArticle(false);
              }}
              onFormSubmit={(body) => {
                addArticle(body);
              }}
              />
          )}
          
          {editedArticle && (
            <ArticleForm
              onCancel={() => {
                setEditedArticle(null);
              }}
              onFormSubmit={async (body) =>{
                try {
                  setLoadingState(true);
                  await delay(1000);
                  const {data} = await axios.put(`${API_URL}/${body.id}`, body);
                  const newArticle = articles.map((article) => {
                    if (article.id === data.id){
                      return data;
                    }
                    return article;
                  });
                  setArticles(newArticle);
                  setLoadingState(false);
                  setEditedArticle(null);
                }catch (error) {
                  setLoadingState(false);
                  console.log("error", error);
                }
              }}
              initialValues={editedArticle}
              />
          )}
          </Modal>
        </div>
      );
    };