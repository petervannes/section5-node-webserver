const express = require('express');
const hbs = require('hbs');
const dateFormat = require('dateformat');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.use((request, response, next) => {
  var time = new Date().getTime().toString();
  var now = dateFormat(new Date(), "h:MM:ss");
  var log = `${now} : ${request.method} ${request.url }`;

  console.log(`${log}`);
  fs.appendFile('logger.log', log + '\n', (err) => {
    if (err) {
      console.log('Something went wrong while logging data');
    }
  });
  next();
})

// app.use((request, response, next) => {
//   response.render('maintenance.hbs', {
//     pageTitle: "Sorry",
//     welcomeMessage: "The site is currently undergoing some maintenance"
//   });
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (shout) => {
  // return shout.toUpperCase();
  return new hbs.SafeString(
    `<p style = "text-transform: uppercase"> ${shout} </p>`
  );
});


app.get('/', (request, response) => {

  response.render('home.hbs', {
    pageTitle: "Home Page",
    welcomeMessage: "Hi there  !"
  });
  // response.send('<H1>Hi!</H1>');
  // response.send({
  //   name: 'Peter',
  //   address: 'Rotterdam',
  //   quarter: 'Delfshaven',
  //   location: {
  //     lat: 2.3545,
  //     long: 443.34343
  //   }
  // })
});

app.get('/about', (request, response) => {
  // response.send('<h1>about page</h1>');
  response.render('about.hbs', {
    pageTitle: "About Page"

  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Made a booboo?'
  });
})


app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
});
