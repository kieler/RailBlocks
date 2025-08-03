// FILE THAT VITE LOADS SETTINGS FOR THE FRONTEND FOR

export default {
  server: {
    // Pipeline shared by backend.
    proxy: {
      '/api': 'http://localhost:5001'
    },
    // Port of the frontend.
    port: 5000
  }
}
