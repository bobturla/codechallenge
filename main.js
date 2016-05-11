'use strict'
exports.handleInvalidJson = (error, req, res, next) => {
    res.json({ error: "Could not decode request: JSON parsing failed" });
}

exports.processRequest = (payload) => {
    let results = [];
    return new Promise((resolve, reject) => {
        try {
            payload.map((show) => {
                if (isDrmAndAtLeastOneEp(show)) {
                    results.push((extractImgSlugTitle(show)));
                }
            });
            resolve({ response: results });
        }catch(error){
        	reject({ error: "Could not decode request: JSON parsing failed" });
        }
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
