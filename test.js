let chai = require('chai');
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
let main = require('./main');
chai.use(chaiAsPromised);

const SAMPLE_REQUEST = require('./sampleRequest.json');
const SAMPLE_RESPONSE = require('./sampleResponse.json');
const SAMPLE_SHOW = require('./sampleShow.json');
const SAMPLE_INVALID_SHOW = require('./sampleInvalidShow.json');
const ERROR_RESPONSE = { error: "Could not decode request: JSON parsing failed" };

describe('processRequest', () => {
    it('processRequest() should output an array of objects', () => {
        let result = main.processRequest(SAMPLE_REQUEST);
        return expect(result).to.eventually.be.deep.equal(SAMPLE_RESPONSE);
    })
});

describe('isDrmAndAtLeastOneEp', () => {
    it('isDrmAndAtLeastOneEp() should output a boolean on valid show JSON', () => {
        let result = main.isDrmAndAtLeastOneEp(SAMPLE_SHOW);
        expect(result).to.be.ok;
    })
});

describe('isDrmAndAtLeastOneEp', () => {
    it('isDrmAndAtLeastOneEp() should return false on missing drm or episodeCount', () => {
      	let result = main.isDrmAndAtLeastOneEp(SAMPLE_INVALID_SHOW);
        expect(result).to.be.false;  
    })
});

describe('extractImgSlugTitle', () => {
    it('extractImgSlugTitle() should output a JSON object', () => {
        let result = main.extractImgSlugTitle(SAMPLE_SHOW);
        let expected = {
            image: "http://catchup.ninemsn.com.au/img/jump-in/shows/16KidsandCounting1280.jpg",
            slug: "show/16kidsandcounting",
            title: "16 Kids and Counting",
        }
        expect(result).to.be.deep.equal(expected);
    })
});

describe('extractImgSlugTitle', () => {
    it('extractImgSlugTitle() should return null on missing image / title / slug key', () => {
        let result = main.extractImgSlugTitle(SAMPLE_INVALID_SHOW);
        expect(result).to.not.exist;
    })
});
