import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('toggle-switch')
export class ToggleSwitch extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      .toggle-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .toggle-btn {
        width: 48px;
        height: 24px;
        position: relative;
        border: none;
        border-radius: 12px;
        background-color: #e0e0e0;
        cursor: pointer;
      }

      .toggle-btn::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        left: 1px;
        top: 1px;
        background-color: #fff;
        border: 1px solid #c8c8c8;
        transition: all 0.2s ease 0s;
      }

      :host([_flag]) {
        .toggle-btn {
          background-color: #00c5b1;;
        }

        .toggle-btn::after {
          border-color: #00c5b1;
          transform: translateX(100%);
        }
      }
    `,
  ]

  @property({ type: Boolean, reflect: true })
  _flag = false

  render() {
    return html`
      <div class="toggle-container">
        <button
          class="toggle-btn"
          @click="${
            // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
            () => (this._flag = !this._flag)
          }"
        ></button>
      </div>
    `
  }
}
