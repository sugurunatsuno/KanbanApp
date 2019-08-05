const bodyParser = require('body-parser')

module.exports = app => {
    app.use(bodyParser.json())

    // todo:ここにAPIのモックを書く
}