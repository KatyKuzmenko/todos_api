const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST || 'castor.db.elephantsql.com',
    port: env.DB_PORT || '5432',
    user: env.DB_USER || 'xzxkinwg',
    password: env.DB_PASSWORD || 'p4NtPd4WwAVOBekO6_pvriEKoyvToKEK',
    database: env.DB_NAME || 'xzxkinwg',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
