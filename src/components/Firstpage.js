import React from "react";
import "./Firstpage.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";

// import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  media: {
    height: 140,
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
  card: {
    maxWidth: 345,
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Firstpage(props) {

  const items=props.items
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const [name, setName] = React.useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const [stateselected, setformState] = React.useState("");

  const handleChange = (event) => {
    setformState(event.target.value);
  };

  const [countryselected, setCountry] = React.useState("");

  const handleChangecountry = (event) => {
    setCountry(event.target.value);
  };

  const handleSubmit = () => {
    
  
    axios({
      method: "post",
      url: "http://localhost:8000/api/factoryunit/",
      data: {
        name: name,
        Country: countryselected,
      },
    }).then(res => {if(res){
      props.onUpdate()
    }
      }).catch((err) => {
      console.error(err);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    
    axios
      .delete("http://localhost:8000/api/factoryunit/" + id + "/")
      .then(res => {if(res){
        props.onUpdate()
      }})
      .catch((err) => {
        console.log(err);
      });
  };
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const classes = useStyles();
  const index = props.selectedIndex;
  if (index === 1) {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h3 className="Factoryheading">Factory/Warehouse details</h3>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={handleClickOpen("paper")}>+ Add Unit</Button>
          </Grid>
        </Grid>
        <Dialog
          maxWidth="sm"
          fullWidth={true}
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            Factory / Warehouse{" "}
          </DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <span>Name</span>
                <TextField
                  onChange={handleNameChange}
                  id="name-of-factory"
                  label="value"
                  value={name}
                />
                <br />
                <span>Adress Line 1</span>
                <TextField id="address-line-1" label="value" />
                <br />
                <span>Adress Line 2</span>
                <TextField id="address-line-2" label="value" />
                <br />
                <span>City</span>
                <TextField id="city" label="value" />
                <br />
                <span>Pincode</span>
                <TextField id="pincode" label="value" />
                <br />

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    State
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={stateselected}
                    onChange={handleChange}
                    label="State"
                  >
                    <MenuItem value="">
                      <em>value</em>
                    </MenuItem>
                    <MenuItem value={"Karnataka"}>Karnataka</MenuItem>
                    <MenuItem value={"Tamil Nadu"}>Tamil Nadu</MenuItem>
                    <MenuItem value={"Kerala"}>Kerala</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Country
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={countryselected}
                    onChange={handleChangecountry}
                    label="Country"
                  >
                    <MenuItem value="">
                      <em>value</em>
                    </MenuItem>
                    <MenuItem value={"India"}>India</MenuItem>
                    <MenuItem value={"NA"}>North America</MenuItem>
                    <MenuItem value={"Brazil"}>Brazil</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {items.map(function (item) {
          return (
            <React.Fragment>
              <Card className={classes.card} key={item.id}>
                <CardActionArea>
                  <CardContent>{item.name},{item.Country}</CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                  <Button
                    key={item.id}
                    size="small"
                    color="primary"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
  return (
    <div className="Firstpage">
      <h1>Other pages</h1>
    </div>
  );
}

export default Firstpage;
