import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const serverUrl = process.env.VITE_SERVER_URL;
const googleLoginUrl = process.env.VITE_GOOGLE_LOGIN_URL;
const naverLoginUrl = process.env.VITE_NAVER_LOGIN_URL;
const KakaoMapKey = process.env.VITE_KAKAO_MAP_API_KEY;

export { serverUrl, googleLoginUrl, naverLoginUrl };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
