import logo from "./logo.svg";
import "./App.css";
import { Button, Grid, Slider, TextField } from "@mui/material";
import LexicaImage from "./LexicaImage";
import { useState, useEffect, useRef } from "react";
import Masonry from "masonry-layout";

function App() {
  let numrows = 50;
  const gridRef = useRef(null);
  const [sliderValue, setSliderValue] = useState(8);
  const [apiData, setApiData] = useState([]);
  const masonryRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("apples");

  const fetchData = () => {
    fetch(`https://lexica.art/api/v1/search?q=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response data here
        setApiData(data.images);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      masonryRef.current = new Masonry(gridRef.current, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
        horizontalOrder: true,
      });
    }
  }, [apiData]);

  useEffect(() => {
    if (masonryRef.current) {
      masonryRef.current.layout();
    }
  }, [sliderValue]);

  return (
    <div className="App">
      <div className="App-body">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Lexica is hiring! <a>Learn more</a>
        </p>
        <TextField
          id="outlined-basic"
          label="Search for an image"
          variant="filled"
          style={{ width: "50%", backgroundColor: "gray" }}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <div>
          <Button variant="contained" onClick={fetchData}>Search</Button>
          <Button variant="contained">Generate</Button>
        </div>
        <p>Columns:{sliderValue}</p>
        <Slider
          defaultValue={8}
          aria-label="Default"
          valueLabelDisplay="auto"
          min={1}
          max={12}
          onChange={(event, newValue) => setSliderValue(newValue)}
        />
        <div ref={gridRef} className="grid">
          <div
            className="grid-sizer"
            style={{ width: `calc((100% - 16px) / ${sliderValue})` }}
          ></div>
          {apiData.map((item, i) => (
            <div
              key={i}
              className="grid-item"
              style={{ width: `calc((100% - 16px) / ${sliderValue})` }}
            >
              <LexicaImage data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
