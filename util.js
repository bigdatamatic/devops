function isURL(string) {
    return new RegExp(/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/).test(string);
}

function parseEpisodes(string) {
    /* let normalized; 

    if (string.includes('\n') && string.includes('\r')) {
        normalized = string.replaceAll()
    } */

    if (!string.includes('\n'))
        throw new Error('Newlines characters should be \\r');
    
    const lines = string.split('\n').filter(line => line !== '');

    if (lines.length % 2 !== 0) 
        throw new Error('Line count must be even.');

    const episodes = [];

    for (let i = 0; i < lines.length / 2; i++) {
        const episode = {};
        episode['title'] = lines[i * 2].trim();
        episode['embed_url'] = lines[(i * 2) + 1].trim();
        episodes.push(episode);
    }

    return episodes;
}

module.exports = {
    isURL,
    parseEpisodes
}