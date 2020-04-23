import React from 'react';
import Player from 'griffith';

// const sources = {
//   hd: {
//     play_url: url,
//   },
//   sd: {
//     play_url: '  ',
//   },
// };

function Vedio({ url, style }) {
  const sources = {
    hd: {
      play_url: url,
    },
    sd: {
      play_url: url,
    },
  };
  return (
    <div style={{ margin: 24, width: '780px', height: '500px', ...style }}>
      <Player sources={sources} />
    </div>
  );
}

export default Vedio;
