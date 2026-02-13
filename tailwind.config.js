/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'float-slow': 'float 6s ease-in-out infinite',
                'float-medium': 'float 4s ease-in-out infinite',
                'float-fast': 'float 2s ease-in-out infinite',
                'aurora': 'aurora 60s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                aurora: {
                    from: { backgroundPosition: "50% 50%, 50% 50%" },
                    to: { backgroundPosition: "350% 50%, 350% 50%" },
                },
            }
        },
    },
    plugins: [],
}
