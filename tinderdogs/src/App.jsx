import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, Button, LinearProgress, Collapse, IconButton, Tooltip} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { LoremIpsum } from "lorem-ipsum";
import {
  useQuery
} from 'react-query'
import axios from 'axios';



function App() {
  const [perro, setPerro] = useState({ id: "", nombre: "", img: "" , descripcion: "", expandir: false});
  const [aceptado, setAceptado] = useState([]);
  const [rechazado, setRechazado] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [interacciones, setInteracciones] = useState([]);

  const obtenerPerro = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/perros/random");
    return response;
  };

  const { data:dataPerro , status , isLoading, refetch} = useQuery('obtenerPerro',obtenerPerro,{refetchOnWindowFocus: false});

  const obtenerInteracciones = async () => {
    try {
    const response = await axios.get("http://127.0.0.1:8000/api/interacciones");
    setInteracciones(response.data)
    return response;
    } catch (error){
      console.log("No se cargaron interacciones")
    }

  };

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  const ExpandirPerro = (perro) => {
    setAceptado(aceptado?.map((miPerro) => {
      if( miPerro.nombre === perro.nombre ){
        return{
          ...miPerro , expandir: !perro.expandir 
        }
      }
      return miPerro
    }));
  };

  const ExpandirPerro2 = (perro) => {
    setRechazado(rechazado?.map( (miPerro) => {
      if( miPerro.nombre === perro.nombre ){
        return{
          ...miPerro , expandir: !perro.expandir,
        }
      }
      return miPerro
    }));
  };

  useEffect(() => {

    obtenerInteracciones();

    setCargando(true);

    if(dataPerro){
    setPerro({ id: dataPerro.data.id, nombre: dataPerro.data.nombre, img: dataPerro.data.url_foto, descripcion: dataPerro.data.descripcion, expandir: false });
    setCargando(false);
    
    }

   
    cargarInteracciones();
    console.log('i fire once');
    
  }, [dataPerro]);

  const cargarInteracciones = async () => {
    
    if(interacciones){

      interacciones.map(element => {
        const response = axios.get(`http://127.0.0.1:8000/api/perros/${element.perro_candidato_id}`)
    
        //console.log("entre en data")
        console.log(response)
        if(response.preferencia == 'aceptado'){
          console.log("entre al if .data")
          setAceptado((aceptados) => [{id: response.data.id, nombre:response.data.nombre, img:response.data.url_foto,  descripcion: response.data.descripcion, expandir: false}, ...aceptados])
        }  
        if(response.preferencia == 'rechazado'){
          setRechazado((rechazados) => [{id: response.data.id, nombre:response.data.nombre, img:response.data.url_foto, descripcion: response.data.descripcion, expandir: false}, ...rechazados])
        } 

      });
    };
  };

  const clickAceptarPerro = () => {
    setCargando(true);

    setAceptado((aceptado) => [perro, ...aceptado ]);

    if(dataPerro){     
      refetch().then( () => {     
        //setPerro({ nombre: StringAleatorio(6), img: dataPerro.data.message, descripcion: lorem.generateSentences(4), expandir: false });
        
        const data = {
          'perro_id': 1,
          'perro_candidato_id': perro.id,
          'preferencia': "aceptado"
        }
    
        const headers = {
          'Content-Type': 'application/json',
        }
    
        axios.post("http://127.0.0.1:8000/api/interacciones", data, {
                headers: headers
        })
    
        setCargando(false);
      })  
      }
  };

  const clickRechazarPerro = () => {
    setCargando(true);
    setRechazado((rechazado) => [perro, ...rechazado]);
    
    if(dataPerro){
      refetch().then( () => {  
        setPerro({ nombre: StringAleatorio(6), img: dataPerro.data.message, descripcion: lorem.generateSentences(4), expandir: false });
        setCargando(false);

        const data = {
          'perro_id': 1,
          'perro_candidato_id': perro.id,
          'preferencia': "rechazado"
        }
    
        const headers = {
          'Content-Type': 'application/json',
        }
    
        axios.post("http://127.0.0.1:8000/api/interacciones", data, {
                headers: headers
        })

      })     
      }
  };

  const clickRechazarPerro2 = (perro) => {
    setAceptado(aceptado?.filter((miPerro) => miPerro.nombre !== perro.nombre));
    setRechazado((aceptado) => [ perro, ...aceptado]);

    const data = {
      'perro_id': 1,
      'perro_candidato_id': perro.id,
      'preferencia': "rechazado"
    }

    const headers = {
      'Content-Type': 'application/json',
    }

    axios.patch(`http://127.0.0.1:8000/api/interacciones/${perro.id}`, data, {
            headers: headers
    })

  };

  const clickAceptarPerro2 = (perro) => {
    setRechazado(rechazado?.filter((miPerro) => miPerro.nombre !== perro.nombre));
    setAceptado((rechazado) => [perro, ...rechazado ]);

    const data = {
      'perro_id': 1,
      'perro_candidato_id': perro.id,
      'preferencia': "aceptado"
    }

    const headers = {
      'Content-Type': 'application/json',
    }

    axios.patch(`http://127.0.0.1:8000/api/interacciones/${perro.id}`, data, {
            headers: headers
    })
  };



return(
    <Grid container spacing={2}  style={{ 
      backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/007/168/222/non_2x/pet-footprints-horizontal-seamless-pattern-animal-print-black-prints-of-tracks-of-a-cat-dog-on-a-white-background-pet-paw-print-silhouettes-nice-texture-vector.jpg")`,
      position: "relative",
      height: "100%"
    }}>
      
{/* --------------------------------------------------------- Columna Candidatos ----------------------------------------------- */}
      <Grid item xs={12} md={4}>
        <Typography
          sx={{
            color: "blue",
            backgroundColor: "#F2F2F2",
          }}
          align="center"
          variant="h4"
        >
          Tinder Canino
        </Typography>
        {cargando ? (
          <Card>
            {/* <CardMedia
              component="img"
              height="300"
              image={perro.img}
              alt="Perroimg"
            /> */}
            <CardContent>
              <LinearProgress color="success" />
            </CardContent>

          </Card>
        ) : (
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={perro.img}
              alt="Perroimg"
            />
            <CardContent>
              <Typography align="center" gutterBottom variant="h5" component="div">
                {perro.nombre}
              </Typography>
            </CardContent>
            <CardActions> 

              <Tooltip title="Aceptar">
                <IconButton
                disabled={cargando}
                size="small"
                color="success"
                onClick={clickAceptarPerro}
                >
                  <ThumbUpIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Rechazar">
                <IconButton
                disabled={cargando}
                size="small"
                color="error"
                onClick={clickRechazarPerro}
                >
                  <ThumbDownIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
              <CardContent>
                <Typography paragraph>
                {perro.descripcion}
                </Typography>
              </CardContent>
          </Card>
        )}
      </Grid>

{/* --------------------------------------------------------- Columna Aceptados ----------------------------------------------- */}

      <Grid item xs={6} md={4} sx={{ overflowY: "scroll", maxHeight: "950px"}}>
        <Typography  align="center" sx={{color:"green", backgroundColor: "#F2F2F2"}} variant="h4">Perros Aceptados</Typography>
        {aceptado?.map((perro) => {
          return (
            <Card key={perro.nombre}>
              <CardMedia
                component="img"
                height="300"
                image={perro.img}
                alt="Perroimg"
              />
              <CardContent>
                <Typography align="center" gutterBottom variant="h5" component="div">
                  {perro.nombre}
                </Typography>
              </CardContent>
              <CardActions>
                  <Tooltip title="Rechazar">
                    <IconButton
                    // disabled={cargando}
                    size="small"
                    color="error"
                    onClick={()=> clickRechazarPerro2(perro)}
                    >
                      <ThumbDownIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Ver m??s">
                    <IconButton
                    // disabled={cargando}
                    size="small"
                    align="rigth"
                    onClick={()=>ExpandirPerro(perro)}
                    >
                      {!perro.expandir ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </IconButton>
                  </Tooltip>

              </CardActions>
              <Collapse in={perro.expandir} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>
                    {perro.descripcion}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
      </Grid>

{/* --------------------------------------------------------- Columna Rechazados ----------------------------------------------- */}

      <Grid item xs={6} md={4} sx={{ overflowY: "scroll", maxHeight: "950px"}}>
        <Typography align="center" sx={{ color: "red", backgroundColor: "#F2F2F2"}} variant="h4">
          Perros Rechazados
        </Typography>
        {rechazado?.map((perro) => {
          return (
            <Card key={perro.nombre}>
              <CardMedia
                component="img"
                height="300"
                image={perro.img}
                alt="Perroimg"
              />
              <CardContent>
                <Typography align="center" gutterBottom variant="h5" component="div">
                  {perro.nombre}
                </Typography>
              </CardContent>
              <CardActions>
                <Tooltip title="Aceptar">
                  <IconButton
                    // disabled={cargando}
                    size="small"
                    color="success"
                    onClick={()=> clickAceptarPerro2(perro)}
                    >
                      <ThumbUpIcon />
                    </IconButton>
                </Tooltip>
                
                <Tooltip title="Ver m??s">
                  <IconButton
                  // disabled={cargando}
                  size="small"
                  align="rigth"
                  onClick={ ()=> ExpandirPerro2(perro) }
                  >
                    {!perro.expandir ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </IconButton>
                </Tooltip>
                

              </CardActions>
              <Collapse in={perro.expandir} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>
                    {perro.descripcion}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>

          );
        })}
      </Grid>
    </Grid>

  );
}

{/* ---------------------------------------------------------------------------------------------------------- */}

function StringAleatorio(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


function LoremAleatorio() {
  var result = "";

  var sentences = [
    "Lorem ipsum dolor sit amet ",
    "consectetuer adipiscing elit. ",
    "Aenean commodo ligula eget dolorAenean massa ",
    "Cum sociis natoque penatibus et magnis ",
    "nascetur ridiculus mus. ",
  ];

  for (var i = 0; i < 6; i++) {
    result += sentences[Math.floor(Math.random() * 5)]
  }

  return result;
}

export default App;
