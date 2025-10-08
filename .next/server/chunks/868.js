"use strict";
exports.id = 868;
exports.ids = [868];
exports.modules = {

/***/ 1868:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I8": () => (/* binding */ auth)
/* harmony export */ });
/* unused harmony exports authenticateUser, generateToken */
// Simulación simple de autenticación para el frontend
// En producción, esto se manejará desde el backend
// Simular autenticación de usuario
const authenticateUser = async ({ email , password  })=>{
    // Simular validación de credenciales
    if (email && password) {
        return {
            id: "1",
            email: email,
            name: "Administrador"
        };
    }
    return null;
};
// Simular generación de token
const generateToken = (user)=>{
    // En producción, esto sería un JWT real
    return `token_${user.id}_${Date.now()}`;
};
// Simular estado de autenticación
let isAuthenticated = false;
let currentUser = null;
const auth = {
    // Simular login
    login: (email, password)=>{
        return new Promise((resolve)=>{
            // Simular delay de API
            setTimeout(()=>{
                // Simular credenciales válidas
                if (email && password) {
                    isAuthenticated = true;
                    currentUser = {
                        id: "1",
                        email: email,
                        name: "Administrador"
                    };
                    resolve({
                        success: true,
                        user: currentUser
                    });
                } else {
                    resolve({
                        success: false,
                        error: "Credenciales requeridas"
                    });
                }
            }, 1000);
        });
    },
    // Simular logout
    logout: ()=>{
        isAuthenticated = false;
        currentUser = null;
    },
    // Verificar si está autenticado
    isAuthenticated: ()=>{
        return isAuthenticated;
    },
    // Obtener usuario actual
    getCurrentUser: ()=>{
        return currentUser;
    }
};


/***/ })

};
;