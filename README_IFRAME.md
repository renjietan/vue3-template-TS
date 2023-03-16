- TS
  - 默认导出路径
    "paths": {
        "@/*": ["src/*"]
	}
- vite
  - 默认资源包转义路径: vite.config.js
    const alias: Record<string, string> = {
        '@': pathResolve('./src/'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    };
- 