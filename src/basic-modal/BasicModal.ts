import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('basic-modal')
export class BasicModal extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      .modal-container {
        visibility: hidden;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .modal-closer {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }

      .modal-btn {
        cursor: pointer;
        padding: 12px;
        font-size: 16px;
        font-weight: bold;
      }

      :host([_isOpen]) {
        .modal-container {
          visibility: visible;
        }

        .modal-closer::before {
          content: '';
          background-color: #000;
          opacity: 0.6;
          height: 100vh;
          width: 100%;
          position: fixed;
          z-index: 0;
        }
      }

      .closer-bth {
        content: '×';
        /* display: block; */
        z-index: 10;
        position: absolute;
        top: 1;
        right: 0;
        width: 16px;
        height: 16px;
        padding: 12px;
        background-color: #fff;
      }

      .contents-container {
        width: fit-content;
        height: fit-content;
        max-width: 960px;
        max-height: 480px;
        z-index: 1;
        position: relative;
        border-radius: 8px;
      }

      .contents {
        background-color: #fff;
        padding: 16px;
        border-radius: 8px;
      }

      .closer-btn {
        font-size: 16px;
        padding: 12px;
        background-color: #f8f8f8;
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        border: 0px;
        border-radius: 4px;
        line-height: 1;
        text-justify: center;
      }

      .closer-btn:hover {
        background-color: #e0e0e0;
        transition: ease-in 0.2s;
      }
    `,
  ]

  @property()
  name = 'open modal'

  @property({ type: Boolean, reflect: true })
  private _isOpen = false

  render() {
    return html`
      <button
        class="modal-btn"
        @click="${
          // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
          () => (this._isOpen = !this._isOpen)
        }"
        part="button"
      >
        ${this.name}
      </button>
      <div class="modal-container">
        <span
          class="modal-closer"
          @click="${
            // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
            () => (this._isOpen = !this._isOpen)
          }"
        ></span>
        <div class="contents-container">
          <button
            part="button"
            class="closer-btn"
            @click="${
              // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
              () => (this._isOpen = !this._isOpen)
            }"
          >
            ×
          </button>
          <section class="contents">
            <slot></slot>
          </section>
        </div>
      </div>
    `
  }
}
