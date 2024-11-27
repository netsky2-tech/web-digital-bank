export async function rewrites() {
    return [
        {
            source: '/api/:path*',
            destination: 'https://api-sandbox.lafise.com/:path*', // Redirigir las solicitudes API a la URL real
        },
    ];
}