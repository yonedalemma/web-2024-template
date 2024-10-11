import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Typography, Button, Container, Box } from "@mui/material";
import { BalanceWheel } from "./components";

const App = () => {
  return (
    <Router>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Планирование жизни
          </Typography>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/balance-wheel" element={<BalanceWheel />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

const HomePage = () => (
  <Box>
    <Typography variant="h5" gutterBottom>
      Выберите инструмент:
    </Typography>
    <Button component={Link} to="/balance-wheel" variant="contained" color="primary">
      Колесо баланса
    </Button>
  </Box>
);

export default App;
