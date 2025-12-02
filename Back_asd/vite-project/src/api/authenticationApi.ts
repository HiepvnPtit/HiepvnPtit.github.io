// src/api/authenticationApi.ts

// Để rỗng để Proxy hoạt động
const API_URL = "https://okhiepkkkkkkkkkkkkhahahahahahahaha.up.railway.app"; 

// Định nghĩa kiểu dữ liệu gửi lên
export interface LoginDto {
    username: string;
    password: string;
}

// Hàm fetch chung (đã type-safe)
async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem('authToken');
    
    // Xử lý Headers an toàn với TypeScript
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string> || {})
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        ...options,
        headers: headers
    };

    const res = await fetch(url, config);

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || res.statusText || 'Request failed');
    }

    // Kiểm tra 204 No Content hoặc response rỗng
    const contentType = res.headers.get('content-type');
    if (res.status === 204 || !contentType || !contentType.includes('application/json')) {
        return null;
    }

    return res.json();
}

export const loginAuthentication = async (loginDto: LoginDto) => {
    const response = await fetchWithAuth(`${API_URL}/authentication/token`, {
        method: "POST",
        body: JSON.stringify(loginDto),
    });

    // Ép kiểu hoặc kiểm tra an toàn
    if (response && response.result && response.result.token) {
        localStorage.setItem('authToken', response.result.token);
    } else {
        console.warn("Token not found in response:", response);
    }
    
    return response;
};