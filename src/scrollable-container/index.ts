import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './scrollable-container'
import { items, itemsJson, itemJson } from './_types/qiita'
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
    `,
  ]

  private _items: items = []
  private _page = 1
  private _perPage = 10

  private _itemsTask = new Task(this, {
    task: async () => {
      const res = await fetch(
        `https://qiita.com/api/v2/items?page=${this._page}&per_page=${this._perPage}`
      )
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      const itemsJson: itemsJson = await res.json()
      this._items = itemsJson.map((itemJson) => ({
        id: itemJson.id,
        title: itemJson.title,
        url: itemJson.url,
        created_at: itemJson.created_at,
      }))
    },
    args: () => [],
  })

  render() {
    return html`
      <p class="title">Qiita items</p>
      <scrollable-container>
        <div>
          <div>
            ${this._itemsTask.render({
              complete: () => html`<div>
                ${repeat(
                  this._items,
                  (item) => item.id,
                  (item) =>
                    html`
                      <div>
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
        </div>
      </scrollable-container>
    `
  }
}
