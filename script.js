document.getElementById('urlForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const longUrl = document.getElementById('longUrl').value;
  const apiKey = 'Z3MoyT3YmT7Fpk8XqzWvZQPM';
  const workspaceId = 'ws_clxditmqc000cya1pht2udfn0';
  const apiUrl = 'https://api.dub.co/shorten';

  console.log('Long URL:', longUrl);
  console.log('API Key:', apiKey);
  console.log('Workspace ID:', workspaceId);

  try {
    console.log('Starting axios request...');
    const response = await axios.post(apiUrl, { url: longUrl }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Workspace-Id': workspaceId
      }
    });

    console.log('Axios response received. Status:', response.status);

    if (response.status === 200) {
      const data = response.data;
      console.log('Response data:', data);

      if (data.shortUrl) {
        const resultDiv = document.getElementById('result');
        const shortUrlLink = document.getElementById('shortUrl');

        shortUrlLink.href = data.shortUrl;
        shortUrlLink.textContent = data.shortUrl;
        resultDiv.classList.remove('hidden');
      } else {
        alert('Failed to shorten the URL. Please try again.');
        console.error('Error response:', data);
      }
    } else {
      alert(`An error occurred. Status: ${response.status}`);
      console.error('Error response:', response.data);
    }
  } catch (error) {
    alert('An error occurred. Please try again.');
    console.error('Error:', error);
  }
});