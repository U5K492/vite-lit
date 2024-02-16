import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('component-container')
export class ComponentContainer extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      .container {
        display: flex;
        width: 100%;
        gap: 30px;
        border: 1px solid #414141;
        border-radius: 4px;
        padding: 30px;
        background-color: #2f2c3b;
        height: 100vh;
        flex-direction: column;
        align-items: center;
      }
    `,
  ]

  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>
    `
  }
}
