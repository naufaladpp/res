module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      creator: "XGunzzzMC",
      status: 405,
      response: "Request hanya untuk Method: 'POST'" });
  }
  const { userText } = req.body

  if (!userText) {
    return res.status(400).json({ 
      status: 400,
      creator: "XGunzzzMC",
      response: "Tidak ada 'userText' parameter pesan",
    });
  }

  try {
    const response = await fetch(`https://xaipost.vercel.app/api/gemini`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userText,
      }),
    })
    const data = await response.json();
    
    res.status(200).json({
      success: true,
      status: 200,
      creator: "XGunzzzMC",
      response: data.response,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      status: 500,
      creator: "XGunzzzMC",
      response: "Server mengalami error"
    });
  }
};