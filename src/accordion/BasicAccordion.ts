import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('basic-accordion')
export class BasicAccordion extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      .container {
        display: flex;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
        min-width: 120px;
        flex-flow: row wrap;
        padding: 12px;
      }

      header {
        display: flex;
        height: fit-content;
        min-width: 100%;
        justify-content: space-between;
        align-items: center;
      }

      .title {
        font-size: 24px;
        font-weight: bold;
        margin: 0;
      }

      .btn {
        height: fit-content;
        font-size: 12px;
        cursor: pointer;
      }

      .contents {
        visibility: hidden;
        height: 0;
        opacity: 0;
      }

      :host([_isOpen]) {
        .contents {
          visibility: visible;
          opacity: 1;
          background-color: #fff;
          transition: all 0.5s;
          height: fit-content;
          border-radius: 4px;
        }
      }
    `,
  ]

  @property()
  title = 'accordion'

  @property({ type: Boolean, reflect: true })
  private _isOpen = false

  render() {
    return html`
      <div class="container">
        <header>
          <p class="title">${this.title}</p>
          <button
            class="btn"
            @click="${
              // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
              () => (this._isOpen = !this._isOpen)
            }"
            part="button"
          >
            ${this._isOpen ? 'close' : 'open'}
          </button>
        </header>
        <summary class="contents">
          <slot></slot>
        </summary>
      </div>
    `
  }
}
