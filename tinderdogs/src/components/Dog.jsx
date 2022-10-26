import React from "react";
import { Button, Card, CardActions, CardContent } from "@mui/material";

const Dog = ({pokemon,estilo=null, funcion = null}) => {
  return(
      
      <Card sx={estilo}>
          <CardContent>
              {pokemon.name}
          </CardContent>
          <CardActions>
              {/* {prueba === "true" ? "hola" : "chao"} */}
              {funcion && <Button onClick={() => funcion(pokemon)}>accion </Button>}
              {/* {funcion ? <Button onClick={() => funcion(pokemon)}>accion </Button>: null} */}
          </CardActions>
      </Card>
  );
}

export default Dog;
