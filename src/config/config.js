module.exports = {
    authentication: {
       jwtSecret: process.env.JWT_SECRET_KEY || 'default'
    },
    use_env_variable: process.env.MONGO_DB_URL
}
