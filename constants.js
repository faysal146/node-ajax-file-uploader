module.exports = {
    port: 2000,
    server_path:
        process.env.NODE_ENV === 'production'
            ? '/upload'
            : 'http://localhost:2000/upload',
};
