/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fetch = require(`node-fetch`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const DISCOGS_TOKEN = `maSnEZtPwLRMXfgzfpjkAMeZMXvzendkTldZVKup`

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
  createNodeId,
  getCache,
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

  for (release of releases) {
    const releaseId = createNodeId(release.instance_id)

    let fileNode

    try {
      fileNode = await createRemoteFileNode({
        url: release.basic_information.cover_image,
        parentNodeId: releaseId,
        getCache,
        createNode,
        createNodeId,
      })
    } catch (e) {
      console.log({ e })
    }

    if (fileNode) {
      release.basic_information.cover_image___NODE = fileNode.id
    }

    createNode({
      ...release,
      id: releaseId,
      parent: null,
      children: [],
      internal: {
        type: 'CollectionRelease',
        content: JSON.stringify(release),
        contentDigest: createContentDigest(release),
      },
    })
  }
}
