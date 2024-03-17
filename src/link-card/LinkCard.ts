import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Task } from '@lit/task'
import { Ogp } from './_types/link-card'

@customElement('link-card')
export class LinkCard extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      .container {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        min-width:240px;
        max-height: 360px;
        min-height: 120px;
        background-color: #fff;
        padding: 12px;
        border-radius: 12px;
        border: 2px solid #d5d5d5;
        gap: 12px;
      }

      .ogp-header {
        width: 100%;
      }
      .ogp-img {
        width: 100%;
        height: 100%;
        border-radius: 12px;
      }

      .ogp-text {
        margin: 0;
        padding: 0 12px;
        border: 1px solid #d5d5d5;
        border-radius: 12px;
        background-color: #f4f4f4;
      }

      .ogp-title {
        font-size: 16px;
        font-weight: bold;
      }

      .ogp-description {
        font-size: 12px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    `,
  ]

  @property({ type: String }) url?: string

  private _ogp: Ogp = {
    'og:description': '',
    'og:image': '',
    'og:image:alt': '',
    'og:site_name': '',
    'og:title': '',
    'og:type': '',
    'og:url': '',
  }

  private _ogpTask = new Task(this, {
    task: async ([url], { signal }) => {
      const res = await fetch(`${url}`, { signal })
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      const html = await res.text()
      const domParser = new DOMParser()
      const dom = domParser.parseFromString(html, 'text/html')
      const ogp: Ogp = Object.fromEntries(
        [...dom.head.children]
          .filter(
            (elm) =>
              elm.tagName === 'META' &&
              elm.getAttribute('property')?.startsWith('og:')
          )
          .map((elm) => {
            return [elm.getAttribute('property'), elm.getAttribute('content')]
          })
      )
      this._ogp = ogp
    },
    args: () => [this.url],
  })

  render() {
    return this._ogpTask.render({
      pending: () => html`<p>Loading product...</p>`,
      complete: () => html`
        <section class="container">
          <header class="ogp-header">
            <a
              href="${this._ogp['og:url']}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="ogp-img"
                src="${this._ogp['og:image']}"
                alt="${this._ogp['og:image:alt']}"
              />
            </a>
          </header>
          <main class="ogp-text">
            <a href="${this._ogp['og:url']}" target="_blank" rel="noopener noreferrer">
              <p class="ogp-title">${this._ogp['og:title']}</p>
            </a>
            <p class="ogp-description">${this._ogp['og:description']}</p>
          </main>
        </section>
      `,
      error: (e) => html`<p>Error: ${e}</p>`,
    })
  }
}
