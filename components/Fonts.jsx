import { Global } from '@emotion/react'

const Fonts = () => (
    <Global
        styles={`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Lato', sans-serif;
        }
      `}
    />
)

export default Fonts