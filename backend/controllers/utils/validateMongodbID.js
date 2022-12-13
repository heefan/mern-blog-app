const mongoose = require('mongoose')

const validateMongodbID = id => { return
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) {
        throw new Error('User id is not a valid or found')
    }
}

module.exports = validateMongodbID;