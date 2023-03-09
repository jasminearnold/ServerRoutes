import http from "http";
import fetch from "node-fetch";


const server = http
  .createServer((req, res) => {
    const url = req.url;
    let tableData = "<table border '1'><tr><th>name</th><th>height</th><th>birthyear</th><th>gender</th><th>url</th></tr>"
    if (url === "/") {
      res.write(
        "<h1>Welcome</h1> <img src=https://dummyimage.com/600x400/000/fff>"
      );
      res.end();
    }

    if (url === "/errorpage") {
      res.write("Page Not Found" );
      res.end();
    }
    if (url === "/list") {
      fetch("https://swapi.dev/api/people")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.results);
            createData(data.results);
          res.write(tableData);
          res.end();
        });
    }

    function createData(data) {
     data.forEach(element => {
        tableData +=`<tr><td>${element.name}</td><td>${element.height}</td><td>${element.birth_year}</td><td>${element.gender}</td><td>${element.url}</td></tr>`
     });
     tableData += `</table>`;
     
    }



  }) .listen(8090, console.log("server is listening on port " +8090))
