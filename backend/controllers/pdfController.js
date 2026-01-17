const axios = require('axios');
const FormData = require('form-data');

const analyzePdf = async (req, res) => {
  try {
    console.log('PDF analyze request received');
    console.log('File:', req.file ? req.file.originalname : 'No file');
    console.log('NGROK_PDF_API:', process.env.NGROK_PDF_API);
    
    if (!req.file || !req.file.originalname.toLowerCase().endsWith('.pdf')) {
      return res.status(400).json({ error: 'PDF file required' });
    }

    const formData = new FormData();
    formData.append('file', req.file.buffer, req.file.originalname);

    const response = await axios.post(process.env.NGROK_PDF_API, formData, {
      headers: formData.getHeaders()
    });

    console.log('Model response received:', response.status);
    console.log('Model response data:', JSON.stringify(response.data, null, 2));
    res.json(response.data);
  } catch (error) {
    console.error('PDF Analysis Error:', error.message);
    console.error('Error details:', error.response?.data);
    res.status(500).json({ error: error.response?.data?.detail || error.message });
  }
};

module.exports = { analyzePdf };