// eslint-disable-next-line @typescript-eslint/no-var-requires
const scanner = require("sonarqube-scanner");

console.log("Running sonar scanner");

scanner(
  {
    serverUrl : "https://sonar.zhaw.neat.moe",
    token : process.env.SONAR_TOKEN,
    options: {
      "sonar.projectName": "Loganalyser Frontend",
      "sonar.sources": "src",
      "sonar.projectKey": "ch.zhaw.pm4.loganalyser_frontend"
      //"sonar.tests": "specs"
    }
  },
  () => process.exit()
);