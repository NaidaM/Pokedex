import React from 'react';

const Details = ({ pokemon }) => (
    <div>
    	<img className="spriteDetails" src={pokemon.sprites.front_default} alt='sprite' /> 
      	<h2 className='cap'>{pokemon.name}</h2>
     	<p style={{}}> <span className="labelValue"><span className="labelTitle">Weight</span>{pokemon.weight}</span></p>
      	<p style={{}}><span className="labelValue"><span className="labelTitle">Height</span>{pokemon.height}</span></p>
    	<p>{(pokemon.types).map((e,i)=> <span key={i} className={"type "+e.type.name}>{e.type.name}</span>)}</p>
    	<p>{(pokemon.stats).map((e,i)=><span key={i} className="labelValue"><span className="labelTitle">{e.stat.name}</span>{e.base_stat}</span>)}</p>
    	<p><span className="labelValue"><span className="labelTitle">Moves</span>{pokemon.moves[0].move.name}, {pokemon.moves[1].move.name}, {pokemon.moves[2].move.name}</span></p>
    </div>
)

export default Details