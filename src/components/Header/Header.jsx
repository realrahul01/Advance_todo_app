import {Container,Navbar} from 'react-bootstrap';

const Header = ()=>{
    return(
        <Navbar bg="primary" data-bs-theme="dark">
        <Container style={{fontWeight:700,fontStyle:'italic'}}>
          <Navbar.Brand href="#">Advance Todo_App</Navbar.Brand>
        </Container>
      </Navbar>
    )
}
export default Header;