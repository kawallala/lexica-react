import { Grid, Button } from "@mui/material";
import { Favorite, Star, Search  } from "@mui/icons-material";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import "./LexicaImage.css";

const LexicaImage = (props) => {
  const { data } = props;
  return (
    <div className="lexica-image-container">
      <img className="lexica-image" src={data.srcSmall} alt="Lexica Image" />
      <div className="lexica-image-overlay"></div>
      <div className="lexica-image-text">{data.prompt}</div>
      <div className="lexica-image-buttons">
        <Button className="lexica-image-button-top-left">
        <Search />
        </Button>
        <div className="lexica-image-buttons-top-right">
          <Button>
            <Favorite />
          </Button>
          <Button>
            <AutoFixHighIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LexicaImage;
