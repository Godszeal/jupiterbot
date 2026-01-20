const FormData = require('form-data');
const https = require('https');

async function remini(imageBuffer, model = 'enhance') {
  return new Promise((resolve, reject) => {
    // Validate and sanitize model parameter
    const validModels = ['enhance', 'recolor', 'dehaze'];
    if (!validModels.includes(model)) {
      model = 'enhance';
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('model_version', 1, {
      contentType: 'multipart/form-data; charset=utf-8',
      header: { 'Content-Transfer-Encoding': 'binary' }
    });
    formData.append('image', imageBuffer, {
      filename: 'enhance_image_body.jpg',
      contentType: 'image/jpeg'
    });

    // Configure request options
    const options = {
      hostname: 'inferenceengine.vyro.ai',
      path: `/${model}`,
      method: 'POST',
      headers: {
        ...formData.getHeaders(),
        'User-Agent': 'okhttp/4.9.3',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip'
      }
    };

    // Create request
    const req = https.request(options, (res) => {
      const chunks = [];
      
      res.on('data', (chunk) => {
        chunks.push(chunk);
      });
      
      res.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
    });
    
    // Handle request errors
    req.on('error', reject);
    
    // Send form data
    formData.pipe(req);
  });
}

module.exports = { remini };