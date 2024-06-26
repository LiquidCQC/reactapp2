import React from 'react'; // Import React for JSX syntax
import logo from './logo.svg';
import './App.css';
import { AwsRum } from 'aws-rum-web';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';

let awsRum = null;
try {
  const config = {
    sessionSampleRate: 1,
    identityPoolId: "eu-west-3:af8d455a-0128-414a-b04f-3d2cce2e8ff0",
    endpoint: "https://dataplane.rum.eu-west-3.amazonaws.com",
    telemetries: ["performance", "errors", "http"],
    allowCookies: true,
    enableXRay: false
  };

  const APPLICATION_ID = 'feabfc04-03d6-4c1c-b1ec-feccbad38a9f';
  const APPLICATION_VERSION = '1.0.0';
  const APPLICATION_REGION = 'eu-west-3';

  awsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
}

const App = () => {
  return (
    <Router>
      <div className="App"> {/* Apply CSS class for styling */}
        <header className="App-header"> {/* Define a header section */}
          <img src={logo} className="App-logo" alt="React Logo" /> {/* Render React logo */}
          <h1>Hello!</h1> {/* Add the "Hello World" message */}
        </header>
        <nav>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/about">About</Link></p>
          <p><Link to="/users">Users</Link></p>
        </nav>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/*" element={<User />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

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

export default App;
