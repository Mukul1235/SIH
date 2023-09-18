import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Select from "@mui/material/Select/Select";
import { MenuItem } from "@mui/material";
import { InputLabel, Button } from "@mui/material";
import { FormControl } from "@mui/material";
import "../styles/completeprofile.css";
import { useRef, useState } from "react";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const CompleteYourProfile = () => {
  const { auth, setAuth } = useAuth();
  const navigation = useNavigate();
  const [user,setUser] = useState({
    userId: auth._id || "",
    name: "",
    sid: "",
  });

  const IMAGE = useRef();

  // var img_file = "";
  // var image_link = "";
  // IMAGE.current.addEventListener("change", function () {
  //   if (!this.files[0]) return;
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     image_link = reader.result;
  //     document.querySelector(".in_stu_img").src = image_link;
  //   });
  //   reader.readAsDataURL(this.files[0]);
  //   img_file = this.files[0];
  // });

  const updateProfile = async () => {
    const res = await axios.post("/updateUser", { user: user });
    setAuth(res.data);
    navigation("/profile");
  };

  return (
    <div className="max-w-[60%] min-w-[600px] mx-auto text-center my-24">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <img
          srcSet="assets/noprofil.jpg"
          class="mx-auto rounded-full border-2 border-black"
          alt="Unable To Find"
        ></img>
        <div class="upload">
          <button type="button" class="btn-warning border-2 border-black">
            <i class="fa fa-upload"></i> Upload File
            <input
              ref={IMAGE}
              type="file"
              class="img_url"
              accept=".jpg , .jpeg , .png"
            ></input>
          </button>
        </div>
        <AppBar title="Personal Details" />
        <TextField
          hintText="Enter your First Name"
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="username"
          sx={{
            width: "50%",
            marginTop: 5,
            marginRight: "10%",
          }}
        />
        <TextField
          hintText="Enter your SID"
          id="outlined-basic"
          label="SID"
          variant="outlined"
          name="SID"
          sx={{
            width: "40%",
            marginTop: 5,
          }}
        />
        <FormControl>
          <InputLabel
            id="demo-simple-select-label"
            sx={{
              marginTop: 5,
            }}
          >
            Gender
          </InputLabel>
          <Select
            labelId="Gender"
            id="gender"
            label="Gender"
            sx={{
              width: 200,
              marginTop: 5,
            }}
          >
            <MenuItem value={1}>Male</MenuItem>
            <MenuItem value={2}>Female</MenuItem>
            <MenuItem value={3}>Other</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Button
            onClick={updateProfile}
            variant="contained"
            sx={{ marginTop: 5 }}
          >
            Contained
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
};

// import { useEffect, useState } from "react";
// import useAuth from "../Hooks/useAuth";
// const CompleteYourProfile = () => {

//   const handleChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setUser((prevstate) => ({ ...prevstate, [name]: value }));
//   };

//   return (
//     <div id={"cyp_authform"}>
//       <h1 className="lblcomplete">Complete Your Profile</h1>
//       <br />
//       <div className="Cyp" style={{ marginTop: 30 }}>
//         <div className="inputs_cyp">
//           <div
//             style={{
//               width: "50%",
//               marginRight: "10%",
//               display: "inline-block",
//             }}
//           >
//             <label>Name</label>
//             <br></br>
//             <input
//               type="username"
//               placeholder=""
//               name="name"
//               onChange={handleChange}
//               value={user.name}
//             ></input>
//           </div>
//           <div style={{ width: "40%", display: "inline-block" }}>
//             <label>SID</label>
//             <br></br>
//             <input
//               type="text"
//               placeholder=""
//               name="sid"
//               onChange={handleChange}
//               value={user.sid}
//             ></input>
//           </div>
//         </div>
//         <div id="nxt" onClick={updateProfile}>
//           Next
//         </div>
//       </div>
//     </div>
//   );
// };

export default CompleteYourProfile;
