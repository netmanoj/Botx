<h1 align="center">🚀 Google Gemini Chatbot</h1>  

<p align="center">A fast and responsive chatbot using the Google Gemini API, built with Next.js and featuring a sleek Neubrutalism-inspired UI.</p>  

---

## 🖥️ Tech Stack  
<ul>
  <li><b>Next.js</b> – A fast React framework for server-side and client-side rendering.</li>
  <li><b>Google Gemini API</b> – AI-powered conversational intelligence from Google.</li>
  <li><b>Neubrutalism UI</b> – Bold, high-contrast design with sharp edges and vibrant colors.</li>
</ul>  

---

## ⚠️ Important Note  
<p>
This app runs fully on the <b>client side</b>, which means the API key is exposed to the client. 
<b>It’s not recommended</b> to expose your Google Gemini API key in a client-side application because:
</p>  

<ul>
  <li>API keys can be accessed through browser developer tools.</li>
  <li>If your key is exposed, it can be abused by others.</li>
  <li>Google may disable your key if it detects suspicious activity.</li>
</ul>  

👉 <b>For production use, consider setting up a secure backend to handle API requests.</b>  

---

## 🎨 UI Design  
<p>The chatbot follows a sleek <b>Neubrutalism-inspired UI</b>, featuring:</p>  

✅ Bold, contrasting colors  
✅ Clean, geometric design  
✅ Minimalist yet functional layout  

---

## 🌐 Setup & Installation  
<ol>
  <li>
    <b>Clone the Repository:</b>
    <pre><code>git clone https://github.com/your-username/gemini-chatbot.git  
cd gemini-chatbot</code></pre>
  </li>  

  <li>
    <b>Install Dependencies:</b>
    <pre><code>npm install</code></pre>
  </li>  

  <li>
    <b>Add Your API Key:</b>
    <p>Create a <code>.env.local</code> file and add your Google Gemini API key:</p>
    <pre><code>NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key</code></pre>
  </li>  

  <li>
    <b>Start the Development Server:</b>
    <pre><code>npm run dev</code></pre>
  </li>  

  <li>
    <b>Open in Browser:</b>
    <p>Visit: <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></p>
  </li>  
</ol>  

---

## 🚧 Limitations  
<ul>
  <li>The app is running fully on the client side, which may lead to API key exposure.</li>
  <li>For secure deployment, use a backend proxy to handle API calls.</li>
</ul>  


<p align="center">🔐 <b>Security Tip:</b> Never expose API keys directly in a client-side app!</p>  
