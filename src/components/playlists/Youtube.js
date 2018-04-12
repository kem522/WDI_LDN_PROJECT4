import React from 'react';

const Youtube = ({id, width, height}) => {
  return(
    <section>
      {id && <iframe id="ytplayer" type="text/html" width={width} height={height} src={`https://www.youtube.com/embed/${id}?controls=0&showinfo=0&rel=0`} frameBorder="0"></iframe> }
    </section>
  );
};

export default Youtube;
