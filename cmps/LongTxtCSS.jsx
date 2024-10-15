const { useState, useEffect } = React

export function LongTxtCSS({ txt , length=20}) {
       useEffect(()=>{
        document.documentElement.style.setProperty("--length", `${length}ch`);

    },[])

    return (
        <p className="long-txt-css">{txt}</p>
    )
}