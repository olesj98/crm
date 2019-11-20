module.exports.overview = function(req, res) {
    res.status(200).json({
        analitics: "overview"
    })
}

module.exports.analitics = function(req, res) {
    res.status(200).json({
        analitics: "analitics"
    })
}