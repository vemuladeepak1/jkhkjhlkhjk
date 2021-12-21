import { useState, useContext } from "react";
import { Grid, Button, TextField, LinearProgress } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import Axios from "axios";

import { SetPopupContext } from "../App";

const FileUploadInput = (props) => {
  const setPopup = useContext(SetPopupContext);

  const { uploadTo, identifier, handleInput } = props;

  const [file, setFile] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const filetype=["application/pdf"]
  const Imagefiletype=["image/jpg","image/jpeg","image/png"]
  const handleUpload = () => {
    
    if(identifier ==="resume"){
      if(filetype.includes(file.type)){
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset","Test_post");
        data.append("cloud_name","dipak1243");
        Axios.post("https://api.cloudinary.com/v1_1/dipak1243/image/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        })
          .then((response) => {
            console.log(response)
            handleInput(identifier, response.data.url);
            setPopup({
              open: true,
              severity: "success",
              message: "File uploaded successfully",
            });
          })
          .catch((err) => {
            console.log(err.response);
            setPopup({
              open: true,
              severity: "error",
              message: "Error while uploading",
              //   message: err.response.data
              //     ? err.response.data.message
              //     : err.response.statusText,
            });
          });
        }else{
          setPopup({
            open: true,
            severity: "error",
            message: "Please Select Only PDF",
            //   message: err.response.data
            //     ? err.response.data.message
            //     : err.response.statusText,
          });
      }
    }else if(identifier === "profile"){
      if(Imagefiletype.includes(file.type)){ 
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset","Test_post");
      data.append("cloud_name","dipak1243");
      Axios.post("https://api.cloudinary.com/v1_1/dipak1243/image/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      })
        .then((response) => {
          console.log(response)
          handleInput(identifier, response.data.url);
          setPopup({
            open: true,
            severity: "success",
            message: "File uploaded successfully",
          });
        })
        .catch((err) => {
          console.log(err.response);
          setPopup({
            open: true,
            severity: "error",
            message: "Error while uploading",
            //   message: err.response.data
            //     ? err.response.data.message
            //     : err.response.statusText,
          });
        });
      }else{
        setPopup({
        open: true,
        severity: "error",
        message: "Please Select Only JPG/JPEG/PNG",
        //   message: err.response.data
        //     ? err.response.data.message
        //     : err.response.statusText,
      });
    }
      
    }
    
    
    //  if(identifier === "profile" && Imagefiletype.includes(file.type)){

    
    //   const data = new FormData();
    //   data.append("file", file);
    //   data.append("upload_preset","Test_post");
    //   data.append("cloud_name","dipak1243");
    //   Axios.post("https://api.cloudinary.com/v1_1/dipak1243/image/upload", data, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     onUploadProgress: (progressEvent) => {
    //       setUploadPercentage(
    //         parseInt(
    //           Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //         )
    //       );
    //     },
    //   })
    //     .then((response) => {
    //       console.log(response)
    //       handleInput(identifier, response.data.url);
    //       setPopup({
    //         open: true,
    //         severity: "success",
    //         message: "File uploaded successfully",
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err.response);
    //       setPopup({
    //         open: true,
    //         severity: "error",
    //         message: "Error while uploading",
    //         //   message: err.response.data
    //         //     ? err.response.data.message
    //         //     : err.response.statusText,
    //       });
    //     });
    //   }else{
    //     setPopup({
    //       open: true,
    //       severity: "error",
    //       message: "Please Select Only JPG/JPEG/PNG",
    //       //   message: err.response.data
    //       //     ? err.response.data.message
    //       //     : err.response.statusText,
    //     });
    //   }
    
  };

  return (
    <Grid container item xs={12} direction="column" className={props.className}>
      <Grid container item xs={12} spacing={0}>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            component="label"
            style={{ width: "100%", height: "100%" }}
          >
            {props.icon}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(event) => {
              
                setUploadPercentage(0);
                setFile(event.target.files[0]);
              }}
              // onChange={onChange}
              // onChange={
              //   (e) => {}
              //   //   setSource({ ...source, place_img: e.target.files[0] })
              // }
            />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={props.label}
            value={file ? file.name || "" : ""}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "100%", height: "100%" }}
            onClick={() => handleUpload()}
            disabled={file ? false : true}
          >
            <CloudUpload />
          </Button>
        </Grid>
      </Grid>
      {uploadPercentage !== 0 ? (
        <Grid item xs={12} style={{ marginTop: "10px" }}>
          <LinearProgress variant="determinate" value={uploadPercentage} />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default FileUploadInput;