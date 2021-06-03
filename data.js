const axios = require('axios');

axios.get("https://api.spacexdata.com/v4/roadster")
.then(response=>console.log(response.data))