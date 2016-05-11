'use strict'
exports.handleInvalidJson = (error, req, res, next) => {
	res.json({error: "Could not decode request: JSON parsing failed"});
} 

exports.processRequest = (payload) => {
    let results = [];
    return new Promise((resolve, reject) => {
        payload.map((show) => {
            if (isDrmAndAtLeastOneEp(show)) {
                results.push((extractImgSlugTitle(show)));
            }
        })
        resolve({response:results});
    })
}

function isDrmAndAtLeastOneEp(show) {
    if (show.drm === true && show.episodeCount > 0)
        return true
    else
        return false
}

function extractImgSlugTitle(show) {
    return { image: show.image.showImage, slug: show.slug, title: show.title };
}
