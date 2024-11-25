import React from 'react'

function HeadLine() {
  return (
    <>
      <div style={{ display: "flex" , justifyContent : "center" , alignItems: "center", width : "550px"}}>
     {/* Heading for Product */}
     <h3 
      style={{
        margin: '0',
        padding: '0',
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft : "720px",
        marginRight : '170px'
      }}
    >
      Product
    </h3>
     {/* Heading for Discount */}
     <h4
            style={{
              margin: '0',
              padding: '0',
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '5px',
              marginLeft : '0px'
            }}
          >
            Discount
          </h4>
          </div>
    </>
    
  )
}

export default HeadLine;