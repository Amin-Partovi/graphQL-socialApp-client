import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import MenuBar from "./components/MenuBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Container } from "semantic-ui-react";
import "./App.css";
import { AuthProvider } from "./context/authContext";
import AuthRoute from "./util/AuthRoute";
import SinglePost from "./pages/SinglePost";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <AuthRoute exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
