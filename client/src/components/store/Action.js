function setUser(user = null) {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export {setUser}