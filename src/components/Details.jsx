import { useState } from "react";
import { CommonName } from "./CommonName";

export const Detail = (props) => {
    const [isShown, setIsShown] = useState("false");

    const handleClick = (e) =>{
        setIsShown(true)
    };
    return (
        <div>
        <button className="btn" onclick={handleClick}>Details</button>
        { isShown && (
            <div>
                <CommonName/>
            </div>
        )}
        </div>
    )
}