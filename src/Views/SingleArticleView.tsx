import { useEffect, useState } from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import { Article } from "../Types/article";
import axios from "axios";
import { API_URL } from "../constants/url";
import { Button } from "../Components/Button";
import "../Styles/SingleArticleView.scss";

export const SingleArticleView = () => {
    const [article, setArticle] = useState<null | Article>(null);
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams<{articleId : string}>();
    const navigate = useNavigate();

    useEffect(() => {
        const getData =async () => {
            try {
                setIsLoading(true);
                const {data} = await axios.get(
                    `${API_URL}/${params.articleId}`
                );
                setArticle(data);
                setIsLoading(false);
            }catch(error){
                setIsLoading(false);
                console.log("error", error);
            } 
        };

        getData();
    }, [params.articleId]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!article){
        return <div>Article not found</div>
    }

    return (
        <div className="container">
            <Button onButtonClick={() => {

                navigate(-1);
            }}>Go back</Button>
            <h1>{article.title}</h1>
           
            <div className="container-content">
            
            <img src={article.imageLink} alt={article.title} />
            <div className="container-text">
            <p>{article.description}</p>

            <p>{article.category}</p>
            </div>
            </div>
        </div>
    )
}