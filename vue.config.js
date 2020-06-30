const baseUrl = 'http://127.0.0.1:8000';
module.exports = { 
  devServer: { 
    proxy: { 
      '/api': { 
        target: baseUrl, 
        ws: true, 
        secure: false 
      } 
    } 
  } 
}