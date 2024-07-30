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
      }
    `,
  ]

  @property({ type: Object })
  maxHeight = { 'max-height': '480px' }

  render() {
    return html`
      <div class="scroll-container" style=${styleMap(this.maxHeight)} @scroll="${this._isThresholdPoint}">
        <slot></slot>
      </div>
    `
  }

  private _isThresholdPoint(e: {target: HTMLElement}) {
    const {
      scrollHeight,
      scrollTop,
      clientHeight
    } = e.target

    if(scrollTop >= scrollHeight / 2 || scrollHeight - clientHeight === scrollTop) {
      this._dispatchFetchEvent()
    }
  }


  _dispatchFetchEvent() {
    const isThresholdPointEvent= new CustomEvent('scroll-bottom-end', {
      detail: { message: 'fetch!'},
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(isThresholdPointEvent)
  }
}
