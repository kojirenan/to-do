require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

module.exports = {
    development: {
        dialect: 'postgres',
        username: PGUSER,
        password: PGPASSWORD,
        database: PGDATABASE,
        host: PGHOST,
        port: 5432,
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        connection: {
            options: `project=${ENDPOINT_ID}`,
        },
        define: {
            timestamp: true,
            underscored: true,
        },
    },
};
