import { Header } from "../../components/Header";
import "./NotFoundPage.css";

export function NotFoundPage() {
    return (
        <>
        <title>404-Error</title>

        <Header />

        <div className="message-body">
          <div className="message">Page not found</div>
        </div>
        </>
    )
}