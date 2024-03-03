import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'

@customElement('basic-dropdown')
export class BasicDropdown extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      fieldset {
        padding: 0;
        border: none;
      }

      select#dropdown {
        padding: 8px 12px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        text-align: left;
        font-weight: bold;
        min-width: 84px;
      }

      select#dropdown:hover {
        background-color: #ccc;
        cursor: pointer;
        transition: ease-out 0.3s;
      }

      div.select[data-open] datalist {
        display: initial;
      }

      div.select datalist {
        appearance: none;
        position: absolute;
        border-style: solid;
        border-width: 1px;
        border-color: gray;
        left: 0;
        display: none;
        width: 100%;
        box-sizing: border-box;
        z-index: 2;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    `,
  ]

  @property({
    converter(value) {
      if (value === null) {
        return []
      }
      const str = value?.substring(1, value.length - 1)
      const arr = str.replace(/'/g, '').split(',')
      return arr
    },
    type: Array,
  })
  items: string[] = []

  @property()
  _selected: string = this.items[0]

  render() {
    return html`
      <fieldset>
        <select name="dropdown-menu" id="dropdown">
          ${repeat(
            this.items,
            (item) => item.indexOf,
            (item) =>
              html`
                <option
                  class="item"
                  value="${item}"
                  @click="${
                    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                    () => (this._selected = item)
                  }"
                >
                  ${item}
                </option>
              `
          )}
        </select>
      </fieldset>
    `
  }
}
