import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, TextField } from "@mui/material";
import axios from "axios";
import Dog from "./Dog";
const Home = () => {
  useEffect(() => {
    cargarPerros();
  }, []);

  const [listado, setListado] = useState([]);
  const [finder, setFinder] = useState("");
  const [errors, setErrors] = useState(false);
  const [listaAux, setListaAux] = useState([]);
  const [listadoSelected, setListadoSelected] = useState([]);



  const cargarPerros = () => {
    axios.get("https://dog.ceo/dog-api/").then(
      
      (error) => {
        console.log(error);
      }
    );
  };

  const handleInputChange = (event) => {
    setFinder(event.target.value);
  };

  // map , filter
  useEffect(() => {
    if (finder.trim() !== "") {
      let result = listado.filter((item) =>
        item.name.toString().includes(finder.toString().trim())
      );
      setListaAux(result);
    }
    console.log(finder);
  }, [finder]);



  // El hook useEffect se usa para ejecutar código cuando se 
  //renderiza el componente o cuando cambian las dependencias del efecto.

  // Recibe dos parámetros:
  // - La función que se ejecutará al cambiar las dependencias o al renderizar el componente.
  // - Un array de dependencias. Si cambia el valor de alguna dependencia, ejecutará la función.

  // useEffect(()=>{
     //'haga algo solo la primera vez que se renderice un componente'
  //   //
  //   //
  // },[])

  // useEffect(()=>{
     //'haga algo cada vez que "variable" cambie de valor'
  //   //
  //   //
  // },[variable])


  let estilo = { backgroundColor: "red" };

  const stack = (itemExterno) => {
    setListadoSelected((listadoSelected) => [...listadoSelected, itemExterno]);
    

    let result = listado.filter((item) => item.name !== itemExterno.name);
    setListado(result);

    let resultClon = listaAux.filter((item) => item.name !== itemExterno.name);
    setListaAux(resultClon);


}

  const stack2 = (itemExterno) => {
    // los tres puntitos se llama spread operator
    //callback: Es cuando una funcion es pasada como parametro de otra funcion

    //ORDENAR LISTADOORDENADO Y DESPUES SETEARLO EN EL SETlISTADO
    const listadoNuevo = [...listado,itemExterno]
    console.log(listadoNuevo);

    setListado(listadoOrdenado)


    // setListado((listado) => [...listado, itemExterno]);
  

    let result = listadoSelected.filter((item) => item.name !== itemExterno.name);
    setListadoSelected(result);

  }

  return (
    <Card>
      <CardContent>
        <TextField
          error={errors}
          helperText={errors ? "hay error" : null}
          fullWidth
          label="Pokemon"
          name="pokemon"
          type="text"
          variant="outlined"
          value={finder}
          onChange={handleInputChange}
        />
        <Grid container spacing={2}>
          <Grid item md={4}>
          {listado.map((element, index) => (
              <Dog 
              pokemon = {element}
              nombre={element.name} 
              key={index}></Dog>
            ))}
          </Grid>
          <Grid item md={4}>
            {finder && 
              listaAux.map((element, index) => (
                <Dog 
                pokemon ={element}
                nombre={element.name}
                key={index} 
                estilo={estilo}
                funcion = {stack}></Dog>
              ))}
          </Grid>
          <Grid item md={4}>
            {finder && 
              listadoSelected.map((element, index) => (
                <Dog 
                pokemon ={element}
                nombre={element.name}
                key={index} 
                estilo={estilo}
                funcion = {stack2}></Dog>
              ))}
          </Grid>


        </Grid>
      </CardContent>
    </Card>
  );
};

export default Home;
