import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function App() {
  const [perro, setPerro] = useState({ nombre: "", img: "" });
  const [aceptado, setAceptado] = useState([]);
  const [rechazado, setRechazado] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerPerro = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    return response.json();
  };

  useEffect(() => {
    setCargando(true);
    obtenerPerro().then((data) => {
      setPerro({ nombre: StringAleatorio(6), img: data.message });
      setCargando(false);
    });
  }, []);

  const clickAceptarPerro = () => {
    setCargando(true);
    setAceptado((aceptado) => [...aceptado, perro]);
    obtenerPerro().then((data) => {
      setPerro({ nombre: StringAleatorio(6), img: data.message });
      setCargando(false);
    });
  };

  const clickRechazarPerro = () => {
    setCargando(true);
    setRechazado((rechazado) => [...rechazado, perro]);
    obtenerPerro().then((data) => {
      setPerro({ nombre: StringAleatorio(6), img: data.message });
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
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Typography sx={{color:"green"}}variant="h4">Perros Aceptados</Typography>
        {aceptado?.map((perro) => {
          return (
            <Card key={perro.nombre}>
              <CardMedia
                component="img"
                height="300"
                image={perro.img}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {perro.nombre}
                </Typography>
              </CardContent>
              <CardActions>
                <Button startIcon={<ThumbDownIcon />} size="small" color="error" onClick={()=> clickRechazarPerro2(perro)}>
                  Rechazar
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Grid>

      <Grid item xs={4}>
        <Typography
          sx={{
            color: "blue",
          }}
          variant="h3"
        >
          Tinder de Perros
        </Typography>
        {cargando ? (
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={perro.img}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Cargando...
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                disabled={cargando}
                size="small"
                color="success"
                onClick={clickAceptarPerro}
              ></Button>
              <Button
                disabled={cargando}
                size="small"
                color="error"
                onClick={clickRechazarPerro}
              ></Button>
            </CardActions>
          </Card>
        ) : (
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={perro.img}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
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
          </Card>
        )}
      </Grid>

      <Grid item xs={4}>
        <Typography sx={{ color: "red" }} variant="h4">
          Perros Rechazados
        </Typography>
        {rechazado?.map((perro) => {
          return (
            <Card key={perro.nombre}>
              <CardMedia
                component="img"
                height="300"
                image={perro.img}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {perro.nombre}
                </Typography>
              </CardContent>
              <CardActions>
                <Button startIcon={<ThumbUpIcon />} size="small" color="success" onClick={()=> clickAceptarPerro2(perro)}>
                  Aceptar
                </Button>
              </CardActions>
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

  console.log(StringAleatorio(5));
}

export default App;
