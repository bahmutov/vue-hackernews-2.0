import Item from '../../src/components/Item.vue'
import { timeAgo, host } from '../../src/util/filters'
import { createRouter } from '../../src/router'
import VueRouter from 'vue-router'
import mountVue from 'cypress-vue-unit-test'

/* eslint-env mocha */
/* global cy, Cypress */
describe('Item', () => {
  const template = `<news-item :item="item"></news-item>`
  const components = {
    'news-item': Item
  }
  const data = {
    item: {
      title: 'Vue unit testing with Cypress',
      score: 101,
      url: 'https://www.cypress.io',
      id: 'a0x',
      by: 'bahmutov',
      time: Cypress.moment('Jan 22 2018').unix(),
      descendants: 42
    }
  }

  const extensions = {
    plugins: [ VueRouter ],
    filters: { timeAgo, host }
  }
  const html = `
    <html>
    <head></head>
    <body>
      <div id="app"></div>
      <script src="https://unpkg.com/vue@2.5.3"></script>
    </body>
  </html>
  `

  const options = {
    html,
    extensions
  }

  const router = createRouter()

  beforeEach(() => {
    cy.viewport(400, 200)
  })
  beforeEach(mountVue({ template, components, data, router }, options))

  it('loads news item', () => {
    cy.contains('.score', 101)
  })

  it('has link to comments', () => {
    cy.contains('.comments-link > a', '42 comments')
  })
})
