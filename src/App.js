import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { AwsRum, AwsRumConfig } from 'aws-rum-web';

// Components for routes
function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return (
    <div>
      <h2>Users</h2>
      <p><Link to="/user/1">User 1</Link></p>
      <p><Link to="/user/2">User 2</Link></p>
      <p><Link to="/user/3">User 3</Link></p>
    </div>
  );
}

function User() {
  const location = useLocation();
  const user = location.pathname.split('/').pop();
  return <h2>User: {user}</h2>;
}

function Welcome() {
  // deliberate error
  // `this` is not defined, will throw an error
  return <h2>Welcome {this.subject.toUpperCase()}</h2>;
}

// Main App component
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hello World =)
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <nav>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/about">About</Link></p>
          <p><Link to="/users">Users</Link></p>
          <p><Link to="/welcome">Welcome</Link></p>
        </nav>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

// AWS RUM Configuration
try {
  const config: AwsRumConfig = {
    sessionSampleRate: 1,
    identityPoolId: "eu-west-3:af8d455a-0128-414a-b04f-3d2cce2e8ff0",
    endpoint: "https://dataplane.rum.eu-west-3.amazonaws.com",
    telemetries: ["performance", "errors", "http"],
    allowCookies: true,
    enableXRay: false
  };

  const APPLICATION_ID: string = 'feabfc04-03d6-4c1c-b1ec-feccbad38a9f';
  const APPLICATION_VERSION: string = '1.0.0';
  const APPLICATION_REGION: string = 'eu-west-3';

  const awsRum: AwsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
  console.error('Error initializing AWS RUM:', error);
}

export default App;
