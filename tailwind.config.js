/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'], // 프로젝트에 맞는 확장자 추가
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(0, 0, 0, 0)' },
          '50%': { boxShadow: '0 0 10px rgba(66, 153, 225, 0.5)' },
        },
        moveLeftRight: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '50%': { transform: 'translateX(10px)' },
          '75%': { transform: 'translateX(-10px)' },
          '100%': { transform: 'translateX(0)' },
        },
        franticFlash: {
          // 새로운 애니메이션 정의
          '0%': { backgroundColor: '#ff0000', transform: 'scale(1)' },
          '25%': { backgroundColor: '#00ff00', transform: 'scale(1.1)' },
          '50%': { backgroundColor: '#0000ff', transform: 'scale(0.9)' },
          '75%': { backgroundColor: '#ffff00', transform: 'scale(1.05)' },
          '100%': { backgroundColor: '#ff00ff', transform: 'scale(1)' },
        },
      },
      animation: {
        blink: 'blink 0.5s ease-in-out',
        glow: 'glow 1s ease-in-out infinite',
        moveLeftRight: 'moveLeftRight 2s infinite',
        franticFlash: 'franticFlash 0.5s ease-in-out', // 새 애니메이션 추가
      },
    },
  },
  plugins: [],
};
