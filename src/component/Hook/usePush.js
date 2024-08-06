import { useNavigate } from "react-router-dom";

export function useHandleLink(url) {
    const navigate = useNavigate();

    function navigateHandler() {
        navigate(url);
    } 
    return navigateHandler;
}