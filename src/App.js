import logo from './logo.svg';
import './App.css';
import { AwsRum, AwsRumConfig } from 'aws-rum-web';

function App() {
  return (
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
    </div>
  );
}

try {
  const config: AwsRumConfig = {
    sessionSampleRate: 1,
    identityPoolId: "eu-west-3:af8d455a-0128-414a-b04f-3d2cce2e8ff0",
    endpoint: "https://dataplane.rum.eu-west-3.amazonaws.com",
    telemetries: ["performance","errors","http"],
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
}  

export default App;
