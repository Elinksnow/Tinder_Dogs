import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, Button, LinearProgress, Collapse  } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { height, width } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


function App() {
  const [perro, setPerro] = useState({ nombre: "", img: "" ,descripcion: "", expandir: false});
  const [aceptado, setAceptado] = useState([]);
  const [rechazado, setRechazado] = useState([]);
  const [cargando, setCargando] = useState(true);


  const obtenerPerro = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    return response.json();
  };

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
    setCargando(true);
    obtenerPerro().then((data) => {
      setPerro({ nombre: StringAleatorio(6), img: data.message, descripcion: LoremAleatorio(), expandir: false });
      setCargando(false);
    });
  }, []);

  const clickAceptarPerro = () => {
    setCargando(true);
    setAceptado((aceptado) => [...aceptado, perro]);
    obtenerPerro().then((data) => {
      setPerro({ nombre: StringAleatorio(6), img: data.message, descripcion: LoremAleatorio(), expandir: false });
      setCargando(false);
    });
  };

  const clickRechazarPerro = () => {
    setCargando(true);
    setRechazado((rechazado) => [...rechazado, perro]);
    obtenerPerro().then((data) => {
      setPerro({ nombre: StringAleatorio(6), img: data.message, descripcion: LoremAleatorio(), expandir: false });
      setCargando(false);
    });
  };

  const clickRechazarPerro2 = (perro) => {
    setAceptado(aceptado?.filter((miPerro) => miPerro.nombre !== perro.nombre));
    setRechazado((aceptado) => [...aceptado, perro]);
  };

  const clickAceptarPerro2 = (perro) => {
    setRechazado(rechazado?.filter((miPerro) => miPerro.nombre !== perro.nombre));
    setAceptado((rechazado) => [...rechazado, perro]);
  };

  return (
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
            <CardMedia
              component="img"
              height="300"
              image={perro.img}
              alt="Perroimg"
            />
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
              <Button
                startIcon={<ThumbUpIcon />}
                disabled={cargando}
                size="small"
                color="success"
                onClick={clickAceptarPerro}
              >
                Aceptar
              </Button>
              <Button
                startIcon={<ThumbDownIcon />}
                disabled={cargando}
                size="small"
                color="error"
                onClick={clickRechazarPerro}
              >
                Rechazar
              </Button>

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

      <Grid item xs={6} md={4}>
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
                <Button startIcon={<ThumbDownIcon />} size="small" color="error" onClick={()=> clickRechazarPerro2(perro)}>
                  Rechazar
                </Button>

                <Button
                startIcon={!perro.expandir ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                size="small"
                align="rigth"
                onClick={()=>ExpandirPerro(perro)}
                >
              </Button>
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

      <Grid item xs={6} md={4}>
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
                <Button startIcon={<ThumbUpIcon />} size="small" color="success" onClick={()=> clickAceptarPerro2(perro)}>
                  Aceptar
                </Button>
                <Button
              startIcon={!perro.expandir ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              size="small"
              align="rigth"
              onClick={ ()=> ExpandirPerro2(perro) }
              >
              </Button>
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

  var sentenceslength = sentences.length;
  for (var i = 0; i < 7; i++) {
    result += sentences[Math.floor(Math.random() * 5)]
  }

  return result;
}

export default App;
