import React from 'react';

const Youtube = ({id}) => {
  return(
    <section>
      {id && <iframe id="ytplayer" type="text/html" width="640" height="360" src={`https://www.youtube.com/embed/${id}?`} frameBorder="0"></iframe> }
    </section>
  );
};

export default Youtube;
