import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader2 = (props) => (
  <ContentLoader 
    speed={2}
    width={240}
    height={438.39}
    viewBox="0 0 240 438.39"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
  </ContentLoader>
)

export default MyLoader2

