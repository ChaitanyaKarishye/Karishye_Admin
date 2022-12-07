const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');

const usersRoutes = require('./routes/users');

const karusersRoutes = require('./routes/karusers');

const booking_participantsRoutes = require('./routes/booking_participants');

const pujarisRoutes = require('./routes/pujaris');

const pujari_applicationsRoutes = require('./routes/pujari_applications');

const pujasRoutes = require('./routes/pujas');

const puja_samagri_mappingsRoutes = require('./routes/puja_samagri_mappings');

const samagriRoutes = require('./routes/samagri');

const booking_samagri_mappingsRoutes = require('./routes/booking_samagri_mappings');

const bookingsRoutes = require('./routes/bookings');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Karishye_Admin',
      description:
        'Karishye_Admin Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/karusers',
  passport.authenticate('jwt', { session: false }),
  karusersRoutes,
);

app.use(
  '/api/booking_participants',
  passport.authenticate('jwt', { session: false }),
  booking_participantsRoutes,
);

app.use(
  '/api/pujaris',
  passport.authenticate('jwt', { session: false }),
  pujarisRoutes,
);

app.use(
  '/api/pujari_applications',
  passport.authenticate('jwt', { session: false }),
  pujari_applicationsRoutes,
);

app.use(
  '/api/pujas',
  passport.authenticate('jwt', { session: false }),
  pujasRoutes,
);

app.use(
  '/api/puja_samagri_mappings',
  passport.authenticate('jwt', { session: false }),
  puja_samagri_mappingsRoutes,
);

app.use(
  '/api/samagri',
  passport.authenticate('jwt', { session: false }),
  samagriRoutes,
);

app.use(
  '/api/booking_samagri_mappings',
  passport.authenticate('jwt', { session: false }),
  booking_samagri_mappingsRoutes,
);

app.use(
  '/api/bookings',
  passport.authenticate('jwt', { session: false }),
  bookingsRoutes,
);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
