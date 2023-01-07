export default function Home() {

  const thumbnail = {
    borderRadius: "25px",
    width: "100%",
    height: "400px",
    margin: "auto",
    textAlign: "center",
    position: "relative",
  }


  const caption = {
    position: "absolute",
    margin: "auto",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    color: "#464445",
    height: "100px",
    fontSize: "72px",
    letterSpacing: "-5px"

  }

  return (


    <div className="thumb" style={thumbnail}>
      <div>
        <img src="https://images.unsplash.com/photo-1601625193660-86f2807b024b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" style={{borderRadius: "25px", objectFit: "cover"}}  width="100%" height="960px"/>
          <h1 className="text_over_image" style={caption}>Welcome.</h1>
      </div>
    </div>


  )

}