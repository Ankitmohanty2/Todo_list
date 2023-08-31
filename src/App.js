import { Container } from '@mui/material';
import { containerStyle } from './theme/customStyles';
import ToDo from './pages/ToDo';

const App = () => {
  return (
    <>
      <Container sx={containerStyle}>
        <ToDo />
      </Container>
    </>
  );
};

export default App;
