import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

@customElement('scrollable-container')
export class ScrollableContainer extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .scroll-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
        overflow-y: scroll;
        width: 100%;
        max-height: 480px;
      }
    `,
  ]

  @property({ type: Object })
  maxHeight = { 'max-height': '480px' }

  constructor() {
    super()
    this.addEventListener('scrollend',
    (e: Event) => (`scroll is end ${e}`)
    )
  }

  render() {
    return html`
      <div class="scroll-container" style=${styleMap(this.maxHeight)}>
        <slot></slot>
      </div>
    `
  }
}
