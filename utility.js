module.exports = {
    sanitizeInput: function(input){
        return input
        .replace(/[^a-z0-9&<>áéíóúñü \.,_-]/gim,'')
        .replace(/&/gim,'&amp;')
        .replace(/</gim,'&lt;')
        .replace(/>/gim,'&gt;')
        .trim();
    },

    isUsernameValid(username){
        const invalidUsernames = [
            'dog',
            'cat',
            'void'
        ];

        return !invalidUsernames.includes(username);
    }
}