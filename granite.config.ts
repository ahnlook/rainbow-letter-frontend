import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'rainbowletterapp',
  brand: {
    displayName: '무지개편지', // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: '#3182F6', // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: 'https://static.toss.im/appsintoss/8603/6766c896-da95-40b6-836e-749e26b1171d.png', // 화면에 노출될 앱의 아이콘 이미지 주소로 바꿔주세요.
  },
  web: {
    host: 'localhost',
    port: 3000,
    commands: {
      dev: 'npm run start',
      build: 'npm run build',
    },
  },
  permissions: [],
  outdir: 'build',
});
