/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fetch = require(`node-fetch`)

const DISCOGS_TOKEN = `maSnEZtPwLRMXfgzfpjkAMeZMXvzendkTldZVKup`

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
  createNodeId,
}) => {
  // get data from Discogs at build time
  const result = await fetch(
    `https://api.discogs.com/users/tsnieman/collection/folders/0/releases?token=${DISCOGS_TOKEN}`
  )
  const resultData = await result.json()
  const releases = [...resultData.releases]
  for (
    let i = resultData.pagination.page;
    i < resultData.pagination.pages;
    i++
  ) {
    const pageResult = await fetch(
      `${resultData.pagination.urls.next}&token=${DISCOGS_TOKEN}`
    )
    const { releases: releasePage } = await pageResult.json()
    releases.push(...releasePage)
  }

  releases.forEach((release, i) => {
    createNode({
      ...release,
      id: createNodeId(release.instance_id),
      parent: null,
      children: [],
      internal: {
        type: 'CollectionRelease',
        content: JSON.stringify(release),
        contentDigest: createContentDigest(release),
      },
    })
  })
}
