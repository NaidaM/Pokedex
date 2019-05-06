import React from 'react';


const Post = ({ name, sprite }) => (
    <span className="grid-pkmn">
      <p><img src={sprite} className="Sprite-pkmn" alt='sprite'/></p>
      <h3 className='cap'>{name}</h3>
    </span>
)

export default Post