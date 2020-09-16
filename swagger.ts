export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Todo API',
        description: 'API of the vanilla TODO project',
        termsOfService: '',
        contact: {
            name: 'Maxime leriche',
            email: 'maxleriche.60@gmail.com',
            url: 'https://maxleriche.tech'
        },
        host:"localhost:3000",
        basePath:'/',
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        },
        basedir:__dirname,
        files: ['.Routes/**/*.js']
    }
}