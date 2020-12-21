module.exports = {
  apps: [
    {
      name: "react-spotify",
      script: "./index.js",
      env: {
        NODE_ENV: "development",
        REACT_APP_DOMAIN: "http://localhost",
        REACT_APP_PORT: "5000"
      },
      env_production: {
        NODE_ENV: "production",
        REACT_APP_DOMAIN: "https://aws.koumakan.work",
        REACT_APP_PORT: "50070"
      }
    }
  ]
};
