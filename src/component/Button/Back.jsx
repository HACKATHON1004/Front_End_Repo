import { useNavigate } from 'react-router-dom'
import backBtn from '../../images/Back.svg'

export default function Back() {
    const navigate = useNavigate();
    
    function goBack() {
        navigate(-1);
    }
    
    return (
        <>
            <img onClick={goBack} src={backBtn} style={{position:"absolute", zIndex:"1000", top:"20px",left: "20px", margin:"20px 0 0 0px"}}/>
        </>
    )
}