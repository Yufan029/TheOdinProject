import { Link } from 'react-router-dom';

export default function ErrorPage() {
    return(
        <div className="errorPage">
            <p>Error, back to <Link to="/">Home</Link></p>
        </div>
    );
}