import { LitElement, html, css } from 'lit'
import { customElement, eventOptions, property } from 'lit/decorators.js'
import './scrollable-container'
import type { items, itemsJson } from './_types/qiita'
import { Task } from '@lit/task'
import { repeat } from 'lit/directives/repeat.js'

@customElement('qiita-items')
export class QiitaItems extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        background-color: #fff;
        width: 80%;
        max-height: fit-content;
        padding: 24px;
        border: 1px solid #f4f4f4;
        border-radius: 8px;
      }

      .title {
        background-color: #eaeaea;
        font-size: 24px;
        font-weight: bold;
        border: 1px solid #fff;
        border-radius: 8px;
        padding: 12px;
        text-align: center;
      }

      .item-container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .item-card {
        display: block;
        background-color: #f8f8f8;
        border: 1px solid #cacaca;
        border-radius: 8px;
        padding: 12px;
        margin-top: 12px;
      }
    `,
  ]

  private _items: items = []
  @property({ type: Number }) private _page = 1
  private _perPage = 10

  @eventOptions({ capture: true })
  private _handleNextFetch() {
    this._page += 1
  }

  protected async firstUpdated() {
    await new Promise((r) => setTimeout(r, 0))
    this.addEventListener('scroll-bottom-end', this._handleNextFetch)
  }

  private _itemsTask = new Task(this, {
    task: async ([_page], { signal }) => {
      const res = await fetch(
        `https://qiita.com/api/v2/items?page=${this._page}&per_page=${this._perPage}`,
        {
          signal,
          method: 'GET',
          headers: {},
        }
      )
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      const itemsJson: itemsJson = await res.json()
      const new_items = itemsJson.map((itemJson) => ({
        id: itemJson.id,
        title: itemJson.title,
        url: itemJson.url,
        created_at: itemJson.created_at,
      }))
      this._items.push(...new_items)
    },
    args: () => [this._page],
  })

  render() {
    const maxHeight = { 'max-height': '360px' }
    return html`
      <p class="title">Qiita items</p>
      <scrollable-container .maxHeight="${maxHeight}">
        <div class="item-container">
          ${this._itemsTask.render({
            complete: () => html`<div>
              ${repeat(
                this._items,
                (item) => item.id,
                (item) =>
                  html`
                    <div class="item-card">
                      <a href="${item.url}">
                        <p>${item.title}</p>
                      </a>
                      <p>${item.created_at}</p>
                    </div>
                  `
              )}
            </div>`,
            pending: () => html`<div>
              ${repeat(
                this._items,
                (item) => item.id,
                (item) =>
                  html`
                    <div class="item-card">
                      <a href="${item.url}">
                        <p>${item.title}</p>
                      </a>
                      <p>${item.created_at}</p>
                    </div>
                  `
              )}
            </div>`,
          })}
        </div>
      </scrollable-container>
    `
  }
}
