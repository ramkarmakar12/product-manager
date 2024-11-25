import React from "react";

function Navbar() {
  return (
    <>
    <nav
      style={{
        background: "#f9f9f8",
        padding: "5px 30px ",
        color: "#000",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid black",
        boxShadow: "2px 2px 2px #eeeeee"
      }}
    ><div><img id = "logo" style={{height:"30px", width : "30px" , padding: "3px"}} src={require('../images/monk.jpg')}/></div>
      <h6 style={{ margin: 0, fontSize: "14px", padding: "5px", fontweight : "100"}}> Monk Upsell & Cross-sell<br/></h6>
    </nav>
    </>
  );
}

export default Navbar;
