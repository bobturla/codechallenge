'use strict'
const ERROR_RESPONSE = { error: "Could not decode request: JSON parsing failed" };

exports.handleInvalidJson = (error, req, res, next) => {
    res.status(400);
    res.json(ERROR_RESPONSE);
}

exports.processRequest = ({ payload }) => {
    let results = [];
    return new Promise((resolve, reject) => {
        payload.map((show) => {
            if (isDrmAndAtLeastOneEp(show)) {
                let extracted = extractImgSlugTitle(show);
                if (extracted !== null) results.push(extracted);
            }
        });
        resolve({ response: results });
    })
}

function isDrmAndAtLeastOneEp(show) {
    if (show.drm && show.episodeCount > 0) {
        return true;
    } else {
        return false;
    }
}

function extractImgSlugTitle(show) {
    if (show.hasOwnProperty('image') && show.hasOwnProperty('slug') && show.hasOwnProperty('title'))
        return { image: show.image.showImage, slug: show.slug, title: show.title };
    else {
        return null;
    }
}

exports.isDrmAndAtLeastOneEp = isDrmAndAtLeastOneEp;
exports.extractImgSlugTitle = extractImgSlugTitle;
