import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import TextField from "@mui/material/TextField";
import Confession from "./confessions";
import axios from "axios";
import moment from "moment-timezone";

const StudentList = [
  { name: "Today" },
  { name: "Institution" },
  { name: "Express" },
  { name: "Feelings" },
  // { name: "Most Reacted" },
];

const Confess = () => {
  const [alignment, setAlignment] = useState("Feelings");
  const [enable, setEnabled] = useState(false);
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // const handleChange2 = (event, newConfession) => {
  //   setSelectConfessions(newConfession);
  // };

  const [confession, setConfession] = useState("");
  const [confessionList, setConfessionList] = useState([]);
  const [valueTags, setValueTags] = useState([]);

  const handleConfess = (event) => {
    setConfession(event.target.value);
  };

  const handlePost = async () => {
    if (confession === "") {
      alert("Confession Can't Be EMPTY");
      return;
    }
    try {
      setEnabled(true);
      const Time = moment().format("DD/MM/YYYY");
      const data = {
        text: confession,
        confession_no: confessionList.length + 1,
        genre: alignment,
        emojis: 0,
        confessedOn: Time,
      };
      await axios.post("/confess", data);
      setConfessionList([data, ...confessionList]);
      setConfession("");
    } catch {
      console.log("Unable To POST");
    } finally {
      setEnabled(false);
    }
  };

  useEffect(() => {
    const getdata = async () => {
      setConfessionList([]);
      const res = await axios.get("/confessionList");
      res.sort(function (a, b) {
        return a.confession_no > b.confession_no;
      });
      const revLis = res.data.reverse();
      setConfessionList(revLis);
    };
    getdata();
  }, []);

  function func(ele) {
    let c = valueTags.length ? 0 : 1;
    valueTags.forEach((element) => {
      if (element.name == "Today") {
        const Time = moment().format("DD/MM/YYYY");
        if (ele.confessedOn == Time) {
          c = 1;
        }
      } else if (element.name === ele.genre) {
        c = 1;
      }
    });
    return c;
  }

  const handletags = async (event, value) => {
    setValueTags(value);
  };

  const handleSelect = async (emoji_id, confess_id, countrec) => {
    let List = confessionList;
    List[confess_id - 1].emojis = countrec;
    setConfessionList(List);
    const data = {
      emoji_id: emoji_id,
      confess_id: confess_id,
      totalrec: countrec,
    };
    await axios.post("/UpdateEmojis", data);
  };

  return (
    <div className="confession">
      <div className="fixed w-[100%] bg-white z-10">
        <Navbar />
        <div className="confesswritten my-8 text-center w-[80%] mx-auto">
          <TextareaAutosize
            maxRows={2}
            aria-label="maximum height"
            placeholder="Write Confession here ..."
            onChange={handleConfess}
            value={confession}
            style={{
              width: "100%",
              border: "1px solid grey",
              padding: "10px",
              maxHeight: "60px",
            }}
          />
          <div className="mx-auto text-left">
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="Feelings">Feelings</ToggleButton>
              <ToggleButton value="Institution">Institution</ToggleButton>
              <ToggleButton value="Express">Express</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="my-8 text-center">
            <Button disabled={enable} variant="contained" onClick={handlePost}>
              POST
            </Button>
          </div>
        </div>
        <div className="border-2 w-[90%] mx-auto py-8 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg">
          <div className="flex flex-row justify-center">
            {/* <ToggleButtonGroup
              sx={{
                display: "inline-block",
                marginTop:"5px"
              }}
              color="primary"
              value={selectConfessions}
              exclusive
              onChange={handleChange2}
              aria-label="Platform"
            >
              <ToggleButton value="All">All</ToggleButton>
              <ToggleButton value="Today">Today</ToggleButton>
              <ToggleButton value="Most_Liked">Most Liked</ToggleButton>
            </ToggleButtonGroup> */}
            <Autocomplete
              sx={{
                width: "90%",
                backgroundColor: "white",
                display: "inline-block",
              }}
              multiple
              id="tags-outlined"
              options={StudentList}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              onChange={handletags}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search By Tags"
                  placeholder="Search By Tags"
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="py-2 mx-[5%] w-[90%] absolute my-[400px]">
        {confessionList
          .filter((ele) => {
            return func(ele);
          })
          .map((data, index) => (
            <Confession
              id={data.confession_no}
              key={index}
              text={data.text}
              genre={data.genre}
              emojis={data.emojis}
              date={data.confessedOn}
              onSelect={handleSelect}
            />
          ))}
      </div>
    </div>
  );
};

export default Confess;
