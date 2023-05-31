import React from "react";

function Button(props) {
    let { isVisible, funcX, funcY, names } = props;
    if (isVisible){
        return <button onClick={funcX}>{names.x}</button>
    }
    else {
        return <button onClick={funcY}>{names.y}</button>
    }
}

export default Button;
