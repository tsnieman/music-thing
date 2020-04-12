/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fetch = require(`node-fetch`)

const DISCOGS_TOKEN = `maSnEZtPwLRMXfgzfpjkAMeZMXvzendkTldZVKup`;

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // get data from Discogs at build time
  const result = await fetch(`https://api.discogs.com/users/tsnieman/collection/folders/0/releases?token=${DISCOGS_TOKEN}`)
  const resultData = await result.json()
  const releases = [...resultData.releases];
  for (let i = resultData.pagination.page; i < resultData.pagination.pages; i++) {
    const pageResult = await fetch(`${resultData.pagination.urls.next}&token=${DISCOGS_TOKEN}`);
    const {
      releases: releasePage,
    } = await pageResult.json();
    releases.push(...releasePage);
  }

  // create node for build time data
  createNode({
    // Queryable fields
    releases,

    // required fields (for createNode)
    id: `discogs-build-time-data`,
    parent: null,
    children: [],
    internal: {
      type: `DiscogsReleases`,
      contentDigest: createContentDigest(resultData),
    },
  })
}
