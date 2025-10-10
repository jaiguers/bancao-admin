"use strict";
exports.id = 868;
exports.ids = [868];
exports.modules = {

/***/ 1868:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I8": () => (/* binding */ auth)
/* harmony export */ });
/* unused harmony exports getToken, getCurrentUser, setAuthData, clearAuthData, isAuthenticated, authenticateUser, logout, generateToken */
// Sistema de autenticación con backend real
// Claves para localStorage
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";
// Obtener token del localStorage
const getToken = ()=>{
    if (false) {}
    return null;
};
// Obtener usuario del localStorage
const getCurrentUser = ()=>{
    if (false) {}
    return null;
};
// Guardar datos de autenticación
const setAuthData = (token, user)=>{
    if (false) {}
};
// Limpiar datos de autenticación
const clearAuthData = ()=>{
    if (false) {}
};
// Verificar si está autenticado
const isAuthenticated = ()=>{
    const token = getToken();
    return !!token;
};
// Autenticar usuario con backend
const authenticateUser = async ({ email , password  })=>{
    try {
        const backendUrl = "http://localhost:8080/api/" || 0;
        const response = await fetch(`${backendUrl}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        return null;
    } catch (error) {
        console.error("Error en autenticaci\xf3n:", error);
        return null;
    }
};
// Función de logout
const logout = ()=>{
    clearAuthData();
};
// Objeto auth para compatibilidad
const auth = {
    login: async (email, password)=>{
        const result = await authenticateUser({
            email,
            password
        });
        if (result) {
            setAuthData(result.token, result.user);
            return {
                success: true,
                user: result.user
            };
        }
        return {
            success: false,
            error: "Credenciales inv\xe1lidas"
        };
    },
    logout,
    isAuthenticated,
    getCurrentUser
};
function generateToken(user) {
    // Mock JWT token generation (replace with real implementation as needed)
    // Example: base64 encode user id and email
    const header = Buffer.from(JSON.stringify({
        alg: "HS256",
        typ: "JWT"
    })).toString("base64");
    const payload = Buffer.from(JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    })).toString("base64");
    const signature = "mock-signature";
    return `${header}.${payload}.${signature}`;
}


/***/ })

};
;