var apiClient = (client, domain) => ({
    requestToken : (username, password) =>  client.postRequest('/token', { username, password, domain }),
    getGames: (token, player) => client.withToken(token).getRequest(`/games?domain=${domain}&username=${player}`),
    createUser: (token, username, password) => client.withToken(token).postRequest('/users', { username, password , domain, role: "USER" })
});

export default apiClient;