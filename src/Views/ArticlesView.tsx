import { ArticlesList } from "../Components/ArticlesList";
import "../Styles/index.scss";


export const ArticlesView = () => {
    return (
        <div className="container">
            <h1>Articles</h1>
            <ArticlesList />
        </div>
    )
}