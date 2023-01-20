export default () => ({
    cmsAuthToken: process.env.CMS_AUTH_TOKEN,
    cmsFetchbBaseURL: process.env.CMS_DATA_BASE_URL
    // database: {
    //   host: process.env.DATABASE_HOST,
    //   port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    // }
  });
