// src/App.tsx
import { useState } from 'react';
import './App.css';
import { loginAuthentication } from './api/authenticationApi';
import type { LoginDto } from './api/authenticationApi';

function App() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    // Tạo object đúng chuẩn Interface đã định nghĩa
    const loginDto: LoginDto = {
      username: username,
      password: password,
    };

    try {
      console.log("Sending:", loginDto);
      const response = await loginAuthentication(loginDto);
      
      console.log("Success:", response);
      alert("Đăng nhập thành công! Check Console.");
      
    } catch (error: any) {
      console.error("Error:", error);
      alert("Đăng nhập thất bại: " + (error.message || "Unknown error"));
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login (TSX Version)</h2>
      
      <div style={{ marginBottom: 10 }}>
        <input 
          type="text" 
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleLogin}>
        Đăng nhập
      </button>
    </div>
  );
}

export default App;