import React from "react";

function Navbar() {
  return (
    <>
    <nav
      style={{
        background: "#f9f6ee",
        padding: "10px 30px ",
        color: "#000",
        display: "flex",
        alignItems: "center",
      }}
    ><div><img id = "logo" style={{height:"30px", width : "30px" , padding: "3px"}} src={require('../images/monk.jpg')}/></div>
      <h3 style={{ margin: 0, fontSize: "16px", padding: "4px", fontweight : "lighter"}}> Monk Upsell & Cross-sell<br/></h3>
    </nav>
    </>
  );
}

export default Navbar;
