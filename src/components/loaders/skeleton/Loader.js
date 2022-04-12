import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={725}
    height={600}
    viewBox="0 0 725 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="60" rx="2" ry="2" width="725" height="600" />
  </ContentLoader>
)

export default MyLoader

