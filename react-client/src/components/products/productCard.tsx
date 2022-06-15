import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardHeader,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ProductDto } from "../../types/types";

export function ProductCard(product: ProductDto) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={product.name} subheader={product.city} />
      <CardMedia
        component="img"
        alt="palju photo"
        height="340"
        image={product.photos[0].url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div"></Typography>
        <Typography variant="body2" color="text.secondary">
          {product.introduction}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to={`/palju/${product.name}`}>Tilaa</Link>
        </Button>
      </CardActions>
    </Card>
  );
}
