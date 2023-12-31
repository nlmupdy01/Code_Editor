
// import React from 'react';
import React, { useState, useRef } from "react";

import Editor from "@monaco-editor/react";
import useLocalStorage from '../Hook/useLocalStorage';
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileSaver from "file-saver";




function CodeEditor() {


 

  const [HTML, setHTML] = useLocalStorage("HTML","")
  const [CSS, setCSS] = useLocalStorage("CSS","")
  const [JS, setJS] = useLocalStorage("JS","")

  const [active, setActive] = React.useState("HTML")




  const IFRAMECODE = `
  <html>
    <head>
      <style>
        ${CSS}
      </style>
    </head>

    <body>
      ${HTML}

      <script> 
        ${JS}
      </script>
    </body>

  </html>
  `

  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const copyToClip = () => {
      setIsCopied(true);
      setTimeout(() => {
          setIsCopied(false);
      }, 1000);
  }; 
  const handleButtonClick = (event) => {
    event.preventDefault();
  
  };
  const [Disabled, setDisabled] = useState(false);

  const disableClick = (event) => {
    event.preventDefault();
    setDisabled(!Disabled);
   

  };

  function sayHello() {
    var blob = new Blob([HTML , CSS,JS], {
      type: "html/plain;charset=utf-8"
    });
    FileSaver.saveAs(blob, "index.html");
  }

  
 
  return (
    <>
    <div style={{ padding: "20px"}}>
      <h1>Code Editor</h1>
      <div style={{ display:"flex", border:"1px solid black" }}>
     
        {/* editor */}
        <div style={{width:"100%"}} onClick={Disabled ? () => {} : handleButtonClick}>

          <button onClick={()=>setActive("HTML")} style={{color:active==="HTML"?"red":"black"}}>HTML</button>
          <button onClick={()=>setActive("CSS")} style={{color:active==="CSS"?"red":"black"}}>CSS</button>
          <button onClick={()=>setActive("JS")} style={{color:active==="JS"?"red":"black"}}>JS</button>

          {active==="HTML" && 
          <Editor
     height="60vh"
     defaultLanguage="html"
     defaultValue={HTML}
     onChange={(value,event)=>setHTML(value)}
   />

   
          // <textarea value={HTML} onChange={event=>setHTML(event.currentTarget.value)}></textarea>
          
          }
          {active==="CSS" && 
          <Editor

          height="60vh"
          defaultLanguage="css"
          defaultValue={CSS}
          onChange={(value,event)=>setCSS(value)}
        />

          // <textarea value={CSS}  onChange={event=>setCSS(event.currentTarget.value)}></textarea> 
          
          }
          {active==="JS" && 
          <Editor
         
          height="60vh"
          defaultLanguage="javascript"
          defaultValue={JS}
          onChange={(value,event)=>setJS(value)}
        />
          // <textarea value={JS} onChange={event=>setJS(event.currentTarget.value)}></textarea>
          }


        </div>

        {/* result */}
        <div style={{width:"100%", height:"66vh"}}>
        <iframe height={"100%"} width={"100%"} srcDoc={IFRAMECODE} />

        </div>
      </div>
      <div>
      <div style={{display:'flex', padding :'10px'}}>
      <CopyToClipboard text={HTML} onCopy={copyToClip} >
            <div className="copy-btn">
                <button style={{background:'#22228C' ,border:'1px solid #fff',  borderRadius:'0.3rem',color:'white', width:'6rem' ,height:'3rem' }} >Copy </button>
              
            </div>
        </CopyToClipboard>
        <button style={{background:'red',  border:'1px solid #fff' ,borderRadius:'0.3rem' ,color:'white', width:'6rem' ,height:'3rem' , marginLeft:'1rem'}} onClick={disableClick} 
>
        {Disabled ? "Lock" : "Unlock"}
      
      </button>
     <button onClick={ sayHello}  style={{background:'green', border:'1px solid #fff' ,borderRadius:'0.3rem' ,color:'white', width:'6rem' ,height:'3rem' ,marginLeft:'1rem'}} >Save</button>
       </div>
       {isCopied &&
                    <span style={{color:'green'}}> Copied..!</span>
                }
       </div>
    </div>

</>
  );
}

export default CodeEditor;


