function setToken(userToken, storage) {
    if (storage === "on") {
        sessionStorage.setItem('auth', JSON.stringify(userToken));
    } else {
        localStorage.setItem('authLocal', JSON.stringify(userToken));
    }


}
function getToken() {
    const tokenStringLoc = localStorage.getItem('authLocal')
    const tokenString = sessionStorage.getItem('auth');

    // if()
    console.log(tokenString);
    if (tokenString !== null) {
        const userToken = JSON.parse(tokenString);

        return userToken
    }else{
        const userToken = JSON.parse(tokenStringLoc);

        return userToken
    }


}

export { getToken, setToken }