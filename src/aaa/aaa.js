const request = require("request");

async function main() {
  var options = {
    method: "POST",
    url: "https://aip.baidubce.com/oauth/2.0/token?client_id=&client_secret=&grant_type=client_credentials",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}

main();
