
# React app 2
Second iteration of a simple Hello World App for my DevoOps ECF.

This project is meant to be part of an evaluation to train about CI/CD Pipeline.

# Pipeline.
Buildspec.yml  allow us to install the app 
```
npm install
```
then install the react router & aws rum for monitoring
```
npm install aws-rum-web react-router-dom
```
then the app is Build
```
npm Build
```
The rest of the code is to manage artifacts

# App through CI/CD
Appspec.yml  is meant to create the app
This file will allow user ec2-user to run 3 script to deploy the app in the 
```
/server
```
# Monitoring
App.js as been modify to create multiple link and redirection to multiple pages.
This modification allow AWS RUM to interact with the app. Data about the app usage is downstream to AWS RUM Dashboard allowing us to have a optimized monitoring of our app.
